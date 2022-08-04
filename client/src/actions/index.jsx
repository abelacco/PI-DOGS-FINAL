import axios from "axios";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPS = "GET_ALL_TEMPS";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ORDER_BY_ASCDESC = "ORDER_BY_ASCDESC";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const CREATE_DOG = "CREATE_DOG";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL"


export function getDogs() {
  return async function(dispatch){
    try {
        var json = await axios.get("/dogs");
        return dispatch({
          type: GET_ALL_DOGS,
          payload: json.data
        })
    }
    catch(error) {
      console.log(error)
    }
  }
}



export function getTemps() {
  return async function(dispatch){
    try {
      var json = await axios.get("/temperaments")
      return dispatch ({
        type: GET_ALL_TEMPS, payload: json.data
      })
    }
    catch(e){
      console.log(e)
    }
  }
}

export function filterTemps(temp) {                 
    // console.log(temp)
    return {
      type: FILTER_BY_TEMP ,
      payload: temp
    }
}

export function filterByOrigin(origin) {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin
  }
}

export function orderByAscDesc(name) {
  return {
    type: ORDER_BY_ASCDESC,
    payload: name
  }
}

export function orderByWeight(weight){
  return {
    type: ORDER_BY_WEIGHT,
    payload: weight
  }
}

export function searchByName (name) {
  return async function(dispatch){
    try {
        var json = await axios.get("/dogs?name=" + name);
        console.log(json.data)
        return dispatch({
          type: SEARCH_BY_NAME,
          payload: json.data
        })
    }
    catch(error) {
      console.log(error)
    }
  }
}

export function createDog(payload) {
  return async function(dispatch){
    try {
        var response = await axios.post("/dogs", payload);
        console.log(response)
        return response
         
    }
    catch(error) {
      console.log(error)
    }
  }
}

export function getDogByID (id) {
  return async function(dispatch){
    try {
        var json = await axios.get("/dogs/" + id);
        console.log(json.data)
        return dispatch({
          type: GET_DOG_DETAIL,
          payload: json.data
        })

    }
    catch(error) {
      console.log(error)
    }
  }
}