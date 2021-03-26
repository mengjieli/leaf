"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./../../../libs/msgpack/msgpack");
var path_1 = require("path");
var RequestCommand = /** @class */ (function () {
    function RequestCommand() {
    }
    RequestCommand.prototype.fail = function (errorCode, message) {
        if (message === void 0) { message = ""; }
        this.send({
            "cmd": this.cmd,
            "rSeq": this.seq,
            "code": errorCode,
            "error": message,
            "body": {}
        });
    };
    RequestCommand.prototype.success = function (body) {
        if (body === void 0) { body = null; }
        this.send({
            "cmd": this.cmd,
            "rSeq": this.seq,
            "code": 0,
            "error": "",
            "body": body || {}
        });
    };
    RequestCommand.prototype.send = function (msg) {
        msg.body = msgpack.encode(msg.body);
        this.client.send(msgpack.encode(msg));
    };
    RequestCommand.prototype.getRoot = function (path) {
        return path ? path_1.join(global["params"].rootPath, path) : global["params"].rootPath;
    };
    RequestCommand.prototype.getOrangePath = function (path) {
        return path ? path_1.join(global["params"].orangePath, path) : global["params"].orangePath;
    };
    return RequestCommand;
}());
exports.RequestCommand = RequestCommand;
//# sourceMappingURL=request-command.js.map