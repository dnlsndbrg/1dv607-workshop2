let inquirer = require('inquirer');

class MenuController {
    constructor(menuView, memberController) {
        this.menuView = menuView;
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

        this.menuView.showMenuAndGetInput(choices)
        .then(function(choice) {
            choice.selected.callback.bind(choice.selected.context)();
        });
    }
}

module.exports = MenuController;
