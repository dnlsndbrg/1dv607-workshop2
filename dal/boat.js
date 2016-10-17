const Boat = require("../model/Boat");
const db = require("../database");

const Promise = require("promise");

function fetchAll() {
    return new Promise(function(resolve, reject) {
        let query = "SELECT * FROM Boat";
        let boats = [];
        db.all(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            rows.forEach((row) => {
                boats.push(new Boat(row));
            });
            return resolve(boats);
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
        db.all(query, {$memberID:memberID}, (err, rows) => {
            if (err) {
                return reject(err);
            }
            boats = rows.map(row => new Boat(row));
            return resolve(boats);
        });
    })
}

function remove(id) {
    return new Promise(function(resolve, reject) {
        let query = "DELETE FROM boat WHERE id=$id";
        db.run(query, {$id:id}, (err) => {
            if (err)
                return reject(err);
            return resolve();
        });
    });
}

function create(boat) {
    return new Promise(function(resolve, reject) {
        let query = "INSERT INTO boat (type, length, member_id) VALUES ($type, $length, $memberID)";
        db.run(query, {
            $type: boat.type,
            $length: boat.length,
            $memberID: boat.memberID
        }, function(err) {
            if (err) {
                return reject(err);
            }
            boat.id = this.lastID;
            return resolve(boat);
        });
    });
}

function update(memberData) {

}

module.exports = {
    fetchAll,
    fetchOne,
    fetchByMemberID,
    remove,
    create,
    update
};
