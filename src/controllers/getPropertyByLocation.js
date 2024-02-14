const { Op } = require('sequelize');
const { Property } = require('../db').conn.models;

const propertyController = {
    async getPropertiesByLocation(location) {
      const properties = await Property.findAll({ where: { location: { [Op.iLike]: `%${location}%` } } });
      if (!properties || properties.length === 0) {
        // No se encontraron propiedades con la ubicación especificada
        throw new Error('No se encontraron propiedades con la ubicación especificada');
      }
      return properties;
    }
  };
module.exports = propertyController;
