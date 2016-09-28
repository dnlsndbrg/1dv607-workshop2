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

//
// db.sync({force:true})
// .then(() => {
//     console.log("cleared db")
//     let memberData1 = {
//         firstName: "Olof",
//         lastName: "Bolof",
//         personalNumber: "6303221234"
//     }
//
//     let memberData2 = {
//         firstName: "Ulf",
//         lastName: "Bulf",
//         personalNumber: "1212121234"
//     }
//
//     let memberData3 = {
//         firstName: "Ellen",
//         lastName: "Nu",
//         personalNumber: "9907011234"
//     }
//
//     // Register 3 members
//     memberController.register(memberData1);
//     memberController.register(memberData2);
//     memberController.register(memberData3);
//
//     // Try to register already registered member
//     memberController.register(memberData1);
//
// })

consoleUtil.cls();
mainMenuController.viewMainMenu();
