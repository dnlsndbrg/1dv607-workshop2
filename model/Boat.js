const boatDAL = require("../dal/boat");

class Member {
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
        this.id === undefined ? memberDAL.create(this) : memberDAL.update(this);
    }

    delete() {
        memberDAL.delete(this);
        this.boats.forEach((boat) => {
            boat.delete();
        });
    }
}

module.exports = Boat;
