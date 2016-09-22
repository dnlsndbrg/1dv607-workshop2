let BoatModel = require("./../model/BoatModel");

class MemberController {

    constructor(MemberModel, memberView) {
        this.MemberModel = MemberModel;
        this.memberView = memberView;
    }

    viewCompactMemberList() {
        this.MemberModel.getList()
        .then((memberList) => {
            this.memberView.logCompactList(memberList)
        });
    }

    viewExtendedMemberList() {
        this.MemberModel.getList()
        .then((memberList) => {
            this.memberView.logExtendedList(memberList)
        });
    }
}

module.exports = MemberController;
