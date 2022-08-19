const {Router } = require("express");
const { crearAlumno, getAlumno, getAlumnos } = require("../controllers/alumno");
const { validarJWT } = require("../middlewares/validar-jwt");


const router =  Router();

router.post("/newalumno",crearAlumno);

router.get("/solo", getAlumno);

router.get("/all",getAlumnos);

module.exports = router; 

