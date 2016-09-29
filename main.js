"use strict";

// Utils
const db = require("./database");
const helpers = require("./util/helpers");

// Models
const MemberModel = require("./model/MemberModel");
const BoatModel = require("./model/BoatModel");

// Views
const MemberView = require("./view/MemberView");
const MainMenuView = require("./view/MainMenuView");

// Controllers
const MainMenuController = require("./controller/MainMenuController");
const MemberController = require("./controller/MemberController");

// View instances
const memberView = new MemberView();
const mainMenuView = new MainMenuView();

// Controller instances
// const mainMenuController = new MainMenuController(mainMenuView, MemberController);

//
//
//
//
// db.sync()
// .then(() => {
//     let boatData = {
//         type: "Scooner",
//         length: 11,
//         member_id: 4
//     }
//     BoatModel.create(boatData);
// });
//



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

helpers.cls();
MainMenuController.viewMainMenu();
