let readline = require("readline");

function cls() {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
}

module.exports = {
    cls: cls
}
