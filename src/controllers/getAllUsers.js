const { User } = require('../db').conn.models;

const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
};

module.exports = { getAllUsers };
