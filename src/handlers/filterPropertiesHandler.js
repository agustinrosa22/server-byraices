const { filterProperties } = require('../controllers/propertyController');

const filterPropertiesHandler = async (req, res) => {
    const filters = req.query; // Ahora los filtros se pasan como parámetros de consulta en la URL
    try {
      const filteredProperties = await filterProperties(filters);
      res.status(200).json({
        success: true,
        message: 'Propiedades filtradas exitosamente',
        data: filteredProperties,
      });
    } catch (error) {
      console.error('Error al filtrar propiedades:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error al filtrar propiedades',
      });
    }
  };

module.exports ={ filterPropertiesHandler };