const { createProperty } = require('../controllers/createProperty');

const createPropertyHandler = async (req, res) => {
    try {

        // console.log('Datos recibidos en el servidor:', req.body);
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
            martillerId,
            userId,
            detailsProperty,
            characteristics,
            isForSale,
            isForRent,
            isUnderDevelopment,
            ownerName,
            ownerPhone,
            ownerEmail,
        } = req.body;

        // Verifica si los campos JSON están como cadenas y parsea si es necesario
        const parsedDetailsProperty = typeof detailsProperty === 'string' ? JSON.parse(detailsProperty) : detailsProperty;
        const parsedCharacteristics = typeof characteristics === 'string' ? JSON.parse(characteristics) : characteristics;
        const parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
        const parsedEnvironmentsOptions = typeof environmentsOptions === 'string' ? JSON.parse(environmentsOptions) : environmentsOptions;
        const parsedServices = typeof services === 'string' ? JSON.parse(services) : services;

        const photoPaths = req.files['photo'] 
            ? req.files['photo'].map(file => `https://server.byraices.com/${file.filename}`)
            : [];

        const documentPaths = req.files['documentation'] 
            ? req.files['documentation'].map(file => `https://server.byraices.com/${file.filename}`)
            : [];

        const newProperty = await createProperty({
            propertyType,
            photo: photoPaths,
            documentation: documentPaths,
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
            environmentsOptions: parsedEnvironmentsOptions,
            rooms,
            bathrooms,
            toilettes,
            garages,
            amenities: parsedAmenities,
            services: parsedServices,
            title,
            description,
            floorPlans,
            sellerId,
            martillerId,
            userId,
            detailsProperty: parsedDetailsProperty,
            characteristics: parsedCharacteristics,
            isForSale,
            isForRent,
            isUnderDevelopment,
            ownerName,
            ownerPhone,
            ownerEmail,
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
