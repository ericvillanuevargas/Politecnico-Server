const {Router } = require("express");
const { crearAsignatura, getAsignatura, getAsignaturas } = require("../controllers/asignatura");


const router =  Router();

router.post("/newasig",crearAsignatura);

router.get("/solo", getAsignatura);

router.get("/all",getAsignaturas);

module.exports = router; 
