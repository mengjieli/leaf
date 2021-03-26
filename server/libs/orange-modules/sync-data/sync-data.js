var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var syncData;
(function (syncData) {
    function find(keys, value) {
        var val = orange.GetUtil.getFromGlobal(keys);
        var flag = false;
        if (val && val instanceof DataBase) {
            val.$search("", value, function (findKeys, result) {
                flag = true;
                console.log('[find] 找到对象:', keys + '.' + findKeys, result);
            });
            if (!flag)
                console.log('[find] 没有查找到对应结果');
        }
        else {
            console.log('[find] 类型错误，无法查找');
        }
    }
    syncData.find = find;
    var DataBase = /** @class */ (function (_super) {
        __extends(DataBase, _super);
        function DataBase(properties) {
            var _this = _super.call(this) || this;
            _this.history = new Map();
            _this.properties = properties;
            return _this;
        }
        DataBase.prototype.dispose = function () {
            var _this = this;
            orange.stop(this);
            orange.removeAllListeners(this);
            var properties = this.properties;
            properties.forEach(function (t, key) {
                var e_1, _a;
                if (t.type == 1) {
                    if (_this[key]) {
                        _this[key].dispose();
                    }
                }
                else if (t.type == 2) {
                    if (t.classType && _this[key]) {
                        try {
                            for (var _b = __values(_this[key]), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var item = _c.value;
                                if (item)
                                    item.dispose();
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                else if (t.type == 3) {
                    if (t.classType && _this[key]) {
                        _this[key].forEach(function (item) {
                            if (item)
                                item.dispose();
                        });
                    }
                }
            });
        };
        DataBase.prototype.find = function (value) {
            var find = false;
            this.$search("", value, function (key) {
                find = true;
                console.log('[find] 找到结果:', key);
            });
            if (!find) {
                console.log('[find] 没有找到对应的结果');
            }
        };
        DataBase.prototype.$search = function (keys, findValue, find) {
            var _this = this;
            keys += keys == "" ? '' : '.';
            this.properties.forEach(function (value, key) {
                var subKeys = keys + key;
                //0:基本类型  1:class  2:Array  3:Map
                if (value.type == 0) {
                    if (typeof findValue === 'function') {
                        if (findValue(_this[key], subKeys))
                            find(subKeys, _this[key]);
                    }
                    else {
                        if (_this[key] == findValue)
                            find(subKeys, _this[key]);
                    }
                }
                else if (value.type == 1) {
                    _this[key] && _this[key].$search && _this[key].$search(subKeys, findValue, find);
                }
                else if (value.type == 2) {
                    _this[key] && _this[key].forEach(function (item, ind) {
                        var ssubKeys = subKeys + ("[" + ind + "]");
                        if (value.classType) {
                            item && item.$search(ssubKeys, findValue, find);
                        }
                        else {
                            if (typeof findValue === 'function') {
                                if (findValue(item, ssubKeys))
                                    find(ssubKeys, item);
                            }
                            else {
                                if (item == findValue)
                                    find(ssubKeys, item);
                            }
                        }
                    });
                }
                else if (value.type == 3) {
                    _this[key] && _this[key].forEach(function (item, k) {
                        var ssubKeys = subKeys + (".get(" + (typeof k === 'string' ? '"' + k + '"' : k) + ")");
                        if (value.classType) {
                            if (item) {
                                if (item.$search) {
                                    item.$search(ssubKeys, findValue, find);
                                }
                                else if (typeof item === 'object') {
                                    for (var ok in item) {
                                        var sssubKeys = ssubKeys + '.' + ok;
                                        if (typeof findValue === 'function') {
                                            if (findValue(item[ok], sssubKeys))
                                                find(sssubKeys, item);
                                        }
                                        else {
                                            if (item[ok] == findValue)
                                                find(sssubKeys, item[ok]);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (typeof findValue === 'function') {
                                if (findValue(item, ssubKeys))
                                    find(ssubKeys, item);
                            }
                            else {
                                if (item == findValue)
                                    find(ssubKeys, item);
                            }
                        }
                    });
                }
            });
        };
        DataBase.prototype.toJSON = function () {
            var _this = this;
            var obj = {};
            this.properties.forEach(function (value, key) {
                var e_2, _a, e_3, _b;
                //0:基本类型  1:class  2:Array  3:Map
                if (value.type == 0)
                    obj[key] = _this[key];
                if (value.type == 1)
                    obj[key] = _this[key].toJSON();
                if (value.type == 2) {
                    if (!value.classType) {
                        obj[key] = _this[key];
                    }
                    else {
                        obj[key] = [];
                        try {
                            for (var _c = __values(_this[key]), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var item = _d.value;
                                obj[key].push(item.toJSON());
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                else if (value.type == 3) {
                    if (!value.classType) {
                        obj[key] = _this[key];
                    }
                    else {
                        obj[key] = new Map();
                        try {
                            for (var _e = __values(_this[key]), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var item = _f.value;
                                obj[key].push(item.toJSON());
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
            });
            return obj;
        };
        /**
         * @param name 属性名称
         * @param clazz 类型
         * @param type 0:简单类型  1:class  2:Array  3:Map
         */
        DataBase.prototype.createProperty = function (name) {
            var t = this.properties.get(name);
            if (t.type == 1)
                return new t.classType();
            if (t.type == 2)
                return new Array();
            if (t.type == 3)
                return new Map();
            return t.init;
        };
        /**
         * 清空数据
         */
        DataBase.prototype.reset = function () {
            var e_4, _a;
            var properties = this.properties;
            try {
                for (var properties_1 = __values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
                    var _b = __read(properties_1_1.value, 2), k = _b[0], v = _b[1];
                    if (v.type === 0) {
                        this[k] = this.createProperty(k);
                    }
                    else if (v.type === 1) {
                        if (this[k])
                            this[k].reset();
                    }
                    else if (v.type === 2) {
                        if (!this[k])
                            this[k] = this.createProperty(k);
                        if (this[k])
                            this[k].length = 0;
                    }
                    else if (v.type === 3) {
                        if (!this[k])
                            this[k] = this.createProperty(k);
                        if (this[k])
                            this[k].clear();
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        /**
         * 复制一个对象
         */
        DataBase.prototype.clone = function () {
            var e_5, _a;
            var type = Object.getPrototypeOf(this);
            var obj = new type.constructor();
            var properties = this.properties;
            var _loop_1 = function (k, v) {
                if (v.type === 0) {
                    obj[k] = this_1[k];
                }
                else if (v.type === 1) {
                    if (this_1[k])
                        obj[k] = this_1[k].clone();
                    else
                        obj[k] = this_1.createProperty(k);
                }
                else if (v.type === 2) {
                    obj[k] = this_1.createProperty(k);
                    if (this_1[k])
                        this_1[k].forEach(function (item) { return obj[k].push(item); });
                }
                else if (v.type === 3) {
                    obj[k] = this_1.createProperty(k);
                    if (this_1[k])
                        this_1[k].forEach(function (item, itemKey) { return obj[k].set(itemKey, item); });
                }
            };
            var this_1 = this;
            try {
                for (var properties_2 = __values(properties), properties_2_1 = properties_2.next(); !properties_2_1.done; properties_2_1 = properties_2.next()) {
                    var _b = __read(properties_2_1.value, 2), k = _b[0], v = _b[1];
                    _loop_1(k, v);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (properties_2_1 && !properties_2_1.done && (_a = properties_2.return)) _a.call(properties_2);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return obj;
        };
        /**
         * @param obj
         */
        DataBase.prototype.setValue = function (obj, path) {
            if (path === void 0) { path = ''; }
            var e_6, _a, e_7, _b;
            var properties = this.properties;
            for (var key in obj) {
                var value = obj[key];
                var propertyType = properties.get(key);
                if (!propertyType)
                    continue;
                if (propertyType.type == 0) {
                    if (propertyType.recordFlag) {
                        this.history.set(key, this[key]);
                    }
                    this[key] = value;
                }
                else if (propertyType.type == 1) { //如果是对象
                    if (this[key]) { //如果对象不为空
                        var objKeyName = this[key]._key_;
                        //如果定义了 keyName 并且 value 携带 keyName 并且 value 和当前对象的 keyName 属性不等
                        if (objKeyName && value.hasOwnProperty(objKeyName) && this[key][objKeyName] != value[objKeyName]) {
                            var e = new syncData.UpdateEvent(syncData.UpdateEvent.RESET_DATA);
                            e.data = this[key];
                            e.name = key;
                            e.path = path + '.' + key;
                            e.proxy = syncData.UpdateEvent.$proxy;
                            syncData.UpdateEvent.emitter.emit(e);
                            this[key].reset();
                        }
                    }
                    else {
                        this[key] = this.createProperty(key);
                    }
                    this[key].setValue(value, path + '.' + key);
                }
                else if (propertyType.type == 2) { //数组只有全量更新
                    if (propertyType.recordFlag) {
                        this.history.set(key, this[key]);
                    }
                    if (value == null) { //如果传过来的内容为 null ，则清空数组
                        this[key] = [];
                    }
                    else {
                        if (propertyType.classType) {
                            if (this[key]) {
                                try {
                                    for (var _c = __values(this[key]), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        var item = _d.value;
                                        item && item.dispose();
                                    }
                                }
                                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                    }
                                    finally { if (e_6) throw e_6.error; }
                                }
                            }
                            this[key] = [];
                            try {
                                for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                                    var itemValue = value_1_1.value;
                                    var item = new propertyType.classType();
                                    if (item.setValue) {
                                        item.setValue(itemValue, path + '.' + key + '[' + value.indexOf(itemValue) + ']');
                                    }
                                    else {
                                        for (var k in itemValue) {
                                            item[k] = value[k];
                                        }
                                    }
                                    this[key].push(item);
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (value_1_1 && !value_1_1.done && (_b = value_1.return)) _b.call(value_1);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                        }
                        else {
                            this[key] = value;
                        }
                    }
                }
                else if (propertyType.type == 3) { // map 支持增量更新
                    var map = this[key];
                    if (propertyType.recordFlag) {
                        var m = new Map();
                        map.forEach(function (v, k) { return m.set(k, v); });
                        this.history.set(key, m);
                    }
                    if (value == null) {
                        map.clear();
                    }
                    else {
                        for (var k in value) {
                            if (+k + '' === k)
                                k = +k;
                            var val = value[k];
                            if (val == null) {
                                map.delete(k);
                            }
                            else if (!map.has(k)) {
                                if (!propertyType.classType) {
                                    map.set(k, value[k]);
                                }
                                else {
                                    var item = new propertyType.classType();
                                    item.setValue(value[k], path + '.' + key + '.get(' + (typeof k == 'string' ? '"' + k + '"' : k) + ')');
                                    map.set(k, item);
                                }
                            }
                            else {
                                if (propertyType.classType) {
                                    var item = map.get(k);
                                    item.setValue(value[k], path + '.' + key + '.get(' + (typeof k == 'string' ? '"' + k + '"' : k) + ')');
                                }
                                else {
                                    map.set(k, value[k]);
                                }
                            }
                        }
                    }
                }
            }
        };
        /**
         * 设置 map 对象
         * @param map
         * @param value
         * @param classDefine
         */
        DataBase.prototype.setMap = function (key, value, classDefine) {
            var map = this[key];
            if (!classDefine)
                classDefine = this.properties.get(key).classType;
            if (value == null) {
                map.clear();
                return;
            }
            for (var k in value) {
                if (+k + '' === k)
                    k = +k;
                var val = value[k];
                if (val == null) {
                    map.delete(k);
                }
                else if (!map.has(k)) {
                    if (!classDefine) {
                        map.set(k, value[k]);
                    }
                    else {
                        var item = new classDefine();
                        item.setValue(value[k]);
                        map.set(k, item);
                    }
                }
                else {
                    if (classDefine) {
                        var item = map.get(k);
                        item.setValue(value[k]);
                    }
                    else {
                        map.set(k, value[k]);
                    }
                }
            }
        };
        /**
         * 设置 map 对象
         * @param map
         * @param value
         * @param classDefine
         */
        DataBase.setMap = function (map, value, classDefine) {
            if (value == null) {
                map.clear();
                return;
            }
            for (var k in value) {
                if (+k + '' === k)
                    k = +k;
                var val = value[k];
                if (val == null) {
                    map.delete(k);
                }
                else if (!map.has(k)) {
                    if (!classDefine) {
                        map.set(k, value[k]);
                    }
                    else {
                        var item = new classDefine();
                        item.setValue(value[k]);
                        map.set(k, item);
                    }
                }
                else {
                    if (classDefine) {
                        var item = map.get(k);
                        item.setValue(value[k]);
                    }
                    else {
                        map.set(k, value[k]);
                    }
                }
            }
        };
        __decorate([
            orange.watch
        ], DataBase.prototype, "history", void 0);
        return DataBase;
    }(orange.HashObject));
    syncData.DataBase = DataBase;
})(syncData || (syncData = {}));
try {
    window["syncData"] = syncData;
    window["orange"]["sync"] = syncData;
}
catch (e) {
}
var syncData;
(function (syncData) {
    var DataType = /** @class */ (function () {
        function DataType(type, classType, init, recordFlag) {
            if (recordFlag === void 0) { recordFlag = false; }
            /**
             * 数据类型  'number' 'string' 'boolean'  0:基本类型  1:class  2:Array  3:Map
             */
            this.type = 0;
            this.key = "id";
            /**
             * 记录差异值
             */
            this.recordFlag = false;
            this.type = type;
            this.classType = classType;
            this.init = init;
            this.recordFlag = recordFlag;
        }
        return DataType;
    }());
    syncData.DataType = DataType;
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    function login(params) {
        return __awaiter(this, void 0, void 0, function () {
            var info, token, proxy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getPlatformInfo(params.btnConfig)];
                    case 1:
                        info = _a.sent();
                        orange.debug && console.log("[login] step 1/4 : getPlatformInfo ok!");
                        return [4 /*yield*/, authLogin(params.url, info, params.getLoginParams, params.compressed)];
                    case 2:
                        token = _a.sent();
                        orange.debug && console.log("[login] step 2/4 : authLogin ok!");
                        return [4 /*yield*/, checkToken(token, params)];
                    case 3:
                        proxy = _a.sent();
                        orange.debug && console.log("[login] step 3/4 : checkToken ok!");
                        return [4 /*yield*/, gameLogin(proxy, info)];
                    case 4:
                        _a.sent();
                        orange.debug && console.log("[login] step 4/4 : gameLogin ok!");
                        return [2 /*return*/, proxy];
                }
            });
        });
    }
    syncData.login = login;
    function getPlatformInfo(btnConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var sdk;
            return __generator(this, function (_a) {
                sdk = window['sdk'];
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sdk.login(function (user, err) {
                            if (err) {
                                reject(new Error('认证错误'));
                            }
                            else {
                                var info = JSON.stringify(user);
                                resolve(info);
                            }
                        }, btnConfig);
                    })];
            });
        });
    }
    function authLogin(url, info, getLoginParams, encoding, close) {
        return __awaiter(this, void 0, void 0, function () {
            var hasLogin;
            return __generator(this, function (_a) {
                hasLogin = false;
                return [2 /*return*/, orange.tryPromise(function (resolve, reject) {
                        encoding && (url = url + "?encoding=" + encoding);
                        syncData.connect(url, {
                            closeHandler: function (r) {
                                if (hasLogin == false) {
                                    !hasLogin && reject(new Error('未收到 token'));
                                }
                                else {
                                    close && close(r);
                                }
                            },
                            compressed: encoding
                        }).then(function (proxy) {
                            var params = {
                                "platform": "hortor",
                                "info": info
                            };
                            if (getLoginParams) {
                                var ps = getLoginParams();
                                for (var k in ps)
                                    params[k] = ps[k];
                            }
                            proxy.request({
                                "cmd": "Auth_Login",
                                "params": params
                            }).then(function (resp) {
                                proxy.connection.close();
                                hasLogin = true;
                                resolve(resp.body.token);
                            });
                        }).catch(function (reason) {
                            reject(new Error('无法链接服务器'));
                        });
                    })];
            });
        });
    }
    ;
    function checkToken(token, params, close) {
        return orange.tryPromise(function (resolve, reject) {
            var url = params.url;
            url = url + "?token=" + encodeURIComponent(token);
            params.compressed && (url = url + "&encoding=" + params.compressed);
            syncData.connect(url, params).then(function (proxy) {
                resolve(proxy);
            }).catch(function (r) {
                reject(new Error('无法链接服务器'));
            });
        });
    }
    syncData.checkToken = checkToken;
    function gameLogin(proxy, info) {
        return orange.tryPromise(function (resolve, reject) {
            var data = {
                "cmd": "Game_Login",
                "params": {
                    "platform": "hortor",
                    "info": info
                },
            };
            proxy.request(data).then(function (resp) {
                if (resp.errorCode == 0) {
                    resolve(resp.body);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    }
    syncData.gameLogin = gameLogin;
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    var Protocol = /** @class */ (function () {
        function Protocol() {
            /**
             * @internal
             */
            this._seq = 1;
            /**
             * @internal
             */
            this.setSeq = 0;
            this.compressed = null;
        }
        Protocol.prototype.encode = function (data) {
            var msgSeq = this.setSeq || this._seq++;
            var bytes = null;
            var msg = {
                cmd: data.cmd,
                seq: msgSeq,
                body: msgpack.encode(data.params)
            };
            (bytes = msgpack.encode(msg));
            if (this.compressed == 'gzip') {
                (bytes = pako.gzip(bytes, { level: 9 }));
            }
            if (orange.hasListener(this, orange.Event.SEND)) {
                orange.emitWith(this, orange.Event.SEND, data);
            }
            return {
                sequence: msgSeq,
                bytes: bytes
            };
        };
        Protocol.prototype.decode = function (bytes) {
            if (this.compressed == 'gzip') {
                (bytes = pako.ungzip(bytes));
            }
            var data = msgpack.decode(bytes);
            if (orange.hasListener(this, orange.Event.DATA)) {
                orange.emitWith(this, orange.Event.DATA, data);
            }
            return {
                errorCode: data.code == null ? 0 : data.code,
                errorMessage: data.error,
                command: data.cmd,
                sequence: data.rSeq,
                serverSequence: data.seq,
                body: data.body ? msgpack.decode(data.body) : null
            };
        };
        return Protocol;
    }());
    syncData.Protocol = Protocol;
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    var Proxy = /** @class */ (function (_super) {
        __extends(Proxy, _super);
        function Proxy() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._debug = false;
            _this.version = "0.1.0";
            /**
             * 根数据
             */
            _this.root = null;
            /**
             * 用于数据同步的消息 id
             */
            _this.syncCommands = ['Resp_Sync'];
            _this.syncAll = false;
            /**
             * @internal
             */
            _this.lastSeq = 0;
            /**
             * @internal
             */
            _this.lastConnectTime = 0;
            /**
             * 重连次数
             */
            _this.reconnectCount = 5;
            /**
             * @internal
             */
            _this.curReconnectCount = 0;
            /**
             * @internal
             */
            _this.quit = false;
            _this.records = {};
            return _this;
        }
        Object.defineProperty(Proxy.prototype, "debug", {
            get: function () {
                return this._debug;
            },
            set: function (val) {
                orange.APIUtil.deprecatedTip('Proxy.debug', 1543464755206, "不再需要单独设置网络打印，采用 orange.debug 进行判断");
                this._debug = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加数据同步指令
         * @param cmd
         */
        Proxy.prototype.addSyncCommand = function (cmd) {
            this.syncCommands.push(cmd);
        };
        Object.defineProperty(Proxy.prototype, "syncAllCommand", {
            /**
             * 同步所有指令
             */
            set: function (val) {
                this.syncAll = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Proxy.prototype, "connection", {
            get: function () {
                return this._connection;
            },
            set: function (c) {
                var _this = this;
                this._connection = c;
                orange['$onAt'](this._connection, orange.Event.CLOSE, function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var last, now, data, url, key;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                last = this.lastConnectTime;
                                now = Date.now();
                                this.lastConnectTime = now;
                                if (!!this.quit) return [3 /*break*/, 5];
                                data = e.data;
                                if (!(data.reason == orange.ConnectionCloseReason.DISCONNECT || data.reason == orange.ConnectionCloseReason.HERT_TIMEOUT
                                    || data.reason == orange.ConnectionCloseReason.RECONNECT_ERROR && this.curReconnectCount < this.reconnectCount)) return [3 /*break*/, 4];
                                e.stop();
                                this.curReconnectCount++;
                                orange.debug && console.warn("\u7B2C" + this.curReconnectCount + "\u91CD\u8FDE");
                                if (!(data.reason == orange.ConnectionCloseReason.RECONNECT_ERROR)) return [3 /*break*/, 2];
                                return [4 /*yield*/, orange.sleep(1000)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                url = new orange.URLUtil(this._connection.url);
                                url.params['seq'] = this.lastSeq;
                                return [4 /*yield*/, this._connection.reconnect(url.url)];
                            case 3:
                                _a.sent();
                                this.curReconnectCount = 0;
                                for (key in this.records) {
                                    this.connection.protocol.setSeq = +key;
                                    this.connection.send(this.records[key]);
                                }
                                this.connection.protocol.setSeq = 0;
                                _a.label = 4;
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                clearInterval(this.clear);
                                _a.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                }); }, null, 0);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 接受消息，处理消息分发
         * @param data 消息
         */
        Proxy.prototype.receive = function (data) {
            if (data.serverSequence && data.serverSequence <= this.lastSeq) {
                console.warn("[过滤重复消息] id:" + data.command + ", sequence:" + data.sequence
                    + ", serverSequence:" + data.serverSequence
                    + ", errorCode:" + data.errorCode
                    + (data.errorCode != 0 ? ", errorMessage:" + data.errorMessage + " " : '')
                    + (data.sequence > 0 ? "(客户端调用返回)" : ""));
                return;
            }
            if (data.serverSequence && data.serverSequence != this.lastSeq + 1) {
                console.warn("[服务器消息丢失] id:" + data.command + ", sequence:" + data.sequence
                    + ", serverSequence:" + data.serverSequence
                    + ", errorCode:" + data.errorCode
                    + (data.errorCode != 0 ? ", errorMessage:" + data.errorMessage + " " : '')
                    + (data.sequence > 0 ? "(客户端调用返回)" : ""));
                this.connection.close(orange.ConnectionCloseReason.SERVER_MESSAGE_LOST);
                return;
            }
            if (data.errorCode < 0) {
                this.quit = true;
                console.warn('[错误码小于 0]', data);
                this.connection.close(orange.ConnectionCloseReason.ERROR_CODE, data);
            }
            data.serverSequence && (this.lastSeq = data.serverSequence);
            delete this.records[data.sequence];
            if (orange.debug) {
                console.log("[服务器消息] id:" + data.command + ", sequence:" + data.sequence
                    + ", errorCode:" + data.errorCode
                    + (data.errorCode != 0 ? ", errorMessage:" + data.errorMessage + " " : '')
                    + (data.sequence > 0 ? "(客户端调用返回)" : ""));
                data.body && console.log(data.body);
            }
            if (this.syncCommands) {
                syncData.UpdateEvent.$proxy = this;
                if (this.syncAll || this.syncCommands.indexOf(data.command) != -1) {
                    for (var k in data.body) {
                        if (this.root[k]) {
                            var objKeyName = this.root[k]._key_;
                            if (objKeyName && data.body[k].hasOwnProperty(objKeyName) && data.body[k][objKeyName] != this.root[k][objKeyName]) {
                                var e = new syncData.UpdateEvent(syncData.UpdateEvent.RESET_DATA);
                                e.data = this.root[k];
                                e.name = e.path = k;
                                e.proxy = syncData.UpdateEvent.$proxy;
                                syncData.UpdateEvent.emitter.emit(e);
                                this.root[k].reset();
                            }
                            this.root[k].setValue(data.body[k]);
                        }
                    }
                }
                syncData.UpdateEvent.$proxy = null;
            }
            this.resolveAsyncMessage(data.sequence, { command: data.command, errorCode: data.errorCode, errorMessage: data.errorMessage, body: data.body });
            this.receiveMessage(data.command, data);
        };
        Proxy.prototype.send = function (data) {
            var sendBack = _super.prototype.send.call(this, data);
            if (orange.debug) {
                console.log("[发送] ", data, "sequence:" + sendBack.sequence);
            }
            this.records[sendBack.sequence] = data;
            return sendBack;
        };
        Proxy.prototype.request = function (data, back) {
            var _this = this;
            return _super.prototype.request.call(this, data, back, function (sendBack) {
                if (orange.debug) {
                    console.log("[发送] ", data, "sequence:" + sendBack.sequence);
                }
                _this.records[sendBack.sequence] = data;
            });
        };
        Proxy.self = true;
        __decorate([
            orange.modify
        ], Proxy.prototype, "receive", null);
        return Proxy;
    }(orange.NetProxy));
    syncData.Proxy = Proxy;
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    var UpdateEvent = /** @class */ (function (_super) {
        __extends(UpdateEvent, _super);
        function UpdateEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(UpdateEvent, "emitter", {
            get: function () {
                if (!UpdateEvent.ist)
                    UpdateEvent.ist = new orange.EventEmitter();
                return UpdateEvent.ist;
            },
            enumerable: true,
            configurable: true
        });
        UpdateEvent.RESET_DATA = 'reset_data';
        return UpdateEvent;
    }(orange.Event));
    syncData.UpdateEvent = UpdateEvent;
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    /**
     * 链接服务器
     * @param url 地址
     * @param params 参数，参考 orange.sync.ConnectParams
     * @returns {Promise<Proxy>}
     */
    function connect(url, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var socket = new orange.WebSocketClient();
                        socket.connect(url).then(function (connection) {
                            connection.protocol = new syncData.Protocol();
                            var proxy = connection.proxy = new syncData.Proxy();
                            if (params) {
                                params.connectTimeout != null && (connection.connectTimeout = params.connectTimeout);
                                params.hertTimeout != null && (connection.hertTimeout = params.hertTimeout);
                                params.hertTimeinterval != null && (connection.hertTimeinterval = params.hertTimeinterval);
                                params.closeHandler != null && orange.on(connection, orange.Event.CLOSE, function (e) {
                                    params.closeHandler(e.data);
                                });
                                params.compressed != null && (connection.protocol.compressed = params.compressed);
                                params.debug != null && (proxy.debug = params.debug);
                                params.commandTimeout != null && (proxy.commandTimeout = params.commandTimeout);
                                params.reconnectInterval != null && (proxy.reconnectInterval = params.reconnectInterval);
                                params.root != null && (proxy.root = params.root);
                                params.syncAllCommand != null && (proxy.syncAllCommand = params.syncAllCommand);
                            }
                            resolve();
                        }).catch(function (e) { return reject(e); });
                    })];
            });
        });
    }
    syncData.connect = connect;
})(syncData || (syncData = {}));
//# sourceMappingURL=sync-data.js.map