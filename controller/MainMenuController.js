let inquirer = require('inquirer');

class MenuController {
    constructor(menuView, memberController) {
        this.menuView = menuView;
        this.memberController = memberController;
    }

    createMainMenu() {
        this.menuView.showMenuAndGetInput()
        .then((choice) => {
            this.menuAction(choice.selection);
        });
    }

    menuAction(choice) {
        switch (choice) {
            case "Exit":
                console.log("Good bye");
                break;
            case "View compact list":
                this.memberController.viewCompactList();
                break;
            case "View extended list":
                this.memberController.viewExtendedList();
                break;
        }
    }
}

module.exports = MenuController;
