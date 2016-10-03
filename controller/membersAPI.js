"use strict";

const express = require("express");
const MemberRegistry = require("../model/MemberRegistry");
const memberRegistry = new MemberRegistry();
var router = express.Router();

router.route("/")
    .get(function(req, res) {
        memberRegistry.getAll()
        .then((members) => {
            res.json(members);
        });
    })
    .post(function(req, res) {
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

    })

router.route("/:id")
    .get(function(req, res) {
        memberRegistry.getByID(req.params.id)
        .then((member) => {
            console.log(member);
            if (!member) {
                return res.status(404).json({error: "Member not found!"});
            }
            return res.json(member);
        });
    })
    .put(function(req, res) {
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
                res.status(200).json(member)
            })
            .catch((e) => {
                return res.status(500).json({error: e.message});
            })
        });
    })
    .delete(function(req, res) {
        memberRegistry.getByID(req.params.id)
        .then((member) => {
            console.log(member);
            if (!member) {
                return res.status(404).json({error: "Member not found!"});
            }
            member.delete()
            .then((member) => {
                res.status(200).json(`Member ${member.firstName} ${member.lastName} with ID ${member.id} deleted!`)
            })
            .catch((e) => {
                return res.status(500).json({error: e.message});
            })
        });
    });

module.exports = router;
