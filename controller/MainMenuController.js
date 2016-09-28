let inquirer = require('inquirer');
let consoleUtil = require('./../util/console');

class MenuController {
    constructor(mainMenuView, memberController) {
        this.mainMenuView = mainMenuView;
        this.memberController = memberController;
    }

    viewMainMenu() {

        let choices = [
            new inquirer.Separator(),
            {
                value: {
                    callback: this.memberController.viewVerboseList,
                    context: this.memberController
                },
                name: "View Verbose list"
            },
            {
                value: {
                    callback: this.memberController.viewCompactList,
                    context: this.memberController
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

        this.mainMenuView.showMenuAndGetInput(choices)
        .then(function(choice) {
            consoleUtil.cls();
            choice.selected.callback.bind(choice.selected.context)();
        });
    }

    // menuAction(choice) {
    //     switch (choice) {
    //         case "Exit":
    //             console.log("Good bye");
    //             break;
    //         case "View compact list":
    //             this.memberController.viewCompactList();
    //             break;
    //         case "View Verbose list":
    //             this.memberController.viewVerboseList();
    //             break;
    //     }
    // }
}

module.exports = MenuController;
