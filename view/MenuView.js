let inquirer = require('inquirer');

class MenuView {
    constructor() {

    }

    showMenu() {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'selection',
                message: "Main Menu",
                choices: [
                    new inquirer.Separator(),
                    "View extended list",
                    "View compact list",
                    "Exit"
                ],
            }
        ]);
    }
}

module.exports = MenuView;
