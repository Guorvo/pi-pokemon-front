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
    console.log('Error in gottaCatchAPI:', error)
  }
}

async function gottaCatchDB() {
  try {
    const pokemonsDB = (await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })).map(x => x.get({ plain: true}))
    const formattedDB = pokemonsDB.map(pkmn => {
      return {
        id: pkmn['id'],
        name: pkmn['name'],
        hp: pkmn['hp'],
        attack: pkmn['attack'],
        defense: pkmn['defense'],
        speed: pkmn['speed'],
        height: pkmn['height'],
        weight: pkmn['weight'],
        image: pkmn['image'],
        types: pkmn['types'].map((tValue) => tValue['name'])}
    })
    return formattedDB
  } catch (error) {
    console.log('Error in gottaCatchDB:', error)
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
      const filterDB = (await Pokemon.findOne({
        where: {
          id: id
        },
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        }
      })).get({ plain: true})
      if (filterDB !== null) {
        return {
          id: filterDB['id'],
          name: filterDB['name'],
          hp: filterDB['hp'],
          attack: filterDB['attack'],
          defense: filterDB['defense'],
          speed: filterDB['speed'],
          height: filterDB['height'],
          weight: filterDB['weight'],
          image: filterDB['image'],
          types: filterDB['types'].map((tValue) => tValue['name'])
        }
      }
    }
    throw new Error(" gottaFindPkmn: No pokemon with provided id.");
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
      return true
    } else {
      throw new Error('Missing necessary data.')
    }
  } catch (error) {
    console.log('Error in createPkmn:', error)
  }
}

async function getTypes() {
  try {
    if (!await Type.count()) {
      const apiTypes = (await axios.get('https://pokeapi.co/api/v2/type'))['data']['results']
      await apiTypes.map(async type => await Type.findOrCreate({ where: { name: type['name'] }}))
    }
    const dbTypes = (await Type.findAll({raw: true}))
    return dbTypes
  } catch (error) {
    console.log('Error in getTypes:', error)
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