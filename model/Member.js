const memberDAL = require("../dal/member");
const boatDAL = require("../dal/boat");
const Boat = require("./Boat");

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

        // Should this reassign boat id to current member id?
        this.boats.push(boat);
    }

    // Takes a boat row and instanciates a Boat, adding it to the Boat[]
    addBoatRow(boatRow) {
        this.addBoat(new Boat(boatRow));
    }

    createBoat(boatRow) {
        boatDAL.create(boatRow)
        .then(boat => {
            this.addBoat(new Boat(boat));
        });
    }

    removeBoat(id) {
        this.boats = this.boats.filter(boat => boat.id !== id);
    }

    loadBoats() {
        return boatDAL.fetchByMemberID(this.id)
        .then(boatRows => {
            this.boats = boats.map(boatRow => new Boat(boatRow))
            return this;
        });
    }

    save() {
        return this.id === undefined ? memberDAL.create(this) : memberDAL.update(this);
    }

    delete() {
        this.boats.forEach((boat) => {
            boat.delete();
        });
        memberDAL.delete(this);
    }

    update(memberData) {
        this.firstName = memberData.firstName || this.firstName;
        this.lastName = memberData.lastName || this.lastName;
        this.personalNumber = memberData.personalNumber || this.personalNumber;
        return this.save();
    }

}

module.exports = Member;
