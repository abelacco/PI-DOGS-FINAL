const { Dog , Temperament } = require('../db');
const { API_KEY} = process.env;
const axios = require("axios");
// const fetch = require('node-fetch');



const dogsDb = async () => {
    try {
        const allDogsDb = await Dog.findAll({
        include: {
            model: Temperament,      
            attributes: ["name"],        // Es opcional hacer lo de attributes, xq en este casa el modelo solo tiene una propiedad
            trough: {
                attributes: [],
            } 
        }})
        return allDogsDb
    }
    catch(error) {
        return error
    }
}

const dogsApi = async () => {
    try {
        const promApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        .then((response) => {return response.data})
        const allDogsApi = promApi.map( d => {
            return {
                id: d.id,
                name: d.name,
                height_min: Number(d.height.metric.split("-")[0] || 0),
                height_max: Number(d.height.metric.split("-")[1] || NaN),
                weight_min: Number(d.weight.metric.split("-")[0] || 0),
                weight_max: Number(d.weight.metric.split("-")[1] || NaN),
                life_span: d.life_span,
                image: d.image.url,
                temperaments: [d.temperament].join().split(", ")
                
            }
        })
        
        return allDogsApi
    }
    catch (error) {
        return error
    }
}


const allDogsDbApi = async () => {
    const p1 = await dogsDb()
    const p2 = await dogsApi()
    const alldogsconcat =  p2.concat(p1);
    return alldogsconcat;
}

const getTemperaments = async () => {
const allDogsApi = await dogsApi()  // aqui traigo todos los perros
const alltemperaments = allDogsApi.map( d => d.temperaments) // aqui hago el mapeo de temperamentos
// console.log(alltemperaments)
const allTempsjoin = alltemperaments.join().split(",") // junto todo y separo por comas para tener el array
const allTempsready = allTempsjoin.map( t => t.trim()) // elimino espacios generados
const setTemps = [...new Set(allTempsready)]
// console.log(setTemps)
setTemps.forEach( t => {      // ingresar cada temperamento a la DB
 Temperament.findOrCreate({
        where: {name : t}
    })           
});
}


module.exports = { allDogsDbApi , dogsDb , dogsApi , getTemperaments}


// const prom = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
// .then((response) => response.json())
// .then(data => res.send(data))
