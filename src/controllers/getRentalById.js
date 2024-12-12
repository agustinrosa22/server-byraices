const { Rental, Property } = require('../db').conn.models;

const getRentalById = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findByPk(id, {
      include: {
        model: Property,
        as: 'property',
      },
    });

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    res.status(200).json(rental);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rental', error });
  }
};


module.exports = {
    getRentalById
  };