const { getUserById } = require('../controllers/getUserById');

const getUserByIdHandler = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Usuario obtenido exitosamente',
            data: user,
        });
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuario por ID',
        });
    }
};

module.exports = { getUserByIdHandler };
