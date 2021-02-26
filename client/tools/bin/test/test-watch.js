"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib = require("./../lib/lib");
var file = new lib.File('/Users/limengjie/Documents/orange2/src');
file.watch(function (urls) {
    console.log('change:', urls);
});
var shell = new lib.TSCShell('/Users/limengjie/Documents/orange2');
shell.onCompileComplete = function (correct, error) {
    if (correct) {
        console.log('compiler ok');
    }
    else
        console.log(error);
};
shell.onExit = function () { console.log('over!'); };
//# sourceMappingURL=test-watch.js.map