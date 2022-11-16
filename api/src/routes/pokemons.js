const express = require('express')
const router = express.Router()
const {} = require ('../db.js')
const { gottaCatchEmAll, gottaFindPkmn, createPkmn } = require('./utils')
const defaultPokeball = 'https://images.wikidexcdn.net/mwuploads/wikidex/0/02/latest/20090125150654/Pok%C3%A9_Ball_%28Ilustraci%C3%B3n%29.png'

router.get('/', async(req,res) => {
  try {
    const {name} = req.query
    const arrPkmn = await gottaCatchEmAll()
    if (name) {
      const findPkmn = arrPkmn.filter(pkmn=> pkmn['name'] === name)
      findPkmn.length ? res.status(200).json(findPkmn) : res.status(400).send('Pokemon not Found')
    } else {
      res.status(200).json(arrPkmn)
    }
  } catch (error) {
    res.status(404).send('GET /POKEMON Error: ', error)
  }
})

router.get('/:id', async(req,res) => {
  try {
    const {id} = req.params

    if (id) {
      const foundPokemon = await gottaFindPkmn(id)
      res.status(200).json(foundPokemon)
    } else {
      res.status(404).send("No se encontró el id por params.");
    }
  } catch (error) {
    res.status(404).send(`GET /POKEMON/:ID ${error}`)
  }
})

router.post('/', async(req,res) => {
  try {
    const {
      name, hp, attack, defense, speed, height, weight, image, types
    } = req.body
    let imageUrl = image ? image : defaultPokeball
    await createPkmn(name, hp, attack, defense, speed, height, weight, imageUrl , types)
    res.status(201).send('Se creo el pokemon')
  } catch (error) {
    res.status(404).send(`POST /POKEMON Error: ${error}`)
  }
})

module.exports = router