import { ORDER_BY_ASCDESC, FILTER_BY_ORIGIN, FILTER_BY_TEMP, GET_ALL_DOGS, GET_ALL_TEMPS, ORDER_BY_WEIGHT, SEARCH_BY_NAME, CREATE_DOG , GET_DOG_DETAIL} from "../actions";

const initialState = {
    dogs: [] ,
    allDogs: [],
    dogDetail: [],
    temps: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case GET_ALL_TEMPS:
            return {
                ...state,
                temps: action.payload
            }
        case FILTER_BY_TEMP:
            const allDogs = state.allDogs        
            const tempToFilter = action.payload  === "All" 
                ?allDogs
                :allDogs.filter(d => !!d.createdInDb
                    ?d.temperaments.some(t => t.name === action.payload)
                    :d.temperaments.some(t => t === action.payload)
                    )
                return {
                    ...state,
                    dogs: tempToFilter
                }
        case FILTER_BY_ORIGIN:
            const allDoggies = state.allDogs
            const originFilter = action.payload === "Created"
                ? allDoggies.filter( d => d.createdInDb)
                : allDoggies.filter( d => !d.createdInDb)
            if(originFilter.length === 0) {
                 alert("Dog not created")
                 return {
                    ...state,
                    dogs: allDoggies
                 }
            } else {
                return {
                    ...state,
                    dogs: action.payload === "All" ? allDoggies : originFilter
                }
            }
        case ORDER_BY_ASCDESC:
            const allDoggies2 = state.dogs
            const ascDesName = action.payload === "asc"                                          //    
            ? allDoggies2.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)  // [a , b] ===> []1 izq y sino la derecha
            : allDoggies2.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1) // a y b  -1 derecha y sino a la izquierda
            return {
                ...state,
                dogs: ascDesName
            }
        case ORDER_BY_WEIGHT:
            const allDogsW = state.dogs.filter( d => d.weight_min)
            const orderWeight = action.payload === 'min'
            ?  allDogsW.sort((a , b) =>{
                return a.weight_min - b.weight_min     // [20 , 40] -20 se mantiene 
                }) 
            : allDogsW.sort((a,b) =>{
                return b.weight_max - a.weight_max
                })
            return{
                ...state,
                dogs: orderWeight
            } 
        case SEARCH_BY_NAME:
            let validSearch = action.payload
            console.log(validSearch)
            if(Array.isArray(validSearch))
            {
                return {
                    ...state,
                    dogs: action.payload
                }
            } else {
                return {
                    ...state,
                    dogs: "1"
                }
            }
               
        case CREATE_DOG:
            return {
                ...state
            }
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }
        default:
            return state    
    }

}

export default rootReducer;