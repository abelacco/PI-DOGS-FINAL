const { Router } = require('express');
const routerDogs = require("./dogs");
const routerTemperaments = require("./temperaments")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", routerDogs);
router.use("/temperaments", routerTemperaments);

module.exports = router;
