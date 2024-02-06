const { createProperty } = require('../controllers/createProperty')

const createPropertyHandler = async (req, res) => {
    try {
        const {
            propertyType,
            photo,
            videoLink,
            status,
            price,
            expenses,
            totalSquareMeters,
            coveredSquareMeters,
            age,
            sellerCommission,
            buyerCommission,
            availableDate,
            expirationDate,
            location,
            surface,
            propertyState,
            roomsOptions,
            amenitiesOptions,
            servicesOptions,
            title,
            description,
            floorPlans,
            documentation,
        } = req.body;

        const newProperty = await createProperty({
            propertyType,
            photo,
            videoLink,
            status,
            price,
            expenses,
            totalSquareMeters,
            coveredSquareMeters,
            age,
            sellerCommission,
            buyerCommission,
            availableDate,
            expirationDate,
            location,
            surface,
            propertyState,
            roomsOptions,
            amenitiesOptions,
            servicesOptions,
            title,
            description,
            floorPlans,
            documentation,
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