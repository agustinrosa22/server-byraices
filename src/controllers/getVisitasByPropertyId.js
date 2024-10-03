const { Visita } = require('../db').conn.models;

// Obtener visitas por propertyId
const getVisitasByPropertyId = async (req, res) => {
  const { propertyId } = req.params; // Obtener el ID de la propiedad desde los parámetros de la URL

  try {
    // Buscar visitas asociadas al propertyId
    const visitas = await Visita.findAll({
      where: { propertyId }
    });

    // Si se encuentran visitas, devolverlas con status 200
    if (visitas.length > 0) {
      return res.status(200).json(visitas);
    } else {
      // Si no hay visitas para esa propiedad, devolver status 204
      return res.status(204).json({ message: `No hay visitas para la propiedad con ID ${propertyId}` });
    }
  } catch (error) {
    // Manejo de errores
    console.error(`Error al obtener visitas para propertyId ${propertyId}:`, error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getVisitasByPropertyId };
