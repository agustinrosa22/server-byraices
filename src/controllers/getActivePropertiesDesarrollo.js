const { Op } = require('sequelize');
const { Property } = require('../db').conn.models;

const getActivePropertiesDesarrollo = async (req, res) => {
  try {
    // Construir las condiciones de búsqueda
    let conditions = {
      statusProperty: true,
      'detailsProperty.pozo': true
    };

    // Buscar todas las propiedades que cumplan con las condiciones
    const activePropertiesWithPozo = await Property.findAll({
      where: conditions
    });

    // Devolver la lista de propiedades activas con pozo
    return res.status(200).json(activePropertiesWithPozo);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener las propiedades activas con pozo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  getActivePropertiesDesarrollo
};

