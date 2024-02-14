const { User } = require('../db').conn.models;

const getUserById = async (userId) => {
    const user = await User.findByPk(userId);
    return user;
};

module.exports = { getUserById };
