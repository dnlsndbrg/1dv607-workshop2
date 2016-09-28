const inquirer = require('inquirer');

class MenuView {
    static showMenuAndGetInput(choices) {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: 'Main Menu',
                choices: choices,
            }
        ]);
    }
}

module.exports = MenuView;
