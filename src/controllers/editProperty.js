const { Property } = require('../db').conn.models;

const updateProperty = async(req, res) => {
    const { id } = req.params; // Obtener el ID de la propiedad a editar
  const newData = req.body; // Obtener los nuevos datos de la propiedad desde el cuerpo de la solicitud

  try {
    // Buscar la propiedad por su ID en la base de datos
    const property = await Property.findByPk(id);

    // Verificar si la propiedad existe
    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    // Actualizar los valores de la propiedad con los nuevos datos
    await property.update(newData);

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