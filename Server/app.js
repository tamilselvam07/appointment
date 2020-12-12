
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./routes.js");
var mongoose = require("./database.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
routes.init(app);

app.listen(92, function () {
    console.log("Listening In 92 Port");
});
