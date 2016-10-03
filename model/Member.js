"use strict";

const database = require("./../database");
const Sequelize = require("sequelize");
const Boat = require("./Boat");

const nameValidation = {
    isAlpha: true,
    max: 100,
    min: 1
}

const Member = database.define('member', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name',
        validate: nameValidation
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name',
        validate: nameValidation
    },
    personalNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'personal_number',
        validate: {
            is: {
                args: /^\d{10}$/,
                msg: "Not a valid personal number"
            }
        }
    }
},{
    freezeTableName: true,
    underscored: true,
    instanceMethods: {
        getBoatCount: function() {
            Boat.findAll({
                where: {
                    member_id: this.id
                }
            }).then((boats) => boats.length)
        },

        delete: function() {
            return this.destroy();
        },
        createBoat: function(boatData) {
            boatData.member_id = this.id;
            return Boat.create(boatData);
        }
    }
});

Member.hasMany(Boat, { onDelete: 'cascade', hooks: true });

module.exports = Member;
