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
    return function(dispatch) {
        return fetch("http://localhost:3001/dogs")
          .then(response => response.json())
          .then(dogs => {
            dispatch({ type: GET_ALL_DOGS, payload: dogs });
          });
      };
}


export function getTemps() {
  return function(dispatch) {
      return fetch("http://localhost:3001/temperaments")
        .then(response => response.json())
        .then(temps => {
          dispatch({ type: GET_ALL_TEMPS, payload: temps });
        });
    };
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
        var json = await axios.get("http://localhost:3001/dogs?name=" + name);
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
        var response = await axios.post("http://localhost:3001/dogs", payload);
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
        var json = await axios.get("http://localhost:3001/dogs/" + id);
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