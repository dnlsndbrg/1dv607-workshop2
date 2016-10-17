"use strict";

// var Sequelize = require("sequelize");
//
// var sequelize = new Sequelize('database', null, null, {
//   dialect: 'sqlite',
//   logging: function() {},
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
//
//   // SQLite only
//   storage: 'database.sqlite'
// });


const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./Database.sqlite", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Database opened successfully!");
    }
});


module.exports = db;
