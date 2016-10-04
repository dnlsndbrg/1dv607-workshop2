"use strict";

const express = require("express");
const MemberRegistry = require("../model/MemberRegistry");
const memberRegistry = new MemberRegistry();
var router = express.Router();

function getMembers() {

}

router.route("/:id")
    .get(function(req, res) {
        memberRegistry.getByID(req.params.id)
        .then((member) => {
            if (!member) {
                return res.status(404).send("Member not found!");
            }
            return res.render("view-member", {member});
        });
    });

router.route("/new")
    // Show register member form
    .get(function(req, res) {
        return res.render("register-member");
    })
    // Handle register member
    .post(function(req, res) {
        let memberData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            personalNumber: req.body.personalNumber
        };

        memberRegistry.createMember(memberData)
        .then((member) => {
            return res.redirect(`/member/${member.id}`);
        })
        .catch((e) => {
            console.log(e.message);
            return res.render("register-member");
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
