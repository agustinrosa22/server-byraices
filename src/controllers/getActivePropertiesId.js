const { Property } = require('../db').conn.models;

const getActivePropertiesId = async (req, res) => {
  try {
    // Buscar todas las propiedades que tengan "statusProperty" como true y devolver solo el "id"
    const activeProperties = await Property.findAll({
      where: {
        statusProperty: true
      },
      attributes: ['id'], // Solo devuelve el campo "id"
      order: [['createdAt', 'DESC']] // Ordenar por "createdAt" en orden descendente
    });

    // Devolver la lista de propiedades activas (solo el "id")
    return res.status(200).json(activeProperties);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener las propiedades activas:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
    getActivePropertiesId
};
