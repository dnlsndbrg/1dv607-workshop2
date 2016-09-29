"use strict";

const readline = require("readline");

function cls() {
    var lines = process.stdout.rows;
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
    readline.cursorTo(process.stdout, 0, 0);
}

module.exports = {
    cls: cls
}
