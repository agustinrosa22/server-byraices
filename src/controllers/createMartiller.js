const { Martiller } = require('../db').conn.models;
require('dotenv').config()

const createMartiller = async ({
    mail,
    password,
    name,
    last_name,
    phone_number,
    img,
    type,
}) => {
    const created = await Martiller.create({
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
    createMartiller
}