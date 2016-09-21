"use strict";

let MemberModel = require("./model/MemberModel");

let ellenGreeting = MemberModel.build({ firstName: "Ellan", lastName: "Mu"}).sayHello();
console.log(ellenGreeting);


MemberModel.findOne({
    where: {firstName: 'Ellen'}
}).then((member) => {
    console.log(member.sayHello());
});

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
