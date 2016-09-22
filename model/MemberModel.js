"use strict";

let database = require("./../database");
var Sequelize = require("sequelize");
let BoatModel = require("./BoatModel");

let nameValidation = {
    isAlpha: true,
    max: 100,
    min: 1
}

var Member = database.define('member', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name', // Will result in an attribute that is firstName when user facing but first_name in the database
        validate: nameValidation
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name', // Will result in an attribute that is lastName when user facing but last_name in the database
        validate: nameValidation
    },
    personalNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'personal_number',
        validate: {
            is: {
                args: /^\d{10}$/,
                msg: "custom ERRORRORORORORORORORO"
            }
        }
    }
},{
    freezeTableName: true,
    underscored: true,
    instanceMethods: {
        countBoats: function() {
            BoatModel.findAll({
                where: {
                    member_id: this.id
                }
            }).return((boats) => {
                return boats.length
            })
        }
    },
    classMethods: {
        getByID: function() { throw new Error("Not implemented") },
        getByPersonalNumber: function() { throw new Error("Not implemented") }
    }
});

Member.hasMany(BoatModel);

module.exports = Member;
