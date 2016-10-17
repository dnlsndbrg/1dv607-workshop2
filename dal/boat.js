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

function fetchByID(id) {

}

module.exports = {
    fetchAll,
    fetchByName,
    fetchByID
};
