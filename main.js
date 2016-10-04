"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const membersAPIController = require("./controller/membersAPI");
const boatsAPIController = require("./controller/boatsAPI");

const membersController = require("./controller/members");
const boatsController = require("./controller/boats");

const indexController = require("./controller/index");

const exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({ extended: true }));

var hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use("/api/members", membersAPIController);
app.use("/api/boats", boatsAPIController);
app.use("/members", membersController);
app.use("/boats", boatsController);
app.use("/", indexController);

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
