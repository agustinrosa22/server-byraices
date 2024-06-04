const { Seller } = require('../db').conn.models;

const updateSeller = async (req, res) => {
    const { id } = req.params;
    const {
        mail,
        password,
        name,
        last_name,
        phone_number,
        photo,
        type,
        status,
    } = req.body;

    try {
        // Encuentra el vendedor por ID
        const seller = await Seller.findByPk(id);

        // Si no se encuentra el vendedor, devuelve un error 404
        if (!seller) {
            return res.status(404).json({ message: `Vendedor con ID ${id} no encontrado.` });
        }

        // Actualiza los campos del vendedor
        await seller.update({
            mail,
            password,
            name,
            last_name,
            phone_number,
            photo,
            type,
            status,
        });

        // Retorna el vendedor actualizado
        return res.status(200).json(seller);
    } catch (error) {
        return res.status(500).json({ message: `Error actualizando el vendedor: ${error.message}` });
    }
};

module.exports = {
    updateSeller
};
