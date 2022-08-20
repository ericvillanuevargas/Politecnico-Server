const {Router } = require("express");
const { crearAula, PonerProfTurno, quitarProfTurno } = require("../controllers/aula");

const { validarJWT } = require("../middlewares/validar-jwt");


const router =  Router();

router.post("/newaula",crearAula);

//router.get("/solo", getProfesor);

///router.get("/all",getProfesores);

router.post("/ponerProfTurno",PonerProfTurno);
router.post("/quitarProfTurno",quitarProfTurno);

module.exports = router; 