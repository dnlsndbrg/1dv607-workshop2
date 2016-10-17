const Member = require("../model/Boat");
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
            return fulfill(members);
        });
    });
}

function fetchOne(id) {
    return new Promise(function(fullfill, reject) {
        let  mysqlQuery = "SELECT * FROM boat WHERE id=$id";

        db.get(mysqlQuery, {$id:id},(err, row) => {
            if (err)
                return reject(err);

            return fulfill(row);
        });
    })
}

module.exports = {
    fetchAll,
    fetchByName,
    fetchOne
};
