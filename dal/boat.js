// const Boat = require("../model/Boat");
const db = require("../database");

const Promise = require("promise");

function fetchAll() {
    return new Promise(function(resolve, reject) {
        let query = "SELECT * FROM Boat";
        db.all(query, (err, rows) => {
            if (err) return reject(err);
            return resolve(rows);
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
            if (err) return reject(err);
            return resolve(rows);
        });
    })
}

function remove(id) {
    return new Promise(function(resolve, reject) {
        let query = "DELETE FROM boat WHERE id=$id";
        db.run(query, {$id: id}, err => {
            if (err) return reject(err);
            return resolve(id);
        });
    });
}

function create(boat) {
    return new Promise(function(resolve, reject) {
        let query = "INSERT INTO boat (type, length, member_id) VALUES ($type, $length, $memberID)";
        let parameters = {
            $type: boat.type,
            $length: boat.length,
            $memberID: boat.memberID
        };
        db.run(query, parameters, function(err) {
            if (err) return reject(err)
            boat.id = this.lastID;
            return resolve(boat);
        });
    });
}

function update(boatData) {
    // TODO: ADD UPDATE LOGIC!
}

module.exports = {
    fetchAll,
    fetchOne,
    fetchByMemberID,
    remove,
    create,
    update
};
