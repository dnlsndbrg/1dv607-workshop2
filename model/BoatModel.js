"use strict";

let database = require("./../database");
let Sequelize = require("sequelize");
let MemberModel = require("./MemberModel");

let Boat = database.define('boat', {
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
    underscored: true,
    instanceMethods: {
        sayHello: function() {
            return `My name is ${this.firstName} ${this.lastName}!`;
        }
    }
});

Boat.belongsTo(MemberModel);

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
