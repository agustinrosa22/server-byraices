const { Op } = require('sequelize');
const { Property } = require('../db').conn.models;

const propertyController = {
    async filterProperties(filters) {
      try {
        const properties = await Property.findAll({
          where: {
            [Op.and]: [
              filters.isForSale !== undefined ? { isForSale: filters.isForSale } : {},
              filters.isForRent !== undefined ? { isForRent: filters.isForRent } : {},
              filters.isFinished !== undefined ? { isFinished: filters.isFinished } : {},
              filters.isUnderDevelopment !== undefined ? { isUnderDevelopment: filters.isUnderDevelopment } : {},
            ]
          }
        });
        return properties;
      } catch (error) {
        throw error;
      }
    }
  };
  
  module.exports = {propertyController};