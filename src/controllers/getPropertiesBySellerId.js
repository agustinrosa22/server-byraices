// Importar el modelo Property
const { Property } = require('../db').conn.models;

// Definir el controlador
const getPropertiesBySellerId = async (req, res) => {
  try {
    // Obtener el sellerId de los parámetros de la URL
    const { sellerId } = req.params;

    // Verificar si el sellerId está presente en los parámetros de la URL
    if (!sellerId) {
      return res.status(400).json({ success: false, message: 'sellerId is required' });
    }

    // Buscar todas las propiedades relacionadas con el sellerId proporcionado y con statusProperties: true
    const properties = await Property.findAll({
      where: {
        sellerId
      },
      order: [['createdAt', 'DESC']] // Ordenar por createdAt en orden descendente
    });

    // Si no se encuentran propiedades, devolver un mensaje
    if (!properties || properties.length === 0) {
      return res.status(404).json({ success: false, message: 'No properties found for the provided sellerId' });
    }

    // Devolver las propiedades encontradas
    return res.status(200).json({ success: true, message: 'Properties retrieved successfully', data: properties });
  } catch (error) {
    // Manejar errores
    console.error('Error fetching properties by sellerId:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Exportar el controlador
module.exports = { getPropertiesBySellerId };

