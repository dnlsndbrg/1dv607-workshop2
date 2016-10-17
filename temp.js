const memberDAL = require("./dal/member");

// let members = memberDAL.fetchAll().then((members) => {
//     console.log(members);
// })
//

let members = memberDAL.fetchByID(1).then((members) => {
    console.log(members);
})
