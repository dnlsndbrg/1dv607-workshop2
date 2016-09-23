"use strict";

let db = require("./database");

let MemberModel = require("./model/MemberModel");
let BoatModel = require("./model/BoatModel");

let ConsoleView = require("./view/ConsoleView");
let consoleView = new ConsoleView();

let MemberController = require("./controller/MemberController");
let memberController = new MemberController(MemberModel, consoleView);


let MenuView = require("./view/MenuView");
let menuView = new MenuView();

let MenuController = require("./controller/MenuController");
let menuController = new MenuController(menuView, memberController);



db.sync({force:true})
.then(() => {
    console.log("cleared db")
    let memberData1 = {
        firstName: "Olof",
        lastName: "Bolof",
        personalNumber: "6303221234"
    }

    let memberData2 = {
        firstName: "Ulf",
        lastName: "Bulf",
        personalNumber: "1212121234"
    }

    let memberData3 = {
        firstName: "Ellen",
        lastName: "Nu",
        personalNumber: "9907011234"
    }

    // Register 3 members
    memberController.register(memberData1);
    memberController.register(memberData2);
    memberController.register(memberData3);

    // Try to register already registered member
    memberController.register(memberData1);

})

// consoleView.cls();
// menuController.createMainMenu();

//consoleView.showMenu();
//memberController.viewExtendedList();

//consoleView.showMainMenu();
// memberController.viewCompactList();
//
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
