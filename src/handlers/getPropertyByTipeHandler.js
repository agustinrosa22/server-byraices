const propertyController = require('../controllers/getPropertyByTipe');

const getPropertyByTypeHandler = async (req, res) => {
  const propertyType = req.params.propertyType;
  try {
    const properties = await propertyController.getPropertiesByType(propertyType);
    if (!properties || properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Propiedades no encontradas para el tipo especificado',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Propiedades obtenidas exitosamente',
      data: properties,
    });
  } catch (error) {
    console.error('Error en el manejador de getPropertyByType:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener propiedades por tipo',
    });
  }
};

module.exports = { getPropertyByTypeHandler };
