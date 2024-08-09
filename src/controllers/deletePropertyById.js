const { Property } = require('../db').conn.models;

const deletePropertyById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('ID recibido:', id); // Depura el valor del ID

        // Verificar que el id sea un valor válido
        if (typeof id !== 'number' && typeof id !== 'string') {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Buscar la propiedad por ID
        const property = await Property.findByPk(id);

        // Si no se encuentra la propiedad, lanzar un error
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        // Eliminar la propiedad
        await property.destroy();

        // Devolver una confirmación de que se eliminó
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        // Manejo de errores
        console.error(`Error al eliminar la propiedad: ${error.message}`);
        return res.status(500).json({ message: `Error al eliminar la propiedad: ${error.message}` });
    }
};

module.exports = { deletePropertyById };
