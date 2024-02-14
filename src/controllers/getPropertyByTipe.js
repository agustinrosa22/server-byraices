const { Op } = require('sequelize');
const { Property } = require('../db').conn.models;

const propertyController = {
  async getPropertiesByType(propertyType) {
    const properties = await Property.findAll({ where: { propertyType: { [Op.iLike]: `%${propertyType}%` } } });
    return properties;
  }
};

module.exports = propertyController;
