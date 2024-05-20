const { Office } = require('../db').conn.models;

// Obtener todas las oficinas
const getAllOffices = async (req, res) => {
    try {
      const offices = await Office.findAll();
      res.status(200).json(offices);
    } catch (error) {
      console.error('Error al obtener las oficinas:', error);
      res.status(500).json({ message: 'Error al obtener las oficinas', error });
    }
  };

  
module.exports = {
    getAllOffices
}