const { Property } = require('../db').conn.models;

const formatPricesInDatabase = async (req, res) => {
  try {
    // Obtener todas las propiedades de la base de datos
    const properties = await Property.findAll();

    // Procesar la eliminación de puntos en el precio para cada propiedad
    const updates = properties.map(async (property) => {
      if (typeof property.price === 'string' && property.price.includes('.')) {
        try {
          // Eliminar puntos del precio
          const formattedPrice = property.price.replace(/\./g, '');
          // Actualizar el precio en la base de datos
          await property.update({ price: formattedPrice });
        } catch (err) {
          console.error(`Error al actualizar el precio para la propiedad con ID ${property.id}:`, err);
        }
      }
    });

    // Esperar que todas las actualizaciones terminen
    await Promise.all(updates);

    return res.status(200).json({ message: "Precios formateados correctamente" });
  } catch (error) {
    console.error("Error al formatear los precios:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  formatPricesInDatabase,
};
