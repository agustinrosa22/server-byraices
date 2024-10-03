const { Visita } = require('../db').conn.models;
require('dotenv').config();

// Controlador para crear una visita
const createVisita = async (req, res) => {
  const { visitante, agente, fecha, descripcion, propertyId } = req.body;

  try {
    // Crear una nueva visita
    const newVisita = await Visita.create({
      visitante,
      agente,
      fecha,
      descripcion,
      propertyId,  // Asociamos la visita a una propiedad existente
    });

    // Responder con la visita creada
    return res.status(201).json({
      message: 'Visita creada exitosamente',
      visita: newVisita,
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error al crear la visita:', error);
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
};

module.exports = {
  createVisita,
};
