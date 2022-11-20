import { CREATE_POKEMON, GET_POKEMONS, GET_POKEMON_DETAIL, GET_TYPES } from "./actions";


const initialState = {
  pokemons: [],
  pokemonDetail: {},
  types: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload
      }
    case GET_TYPES:
      return {
        ...state,
        types: action.payload
      }
    case CREATE_POKEMON:
      return {
        ...state,
        
      }

    default:
      return { ...state };
  }
}

export default rootReducer;