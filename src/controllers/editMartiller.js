const { Martiller } = require('../db').conn.models;

const updateMartiller = async (req, res) => {
  const { id } = req.params;
  const {
    mail,
    password,
    name,
    last_name,
    phone_number,
    type,
    status,
    matricula,
  } = req.body;

  try {
    // Buscar el martillero por su ID en la base de datos
    const martiller = await Martiller.findByPk(id);

    // Verificar si el martillero existe
    if (!martiller) {
      return res.status(404).json({ message: "Martillero no encontrado" });
    }

    // Logs para verificar qué archivos recibes
    console.log('Archivos recibidos:', req.files);

    // Obtener las rutas de los archivos si fueron subidos
    const imgPath = req.files && req.files.img ? `https://server.byraices.com/uploads/${req.files.img[0].filename}` : martiller.img;

    // Actualizar los valores del martillero con los nuevos datos
    await martiller.update({
      mail,
      password,
      name,
      last_name,
      phone_number,
      img: imgPath,  // Actualizar la imagen solo si se ha subido una nueva
      type,
      status,
      matricula
    });

    // Retorna respuesta con el martillero actualizado
    return res.status(200).json({ 
      message: "Martillero actualizado correctamente", 
      martiller, 
      img: imgPath,
    });
  } catch (error) {
    console.error("Error al actualizar el martillero:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  updateMartiller
};
