const { getSellerById } = require('../controllers/getSellerByIdController');

const getSellerByIdHandler = async (req, res) => {
    const sellerId = req.params.id;
    try {
        const seller = await getSellerById(sellerId);
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado', 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Usuario obtenido exitosamente',
            data: seller,
        });
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuario por ID',
        });
    }
}

module.exports = { getSellerByIdHandler };