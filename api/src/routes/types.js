const express = require('express')
const { getTypes } = require('./utils')
const router = express.Router()

router.get('/', async (req,res) => {
  try {
    const types = await getTypes()
    res.status(200).json(types)
  } catch (error) {
    res.status(404).send('GET /TYPES Error: ', error)
  }
})

module.exports = router