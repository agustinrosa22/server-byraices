const { createMartiller } = require('../controllers/createMartiller');

const createUserMartillerHandler = async (req, res) => {
    try {
        const userData = req.body;
        const martiller = await createMartiller(userData);
        res.status(201).json({
            success: true,
            message: 'Usuario Martiller creado exitosamente',
            data: martiller,
        });
    } catch (error) {
        console.error('Error al crear usuario martiller:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al crear usuario vendedor',
        });
    }
};

module.exports = { createUserMartillerHandler };