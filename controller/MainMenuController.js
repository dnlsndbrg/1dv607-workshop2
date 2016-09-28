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
                    callback: this.memberController.viewExtendedList,
                    context: this.memberController
                },
                name: "View extended list"
            },
            {
                value: {
                    callback: this.memberController.viewCompactList,
                    context: this.memberController
                },
                name: "View compact list"
            },
            {
                value: {
                    callback: function(){ console.log("good bye"); },
                    context: this
                },
                name: "Exit"
            },
            new inquirer.Separator()
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
    //         case "View extended list":
    //             this.memberController.viewExtendedList();
    //             break;
    //     }
    // }
}

module.exports = MenuController;
