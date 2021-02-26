"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib = require("./../lib/lib");
var path = '/Users/limengjie/Documents/orange2/src';
var file = new lib.File(path);
var files = [];
file.watch(function (urls) {
    files = files.concat(urls);
});
var shell = new lib.TSCShell('/Users/limengjie/Documents/orange2');
shell.onCompileComplete = function (correct, error) {
    if (correct) {
        lib.Console.clear();
        console.log('compiler ok', files);
        files.forEach(function (url) {
            url = path + url.slice(path.length, url.length);
            if (url.split('.').length == 2 && url.split('.')[1] == 'ts') {
                url = url.slice(0, url.length - 2) + 'js';
                var file = new lib.File(url);
                var c = file.readContent();
                eval(c + ';new B();');
                console.log(url);
            }
        });
        files.length = 0;
    }
    else
        console.log(error);
};
shell.onExit = function () { console.log('over!'); };
//# sourceMappingURL=test-compiler.js.map