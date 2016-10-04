"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const membersAPIController = require("./controller/membersAPI");
const boatsAPIController = require("./controller/boatsAPI");

const membersController = require("./controller/members");

const exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

var hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use("/api/members", membersAPIController);
app.use("/api/boats", boatsAPIController);
app.use("/members", membersController);

app.get("/", function(req, res) {
     res.render("index", {members: members});
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
