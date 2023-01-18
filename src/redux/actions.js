import axios from "axios"

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON"
export const GET_TYPES = "GET_TYPES"
export const GET_DETAIL_NAME = "GET_DETAIL_NAME"

const url = "https://pi-pokemon-back-production.up.railway.app"

export const getPokemons = () => {
  return function(dispatch){
    fetch(`${url}/pokemons/`)
    .then(res => res.json())
    .then(data => dispatch({type: GET_POKEMONS, payload: data}))
    .catch(err => alert(err))
  }
}

export const getDetailName = (name) => {
  return async function(dispatch) {
    try {
      const res = await axios.get(`${url}/pokemons/?name=${name}`)
      return dispatch({type: GET_DETAIL_NAME, payload: res.data})
    } catch (error) {
      alert (error.response.data)
    }
  }
}

export const getPokemonDetail = (id) => {
  return function(dispatch){
    fetch(`${url}/pokemons/${id}`)
    .then(res => res.json())
    .then(data => dispatch({type: GET_POKEMON_DETAIL, payload: data}))
    .catch(err => alert(err))
  }
}

export const createPokemon = (user) => {
  return async function() {
    try {
        const res = await axios.post(`${url}/pokemons`, user)
        alert (res.data)
    } catch (error) {
        alert (error)
    }
}
}

export const getTypes = () => {
  return function(dispatch){
    fetch(`${url}/types`)
    .then(res => res.json())
    .then(data => dispatch({type: GET_TYPES, payload: data}))
    .catch(err => alert(err))
  }
}