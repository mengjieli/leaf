"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib = require("./../lib/lib");
var shell = new lib.TSCShell('/Users/limengjie/Documents/orange2');
shell.onCompileComplete = function (correct, error) {
    if (correct) {
        lib.Console.clear();
        console.log('compiler ok');
    }
    else
        console.log(error);
};
shell.onExit = function () { console.log('over!'); };
//# sourceMappingURL=test-shell.js.map