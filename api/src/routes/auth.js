const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.send('Anda!')
})

module.exports = router