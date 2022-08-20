const {Router } = require("express");
const { crearProfesor, getProfesor, getProfesores, actualizarEstadoProf } = require("../controllers/profesor");
const { validarJWT } = require("../middlewares/validar-jwt");


const router =  Router();

router.post("/newprof",crearProfesor);

router.get("/solo", getProfesor);

router.get("/all",getProfesores);

router.post("/actEstProf",actualizarEstadoProf);

module.exports = router; 
