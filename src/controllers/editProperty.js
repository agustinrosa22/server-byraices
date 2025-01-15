const { Property } = require('../db').conn.models;

const updateProperty = async (req, res) => {
    const { id } = req.params; // ID de la propiedad
    const { newPhotosOrder, photosToAdd, photosToRemove, ...newData } = req.body; // Desestructuración para manipular fotos

    try {
        // Buscar la propiedad por su ID en la base de datos
        const property = await Property.findByPk(id);

        // Verificar si la propiedad existe
        if (!property) {
            return res.status(404).json({ message: "Propiedad no encontrada" });
        }

        // Inicializar el array de fotos actual
        let updatedPhotos = property.photo || [];

        // Reordenar fotos si se proporciona un nuevo orden
        if (newPhotosOrder) {
            updatedPhotos = newPhotosOrder;
        }

        // Agregar nuevas fotos
        if (photosToAdd && Array.isArray(photosToAdd)) {
            updatedPhotos.push(...photosToAdd);
        }

        // Eliminar fotos específicas
        if (photosToRemove && Array.isArray(photosToRemove)) {
            updatedPhotos = updatedPhotos.filter(photo => !photosToRemove.includes(photo));
        }

        // Si se suben nuevas fotos desde archivos
        if (req.files && req.files.photo) {
            const uploadedPhotoPaths = req.files.photo.map(file => `https://server.byraices.com/${file.filename}`);
            updatedPhotos.push(...uploadedPhotoPaths);
        }

        // Actualizar los valores de la propiedad con los nuevos datos
        await property.update({
            ...newData, // Otros datos de la propiedad
            photo: updatedPhotos // Actualizar el array de fotos
        });

        // Devolver una respuesta con el objeto actualizado
        return res.status(200).json({ message: "Propiedad actualizada correctamente", property });
    } catch (error) {
        // Manejar errores
        console.error("Error al actualizar la propiedad:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

module.exports = {
    updateProperty
};
