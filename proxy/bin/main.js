"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var proxy_1 = require("./proxy");
//绝对还原，客户端禁止使用 async 方法，替代 Promise 为 XPromise
var RespBase = /** @class */ (function (_super) {
    __extends(RespBase, _super);
    function RespBase() {
        var _this = _super.call(this) || this;
        _this.addProperty("result", proxy_1.EMProxyPropertyType.INT);
        _this.addProperty("msg", proxy_1.EMProxyPropertyType.STRING);
        return _this;
    }
    return RespBase;
}(proxy_1.ProxyStruct));
var ReqLogin = /** @class */ (function (_super) {
    __extends(ReqLogin, _super);
    function ReqLogin() {
        var _this = _super.call(this) || this;
        _this.addProperty("user", proxy_1.EMProxyPropertyType.STRING);
        _this.addProperty("pwd", proxy_1.EMProxyPropertyType.STRING);
        return _this;
    }
    return ReqLogin;
}(proxy_1.ProxyStruct));
var Resp = /** @class */ (function (_super) {
    __extends(Resp, _super);
    function Resp() {
        var _this = _super.call(this) || this;
        _this.addProperty("base", proxy_1.EMProxyPropertyType.STRUCT, RespBase);
        return _this;
    }
    return Resp;
}(proxy_1.ProxyStruct));
var RespLogin = /** @class */ (function (_super) {
    __extends(RespLogin, _super);
    function RespLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RespLogin;
}(RespBase));
var mk = new proxy_1.ProxyMaker(new proxy_1.Version("1.0.0"));
mk.addRemoteMethod(new proxy_1.ProxyMethod("Login", ReqLogin, RespLogin));
mk.makeServer("./../server/src");
//# sourceMappingURL=main.js.map