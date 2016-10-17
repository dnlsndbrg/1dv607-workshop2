const memberDAL = require("../dal/member");

class Member {
    constructor(data) {
        this._id = data.id;
        this._firstName = data.first_name;
        this._lastName = data.last_name;
        this._personalNumber = data.personal_number;
        this.boats = [];
    }

    get id(){ return this._id };
    set id(value) {
        // TODO: Add validation
        return this._id = value;
    }

    get firstName(){ return this._firstName };
    set firstName(value) {
        // TODO: Add validation
        this._firstName = value;
    }

    get lastName(){ return this._lastName };
    set lastName(value) {
        // TODO: Add validation
        return this._lastName = value;
    }

    get personalNumber(){ return this._personalNumber };
    set personalNumber(value) {
        // TODO: Add validation
        return this._personalNumber = value;
    }

    addBoat(boat) {
        // TODO: Add validation, make sure boat is a boat
        this.boats.push(boat);
    }

    removeBoat(id) {
        this.boats = this.boats.filter(boat => boat.id !== id);
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

module.exports = Member;
