const express = require("express");

const {
    addUser,
    login,
    updateDataEmail
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", addUser);
router.post("/login", login);
router.post("/update-email", updateDataEmail);

module.exports = {
    routes: router,
}
