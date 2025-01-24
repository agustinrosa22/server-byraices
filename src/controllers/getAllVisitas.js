const { Visita } = require('../db').conn.models;

// Obtener todas las visitas ordenadas por la propiedad "fecha"
const getAllVisitas = async (req, res) => {
  try {
    // Traer todas las visitas y ordenarlas por la propiedad "fecha" (las más recientes primero)
    const visitas = await Visita.findAll({
      order: [['fecha', 'DESC']], // Ordenar por "fecha" en orden descendente
    });

    // Si hay visitas, devolverlas con status 200
    if (visitas.length > 0) {
      return res.status(200).json(visitas);
    } else {
      // Si no hay visitas, devolver status 204 (No Content)
      return res.status(204).json({ message: 'No hay visitas registradas' });
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener las visitas:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getAllVisitas };
