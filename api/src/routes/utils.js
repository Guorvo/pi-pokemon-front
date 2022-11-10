const axios = require('axios')
const { Pokemon, Type } = require('../db.js')

async function gottaCatchAPI() {
  try {
    const firstCall = (await axios.get(`https://pokeapi.co/api/v2/pokemon`))['data']
    const secondCall = (await axios.get(firstCall['next']))['data']['results']
    const pokemonCalls = [...firstCall['results'], ...secondCall]
    const apiCalls = await Promise.all(pokemonCalls.map(async (pkmn) => {
      const pkmnData = await axios.get(pkmn['url'])
      return {
        id: pkmnData['data']['id'],
        name: pkmnData['data']['name'],
        hp: pkmnData['data']['stats'][0]['base_stat'],
        attack: pkmnData['data']['stats'][1]['base_stat'],
        defense: pkmnData['data']['stats'][2]['base_stat'],
        speed: pkmnData['data']['stats'][5]['base_stat'],
        height: pkmnData['data']['height'],
        weight: pkmnData['data']['weight'],
        image: pkmnData['data']['sprites']['other']['official-artwork']['front_default'],
        types: pkmnData['data']['types'].map((tValue) => tValue.type.name)
      }
    }
    ))
    return apiCalls
  } catch (error) {
    console.log('Error en gottaCatchAPI:', error)
  }
}

async function gottaCatchDB() {
  try {
    const pokemonsDB = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      }
    });
    return pokemonsDB
  } catch (error) {
    console.log('Error en gottaCatchDB:', error)
  }
}

async function gottaCatchEmAll() {
  try {
    const pkmnAPI = await gottaCatchAPI()
    const pkmnDB = await gottaCatchDB()
    const pkmns = [...pkmnAPI, ...pkmnDB]
    return pkmns
  } catch (error) {
    console.log('Error en gottaCatchEmAll:', error)
  }
}

async function getTypes() {
  try {
    const cantTypes = await Type.count()
    if (!cantTypes) {
      const apiTypes = (await axios.get('https://pokeapi.co/api/v2/type'))['data']['results']
      apiTypes.map(type => Type.create({name: type['name'] }))
    }
    const types = await Type.findAll()
    return types
  } catch (error) {
    console.log('Error en getTypes:', error)
  }
}

module.exports = {
  gottaCatchAPI,
  gottaCatchDB,
  gottaCatchEmAll,
  getTypes
}