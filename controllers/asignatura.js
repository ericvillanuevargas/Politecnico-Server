const { response} = require("express");
const Asignatura = require("../models/Asignatura")


const crearAsignatura = async (req, res= response) => {

    const {nombre} = req.body;
    
    try{
 
 
     let asignatura = await Asignatura.findOne({nombre});
     if( asignatura) {
         return res.status(400).json({
             ok: false,
             msg: 'Ya se ha creado una materia   con este nombre.'
         })
     }
 
     // Crear asignatura con el modelo
     const dbAsig= new Asignatura (req.body);
     //Crear asignatura en la  BD
     await dbAsig.save();


     
     //Generar respuesta exitosa
     return res.status(201).json({
         ok:true,
         uid: dbAsig.id,
         nombre
        
     })
 }
 catch (error){
     console.log(error);
     return res.status(500).json({
         ok: false,
         msg: 'Error creando Asignatura',
     })
 }
 
 }



 const getAsignatura = async (req, res = response)=>{
    const 
        _id
        = req.header('_id');

    
    try{

        let asig = await Asignatura.findById(_id);
        if(!asig ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hemos encontrado esta asignatura'
        })
        }
        else{
            return res.json(asig)
        }
}
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo la asignatura',
        })
    }

}

const getAsignaturas = async (req, res = response)=>{
    try{
    let asig = await Asignatura.find()
    if(!asig) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay asignaturas en la base de datos'
        })
    }
    else{
        return res.json(asig)
        
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
    crearAsignatura,
    getAsignatura,
    getAsignaturas
 }