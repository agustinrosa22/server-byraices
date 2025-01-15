const { Property } = require('../db').conn.models;

const getActivePropertiesForRent = async (req, res) => {
  try {
    // Buscar todas las propiedades que tengan "statusProperty" y "isForSale" como true
    const activePropertiesForRent = await Property.findAll({
      where: {
        statusProperty: true,
        isForRent: true,
        'cerrado.cierre': false
      }
    });

    // Devolver la lista de propiedades activas para la venta
    return res.status(200).json(activePropertiesForRent);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener las propiedades activas para la renta:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
    getActivePropertiesForRent
};
