var database = require("./../database");
let BoatModel = require("./../model/BoatModel");

class ConsoleView {

    constructor(memberModel) {
        this.memberModel = memberModel;
    }

    logCompactList() {
        this.memberModel.findAll({
            include: [BoatModel]
        })
        .then((members) => {
            members.forEach((member) => {
                member.countBoats().then((res)=>console.log(res));
                // console.log("Counting all your boats", member.countBoats());
                console.log(`${member.id}: ${member.firstName} ${member.lastName} - ${member.boats.length}`);
            });
        })
    }
}

module.exports = ConsoleView;
