"use strict";

// Util
const inquirer = require('inquirer');
const chalk = require("chalk");

// Models
const BoatModel = require("./../model/BoatModel");
const MemberModel = require("./../model/MemberModel");

// Views
const MemberView = require("./../view/MemberView");


class MemberController {

    static viewCompactList() {
        MemberModel.getList()
        .then((memberList) => {
            MemberView.logCompactList(memberList)
        });
    }

    static viewVerboseList() {
        const MainMenuController = require("./MainMenuController");
        MemberModel.getList()
        .then((memberList) => {
            let choices = memberList.map((member) => {
                let boats = member.boats.map((boat, i) => {
                    let structureIcon = "├──";
                    if (i === member.boats.length - 1) structureIcon = "└──";
                    return `\n             ${structureIcon}${boat.dataValues.type}`;
                });
                return {
                    name: `${member.personalNumber} ${member.firstName} ${member.lastName}${boats.join('\n')}`,
                    value:  {
                        callback: function(){},
                        context: {}
                    }
                }
            });

            // add some separating lines to the menu
            choices.unshift(new inquirer.Separator());
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

            // have the view log the menu and wait for input
            MemberView.logVerboseListAndGetInput(choices)
            .then(function(choice) {
                choice.selected.callback.bind(choice.selected.context)();
            });
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
            return MemberModel.create(answers)
        }).then((member) => {
            console.log(`Member ${member.firstName} has been registered`);
        }).catch((e) => {
            console.log(e.message);
        });


        //MemberView.logRegisterMemberFormAndGetInput();
    }

    static register(memberData) {
        console.log("Registering member");
        MemberModel.create(memberData)
        .then((member) => {
            console.log(`Member ${member.firstName} has been registered`);
        })
        .catch((e) => {
            console.log(e.message);
        })
    }
}

module.exports = MemberController;
