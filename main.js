"use strict";

// Utils
const db = require("./database");
const helpers = require("./util/helpers");

// Models
const Member = require("./model/Member");
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

helpers.cls();
MainMenuController.viewMainMenu();
