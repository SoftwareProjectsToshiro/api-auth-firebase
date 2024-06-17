"use strict"

const {auth, db} = require("../fb")

const addDataByEmail = async (req, res) => {
    const data = req.body;
    auth.createUser({
        email: data.email,
        password: data.password,
    }).then(() => {
        const actionCodeSettings = {
            url: 'https://react-web-c4127.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
            handleCodeInApp: true
        };    
               
        auth.generateEmailVerificationLink(data.email, actionCodeSettings).then((link) => {

            db.collection('mail').add({
                to: data.email,
                message: {
                    subject: 'Bienvenido a Travel Trux',
                    text: `¡Hola!\n\nGracias por unirte a Travel Trux. Para verificar tu cuenta, por favor haz clic en el siguiente enlace:\n${link}\n\nSi no creaste una cuenta en Travel Trux, por favor ignora este correo.\n\nSaludos,\nEl equipo de Travel Trux`,
                    html: `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <h2 style="color: #333;">¡Bienvenido a Travel Trux!</h2>
                            <p>Gracias por unirte a Travel Trux. Para verificar tu cuenta, por favor haz clic en el siguiente enlace:</p>
                            <p><a href="${link}" style="color: #1a73e8; text-decoration: none;">Verificar cuenta</a></p>
                            <p>Si no creaste una cuenta en Travel Trux, por favor ignora este correo.</p>
                            <p>Saludos,<br>El equipo de Travel Trux</p>
                        </div>
                    `
                }
            }).then(() => {
                console.log('Email sent to ' + data.email);
            })
            res.json({
                msg: `Usuario ${data.email} creado con éxito`
            });
        })
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