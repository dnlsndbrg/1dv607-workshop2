"use strict";

// Util
const inquirer = require('./../util/inquirer');
const chalk = require("chalk");
const helpers = require("./../util/helpers");

// Models
const Boat = require("./../model/Boat");
const Member = require("./../model/Member");

// Views
const MemberView = require("./../view/MemberView");
const MemberListView = require("./../view/MemberListView");

class MemberController {

    static viewCompactList() {
        Member.getList()
        .then((memberList) => {
            MemberListView.createCompactList(memberList)
        });
    }

    static viewVerboseList() {
        Member.getList()
        .then((memberList) => {
            MemberListView.createVerboseList(memberList);
        });
    }

    static viewRegisterMemberForm() {
        let questions = [
            {
                type: "input",
                name: "firstName",
                message: "First name"
            },
            {
                type: "input",
                name: "lastName",
                message: "Last name"
            },
            {
                type: "input",
                name: "personalNumber",
                message: "Personal number"
            }
        ]

        inquirer.prompt(questions)
        .then(function (answers) {
            return Member.create(answers)
        }).then((member) => {
            console.log(`Member ${member.firstName} has been registered`);
        }).catch((e) => {
            console.log(e.message);
        });
    }

    static viewMember(memberID) {
         Member.getByID(memberID)
        .then(function(memberData) {
            MemberView.logMemberAndGetInput(memberData);
        });
    }

    static updateMember(memberID, field, fieldName) {
        Member.getByID(memberID)
       .then(function(member) {
           MemberView.logUpdateMemberField(member, field, fieldName);
       });
    }

    static register(memberData) {
        console.log("Registering member");
        Member.create(memberData)
        .then((member) => {
            console.log(`Member ${member.firstName} has been registered`);
        })
        .catch((e) => {
            console.log(e.message);
        })
    }
}

module.exports = MemberController;
