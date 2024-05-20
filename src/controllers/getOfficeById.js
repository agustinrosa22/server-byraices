const { Office } = require('../db').conn.models;

// Obtener una oficina por ID
const getOfficeById = async (req, res) => {
    const { id } = req.params;
    try {
      const office = await Office.findByPk(id);
      if (office) {
        res.status(200).json(office);
      } else {
        res.status(404).json({ message: 'Oficina no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la oficina:', error);
      res.status(500).json({ message: 'Error al obtener la oficina', error });
    }
  };
  

  module.exports = {
    getOfficeById
  }