"use strict";

let MemberModel = require("./model/MemberModel");

// let ellen = MemberModel.findOne({
//     where: {firstName: 'Ellen'}
// }).then((result) => {
//     //console.l
//     //console.log(result.sayHello());
// });

MemberModel.build( {firstName: "Ellen", lastName: "Nuuu"}).sayHello();
// let ellen = MemberModel.create({
//         firstName: 'Kungen',
//         lastName: 'Nu'
//     }).then((m) => {
//         console.log(m.$modelOptions.instanceMethods);
//         m.sayHello();
//     });
//

//let memberModel = require("./model/memberModel");
