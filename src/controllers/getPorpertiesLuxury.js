const { Op, literal } = require('sequelize');
const { Property } = require('../db').conn.models;

const getPropertiesLuxury = async (req, res) => {
  try {
    // Construir las condiciones de búsqueda
    let conditions = {
      statusProperty: true,
      currency: "USD",
      [Op.and]: literal('CAST(REPLACE("price", \'.\', \'\') AS INTEGER) > 200000')
    };

    // Buscar todas las propiedades que cumplan con las condiciones
    const propertiesWithPriceAbove30000 = await Property.findAll({
      where: conditions
    });

    // Devolver la lista de propiedades
    return res.status(200).json(propertiesWithPriceAbove30000);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener las propiedades lujosas", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
    getPropertiesLuxury
};
