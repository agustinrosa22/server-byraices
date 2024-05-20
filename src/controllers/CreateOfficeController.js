const { Office } = require('../db').conn.models;

// Crear una nueva oficina
const createOffice = async (req, res) => {
    try {
      const newOffice = await Office.create(req.body);
      res.status(201).json(newOffice);
    } catch (error) {
      console.error('Error al crear la oficina:', error);
      res.status(500).json({ message: 'Error al crear la oficina', error });
    }
  };

  module.exports = {
    createOffice
  }