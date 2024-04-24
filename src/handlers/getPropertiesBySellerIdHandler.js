const { getPropertiesBySellerId } = require('../controllers/getPropertiesBySellerId');

const getPropertiesBySellerIdHandler = async (req, res) => {
  const { sellerId } = req.params; // Obtener el ID del vendedor del parámetro de la ruta

  if (!sellerId) {
    return res.status(400).json({
      success: false,
      message: 'Seller ID is required',
    });
  }

  try {
    const properties = await getPropertiesBySellerId(sellerId); // Llamar al controlador
    res.status(200).json({
      success: true,
      message: `Properties for seller ID ${sellerId} retrieved successfully`,
      data: properties,
    });
  } catch (error) {
    console.error(`Error fetching properties for seller ID ${sellerId}:`, error.message);
    res.status(500).json({
      success: false,
      message: `Error fetching properties for seller ID ${sellerId}`,
    });
  }
};

module.exports = {
  getPropertiesBySellerIdHandler,
};
