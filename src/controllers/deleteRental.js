const { Rental } = require('../db').conn.models;

const deleteRental = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findByPk(id);

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    await rental.destroy();

    res.status(200).json({ message: 'Rental deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting rental', error });
  }
};



module.exports = {
    deleteRental
  };