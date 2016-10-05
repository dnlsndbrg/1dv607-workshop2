"use strict";

var Sequelize = require("sequelize");

var sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  logging: function() {},
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: 'database.sqlite'
});

module.exports = sequelize;
