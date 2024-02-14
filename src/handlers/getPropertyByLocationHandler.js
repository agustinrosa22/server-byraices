const { getPropertiesByLocation } = require('../controllers/getPropertyByLocation');

const getPropertyByLocationHandler = async (req, res) => {
    const { location } = req.params;
    try {
        const properties = await getPropertiesByLocation(location);
        res.status(200).json({
            success: true,
            message: 'Propiedades encontradas',
            data: properties,
        });
    } catch (error) {
        console.error('Error en el manejador de getPropertyByLocation:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al obtener propiedades por ubicación',
        });
    }
};

module.exports = {getPropertyByLocationHandler};
