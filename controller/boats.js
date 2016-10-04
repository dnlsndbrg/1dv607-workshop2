"use strict";

const express = require("express");
const MemberRegistry = require("../model/MemberRegistry");
const memberRegistry = new MemberRegistry();
var router = express.Router();

// router.route("/:id")
//     // View boat
//     .get(function(req, res) {
//     });

router.route("/new")
    // Show register boat form
    .get(function(req, res) {
        return res.render("register-boat", {memberID: req.query.member});
    })

    // Handle register boat
    .post(function(req, res) {
        let boatData = {
            type: req.body.type,
            length: req.body.boatLength,
            memberID: req.body.memberID
        };

        memberRegistry.getByID(req.body.memberID)
        .then((member) => {
            if (!member) {
                return res.status(404).send("Member not found!");
            }
            return member.createBoat(boatData)
        })
        .then((boat) => {
            return res.redirect(`/members/${boat.member_id}`);
        })
        .catch((e) => {
            console.log(e.message);
            return res.render("register-boat");
        });
    });

router.route("/list")
    // Redirect to compact list
    .get(function(req, res) {
        return res.redirect("/members/list/compact");
    });

router.route("/list/compact")
    // Show compact member list
    .get(function(req, res) {
        memberRegistry.getAll().then((members) => {
            return res.render("list-members", {
                members: members,
                verbose: false
            });
        });
    });

router.route("/list/verbose")
    // Show verbose member list
    .get(function(req, res) {
        memberRegistry.getAll().then((members) => {
            return res.render("list-members", {
                members: members,
                verbose: true
            });
        });
    });

module.exports = router;
