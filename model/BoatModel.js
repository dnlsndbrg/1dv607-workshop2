"use strict";

const database = require("./../database");
const Sequelize = require("sequelize");
const Member = require("./Member");

const Boat = database.define('boat', {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'type',
        validate: {
            isAlpha: true,
            max: 100,
            min: 1
        }
    },
    length: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'length' // Will result in an attribute that is lastName when user facing but last_name in the database
    },
},{
    freezeTableName: true,
    underscored: true
});

// Member.prototype.sayHello = function() {
//     // return `Hi my name is  ${this.firstName} ${this.lastName}`
//     return "Hej";
// };
//
// Member.build( {firstName: "Ellen", lastName: "Nuuu"}).sayHello();

// Member.sync().then(function() {
//
//     Member.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//       });
//
// })

module.exports = Boat;
