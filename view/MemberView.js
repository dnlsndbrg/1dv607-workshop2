let inquirer = require('inquirer');

class MemberView {

    constructor() {}

    logCompactList(members) {
        members.forEach((member) => {
            console.log(`${member.id}: ${member.firstName} ${member.lastName} - ${member.boats.length}`);
        });
    }

    logVerboseList(members) {
        members.forEach((member) => {
            console.log(`${member.id}: ${member.firstName} ${member.lastName} - ${member.personalNumber}`);
            member.boats.forEach((boat) => {
                console.log(`${boat.type} - ${boat.length}`)
            });
            console.log("-----");
        });
    }


    logVerboseListAndGetInput(choices) {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: 'Verbose List',
                choices: choices,
            }
        ]);
    }
}

module.exports = MemberView;
