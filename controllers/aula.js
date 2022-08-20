const  { response }  =  require ( "express" ) ;
const Profesor = require("../models/Profesor")
const Alumno = require("../models/Alumno")
const { generarJWT}= require("../helpers/jwt");
const Aula = require("../models/Aula");

const crearAula = async (req, res= response) =>{

    const {nombre_aula, profesores_asignado,alumnos,profesor_turno} = req.body;

    try{
        try{
            await Alumno.findById(alumnos);
        }
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Alumno invalido.',
            })
        }

        try{
            await Profesor.findById(profesores_asignado);
        }
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Profesor invalido.',
            })
        }
        
        let aula= await Aula.findOne({nombre_aula: nombre_aula});
        
        if(aula){
            return res.status(400).json({
                ok: false,
                msg: 'Esta aula ya existe'
            })
        }
    

        const dbAula= new Aula(req.body);

        const token = await generarJWT (dbAula.id,nombre_aula )

        await dbAula.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbAula.id,
            nombre_aula,
            token

        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error creando aula',
        })
    }
    

}
const PonerProfTurno = async (req, res) =>{

    const { idProf,idAula} = req.body;
    try {
        let aula = await Aula.findById(idAula)
        if(aula){
            
            if(aula.profesor_turno == null ){

                await Aula.updateOne({_id:idAula},{
                    profesor_turno: idProf
                    
                })
                return res.status(201).json({
                    ok:true,
                    msg: "Turno seleccionado correctamente"
                })
            }else{
                
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya hay un profesor de turno'
                })
            }
        }else{
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado esta aula'
            })
        }  
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error poniendo profesor de turno',
        })
    }
}

const quitarProfTurno = async (req, res) =>{
    const { idAula}= req.body

    try {

        let aula = await Aula.findById(idAula)
        if( aula){

                    if( aula.profesor_turno != "" ){
                        
                        
                        await Aula.updateOne({_id:idAula},{
                            profesor_turno : null    
                        })

                        return res.status(201).json({
                            ok:true,
                            msg: "Turno retirado correctamente"
                        })
                    }
                    else{
                        return res.status(400).json({
                            ok:true,
                            msg: "el error esta con el === eres un mmg"
                        })
                    }
                    
                   
                
                
        }
        else{
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado este aula'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error quitando profesor'
        })
    }

}
const getAula = async (req, res = response)=>{
    const 
        _id
        = req.header('_id');

    
    try{

        let aula = await Aula.findById(_id);
        if(!aula) {
        return res.status(400).json({
            ok: false,
            msg: 'No hemos encontrado esta aula'
        })
        }
        else{
            return res.json(aula)
        }
}
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo el aula',
        })
    }

}
const getAulas = async (req, res = response)=>{
    try{
    let aula = await Aula.find()
    if(!aula) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay Aulas en la base de datos'
        })
    }
    else{
        return res.json(aula)
        
    }
    }
        catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo todas las aulas',
        })
    }
}


module.exports={
    crearAula,
    getAula,
    getAulas,
    PonerProfTurno,
    quitarProfTurno
 }