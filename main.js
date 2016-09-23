"use strict";

let db = require("./database");
let consoleUtil = require("./util/console");

let MemberModel = require("./model/MemberModel");
let BoatModel = require("./model/BoatModel");

let MemberView = require("./view/MemberView");
let memberView = new MemberView();

let MemberController = require("./controller/MemberController");
let memberController = new MemberController(MemberModel, memberView);


let MainMenuView = require("./view/MainMenuView");
let mainMenuView = new MainMenuView();

let MainMenuController = require("./controller/MainMenuController");
let mainMenuController = new MainMenuController(mainMenuView, memberController);


consoleUtil.cls();
mainMenuController.viewMainMenu();

//consoleView.showMenu();
//memberController.viewExtendedList();

//consoleView.showMainMenu();
// memberController.viewCompactList();
//
// db.sync()
// .then(() => {
//     // return MemberModel.create({
//     //     firstName: "hans",
//     //     lastName: "fff",node m
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
