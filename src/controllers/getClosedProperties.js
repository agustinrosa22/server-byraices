const { Op } = require('sequelize');
const { Property } = require('../db').conn.models;

const getClosedProperties = async (req, res) => {
  try {
    const { isForSale, isForRent, propertyType } = req.query;

    let conditions = {
      'cerrado.cierre': true, // Solo propiedades cerradas
    };

    // Filtrar por tipo de operación (venta o alquiler)
    if (isForSale !== undefined) {
      conditions.isForSale = isForSale === 'true';
    }

    if (isForRent !== undefined) {
      conditions.isForRent = isForRent === 'true';
    }

    // Filtrar por tipo de propiedad
    if (propertyType) {
      conditions.propertyType = propertyType;
    }

    // Obtener todas las propiedades cerradas sin paginación
    const properties = await Property.findAll({ where: conditions });

    return res.status(200).json({ properties });
  } catch (error) {
    console.error("Error al obtener propiedades cerradas:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  getClosedProperties
};
