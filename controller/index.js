"use strict";

const express = require("express");
var router = express.Router();

router.route("/")
    .get(function display(req, res) {
         res.render("index");
    });

module.exports = router;
