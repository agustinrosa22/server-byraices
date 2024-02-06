const { createUser } = require('../controllers/createUser');

const createUserHandler = async (req, res) => {
    try {
        const {
            mail,
            password,
            name,
            last_name,
            phone_number,
            img,
            type,
        } = req.body;

        const newUser = await createUser({
            mail,
            password,
            name,
            last_name,
            phone_number,
            img,
            type,
        });

        res.status(201).json({
            success: true,
            message: 'usuario creado exitosamente',
            data: newUser,
          });
    } catch (error) {
        console.error('Error al crear el usuario:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al crear el usuario',
          });
    };
};

module.exports = {
    createUserHandler
}