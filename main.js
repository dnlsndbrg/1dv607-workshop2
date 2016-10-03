"use strict";

// Utils
const db = require("./database");

// Models
const MemberRegistry = require("./model/MemberRegistry");
const memberRegistry = new MemberRegistry();
const Member = require("./model/Member");
const Boat = require("./model/Boat");

const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const membersController = require("./controller/members");
const boatsController = require("./controller/boats");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", indexController);
app.use("/members", membersController);
app.use("/boats", boatsController);


app.get("/", function(req, res) {
    res.send("Hello World!");
});

// Get all members
app.get("/members", function(req, res) {
    memberRegistry.getAll()
    .then((members) => {
        res.json(members);
    });
});

// Create member
app.post("/members", function(req, res) {
    let memberData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        personalNumber: req.body.personalNumber
    };

    memberRegistry.createMember(memberData)
    .then((member) => {
        return res.status(201).json(member);
    })
    .catch((e) => {
        return res.status(500).json({error: e.message});
    })

});

// Get member by member id
app.get("/members/:id", function(req, res) {
    memberRegistry.getByID(req.params.id)
    .then((member) => {
        console.log(member);
        if (!member) {
            return res.status(404).send("Member not found!");
        }
        return res.send(member);
    });
});

// Update member by member id
app.put("/members/:id", function(req, res) {
    memberRegistry.getByID(req.params.id)
    .then((member) => {

        if (!member) {
            return res.status(404).send("Member not found!");
        }

        let memberData = {
            firstName: req.body.firstName || member.firstName,
            lastName: req.body.lastName || member.lastName,
            personalNumber: req.body.personalNumber || member.personalNumber
        };

        member.update(memberData)
        .then((member) => {
            res.status(200).send(member)
        })
        .catch((e) => {
            return res.status(500).send(e.message);
        })
    });
});

// Delete member by member id
app.delete("/members/:id", function(req, res) {
    memberRegistry.getByID(req.params.id)
    .then((member) => {
        console.log(member);
        if (!member) {
            return res.status(404).send("Member not found!");
        }
        member.delete()
        .then((member) => {
            res.status(200).send(`Member ${member.firstName} ${member.lastName} with ID ${member.id} deleted!`)
        })
        .catch((e) => {
            return res.status(500).send(e.message);
        })
    });
});

// Create boat
app.post("/boats", function(req, res) {
    let boatData = {
        type: req.body.type,
        length: req.body.boatLength,
        memberID: req.body.memberID
    }

    memberRegistry.getByID(req.body.memberID)
    .then((member) => {
        if (!member) {
            return res.status(404).send("Member not found!");
        }
        return member.createBoat(boatData)
    })
    .then((boat) => {
        return res.status(201).send(boat);
    })
});

// Get boat by boat id
app.get("/boats/:id", function(req, res) {
    Boat.findOne({
        where: {id: req.params.id}
    })
    .then((boat) => {
        if (!boat) {
            return res.status(404).send("Boat not found!");
        }
        return res.send(boat);
    })
    .catch((e) => {
        return res.status(500).send(e.message);
    });
});

// Update boat by boat id
app.put("/boats/:id", function(req, res) {
    Boat.findOne({
        where: {id: req.params.id}
    })
    .then((boat) => {
        if (!boat) {
            return res.status(404).send("Boat not found!");
        }

        let boatData = {
            type: req.body.type || boat.type,
            length: req.body.boatLength || boat.length,
            memberID: req.body.memberID || boat.member_id
        }
        return boat.update(boatData);
    })
    .then((boat) => {
        res.send(boat);
    })
    .catch((e) => {
        return res.status(500).send(e.message);
    });
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});

// const Member = require("./model/Member");
// const Boat = require("./model/Boat");

// Views
// const MemberView = require("./view/MemberView");
// const MainMenuView = require("./view/MainMenuView");
//
// // Controllers
// const MainMenuController = require("./controller/MainMenuController");
// const MemberController = require("./controller/MemberController");
//
// // View instances
// const memberView = new MemberView();
// const mainMenuView = new MainMenuView();

// helpers.cls();
// MainMenuController.viewMainMenu();
