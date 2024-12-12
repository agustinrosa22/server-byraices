const { Rental, Property } = require('../db').conn.models;

const createRental = async (req, res) => {
  try {
    const { propertyId, rentValue, contractStart, contractEnd, paymentDueDate, incrementRate, documentRent } = req.body;

    // Verificar si la propiedad existe
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Crear el contrato de alquiler
    const rental = await Rental.create({
      propertyId,
      rentValue,
      contractStart,
      contractEnd,
      paymentDueDate,
      incrementRate,
      documentRent,
    });

    res.status(201).json(rental);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating rental', error });
  }
};


module.exports = {
    createRental
};