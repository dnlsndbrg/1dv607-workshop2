const inquirer = require('inquirer');

class MemberView {

    static logCompactList(members) {
        members.forEach((member) => {
            console.log(`${member.id}: ${member.firstName} ${member.lastName} - ${member.boats.length}`);
        });
    }

    static logVerboseList(members) {
        members.forEach((member) => {
            console.log(`${member.id}: ${member.firstName} ${member.lastName} - ${member.personalNumber}`);
            member.boats.forEach((boat) => {
                console.log(`${boat.type} - ${boat.length}`)
            });
            console.log("-----");
        });
    }

    static logVerboseListAndGetInput(choices) {
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
