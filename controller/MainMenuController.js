"use strict";

// Util
const inquirer = require('./../util/inquirer');
const helpers = require('./../util/helpers');

// Views
const MainMenuView = require("./../view/MainMenuView");
const MemberView = require("./../view/MemberView");

// Controllers
const MemberController = require("./MemberController");

class MainMenuController {

    static viewMainMenu() {
        let choices = [
            new inquirer.Separator(),
            {
                value: {
                    callback: MemberView.logRegisterMemberForm,
                    context: MemberView
                },
                name: "Register member"
            },
            {
                value: {
                    callback: MemberController.viewVerboseList,
                    context: MemberController
                },
                name: "View Verbose list"
            },
            {
                value: {
                    callback: MemberController.viewCompactList,
                    context: MemberController
                },
                name: "View compact list"
            },
            new inquirer.Separator(),
            {
                value: {
                    callback: function(){ console.log("good bye"); },
                    context: this
                },
                name: "Exit"
            }
        ];

        MainMenuView.showMenuAndGetInput(choices)
        .then(function(choice) {
            helpers.cls();
            choice.selected.callback.bind(choice.selected.context)();
        });
    }


}

module.exports = MainMenuController;
