const {Router} = require("express");
const router = Router();
const {Temperament} = require('../db');
const axios = require("axios");
// const fetch = require('node-fetch');
const {dogsApi} = require("./controllers");

module.exports = router;

router.get("/", async (req,res,next) => {
   
    try {
        const allDogsApi = await dogsApi()  // aqui traigo todos los perros
        const alltemperaments = allDogsApi.map( d => d.temperaments) // aqui hago el mapeo de temperamentos
        // console.log(alltemperaments)
        const allTempsjoin = alltemperaments.join().split(",") // junto todo y separo por comas para tener el array
        // console.log(allTempsjoin)
        const allTempsready = allTempsjoin.map( t => t.trim()) // elimino espacios generados
        const setTemps = [...new Set(allTempsready)]
        // console.log(setTemps);
        setTemps.forEach( t => {      // ingresar cada temperamento a la DB
         Temperament.findOrCreate({
                where: {name : t}
            })           
        });
        const alltempies = await Temperament.findAll()    
        res.json(alltempies) 
    }
    catch(error) {
            next(error)
    }
})
