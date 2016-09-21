"use strict";

let MemberModel = require("./model/MemberModel");

MemberModel.sync({ force: true})
.then(() => {
    return MemberModel.create({
        firstName: "Johnny",
        lastName: "fff",
        personalNumber: "8001z010202"
    })
})
.then((member) => {
    console.log(member.sayHello());
})
.catch((e) => {
    console.log(e.errors[0].message)
})


// MemberModel.build( {firstName: "Ellen", lastName: "Nuuu"}).sayHello();
// let ellen = MemberModel.create({
//         firstName: 'Kungen',
//         lastName: 'Nu'
//     }).then((m) => {
//         console.log(m.$modelOptions.instanceMethods);
//         m.sayHello();
//     });
//

//let memberModel = require("./model/memberModel");
