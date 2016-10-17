const memberDAL = require("./dal/member");

let members = memberDAL.fetchAll().then((members) => {
    console.log(members);
})
