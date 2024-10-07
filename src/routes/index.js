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
const {getPropertiesBySellerIdTrue} = require('../controllers/getPropertiesBySellerIdTrue')
const { getPropertiesBySellerIdHandler } = require('../handlers/getPropertiesBySellerIdHandler');
const { createOffice } = require('../controllers/CreateOfficeController')
const { getAllOffices } = require('../controllers/getAllOffices')
const { getOfficeById } = require('../controllers/getOfficeById')
const { updateSellerById } = require('../controllers/updateSellerById')
const { getMartillerBySellerId } = require('../controllers/getMatillerBySellerId')
const { updateMartiller } = require('../controllers/editMartiller')
const { getAllMartillers } = require('../controllers/getAllMartillers')
const { updateSeller } = require('../controllers/editSeller')
const { updateOffice } = require('../controllers/updateOffice')
const { getPropertiesByMartillerId } = require('../controllers/getPropertiesByMartillerId')
const { getMartillerById } = require('../controllers/getMartillerById')
const { getActivePropertiesDesarrollo } = require('../controllers/getActivePropertiesDesarrollo')
const { getPropertiesLuxury } = require('../controllers/getPorpertiesLuxury')
const { deletePropertyById } = require('../controllers/deletePropertyById')
const { getPendingProperties } = require('../controllers/getPendingProperties');
const { getActiveMartillers } = require('../controllers/getActiveMartillers'); 
const { getActiveSellers } = require('../controllers/getActiveSellers')
const { getInactiveSellers } = require('../controllers/getInactiveSellers')
const { createVisita } = require('../controllers/createVisita');
const { getAllVisitas } = require('../controllers/getAllVisitas');
const { getVisitasByPropertyId } = require('../controllers/getVisitasByPropertyId');
const upload = require('../middlewares/upload');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
//POST
router.post('/user/', createUserHandler);
router.post('/property', upload.array('photos', 30), createPropertyHandler);
router.post('/seller', createUserSellerHandler);
router.post('/login', loginController.login);
router.post('/office', createOffice) 
router.post('/martiller', createUserMartillerHandler) 
router.post('/visita', createVisita) 

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
//GET /api/properties/active/sale?province=ProvinceName&departments=DepartmentName&country=CountryName&minPrice=1000&maxPrice=5000&currency=USD
router.get('/properties/active/rent', getActivePropertiesForRent);
router.get('/properties/seller/:sellerId', getPropertiesBySellerId);
router.get('/properties/seller/true/:sellerId', getPropertiesBySellerIdTrue)
router.get('/allOfice', getAllOffices)
router.get('/offices/:id', getOfficeById)
router.get('/martiller/seller/:sellerId', getMartillerBySellerId); 
router.get('/all/martillers', getAllMartillers)
router.get('/properties/martiller/:martillerId', getPropertiesByMartillerId); 
router.get('/martiller/:id', getMartillerById)
router.get('/properties/active/pozo', getActivePropertiesDesarrollo);
router.get('/properties/luxury', getPropertiesLuxury); 
router.get('/properties/pending', getPendingProperties);
router.get('/martillers/active', getActiveMartillers);
router.get('/sellers/active', getActiveSellers);
router.get('/sellers/inactive', getInactiveSellers);
router.get('/visitas', getAllVisitas);
router.get('/visitas/property/:propertyId', getVisitasByPropertyId);


//PUT
router.put('/properties/:id', updateProperty);
router.put('/sellers/:id', updateSellerById);
router.put('/martiller/:id', updateMartiller);
router.put('/seller/:id', updateSeller);
router.put('/office/:id', updateOffice);

//DELETE
router.delete('/property/delete/:id', deletePropertyById);

module.exports = router;