const express = require('express')
const router = express.Router()
const {} = require ('../db.js')
const { gottaCatchEmAll } = require('./utils')


router.get('/', async(req,res) => {
  try {
    const {name} = req.query
    const arrPkmn = await gottaCatchEmAll()
    if (name) {
      const findPkmn = arrPkmn.filter(pkmn=> pkmn['name'] === name)
      findPkmn.length ? res.status(200).json(findPkmn) : res.status(400).send('Pokemon not Found')
    } else {
      res.status(201).json(arrPkmn)
    }
  } catch (error) {
    console.log('GET /POKEMON Error: ', error)
  }
})

router.get('/:id', (req,res) => {
  try {
    const {id} = req.params
  } catch (error) {
    console.log('GET /POKEMON/:ID Error: ', error)
  }
})

router.post('/', (req,res) => {
  try {
    res.status(201).send('Anda!')
  } catch (error) {
    console.log('POST /POKEMON Error: ', error)
  }
  
})

module.exports = router