"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const membersController = require("./controller/members");
const boatsController = require("./controller/boats");

const indexController = require("./controller/index");

const exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        selected: function(current, selectedValue) {
            return current === selectedValue ? " selected" : "";
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use("/members", membersController);
app.use("/boats", boatsController);
app.use("/", indexController);

app.listen(3000, function () {
    console.log("The Happy Pirate listening on port 3000! Argh!");
});
