"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
function getRootPath() {
    var fooPath = process.mainModule.filename;
    return path_1.join(fooPath, './../../');
}
exports.getRootPath = getRootPath;
//# sourceMappingURL=root.js.map