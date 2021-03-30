"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
//绝对还原，客户端禁止使用 async 方法，替代 Promise 为 XPromise
var lib = require("./../../server/bin/lib/lib");
var Version = /** @class */ (function () {
    function Version(v) {
        this.value = v;
    }
    return Version;
}());
exports.Version = Version;
var ProxyStruct = /** @class */ (function () {
    function ProxyStruct() {
        this.properties = [];
    }
    ProxyStruct.prototype.addProperty = function (name, type, typeValue) {
        var p = new ProxyProperty();
        p.name = name;
        p.type = type;
        p.typeValue = typeValue;
        this.properties.push(p);
        return p;
    };
    return ProxyStruct;
}());
exports.ProxyStruct = ProxyStruct;
var ProxyMethod = /** @class */ (function () {
    function ProxyMethod(name, req, resp, version) {
        this.name = name;
        this.req = req;
        this.resp = resp;
        this.version = version;
    }
    return ProxyMethod;
}());
exports.ProxyMethod = ProxyMethod;
var ProxyProperty = /** @class */ (function () {
    function ProxyProperty() {
    }
    return ProxyProperty;
}());
exports.ProxyProperty = ProxyProperty;
var EMProxyPropertyType;
(function (EMProxyPropertyType) {
    EMProxyPropertyType[EMProxyPropertyType["INT"] = 1] = "INT";
    EMProxyPropertyType[EMProxyPropertyType["STRING"] = 2] = "STRING";
    EMProxyPropertyType[EMProxyPropertyType["STRUCT"] = 10] = "STRUCT";
    EMProxyPropertyType[EMProxyPropertyType["ARRAY_INT"] = 101] = "ARRAY_INT";
    EMProxyPropertyType[EMProxyPropertyType["ARRAY_STRING"] = 102] = "ARRAY_STRING";
})(EMProxyPropertyType = exports.EMProxyPropertyType || (exports.EMProxyPropertyType = {}));
var ProxyMaker = /** @class */ (function () {
    function ProxyMaker(v) {
        this.structs = [];
        this.methods = [];
        this.version = v;
    }
    ProxyMaker.prototype.addStruct = function (st) {
        var _this = this;
        if (!st || this.structs.indexOf(st) != -1)
            return;
        this.structs.push(st);
        var v = new st();
        v.properties.forEach(function (p) {
            if (p.type === EMProxyPropertyType.STRUCT) {
                _this.addStruct(p.typeValue);
            }
        });
    };
    ProxyMaker.prototype.addRemoteMethod = function (method) {
        this.methods.push(method);
        this.addStruct(method.req);
        this.addStruct(method.resp);
    };
    ProxyMaker.prototype.makeClient = function () {
    };
    /**
     *
     * @param url src 目录
     */
    ProxyMaker.prototype.makeServer = function (url) {
        var e_1, _a;
        var file = new lib.File(lib.File.join(url, "proxy/auto/readme.md"));
        file.save(JSON.stringify({
            version: this.version.value,
            update: Date.now()
        }, null, 2));
        var strcut = "";
        try {
            for (var _b = __values(this.structs), _c = _b.next(); !_c.done; _c = _b.next()) {
                var st = _c.value;
                strcut += this.makeStruct(new st()) + '\n\n';
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        file = new lib.File(lib.File.join(url, "proxy/auto/struct.ts"));
        file.save(strcut);
    };
    ProxyMaker.prototype.makeStruct = function (st) {
        var str = "export class " + st.constructor.name + " {\n";
        st.properties.forEach(function (p) {
            if (p.type === EMProxyPropertyType.INT)
                str += "\t" + p.name + ": number = 0;";
            if (p.type === EMProxyPropertyType.STRING)
                str += "\t" + p.name + ": string = '';";
            if (p.type === EMProxyPropertyType.STRUCT) {
                var pt = new p.typeValue();
                str += "\t" + p.name + ": " + pt.constructor.name + " = new " + pt.constructor.name + "();";
            }
            if (p.type === EMProxyPropertyType.ARRAY_INT)
                str += "\t" + p.name + ": number[] = [];";
            if (p.type === EMProxyPropertyType.ARRAY_STRING)
                str += "\t" + p.name + ": string[] = [];";
            str += '\n';
        });
        str += "}";
        return str;
    };
    return ProxyMaker;
}());
exports.ProxyMaker = ProxyMaker;
//# sourceMappingURL=proxy.js.map