const express = require("express");

const {
    addUser,
    login,
    updateEmail
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", addUser);
router.post("/login", login);
router.post("/update-email", updateEmail);

module.exports = {
    routes: router,
}
