const Member = require("../model/Boat");
const db = require("../database");

const Promise = require("promise");

function fetchAll() {
    return new Promise(function(resolve, reject) {
        let query = "SELECT * FROM Member";
        let members = [];
        db.all(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            rows.forEach((row) => {
                members.push(new Member(row));
            });
            return resolve(members);
        });
    });
}

function fetchOne(id) {
    return new Promise(function(resolve, reject) {
        let  query = "SELECT * FROM boat WHERE id=$id";
        db.get(query, {$id:id}, (err, row) => {
            if (err) {
                return reject(err);
            }
            return resolve(row);
        });
    })
}

function fetchByMemberID(memberID) {
    return new Promise(function(resolve, reject) {
        let  query = "SELECT * FROM boat WHERE member_id=$memberID";
        db.get(query, {$memberID:memberID}, (err, row) => {
            if (err) {
                return reject(err);
            }
            return resolve(row);
        });
    })
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
    fetchByMemberID
};
