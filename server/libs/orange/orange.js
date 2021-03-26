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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var orange;
(function (orange) {
    /**
     * 调试参数
     */
    orange.debug = true;
    var starts = [];
    function addStartBack(call) {
        starts.push(call);
    }
    orange.addStartBack = addStartBack;
    function startup(params) {
        if (params === void 0) { params = null; }
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, starts_1, starts_1_1, call, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!orange.debug) {
                            try {
                                window['_getGlobalState']().disableErrorBoundaries = true;
                            }
                            catch (e) {
                            }
                        }
                        params = params || {};
                        if (params.debug != null)
                            orange.debug = params.debug;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        starts_1 = __values(starts), starts_1_1 = starts_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!starts_1_1.done) return [3 /*break*/, 5];
                        call = starts_1_1.value;
                        return [4 /*yield*/, call(params)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        starts_1_1 = starts_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (starts_1_1 && !starts_1_1.done && (_a = starts_1.return)) _a.call(starts_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    orange.startup = startup;
})(orange || (orange = {}));
try {
    window["orange"] = orange;
}
catch (e) {
    try {
        global["orange"] = orange;
    }
    catch (e) {
    }
}
// console.log('[orange version] 0.9.0')
var orange;
(function (orange) {
    var instances = {};
    var classes = {};
    orange.autoloadInstance = instances;
    var $getAutoloadClassName = null;
    /**
     * @internal
     */
    function getAutoloadClassName(back) {
        $getAutoloadClassName = back;
    }
    orange.getAutoloadClassName = getAutoloadClassName;
    /**
     * 自动装载，在文件改变时可以将此类以弹幕的方式发送到运行环境
     * @param name
     * @param clearFunction
     * @param params
     */
    function autoload(name, clearFunction, params) {
        if (clearFunction === void 0) { clearFunction = "close"; }
        return function (c) {
            if (!orange.debug)
                return c;
            if (name == null) {
                if (c.prototype["$className"]) {
                    name = "game." + c.prototype["$className"];
                }
                else {
                    name = "game." + c.name;
                }
            }
            if ($getAutoloadClassName)
                $getAutoloadClassName(name);
            $getAutoloadClassName = null;
            var hasInstance = false;
            var oldParams = {};
            var args;
            if (instances[name]) {
                try {
                    params && params.setParams && params.setParams.forEach(function (atr) { return oldParams[atr] = instances[name].instance[atr]; });
                    if (params && params.clear) {
                        params.clear(item);
                    }
                    else {
                        var item = instances[name];
                        args = item.args;
                        item.instance[clearFunction]();
                        hasInstance = true;
                    }
                }
                catch (e) {
                    hasInstance = true;
                    console.error(e);
                }
            }
            var AutoLoadClass = /** @class */ (function (_super) {
                __extends(AutoLoadClass, _super);
                function AutoLoadClass() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var _this = this;
                    try {
                        _this = _super.apply(this, __spread(args)) || this;
                    }
                    catch (e) {
                        console.error(e);
                    }
                    instances[name] = {
                        instance: _this,
                        args: args
                    };
                    var clear = _this[clearFunction];
                    if (clear)
                        _this[clearFunction] = function () {
                            if (instances[name] && instances[name].instance == this)
                                instances[name] = null;
                            clear.apply(this, arguments);
                        };
                    if (params && params.init)
                        params.init(_this);
                    return _this;
                }
                return AutoLoadClass;
            }(c));
            classes[name] = {
                clazz: AutoLoadClass,
                clearFunction: clearFunction
            };
            var arr = name.split('.');
            var obj = function () { };
            try {
                obj = window;
                for (var i = 0; i < arr.length; i++) {
                    if (i == arr.length - 1) {
                        obj[arr[i]] = AutoLoadClass;
                    }
                    else {
                        obj = obj[arr[i]] || {};
                    }
                }
            }
            catch (e) {
            }
            if (hasInstance) {
                setTimeout(function () {
                    var newItem = new (AutoLoadClass.bind.apply(AutoLoadClass, __spread([void 0], args)))();
                    params && params.setParams && params.setParams.forEach(function (atr) { return newItem[atr] = oldParams[atr]; });
                });
            }
            return AutoLoadClass;
        };
    }
    orange.autoload = autoload;
    function loadlink(name) {
        setTimeout(function () {
            var _a;
            if (instances[name]) {
                var args;
                try {
                    var item = instances[name];
                    args = item.args;
                    item.instance[classes[name].clearFunction]();
                }
                catch (e) {
                    console.error(e);
                }
                try {
                    new ((_a = classes[name].clazz).bind.apply(_a, __spread([void 0], args)))();
                }
                catch (e) {
                    console.error(e);
                }
            }
        });
    }
    orange.loadlink = loadlink;
    /**
     * 链接自动装载，在此文件改变时可以重新装载新的文件，并重新运行标记为 name 的类（如果已经在运行的话）
     * @param name
     */
    orange.autoloadLink = function (name) {
        loadlink(name);
    };
})(orange || (orange = {}));
/**
 * @internal
 */
var run = (function () {
    try {
        return autorun;
    }
    catch (e) {
        return null;
    }
})();
/**
 * @internal
 */
var ract = (function () {
    try {
        return reaction;
    }
    catch (e) {
        return null;
    }
})();
var orange;
(function (orange) {
    /**
     * @internal
     */
    orange.uuid = 1;
    /**
     * 优化计算值的装饰器
     */
    orange.calculate = (function (target, key, baseDescriptor) {
        return computed(target, key, baseDescriptor);
    });
    orange.calculate.emit = function (target, key, baseDescriptor) {
        orange.APIUtil.deprecatedTip('orange.calculate.emit', 1543464755206);
        var value = orange.createHideProperty(target);
        if (!value.autorunEvent) {
            value.autorunEvent = [];
        }
        value.autorunEvent.indexOf(key) == -1 && value.autorunEvent.push(key);
        return computed(target, key, baseDescriptor);
    };
    orange.watch = (function (t, o, p) {
        return observable(t, o, p);
    });
    orange.watch.emit = (function (t, o, p) {
        orange.APIUtil.deprecatedTip('orange.watch.emit', 1543464755206);
        var value = orange.createHideProperty(t);
        if (!value.autorunEvent) {
            value.autorunEvent = [];
        }
        value.autorunEvent.indexOf(o) == -1 && value.autorunEvent.push(o);
        return observable(t, o, p);
    });
    /**
     * 在函数中对观测属性进行更改
     * @param t
     * @param o
     * @param p
     */
    orange.modify = function (t, o, p) {
        return action["bound"].call(null, t, o, p);
    };
    var stopRunSymbol = Symbol('orange stop autorun function');
    var startRunSymbol = Symbol('orange start autorun function');
    var stopSymbol = Symbol('orange stop');
    var autorunSymbol = Symbol('orange autorun');
    /**
     *
     * @deprecated orange.autorunClass 已迁移至 orange.observer
     * @param c
     */
    orange.autorunClass = function (c) {
        orange.APIUtil.deprecatedTip('orange.autorunClass', 1543464755206, '已迁移至 orange.observer');
        return orange.observer(c);
    };
    /**
     * 自动运行装饰器，使得一些主动的属性装饰器生效
     * @param c 需要装饰的类
     */
    orange.observer = function (c) {
        var value = orange.getHideProperty(c.prototype);
        if (!c.prototype.$className)
            c.prototype.$className = c.name;
        if (value && value.data)
            return c;
        if (!value)
            return;
        value.data = true;
        return /** @class */ (function (_super) {
            __extends(OrangeObserver, _super);
            function OrangeObserver() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this_1 = _super.apply(this, __spread(args)) || this;
                _this_1.startRunSymbol = [];
                _this_1.stopRunSymbol = [];
                _this_1.stopSymbol = false;
                if (!_this_1.uuid)
                    _this_1.uuid = orange.uuid++;
                value.constructorCalls && value.constructorCalls.map(function (func) {
                    var f = function () {
                        func.call(_this_1);
                    };
                    _this_1.startRunSymbol.push(f);
                    _this_1.stopRunSymbol.push(autorun(f));
                });
                var _this = _this_1;
                if (value.autorun) {
                    value.autorun.map(function (item) {
                        var f = function () {
                            _this_1[item[0]] = _this_1[item[1]];
                            if (item[2]) {
                                if (_this[orange.$eventSymbol] && _this[orange.$eventSymbol][item[0]]) {
                                    orange.emitWith(_this_1, item[0], _this_1[item[1]]);
                                }
                            }
                        };
                        _this_1.startRunSymbol.push(f);
                        _this_1.stopRunSymbol.push(autorun(f));
                    });
                }
                if (value.autorunEvent) {
                    var firsts_1 = {};
                    value.autorunEvent.map(function (key) {
                        var record = undefined;
                        var f = function () {
                            _this_1[key];
                            if (_this_1[key] != null && (typeof _this_1[key] == 'number' || typeof _this_1[key] == 'string')) {
                                if (record === undefined) {
                                    record = _this_1[key];
                                }
                                else {
                                    if (record === _this_1[key]) {
                                        return;
                                    }
                                    else {
                                        record = _this_1[key];
                                    }
                                }
                            }
                            if (firsts_1[key]) {
                                var _this_2 = _this_1;
                                if (_this_2[orange.$eventSymbol] && _this_2[orange.$eventSymbol][key]) {
                                    orange.emitWith(_this_1, key, _this_1[key]);
                                }
                            }
                            else
                                firsts_1[key] = true;
                        };
                        _this_1.startRunSymbol.push(f);
                        _this_1.stopRunSymbol.push(autorun(f));
                    });
                }
                if (value[autorunSymbol]) {
                    var set_1 = value[autorunSymbol];
                    set_1.forEach(function (call) { return call(_this_1); });
                }
                return _this_1;
            }
            return OrangeObserver;
        }(c));
    };
    /**
     * 停止对象的自动处理事物，否则对象无法释放
     * @param obj
     */
    function stop(obj) {
        var e_2, _a;
        if (obj.stopRunSymbol && !obj.stopSymbol) {
            try {
                for (var _b = __values(obj.stopRunSymbol), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var func = _c.value;
                    func();
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            obj.stopRunSymbol.length = 0;
            obj.stopSymbol = true;
        }
    }
    orange.stop = stop;
    /**
    * 启动对象的自动处理事物
    * @param obj
    */
    function start(obj) {
        var e_3, _a;
        if (obj.startRunSymbol && obj.stopSymbol) {
            try {
                for (var _b = __values(obj.startRunSymbol), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var func = _c.value;
                    obj.stopRunSymbol.push(autorun(func));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            obj.stopSymbol = false;
        }
    }
    orange.start = start;
    var renderSymbol = Symbol('orange render list');
    /**
     * @internal
     * @param target
     * @param classMethodName
     */
    function addInsideAutorunToClass(target, classMethodName, autoStop) {
        if (autoStop === void 0) { autoStop = false; }
        var value = orange.createHideProperty(target);
        value[autorunSymbol] || (value[autorunSymbol] = new Set());
        value[autorunSymbol].add(function (thisObj) {
            if (autoStop && thisObj instanceof egret.DisplayObject) {
                var f_1 = function () {
                    thisObj[classMethodName].call(thisObj);
                };
                var cancelAutorun_1 = null;
                if (!thisObj[renderSymbol])
                    thisObj[renderSymbol] = {};
                if (!thisObj[renderSymbol][classMethodName]) {
                    thisObj[renderSymbol][classMethodName] = true;
                    thisObj.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                        if (!cancelAutorun_1)
                            cancelAutorun_1 = autorun(f_1);
                    }, thisObj);
                    thisObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                        if (cancelAutorun_1)
                            cancelAutorun_1();
                        cancelAutorun_1 = null;
                    }, thisObj);
                }
            }
            else {
                var f = thisObj[classMethodName].bind(thisObj);
                thisObj.startRunSymbol.push(f);
                thisObj.stopRunSymbol.push(autorun(f));
            }
        });
    }
    orange.addInsideAutorunToClass = addInsideAutorunToClass;
    /**
     * 添加响应函数，可以自行决定函数何时启动响应和停止响应
     * @param classDefine 类定义
     * @param classMethodName  函数名
     * @param init 在类的构造函数中会自动调用此函数，init 的三个参数: thisObj 表示对象，startRun 启动函数响应，startRun 停止函数响应
     */
    function autorunExtend(classDefine, classMethodName, init) {
        var value = orange.createHideProperty(classDefine);
        value[autorunSymbol] || (value[autorunSymbol] = new Set());
        value[autorunSymbol].add(function (thisObj) {
            if (!thisObj[renderSymbol])
                thisObj[renderSymbol] = {};
            if (!thisObj[renderSymbol]['$component_' + classMethodName]) {
                thisObj[renderSymbol]['$component_' + classMethodName] = true;
                var f_2 = thisObj[classMethodName].bind(thisObj);
                var cancelAutorun_2 = null;
                var startRun = function () {
                    if (!cancelAutorun_2)
                        cancelAutorun_2 = autorun(f_2);
                };
                var stopRun = function () {
                    if (cancelAutorun_2)
                        cancelAutorun_2();
                    cancelAutorun_2 = null;
                };
                init(thisObj, startRun, stopRun);
            }
        });
    }
    orange.autorunExtend = autorunExtend;
    /**
     * 使用 @orange.observer 装饰的类对象在构造函数中会调用 call
     * @param classDefine 类定义
     * @param call 需要调用的方法
     */
    function constructorCall(classDefine, call) {
        var value = orange.createHideProperty(classDefine);
        value[autorunSymbol] || (value[autorunSymbol] = new Set());
        value[autorunSymbol].add(call);
    }
    orange.constructorCall = constructorCall;
    /**
     * @internal
     */
    var observerSymbol = Symbol('observer');
    // export function setObserver(target: any, observer: any) {
    //   target[observerSymbol] = observer;
    // }
    /**
     *
     * @param target
     * @param key
     * @param baseDescriptor
     */
    function render(target, key, baseDescriptor) {
        orange.APIUtil.deprecatedTip('@orange.render', 1543464755206, '请使用 @orange.egret.render 替代');
        addInsideAutorunToClass(target, key, true);
        return baseDescriptor;
    }
    orange.render = render;
    function autorun(target, key, baseDescriptor) {
        if (!key) {
            if (orange.debug) {
                orange.Debug.autorunCount++;
                orange.Debug.autorunSum++;
                var cancel_1 = run(target);
                return function () {
                    orange.Debug.autorunCount--;
                    cancel_1();
                    cancel_1 = null;
                };
            }
            else {
                return run(target);
            }
        }
        addInsideAutorunToClass(target, key);
        return baseDescriptor;
    }
    orange.autorun = autorun;
    /**
     * 响应函数，会返回一个清除函数，用以清除响应，如果是在 expression 中清除是不会触发 effect 的
     * @param expression 表达式，响应函数只会观察表达式中访问过的值，表达式函数需要返回一个参数，作为 effect 函数的第一个参数
     * @param effect 效果函数，此响应函数不会对 effect 中访问过的可观测值作出响应
     * @param compare 比较函数，用于比较改变时 expression 返回的值，只有返回 false 才执行 effect，默认的情况是只有 expression 的返回值变了才会触发 effect
     */
    function reaction(expression, effect, compare) {
        var opt = {
            fireImmediately: true
        };
        if (compare)
            opt.equals = compare;
        return ract(function (r) {
            return expression();
        }, function (arg, r) {
            effect(arg);
        }, opt);
    }
    orange.reaction = reaction;
})(orange || (orange = {}));
/**
 * @internal
 */
