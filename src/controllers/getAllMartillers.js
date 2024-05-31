const { Martiller } = require('../db').conn.models;

const getAllMartillers = async (req, res) => {
  try {
    // Obtener todos los martilleros de la base de datos
    const martillers = await Martiller.findAll();
    
    // Devolver la lista de martilleros en la respuesta
    return res.status(200).json(martillers);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener los martilleros:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  getAllMartillers
};