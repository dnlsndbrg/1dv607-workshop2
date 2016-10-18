// const Member = require("../model/Member");
const Boat = require("../model/Boat");
const db = require("../database");

const boatDAL = require("./boat");

const Promise = require("promise");

function fetchAll() {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM Member";
        db.all(query, (err, rows) => {
            if (err) return reject(err);
            return resolve(rows);
        });
    });
}

function fetchOne(id) {
    return new Promise(function(resolve, reject) {
        let query = "SELECT * FROM member WHERE member.id=$id";
        db.get(query, {$id: id}, (err, row) => {
            if (err) return reject(err);
            return resolve(row);
        });
    });
}

function remove(id) {
    return new Promise(function(resolve, reject) {
        let query = "DELETE FROM member WHERE id=$id";
        db.run(query, {$id: id}, err => {
            console.log("NU SKA DEN BORT");
            if (err) return reject(err);
            return resolve();
        });
    });
}

function create(member) {
    return new Promise(function(resolve, reject) {
        let query = "INSERT INTO member (first_name, last_name, personal_number) VALUES ($firstName, $lastName, $personalNumber)";
        let parameters = {
            $firstName: member.firstName,
            $lastName: member.lastName,
            $personalNumber: member.personalNumber
        };
        db.run(query, parameters, function(err) {
            if (err) return reject(err)
            member.id = this.lastID;
            return resolve(member);
        });
    });
}

function update(member) {
    console.log("member", member);
    return new Promise(function(resolve, reject) {
        let query = "UPDATE member SET first_name = $firstName, last_name = $lastName, personal_number = $personalNumber WHERE id = $id";
        let parameters = {
            $firstName: member.firstName,
            $lastName: member.lastName,
            $personalNumber: member.personalNumber,
            $id: member.id
        };
        console.log("Parameters", parameters);
        db.run(query, parameters, function(err) {
            if (err) return reject(err)
            return resolve(member);
        });
    });
}

module.exports = {
    fetchAll,
    fetchOne,
    remove,
    create,
    update
};
