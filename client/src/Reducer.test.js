import rootReducer from '../src/reducer/index';



describe('Reducer', () => {
   const state = {
      dog: [],
      dogs: [] ,
      allDogs: [],
      dogDetail: [],
      temps: []
   };

   it('Debería retornar el estado inicial si no se pasa un type válido', () => {
      expect(rootReducer(undefined, [])).toEqual({
        dogs: [] ,
        allDogs: [],
        dogDetail: [],
        temps: []
      });
   });   
})