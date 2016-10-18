"use strict";

const express = require("express");
const MemberRegistry = require("../model/MemberRegistry");
const memberRegistry = new MemberRegistry();
var router = express.Router();

function getMembers() {

}

router.route("/new")
    // Show register member form
    .get(function displayRegisterForm(req, res) {
        return res.render("register-member");
    })
    // Handle register member
    .post(function doRegister(req, res) {
        let memberData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            personalNumber: req.body.personalNumber
        };

        memberRegistry.createMember(memberData)
        .then((member) => {
            return res.redirect(`/members/${member.id}`);
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
    .get(function displayCompactList(req, res) {
        memberRegistry.getAll().then((members) => {
            return res.render("list-members-compact", { members: members });
        });
    });

router.route("/list/verbose")
    // Show verbose member list
    .get(function displayVerboseList(req, res) {
        memberRegistry.getAll().then((members) => {
            return res.render("list-members-verbose", { members: members });
        });
    });


router.route("/:id")
    .get(function displaySingle(req, res) {
        memberRegistry.getByID(req.params.id)
        .then((member) => {
            if (!member) {
                return res.status(404).send("Member not found!");
            }
            let broats = member.firstName === "Gary";

            return res.render("view-member", {member, broats});
        });
    });

router.route("/:id/edit")
    .get(function displayEditForm(req, res) {
        memberRegistry.getByID(req.params.id)
        .then((member) => {
            if (!member) {
                return res.status(404).send("Member not found!");
            }
            return res.render("edit-member", {member});
        });
    })
    .post(function doEdit(req, res) {
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
                return res.redirect(`/members/${member.id}`);
            })
            .catch((e) => {
                return res.render("register-member", {member});
            })
        });
    });

router.route("/:id/delete")
    .get(function doDelete(req, res) {
        memberRegistry.getByID(req.params.id)
        .then((member) => {
            console.log(member);
            if (!member) {
                return res.status(404).json({error: "Member not found!"});
            }
            member.delete()
            .then((member) => {
                res.status(200).send(`Member ${member.firstName} ${member.lastName} with ID ${member.id} deleted!`)
            })
            .catch((e) => {
                return res.status(500).json({error: e.message});
            })
        });
    })

module.exports = router;
