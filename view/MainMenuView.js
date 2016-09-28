let inquirer = require('inquirer');

class MenuView {
    constructor() {

    }

    showMenuAndGetInput(choices) {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: '☠ Main Menu ⚑⛵',
                choices: choices,
            }
        ]);
    }
}

module.exports = MenuView;
