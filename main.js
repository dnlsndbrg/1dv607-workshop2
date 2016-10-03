"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const membersAPIController = require("./controller/membersAPI");
const boatsAPIController = require("./controller/boatsAPI");

const exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({ extended: true }));

var hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use("/api/members", membersAPIController);
app.use("/api/boats", boatsAPIController);

app.get("/", function(req, res) {
    console.log("hej");
    let members = [{id:1, firstName: "hej", lastName: "nej"}, {id:2, firstName: "afssga", lastName: "ersjsejr"}];
    return res.render("index", {members: members});
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
