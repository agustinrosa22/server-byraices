const { Rental } = require('../db').conn.models;

const updateRental = async (req, res) => {
  try {
    const { id } = req.params;
    const { rentValue, contractStart, contractEnd, paymentDueDate, incrementRate, documentRent, isActive } = req.body;

    const rental = await Rental.findByPk(id);

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    // Actualizar los campos
    await rental.update({
      rentValue,
      contractStart,
      contractEnd,
      paymentDueDate,
      incrementRate,
      documentRent,
      isActive,
    });

    res.status(200).json(rental);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating rental', error });
  }
};



module.exports = {
    updateRental
  };