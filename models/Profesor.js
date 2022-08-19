const { Schema, model } = require("mongoose");


const ProfesorSchema = Schema({
    nombre:{
        type: String,
        required: true 
    },
    asignatura:{
        type: Schema.Types.ObjectId, ref: "Asignatura", required:true
    },
    estado:{
        type: String,
        required: true ,
        default: "Activo"
    },
    fecha_activacion:{
        type: String,
        default: new Date().toLocaleDateString('en-US')
    },
    fecha_desactivacion:{
        type: String,
        
    },
 

});

module.exports= model("Profesor",ProfesorSchema);