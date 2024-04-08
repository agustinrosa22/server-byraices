const { Admin } = require('../db').conn.models;
require('dotenv').config()

const createAdmin = async ({
    mail,
    password,
    type,
}) => {
    const created = await Admin.create({
        mail,
        password,
        type,
    })
    return created
}

module.exports = {
    createAdmin
}