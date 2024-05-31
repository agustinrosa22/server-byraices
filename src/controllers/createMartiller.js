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
    matricula,
}) => {
    const created = await Martiller.create({
        mail,
        password,
        name,
        last_name,
        phone_number,
        img,
        type,
        matricula
    })
    return created
}

module.exports = {
    createMartiller
}