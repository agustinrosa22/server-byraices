const { Martiller, Property } = require('../db').conn.models;
require('dotenv').config();

const getPropertiesByMartillerId = async (req, res) => {
  const { martillerId } = req.params;

  try {
    // Buscar el martillero por ID
    const martiller = await Martiller.findByPk(martillerId, {
      include: {
        model: Property,
        as: 'properties',
        where: {
          'cerrado.cierre': false // Filtrar propiedades con cerrado.cierre = false
        },
        order: [['createdAt', 'DESC']] // Ordenar por createdAt en orden descendente
      }
    });

    if (!martiller) {
      return res.status(404).json({ error: 'Martiller not found' });
    }

    // Caso 200: Solicitud exitosa
    return res.status(200).json({
      success: true,
      message: 'Properties fetched successfully',
      data: martiller.properties
    });
  } catch (error) {
    console.error('Error fetching properties for martiller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getPropertiesByMartillerId,
};
