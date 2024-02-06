const { createUserSeller } = require('../controllers/createUserSeller');

const createUserSellerHandler = async (req, res) => {
    try {
        const userData = req.body;
        const seller = await createUserSeller(userData);
        res.status(201).json({
            success: true,
            message: 'Usuario vendedor creado exitosamente',
            data: seller,
        });
    } catch (error) {
        console.error('Error al crear usuario vendedor:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al crear usuario vendedor',
        });
    }
};

module.exports = { createUserSellerHandler };
