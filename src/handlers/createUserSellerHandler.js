const { createUserSeller } = require('../controllers/createUserSeller');

const createUserSellerHandler = async (req, res) => {
    try {
        const userData = req.body;

        // Accedemos a la foto del vendedor si fue cargada
        const photoPath = req.files['photo'] ? `https://server.byraices.com/${req.files['photo'][0].filename}` : null;

        // Añadimos la URL de la foto a los datos del vendedor
        const sellerData = {
            ...userData,
            photo: photoPath // Incluimos la URL de la foto en los datos del vendedor
        };

        const seller = await createUserSeller(sellerData);

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
