let BoatModel = require("./../model/BoatModel");

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
            this.memberView.logExtendedList(memberList)
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
