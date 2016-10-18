const Member = require("../model/Member");
const Boat = require("../model/Boat");
const db = require("../database");

const boatDAL = require("./boat");

const Promise = require("promise");

function fetchAll() {
    return new Promise(function(resolve, reject) {

        let boatQuery = "SELECT * FROM Boat";
        let boats = [];

        let memberQuery = "SELECT * FROM Member";
        let members = [];

        db.serialize(() => {
            db.all(boatQuery, (err, rows) => {
                if (err) {
                    reject(err);
                }
                boats = rows;
            });

            // Map boats to members
            db.all(memberQuery, (err, rows) => {
                rows.forEach(row => {
                    let member = new Member(row);
                    let memberBoats = boats.filter(boat => boat.member_id === member.id);
                    member.boats = memberBoats.map(boat => new Boat(boat));
                    members.push(member);
                });

                if (err) {
                    return reject(err);
                }
                return resolve(members);
            });
        });
    });
}

function fetchOne(id) {
    return new Promise(function(resolve, reject) {
        let query = "SELECT * FROM member WHERE member.id=$id";
        db.get(query, {$id: id}, (err, row) => {
            if (err) {
                return reject(err);
            }
            let member = new Member(row);

            boatDAL.fetchByMemberID(row.id).then(boats => {
                console.log("BOATS", boats);
                member.boats = boats;
                return resolve(member);
            });

        });
    });
}

function remove(id) {
    return new Promise(function(resolve, reject) {
        let query = "DELETE FROM member WHERE id=$id";
        db.run(query, {$id:id}, (err) => {
            if (err)
                return reject(err);
            return resolve();
        });
    });
}

function create(member) {
    return new Promise(function(resolve, reject) {
        let query = "INSERT INTO member (first_name, last_name, personal_number) VALUES ($firstName, $lastName, $personalNumber)";
        db.run(query, {
            $firstName: member.firstName,
            $lastName: member.lastName,
            $personalNumber: member.personalNumber
        }, function(err) {
            if (err) {
                return reject(err);
            }
            member.id = this.lastID;
            return resolve(member);
        });
    });
}

function update(memberData) {

}


module.exports = {
    fetchAll,
    fetchOne,
    remove,
    create,
    update
};
