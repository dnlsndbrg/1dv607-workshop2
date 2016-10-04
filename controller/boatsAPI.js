"use strict";

const MemberRegistry = require("../model/MemberRegistry");
const memberRegistry = new MemberRegistry();
const Member = require("../model/Member");
const Boat = require("../model/Boat");

const express = require("express");
var router = express.Router();

router.route("/")
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
            return res.status(201).send(boat);
        })
    });

router.route("/:id")
    .get(function(req, res) {
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
    })
    .put(function(req, res) {
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
    })
    .delete(function(req, res) {
        Boat.findOne({
            where: {id: req.params.id}
        })
        .then((boat) => {
            if (!boat) { return res.status(404).send("Boat not found!"); }
            return boat.delete();
        })
        .then((boat) => {
            res.send(boat);
        })
        .catch((e) => {
            return res.status(500).send(e.message);
        });
    })

module.exports = router;
