// Importar el modelo Property
const { Property } = require('../db').conn.models;

// Definir el controlador
const getPropertiesBySellerIdTrue = async (req, res) => {
  try {
    // Obtener el sellerId de los parámetros de la URL
    const { sellerId } = req.params;

    // Verificar si el sellerId está presente en los parámetros de la URL
    if (!sellerId) {
      return res.status(400).json({ success: false, message: 'sellerId is required' });
    }

    // Verificar que el sellerId sea un número válido
    if (isNaN(sellerId)) {
      return res.status(400).json({ success: false, message: 'Invalid sellerId format. Must be a number.' });
    }

    // Buscar todas las propiedades relacionadas con el sellerId proporcionado y con statusProperty: true
    const properties = await Property.findAll({
      where: {
        sellerId,
        statusProperty: true,  // Asegurar que statusProperty sea true
        'cerrado.cierre': true
      },
    });

    // Si no se encuentran propiedades, devolver un mensaje adecuado
    if (!properties || properties.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `No properties found for sellerId ${sellerId} with statusProperty: true.` 
      });
    }

    // Devolver las propiedades encontradas
    return res.status(200).json({ 
      success: true, 
      message: `Properties for sellerId ${sellerId} retrieved successfully.`,
      data: properties
    });

  } catch (error) {
    // Manejar errores del servidor y devolver una respuesta más específica
    console.error('Error fetching properties by sellerId:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again later.',
      error: error.message  // Devolver el mensaje de error para facilitar el debug
    });
  }
};

// Exportar el controlador
module.exports = { getPropertiesBySellerIdTrue };
