"use strict";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./Database.sqlite", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Database opened successfully!");
    }
});

module.exports = db;
