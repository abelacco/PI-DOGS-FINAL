import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // USAR LAS REACTDEV TOOLS
import thunk from 'redux-thunk';  // PARA PODER HACER FUNCIONES ASINCRONAS EN LAS CREATIONS
import rootReducer from '../reducer'; // IMPORTAR EL REDUCER

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
