const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userLRRoutes = require("./routes/usersLoginRegister-routes");
const app = express();

app.use(cors(
    {
        origin: true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    }
));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/hello", (req, res) => {
    logger.info("Hello logs!", {structuredData: true});
    res.send("API is working!");
});

app.use("/api/v1", userLRRoutes.routes);

exports.integraciones_app = onRequest(app);