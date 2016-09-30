"use strict";

const inquirer = require('./../util/inquirer');

class MenuView {
    static showMenuAndGetInput(choices) {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: 'Main Menu',
                choices: choices
            }
        ]);
    }
}

module.exports = MenuView;
