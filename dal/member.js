const Member = require("../model/Member");
const db = require("../database");

const Promise = require("promise");

function fetchAll() {
    return new Promise(function(resolve, reject) {
        let query = "SELECT * FROM Member";
        let members = [];
        db.all(query, (err, rows) => {
            rows.forEach((row) => {
                members.push(new Member(row));
            });

            if (err)
                return reject(err);

            return resolve(members);
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
            return resolve(new Member(row));
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
