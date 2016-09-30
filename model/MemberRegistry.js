"use strict";
const Member = require("./Member");

class MemberRegistry {

    constructor() {
        this.members = []
    }

    function getList() {
        Member.findAll({
            include: [BoatModel]
        }).then((members) => {
            this.members = members;
        });
    }

    function getByID(id) { return Member.getByID(id) }

    function getByPersonalNumber(personalNumber) { return Member.getByPersonalNumber(personalNumber) }
}
