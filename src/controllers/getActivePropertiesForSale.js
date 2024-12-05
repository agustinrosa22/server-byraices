const { Op, literal } = require('sequelize');
const { Property } = require('../db').conn.models;

const getActivePropertiesForSale = async (req, res) => {
  try {
    const { province, departments, country, minPrice, maxPrice, currency, propertyType  } = req.query;

    let conditions = {
      statusProperty: true,
      isForSale: true,
      'cerrado.cierre': false
    };

    if (province) {
      conditions.province = province;
    }

    if (departments) {
      const formattedDepartments = departments
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
        .toLowerCase()
        .replace(/\s+/g, '%'); // Reemplaza espacios por %
    
      // Normalizamos los datos en la consulta para manejar acentos y espacios
      conditions.departments = {
        [Op.or]: [
          { [Op.iLike]: `%${formattedDepartments}%` }, // Búsqueda sin acentos
          { [Op.iLike]: `%${departments}%` }           // Búsqueda con el formato original
        ]
      };
    }
    if (country) {
      conditions.country = country;
    }

    // Filtrar por rango de precios usando `parseFloat` y redondeo
    if (minPrice || maxPrice) {
      const min = minPrice ? Math.round(parseFloat(minPrice.replace(/\./g, ''))) : null;
      const max = maxPrice ? Math.round(parseFloat(maxPrice.replace(/\./g, ''))) : null;

      // Usar Sequelize.literal para las condiciones de rango en `price`
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

     // Filtrar por `propertyType` si está presente
     if (propertyType) {
      conditions.propertyType = propertyType;
    }

    const activePropertiesForSale = await Property.findAll({
      where: conditions
    });

    return res.status(200).json(activePropertiesForSale);
  } catch (error) {
    console.error("Error al obtener las propiedades activas para la venta:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  getActivePropertiesForSale
};
