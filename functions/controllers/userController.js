"use strict"

const {addDataByEmail, loginUser, updateEmail} = require("../common-core/constConsume")

const addUser = async (req, res) => {
    await addDataByEmail(req, res);
}

const login = async (req, res) => {
    await  loginUser(req, res);
}

const updateEmail = async (req, res) => {
    await updateEmail(req, res);
}

module.exports = {
    addUser,
    login,
    updateEmail
}