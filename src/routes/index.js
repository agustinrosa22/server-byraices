const { Router } = require('express');
const {createUserHandler} = require('../handlers/createUserHandler')
const { createPropertyHandler } = require('../handlers/createPropertyHandler')
const { getAllPropertiesHandler } = require('../handlers/getAllPropertiesHandler');
const { getPropertyByIdHandler } = require('../handlers/getPropertyByIdHandler');
const { getPropertyByTitleHandler } = require('../handlers/getPropertyByTitleHandlers')
const { createUserSellerHandler } = require('../handlers/createUserSellerHandler')
const { getAllSellersHandler } =require('../handlers/getAllSellersHandler')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
//POST
router.post('/user/', createUserHandler);
router.post('/property', createPropertyHandler);
router.post('/seller', createUserSellerHandler);
//GET
router.get('/properties', getAllPropertiesHandler);
router.get('/property/:id', getPropertyByIdHandler);
router.get('/property/name/:title', getPropertyByTitleHandler);
router.get('/sellers', getAllSellersHandler);



module.exports = router;