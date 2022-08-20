const {Router } = require("express");
const { crearAula, PonerProfTurno, quitarProfTurno, getAula, getAulas } = require("../controllers/aula");

const { validarJWT } = require("../middlewares/validar-jwt");


const router =  Router();

router.post("/newaula",crearAula);

router.get("/solo", getAula);

router.get("/all",getAulas);

router.post("/ponerProfTurno",PonerProfTurno);
router.post("/quitarProfTurno",quitarProfTurno);

module.exports = router; 