const { Property, Op } = require('../db').conn.models;

const getActiveProperties = async (req, res) => {
  try {
    // Extraer parámetros de consulta
    const { cerrado, orderBy, search } = req.query;

    // Configurar filtros dinámicos
    const whereCondition = {};
    const orderCondition = [];

    // Filtro para propiedades cerradas
    if (cerrado === 'true') {
      whereCondition['cerrado.cierre'] = true;
    } else if (cerrado === 'false') {
      whereCondition['cerrado.cierre'] = false;
    }

    // Filtro para propiedades activas
    whereCondition.statusProperty = true;

    // Filtro de búsqueda (search)
    if (search) {
      // Asegúrate de que search es un número si es que buscas por ID
      if (!isNaN(search)) {
        whereCondition.id = parseInt(search);  // Buscar por ID (si es numérico)
      } 
    }

    // Ordenar por "updatedAt" o "createdAt"
    if (orderBy === 'updatedAt') {
      orderCondition.push(['updatedAt', 'DESC']);
    } else {
      orderCondition.push(['createdAt', 'DESC']); // Por defecto
    }

    // Consultar las propiedades con los filtros dinámicos
    const properties = await Property.findAll({
      where: whereCondition,
      order: orderCondition,
    });

    // Devolver la lista de propiedades filtradas
    return res.status(200).json(properties);
  } catch (error) {
    // Manejar errores
    console.error('Error al obtener las propiedades:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getActiveProperties,
};
