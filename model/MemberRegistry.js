"use strict";
const Member = require("./Member");

class MemberRegistry {

    constructor() {
        this.members = []
    }

    getList() {
        Member.findAll({
            include: [Boat]
        }).then((members) => {
            this.members = members;
        });
    }

    getByID(id) { return Member.getByID(id) }

    getByPersonalNumber(personalNumber) { return Member.getByPersonalNumber(personalNumber) }
}
