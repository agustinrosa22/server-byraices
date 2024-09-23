const { Seller } = require('../db').conn.models;

// Obtener todos los sellers con status: false
const getInactiveSellers = async (req, res) => {
  try {
    // Buscar vendedores donde el status sea false
    const sellers = await Seller.findAll({
      where: { status: false }
    });

    // Si se encuentran vendedores, devolverlos con status 200
    if (sellers.length > 0) {
      return res.status(200).json(sellers);
    } else {
      // Si no hay vendedores inactivos, devolver una respuesta vacía con status 204
      return res.status(204).json({ message: 'No hay vendedores inactivos disponibles' });
    }
  } catch (error) {
    // Si ocurre un error, devolver status 500 con un mensaje de error
    console.error("Error al obtener vendedores inactivos:", error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getInactiveSellers };
