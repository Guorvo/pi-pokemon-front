const { Router } = require('express');
// Importar todos los routers;
const pokemonsRouter = require('./pokemons')
const typesRouter = require('./types')

const router = Router();

// Configurar los routers
router.use('/pokemons', pokemonsRouter);
router.use('/types', typesRouter);




module.exports = router;
