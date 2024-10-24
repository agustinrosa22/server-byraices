const { Property } = require('../db').conn.models;

const updateProperty = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la propiedad a editar
    const newData = req.body; // Obtener los nuevos datos de la propiedad desde el cuerpo de la solicitud

    try {
        // Buscar la propiedad por su ID en la base de datos
        const property = await Property.findByPk(id);

        // Verificar si la propiedad existe
        if (!property) {
            return res.status(404).json({ message: "Propiedad no encontrada" });
        }

        // Obtener las rutas de las fotos subidas y reemplazar \ por /
        const photoPaths = req.files && req.files.photo ? 
            req.files.photo.map(file => `https://server.byraices.com/${file.filename}`) : 
            property.photo; // Mantener la foto actual si no se suben nuevas fotos

        // Parsear campos JSON si es necesario
        const parsedDetailsProperty = typeof newData.detailsProperty === 'string' ? JSON.parse(newData.detailsProperty) : newData.detailsProperty;
        const parsedCharacteristics = typeof newData.characteristics === 'string' ? JSON.parse(newData.characteristics) : newData.characteristics;
        const parsedAmenities = typeof newData.amenities === 'string' ? JSON.parse(newData.amenities) : newData.amenities;
        const parsedEnvironmentsOptions = typeof newData.environmentsOptions === 'string' ? JSON.parse(newData.environmentsOptions) : newData.environmentsOptions;
        const parsedServices = typeof newData.services === 'string' ? JSON.parse(newData.services) : newData.services;

        // Actualizar los valores de la propiedad con los nuevos datos, incluyendo fotos y documentos
        await property.update({
            ...newData,
            photo: photoPaths, // Actualizar la propiedad con las nuevas fotos
            detailsProperty: parsedDetailsProperty,
            characteristics: parsedCharacteristics,
            amenities: parsedAmenities,
            environmentsOptions: parsedEnvironmentsOptions,
            services: parsedServices,
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
