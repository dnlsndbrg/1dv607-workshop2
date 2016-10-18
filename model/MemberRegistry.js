"use strict";
const memberDAL = require("../dal/member");
const boatDAL = require("../dal/boat");

const Member = require("./Member")

const Promise = require("promise");

class MemberRegistry {

    constructor() {
        this.members = [];
    }

    getAll() {
        return memberDAL.fetchAll()
        .then(members => {
            return this.members = members;
        });
    }

    getByID(id) {
        // TODO: FETCH ONE
        return memberDAL.fetchOne(id);
    }

    createMember(memberData) {
        // TODO: CREATE MEMBER
        // return new Member(memberData).save()
        return memberDAL.create(memberData);
    }
}

module.exports = MemberRegistry;
