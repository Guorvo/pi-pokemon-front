const express = require('express')
const router = express.Router()
const {Pokemon, Types} = require ('../db')

router.get('/', (req,res) => {
  try {
    res.status(201).send('Anda!')
  } catch (error) {
    
  }
})

router.get('/:idpokemon', (req,res) => {
  try {
    const {idpokemon} = req.params
  } catch (error) {
    res.status(400).send(error.message)
  }
})



router.post('/', (req,res) => {
res.status(201).send('Anda!')
})

module.exports = router