"use strict"

const {auth} = require("../fb")

const addDataByEmail = async (req, res) => {
    const data = req.body;
    auth.createUser({
        email: data.email,
        password: data.password,
    }).then(() => {
        auth.generateEmailVerificationLink(data.email)
        res.json({
            msg: `Usuario ${data.email} creado con éxito`
        });
    }).catch((err) => {
        res.status(400).json({
            msg: `Error al crear usuario ${data.email}`,
            err
        });
    });
}

const loginUser = async (req, res) => {
    const data = req.body;
    auth.getUserByEmail(data.email).then((userRecord) => {
        auth.createCustomToken(userRecord.uid).then((customToken) => {
            res.json(customToken);
        }).catch((err) => {
            res.status(400).json({
                msg: `Error al crear token para usuario ${data.email}`,
                err
            });
        });
    }).catch((err) => {
        res.status(400).json({
            msg: `Error al buscar usuario ${data.email}`,
            err
        });
    });
}

module.exports = {
    addDataByEmail,
    loginUser
};