const { Op, literal } = require('sequelize');
const { Property } = require('../db').conn.models;

const getActivePropertiesForSale = async (req, res) => {
  try {
    const { province, departments, country, minPrice, maxPrice, currency, propertyType, page = 1 } = req.query;

    let conditions = {
      statusProperty: true,
      isForSale: true,
      'cerrado.cierre': false
    };

    // Filtrado por ubicación
    if (province) {
      conditions.province = province;
    }

    if (departments) {
      const formattedDepartments = departments
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, '%');
      conditions.departments = {
        [Op.or]: [
          { [Op.iLike]: `%${formattedDepartments}%` },
          { [Op.iLike]: `%${departments}%` }
        ]
      };
    }

    if (country) {
      conditions.country = country;
    }

    // Filtrar por rango de precios
    if (minPrice || maxPrice) {
      const min = minPrice ? Math.round(parseFloat(minPrice.replace(/\./g, ''))) : null;
      const max = maxPrice ? Math.round(parseFloat(maxPrice.replace(/\./g, ''))) : null;

      if (min !== null && max !== null) {
        conditions.price = literal(`CAST("price" AS NUMERIC) BETWEEN ${min} AND ${max}`);
      } else if (min !== null) {
        conditions.price = literal(`CAST("price" AS NUMERIC) >= ${min}`);
      } else if (max !== null) {
        conditions.price = literal(`CAST("price" AS NUMERIC) <= ${max}`);
      }
    }

    if (currency) {
      conditions.currency = currency;
    }

    if (propertyType) {
      conditions.propertyType = propertyType;
    }

    // Paginación: limit y offset
    const limit = 6; // Número de propiedades por página
    const offset = (page - 1) * limit; // Calcular el desplazamiento

    const { count, rows: properties } = await Property.findAndCountAll({
      where: conditions,
      limit,
      offset
    });

    // Devolver las propiedades junto con los datos de paginación
    return res.status(200).json({
      properties,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error("Error al obtener las propiedades activas para la venta:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  getActivePropertiesForSale
};
