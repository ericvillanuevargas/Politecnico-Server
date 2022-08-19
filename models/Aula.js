const { Schema, model } = require("mongoose");


const AulaSchema = Schema({
    nombre_aula:{
        type: String,
        required: true 
    },
    profesor_turno:{
        type: String,
        required: true ,
        unique: true
    },
    profesores_asignado:
        [{type: Schema.Types.ObjectId, ref: "Profesor" }] 
    ,
    alumnos:
        [{type: Schema.Types.ObjectId, ref: "Alumno"}]
        
    ,

});

module.exports= model("Aula",AulaSchema);