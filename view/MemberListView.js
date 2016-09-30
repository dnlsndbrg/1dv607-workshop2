"use strict";

const inquirer = require('inquirer');
const helpers = require("./../util/helpers");
const chalk = require("chalk");

class MemberListView {
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
                    argument: [member.id],
                    context: MainMenuController
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

        MemberListView.logCompactListAndGetInput(choices)
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

        MemberListView.logVerboseListAndGetInput(choices)
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

}

module.exports = MemberListView;
