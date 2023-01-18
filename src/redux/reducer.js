import { CREATE_POKEMON, GET_POKEMONS, GET_POKEMON_DETAIL, GET_TYPES, GET_DETAIL_NAME } from "./actions";


const initialState = {
  pokemons: [],
  pokemonDetail: {},
  types: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonDetail: []
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
      }
    case GET_TYPES:
      return {
        ...state,
        types: action.payload
      }
    case CREATE_POKEMON:
      return {
        ...state
      }
    case GET_DETAIL_NAME:
      return {
        ...state,
        pokemonDetail: action.payload
      }
    default:
      return { ...state };
  }
}

export default rootReducer;