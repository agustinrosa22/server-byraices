const { Seller, Martiller } = require('../db').conn.models;

const getMartillerBySellerId = async (req, res) => {
  const { sellerId } = req.params;

  try {
    // Buscar el vendedor por ID
    const seller = await Seller.findByPk(sellerId);

    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    // Buscar el martillero relacionado con el vendedor
    const martiller = await Martiller.findByPk(seller.martillerId);

    if (!martiller) {
      return res.status(404).json({ error: 'No martiller found for this seller' });
    }

    // Caso 200: Solicitud exitosa
    return res.status(200).json(martiller);
  } catch (error) {
    console.error('Error fetching martiller for seller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getMartillerBySellerId,
};
