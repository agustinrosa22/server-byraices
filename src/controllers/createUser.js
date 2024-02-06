const { User } = require('../db').conn.models;
require('dotenv').config()

const createUser = async ({
    mail,
    password,
    name,
    last_name,
    phone_number,
    img,
    type,
}) => {
    const created = await User.create({
        mail,
        password,
        name,
        last_name,
        phone_number,
        img,
        type,
    })
    return created
}

module.exports = {
    createUser
}