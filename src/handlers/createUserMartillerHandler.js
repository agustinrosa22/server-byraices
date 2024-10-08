const { createUserMartiller } = require('../controllers/createUserMartiller');

const createUserMartillerHandler = async (req, res) => {
    try {
        const userData = req.body;

        // Obtener la ruta de la imagen subida si es que se cargó una
        const imgPath = req.files['img'] ? `http://localhost:3000/${req.files['img'][0].filename}` : null;

        // Añadir la URL de la imagen a los datos del martillero
        const martillerData = {
            ...userData,
            img: imgPath // Incluimos la URL de la imagen
        };

        const martiller = await createUserMartiller(martillerData);

        res.status(201).json({
            success: true,
            message: 'Usuario martillero creado exitosamente',
            data: martiller,
        });
    } catch (error) {
        console.error('Error al crear usuario martillero:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error al crear usuario martillero',
        });
    }
};

module.exports = { createUserMartillerHandler };
