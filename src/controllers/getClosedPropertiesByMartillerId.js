const { Martiller, Property } = require('../db').conn.models;
require('dotenv').config();

const getClosedPropertiesByMartillerId = async (req, res) => {
    const { martillerId } = req.params;

    try {
        // Buscar el martillero por ID
        const martiller = await Martiller.findByPk(martillerId, {
            include: {
                model: Property,
                as: 'properties',
                where: {
                    'cerrado.cierre': true // Incluir solo propiedades con cerrado.cierre = true
                }
            }
        });

        if (!martiller) {
            return res.status(404).json({ error: 'Martiller not found' });
        }

        // Caso 200: Solicitud exitosa
        return res.status(200).json({
            success: true,
            message: 'Closed properties fetched successfully',
            data: martiller.properties
        });
    } catch (error) {
        console.error('Error fetching closed properties for martiller:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getClosedPropertiesByMartillerId,
};
