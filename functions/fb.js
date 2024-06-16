"use strict"

const {initializeApp, cert} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
require("dotenv").config();

initializeApp({
    credential: cert(`${process.env.API_FIREBASE_ACCOUNT}`),
});

const auth = getAuth();

module.exports = {
    auth,
}