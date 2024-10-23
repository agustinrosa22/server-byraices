const { Op } = require('sequelize');
const { Property } = require('../db').conn.models;

const getPropertiesSellId = async (req, res) => {
  try {
    // Obtener los parámetros de consulta
    const { province, departments, country, minPrice, maxPrice, currency } = req.query;

    // Construir las condiciones de búsqueda
    let conditions = {
      statusProperty: true,
      isForSale: true
    };

    if (province) {
      conditions.province = province;
    }

    if (departments) {
      conditions.departments = departments;
    }

    if (country) {
      conditions.country = country;
    }

    if (minPrice || maxPrice) {
      conditions.price = {};
      if (minPrice) {
        conditions.price[Op.gte] = minPrice;
      }
      if (maxPrice) {
        conditions.price[Op.lte] = maxPrice;
      }
    }

    if (currency) {
      conditions.currency = currency;
    }

    // Buscar todas las propiedades que cumplan con las condiciones y devolver solo el "id"
    const activePropertiesForSale = await Property.findAll({
      where: conditions,
      attributes: ['id'] // Solo devuelve el campo "id"
    });

    // Devolver la lista de propiedades activas para la venta (solo el "id")
    return res.status(200).json(activePropertiesForSale);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener las propiedades activas para la venta:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
    getPropertiesSellId
};
