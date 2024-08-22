// Importar el modelo Property
const { Property } = require('../db').conn.models;

// Definir el controlador
const getPendingProperties = async (req, res) => {
  try {
    // Buscar todas las propiedades con statusProperty: false y cerrado.cierre: false
    const properties = await Property.findAll({
      where: {
        statusProperty: false,
        cerrado: {
          cierre: false
        }
      },
      order: [['createdAt', 'DESC']] // Ordenar por createdAt en orden descendente
    });

    // Si no se encuentran propiedades, devolver un mensaje
    if (!properties || properties.length === 0) {
      return res.status(404).json({ success: false, message: 'No pending properties found' });
    }

    // Devolver las propiedades encontradas
    return res.status(200).json({ success: true, message: 'Pending properties retrieved successfully', data: properties });
  } catch (error) {
    // Manejar errores
    console.error('Error fetching pending properties:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Exportar el controlador
module.exports = { getPendingProperties };
