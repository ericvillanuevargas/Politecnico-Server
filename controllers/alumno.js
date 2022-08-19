const { response} = require("express");
const Alumno = require("../models/Alumno")
const { generarJWT}= require("../helpers/jwt")




const crearAlumno = async (req, res= response) => {

    const {nombre} = req.body;
    
    try{
 
 
     let alumno = await Alumno.findOne({nombre});
     if( alumno ) {
         return res.status(400).json({
             ok: false,
             msg: 'Ya se ha creado un alumno  con este nombre.'
         })
     }
 
     // Crear alumno con el modelo
     const dbAlumno= new Alumno (req.body);
     //Crear alumno en la  BD
     await dbAlumno.save();


     const token = await generarJWT (dbAlumno.id, nombre )
     //Generar respuesta exitosa
     return res.status(201).json({
         ok:true,
         uid: dbAlumno.id,
         nombre,
         token
     })
 }
 catch (error){
     console.log(error);
     return res.status(500).json({
         ok: false,
         msg: 'Error creando Alumno',
     })
 }
 
 }



 const getAlumno = async (req, res = response)=>{
    const 
        _id
        = req.header('_id');

    
    try{

        let alumno = await Alumno.findById(_id);
        if(!alumno ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hemos encontrado este alumno'
        })
        }
        else{
            return res.json(alumno)
        }
}
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo al alumno',
        })
    }

}

const getAlumnos = async (req, res = response)=>{
    try{
    let alumno = await Alumno.find()
    if(!alumno) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay alumnos en la base de datos'
        })
    }
    else{
        return res.json(alumno)
        
    }
    }
        catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo todos los alumnos',
        })
    }
}

 module.exports={
    crearAlumno,
    getAlumno,
    getAlumnos
 }