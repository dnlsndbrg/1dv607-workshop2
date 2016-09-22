"use strict";

let db = require("./database");

let MemberModel = require("./model/MemberModel");
let BoatModel = require("./model/BoatModel");

let ConsoleView = require("./view/ConsoleView");
let consoleView = new ConsoleView();

let MemberController = require("./controller/MemberController");
let memberController = new MemberController(MemberModel, consoleView);

memberController.viewExtendedList();
// memberController.viewCompactList();
//
// db.sync()
// .then(() => {
//     // return MemberModel.create({
//     //     firstName: "hans",
//     //     lastName: "fff",
//     //     personalNumber: "0601010202"
//     // })
// })
// .then(() => {
//     return BoatModel.create({
//         type: "scooner",
//         length: 40,
//         member_id: 2
//     })
// })
// .catch((e) => {
//     console.log(e);
//     //console.log(e.errors[0].message)
// })
//




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
