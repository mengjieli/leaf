"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RespBase = /** @class */ (function () {
    function RespBase() {
        this.result = 0;
        this.msg = "";
    }
    return RespBase;
}());
exports.RespBase = RespBase;
var ReqLogin = /** @class */ (function () {
    function ReqLogin() {
        this.user = "";
        this.pwd = "";
    }
    return ReqLogin;
}());
exports.ReqLogin = ReqLogin;
var Resp = /** @class */ (function () {
    function Resp() {
        this.base = new RespBase();
    }
    return Resp;
}());
exports.Resp = Resp;
var RespLogin = /** @class */ (function () {
    function RespLogin() {
        this.base = new RespBase();
    }
    return RespLogin;
}());
exports.RespLogin = RespLogin;
//# sourceMappingURL=struct.js.map