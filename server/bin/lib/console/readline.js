"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require('readline');
function readLine(tip, defaultContent) {
    if (tip === void 0) { tip = '输入:'; }
    return new Promise(function (resolve) {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(tip, function (content) {
            resolve(content === '' && defaultContent ? defaultContent : content);
            rl.close();
        });
    });
}
exports.readLine = readLine;
//# sourceMappingURL=readline.js.map