var orange;
(function (orange) {
    var bindingID = 1;
    var bindings = {};
    orange.bindProperty = function (owner, property, data, dataProperty) {
        bindingID++;
        bindings[bindingID] = {
            'owner': owner,
            'property': property,
            'data': data,
            'dataProperty': dataProperty
        };
        orange.on(data, dataProperty, setProperty, bindings[bindingID]);
        setProperty.call(bindings[bindingID]);
        return function () {
            orange.removeListener(data, dataProperty, setProperty, bindings[bindingID]);
        };
    };
    function setProperty() {
        this.owner[this.property] = this.data[this.dataProperty];
    }
})(orange || (orange = {}));
var orange;
(function (orange) {
    var Command = /** @class */ (function () {
        function Command() {
            /**
             * @internal
             */
            this.descs = [];
            /**
             * @internal
             */
            this.calls = new Set();
        }
        Command.prototype.execute = function (args) {
            this.calls.forEach(function (call) { return call.apply(null, args); });
        };
        Command.register = function (name, call, desc) {
            if (desc === void 0) { desc = ''; }
            var cmd = Command.cmds.get(name);
            if (!cmd) {
                cmd = new Command();
                cmd.name = name;
                cmd.descs.push(desc);
                Command.cmds.set(name, cmd);
            }
            cmd.calls.add(call);
        };
        Command.execute = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var cmd = Command.cmds.get(name);
            if (!cmd) {
                console.warn('[orange command] 没有找到对应的命令：' + name);
                return;
            }
            cmd.execute(args);
        };
        Command.list = function () {
            console.log('[orange command] list：');
            var list = [['name', 'desc']];
            Command.cmds.forEach(function (cmd) { return list.push([cmd.name, cmd.descs]); });
            console.log(orange.StringUtil.tableToString(list));
        };
        Command.cmds = new Map();
        return Command;
    }());
    orange.Command = Command;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var hash = 1;
    var HashObject = /** @class */ (function () {
        function HashObject() {
            this._hash = hash++;
        }
        Object.defineProperty(HashObject.prototype, "hash", {
            get: function () {
                return this._hash;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HashObject, "hash", {
            get: function () {
                return hash;
            },
            enumerable: true,
            configurable: true
        });
        return HashObject;
    }());
    orange.HashObject = HashObject;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var orangeSymbol = Symbol("orange");
    var classId = 1;
    function createHideProperty(prototype) {
        if (!prototype[orangeSymbol]) {
            Object.defineProperty(prototype, orangeSymbol, {
                enumerable: false,
                writable: false,
                configurable: false,
                value: {
                    uuid: classId++
                }
            });
        }
        return prototype[orangeSymbol];
    }
    orange.createHideProperty = createHideProperty;
    function getHideProperty(prototype) {
        return prototype[orangeSymbol];
    }
    orange.getHideProperty = getHideProperty;
})(orange || (orange = {}));
(function (orange) {
    function addAutorun(prototype, call) {
        var value = orange.createHideProperty(prototype);
        value.constructorCalls || (value.constructorCalls = []);
        value.constructorCalls.push(call);
    }
    orange.addAutorun = addAutorun;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var Debug = /** @class */ (function () {
        function Debug() {
        }
        /**
         * 已运行过的 autorun 函数总和
         */
        Debug.autorunSum = 0;
        /**
         * 当前正在运行的 autorun 函数
         */
        Debug.autorunCount = 0;
        return Debug;
    }());
    orange.Debug = Debug;
})(orange || (orange = {}));
(function (orange) {
    /**
     * 检测对象或类（这个类所有的对象）某个属性 何时变成 特定值
     * @param host 对象或者类定义
     * @param property 属性名称
     * @param val 属性值
     */
    function whenEquals(host, property, val) {
        var isClass = false;
        var d = getPropertyOf(host, property);
        var newHost = host;
        if (d == null) {
            try {
                newHost = new host();
                d = getPropertyOf(newHost, property);
                isClass = true;
            }
            catch (e) {
                newHost = host;
                d = null;
            }
        }
        if (d && d.set && d.get) {
            var orgSet_1 = d.set;
            d.set = function (value) {
                if (isClass || this == host) {
                    if (value == val) {
                        if (isClass)
                            console.warn("[检测到属性改变] ", val, property, host);
                        else
                            console.warn("[检测到属性改变] ", host[property], val, property, host);
                        console.warn("[在这一行打断点就可以 debug 了] ");
                    }
                }
                orgSet_1.call(this, value);
            };
            Object.defineProperty(Object.getPrototypeOf(newHost), property, {
                set: d.set,
                get: d.get,
                enumerable: true,
                configurable: true
            });
            console.warn("whenEquals: 点击打断点查看 ⬆");
        }
        else {
            console.warn("whenEquals 调用失败，没有查到对应的属性：" + property);
        }
    }
    orange.whenEquals = whenEquals;
    function getPropertyOf(host, property) {
        var prototype = Object.getPrototypeOf(host);
        ;
        while (prototype) {
            var d = Object.getOwnPropertyDescriptor(prototype, property);
            if (d)
                return d;
            prototype = prototype.__proto__;
        }
        return null;
    }
    orange.getPropertyOf = getPropertyOf;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var EventEmitter = /** @class */ (function (_super) {
        __extends(EventEmitter, _super);
        function EventEmitter(target) {
            var _this = _super.call(this) || this;
            _this._target = target || _this;
            return _this;
        }
        Object.defineProperty(EventEmitter.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        EventEmitter.prototype.on = function (event, back, owner) {
            orange.on(this.target, event, back, owner || this);
        };
        EventEmitter.prototype.once = function (event, back, owner) {
            orange.once(this.target, event, back, owner || this);
        };
        EventEmitter.prototype.emit = function (event) {
            orange.emit(this.target, event);
        };
        EventEmitter.prototype.emitWith = function (type, data) {
            orange.emitWith(this.target, type, data);
        };
        EventEmitter.prototype.hasListener = function (event) {
            return orange.hasListener(this.target, event);
        };
        EventEmitter.prototype.removeListener = function (event, back, owner) {
            orange.removeListener(this.target, event, back, owner || this);
        };
        EventEmitter.prototype.removeAllListeners = function () {
            orange.removeAllListeners(this.target);
        };
        return EventEmitter;
    }(orange.HashObject));
    orange.EventEmitter = EventEmitter;
})(orange || (orange = {}));
var orange;
(function (orange) {
    /**
     * @internal
     */
    orange.$eventSymbol = Symbol("orange event");
    /**
     * 监听事件
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    function on(target, type, back, owner) {
        var e_4, _a;
        target[orange.$eventSymbol] || (target[orange.$eventSymbol] = {});
        target[orange.$eventSymbol][type] || (target[orange.$eventSymbol][type] = []);
        var list = target[orange.$eventSymbol][type];
        try {
            for (var list_1 = __values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                var item = list_1_1.value;
                if (item.back === back && item.owner == owner && item.hasDelete === false) {
                    return;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (list_1_1 && !list_1_1.done && (_a = list_1.return)) _a.call(list_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        target[orange.$eventSymbol][type].push({
            'back': back,
            'owner': owner,
            'hasDelete': false
        });
    }
    orange.on = on;
    /**
     * @internal
     * 监听事件
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    function $onAt(target, type, back, owner, index) {
        if (index === void 0) { index = -1; }
        var e_5, _a;
        target[orange.$eventSymbol] || (target[orange.$eventSymbol] = {});
        target[orange.$eventSymbol][type] || (target[orange.$eventSymbol][type] = []);
        var list = target[orange.$eventSymbol][type];
        try {
            for (var list_2 = __values(list), list_2_1 = list_2.next(); !list_2_1.done; list_2_1 = list_2.next()) {
                var item = list_2_1.value;
                if (item.back == back && item.owner == owner) {
                    return;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (list_2_1 && !list_2_1.done && (_a = list_2.return)) _a.call(list_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        index < 0 ? target[orange.$eventSymbol][type].push({
            'back': back,
            'owner': owner,
            'hasDelete': false
        }) : target[orange.$eventSymbol][type].splice(index, 0, {
            'back': back,
            'owner': owner,
            'hasDelete': false
        });
    }
    orange.$onAt = $onAt;
    /**
     * 监听事件，回调函数调用一次后自动取消监听
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    function once(target, type, back, owner) {
        var e_6, _a;
        target[orange.$eventSymbol] || (target[orange.$eventSymbol] = {});
        target[orange.$eventSymbol][type] || (target[orange.$eventSymbol][type] = []);
        var list = target[orange.$eventSymbol][type];
        try {
            for (var list_3 = __values(list), list_3_1 = list_3.next(); !list_3_1.done; list_3_1 = list_3.next()) {
                var item = list_3_1.value;
                if (item.back == back && item.owner == owner && item.hasDelete === false) {
                    return;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (list_3_1 && !list_3_1.done && (_a = list_3.return)) _a.call(list_3);
            }
            finally { if (e_6) throw e_6.error; }
        }
        target[orange.$eventSymbol][type].push({
            'back': back,
            'owner': owner,
            'hasDelete': false,
            'once': true
        });
    }
    orange.once = once;
    /**
     * 抛出事件
     * @param target 抛事件的对象
     * @param event 事件
     */
    function emit(target, event) {
        var e_7, _a;
        event.$target = target;
        target[orange.$eventSymbol] || (target[orange.$eventSymbol] = {});
        if (target[orange.$eventSymbol][event.type]) {
            var list = target[orange.$eventSymbol][event.type];
            var hasDelete = false;
            try {
                for (var list_4 = __values(list), list_4_1 = list_4.next(); !list_4_1.done; list_4_1 = list_4.next()) {
                    var item = list_4_1.value;
                    if (item.once === true) {
                        if (item.hasDelete === false) {
                            item.hasDelete = true;
                            item.back.call(item.owner, event);
                        }
                        hasDelete = true;
                    }
                    else {
                        if (!item.hasDelete)
                            item.back.call(item.owner, event);
                        else
                            hasDelete = true;
                    }
                    if (event.isStop)
                        break;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (list_4_1 && !list_4_1.done && (_a = list_4.return)) _a.call(list_4);
                }
                finally { if (e_7) throw e_7.error; }
            }
            if (hasDelete) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].hasDelete) {
                        list.splice(i, 1);
                        i--;
                    }
                }
                if (!list.length) {
                    delete target[orange.$eventSymbol][event.type];
                }
            }
        }
    }
    orange.emit = emit;
    /**
     * 抛出事件，会自动创建一个 orange.Event
     * @param target 抛事件的对象
     * @param type 事件类型
     * @param data 事件携带的数据
     */
    function emitWith(target, type, data) {
        var e = Event.create(type, data);
        emit(target, e);
        Event.release(e);
    }
    orange.emitWith = emitWith;
    /**
     * 移除某个事件监听
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    function removeListener(target, type, back, owner) {
        var e_8, _a;
        if (target[orange.$eventSymbol] && target[orange.$eventSymbol][type]) {
            var list = target[orange.$eventSymbol][type];
            try {
                for (var list_5 = __values(list), list_5_1 = list_5.next(); !list_5_1.done; list_5_1 = list_5.next()) {
                    var item = list_5_1.value;
                    if (item.back == back && item.owner == owner && item.hasDelete === false) {
                        item.hasDelete = true;
                        break;
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (list_5_1 && !list_5_1.done && (_a = list_5.return)) _a.call(list_5);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
    }
    orange.removeListener = removeListener;
    /**
     * 是否有对象监听某个事件
     * @param target 抛出事件的对象
     * @param type 事件类型
     */
    function hasListener(target, type) {
        if (target[orange.$eventSymbol] && target[orange.$eventSymbol][type]) {
            return target[orange.$eventSymbol][type].length;
        }
        return false;
    }
    orange.hasListener = hasListener;
    /**
     * 移除所有的事件监听
     * @param target
     */
    function removeAllListeners(target) {
        target[orange.$eventSymbol] = {};
    }
    orange.removeAllListeners = removeAllListeners;
    var Event = /** @class */ (function () {
        function Event(type) {
            /**
             * @internal
             */
            this.$cycle = false;
            /**
             * @internal
             */
            this.$target = null;
            /**
             * @internal
             */
            this.$isStop = false;
            this.$type = type;
        }
        Object.defineProperty(Event.prototype, "type", {
            get: function () {
                return this.$type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "target", {
            get: function () {
                return this.$target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "isStop", {
            /**
             * 事件是否停止，停止后后面的对象无法监听到事件
             */
            get: function () {
                return this.$isStop;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 停止事件，停止后后面的对象无法监听到事件
         */
        Event.prototype.stop = function () {
            this.$isStop = true;
        };
        Event.prototype.clone = function () {
            return orange.Event.create(this.type, this.data);
        };
        Event.create = function (type, data, clazz) {
            if (data === void 0) { data = null; }
            if (clazz === void 0) { clazz = Event; }
            var e;
            if (!Event._eventPool.get(clazz) || !Event._eventPool.get(clazz).length) {
                e = new clazz(type);
            }
            else {
                e = Event._eventPool.get(clazz).pop();
                e.$cycle = false;
            }
            e.$isStop = false;
            e.$type = type;
            e.data = data;
            return e;
        };
        Event.release = function (e) {
            if (e.$cycle) {
                return;
            }
            e.$cycle = true;
            e.data = null;
            e.$target = null;
            if (!Event._eventPool.get(e.__proto__.constructor)) {
                Event._eventPool.set(e.__proto__.constructor, []);
            }
            Event._eventPool.get(e.__proto__.constructor).push(e);
        };
        Event.SEND = "send";
        Event.DATA = "data";
        Event.COMPLETE = "complete";
        Event.CONNECT = "connect";
        Event.CONNECT_ERROR = "connect_error";
        Event.RECONNECT = 'reconnect';
        Event.CLOSE = "close";
        Event.CHANGE = "change";
        Event.ERROR = "error";
        /**
         * @internal
         */
        Event._eventPool = new Map();
        return Event;
    }());
    orange.Event = Event;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var CSV = /** @class */ (function () {
        function CSV() {
        }
        CSV.prototype.toString = function (arraySplit) {
            if (arraySplit === void 0) { arraySplit = ','; }
            var list = this.data;
            var str = '';
            for (var l = 0; l < list.length; l++) {
                var row = list[l];
                for (var r = 0; r < row.length; r++) {
                    var item = row[r];
                    if (item != null) {
                        switch (typeof item) {
                            case 'string':
                                item.indexOf('"') != -1 && (item = '"' + item + '"');
                                str += item;
                                break;
                            case 'number':
                                str += item;
                                break;
                            default:
                                if (item instanceof Array) {
                                    str += '"[';
                                    for (var i = 0; i < item.length; i++) {
                                        str += item[i] + (i == item.length - 1 ? '' : arraySplit);
                                    }
                                    str += ']"';
                                }
                                else {
                                    str += item.toString();
                                }
                        }
                    }
                    str += (r == row.length - 1 ? '' : ',');
                }
                str += (l == list.length - 1 ? '' : '\n');
            }
            return str;
        };
        CSV.parse = function (content) {
            var e_9, _a;
            var list = [];
            content = orange.StringUtil.replace(content, '\r', '\n');
            content = orange.StringUtil.replace(content, '\n\n', '\n');
            var arr = content.split('\n');
            try {
                for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                    var str = arr_1_1.value;
                    var row = [];
                    var findBegin = false;
                    var begin = 0;
                    var specialBegin = false;
                    for (var i = 0; i < str.length; i++) {
                        if (!findBegin) {
                            begin = i;
                            if (str.charAt(i) == '"') {
                                specialBegin = true;
                                begin++;
                            }
                            findBegin = true;
                        }
                        if (!specialBegin) {
                            if (str.charAt(i) == ',' || i == str.length - 1) {
                                var item = str.slice(begin, i + (str.charAt(i) == ',' ? 0 : 1));
                                item = orange.StringUtil.replace(item, '""', '"', true);
                                row.push(item);
                                specialBegin = false;
                                findBegin = false;
                            }
                        }
                        else {
                            if (str.charAt(i) == '"') {
                                if (str.charAt(i + 1) == '"') {
                                    i++;
                                }
                                else if (str.charAt(i + 1) == ',' || i == str.length - 1) {
                                    var item = str.slice(begin, i);
                                    item = orange.StringUtil.replace(item, '""', '"', true);
                                    row.push(item);
                                    specialBegin = false;
                                    findBegin = false;
                                    i++;
                                }
                            }
                        }
                    }
                    list.push(row);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                }
                finally { if (e_9) throw e_9.error; }
            }
            var csv = new CSV();
            csv.data = list;
            return csv;
        };
        return CSV;
    }());
    orange.CSV = CSV;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var XMLAttribute = /** @class */ (function () {
        function XMLAttribute() {
        }
        return XMLAttribute;
    }());
    orange.XMLAttribute = XMLAttribute;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var XMLNamespace = /** @class */ (function () {
        function XMLNamespace() {
        }
        return XMLNamespace;
    }());
    orange.XMLNamespace = XMLNamespace;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var XML = /** @class */ (function () {
        function XML() {
            this.value = "";
            this.attributes = [];
            this.namespaces = [];
            this.elements = [];
        }
        /**
         * 过滤 xml ，返回符合条件的 xml 数组
         * 某个 xml 只要满足 filterName 或者 filterAttribute 中的任何一个即通过筛选
         * @param filterName 过滤 xml 名称
         * @param filterAttribute 过滤 xml 属性
         */
        XML.prototype.filter = function (filterName, filterAttribute) {
            var list = [];
            this.filterInChildren(list, filterName, filterAttribute);
            return list;
        };
        /**
         * 过滤 xml ，返回符合条件的第一个 xml
         * 某个 xml 只要满足 filterName 或者 filterAttribute 中的任何一个即通过筛选
         * @param filterName 过滤 xml 名称
         * @param filterAttribute 过滤 xml 属性
         */
        XML.prototype.filterOne = function (filterName, filterAttribute) {
            var list = [];
            this.filterInChildren(list, filterName, filterAttribute, true);
            return list.length ? list[0] : null;
        };
        /**
         * @internal
         * @param list
         * @param filterName
         * @param filterAttribute
         */
        XML.prototype.filterInChildren = function (list, filterName, filterAttribute, one) {
            if (one === void 0) { one = false; }
            var e_10, _a, e_11, _b;
            if (filterName && filterName(this.name)) {
                list.push(this);
            }
            else if (filterAttribute) {
                try {
                    for (var _c = __values(this.attributes), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var attribute = _d.value;
                        if (filterAttribute(attribute)) {
                            list.push(this);
                            if (one)
                                return;
                            break;
                        }
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
            try {
                for (var _e = __values(this.elements), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var element = _f.value;
                    element.filterInChildren(list, filterName, filterAttribute, one);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_11) throw e_11.error; }
            }
        };
        /**
         * @internal
         * @param content
         */
        XML.prototype.parse = function (content) {
            var delStart = -1;
            for (var i = 0; i < content.length; i++) {
                if (delStart == -1 && (content.slice(i, i + 2) == "<!" || content.slice(i, i + 2) == "<?")) {
                    delStart = i;
                }
                if (delStart != -1 && content.charAt(i) == ">") {
                    content = content.slice(0, delStart) + content.slice(i + 1, content.length);
                    i = i - (i - delStart + 1);
                    delStart = -1;
                }
            }
            this.readInfo(content);
        };
        /**
         * @internal
         * @param str
         */
        XML.prototype.__isStringEmpty = function (str) {
            for (var i = 0, len = str.length; i < len; i++) {
                var char = str.charAt(i);
                if (char != " " && char != "\t" && char != "\r" && char != "\n" && char != "　") {
                    return false;
                }
            }
            return true;
        };
        /**
         * @internal
         * @param content
         * @param startIndex
         */
        XML.prototype.readInfo = function (content, startIndex) {
            if (startIndex === void 0) { startIndex = 0; }
            var leftSign = -1;
            var len = content.length;
            var c;
            var j;
            for (var i = startIndex; i < len; i++) {
                c = content.charAt(i);
                if (c == "<") {
                    for (j = i + 1; j < len; j++) {
                        c = content.charAt(j);
                        if (c != " " && c != "\t") {
                            i = j;
                            break;
                        }
                    }
                    for (j = i + 1; j < len; j++) {
                        c = content.charAt(j);
                        if (c == " " || c == "\t" || c == "\r" || c == "\n" || c == "/" || c == ">") {
                            this.name = content.slice(i, j);
                            i = j;
                            break;
                        }
                    }
                    break;
                }
            }
            var end = false;
            var attribute;
            var nameSpace;
            for (; i < len; i++) {
                c = content.charAt(i);
                if (c == "/") {
                    end = true;
                }
                else if (c == ">") {
                    i++;
                    break;
                }
                else if (c == " " || c == "\t" || c == "\r" || c == "\n" || c == "　") {
                }
                else {
                    for (j = i + 1; j < len; j++) {
                        c = content.charAt(j);
                        if (c == "=" || c == " " || c == "\t") {
                            var atrName = content.slice(i, j);
                            if (atrName.split(":").length == 2) {
                                nameSpace = new orange.XMLNamespace();
                                this.namespaces.push(nameSpace);
                                nameSpace.name = atrName.split(":")[1];
                            }
                            else {
                                attribute = new orange.XMLAttribute();
                                this.attributes.push(attribute);
                                attribute.name = atrName;
                            }
                            break;
                        }
                    }
                    j++;
                    var startSign;
                    for (; j < len; j++) {
                        c = content.charAt(j);
                        if (c == "\"" || c == "'") {
                            i = j + 1;
                            startSign = c;
                            break;
                        }
                    }
                    j++;
                    for (; j < len; j++) {
                        c = content.charAt(j);
                        if (c == startSign && content.charAt(j - 1) != "\\") {
                            if (attribute) {
                                attribute.value = content.slice(i, j);
                                attribute = null;
                            }
                            else {
                                nameSpace.value = content.slice(i, j);
                                nameSpace = null;
                            }
                            i = j;
                            break;
                        }
                    }
                }
            }
            if (end == true)
                return i;
            var contentStart;
            for (; i < len; i++) {
                c = content.charAt(i);
                if (c != " " && c != "\t") {
                    contentStart = i;
                    i--;
                    break;
                }
            }
            for (; i < len; i++) {
                c = content.charAt(i);
                if (c == "<") {
                    for (j = i + 1; j < len; j++) {
                        c = content.charAt(j);
                        if (c != " " && c != "\t") {
                            break;
                        }
                    }
                    if (c == "/") {
                        for (j = i + 1; j < len; j++) {
                            c = content.charAt(j);
                            if (c == " " || c == "\t" || c == ">") {
                                var endName = content.slice(i + 2, j);
                                if (endName != this.name) {
                                    console.log('错误的 xml 格式', this.name, endName);
                                    // $error(1020, this.name, endName);
                                }
                                break;
                            }
                        }
                        if (this.elements.length == 0) {
                            i--;
                            for (; i >= 0; i--) {
                                c = content.charAt(i);
                                if (c != " " && c != "\t") {
                                    break;
                                }
                            }
                            this.value = content.slice(contentStart, i + 1);
                            if (this.value == "" || this.__isStringEmpty(this.value)) {
                                this.value = null;
                            }
                        }
                        for (; j < len; j++) {
                            c = content.charAt(j);
                            if (c == ">") {
                                i = j + 1;
                                break;
                            }
                        }
                        end = true;
                        break;
                    }
                    else { //视图找 <abcsklsklskl />a
                        var isNextElement = true;
                        for (var n = i + 1; n < len; n++) {
                            c = content.charAt(n);
                            if (c != " " && c != "\t") {
                                break;
                            }
                        }
                        for (; n < len; n++) {
                            c = content.charCodeAt(n);
                            if (c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58) {
                                continue;
                            }
                            else {
                                break;
                            }
                        }
                        for (; n < len; n++) {
                            c = content.charAt(n);
                            if (c != " " && c != "\t") {
                                break;
                            }
                        }
                        var c = content.charCodeAt(n);
                        if (c == 47 || c == 62 || c >= 97 && c <= 122 || c >= 65 && c <= 90) {
                        }
                        else {
                            isNextElement = false;
                        }
                        if (isNextElement) {
                            var element = new XML();
                            this.elements.push(element);
                            i = element.readInfo(content, i) - 1;
                        }
                    }
                }
            }
            return i;
        };
        XML.prototype.toString = function () {
            var str = "<" + this.name;
            this.attributes.forEach(function (attribute) {
                str += " " + attribute.name + "=" + attribute.value;
            });
            if (this.elements.length || this.value != "") {
                str += ">";
                if (this.value)
                    str += this.value;
                this.elements.forEach(function (xml) {
                    str += xml.toString();
                });
                str += "</" + this.name + ">";
            }
            else {
                str += '/>';
            }
            return str;
        };
        XML.parse = function (content) {
            var xml = new XML();
            xml.parse(content);
            return xml;
        };
        return XML;
    }());
    orange.XML = XML;
})(orange || (orange = {}));
var orange;
(function (orange) {
    function getError(reason) {
        if (reason === ConnectionCloseReason.CLOSE_SELF)
            return '主动断开';
        if (reason === ConnectionCloseReason.DISCONNECT)
            return '从服务器断开';
        if (reason === ConnectionCloseReason.CONNECT_TIMEOUT)
            return '连接服务器超时';
        if (reason === ConnectionCloseReason.RECONNECT_ERROR)
            return '与服务器的重连出错';
        if (reason === ConnectionCloseReason.ERROR_CODE)
            return '错误码';
        if (reason === ConnectionCloseReason.HERT_TIMEOUT)
            return '心跳包超时';
        if (reason === ConnectionCloseReason.SERVER_MESSAGE_LOST)
            return '服务器消息丢失';
        if (reason === ConnectionCloseReason.COMMAND_TIME_OUT)
            return '指令超时';
        return '未定义错误';
    }
    /**
     * 网络链接断开
     */
    var ConnectionCloseData = /** @class */ (function (_super) {
        __extends(ConnectionCloseData, _super);
        function ConnectionCloseData(reason, data) {
            var _this = _super.call(this, getError(reason)) || this;
            _this.reason = reason;
            _this.data = data;
            return _this;
        }
        Object.defineProperty(ConnectionCloseData.prototype, "message", {
            get: function () {
                return getError(this.reason);
            },
            enumerable: true,
            configurable: true
        });
        return ConnectionCloseData;
    }(Error));
    orange.ConnectionCloseData = ConnectionCloseData;
    var ConnectionCloseReason;
    (function (ConnectionCloseReason) {
        /**
         * 主动断开
         */
        ConnectionCloseReason[ConnectionCloseReason["CLOSE_SELF"] = 0] = "CLOSE_SELF";
        /**
         * 从服务器断开
         */
        ConnectionCloseReason[ConnectionCloseReason["DISCONNECT"] = 1] = "DISCONNECT";
        /**
         * 链接服务器超时
         */
        ConnectionCloseReason[ConnectionCloseReason["CONNECT_TIMEOUT"] = 2] = "CONNECT_TIMEOUT";
        /**
         * 与服务器的重链出错
         */
        ConnectionCloseReason[ConnectionCloseReason["RECONNECT_ERROR"] = 3] = "RECONNECT_ERROR";
        /**
         * 错误码小于 0 断开
         */
        ConnectionCloseReason[ConnectionCloseReason["ERROR_CODE"] = 4] = "ERROR_CODE";
        /**
         * 心跳包超时
         */
        ConnectionCloseReason[ConnectionCloseReason["HERT_TIMEOUT"] = 5] = "HERT_TIMEOUT";
        /**
         * 服务器消息丢失
         */
        ConnectionCloseReason[ConnectionCloseReason["SERVER_MESSAGE_LOST"] = 6] = "SERVER_MESSAGE_LOST";
        /**
         * 指令超时
         */
        ConnectionCloseReason[ConnectionCloseReason["COMMAND_TIME_OUT"] = 7] = "COMMAND_TIME_OUT";
    })(ConnectionCloseReason = orange.ConnectionCloseReason || (orange.ConnectionCloseReason = {}));
})(orange || (orange = {}));
var orange;
(function (orange) {
    var NetConnection = /** @class */ (function () {
        function NetConnection(connection) {
            /**
             * 链接服务器超时时间(单位秒)
             */
            this._connectTimeout = 10;
            /**
             * 心跳包时间(单位秒)
             */
            this._hertTimeinterval = 5;
            /**
             * 客户端验证心跳爆超时时间(单位秒)
             */
            this._hertTimeout = 10;
            /**
             * @internal
             */
            this._onCloseResolves = [];
            if (this._netProxy)
                this._netProxy.connection = this;
            this._connection = connection;
            this._connection.connectTimeout = this.connectTimeout;
            this._connection.hertTimeinterval = this.hertTimeinterval;
            this._connection.hertTimeout = this.hertTimeout;
            orange.on(this._connection, orange.Event.DATA, this._onData, this);
            orange.on(this._connection, orange.Event.CLOSE, this._onClose, this);
        }
        Object.defineProperty(NetConnection.prototype, "active", {
            /**
             * 是否激活，默认为激活状态
             */
            get: function () {
                return this._connection.active;
            },
            set: function (val) {
                this._connection.active = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetConnection.prototype, "connectTimeout", {
            get: function () {
                return this._connectTimeout;
            },
            set: function (val) {
                this._connectTimeout = val;
                this._connection.connectTimeout = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetConnection.prototype, "hertTimeinterval", {
            get: function () {
                return this._hertTimeinterval;
            },
            set: function (val) {
                this._hertTimeinterval = val;
                this._connection.hertTimeinterval = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetConnection.prototype, "hertTimeout", {
            get: function () {
                return this._hertTimeout;
            },
            set: function (val) {
                this._hertTimeout = val;
                this._connection.hertTimeout = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetConnection.prototype, "protocol", {
            get: function () {
                return this._protocol;
            },
            set: function (val) {
                this._protocol = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetConnection.prototype, "proxy", {
            get: function () {
                return this._netProxy;
            },
            set: function (val) {
                if (this._netProxy) {
                    this._netProxy.connection = null;
                    this._netProxy = null;
                }
                if (val) {
                    this._netProxy = val;
                    this._netProxy.connection = this;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetConnection.prototype, "connected", {
            get: function () {
                return this._connection ? this._connection.connected : false;
            },
            enumerable: true,
            configurable: true
        });
        // /**
        //  * @internal
        //  */
        // public async onClose(): Promise<void> {
        //     if (this._netProxy) this._netProxy.onClose();
        //     return new Promise<void>((resolve, reject) => {
        //         this._onCloseResolves.push({ resolve: resolve, flag: true });
        //     });
        // }
        /**
         * @internal
         */
        NetConnection.prototype._onClose = function (e) {
            var resolves = this._onCloseResolves;
            for (var i = 0; i < resolves.length; i++) {
                resolves[i].resolve();
                resolves[i].flag = false;
            }
            for (var i = 0; i < resolves.length; i++) {
                if (!resolves[i].flag) {
                    resolves.splice(i, 1);
                }
            }
            orange.emitWith(this, orange.Event.CLOSE, e.data);
        };
        NetConnection.prototype.close = function (reason, data) {
            if (reason === void 0) { reason = 0; }
            var client = this._connection;
            if (client)
                client.close(reason, data);
        };
        /**
         * @internal
         */
        NetConnection.prototype._onData = function (e) {
            if (this._netProxy) {
                var msg = e.data;
                if (this._protocol) {
                    msg = this._protocol.decode(e.data);
                }
                if (msg) {
                    if (this._netProxy.receive == null || typeof this._netProxy.receive != 'function') {
                        throw 'netProxy 不是函数:' + this._netProxy.constructor.name + ', 它是否为:' + (!!(this._netProxy instanceof orange.NetProxy));
                    }
                    this._netProxy.receive(msg);
                }
            }
        };
        NetConnection.prototype.send = function (data) {
            var msg = data;
            // if (this.connected) {
            if (this._protocol) {
                msg = this._protocol.encode(data);
            }
            if (msg) {
                this._connection.send(msg.bytes);
            }
            // }
            return msg;
        };
        NetConnection.prototype.reconnect = function (url) {
            return this._connection.reconnect(url);
        };
        Object.defineProperty(NetConnection.prototype, "url", {
            get: function () {
                return this._connection.url;
            },
            enumerable: true,
            configurable: true
        });
        return NetConnection;
    }());
    orange.NetConnection = NetConnection;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var NetProxy = /** @class */ (function () {
        function NetProxy() {
            var _this = this;
            /**
             * 指令超时时间(秒)
             */
            this.commandTimeout = 7;
            /**
             * 重连间隙(秒)
             */
            this.reconnectInterval = 1;
            this._setActiveId = 0;
            /**
             * @internal
             */
            this.resolves = {};
            this.update = function () {
                var now = Date.now();
                var gap = now - _this.lastTime;
                _this.lastTime = now;
                if (gap > 500)
                    gap = 500;
                for (var k in _this.resolves) {
                    _this.resolves[k].time -= gap;
                    if (_this.resolves[k].time < 0) {
                        orange.debug && console.error('指令超时:', k);
                        _this.connection.close(orange.ConnectionCloseReason.COMMAND_TIME_OUT, k);
                        return;
                    }
                }
            };
            this._hasStart = false;
            /**
             * @internal
             */
            this.msgBacks = {};
            this.msgAllBacks = [];
        }
        /**
         * 接受消息，处理消息分发
         * @param data 消息
         */
        NetProxy.prototype.receive = function (data) {
            this.resolveAsyncMessage(data.sequence, data);
            this.receiveMessage(data.command, data);
        };
        Object.defineProperty(NetProxy.prototype, "active", {
            get: function () {
                return this.connection.active;
            },
            set: function (val) {
                this._setActiveId++;
                console.warn('set active:', val, this.connection.active, ' set id:', this._setActiveId);
                this.connection.active = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 延迟激活网络，为了和唤醒的事务处理错开时间，如果在延迟过程中重新设置了网络激活状态会放弃这次激活处理
         * @param delay 延迟时间，毫秒
         */
        NetProxy.prototype.setActiveTrueDelay = function (delay) {
            return __awaiter(this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = this._setActiveId;
                            console.warn('set active delay:', delay, this.connection.active, ' set id:', this._setActiveId, id);
                            return [4 /*yield*/, orange.sleep(delay)];
                        case 1:
                            _a.sent();
                            console.warn('set active delay complete:', delay, this.connection.active, ' set id:', this._setActiveId, id);
                            if (id != this._setActiveId)
                                return [2 /*return*/];
                            console.warn('set active delay really:', delay, this.connection.active, ' set id:', this._setActiveId, id);
                            this.active = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        // public onClose() {
        //   let resolves = this.resolves;
        //   for (let key in resolves) {
        //     resolves[key]({ errorCode: -1, errorMessage: 'close', body: null });
        //   }
        //   this.resolves = {};
        //   this.msgBacks = {};
        //   this.msgAllBacks = [];
        // }
        NetProxy.prototype.send = function (data) {
            if (this.connection) {
                return this.connection.send(data);
            }
            return;
        };
        NetProxy.prototype.resolveAsyncMessage = function (msgSeq, data) {
            var resolves = this.resolves;
            if (resolves[msgSeq]) {
                resolves[msgSeq].resolve && resolves[msgSeq].resolve(data);
                resolves[msgSeq].back && resolves[msgSeq].back(data);
                delete resolves[msgSeq];
                // !resolves[msgSeq].back && delete resolves[msgSeq];
            }
        };
        NetProxy.prototype.start = function () {
            var _this = this;
            var c = setInterval(this.update, 500);
            this.lastTime = Date.now();
            orange.on(this.connection, orange.Event.CLOSE, function (e) { return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = e.data;
                    if (data.reason != orange.ConnectionCloseReason.DISCONNECT && data.reason != orange.ConnectionCloseReason.HERT_TIMEOUT) {
                        clearInterval(c);
                    }
                    return [2 /*return*/];
                });
            }); });
        };
        NetProxy.prototype.request = function (data, back, getSendMessage) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.connection) {
                    if (!_this._hasStart) {
                        _this._hasStart = true;
                        _this.start();
                    }
                    var msg = _this.connection.send(data);
                    _this.resolves[msg.sequence] = {
                        resolve: resolve,
                        back: back,
                        time: _this.commandTimeout * 1000
                    };
                    getSendMessage && getSendMessage(msg);
                }
            });
        };
        NetProxy.prototype.receiveMessage = function (msgID, data) {
            var e_12, _a;
            var msgBacks = this.msgBacks;
            if (msgBacks[msgID]) {
                var list_7 = msgBacks[msgID];
                try {
                    for (var list_6 = __values(list_7), list_6_1 = list_6.next(); !list_6_1.done; list_6_1 = list_6.next()) {
                        var item = list_6_1.value;
                        if (item.flag) {
                            item.back.call(item.thisObj, data);
                        }
                    }
                }
                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                finally {
                    try {
                        if (list_6_1 && !list_6_1.done && (_a = list_6.return)) _a.call(list_6);
                    }
                    finally { if (e_12) throw e_12.error; }
                }
            }
            var list = this.msgAllBacks;
            for (var i = 0; i < list.length; i++) {
                if (list[i].flag) {
                    list[i].back.call(list[i].thisObj, data);
                }
            }
        };
        NetProxy.prototype.addMessageBack = function (msgID, back, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            if (!this.msgBacks[msgID]) {
                this.msgBacks[msgID] = [];
            }
            var list = this.msgBacks[msgID];
            for (var i = 0; i < list.length; i++) {
                if (list[i].back == back && list[i].thisObj == thisObj && list[i].flag) {
                    list[i].flag = true;
                    return;
                }
            }
            this.msgBacks[msgID].push({ back: back, thisObj: thisObj, flag: true });
        };
        NetProxy.prototype.removeMessageBack = function (msgID, back, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            if (this.msgBacks[msgID]) {
                var list = this.msgBacks[msgID];
                for (var i = 0; i < list.length; i++) {
                    if (list[i].back == back && list[i].thisObj == thisObj) {
                        list[i].flag = false;
                        break;
                    }
                }
            }
        };
        NetProxy.prototype.removeMessageBackByThis = function (thisObj) {
            var msgBacks = this.msgBacks;
            for (var msgID in msgBacks) {
                var list_8 = msgBacks[msgID];
                for (var i = 0; i < list_8.length; i++) {
                    if (list_8[i].thisObj == thisObj) {
                        list_8[i].flag = false;
                        break;
                    }
                }
            }
            var list = this.msgAllBacks;
            for (var i = 0; i < list.length; i++) {
                if (list[i].thisObj == thisObj) {
                    list[i].flag = false;
                }
            }
        };
        NetProxy.prototype.addAllMessageBack = function (back, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            var list = this.msgAllBacks;
            for (var i = 0; i < list.length; i++) {
                if (list[i].back == back && list[i].thisObj == thisObj) {
                    list[i].flag = true;
                    return;
                }
            }
            list.push({ back: back, thisObj: thisObj, flag: true });
        };
        NetProxy.prototype.removeAllMessageBack = function (back, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            var list = this.msgAllBacks;
            for (var i = 0; i < list.length; i++) {
                if (list[i].back == back && list[i].thisObj == thisObj) {
                    list[i].flag = false;
                }
            }
        };
        return NetProxy;
    }());
    orange.NetProxy = NetProxy;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var WebSocketClient = /** @class */ (function () {
        function WebSocketClient() {
        }
        Object.defineProperty(WebSocketClient.prototype, "connection", {
            /**
             * @internal
             */
            get: function () {
                return this._connection;
            },
            enumerable: true,
            configurable: true
        });
        WebSocketClient.prototype.connect = function (url) {
            var _this = this;
            this._client = new orange.platform.WebsocketState();
            orange.on(this._client, orange.Event.CONNECT, this._onConnect, this);
            orange.on(this._client, orange.Event.CONNECT_ERROR, this._onConnectError, this);
            this._client.connect(url);
            return new Promise(function (resolve, reject) {
                if (_this.connection) {
                    resolve(_this.connection);
                }
                else {
                    _this._connectResolve = resolve;
                    _this._connectReject = reject;
                }
            });
        };
        /**
         * @internal
         */
        WebSocketClient.prototype._onConnect = function (e) {
            if (this._connectResolve) {
                this._connection = new orange.NetConnection(this._client);
                this._client = null;
                var func = this._connectResolve;
                this._connectResolve = null;
                var c = this.connection;
                this._connection = null;
                func(c);
            }
        };
        /**
         * @internal
         */
        WebSocketClient.prototype._onConnectError = function (e) {
            if (this._connectReject) {
                this._client && orange.removeAllListeners(this._client);
                this._client = null;
                var func = this._connectReject;
                this._connectReject = null;
                var e_13 = new orange.Event(orange.Event.CONNECT_ERROR);
                e_13.$target = this;
                func(e_13);
            }
        };
        return WebSocketClient;
    }());
    orange.WebSocketClient = WebSocketClient;
})(orange || (orange = {}));
/**
 * @internal
 */
var SimpleStateMachine = /** @class */ (function () {
    function SimpleStateMachine() {
        this.states = {};
    }
    SimpleStateMachine.prototype.Register = function (state, enter, exit, update) {
        this.states[state] = new SimpleStateMachineState(state, enter, exit, update);
    };
    SimpleStateMachine.prototype.RegisterBehaviour = function (state, stateBehaviour) {
        this.states[state] = new SimpleStateMachineState(state, stateBehaviour.OnEnter, stateBehaviour.OnExit, stateBehaviour.OnUpdate);
    };
    SimpleStateMachine.prototype.ChangeState = function (state) {
        if (this.state && this.state.exit) {
            this.state.exit();
        }
        this.preState = this.curState;
        this.curState = state;
        this.state = this.states[state];
        this.firstUpdate = true;
        if (this.state) {
            this.state.enter();
        }
    };
    SimpleStateMachine.prototype.Update = function () {
        if (this.state && this.state.update) {
            this.state.update();
        }
        this.firstUpdate = false;
    };
    return SimpleStateMachine;
}());
var SimpleStateMachineState = /** @class */ (function () {
    function SimpleStateMachineState(state, enter, exit, update) {
        this.state = state;
        this.enter = enter;
        this.exit = exit;
        this.update = update;
    }
    return SimpleStateMachineState;
}());
/**
 * @internal
 */
var orange;
(function (orange) {
    var platform;
    (function (platform) {
        var SocketHert = /** @class */ (function (_super) {
            __extends(SocketHert, _super);
            function SocketHert() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.interval = -1;
                _this.active = true;
                return _this;
            }
            SocketHert.prototype.start = function (socket) {
                if (orange.debug) {
                    console.warn('[socket heart] new', this.hash);
                }
                this.socket = socket;
                this.lastSendHert = Date.now();
                this.lastReceiveHert = Date.now();
                this.tick();
            };
            SocketHert.prototype.tick = function () {
                var _this = this;
                if (this.interval != -1)
                    return;
                //发送一次心跳
                if (!this.active)
                    this.socket.send(new Uint8Array([0]));
                this.interval = setInterval(function () {
                    if (!_this.active)
                        return;
                    if (Date.now() - _this.lastSendHert >= _this.socket.hertTimeinterval * 1000) {
                        if (orange.debug) {
                            console.warn('[socket heart] send', _this.hash);
                        }
                        // console.log('发送心跳')
                        _this.lastSendHert = Date.now();
                        _this.socket.send(new Uint8Array([0]));
                    }
                    if (Date.now() - _this.lastReceiveHert >= _this.socket.hertTimeout * 1000) {
                        if (orange.debug) {
                            console.warn('[socket heart] close', _this.hash);
                        }
                        // console.log('主动断开')
                        _this.lastReceiveHert = Date.now();
                        clearInterval(_this.interval);
                        _this.interval = -1;
                        _this.socket.close(orange.ConnectionCloseReason.HERT_TIMEOUT);
                    }
                }, 16);
            };
            SocketHert.prototype.send = function () {
                this.lastSendHert = Date.now();
            };
            SocketHert.prototype.receive = function () {
                this.lastReceiveHert = Date.now();
            };
            SocketHert.prototype.stop = function () {
                if (orange.debug) {
                    console.warn('[socket heart] stop', this.hash);
                }
                clearInterval(this.interval);
                this.interval = -1;
            };
            return SocketHert;
        }(orange.HashObject));
        platform.SocketHert = SocketHert;
    })(platform = orange.platform || (orange.platform = {}));
})(orange || (orange = {}));
/**
 * @internal
 */
var orange;
(function (orange) {
    var platform;
    (function (platform) {
        var WebsocketState = /** @class */ (function () {
            function WebsocketState() {
                this.debug = orange.debug;
                this.closeDo = null;
                /**
                 * 是否激活
                 * 不激活的状态下网络不感应断线信息
                 */
                this._active = true;
                this._connected = false;
                this.state = SOCKET_STATE.CLOSE;
                /**
                 * 链接服务器超时时间
                 */
                this.connectTimeout = 10;
                /**
                 * 心跳包时间(单位秒)
                 */
                this.hertTimeinterval = 5;
                /**
                 * 客户端验证心跳爆超时时间
                 */
                this.hertTimeout = 10;
            }
            WebsocketState.prototype.connect = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    var client, hert;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                client = this.client = new platform.WebsocketClient();
                                hert = this.hert = new platform.SocketHert();
                                this.state = SOCKET_STATE.CONNECTTING;
                                //连上服务器
                                orange.on(this.client, orange.Event.CONNECT, function (e) {
                                    if (client != _this.client) {
                                        client.close();
                                        return;
                                    }
                                    _this.debug && console.log('[链上服务器]');
                                    _this.state = SOCKET_STATE.CONNECTED;
                                    _this._connected = true;
                                    hert.start(_this);
                                    orange.emit(_this, e);
                                });
                                orange.on(this.client, orange.Event.CONNECT_ERROR, function (e) {
                                    if (client != _this.client)
                                        return;
                                    if (_this.active == false) {
                                        _this.closeDo = (function () {
                                            e = e.clone();
                                            return function () {
                                                _this.debug && console.log('[链服务器出错]');
                                                _this.state = SOCKET_STATE.CLOSE;
                                                _this.client = null;
                                                orange.emit(_this, e);
                                            };
                                        })();
                                    }
                                    else {
                                        _this.debug && console.log('[链服务器出错]');
                                        _this.state = SOCKET_STATE.CLOSE;
                                        _this.client = null;
                                        orange.emit(_this, e);
                                    }
                                });
                                orange.on(this.client, orange.Event.CLOSE, function (e) {
                                    if (client != _this.client)
                                        return;
                                    if (_this.active == false) {
                                        _this.closeDo = (function () {
                                            e = e.clone();
                                            return function () {
                                                _this.debug && console.log('[断开链接]');
                                                _this.state = SOCKET_STATE.CLOSE;
                                                _this.client = null;
                                                hert.stop();
                                                orange.emit(_this, orange.Event.create(orange.Event.CLOSE, new orange.ConnectionCloseData(orange.ConnectionCloseReason.DISCONNECT)));
                                            };
                                        })();
                                    }
                                    else {
                                        _this.debug && console.log('[断开链接]');
                                        _this.state = SOCKET_STATE.CLOSE;
                                        _this.client = null;
                                        hert.stop();
                                        orange.emit(_this, orange.Event.create(orange.Event.CLOSE, new orange.ConnectionCloseData(orange.ConnectionCloseReason.DISCONNECT)));
                                    }
                                });
                                orange.on(this.client, orange.Event.DATA, function (e) {
                                    if (client != _this.client)
                                        return;
                                    hert.receive();
                                    e.data.length > 1 && orange.emit(_this, e);
                                });
                                this._url = url;
                                client.connect(url);
                                return [4 /*yield*/, orange.sleep(this.connectTimeout * 1000)];
                            case 1:
                                _a.sent();
                                if (!!this.active) return [3 /*break*/, 4];
                                return [4 /*yield*/, this.activeTrue()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, orange.sleep(this.connectTimeout * 1000)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                if (client == this.client) {
                                    if (this.state != 3) {
                                        this.debug && console.log('[链接服务器超时]');
                                        this.close(orange.ConnectionCloseReason.DISCONNECT, null, false);
                                        orange.emitWith(this, orange.Event.CONNECT_ERROR, new orange.ConnectionCloseData(orange.ConnectionCloseReason.CONNECT_TIMEOUT));
                                    }
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            };
            Object.defineProperty(WebsocketState.prototype, "active", {
                get: function () {
                    return this._active;
                },
                set: function (val) {
                    if (this._active == val)
                        return;
                    this.hert.active = val;
                    this._active = val;
                    if (val) {
                        this.closeDo && this.closeDo();
                        this.closeDo = null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            WebsocketState.prototype.activeTrue = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (!this._active) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    var clear = setInterval(function () {
                                        if (_this.active) {
                                            clearInterval(clear);
                                            resolve();
                                        }
                                    }, 50);
                                })];
                        }
                        return [2 /*return*/];
                    });
                });
            };
            /**
             * 重新链接
             * @param url
             */
            WebsocketState.prototype.reconnect = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                var client_1, client, hert;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (this.client) {
                                                client_1 = this.client;
                                                this.client = null;
                                                this.state = SOCKET_STATE.CLOSE;
                                                client_1.close();
                                            }
                                            client = this.client = new platform.WebsocketClient();
                                            hert = this.hert = new platform.SocketHert();
                                            this.state = SOCKET_STATE.CONNECTTING;
                                            //连上服务器
                                            orange.on(this.client, orange.Event.CONNECT, function (e) {
                                                if (client != _this.client) {
                                                    client.close();
                                                    return;
                                                }
                                                _this.state = SOCKET_STATE.CONNECTED;
                                                _this.debug && console.log('[重链上服务器]');
                                                hert.start(_this);
                                                resolve();
                                            });
                                            orange.on(this.client, orange.Event.CONNECT_ERROR, function (e) {
                                                if (client != _this.client)
                                                    return;
                                                if (_this.active == false) {
                                                    _this.closeDo = function () {
                                                        _this.debug && console.log('[重链服务器出错]');
                                                        _this.state = SOCKET_STATE.CLOSE;
                                                        _this.close(orange.ConnectionCloseReason.RECONNECT_ERROR);
                                                    };
                                                }
                                                else {
                                                    _this.debug && console.log('[重链服务器出错]');
                                                    _this.state = SOCKET_STATE.CLOSE;
                                                    _this.close(orange.ConnectionCloseReason.RECONNECT_ERROR);
                                                }
                                            });
                                            orange.on(this.client, orange.Event.CLOSE, function (e) {
                                                if (client != _this.client)
                                                    return;
                                                if (_this.active == false) {
                                                    _this.closeDo = function () {
                                                        _this.debug && console.log('[重断开链接]');
                                                        _this.state = SOCKET_STATE.CLOSE;
                                                        hert.stop();
                                                        _this.client = null;
                                                        orange.emit(_this, orange.Event.create(orange.Event.CLOSE, new orange.ConnectionCloseData(orange.ConnectionCloseReason.DISCONNECT)));
                                                    };
                                                }
                                                else {
                                                    _this.debug && console.log('[重断开链接]');
                                                    _this.state = SOCKET_STATE.CLOSE;
                                                    hert.stop();
                                                    _this.client = null;
                                                    orange.emit(_this, orange.Event.create(orange.Event.CLOSE, new orange.ConnectionCloseData(orange.ConnectionCloseReason.DISCONNECT)));
                                                }
                                            });
                                            orange.on(this.client, orange.Event.DATA, function (e) {
                                                if (client != _this.client)
                                                    return;
                                                hert.receive();
                                                e.data.length > 1 && orange.emit(_this, e);
                                            });
                                            this._url = url;
                                            client.connect(url);
                                            return [4 /*yield*/, orange.sleep(this.connectTimeout * 1000)];
                                        case 1:
                                            _a.sent();
                                            if (!!this.active) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.activeTrue()];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, orange.sleep(this.connectTimeout * 1000)];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4:
                                            if (client == this.client) {
                                                if (this.state != 3) {
                                                    this.debug && console.log('[重链接服务器超时]');
                                                    this.close(orange.ConnectionCloseReason.CONNECT_TIMEOUT);
                                                }
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    });
                });
            };
            Object.defineProperty(WebsocketState.prototype, "url", {
                get: function () {
                    return this._url;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebsocketState.prototype, "connected", {
                get: function () {
                    return this._connected;
                },
                enumerable: true,
                configurable: true
            });
            WebsocketState.prototype.send = function (data) {
                if (!this.client)
                    return;
                this.hert.send();
                this.client.send(data);
            };
            WebsocketState.prototype.close = function (reason, data, dispatch) {
                var _this = this;
                if (reason === void 0) { reason = 0; }
                if (dispatch === void 0) { dispatch = true; }
                if (!this.active) {
                    this.closeDo = function () {
                        _this.close(reason, data, dispatch);
                    };
                    return;
                }
                if (this.hert)
                    this.hert.stop();
                if (!this.client)
                    return;
                var client = this.client;
                this.client = null;
                this.state = SOCKET_STATE.CLOSE;
                client.close(reason);
                this._connected = false;
                dispatch && orange.emitWith(this, orange.Event.CLOSE, new orange.ConnectionCloseData(reason, data));
            };
            return WebsocketState;
        }());
        platform.WebsocketState = WebsocketState;
        var SOCKET_STATE;
        (function (SOCKET_STATE) {
            SOCKET_STATE[SOCKET_STATE["CLOSE"] = 1] = "CLOSE";
            SOCKET_STATE[SOCKET_STATE["CONNECTTING"] = 2] = "CONNECTTING";
            SOCKET_STATE[SOCKET_STATE["CONNECTED"] = 3] = "CONNECTED"; //已链接
        })(SOCKET_STATE || (SOCKET_STATE = {}));
    })(platform = orange.platform || (orange.platform = {}));
})(orange || (orange = {}));
/**
 * @internal
 */
var orange;
(function (orange) {
    var platform;
    (function (platform) {
        var WebsocketClient = /** @class */ (function () {
            function WebsocketClient() {
                this.active = true;
                this.ready = false;
                this._hasConnected = false;
                this.closeSelf = false;
                this.msgList = [];
            }
            Object.defineProperty(WebsocketClient.prototype, "url", {
                get: function () {
                    return this._url;
                },
                enumerable: true,
                configurable: true
            });
            WebsocketClient.prototype.connect = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (orange.debug) {
                            console.warn('[platform socket] connect ' + url);
                        }
                        this._url = url;
                        this.closeSelf = false;
                        this._client = new egret.WebSocket();
                        this._client.type = egret.WebSocket.TYPE_BINARY;
                        this._client.addEventListener(egret.Event.CONNECT, this._onSocketOpen, this);
                        this._client.addEventListener(egret.Event.CLOSE, this._onClose, this);
                        this._client.addEventListener(egret.IOErrorEvent.IO_ERROR, this._onIOError, this);
                        this._client.addEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveData, this);
                        this._client.connectByUrl(url);
                        return [2 /*return*/];
                    });
                });
            };
            Object.defineProperty(WebsocketClient.prototype, "connected", {
                get: function () {
                    return this._hasConnected;
                },
                enumerable: true,
                configurable: true
            });
            WebsocketClient.prototype._onSocketOpen = function (e) {
                var _this = this;
                if (orange.debug) {
                    console.warn('[platform socket] connect');
                }
                this._hasConnected = true;
                orange.emitWith(this, orange.Event.CONNECT);
                //因为外面使用 await connect 之后才赋值 proxy ，导致下一帧才赋值 proxy，导致丢包
                setTimeout(function () {
                    _this.ready = true;
                    _this.msgList.forEach(function (msg) {
                        if (orange.debug) {
                            try {
                                orange.emitWith(_this, orange.Event.DATA, msg);
                            }
                            catch (e) {
                                console.error('执行消息出错');
                                console.error(e);
                            }
                        }
                        else {
                            orange.emitWith(_this, orange.Event.DATA, msg);
                        }
                    });
                    _this.msgList.length = 0;
                }, 50);
            };
            WebsocketClient.prototype._onConnectError = function (error) {
                if (error === void 0) { error = null; }
                this._client && this._client.close();
                orange.emitWith(this, orange.Event.CONNECT_ERROR, error);
            };
            WebsocketClient.prototype._onIOError = function (error) {
                if (orange.debug) {
                    console.warn('[platform socket] error');
                }
                if (this._hasConnected) {
                    orange.emitWith(this, orange.Event.ERROR, error);
                }
                else {
                    this._onConnectError(error);
                }
            };
            WebsocketClient.prototype._onClose = function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (orange.debug) {
                            console.warn('[platform socket] on close');
                        }
                        if (this._hasConnected) {
                            this._hasConnected = false;
                            orange.emitWith(this, orange.Event.CLOSE, { self: this.closeSelf });
                        }
                        else {
                            this._onConnectError();
                        }
                        return [2 /*return*/];
                    });
                });
            };
            WebsocketClient.prototype._onReceiveData = function () {
                if (orange.debug) {
                    // console.log('[platform socket] onReceived')
                }
                if (!this._client)
                    return;
                var bytes = new egret.ByteArray();
                this._client.readBytes(bytes);
                var array = [];
                for (var i = 0; i < bytes.length; i++) {
                    array.push(bytes.readByte());
                }
                var u8 = new Uint8Array(array);
                if (orange.debug) {
                    // console.log('[platform socket] onReceived len = ' + u8.byteLength)
                }
                if (!this.ready)
                    this.msgList.push(u8);
                else
                    orange.emitWith(this, orange.Event.DATA, u8);
            };
            WebsocketClient.prototype.close = function (msg) {
                if (orange.debug) {
                    console.warn('[platform socket] close self', JSON.stringify(msg, null, 2));
                }
                this.closeSelf = true;
                if (this._client) {
                    var _client = this._client;
                    this._client = null;
                    _client.close();
                    console.warn('[platform socket] egret ws close ', JSON.stringify(msg, null, 2));
                }
            };
            WebsocketClient.prototype.send = function (data) {
                if (orange.debug) {
                    // console.log('[platform socket] send ');
                }
                if (!this._client) {
                    return;
                }
                if (orange.debug) {
                    // console.log('[platform socket] send len = ' + data.byteLength);
                }
                var bytes = new egret.ByteArray(data);
                this._client.writeBytes(bytes);
                this._client.flush();
            };
            return WebsocketClient;
        }());
        platform.WebsocketClient = WebsocketClient;
    })(platform = orange.platform || (orange.platform = {}));
})(orange || (orange = {}));
var orange;
(function (orange) {
    var oofs = null;
    var iswx = false;
    try {
        if (window["wx"] && window["wx"].getFileSystemManager && window["wx"].getFileSystemManager()["stat"]) {
            iswx = true;
        }
    }
    catch (e) {
        iswx = false;
    }
    if (iswx) {
        oofs = (function () {
            var _this = this;
            var fs = window["wx"].getFileSystemManager();
            var exist = function (path) {
                return new Promise(function (resolve, reject) {
                    fs.access({
                        path: getWXPath(path),
                        success: function () { return resolve(true); },
                        fail: function () { return resolve(false); }
                    });
                });
            };
            var getWXPath = function (path) {
                return path == '' ? window["wx"].env.USER_DATA_PATH : window["wx"].env.USER_DATA_PATH + '/' + path;
            };
            this.exist = function (path) {
                return new Promise(function (resolve, reject) {
                    var paths = path.split('/');
                    var str = "";
                    var i = -1;
                    var f = function () {
                        i++;
                        if (i < paths.length) {
                            str += paths[i] + (i < paths.length - 1 ? "/" : "");
                            if (str.length > 1) {
                                exist(str).then(function (exist) {
                                    if (!exist) {
                                        resolve(false);
                                    }
                                    else {
                                        f();
                                    }
                                }).catch(function (e) {
                                    reject(e);
                                });
                            }
                            else {
                                f();
                            }
                        }
                        else {
                            resolve(true);
                        }
                    };
                    f();
                });
            };
            var mkdir = function (path) {
                return new Promise(function (resolve, reject) {
                    fs.mkdir({
                        dirPath: getWXPath(path),
                        success: function () { return resolve(); },
                        fail: function () { return reject('创建目录出错:' + path); }
                    });
                });
            };
            this.mkdir = function (path) {
                return new Promise(function (resolve, reject) {
                    var paths = path.split('/');
                    var str = "";
                    var i = -1;
                    var f = function () {
                        i++;
                        if (i < paths.length) {
                            str += paths[i] + (i < paths.length - 1 ? "/" : "");
                            if (str.length > 1) {
                                _this.exist(str).then(function (exist) {
                                    if (!exist) {
                                        mkdir(str).then(function () {
                                            f();
                                        }).catch(function (e) {
                                            reject(e);
                                        });
                                    }
                                    else {
                                        f();
                                    }
                                }).catch(function (e) {
                                    reject(e);
                                });
                            }
                            else {
                                f();
                            }
                        }
                        else {
                            resolve();
                        }
                    };
                    f();
                });
            };
            this.writeFile = function (path, data, encoding) {
                encoding = encoding || 'utf8';
                return new Promise(function (resolve, reject) {
                    var dir = path.slice(0, path.length - path.split('/')[path.split('/').length - 1].length - 1);
                    _this.mkdir(dir).then(function () {
                        fs.writeFile({
                            filePath: getWXPath(path),
                            data: data,
                            encoding: encoding,
                            success: function () { return resolve(); },
                            fail: function () { return reject; }
                        });
                    }).catch(function (e) {
                        reject(e);
                    });
                });
            };
            this.readFile = function (path, encoding) {
                return new Promise(function (resolve, reject) {
                    encoding = encoding || 'utf8';
                    _this.exist(path).then(function (exist) {
                        if (!exist)
                            reject('文件不存在:' + path);
                        else {
                            fs.readFile({
                                filePath: getWXPath(path),
                                encoding: encoding,
                                success: function (data) { return resolve(data.data); },
                                fail: function (e) { return reject(e); }
                            });
                        }
                    }).catch(function (e) { return reject(e); });
                });
            };
            this.removeFile = function (path) {
                return new Promise(function (resolve, reject) {
                    _this.exist(path).then(function (exist) {
                        if (!exist)
                            resolve();
                        else {
                            fs.unlink({
                                filePath: getWXPath(path),
                                success: function () { return resolve(); },
                                fail: function (e) { return reject(e); }
                            });
                        }
                    }).catch(function (e) { return reject(e); });
                });
            };
            this.join = function (dir1, dir2) {
                if (dir1.charAt(dir1.length - 1) == '/')
                    dir1 = dir1.slice(0, dir1.length - 1);
                if (dir2.charAt(0) == '/')
                    dir2 = dir2.slice(1, dir2.length);
                return dir1 + '/' + dir2;
            };
            var readDir = function (path) {
                return new Promise(function (resolve, reject) {
                    _this.exist(path).then(function (exist) {
                        if (!exist)
                            resolve([]);
                        else {
                            fs.readdir({
                                dirPath: getWXPath(path),
                                success: function (res) {
                                    var files = res.files;
                                    var list = [];
                                    files.forEach(function (name) { return list.push(_this.join(path, name)); });
                                    resolve(list);
                                },
                                fail: function (e) { return reject(e); }
                            });
                        }
                    }).catch(function (e) { return reject(e); });
                });
            };
            var isFile = function (path) {
                return new Promise(function (resolve, reject) {
                    fs.stat({
                        path: getWXPath(path),
                        success: function (res) { return resolve(res.stats.isFile()); },
                        fail: function (e) { return reject(e); }
                    });
                });
            };
            this.isFile = function (path) {
                return new Promise(function (resolve, reject) {
                    _this.exist(path).then(function (exist) {
                        if (!exist)
                            reject('目录(文件)不存在:' + path);
                        else {
                            fs.stat({
                                path: getWXPath(path),
                                success: function (res) { return resolve(res.stats.isFile()); },
                                fail: function (e) { return reject(e); }
                            });
                        }
                    }).catch(function (e) { return reject(e); });
                });
            };
            this.readDir = function (path) {
                return new Promise(function (resolve, reject) {
                    var all = [];
                    var f = function (dir) {
                        return new Promise(function (dresolve, dreject) {
                            readDir(dir).then(function (list) {
                                if (list["length"] == 0)
                                    dresolve();
                                else {
                                    var n = 0;
                                    list["forEach"](function (url) {
                                        n++;
                                        isFile(url).then(function (flag) {
                                            if (flag) { //是文件
                                                all.push(url);
                                                n--;
                                                if (n === 0)
                                                    dresolve();
                                            }
                                            else {
                                                f(url).then(function () {
                                                    n--;
                                                    if (n === 0)
                                                        dresolve();
                                                }).catch(function (e) { return dreject(e); });
                                            }
                                        }).catch(function (e) { return dreject(e); });
                                    });
                                }
                            }).catch(function (e) { return dreject(e); });
                        });
                    };
                    f(path).then(function () { return resolve(all); }).catch(function (e) { return reject; });
                });
            };
            var removeDir = function (path) {
                return new Promise(function (resolve, reject) {
                    fs.rmdir({
                        dirPath: getWXPath(path),
                        success: function () { return resolve(); },
                        fail: function (e) { return reject(e); }
                    });
                });
            };
            this.removeDir = function (path) {
                return new Promise(function (resolve, reject) {
                    var all = [];
                    var f = function (dir) {
                        return new Promise(function (dresolve, dreject) {
                            readDir(dir).then(function (list) {
                                if (list["length"] == 0)
                                    dresolve();
                                else {
                                    var n = 0;
                                    list["forEach"](function (url) {
                                        n++;
                                        _this.isFile(url).then(function (flag) {
                                            if (flag) { //是文件
                                                _this.removeFile(url).then(function () {
                                                    n--;
                                                    if (n === 0) {
                                                        removeDir(dir).then(function () { return dresolve(); }).then(function (e) { return dreject(); });
                                                    }
                                                }).catch(function (e) { return dreject(e); });
                                            }
                                            else {
                                                f(url).then(function () {
                                                    n--;
                                                    if (n === 0) {
                                                        removeDir(dir).then(function () { return dresolve(); }).then(function (e) { return dreject(); });
                                                    }
                                                }).catch(function (e) { return dreject(e); });
                                            }
                                        }).catch(function (e) { return dreject(e); });
                                    });
                                }
                            }).catch(function (e) { return dreject(e); });
                        });
                    };
                    f(path).then(function () { return resolve(all); }).catch(function (e) { return reject; });
                });
            };
            var out = {};
            var list = [];
            var isCall = false;
            var _t = this;
            var callNext = function () {
                if (isCall)
                    return;
                else if (list.length) {
                    isCall = true;
                    var item = list.shift();
                    item.call.apply(_t, item.args).then(function () {
                        isCall = false;
                        item.resolve.apply(null, arguments);
                        callNext();
                    }).then(function (e) {
                        isCall = false;
                        item.reject.apply(null, e);
                        callNext();
                    }).catch(function (e) {
                        isCall = false;
                        item.reject(e);
                        callNext();
                    });
                }
            };
            var decorate = function (f) {
                return function () {
                    var args = arguments;
                    return new Promise(function (resolve, reject) {
                        list.push({
                            call: f,
                            args: args,
                            resolve: resolve,
                            reject: reject
                        });
                        callNext();
                    });
                };
            }; //wx.env.USER_DATA_PATH + '/'
            out.exist = decorate(this.exist);
            out.mkdir = decorate(this.mkdir);
            out.writeFile = decorate(this.writeFile);
            out.readFile = decorate(this.readFile);
            out.removeFile = decorate(this.removeFile);
            out.isFile = decorate(this.isFile);
            out.readDir = decorate(this.readDir);
            out.removeDir = decorate(this.removeDir);
            out.join = this.join;
            out.setStorage = function (type, list) {
                return new Promise(function (resolve, reject) {
                    if (list.length == 0) {
                        resolve();
                    }
                    else {
                        var n = list.length;
                        list.forEach(function (item) {
                            out.writeFile('ofs/storage/' + type + '/' + item.key + '.txt', JSON.stringify(item.value)).then(function (r) {
                                n--;
                                console.warn('存储成功');
                                if (n == 0)
                                    resolve();
                            }).catch(function (e) {
                                reject(e);
                                console.warn('失败', e);
                            });
                        });
                    }
                });
            };
            out.getStorage = function (type) {
                return new Promise(function (resolve, reject) {
                    out.readDir('ofs/storage/' + type).then(function (list) {
                        if (list.length == 0) {
                            resolve([]);
                        }
                        else {
                            var all = [];
                            var n = list.length;
                            list.forEach(function (url) {
                                var name = url.split('/')[url.split('/').length - 1];
                                name = name.split('.')[0];
                                out.readFile(url).then(function (data) {
                                    all.push({ 'key': name, 'value': JSON.parse(data) });
                                    n--;
                                    if (n == 0)
                                        resolve(all);
                                }).catch(function (e) { return resolve([]); }); //reject(e)
                            });
                        }
                    }).catch(function (e) { return resolve([]); }); //reject(e)
                });
            };
            out.removeStorage = function (type) {
                return new Promise(function (resolve, reject) {
                    out.removeDir('ofs/storage/' + type).then(function () { return resolve(); }).catch(function (e) { return reject(e); });
                });
            };
            out.setItem = function (type, value) {
                return new Promise(function (resolve, reject) {
                    out.writeFile('ofs/storage/' + type + '.txt', value).then(function () {
                        resolve();
                    }).catch(function (e) {
                        reject(e);
                    });
                });
            };
            out.getItem = function (type) {
                return new Promise(function (resolve, reject) {
                    out.readFile('ofs/storage/' + type + '.txt').then(function (data) {
                        resolve(data);
                    }).catch(function (e) { return resolve(null); }); //reject(e)
                });
            };
            out.removeItem = function (type) {
                return new Promise(function (resolve, reject) {
                    out.removeFile('ofs/storage/' + type + '.txt').then(function () { return resolve(); }).catch(function (e) { return reject(e); });
                });
            };
            return out;
        }).call(function () { });
    }
    else {
        var f = {};
        oofs = f;
        f.setStorage = function (type, list) {
            return new Promise(function (resolve) {
                try {
                    window.sessionStorage.setItem(type, JSON.stringify(list));
                }
                catch (e) {
                }
                resolve();
            });
        };
        f.getStorage = function (type) {
            return new Promise(function (resolve) {
                var items = [];
                try {
                    items = JSON.parse(window.sessionStorage.getItem(type));
                }
                catch (e) {
                    items = [];
                }
                resolve(items);
            });
        };
        f.removeStorage = function (type) {
            return new Promise(function (resolve) {
                window.sessionStorage.removeItem(type);
                resolve();
            });
        };
        f.setItem = function (type, value) {
            return new Promise(function (resolve) {
                try {
                    window.sessionStorage.setItem(type, value);
                }
                catch (e) {
                }
                resolve();
            });
        };
        f.getItem = function (type) {
            return new Promise(function (resolve) {
                var items = "";
                try {
                    items = window.sessionStorage.getItem(type);
                }
                catch (e) {
                    items = "";
                }
                resolve(items);
            });
        };
        f.removeItem = function (type) {
            return new Promise(function (resolve) {
                window.sessionStorage.removeItem(type);
                resolve();
            });
        };
    }
    var Storage = /** @class */ (function () {
        function Storage() {
        }
        Storage.setItem = function (key, value) {
            return oofs.setItem(key, value);
        };
        Storage.getItem = function (key) {
            return new Promise(function (resolve, reject) {
                oofs.getItem(key).then(function (value) {
                    resolve(value);
                }).catch(function (e) { return reject(e); });
            });
        };
        // public static setItems: (key: string, value: { key: string, value: any }[]) => Promise<void> = oofs.setStorage;
        // public static getItems: (key: string) => Promise<{ key: string, value: any }[]> = oofs.getStorage;
        Storage.removeItem = oofs.removeItem;
        return Storage;
    }());
    orange.Storage = Storage;
})(orange || (orange = {}));
var orange;
(function (orange) {
    /**
     * 如果 Promise 函数返回 reject
     * @param func
     * @param waitTime
     * @param tryMax
     */
    orange.tryPromise = function (func, waitTime, tryMax) {
        if (waitTime === void 0) { waitTime = 1000; }
        if (tryMax === void 0) { tryMax = 3; }
        return new Promise(function (resolve, reject) {
            var f = function () {
                var flag = false;
                func(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (flag)
                        return;
                    flag = true;
                    resolve.apply(null, args);
                }, function (e) {
                    if (flag)
                        return;
                    flag = true;
                    tryMax--;
                    if (tryMax > 0)
                        setTimeout(f, waitTime);
                    else
                        reject(e);
                });
            };
            f();
        });
    };
})(orange || (orange = {}));
var orange;
(function (orange) {
    var TaskList = /** @class */ (function () {
        function TaskList(source) {
            /**
             * @internal
             */
            this.operates = [];
            /**
             * @internal
             */
            this.over = false;
            this.source = source;
        }
        // public emit<S>(f: (source: Array<T>, currentValue: any, eimit: (item: S, index?: number, source?: Array<T>, taskList?: TaskList<S>) => Promise<any>) => boolean, initValue: any = 0): TaskList<S> {
        //   this.operates.push(['emit', (list: Array<T>): void => {
        //     let arr = [];
        //     for (let i = 0; i < list.length; i++) {
        //       if (this.over) return;
        //       arr = arr.concat(f(list[i], i, list));
        //     }
        //     return arr;
        //   }]);
        //   return this as any;
        // }
        /**
         * 转换任务，拆分任务
         * @param f
         */
        TaskList.prototype.transform = function (f) {
            var _this = this;
            this.operates.push(['transform', function (list) {
                    var arr = [];
                    for (var i = 0; i < list.length; i++) {
                        if (_this.over)
                            return;
                        arr = arr.concat(f(list[i], i, list));
                    }
                    return arr;
                }]);
            return this;
        };
        /**
         * 串行处理任务
         * @param f 处理函数
         */
        TaskList.prototype.serial = function (f) {
            var _this = this;
            this.operates.push(['serial', function (list) { return __awaiter(_this, void 0, void 0, function () {
                    var i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < list.length)) return [3 /*break*/, 4];
                                if (this.over)
                                    return [2 /*return*/];
                                return [4 /*yield*/, f(list[i], i, list)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }]);
            return this;
        };
        /**
         * 并行处理任务，所有任务处理完后进行到下一步
         * @param f 处理函数
         */
        TaskList.prototype.parallel = function (f) {
            var _this = this;
            this.operates.push(['parallel', function (list) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve) {
                                var n = list.length;
                                if (!n) {
                                    resolve();
                                    return;
                                }
                                list.forEach(function (item, index, list) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (this.over)
                                                    return [2 /*return*/];
                                                return [4 /*yield*/, f(item, index, list)];
                                            case 1:
                                                _a.sent();
                                                if (this.over)
                                                    return [2 /*return*/];
                                                n--;
                                                if (n == 0) {
                                                    resolve();
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })];
                    });
                }); }]);
            return this;
        };
        /**
         * 执行
         */
        TaskList.prototype.execute = function () {
            return __awaiter(this, void 0, void 0, function () {
                var e_14, _a, list, _b, _c, _d, type, f, e_14_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (this.over)
                                return [2 /*return*/];
                            list = this.source;
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 7, 8, 9]);
                            _b = __values(this.operates), _c = _b.next();
                            _e.label = 2;
                        case 2:
                            if (!!_c.done) return [3 /*break*/, 6];
                            _d = __read(_c.value, 2), type = _d[0], f = _d[1];
                            if (!(type == 'serial' || type == 'parallel')) return [3 /*break*/, 4];
                            return [4 /*yield*/, f(list)];
                        case 3:
                            _e.sent();
                            if (this.over)
                                return [2 /*return*/];
                            return [3 /*break*/, 5];
                        case 4:
                            if (type == 'transform') {
                                list = f(list);
                            }
                            _e.label = 5;
                        case 5:
                            _c = _b.next();
                            return [3 /*break*/, 2];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_14_1 = _e.sent();
                            e_14 = { error: e_14_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_14) throw e_14.error; }
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 停止执行所有的任务
         */
        TaskList.prototype.stop = function () {
            this.over = true;
        };
        return TaskList;
    }());
    orange.TaskList = TaskList;
})(orange || (orange = {}));
// onmessage = function (e) {
// }
// let wx;
// namespace orange {
//   export class Thread {
//     constructor() {
//     }
//   }
// }
var orange;
(function (orange) {
    var APIUtil = /** @class */ (function () {
        function APIUtil() {
        }
        APIUtil.deprecated = function () {
        };
        /**
         * 提示接口已废弃
         * @param methodName
         */
        APIUtil.deprecatedTip = (function () {
            var tips = {};
            return function (methodName, time, more) {
                if (more === void 0) { more = ''; }
                if (!tips[methodName]) {
                    tips[methodName] = true;
                    var date = new Date();
                    date.setTime(time);
                    console.warn('[废弃的 api] ' + methodName + '  更新时间:' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '  提示:' + more);
                }
            };
        })();
        return APIUtil;
    }());
    orange.APIUtil = APIUtil;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var ArrayUtil = /** @class */ (function () {
        function ArrayUtil() {
        }
        ArrayUtil.getItem = function (source, key, value) {
            var e_15, _a;
            try {
                for (var source_1 = __values(source), source_1_1 = source_1.next(); !source_1_1.done; source_1_1 = source_1.next()) {
                    var item = source_1_1.value;
                    if (item[key] == value)
                        return item;
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (source_1_1 && !source_1_1.done && (_a = source_1.return)) _a.call(source_1);
                }
                finally { if (e_15) throw e_15.error; }
            }
            return null;
        };
        /**
         * 根据权重，返回随机的索引
         * @param list 权重数组
         */
        ArrayUtil.getRandom = function (list) {
            var sum = 0;
            list.forEach(function (n) { return sum += n; });
            var r = sum * Math.random();
            for (var i = 0; i < list.length; i++) {
                if (r <= list[i])
                    return i;
                r -= list[i];
            }
            return list.length - 1;
        };
        return ArrayUtil;
    }());
    orange.ArrayUtil = ArrayUtil;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var BreakUtil = /** @class */ (function () {
        function BreakUtil() {
        }
        BreakUtil.break = function (name) {
            if (name === void 0) { name = ""; }
            console.log("[break point] " + name);
        };
        return BreakUtil;
    }());
    orange.BreakUtil = BreakUtil;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var GetUtil = /** @class */ (function () {
        function GetUtil() {
        }
        /**
         * 根据一个字符串获取全局变量
         * @param attribute "Formula.countAttack"
         */
        GetUtil.getFromGlobal = function (attribute, root) {
            var arr = attribute.split(".");
            var res = root || window;
            for (var i = 0; i < arr.length; i++) {
                res = res[arr[i]];
                if (res == null)
                    return res;
            }
            return res;
        };
        GetUtil.setFromGlobal = function (attribute, value, root) {
            var arr = attribute.split(".");
            var res = root || window;
            for (var i = 0; i < arr.length; i++) {
                if (i == arr.length - 1) {
                    res[arr[i]] = value;
                    if (GetUtil.watchs.has(attribute))
                        GetUtil.watchs.get(attribute).forEach(function (call) { return call(value); });
                }
                else {
                    if (!res[arr[i]])
                        res[arr[i]] = {};
                    res = res[arr[i]];
                }
            }
            return res;
        };
        GetUtil.watchFromGlobal = function (attribute, back) {
            if (!GetUtil.watchs.has(attribute)) {
                GetUtil.watchs.set(attribute, []);
            }
            GetUtil.watchs.get(attribute).push(back);
            back(GetUtil.getFromGlobal(attribute));
            return function () {
                GetUtil.watchs.get(attribute).splice(GetUtil.watchs.get(attribute).indexOf(back), 1);
            };
        };
        /**
         * @internal
         */
        GetUtil.watchs = new Map();
        return GetUtil;
    }());
    orange.GetUtil = GetUtil;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var StringUtil = /** @class */ (function () {
        function StringUtil() {
        }
        /**
         * 采用 utf8 编码把字符串转成字节数组
         * @param str
         */
        StringUtil.encodeUTF8 = function (str) {
            var res = [];
            var num;
            for (var i = 0; i < str.length; i++) {
                num = str.charCodeAt(i);
                if (num < 128) {
                    res.push(num);
                }
                else if (num < 2048) {
                    res.push(Math.floor(num / 64) + 128 + 64);
                    res.push((num % 64) + 128);
                }
                else if (num < 65536) {
                    res.push(Math.floor(num / 4096) + 128 + 64 + 32);
                    res.push(Math.floor((num % 4096) / 64) + 128);
                    res.push((num % 64) + 128);
                }
                else {
                    res.push(Math.floor(num / 262144) + 128 + 64 + 32 + 16);
                    res.push(Math.floor((num % 262144) / 4096) + 128);
                    res.push(Math.floor((num % 4096) / 64) + 128);
                    res.push((num % 64) + 128);
                }
            }
            return res;
        };
        /**
         * 把 utf8 编码的字节数组还原成字符串
         * @param arr
         */
        StringUtil.decodeUTF8 = function (arr) {
            if (!(arr instanceof Array)) {
                var list = [];
                for (var i_1 = 0, len = arr["length"]; i_1 < len; i_1++) {
                    list[i_1] = arr[i_1];
                }
                arr = list;
            }
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] < 0)
                    arr[i] += 256;
            }
            var res = [];
            for (i = 0; i < arr.length; i++) {
                if (arr[i] == 0)
                    break;
                if ((arr[i] & 128) == 0)
                    res.push(arr[i]); //1位
                else if ((arr[i] & 64) == 0)
                    res.push(arr[i] % 128); //1位
                else if ((arr[i] & 32) == 0) //2位
                 {
                    res.push((arr[i] % 32) * 64 + (arr[i + 1] % 64));
                    i++;
                }
                else if ((arr[i] & 16) == 0) //3位
                 {
                    res.push((arr[i] % 16) * 64 * 64 + (arr[i + 1] % 64) * 64 + (arr[i + 2] % 64));
                    i++;
                    i++;
                }
                else if ((arr[i] & 8) == 0) //4位
                 {
                    res.push((arr[i] % 8) * 64 * 64 * 64 + (arr[i + 1] % 64) * 64 * 64 + (arr[i + 2] % 64) * 64 + (arr[i + 2] % 64));
                    i++;
                    i++;
                    i++;
                }
            }
            var str = "";
            for (i = 0; i < res.length; i++) {
                str += String.fromCharCode(res[i]);
            }
            return str;
        };
        //替换某些字符串为指定的字符串
        StringUtil.replace = function (str, findStr, tstr, jumpFind) {
            if (jumpFind === void 0) { jumpFind = false; }
            for (var i = 0; i < str.length; i++) {
                if (StringUtil.hasStringAt(str, [findStr], i)) {
                    str = str.slice(0, i) + tstr + str.slice(i + findStr.length, str.length);
                    if (!jumpFind)
                        i -= tstr.length - findStr.length;
                }
            }
            return str;
        };
        //某个位置是否含有指定字符串之一
        StringUtil.hasStringAt = function (str, hstrs, pos) {
            for (var i = 0; i < hstrs.length; i++) {
                var hstr = hstrs[i];
                if (str.length - pos >= hstr.length && str.slice(pos, pos + hstr.length) == hstr) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 打印表格
         * @param table 表格
         * @param gap 每个字段间隔多少个空格，默认空 4 个
         */
        StringUtil.tableToString = function (table, gap) {
            if (gap === void 0) { gap = 4; }
            var str = '';
            var lens = [];
            for (var y = 0; y < table.length; y++) {
                for (var x = 0; x < table[y].length; x++) {
                    table[y][x] = '' + table[y][x];
                    if (!lens[x])
                        lens[x] = StringUtil.getLength(table[y][x]);
                    else
                        StringUtil.getLength(table[y][x]) > lens[x] && (lens[x] = StringUtil.getLength(table[y][x]));
                }
            }
            for (var y = 0; y < table.length; y++) {
                for (var x = 0; x < table[y].length; x++) {
                    str += table[y][x];
                    for (var i = 0; i < gap + lens[x] - StringUtil.getLength(table[y][x]); i++)
                        str += ' ';
                }
                y < table.length - 1 && (str += '\n');
            }
            return str;
        };
        /**
         * 获取字符串的长度，小于 255 的长度为 1，其它为 2
         * @param str
         */
        StringUtil.getLength = function (str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) < 256)
                    len++;
                else
                    len += 2;
            }
            return len;
        };
        return StringUtil;
    }());
    orange.StringUtil = StringUtil;
})(orange || (orange = {}));
var orange;
(function (orange) {
    function sleep(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }
    orange.sleep = sleep;
})(orange || (orange = {}));
var orange;
(function (orange) {
    var URLUtil = /** @class */ (function () {
        function URLUtil(url) {
            this.params = {};
            if (url.indexOf('?') == -1) {
                this.baseURL = url;
            }
            else {
                this.baseURL = url.slice(0, url.indexOf('?'));
                var str = url.slice(url.indexOf('?') + 1, url.length);
                var list = str.split('&');
                for (var i = 0; i < list.length; i++) {
                    var k = list[i].slice(0, list[i].indexOf('='));
                    var v = list[i].slice(list[i].indexOf('=') + 1, list[i].length);
                    this.params[k] = v;
                }
            }
        }
        Object.defineProperty(URLUtil.prototype, "url", {
            get: function () {
                var res = this.baseURL;
                if (this.params) {
                    res += '?';
                    for (var k in this.params) {
                        res += k + '=' + this.params[k] + '&';
                    }
                }
                if (res[res.length - 1] == '&')
                    res = res.slice(0, res.length - 1);
                return res;
            },
            enumerable: true,
            configurable: true
        });
        URLUtil.join = function () {
            var paths = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                paths[_i] = arguments[_i];
            }
            var res = "";
            paths.forEach(function (url) {
                if (res.length) {
                    if (res.charAt(res.length - 1) != "/")
                        res += "/";
                    if (url.charAt(0) == "." && url.charAt(1) == "/")
                        url = url.slice(2, url.length);
                    if (url.charAt(0) == "/")
                        url = url.slice(1, url.length);
                    res += url;
                }
                else {
                    res = url;
                }
            });
            return res;
        };
        return URLUtil;
    }());
    orange.URLUtil = URLUtil;
})(orange || (orange = {}));
//# sourceMappingURL=orange.js.map