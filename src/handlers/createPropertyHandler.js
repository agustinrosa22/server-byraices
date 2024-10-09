const { createProperty } = require('../controllers/createProperty');
const upload = require('../middlewares/upload'); // Agrega esta línea para importar multer

const createPropertyHandler = async (req, res) => {
    try {
        const {
            propertyType,
            videoLink,
            statusProperty,
            currency,
            price,
            currencyExpenses,
            expenses,
            totalSquareMeters,
            coveredSquareMeters,
            semiCoveredSquareMeters,
            uncovered,
            land,
            age,
            commissionSellerType,
            commissionBuyerType,
            sellerCommission,
            buyerCommission,
            availableDate,
            expirationDate,
            environments,
            location,
            street,
            number,
            country,
            province,
            departments,
            locality,
            neighborhood,
            privateNeighborhood,
            propertyState,
            environmentsOptions,
            rooms,
            bathrooms,
            toilettes,
            garages,
            amenities,
            services,
            title,
            description,
            floorPlans,
            sellerId,
            userId,
            detailsProperty,
            characteristics,
            isForSale,
            isForRent,
            isUnderDevelopment
        } = req.body;

        // Obtener las rutas de las fotos subidas y reemplazar \ por /
        const photoPaths = req.files['photo'] 
            ? req.files['photo'].map(file => `http://localhost:3000/${file.filename}`)
            : [];

        // Obtener las rutas de los archivos de documentación subidos
        const documentPaths = req.files['documentation'] 
            ? req.files['documentation'].map(file => `http://localhost:3000/${file.filename}`)
            : [];

        // Crear la propiedad en la base de datos con las rutas de fotos y documentación
        const newProperty = await createProperty({
            propertyType,
            photo: photoPaths,         // Almacenamos las rutas de las fotos
            documentation: documentPaths, // Almacenamos las rutas de los documentos
            videoLink,
            statusProperty,
            currency,
            price,
            currencyExpenses,
            expenses,
            totalSquareMeters,
            coveredSquareMeters,
            semiCoveredSquareMeters,
            uncovered,
            land,
            age,
            commissionSellerType,
            commissionBuyerType,
            sellerCommission,
            buyerCommission,
            availableDate,
            expirationDate,
            environments,
            location,
            street,
            number,
            country,
            province,
            departments,
            locality,
            neighborhood,
            privateNeighborhood,
            propertyState,
            environmentsOptions,
            rooms,
            bathrooms,
            toilettes,
            garages,
            amenities,
            services,
            title,
            description,
            floorPlans,
            sellerId,
            userId,
            detailsProperty,
            characteristics,
            isForSale,
            isForRent,
            isUnderDevelopment
        });

        res.status(201).json({
            success: true,
            message: 'Propiedad creada exitosamente',
            data: newProperty,
        });
    } catch (error) {
        console.error('Error al crear la propiedad:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al crear la propiedad',
        });
    }
};

module.exports = {
    createPropertyHandler
};
