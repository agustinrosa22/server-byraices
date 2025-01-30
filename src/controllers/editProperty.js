const { Property } = require('../db').conn.models;
const fs = require('fs');
const path = require('path');

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

        // Reemplazar todas las fotos si se suben nuevas fotos
        if (req.files && req.files.photo) {
            // Eliminar las fotos antiguas del servidor
            if (updatedPhotos.length > 0) {
                updatedPhotos.forEach(oldPhotoPath => {
                    const filePath = path.join(__dirname, '..', 'uploads', oldPhotoPath.split('/').pop()); // Extraer el nombre de archivo
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath); // Eliminar foto antigua
                    }
                });
            }

            // Subir las nuevas fotos
            const uploadedPhotoPaths = req.files.photo.map(file => `https://server.byraices.com/uploads/${file.filename}`);
            updatedPhotos = uploadedPhotoPaths; // Reemplazar todas las fotos antiguas por las nuevas
        }

        // Reordenar fotos si se proporciona un nuevo orden
        if (newPhotosOrder) {
            updatedPhotos = newPhotosOrder;
        }

        // Eliminar fotos específicas si se solicita
        if (photosToRemove && Array.isArray(photosToRemove)) {
            updatedPhotos = updatedPhotos.filter(photo => !photosToRemove.includes(photo));
        }

        // Manejo de documentos (si hay nuevos documentos)
        let updatedDocuments = property.documentation || [];
        if (req.files && req.files.documentation) {
            // Eliminar documentos antiguos del servidor si es necesario
            if (updatedDocuments.length > 0) {
                updatedDocuments.forEach(oldDocPath => {
                    const docPath = path.join(__dirname, '..', 'uploads', oldDocPath.split('/').pop());
                    if (fs.existsSync(docPath)) {
                        fs.unlinkSync(docPath); // Eliminar documento antiguo
                    }
                });
            }

            // Subir nuevos documentos
            const uploadedDocumentPaths = req.files.documentation.map(file => `https://server.byraices.com/uploads/${file.filename}`);
            updatedDocuments = uploadedDocumentPaths; // Reemplazar documentos antiguos por los nuevos
        }

        // Actualizar la propiedad con los nuevos datos
        await property.update({
            ...newData, // Otros datos de la propiedad (que no están relacionados con fotos o documentación)
            photo: updatedPhotos, // Fotos actualizadas
            documentation: updatedDocuments, // Documentos actualizados
        });

        // Devolver una respuesta con el objeto actualizado
        return res.status(200).json({ message: "Propiedad actualizada correctamente", property });
    } catch (error) {
        // Manejar errores
        console.error("Error al actualizar la propiedad:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    updateProperty
};
