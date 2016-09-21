"use strict";

let database = require("./../database");
var Sequelize = require("sequelize");

var Member = database.define('member', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name' // Will result in an attribute that is lastName when user facing but last_name in the database
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
