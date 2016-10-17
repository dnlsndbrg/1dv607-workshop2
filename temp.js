const memberDAL = require("./dal/member");

// let members = memberDAL.fetchAll().then((members) => {
//     console.log(members);
// })
//

let members = memberDAL.create({
    firstName: "CHRISTOFFER",
    lastName: "EKBANG",
    personalNumber: "010189898"
}).then((member) => {
    console.log(member);
}).catch((err) => {
    console.log(err);
})
