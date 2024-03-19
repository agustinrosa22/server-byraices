const { Property } = require('../db').conn.models;

const getActiveProperties = async (req, res) => {
  try {
    // Buscar todas las propiedades que tengan "statusProperty" como true
    const activeProperties = await Property.findAll({
      where: {
        statusProperty: true
      }
    });

    // Devolver la lista de propiedades activas
    return res.status(200).json(activeProperties);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener las propiedades activas:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  getActiveProperties
};
