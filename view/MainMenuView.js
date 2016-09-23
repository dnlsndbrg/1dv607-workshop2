let inquirer = require('inquirer');

class MenuView {
    constructor() {

    }

    showMenuAndGetInput() {
        console.log("");
        return inquirer.prompt([
            {
                type: 'list',
                name: 'selection',
                message: "Main Menu",
                choices: [
                    new inquirer.Separator(),
                    "View extended list",
                    "View compact list",
                    "Exit",
                    new inquirer.Separator()
                ],
            }
        ]);
    }
}

module.exports = MenuView;
