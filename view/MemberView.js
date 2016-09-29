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

    static createCompactList(memberList) {
        const MainMenuController = require("./../controller/MainMenuController"); // Hacky :(
        let choices = memberList.map((member) => {

            // Make a string of the members boats
            let fullName = helpers.trimString(`${member.firstName} ${member.lastName}`, 21);
            let id = helpers.trimString(member.id.toString(), 5);

            return {
                name: `${id}${fullName}${member.boats.length}`,
                value:  {
                    callback: function(){},
                    context: {}
                }
            }
        });

        choices.push(new inquirer.Separator());

        // add Main Menu choice
        choices.push({
            value: {
                callback: MainMenuController.viewMainMenu,
                context: MainMenuController
            },
            name: "Main Menu"
        });

        // add Exit choice
        choices.push({
            value: {
                callback: function(){ console.log("Good bye"); },
                context: this
            },
            name: "Exit"
        });

        MemberView.logCompactListAndGetInput(choices)
    }
    static logCompactListAndGetInput(choices) {
        let name = helpers.trimString("Name", 21);
        let id = helpers.trimString("id", 5);
        let boats = "Boats     ";

        inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: `Compact Members List\n  ` + chalk.bgCyan.white(`${id}${name}${boats}`),
                choices: choices,
            }
        ]).then(function(choice) {
            helpers.cls();
            choice.selected.callback.bind(choice.selected.context)();
        });
    }

    static createVerboseList(memberList) {
        const MainMenuController = require("./../controller/MainMenuController"); // Hacky :(

        let choices = memberList.map((member) => {

            // Make a string of the members boats
            let boats = member.boats
            .map(boat => boat.dataValues.type)
            .reduce((a, b) => { return `${a} ${b}`; }, "");

            let fullName = helpers.trimString(`${member.firstName} ${member.lastName}`, 21);
            let personalNumber = helpers.trimString(member.personalNumber, 19);
            let id = helpers.trimString(member.id.toString(), 5);
            return {
                name: id + fullName + personalNumber + boats,
                value:  {
                    callback: function(){},
                    context: {}
                }
            }
        });

        choices.push(new inquirer.Separator());

        // add Main Menu choice
        choices.push({
            value: {
                callback: MainMenuController.viewMainMenu,
                context: MainMenuController
            },
            name: "Main Menu"
        });

        // add Exit choice
        choices.push({
            value: {
                callback: function(){ console.log("Good bye"); },
                context: this
            },
            name: "Exit"
        });

        MemberView.logVerboseListAndGetInput(choices)
    }
    static logVerboseListAndGetInput(choices) {
        let id = helpers.trimString("id", 5);
        let name = helpers.trimString("Name", 21);
        let personalNumber = helpers.trimString("Personal Number", 20);
        let boats = "Boats     ";

        inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: `Verbose Members List\n  ` + chalk.bgCyan.white(`${id}${name}${personalNumber}${boats}`),
                choices: choices,
            }
        ]).then(function(choice) {
            helpers.cls();
            choice.selected.callback.bind(choice.selected.context)();
        });
    }

    static logRegisterMemberForm() {
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
            return MemberModel.create(answers)
        }).then((member) => {
            console.log(`Member ${member.firstName} has been registered`);
        }).catch((e) => {
            console.log(e.message);
        });
    }
}

module.exports = MemberView;
