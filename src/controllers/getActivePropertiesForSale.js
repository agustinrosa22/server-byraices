const { Property } = require('../db').conn.models;

const getActivePropertiesForSale = async (req, res) => {
  try {
    // Buscar todas las propiedades que tengan "statusProperty" y "isForSale" como true
    const activePropertiesForSale = await Property.findAll({
      where: {
        statusProperty: true,
        isForSale: true
      }
    });

    // Devolver la lista de propiedades activas para la venta
    return res.status(200).json(activePropertiesForSale);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener las propiedades activas para la venta:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  getActivePropertiesForSale
};
