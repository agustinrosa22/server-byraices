const { getAllUsers } = require('../controllers/getAllUsers');

const getAllUsersHandler = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            success: true,
            message: 'Usuarios obtenidos exitosamente',
            data: users,
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios',
        });
    }
};

module.exports = { getAllUsersHandler };
