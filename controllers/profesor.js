const  { response }  =  require ( "express" ) ;
const Profesor = require("../models/Profesor")
const Asignatura = require("../models/Asignatura")
const { generarJWT}= require("../helpers/jwt")

const crearProfesor = async (req, res= response) =>{

    const {nombre, asignatura} = req.body;

    try{
        try{
            await Asignatura.findById(asignatura);
        }
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Asignatura invalida.',
            })
        }

        
        let profesor= await Profesor.findOne({nombre: nombre});
        
        if(profesor){
            return res.status(400).json({
                ok: false,
                msg: 'Este profesor ya existe'
            })
        }
    

        const dbProf= new Profesor(req.body);

        const token = await generarJWT (dbProf.id,nombre )

        await dbProf.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbProf.id,
            nombre,
            token

        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error creando profesor',
        })
    }
    

}


const actualizarEstadoProf= async (req, res) =>{
    const {_idProf}= req.body

    try {
        let actProf = await Profesor.findById(_idProf);
    if(actProf){
        if(actProf.estado === "Activo"){
            await Profesor.updateOne({ _id: _idProf},{

                estado: "Inactivo",
                fecha_desactivacion: new Date().toLocaleDateString('en-US')

            })
            return res.status(200).json({
                ok: true,
                msg: 'Se a Cambiado el estado del profesor'
            })
        }
}
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error cambiando el estado'
        })
    }


    
}

const getProfesor = async (req, res = response)=>{
    const 
        _id
        = req.header('_id');

    
    try{

        let prof = await Profesor.findById(_id);
        if(!prof) {
        return res.status(400).json({
            ok: false,
            msg: 'No hemos encontrado este profesor'
        })
        }
        else{
            return res.json(prof)
        }
}
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo el profesor',
        })
    }

}

const getProfesores = async (req, res = response)=>{
    try{
    let prof = await Profesor.find()
    if(!prof) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay Profesores en la base de datos'
        })
    }
    else{
        return res.json(prof)
        
    }
    }
        catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo todos los Profesores',
        })
    }
}

 module.exports={
    crearProfesor,
    getProfesor,
    getProfesores,
    actualizarEstadoProf
 }






//para desactivar el prosefor esto es para la fecha de desactivacion 
//new Date().toLocaleDateString('en-US')