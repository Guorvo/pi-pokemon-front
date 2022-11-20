
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON"
export const GET_TYPES = "GET_TYPES"

export const getPokemons = () => {
  return function(dispatch){
    fetch("http://localhost:3001/pokemons")
    .then(res => res.json())
    .then(data => dispatch({type: GET_POKEMONS, payload: data}))
  }
}

export const getPokemonDetail = (id) => {
  return function(dispatch){
    fetch(`http://localhost:3001/pokemons/${id}`)
    .then(res => res.json())
    .then(data => dispatch({type: GET_POKEMON_DETAIL, payload: data}))
  }
}

export const createPokemon = (user) => {
  return function(dispatch){
    fetch('http://localhost:3001/pokemons')
  }
}

export const getTypes = () => {
  return function(dispatch){
    fetch(`http://localhost:3001/types`)
    .then(res => res.json())
    .then(data => dispatch({type: GET_TYPES, payload: data}))
  }
}