const { Router } = require('express');
const {createUserHandler} = require('../handlers/createUserHandler')
const { createPropertyHandler } = require('../handlers/createPropertyHandler')
const { getAllPropertiesHandler } = require('../handlers/getAllPropertiesHandler');
const { getPropertyByIdHandler } = require('../handlers/getPropertyByIdHandler');
const { getPropertyByTitleHandler } = require('../handlers/getPropertyByTitleHandlers')
const { createUserSellerHandler } = require('../handlers/createUserSellerHandler')
const { getAllSellersHandler } =require('../handlers/getAllSellersHandler')
const { getAllUsersHandler } = require('../handlers/getAllUsersHandler')
const { getUserByIdHandler } = require('../handlers/getUserByIdHandler')
const { getPropertyByTypeHandler } = require('../handlers/getPropertyByTipeHandler')
const { getPropertyByLocationHandler } = require('../handlers/getPropertyByLocationHandler')
const { filterPropertiesHandler } = require('../handlers/filterPropertiesHandler')
const loginController = require('../controllers/loginController')
const { getSellerByIdHandler } = require('../handlers/getSellerByIdHandler')
const { updateProperty } = require('../controllers/editProperty')
const { getActiveProperties } = require('../controllers/getActiveProperties')
const { getActivePropertiesForSale  } = require('../controllers/getActivePropertiesForSale')
const { getActivePropertiesForRent } = require('../controllers/getActivePropertiesForRent')
const { createUserAdminrHandler } = require('../handlers/createAdminHandler')
const { createUserMartillerHandler } = require('../handlers/createMartillerHandler')
const { getPropertiesBySellerId } = require('../controllers/getPropertiesBySellerId')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
//POST
router.post('/user/', createUserHandler);
router.post('/property', createPropertyHandler);
router.post('/seller', createUserSellerHandler);
router.post('/login', loginController.login);

//GET
router.get('/properties', getAllPropertiesHandler);
router.get('/property/:id', getPropertyByIdHandler);
router.get('/property/name/:title', getPropertyByTitleHandler);
router.get('/property/type/:propertyType', getPropertyByTypeHandler);
router.get('/property/location/:location', getPropertyByLocationHandler);
router.get('/sellers', getAllSellersHandler);
router.get('/seller/:id', getSellerByIdHandler);
router.get('/users', getAllUsersHandler);
router.get('/user/:id', getUserByIdHandler);
router.get('/properties/filter', filterPropertiesHandler);
router.get('/properties/active', getActiveProperties);
router.get('/properties/active/sale', getActivePropertiesForSale);
router.get('/properties/active/rent', getActivePropertiesForRent);
router.get('/properties/seller/:sellerId', getPropertiesBySellerId);

//PUT
router.put('/properties/edit/:id', updateProperty);

module.exports = router;