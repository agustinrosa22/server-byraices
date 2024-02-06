const { getPropertyByTitle } = require('../controllers/getPropertyByTitle');

const getPropertyByTitleHandler = async (req, res) => {
    const propertyTitle = req.params.title;
    try {
        const property = await getPropertyByTitle(propertyTitle);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Propiedad no encontrada',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Propiedad obtenida exitosamente',
            data: property,
        });
    } catch (error) {
        console.error('Error en el manejador de getPropertyByName:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al obtener propiedad por nombre',
        });
    }
};

module.exports = { getPropertyByTitleHandler };
