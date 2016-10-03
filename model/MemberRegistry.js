"use strict";
const Member = require("./Member");
const Boat = require("./Boat");

class MemberRegistry {

    constructor() {
        this.members = [];
    }

    getAll() {
        return Member.findAll({
            include: [Boat]
        }).then((members) => {
            return this.members = members;
        });
    }

    getByID(id) {
        return Member.findOne({
            where: {id: id},
            include: [Boat]
        });
    }

    getByPersonalNumber(personalNumber) {
        return Member.findOne({
            where: {personalNumber: personalNumber},
            include: [Boat]
        });
    }

    createMember(memberData) {
        return Member.create(memberData);
    }
}

module.exports = MemberRegistry;
