"use strict";

const database = require("./../database");
const Sequelize = require("sequelize");
const BoatModel = require("./BoatModel");

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
        countBoats: function() {
            BoatModel.findAll({
                where: {
                    member_id: this.id
                }
            }).then((boats) => {
                return boats.length
            })
        }
    },
    classMethods: {
        getByID: function() { throw new Error("Not implemented") },
        getByPersonalNumber: function() { throw new Error("Not implemented") },

        getList: function() {
            return this.findAll({
                include: [BoatModel]
            })
            .then((members) => {
                return members.map((member) => {
                    return {
                        id: member.id,
                        firstName: member.firstName,
                        lastName: member.lastName,
                        personalNumber: member.personalNumber,
                        boats: member.boats
                    }
                });
            })
        },
        updateByID: function(memberData) { throw new Error("Not implemented") },
        deleteByID: function(memberData) { throw new Error("Not implemented") },

    }
});

Member.hasMany(BoatModel);

module.exports = Member;
