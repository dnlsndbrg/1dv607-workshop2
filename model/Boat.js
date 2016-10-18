const boatDAL = require("../dal/boat");

class Boat {
    constructor(data) {
        this._id = data.id;
        this._type = data.type;
        this._length = data.length;
        this._memberID = data.member_id;
    }

    get id(){ return this._id };
    set id(value) {
        // TODO: Add validation
        return this._id = value;
    }

    get type(){ return this._type };
    set type(value) {
        // TODO: Add validation and ENUM
        this._type = value;
    }

    get length(){ return this._length };
    set length(value) {
        // TODO: Add validation
        return this._length = value;
    }
    get memberID(){ return this._memberID };
    set memberID(value) {
        // TODO: Add validation
        return this._memberID = value;
    }

    save() {
        return this.id === undefined ? boatDAL.create(this) : boatDAL.update(this);
    }

    delete() {
        return boatDAL.remove(this.id).catch(e => console.error(e));
    }

    update(boatData) {
        this.type = boatData.type || this.type;
        this.length = boatData.length || this.length;
        this.memberID = boatData.memberID || this.memberID;
        return this.save();
    }

    static getByID(id) {
        return boatDAL.fetchOne(id).then(boatRow => new this(boatRow));
    }
}

module.exports = Boat;
