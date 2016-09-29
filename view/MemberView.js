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

    // static logVerboseList(members) {
    //     members.forEach((member) => {
    //         console.log(`${member.id}: ${member.firstName} ${member.lastName} - ${member.personalNumber}`);
    //         member.boats.forEach((boat) => {
    //             console.log(`${boat.type} - ${boat.length}`)
    //         });
    //         console.log("-----");
    //     });
    // }

    static createVerboseList(memberList) {
        const MainMenuController = require("./../controller/MainMenuController"); // Hacky :(

        let choices = memberList.map((member) => {
            // Make a string of the members boats
            let boats = member.boats
            .map(boat => helpers.trimString(boat.dataValues.type, 10) )
            .reduce((a, b) => { return `${a} ${b}`; }, "");

            let fullName = helpers.trimString(`${member.firstName} ${member.lastName}`, 20);
            return {
                name: `${fullName} ${member.personalNumber}         ${boats}`,
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
        let name = helpers.trimString("  Name", 23);
        let personalNumber = helpers.trimString("Personal Number", 20);
        let boats = "Boats     ";

        inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: 'Verbose Members List\n' + chalk.grey(name + personalNumber + boats),
                choices: choices,
            }
        ]).then(function(choice) {
            helpers.cls();
            choice.selected.callback.bind(choice.selected.context)();
        });
    }
}

module.exports = MemberView;
