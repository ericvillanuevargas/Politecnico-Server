const { response} = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");


const crearUsuario = async(req, res = response)=>{

    

    const{email,name,password,tipo}= req.body

    try {

        //verificar el correo

        const usuario = await Usuario.findOne({ email});

      
      if ( usuario ) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe con ese email'
        });
      }

      //crear usuario con el modelo

      const dbUser = new Usuario(req.body);

      //hashear la contraseña

      const salt = bcrypt.genSaltSync();
      dbUser.password = bcrypt.hashSync(password,salt);

      //generar JWT
      const token = await generarJWT (dbUser.id,name )

      //crear usuario de db

      await dbUser.save();

      //generar respuesta exitosa

      return res.status(201).json({
        ok: true,
        uid: dbUser.id,
        name,
        tipo,
        token
      });

        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: "Por Favor hable con el administrador"
        });
    }

   

    
}

const loginUsuario = async(req,res = response) =>{

    const {email, password}= req.body;
    
    try {
        const dbUser = await Usuario.findOne({email});
        
        if(  !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        //Confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            });
        }

        //generar JWT
        const token = await generarJWT( dbUser.id, dbUser.name );

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador "
        });

    }
}

const revalidarToken = async(req,res= response) =>{
    
    const { uid, name } = req;

    // Generar el JWT
    const token = await generarJWT( uid, name );

    return res.json({
        ok: true,
        uid, 
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}