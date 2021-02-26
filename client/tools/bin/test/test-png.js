"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib = require("./../lib/lib");
var upng = require("upng-js");
var file = new lib.File("./res/a.png");
var bytes = file.readContent("binary");
var decoder = new lib.PNGDecoder();
var data = upng.decode(bytes); //decoder.decode(bytes);
console.log(data);
//# sourceMappingURL=test-png.js.map