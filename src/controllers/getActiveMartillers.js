const { Martiller } = require('../db').conn.models;

const getActiveMartillers = async (req, res) => {
  try {
    // Obtener todos los martilleros con status: true
    const activeMartillers = await Martiller.findAll({
      where: {
        status: true
      }
    });

    // Devolver la lista de martilleros en la respuesta
    return res.status(200).json(activeMartillers);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener los martilleros activos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  getActiveMartillers
};
