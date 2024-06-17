"use strict"

const {initializeApp, cert} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore} = require("firebase-admin/firestore");
require("dotenv").config();

initializeApp({
    credential: cert(`${process.env.API_FIREBASE_ACCOUNT}`),
});

const auth = getAuth();
const db = getFirestore();

module.exports = {
    auth,
    db
}