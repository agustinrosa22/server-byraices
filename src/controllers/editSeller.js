const { Seller } = require('../db').conn.models;


const updateSeller = async (req, res) => {
    const { id } = req.params;
    const {
        mail,
        password,
        name,
        last_name,
        phone_number,
        type,
        status,
        martillerId,
    } = req.body;

    try {
        const seller = await Seller.findByPk(id);

        if (!seller) {
            return res.status(404).json({ message: `Vendedor con ID ${id} no encontrado.` });
        }

        console.log('Archivos recibidos:', req.files); // Agrega este log para ver qué archivos se reciben

        // Obtener la ruta de la foto si fue subida
        const photoPath = req.files && req.files.photo && req.files.photo.length > 0 
            ? `https://server.byraices.com/uploads/${req.files.photo[0].filename}` 
            : seller.photo;

        await seller.update({
            mail,
            password,
            name,
            last_name,
            phone_number,
            photo: photoPath, // Actualizar la foto solo si se ha subido una nueva
            type,
            status,
            martillerId
        });

        return res.status(200).json({ message: "Vendedor actualizado correctamente", seller });
    } catch (error) {
        return res.status(500).json({ message: `Error actualizando el vendedor: ${error.message}` });
    }
};

module.exports = {
    updateSeller
};
