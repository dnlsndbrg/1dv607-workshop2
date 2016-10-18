const boatDAL = require("../dal/boat");

class Boat {
    constructor(data) {
        this._id = data.id;
        this._type = data.type;
        this._length = data.length;
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

    save() {
        return this.id === undefined ? boatDAL.create(this) : boatDAL.update(this);
    }

    delete() {
        boatDAL.delete(this);
    }

    update(boatData) {
        this.type = boatData.type || this.type;
        this.length = boatData.length || this.length;
        return this.save();
    }

    static getByID(id) {
        return boatDAL.fetchOne(id).then(boatRow => new this(boatRow));
    }
}

module.exports = Boat;
