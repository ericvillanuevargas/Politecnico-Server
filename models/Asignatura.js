const { Schema, model } = require("mongoose");


const AsignaturaSchema = Schema({
    nombre:{
        type: String,
        required: true 
    }
});

module.exports= model("Asignatura",AsignaturaSchema);