
const express = require("express");
const cors= require("cors");
const { dbConnection } = require("./db/config");
require("dotenv").config();





//crear el servidor de express

const app = express();

dbConnection();

app.use(express.static("public"))

app.use(cors());


app.use(express.json() );


app.use("/api/auth", require("./routes/auth"));
app.use("/api/alumno", require("./routes/alumno"));

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
});

