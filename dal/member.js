const Member = require("../model/Member");
const db = require("../database");

const Promise = require("promise");

function fetchAll() {
    return new Promise(function(fulfill, reject) {
        let statement = "SELECT * FROM Member";
        let members = [];
        db.all(statement, (err, rows) => {
            rows.forEach((row) => {
                members.push(new Member(row));
            });

            if (err)
                return reject(err);

            return fulfill(members);
        });
    });
}

function fetchOne(id) {
    return new Promise(function(fullfill, reject) {
        let  mysqlQuery = "SELECT * FROM member WHERE id=$id";

        db.get(mysqlQuery, {$id:id},(err, row) => {
            if (err)
                return reject(err);

            return fulfill(row);
        });
    })
}

function remove(id) {
    return new Promise(function(fullfill, reject) {
        let mysqlQuery = "DELETE FROM member WHERE id=$id";
        db.run(mysqlQuery, {$id:id}, (err) => {
            if (err)
                return reject(err);
            return fulfill();
        });
    });
}

function create(member) {
    return new Promise(function(fullfill, reject) {
        let mysqlQuery = "INSERT INTO member (first_name, last_name, personal_number) VALUES ($firstName, $lastName, $personalNumber)";
        db.run(mysqlQuery,
            {
                $firstName: member.firstName,
                $lastName: member.lastName,
                $personalNumber: member.personalNumber
            },
            function(err) {
                if (err)
                    return reject(err);
                member.id = this.lastID;
                return fullfill(member);
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
