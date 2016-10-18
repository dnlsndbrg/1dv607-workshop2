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
        .then(memberRows => memberRows.map(memberRow => new Member(memberRow)))
        .then(members => boatDAL.fetchAll()
            .then(boatRows => {
                members.forEach(member => boatRows
                    .filter(boatRow => boatRow.member_id === member.id)
                    .forEach(boatRow => member.addBoatRow(boatRow))
                );
                return members;
            })
        );
    }

    getByID(id) {
        return memberDAL.fetchOne(id)
        .then(memberRow => {
            return new Member(memberRow).loadBoats()
        })
        // .catch(e=>console.log(e));
    }

    createMember(memberData) {
        // TODO: CREATE MEMBER
        // return new Member(memberData).save()
        return memberDAL.create(memberData).then(memberRow => new Member(memberRow));
    }
}

module.exports = MemberRegistry;
