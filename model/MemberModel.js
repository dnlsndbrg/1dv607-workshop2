"use strict";

let database = require("./../database");
var Sequelize = require("sequelize");

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
    instanceMethods: {
        sayHello: function() {
            return `My name is ${this.firstName} ${this.lastName}!`;
        }
    }
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

module.exports = Member;
