var database = require("./../database");
let BoatModel = require("./../model/BoatModel");

class ConsoleView {
    constructor(memberModel) {
        this.memberModel = memberModel;
    }

    logCompactList() {
        this.memberModel.findAll({})
        .then((members) => {
            members.forEach((member) => {
                //console.log(member);

                // COUNT BOATS
                BoatModel.findAll({
                    where: {
                        member_id: member.id
                    }
                }).then((res) => {
                    let boatCount = res.length;
                    console.log(`${member.id}: ${member.firstName} ${member.lastName} - ${boatCount}`);
                })
            });


        })

    }
}

module.exports = ConsoleView;
