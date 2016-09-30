"use strict";

const inquirer = require('inquirer');
const helpers = require("./../util/helpers");
const chalk = require("chalk");

class MemberView {

    static createCompactList(memberList) {
        const MainMenuController = require("./../controller/MainMenuController"); // Hacky :(
        const MemberController = require("./../controller/MemberController"); // Hacky :(

        let choices = memberList.map((member) => {

            // Make a string of the members boats
            let fullName = helpers.trimString(`${member.firstName} ${member.lastName}`, 21);
            let id = helpers.trimString(member.id.toString(), 5);

            return {
                name: `${id}${fullName}${member.boats.length}`,
                value:  {
                    callback: MemberController.viewMember,
                    argument: member.id,
                    context: MainMenuController
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
            choice.selected.callback.bind(choice.selected.context)(...choice.selected.argument);
        });
    }

    static createVerboseList(memberList) {
        const MainMenuController = require("./../controller/MainMenuController"); // Hacky :(
        const MemberController = require("./../controller/MemberController"); // Hacky :(

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
                    callback: MemberController.viewMember,
                    argument: [member.id],
                    context: MemberController
                }
            }
        });

        choices.push(new inquirer.Separator());

        // add Main Menu choice
        choices.push({
            value: {
                callback: MainMenuController.viewMainMenu,
                context: MainMenuController,
                argument: []
            },
            name: "Main Menu"
        });

        // add Exit choice
        choices.push({
            value: {
                callback: function(){ console.log("Good bye"); },
                context: this,
                argument: []
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
                argument: []
            }
        ]).then(function(choice) {
            helpers.cls();
            choice.selected.callback.bind(choice.selected.context)(...choice.selected.argument);
        });
    }

    static logMemberAndGetInput(memberData) {
        const MainMenuController = require("./../controller/MainMenuController"); // Hacky :(
        const MemberController = require("./../controller/MemberController"); // Hacky :(
        // Create menu choices for all the boats
        let boatChoices = memberData.boats.map((boat) => {
            return {
                name: boat.dataValues.type,
                value: {
                    callback: function(){},
                    argument: [boat.dataValues.id],
                    context: {}
                }
            };
        });

        // create array of choices
        let choices = [
            new inquirer.Separator(chalk.gray(`id:              ${memberData.id}`)),
            {
                name: `First name:      ${memberData.firstName}`,
                value: {
                    callback: MemberController.updateMember,
                    argument: [memberData.id, memberData.firstName, "First name:"],
                    context: MemberController
                }
            },
            {
                name: `Last name:       ${memberData.lastName}`,
                value: {
                    callback: function(){},
                    context: {},
                    argument: []
                }
            },
            {
                name: `Personal number: ${memberData.personalNumber}`,
                value: {
                    callback: function(){},
                    context: {},
                    argument: []
                }
            }
        ];

        if (boatChoices.length > 0) {
            // add the boat menu choices here
            choices.push(new inquirer.Separator(chalk.gray("")));
            choices = choices.concat(boatChoices);
        }


        // add the rest
        choices.push(new inquirer.Separator());
        choices.push({
            value: {
                callback: function(){},
                context: {},
                argument: []
            },
            name: "Add Boat"
        });
        choices.push({
            value: {
                callback: function(){},
                context: {},
                argument: []
            },
            name: chalk.red("Delete Member")
        });
        choices.push({
            value: {
                callback: MainMenuController.viewMainMenu,
                context: MainMenuController,
                argument: []
            },
            name: "Main Menu"
        });

        choices.push({
            value: {
                callback: function(){ console.log("Good bye"); },
                context: this,
                argument: []
            },
            name: "Exit"
        });
        choices.push(new inquirer.Separator());
        inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: chalk.bgCyan.white("Member Information "),
                choices: choices,
            }
        ]).then(function(choice) {
            helpers.cls();
            choice.selected.callback.bind(choice.selected.context)(...choice.selected.argument);
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

    static logUpdateMemberField(member, field, fieldName) {

        let question = [
            {
                type: "input",
                name: field,
                message: fieldName
            }
        ]

        inquirer.prompt(question)
        .then(function (answer) {
            return member.save(answer)
        }).then((member) => {
            console.log(`Member field update - done`);
        }).catch((e) => {
            console.log(e.message);
        });
    }
}

module.exports = MemberView;
