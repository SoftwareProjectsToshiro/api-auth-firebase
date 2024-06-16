"use strict"

const {addDataByEmail, loginUser} = require("../common-core/constConsume")

const addUser = async (req, res) => {
    await addDataByEmail(req, res);
}

const login = async (req, res) => {
    await  loginUser(req, res);
}

module.exports = {
    addUser,
    login
}