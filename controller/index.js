"use strict";

const express = require("express");
var router = express.Router();

router.route("/")
    .get(function(req, res) {
         res.render("index");
    });

module.exports = router;
