const { Office } = require('../db').conn.models;    

const updateOffice = async (req, res) => {
    const { id } = req.params;
    const {
        image,
        name,
        location,
        street,
        number,
        country,
        province,
        departments,
        locality,
        phone_number,
        disclaimer,
    } = req.body;

    try {
        // Encuentra la oficina por ID
        const office = await Office.findByPk(id);

        // Si no se encuentra la oficina, devuelve un error 404
        if (!office) {
            return res.status(404).json({ message: `Oficina con ID ${id} no encontrada.` });
        }

        // Actualiza los campos de la oficina
        await office.update({
            image,
            name,
            location,
            street,
            number,
            country,
            province,
            departments,
            locality,
            phone_number,
            disclaimer,
        });

        // Retorna la oficina actualizada
        return res.status(200).json(office);
    } catch (error) {
        console.error('Error al actualizar la oficina:', error);
        return res.status(500).json({ message: `Error actualizando la oficina: ${error.message}` });
    }
};

module.exports = {
    updateOffice
};