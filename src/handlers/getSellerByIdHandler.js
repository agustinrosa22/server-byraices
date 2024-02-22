const { getSellerById } = require('../controllers/getSellerByIdController');

const getSellerByIdHandler = async (req, res) => {
    try {
        const { sellerId } = req.params;
        const seller = await getSellerById(sellerId);
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Vendedor no encontrado',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Vendedor encontrado exitosamente',
            data: seller,
        });
    } catch (error) {
        console.error('Error al obtener vendedor por ID:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al obtener vendedor por ID',
        });
    }
};

module.exports = { getSellerByIdHandler };
