// controllers/editMartillerController.js
const { Martiller } = require('../db').conn.models;

const updateMartiller = async (req, res) => {
  const { id } = req.params; // Obtener el ID del martillero a editar
  const newData = req.body; // Obtener los nuevos datos del martillero desde el cuerpo de la solicitud

  try {
    // Buscar el martillero por su ID en la base de datos
    const martiller = await Martiller.findByPk(id);

    // Verificar si el martillero existe
    if (!martiller) {
      return res.status(404).json({ message: "Martillero no encontrado" });
    }

    // Actualizar los valores del martillero con los nuevos datos
    await martiller.update(newData);

    // Devolver una respuesta con el objeto actualizado
    return res.status(200).json({ message: "Martillero actualizado correctamente", martiller });
  } catch (error) {
    // Manejar errores
    console.error("Error al actualizar el martillero:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  updateMartiller
};
