const {Router} = require("express");
const router = Router();
const { API_KEY} = process.env;
const axios = require("axios");
const {Dog , Temperament} = require("../db")
// const fetch = require('node-fetch');
const {allDogsDbApi} = require("./controllers");



module.exports = router;

router.get("/", async (req,res,next) =>{
   let { name } = req.query  
   try {
          const allDoggies = await allDogsDbApi();
          if(name) {
              //  let dogName = await allDoggies.filter(d => d.name.toLowerCase() === name.toLowerCase())
              let dogName = await allDoggies.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
               dogName.length?
               res.status(200).send(dogName) :
               res.send("Dog didn't find")
          } else {
          res.status(200).send(allDoggies)
          }
   }
   catch(error) {
          next(error)
   }
})

router.get("/:idRaza", async (req,res,next) =>{
     let { idRaza } = req.params 
     try {
            const allDoggies = await allDogsDbApi();
            if(idRaza) {
                 let dogRaza = await allDoggies.filter(d => String(d.id) === String(idRaza))
                 console.log(dogRaza)
                 dogRaza.length?
                 res.status(200).send(dogRaza) :
                 res.status(400).send("Dog didn't find")
            } else {
            res.status(200).send(allDoggies)
            }
     }
     catch(error) {
            next(error)
     }
  })


router.post("/", async (req,res,next) => {
    const {name,height_min,height_max,weight_min,weight_max,life_span, temperaments, image } = req.body
    if( !name || !height_min || !height_max || !weight_min || !weight_max || !life_span || !temperaments) return res.status(404).send("Falta enviar datos obligatorios")
    console.log(image)
    try {
        const newDog = await Dog.create({name,weight_min,weight_max,height_min,height_max,life_span,image:image || "https://cutt.ly/7Zh6L95"})
        const tempsDB = await Temperament.findAll({
              where: {name: temperaments}
        })
        await newDog.addTemperament(tempsDB, {trought: { attributes: []}})
        res.status(200).send("Perrito creado") 
    }
    catch (error) {
     next(error)
    }
})



