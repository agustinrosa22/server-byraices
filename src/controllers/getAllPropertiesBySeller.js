const { Property } = require('../db').conn.models;

const getPropertiesBySellerId = async (sellerId) => {
  try {
    const properties = await Property.findAll({
      where: { sellerId }, // Condición para filtrar por sellerId
    });
    return properties; // Devuelve la lista de propiedades
  } catch (error) {
    throw new Error(`Error fetching properties for seller ID ${sellerId}: ${error.message}`);
  }
};

module.exports = {
  getPropertiesBySellerId,
};
