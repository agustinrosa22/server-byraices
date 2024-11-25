const { Seller } = require('../db').conn.models;

const getAllSellers = async (req, res) => {
  try {
    // Obtener todos los vendedores
    const sellers = await Seller.findAll();

    if (!sellers || sellers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No sellers found',
      });
    }

    // Ordenar por status (true primero, false después) y por name alfabéticamente dentro de cada grupo
    const sortedSellers = sellers.sort((a, b) => {
      if (a.status === b.status) {
        return a.name.localeCompare(b.name); // Ordenar alfabéticamente si tienen el mismo status
      }
      return b.status - a.status; // Ordenar por status: true (1) antes que false (0)
    });

    return res.status(200).json({
      success: true,
      message: 'Sellers retrieved successfully',
      data: sortedSellers,
    });
  } catch (error) {
    console.error('Error fetching sellers:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { getAllSellers };
