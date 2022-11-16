const axios = require('axios')
const { Pokemon, Type } = require('../db.js')

async function gottaCatchAPI() {
  try {
    const firstCall = (await axios.get(`https://pokeapi.co/api/v2/pokemon`))['data']
    const secondCall = (await axios.get(firstCall['next']))['data']['results']
    const pokemonCalls = [...firstCall['results'], ...secondCall]
    const apiCalls = await Promise.all(pokemonCalls.map(async (pkmn) => {
      const pkmnData = (await axios.get(pkmn['url']))['data']
      return {
        id: pkmnData['id'],
        name: pkmnData['name'],
        hp: pkmnData['stats'][0]['base_stat'],
        attack: pkmnData['stats'][1]['base_stat'],
        defense: pkmnData['stats'][2]['base_stat'],
        speed: pkmnData['stats'][5]['base_stat'],
        height: pkmnData['height'],
        weight: pkmnData['weight'],
        image: pkmnData['sprites']['other']['official-artwork']['front_default'],
        types: pkmnData['types'].map((tValue) => tValue.type.name)
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

async function gottaFindPkmn(id) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(pokemon => {
    return {
      id: pokemon['data']['id'],
      name: pokemon['data']['name'],
      hp: pokemon['data']['stats'][0]['base_stat'],
      attack: pokemon['data']['stats'][1]['base_stat'],
      defense: pokemon['data']['stats'][2]['base_stat'],
      speed: pokemon['data']['stats'][5]['base_stat'],
      height: pokemon['data']['height'],
      weight: pokemon['data']['weight'],
      image: pokemon['data']['sprites']['other']['official-artwork']['front_default'],
      types: pokemon['data']['types'].map((tValue) => tValue.type.name)
    }
  }).catch(async function () {
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    if (regex.test(id)) {
      const filterDB = await Pokemon.findByPk(id)
      if (filterDB !== null) {
        return filterDB
      }
    }
    throw new Error(" gottaCatchEmAll: Ningun pokemon con ese id.");
  })
}

async function createPkmn(name, hp, attack, defense, speed, height, weight, image, types) {
  try {
    if (!await Type.count()) {
      await getTypes()
    }

    if (name && types.length) {
      const newPkmn = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
      })

      types.map(async x => await newPkmn.addType(x))

    } else {
      throw new Error('Faltaron datos necesarios.')
    }
  } catch (error) {
    console.log('Error en createPkmn:', error)
  }
}

async function getTypes() {
  try {
    const apiTypes = (await axios.get('https://pokeapi.co/api/v2/type'))['data']['results']
    apiTypes.map(async type => await Type.findOrCreate({ where: { name: type['name'] } }))
    return apiTypes
  } catch (error) {
    console.log('Error en getTypes:', error)
  }
}

module.exports = {
  gottaCatchAPI,
  gottaCatchDB,
  gottaCatchEmAll,
  gottaFindPkmn,
  createPkmn,
  getTypes
}