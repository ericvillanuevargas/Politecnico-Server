const { Schema, model } = require("mongoose");


const AlumnoSchema = Schema({
    nombre:{
        type: String,
        required: true 
    }
});

module.exports= model("Alumno",AlumnoSchema);