let BoatModel = require("./../model/BoatModel");
let inquirer = require('inquirer');

class MemberController {

    constructor(MemberModel, memberView) {
        this.MemberModel = MemberModel;
        this.memberView = memberView;
    }

    viewCompactList() {
        this.MemberModel.getList()
        .then((memberList) => {
            this.memberView.logCompactList(memberList)
        });
    }

    viewExtendedList() {
        this.MemberModel.getList()
        .then((memberList) => {

            let choices = memberList.map((member) => {
                return {
                    name: member.firstName + ' ' + member.lastName,
                    value:  {
                        callback: function(){},
                        context: {}
                    }
                }
            });

            // add some separating lines to the menu
            choices.unshift(new inquirer.Separator());
            choices.push(new inquirer.Separator());

            // add Exit choice
            choices.push({
                value: {
                    callback: function(){ console.log("good bye"); },
                    context: this
                },
                name: "Exit"
            });

            // have the view log the menu and wait for input
            this.memberView.logExtendedListAndGetInput(choices)
            .then(function(choice) {
                choice.selected.callback.bind(choice.selected.context)();
            });
        });
    }

    register(memberData) {
        console.log("Registering member");
        this.MemberModel.create(memberData)
        .then((member) => {
            console.log(`Member ${member.firstName} has been registered`);
        })
        .catch((e) => {
            console.log(e.message);
        })

    }
}

module.exports = MemberController;
