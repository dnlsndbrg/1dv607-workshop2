"use strict";

const database = require("./../database");
const Sequelize = require("sequelize");
const Member = require("./Member");

const Boat = database.define('boat', {
    type: {
        type: Sequelize.ENUM("Sailboat", "Motorsailer", "Kayak/Canoe", "Other"),
        allowNull: false,
        field: "type"
    },
    length: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'length' // Will result in an attribute that is lastName when user facing but last_name in the database
    },
},{
    freezeTableName: true,
    underscored: true,
    instanceMethods: {
        delete: function() {
            this.destroy();
        }
    }
});

module.exports = Boat;
