const { Visita } = require('../db').conn.models;
require('dotenv').config();

// Controlador para crear una visita
const createVisita = async (req, res) => {
  const { 
    visitante, 
    agente, 
    fecha, 
    descripcion, 
    propertyId, 
    gusto = { yes: false, no: false }, 
    calificacionUbicacion = { excelente: false, buena: false, regular: false, mala: false },
    estado = { excelente: false, buena: false, regular: false, mala: false },
    espaciosYComodidades = { muySatisfactorio: false, satisfactorio: false, insatisfactorio: false },
    calidadPrecio = { excelente: false, buena: false, regular: false, mala: false },
    general = { excelente: false, muyBuena: false, buena: false, regular: false, mala: false },
    comprar = { yes: false, no: false}, 
    verOtras = { yes: false, no: false, maybe: false }, 
    
  } = req.body;

  try {
    // Crear una nueva visita
    const newVisita = await Visita.create({
      visitante,
      agente,
      fecha,
      descripcion,
      estado,
      propertyId, // Asociamos la visita a una propiedad existente
      gusto,
      calificacionUbicacion,
      espaciosYComodidades,
      calidadPrecio,
      general,
      comprar,
      verOtras
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
