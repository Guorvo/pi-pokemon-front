const { Router } = require('express');
// Importing all routers;
const pokemonsRouter = require('./pokemons')
const typesRouter = require('./types')

const router = Router();

// Configuring the routes
router.use('/pokemons', pokemonsRouter);
router.use('/types', typesRouter);




module.exports = router;
