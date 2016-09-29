"use strict";

const inquirer = require('inquirer');
const helpers = require("./../util/helpers");
const chalk = require("chalk");

class MemberView {

    static logCompactList(members) {
        members.forEach((member) => {
            console.log(`${member.id}: ${member.firstName} ${member.lastName} - ${member.boats.length}`);
        });
    }

    static logVerboseList(members) {
        members.forEach((member) => {
            console.log(`${member.id}: ${member.firstName} ${member.lastName} - ${member.personalNumber}`);
            member.boats.forEach((boat) => {
                console.log(`${boat.type} - ${boat.length}`)
            });
            console.log("-----");
        });
    }

    static logVerboseListAndGetInput(choices) {
        let name = helpers.trimString("  Name", 23);
        let personalNumber = helpers.trimString("Personal Number", 20);
        let boats = "Boats     ";

        return inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: 'Verbose Members List\n' + chalk.green(name + personalNumber + boats),
                choices: choices,
            }
        ]);
    }
}

module.exports = MemberView;
