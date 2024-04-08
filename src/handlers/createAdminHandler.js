const { createAdmin } = require('../controllers/createAdmin');

const createUserAdminrHandler = async (req, res) => {
    try {
        const userData = req.body;
        const admin = await createMartiller(userData);
        res.status(201).json({
            success: true,
            message: 'Usuario Administrador creado exitosamente',
            data: admin,
        });
    } catch (error) {
        console.error('Error al crear usuario administrador:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al crear usuario administrador',
        });
    }
};

module.exports = { createUserAdminrHandler };