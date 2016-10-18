"use strict";

const express = require("express");
const MemberRegistry = require("../model/MemberRegistry");
const memberRegistry = new MemberRegistry();
const Boat = require("../model/Boat");
var router = express.Router();

router.route("/new")
// Show register boat form
.get(function displayRegisterForm(req, res) {
    return res.render("register-boat", {memberID: req.query.member});
})

// Handle register boat
.post(function doRegister(req, res) {
    let boatData = {
        type: req.body.type,
        length: req.body.boatLength,
        memberID: req.body.memberID
    };

    memberRegistry.getByID(req.body.memberID)
    .then((member) => {
        if (!member) return res.status(404).send("Member not found!");
        return member.createBoat(boatData)
    })
    .then(boat => res.redirect(`/members/${req.body.memberID}`))
    .catch((e) => {
        console.log(e.message);
        return res.render("register-boat");
    });
});

router.route("/:id/delete")
.get(function doDelete(req, res) {
    let memberID = null;

    Boat.getByID(req.params.id)
    .then((boat) => {
        if (!boat) return res.status(404).send("Boat not found!");
        memberID = boat.memberID;
        return boat.delete();
    })
    .then((boat) => {
        return res.redirect(`/members/${memberID}`);
    })
    .catch((e) => {
        return res.status(500).send(e.message);
    });
});

router.route("/:id/edit")
.get(function displayEditForm(req, res) {
    Boat.getByID(req.params.id)
    .then((boat) => {
        if (!boat) return res.status(404).send("Boat not found!");
        return res.render("edit-boat", {
            boatType: boat.type,
            memberID: boat.memberID,
            boatLength: boat.length
        });
    })
    .catch((e) => {
        return res.status(500).send(e.message);
    });
})
.post(function doEdit(req, res) {
    Boat.getByID(req.params.id)
    .then((boat) => {
        if (!boat) return res.render("register-boat", {memberID: boat.memberID, boatLength: boat.length});
        let boatData = {
            type: req.body.type || boat.type,
            length: req.body.boatLength || boat.length,
            memberID: req.body.memberID || boat.memberID
        }
        return boat.update(boatData);
    })
    .then((boat) => {
        return res.redirect(`/members/${boat.memberID}`);
    })
    .catch((e) => {
        return res.render("register-boat", {memberID: boat.memberID, boatLength: boat.length});
    });
});

module.exports = router;
