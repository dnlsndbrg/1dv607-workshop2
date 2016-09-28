"use strict";

const readline = require("readline");

function cls() {
    // readline.cursorTo(process.stdout, 0, 0);
    // readline.clearScreenDown(process.stdout);
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
    readline.cursorTo(process.stdout, 0, 0);
}

module.exports = {
    cls: cls
}
