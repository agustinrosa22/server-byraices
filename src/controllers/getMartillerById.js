const { Martiller } = require('../db').conn.models;
require('dotenv').config();

const getMartillerById = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el martillero por ID
        const martiller = await Martiller.findByPk(id);

        if (!martiller) {
            return res.status(404).json({ error: 'Martiller not found' });
        }

        // Caso 200: Solicitud exitosa
        return res.status(200).json({
            success: true,
            message: 'Martiller fetched successfully',
            data: martiller
        });
    } catch (error) {
        console.error('Error fetching martiller:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getMartillerById,
};
