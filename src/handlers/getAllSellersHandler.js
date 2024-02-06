const { getAllSellers } = require('../controllers/getAllSellers')

const getAllSellersHandler = async (req, res) => {
    try {
        const sellers = await getAllSellers();
        res.status(200).json({
            success: true,
            message: 'Vendedores obtenidos exitosamente',
            data: sellers,
        });
    } catch (error) {
        console.error('Error al obtener vendedores:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al obtener vendedores',
        });
    }
};

module.exports = { getAllSellersHandler };