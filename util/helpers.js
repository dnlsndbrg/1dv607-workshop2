"use strict";

const readline = require("readline");

// Clears screen
function cls() {
    var lines = process.stdout.rows;
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
    readline.cursorTo(process.stdout, 0, 0);
}

// fills or shortens a string to a specified length
function trimString(string, length) {
    // type check
    if (!(typeof string === "string" || string instanceof String)) throw new TypeError("Not a string");

    // if string is longer than the length, cut it down
    if (string.length > length) string = string.slice(0, length - string.length);
    // is string is shorter, fill it out with
    if  (string.length < length) string += " ".repeat(length - string.length);

    return string;
}

module.exports = {
    cls: cls,
    trimString: trimString
}
