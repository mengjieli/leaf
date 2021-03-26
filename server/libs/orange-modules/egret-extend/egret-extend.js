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
var egretExtend;
(function (egretExtend) {
    var _this = this;
    function start(rootData, mediatorManager) {
        mediatorManager = mediatorManager || new egretExtend.MediatorManager();
        var mr = egretExtend.MediatorRegister.get(mediatorManager.type);
        mr.mediatorManager = mediatorManager;
        mr.rootData = rootData;
        mr.start();
    }
    egretExtend.start = start;
    /**
     * @internal
     */
    var stage;
    //启动
    orange.addStartBack(function (params) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (params.egret && params.egret.stage && orange.debug) {
                stage = new egret.Sprite();
                params.egret.stage.addChild(stage);
                stage.addEventListener(egret.Event.ENTER_FRAME, function () {
                    if (stage.parent.getChildIndex(stage) != stage.parent.numChildren - 1) {
                        stage.parent.setChildIndex(stage, stage.parent.numChildren - 1);
                    }
                }, null);
                if (params.egret.debugWin) {
                    egretExtend.Debug.show();
                }
            }
            return [2 /*return*/];
        });
    }); });
    function getStage() {
        return stage || egretExtend.egretStage;
    }
    egretExtend.getStage = getStage;
})(egretExtend || (egretExtend = {}));
try {
    window["egretExtend"] = egretExtend;
    window["orange"]["egret"] = egretExtend;
}
catch (e) {
}
/**
 * @internal
 */
var egretExtend;
(function (egretExtend) {
    var ArrayCollection = /** @class */ (function () {
        function ArrayCollection() {
            /**
             * @internal
             */
            this.source = new eui.ArrayCollection;
            if (ArrayCollection.lock) {
                throw "请通过工厂方法 ArrayCollection.create 创建";
            }
        }
        ArrayCollection.prototype.indexOf = function (item) {
            for (var i = 0, len = this.length; i < len; i++) {
                if (this.source.getItemAt(i) == item) {
                    return i;
                }
            }
            return -1;
        };
        ArrayCollection.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            this.splice.apply(this, __spread([this.length, 0], items));
        };
        ArrayCollection.prototype.pop = function () {
            return this.source.length ? this.source.removeItemAt(this.source.length - 1) : undefined;
        };
        ArrayCollection.prototype.shift = function () {
            return this.source.length ? this.source.removeItemAt(0) : undefined;
        };
        ArrayCollection.prototype.splice = function (start, deleteCount) {
            var items = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                items[_i - 2] = arguments[_i];
            }
            if (deleteCount <= 0) {
                for (var i = 0; i < items.length; i++) {
                    this.source.addItemAt(items[i], start + i);
                }
                return items;
            }
            else {
                var arr = [];
                for (var i = 0; i < deleteCount; i++) {
                    arr.push(this.source.removeItemAt(start));
                }
                return arr;
            }
        };
        ArrayCollection.prototype.sort = function (compareFn) {
            var source = this.source;
            for (var i = 0; i < this.length - 1; i++) {
                if (compareFn(source.getItemAt(i), source.getItemAt(i + 1)) > 0) {
                    var item = source.getItemAt(i);
                    source.replaceItemAt(source.getItemAt(i + 1), i);
                    source.replaceItemAt(item, i + 1);
                    i = 0;
                }
            }
            return this;
        };
        Object.defineProperty(ArrayCollection.prototype, "length", {
            get: function () {
                return this.source.length;
            },
            set: function (len) {
                if (len < 0)
                    return;
                if (this.length > len) {
                    while (this.length > len) {
                        this.source.removeItemAt(this.length - 1);
                    }
                }
                else {
                    while (this.length < len) {
                        this.source.addItemAt(null, this.length);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        ArrayCollection.prototype.get = function (key, receiver) {
            return this.source.getItemAt(+key);
        };
        ArrayCollection.prototype.set = function (key, value, receiver) {
            key = +key;
            if (key >= this.length)
                this.source.addItemAt(value, key);
            else
                this.source.replaceItemAt(value, key);
        };
        ArrayCollection.prototype[Symbol.iterator] = function () {
            return ArrayCollectionIterator.create(this);
        };
        ArrayCollection.prototype.getItemAt = function (index) {
            return this.source.getItemAt(index);
        };
        ArrayCollection.prototype.getItemIndex = function (item) {
            return this.indexOf(item);
        };
        ArrayCollection.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            var _a;
            (_a = this.source.addEventListener).call.apply(_a, __spread([this.source], arguments));
        };
        ArrayCollection.prototype.once = function (type, listener, thisObject, useCapture, priority) {
            var _a;
            (_a = this.source.once).call.apply(_a, __spread([this.source], arguments));
        };
        ArrayCollection.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
            var _a;
            (_a = this.source.removeEventListener).call.apply(_a, __spread([this.source], arguments));
        };
        ArrayCollection.prototype.hasEventListener = function (type) {
            var _a;
            return (_a = this.source.hasEventListener).call.apply(_a, __spread([this.source], arguments));
        };
        ArrayCollection.prototype.dispatchEvent = function (event) {
            var _a;
            return (_a = this.source.dispatchEvent).call.apply(_a, __spread([this.source], arguments));
        };
        ArrayCollection.prototype.willTrigger = function (type) {
            var _a;
            return (_a = this.source.willTrigger).call.apply(_a, __spread([this.source], arguments));
        };
        Object.defineProperty(ArrayCollection.prototype, "$hashCode", {
            get: function () {
                return this.source.$hashCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayCollection.prototype, "hashCode", {
            get: function () {
                return this.source.hashCode;
            },
            enumerable: true,
            configurable: true
        });
        ArrayCollection.create = function () {
            ArrayCollection.lock = false;
            var a = new Proxy(new ArrayCollection(), {
                get: function (target, key, receiver) {
                    try {
                        if (!(key instanceof Symbol) && (+key) + '' === key)
                            return target.get(key, receiver);
                    }
                    catch (e) {
                    }
                    return Reflect.get(target, key, receiver);
                },
                set: function (target, key, value, receiver) {
                    try {
                        if ((+key) + '' === key)
                            return target.set(key, value, receiver);
                    }
                    catch (e) {
                    }
                    return Reflect.set(target, key, value, receiver);
                }
            });
            ArrayCollection.lock = true;
            return a;
        };
        ArrayCollection.lock = true;
        return ArrayCollection;
    }());
    egretExtend.ArrayCollection = ArrayCollection;
    /**
     * @internal
     * 遍历器
     */
    var ArrayCollectionIterator = /** @class */ (function () {
        function ArrayCollectionIterator() {
            this.__nextObject = { "done": false, "value": null };
        }
        ArrayCollectionIterator.prototype.next = function () {
            var list = this.list;
            if (this.__nextIndex < list.length) {
                this.__nextObject.done = false;
                this.__nextObject.value = list[this.__nextIndex++];
                return this.__nextObject;
            }
            this.__nextObject.value = null;
            this.__nextObject.done = true;
            this.list = null;
            ArrayCollectionIterator.release(this);
            return this.__nextObject;
        };
        ArrayCollectionIterator.release = function (iterator) {
            ArrayCollectionIterator.pools.push(iterator);
        };
        ArrayCollectionIterator.create = function (list) {
            var iterator = ArrayCollectionIterator.pools.length ? ArrayCollectionIterator.pools.pop() : new ArrayCollectionIterator();
            iterator.__nextIndex = 0;
            iterator.list = list;
            return iterator;
        };
        ArrayCollectionIterator.pools = [];
        return ArrayCollectionIterator;
    }());
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var records = {};
    var start = false;
    egretExtend.autoload = function (name, exmlClass, clearFunction, params) {
        if (clearFunction === void 0) { clearFunction = "close"; }
        // if (!orange.debug) return;
        if (name == null) {
            orange["getAutoloadClassName"](function (className) {
                name = className;
                if (!exmlClass)
                    exmlClass = name + "Skin";
                if (typeof exmlClass == 'string') {
                    $autoloadSkin(name, exmlClass);
                }
                else if (exmlClass instanceof Array) {
                    exmlClass.forEach(function (exml) { return $autoloadSkin(name, exml); });
                }
            });
        }
        else {
            if (typeof exmlClass == 'string') {
                $autoloadSkin(name, exmlClass);
            }
            else if (exmlClass instanceof Array) {
                exmlClass.forEach(function (exml) { return $autoloadSkin(name, exml); });
            }
        }
        return orange.autoload(name, clearFunction, params);
    };
    /**
     * 链接自动装载，在此文件改变时可以重新装载新的文件，并重新运行标记为 name 的类（如果已经在运行的话）
     * @param name
     */
    egretExtend.autoloadLink = function (name, exmlClass) {
        // if (!orange.debug) return;
        if (typeof exmlClass == 'string') {
            $autoloadSkin(name, exmlClass);
        }
        else if (exmlClass instanceof Array) {
            exmlClass.forEach(function (exml) { return $autoloadSkin(name, exml); });
        }
    };
    function $autoloadSkin(name, exmlClass) {
        orange.autoloadLink(name);
        records[exmlClass] = name;
        // records[url] = name;
        if (!start) {
            start = true;
            var c = setInterval(function () {
                if (orange.native.isReady()) {
                    clearInterval(c);
                    (new orange.native.File('./resource')).watch(function (url, content) {
                        if (!content) {
                            return;
                        }
                        if (content.charCodeAt(0) == 65279) {
                            content = content.slice(1, content.length);
                        }
                        var url = url.split('?')[0];
                        var end = url.split('.')[url.split('.').length - 1];
                        if (end == 'exml') {
                            var find = content.match(/class="[_|a-zA-Z.]+[a-zA-Z0-9.]*"/);
                            if (find && find.length) {
                                content = content.replace(find[0], find[0].slice(0, find[0].length - 1) + ~~(Math.random() * 1000000000) + '"');
                                find = find[0].match(/"[_|a-zA-Z.]+[a-zA-Z0-9.]*"/);
                                var clazz = find[0].slice(1, find[0].length - 1);
                                if (clazz) {
                                    orange.BreakUtil.break("编译皮肤: " + url);
                                    try {
                                        var euiclazz = (new eui.sys.EXMLParser()).parse(content);
                                        orange.GetUtil.setFromGlobal(clazz, euiclazz);
                                        if (records[clazz]) {
                                            orange.loadlink(records[clazz]);
                                        }
                                        else if (records[url]) {
                                            orange.loadlink(records[url]);
                                        }
                                    }
                                    catch (e) {
                                        console.log('[autoload error]', e);
                                    }
                                }
                            }
                        }
                    });
                }
            }, 16);
        }
    }
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    /**
     * 绑定某个数据
     * @deprecated
     * @param target
     * @param key
     * @param baseDescriptor
     */
    egretExtend.bind = (function (bindKey) {
        orange.APIUtil.deprecatedTip('egretExtend.bind', 1543464755206);
        return function (target, key, baseDescriptor) {
            orange.addAutorun(target, function () {
                this[key] = this[bindKey];
            });
            return baseDescriptor;
        };
    });
    /**
     * 绑定并抛出事件
     * @deprecated
     */
    egretExtend.bind.emit = (function (bindKey) {
        orange.APIUtil.deprecatedTip('egretExtend.bind.emit', 1543464755206);
        return function (target, key, baseDescriptor) {
            orange.addAutorun(target, function () {
                this[key] = this[bindKey];
                orange.emitWith(this, key, this[bindKey]);
            });
            return baseDescriptor;
        };
    });
    /**
     * @egretExtend.render 是 @orange.autorun 的扩展功能，在对象添加到舞台上并且 skin 加载完成时才开始响应，对象从舞台移除时停止响应
     * @param target
     * @param key
     * @param baseDescriptor
     */
    function render(target, key, baseDescriptor) {
        orange.autorunExtend(target, key, function (thisObj, start, stop) {
            if (thisObj instanceof egret.DisplayObject) {
                thisObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, stop, thisObj);
                if (thisObj instanceof eui.Component) {
                    thisObj.addEventListener(eui.UIEvent.COMPLETE, function () {
                        if (thisObj.stage && thisObj.skin)
                            start();
                    }, thisObj);
                    thisObj.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                        if (thisObj.stage && thisObj.skin)
                            start();
                    }, thisObj);
                    if (thisObj.stage && thisObj.skin)
                        start();
                }
                else {
                    thisObj.addEventListener(egret.Event.ADDED_TO_STAGE, start, thisObj);
                    if (thisObj.stage)
                        start();
                }
            }
            else {
                throw 'render 只能修饰显示对象(egret.DisplayObject)';
            }
        });
        return baseDescriptor;
    }
    egretExtend.render = render;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var Component = /** @class */ (function () {
        function Component() {
            /**
             * @internal
             */
            this.$hasStart = false;
        }
        Component.prototype.destory = function () {
        };
        return Component;
    }());
    egretExtend.Component = Component;
    var componentSymbol = Symbol('egret component');
    function addComponent(obj, type) {
        if (!obj) {
            var cs_1 = obj[componentSymbol] = new Array();
            obj.addEventListener(egret.Event.ENTER_FRAME, function () {
                cs_1.forEach(function (c) {
                    c.$hasStart === false && (c.$hasStart = true) && c.start && c.start();
                    c.update && c.update();
                });
            }, this);
        }
        var components = obj[componentSymbol];
        var c = new type();
        c.owner = obj;
        c.awake && c.awake();
    }
    egretExtend.addComponent = addComponent;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    /**
     * 返回毫秒 (保留小数点后面3位)
     */
    function now() {
        return Date.now();
        var t;
        if (window["wx"]) {
            t = getPerformance().now();
            if (getSystemInfoSync().platform != "devtools") {
                t = t / 1000;
            }
        }
        else {
            t = performance.now();
        }
        t = (~~(t * 1000)) / 1000;
        return t;
    }
    egretExtend.now = now;
    /**
     * @internal
     */
    function now2() {
        var t;
        if (window["wx"]) {
            t = getPerformance().now();
            if (getSystemInfoSync().platform != "devtools") {
                t = t / 1000;
            }
        }
        else {
            t = performance.now();
        }
        t = (~~(t * 1000)) / 1000;
        return t;
    }
    egretExtend.now2 = now2;
    function start() {
        try {
            getStage();
        }
        catch (e) {
            console.warn('[orange egret debug error]', e);
        }
    }
    var $info = null;
    /**
     * @interface
     */
    function getSystemInfoSync() {
        if (!$info) {
            $info = window["wx"].getSystemInfoSync();
        }
        return $info;
    }
    var $perfermance;
    function getPerformance() {
        if (!$perfermance) {
            if (window["wx"] && window["wx"].getPerformance) {
                $perfermance = window["wx"].getPerformance();
            }
            else {
                $perfermance = performance;
            }
        }
        return $perfermance;
    }
    /**
     * @interface
     */
    function getStage() {
        //$onAddToStage(stage: Stage, nestLevel: number)
        var old = egret.DisplayObject.prototype.$onAddToStage;
        egret.DisplayObject.prototype.$onAddToStage = function (stage, nestLevel) {
            old.call(this, stage, nestLevel);
            if (stage && !egretExtend.egretStage) {
                egretExtend.egretStage = this.stage;
                egretExtend.startDebugImage();
                egret.DisplayObject.prototype.$onAddToStage = old;
            }
        };
    }
    var $hasStartDebug = false;
    function $startDebug() {
        if ($hasStartDebug)
            return;
        $hasStartDebug = true;
        try {
            if (orange.debug) {
                egretExtend.startDebugCall();
                egretExtend.startDebugDraw();
            }
        }
        catch (e) {
            console.warn('[orange egret debug error]', e);
        }
    }
    egretExtend.$startDebug = $startDebug;
    start();
})(egretExtend || (egretExtend = {}));
/**
 * @internal
 */
var egretExtend;
(function (egretExtend) {
    var DebugMiddleWin = /** @class */ (function (_super) {
        __extends(DebugMiddleWin, _super);
        function DebugMiddleWin() {
            var _this = _super.call(this) || this;
            _this.graphics.beginFill(0, 0.7);
            _this.graphics.drawRect(0, 0, 100, 60);
            _this.graphics.endFill();
            _this.fpsLabel = new egret.TextField();
            _this.fpsLabel.size = 18;
            _this.fpsLabel.x = 3;
            _this.fpsLabel.y = 3;
            _this.addChild(_this.fpsLabel);
            _this.hashLabel = new egret.TextField();
            _this.hashLabel.size = 18;
            _this.hashLabel.x = 3;
            _this.hashLabel.y = 33;
            _this.addChild(_this.hashLabel);
            return _this;
        }
        Object.defineProperty(DebugMiddleWin.prototype, "fps", {
            set: function (str) {
                this.fpsLabel.text = 'fps : ' + str;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugMiddleWin.prototype, "hashCount", {
            set: function (str) {
                this.hashLabel.text = 'obj : ' + str;
            },
            enumerable: true,
            configurable: true
        });
        return DebugMiddleWin;
    }(egret.Sprite));
    egretExtend.DebugMiddleWin = DebugMiddleWin;
})(egretExtend || (egretExtend = {}));
/**
 * @internal
 */
var egretExtend;
(function (egretExtend) {
    var DebugMinWin = /** @class */ (function (_super) {
        __extends(DebugMinWin, _super);
        function DebugMinWin() {
            var _this = _super.call(this) || this;
            _this.showIndex = 0;
            new egretExtend.DragController(_this);
            var gp = new eui.Group();
            _this.addChild(gp);
            var rect = new eui.Rect();
            rect.fillAlpha = 0.7;
            rect.fillColor = 0;
            rect.left = rect.right = rect.top = rect.bottom = 0;
            gp.addChild(rect);
            var ct = new eui.Group();
            gp.addChild(ct);
            ct.addChild(_this.list = new eui.List());
            var layout = ct.layout = new eui.HorizontalLayout();
            layout.paddingLeft = 10;
            layout.paddingRight = 10;
            layout.paddingTop = 10;
            layout.paddingBottom = 10;
            layout.gap = 10;
            _this.list.itemRenderer = ShowItem;
            _this.data = new eui.ArrayCollection();
            _this.list.dataProvider = _this.data;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egretExtend.$startDebug();
            }, _this);
            return _this;
        }
        DebugMinWin.prototype.reset = function () {
            this.showIndex = 0;
        };
        DebugMinWin.prototype.show = function (name, content) {
            var ind = this.showIndex;
            this.showIndex++;
            if (ind >= this.data.length) {
                this.data.addItem(new ShowItemData());
            }
            this.data.getItemAt(ind).name = name;
            this.data.getItemAt(ind).content = content;
        };
        return DebugMinWin;
    }(egret.Sprite));
    egretExtend.DebugMinWin = DebugMinWin;
    var ShowItemData = /** @class */ (function () {
        function ShowItemData() {
        }
        __decorate([
            orange.watch
        ], ShowItemData.prototype, "name", void 0);
        __decorate([
            orange.watch
        ], ShowItemData.prototype, "content", void 0);
        return ShowItemData;
    }());
    var ShowItem = /** @class */ (function (_super) {
        __extends(ShowItem, _super);
        function ShowItem() {
            var _this = _super.call(this) || this;
            _this.skinName = null;
            var gp = _this.gp_container = new eui.Group();
            _this.addChild(gp);
            gp.addChild(_this.lb_name = new eui.Label());
            gp.addChild(_this.lb_content = new eui.Label());
            _this.lb_name.size = _this.lb_content.size = 20;
            var layout = gp.layout = new eui.HorizontalLayout();
            layout.gap = 15;
            _this.height = 25;
            return _this;
        }
        ShowItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            for (var i = 0; i < this.numChildren; i++) {
                if (this.getChildAt(i) != this.gp_container) {
                    this.removeChildAt(i);
                    i--;
                }
            }
        };
        ShowItem.prototype.render = function () {
            if (!this.data)
                return;
            this.lb_name.text = this.data.name;
            this.lb_content.text = this.data.content;
        };
        __decorate([
            orange.watch
        ], ShowItem.prototype, "data", void 0);
        __decorate([
            orange.render
        ], ShowItem.prototype, "render", null);
        ShowItem = __decorate([
            orange.observer
        ], ShowItem);
        return ShowItem;
    }(eui.ItemRenderer));
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var Debug = /** @class */ (function (_super) {
        __extends(Debug, _super);
        function Debug() {
            var _this = _super.call(this) || this;
            _this.fpsList = [];
            /**
             * @internal
             */
            _this._updateShowCalls = new Set();
            _this.addChild(_this.min = new egretExtend.DebugMinWin());
            _this.addChild(_this.egretDebug = new egretExtend.EgretDebug());
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                var now = Date.now();
                _this.egretDebug.start(now);
                _this.lastTime = now;
                _this.fpsList.length = 0;
                _this.lastSecondFps = 0;
                _this.lastSecondFpsCount = 0;
                _this.lastSecondTime = now;
                // this.min.fps = '';
                // this.min.hashCount = '';
                _this.min.reset();
                _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
            }, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.removeEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
            }, _this);
            return _this;
        }
        Debug.prototype.update = function () {
            var _this = this;
            var now = Date.now();
            this.egretDebug.update(now);
            var gap = now - this.lastTime;
            var fps = (~~((1000 / gap) * 10)) / 10 + '';
            if (fps.indexOf('.') == -1)
                fps += '.0';
            this.fpsList.push(fps);
            if (this.fpsList.length > this.stage.stageWidth)
                this.fpsList.shift();
            this.lastTime - now;
            this.lastSecondFpsCount++;
            if (now - this.lastSecondTime > 1000) {
                this.min.reset();
                this.updateSecondFps(now);
                this._updateShowCalls.forEach(function (call) { return call(_this.show.bind(_this), _this.lastSecondFpsCount); });
                this.lastSecondFpsCount = 0;
                this.lastSecondTime = now;
            }
            // this.min.hashCount = this.egretDebug.lastHashCount + '';
        };
        Debug.prototype.updateSecondFps = function (now) {
            this.lastSecondFps = this.lastSecondFpsCount * 1000 / (now - this.lastSecondTime);
            var fps = (~~(this.lastSecondFps * 10)) / 10 + '';
            if (fps.indexOf('.') == -1)
                fps += '.0';
            // this.min.fps = fps;
            this.min.show('fps', fps);
        };
        Debug.prototype.show = function (name, content) {
            this.min.show(name, content);
        };
        Debug.show = function () {
            if (!Debug.ist) {
                Debug.ist = new Debug();
            }
            if (!egretExtend.getStage())
                throw '没有找到 stage，请调用 orange.start({"stage":?})，传入的 stage 参数为白鹭的舞台';
            egretExtend.getStage().addChild(Debug.ist);
        };
        Debug.showAll = function () {
            egretExtend.$startDebug();
        };
        Debug.hide = function () {
            if (Debug.ist && Debug.ist.parent) {
                Debug.ist.parent.removeChild(Debug.ist);
            }
        };
        /**
         * @internal
         * @param call
         */
        Debug.updateShow = function (call) {
            if (!Debug.ist) {
                Debug.ist = new Debug();
            }
            Debug.ist._updateShowCalls.add(call);
        };
        return Debug;
    }(egret.Sprite));
    egretExtend.Debug = Debug;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var EgretDebug = /** @class */ (function (_super) {
        __extends(EgretDebug, _super);
        function EgretDebug() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EgretDebug.prototype.start = function (now) {
        };
        EgretDebug.prototype.update = function (now) {
        };
        Object.defineProperty(EgretDebug.prototype, "lastHashCount", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        return EgretDebug;
    }(egret.Sprite));
    egretExtend.EgretDebug = EgretDebug;
    function filterDisplay(filer, display) {
        display = display || egretExtend.egretStage;
        var list = [];
        var f = function (display, stack) {
            if (stack === void 0) { stack = 0; }
            var _a = __read(filer(display, stack), 2), scanChild = _a[0], addSum = _a[1];
            if (addSum)
                list.push(display);
            if (!scanChild)
                return;
            if (display instanceof egret.DisplayObjectContainer) {
                for (var i = 0; i < display.numChildren; i++) {
                    f(display.getChildAt(i), stack + 1);
                }
            }
        };
        f(display);
        return list;
    }
    egretExtend.filterDisplay = filterDisplay;
    function displaySum(type) {
        var display = egretExtend.egretStage;
        var sum = 0;
        var list = [];
        var f = function (display) {
            if (display instanceof egret.Stage) {
                if (display instanceof egret.DisplayObjectContainer) {
                    for (var i = 0; i < display.numChildren; i++) {
                        f(display.getChildAt(i));
                    }
                }
                return;
            }
            if (!display.visible)
                return;
            if (!type || type && (display instanceof type)) {
                list.push(display);
                sum++;
            }
            if (display instanceof egret.DisplayObjectContainer) {
                for (var i = 0; i < display.numChildren; i++) {
                    f(display.getChildAt(i));
                }
            }
        };
        f(display);
        return list;
    }
    egretExtend.displaySum = displaySum;
    function displayTouchSum() {
        var display = egretExtend.egretStage;
        var sum = 0;
        var f = function (display) {
            if (!display.visible)
                return;
            if (display.touchEnabled) {
                sum++;
            }
            if (display instanceof egret.DisplayObjectContainer && display.touchChildren) {
                for (var i = 0; i < display.numChildren; i++) {
                    f(display.getChildAt(i));
                }
            }
        };
        f(display);
        console.log(sum);
        return sum;
    }
    egretExtend.displayTouchSum = displayTouchSum;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var $debug = false;
    /**
     * @internal
     */
    egretExtend.callInfo = {
        timeSum: 0,
        callLater: 0,
        enterFrame: 0,
        tick: 0,
        tween: 0
    };
    function getStack() {
        try {
            var a;
            a.b++;
        }
        catch (e) {
            return e.stack + '';
        }
    }
    /**
     * @internal
     */
    function startDebugCall() {
        $debug = true;
        egretExtend.Debug.updateShow(function (show, frame) {
            show('call', ((~~(egretExtend.callInfo.timeSum * 10 / frame)) / 10) + 'ms');
            show('enterFrame', ((~~(egretExtend.callInfo.enterFrame * 10 / frame)) / 10) + 'ms');
            show('callLater', ((~~(egretExtend.callInfo.callLater * 10 / frame)) / 10) + 'ms');
            show('tick', ((~~(egretExtend.callInfo.tick * 10 / frame)) / 10) + 'ms');
            show('tween', ~~(egretExtend.callInfo.tween / frame) + '');
            egretExtend.callInfo.timeSum = 0;
            egretExtend.callInfo.enterFrame = 0;
            egretExtend.callInfo.callLater = 0;
            egretExtend.callInfo.tick = 0;
            egretExtend.callInfo.tween = 0;
        });
        (function () {
            var $setInterval = window.setInterval;
            window.setInterval = function (call, timeGap) {
                var stack = getStack();
                var r = $setInterval(function () {
                    if ($debug) {
                        var s = egretExtend.now();
                        var startTime;
                        var sflag = showNextCallInfo;
                        if (sflag)
                            startTime = egretExtend.now2();
                        call();
                        if (sflag)
                            calls.push({ time: egretExtend.now2() - startTime, stack: stack });
                        egretExtend.callInfo.timeSum += egretExtend.now() - s;
                    }
                    else {
                        var startTime;
                        var sflag = showNextCallInfo;
                        if (sflag)
                            startTime = egretExtend.now2();
                        call();
                        if (sflag)
                            calls.push({ time: egretExtend.now2() - startTime, stack: stack });
                    }
                }, timeGap);
                return r;
            };
            var $setTimeout = window.setTimeout;
            window.setTimeout = function (call, timeGap) {
                var stack = getStack();
                var r = $setTimeout(function () {
                    if ($debug) {
                        var s = egretExtend.now();
                        var startTime;
                        var sflag = showNextCallInfo;
                        if (sflag)
                            startTime = egretExtend.now2();
                        call();
                        if (sflag)
                            calls.push({ time: egretExtend.now2() - startTime, stack: stack });
                        egretExtend.callInfo.timeSum += egretExtend.now() - s;
                    }
                    else {
                        var startTime;
                        var sflag = showNextCallInfo;
                        if (sflag)
                            startTime = egretExtend.now2();
                        call();
                        if (sflag)
                            calls.push({ time: egretExtend.now2() - startTime, stack: stack });
                    }
                }, timeGap);
                return r;
            };
            var $requestAnimationFrame = window.requestAnimationFrame;
            var calls = [];
            window.requestAnimationFrame = function (call) {
                var stack = getStack();
                var r = $requestAnimationFrame(function () {
                    if ($debug) {
                        var s = egretExtend.now();
                        if (showNextCallInfo == 1) {
                            showNextCallInfo--;
                            var all = 0;
                            calls.forEach(function (item) { return all += item.time; });
                            calls.sort(function (a, b) { return b.time - a.time; });
                            // for (var i = 0; i < 3 && i < calls.length; i++) {
                            //   console.log(calls[i].time + 'ms', 'allTime:', all + 'ms', '\n', calls[i].stack);
                            // }
                        }
                        var startTime;
                        if (showNextCallInfo == 2) {
                            startTime = egretExtend.now2();
                        }
                        call();
                        if (showNextCallInfo == 2) {
                            calls.push({ time: egretExtend.now2() - startTime, stack: stack });
                            showNextCallInfo--;
                        }
                        egretExtend.callInfo.timeSum += egretExtend.now() - s;
                    }
                    else {
                        if (showNextCallInfo == 1) {
                            showNextCallInfo--;
                            var all = 0;
                            calls.forEach(function (item) { return all += item.time; });
                            calls.sort(function (a, b) { return b.time - a.time; });
                            for (var i = 0; i < 3 && i < calls.length; i++) {
                                console.log(calls[i].time + 'ms', 'allTime:', all + 'ms', '\n', calls[i].stack);
                            }
                        }
                        var startTime;
                        if (showNextCallInfo == 2) {
                            startTime = egretExtend.now2();
                        }
                        call();
                        if (showNextCallInfo == 2) {
                            calls.push({ time: egretExtend.now2() - startTime, stack: stack });
                            showNextCallInfo--;
                        }
                    }
                });
                return r;
            };
            var showNextCallInfo = 0;
            orange.Command.register('callinfo.list', function () {
                calls = [];
                showNextCallInfo = 2;
            }, "查看下一帧排名前三的 call");
            var tweenTick = egret.Tween.prototype.$tick;
            egret.Tween.prototype.$tick = function () {
                egretExtend.callInfo.tween++;
                tweenTick.apply(this, arguments);
            };
            egret.sys.SystemTicker.prototype.update = function () {
                var lastTime;
                var t1 = egret.getTimer();
                var callBackList = this.callBackList;
                var thisObjectList = this.thisObjectList;
                var length = callBackList.length;
                var requestRenderingFlag = egret.sys.$requestRenderingFlag;
                var timeStamp = egret.getTimer();
                var contexts = egret.lifecycle.contexts;
                for (var _i = 0, contexts_1 = contexts; _i < contexts_1.length; _i++) {
                    var c = contexts_1[_i];
                    if (c.onUpdate) {
                        c.onUpdate();
                    }
                }
                if (this.isPaused) {
                    this.lastTimeStamp = timeStamp;
                    return;
                }
                if (orange.debug) {
                    lastTime = egretExtend.now2();
                    this.callLaterAsyncs();
                    var time = egretExtend.now2();
                    egretExtend.callInfo.callLater += time - lastTime;
                    lastTime = time;
                }
                else {
                    this.callLaterAsyncs();
                }
                if (orange.debug) {
                    lastTime = egretExtend.now2();
                    for (var i = 0; i < length; i++) {
                        if (callBackList[i].call(thisObjectList[i], timeStamp)) {
                            requestRenderingFlag = true;
                        }
                    }
                    var time = egretExtend.now2();
                    egretExtend.callInfo.tick += time - lastTime;
                    lastTime = time;
                }
                else {
                    for (var i = 0; i < length; i++) {
                        if (callBackList[i].call(thisObjectList[i], timeStamp)) {
                            requestRenderingFlag = true;
                        }
                    }
                }
                var t2 = egret.getTimer();
                var deltaTime = timeStamp - this.lastTimeStamp;
                this.lastTimeStamp = timeStamp;
                if (deltaTime >= this.frameDeltaTime) {
                    this.lastCount = this.frameInterval;
                }
                else {
                    this.lastCount -= 1000;
                    if (this.lastCount > 0) {
                        if (requestRenderingFlag) {
                            this.render(false, this.costEnterFrame + t2 - t1);
                        }
                        return;
                    }
                    this.lastCount += this.frameInterval;
                }
                this.render(true, this.costEnterFrame + t2 - t1);
                var t3 = egret.getTimer();
                if (orange.debug) {
                    lastTime = egretExtend.now2();
                    this.broadcastEnterFrame();
                    var time = egretExtend.now2();
                    egretExtend.callInfo.enterFrame += time - lastTime;
                    lastTime = time;
                }
                else {
                    this.broadcastEnterFrame();
                }
                var t4 = egret.getTimer();
                this.costEnterFrame = t4 - t3;
            };
        })();
    }
    egretExtend.startDebugCall = startDebugCall;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var findDisplayTexture;
    var displaysTexture;
    function findDisplaysWithTexture(texture) {
        findDisplayTexture = texture;
        displaysTexture = [];
        requestAnimationFrame(function () {
            findDisplayTexture = null;
            window["displaysTexture"] = displaysTexture;
            console.log("window.displaysTexture:", displaysTexture);
            displaysTexture = null;
        });
    }
    egretExtend.findDisplaysWithTexture = findDisplaysWithTexture;
    /**
     * @internal
     */
    function startDebugDraw() {
        var ctx = egretExtend.egretPlatform.WebGLRenderContext.getInstance();
        var gl = ctx.context;
        var oldDrawElements = gl.drawElements.bind(gl);
        var drawTime = 0;
        var maxDraw = null;
        var maxDrawTime = 0;
        gl.drawElements = function (type, size) {
            drawTriSize += size;
            drawTriCount++;
            var startTime = egretExtend.now();
            oldDrawElements.apply(gl, arguments);
            var gap = egretExtend.now() - startTime;
            drawTime += gap;
            if (gap > maxDrawTime) {
                maxDrawTime = gap;
                maxDraw = { "type": type, "size": size };
            }
        };
        var drawTriCount = 0;
        var drawTriSize = 0;
        var sysRender = egret.sys.systemRenderer;
        var $oldRender = sysRender.render;
        var $first = false;
        var $buffer;
        var renderTime = 0;
        var drawWebGLFlag = false;
        var drawGLTime = 0;
        var renderGraphics = 0;
        sysRender.render = function (displayObject, buffer) {
            if (!drawWebGLFlag) {
                drawWebGLFlag = true;
                (function () {
                    var $drawWebGL = buffer.context.$drawWebGL;
                    buffer.context.$drawWebGL = function () {
                        var start = egretExtend.now();
                        // $drawWebGL.apply(buffer.context, arguments);
                        {
                            if (this.drawCmdManager.drawDataLen == 0 || this.contextLost) {
                                return;
                            }
                            this.uploadVerticesArray(this.vao.getVertices());
                            // 有mesh，则使用indicesForMesh
                            if (this.vao.isMesh()) {
                                this.uploadIndicesArray(this.vao.getMeshIndices());
                            }
                            var length = this.drawCmdManager.drawDataLen;
                            var offset = 0;
                            var records = showNextDrawInfo ? [] : null;
                            var startTime = null;
                            for (var i = 0; i < length; i++) {
                                if (showNextDrawInfo)
                                    startTime = egretExtend.now2();
                                var data = this.drawCmdManager.drawData[i];
                                // if (data.texture) {
                                //   var texInfo = DebugImage.textures.get(data.texture);
                                //   if (texInfo.type == TextureType.GRAPHICS) {
                                //     renderGraphics++;
                                //   }
                                // }
                                offset = this.drawData(data, offset);
                                // 计算draw call
                                if (data.type == 7 /* ACT_BUFFER */) {
                                    this.activatedBuffer = data.buffer;
                                }
                                if (data.type == 0 /* TEXTURE */ || data.type == 1 /* RECT */ || data.type == 2 /* PUSH_MASK */ || data.type == 3 /* POP_MASK */) {
                                    if (this.activatedBuffer && this.activatedBuffer.$computeDrawCall) {
                                        this.activatedBuffer.$drawCalls++;
                                    }
                                }
                                if (showNextDrawInfo) {
                                    var info = {
                                        'time': egretExtend.now2() - startTime,
                                        'type': {
                                            "0": "drawTexture", "2": "pushMask", "3": "popMask",
                                            "4": "setBlend", "5": "resize", "6": "clearColor",
                                            "7": "activeBuffer", "8": "EnableScissor", "9": "disableScissor",
                                            "10": "smoothing"
                                        }[data.type],
                                        'textureType': egretExtend.DebugImage.textures.get(data.texture) ? egretExtend.DebugImage.textures.get(data.texture).type : "undefined"
                                    };
                                    if (info.textureType == egretExtend.TextureType.TEXT)
                                        info.text = egretExtend.DebugImage.textures.get(data.texture) ? egretExtend.DebugImage.textures.get(data.texture).text : "unknow";
                                    else
                                        info.textureURL = egretExtend.DebugImage.textures.get(data.texture) ? egretExtend.DebugImage.textures.get(data.texture).url : "undefined";
                                    var more = {
                                        'count': data.count,
                                        'width': data.width,
                                        'height': data.height,
                                        'uv': data.uv,
                                        'texture': data.texture
                                    };
                                    for (var k in more)
                                        info[k] = more[k];
                                    records.push(info);
                                }
                            }
                            if (showNextDrawInfo) {
                                var cmds = "";
                                var t = 0;
                                records.forEach(function (item) { t += item.time; cmds += item.type + ' '; });
                                // records.sort((a, b) => b.time - a.time)
                                showNextDrawInfo = false;
                                window["renderCmds"] = records;
                                console.log("总耗时:" + t, cmds, "\n所有命令 window.renderCmds =", records);
                            }
                            // 切换回默认indices
                            if (this.vao.isMesh()) {
                                this.uploadIndicesArray(this.vao.getIndices());
                            }
                            // 清空数据
                            this.drawCmdManager.clear();
                            this.vao.clear();
                        }
                        drawGLTime += egretExtend.now() - start;
                    };
                })();
            }
            var start = egretExtend.now();
            $first = true;
            $buffer = buffer;
            $oldRender.apply(sysRender, arguments);
            $first = false;
            renderTime += egretExtend.now() - start;
            if (egretExtend.DebugImage.debugTexImageFlag) {
                egretExtend.DebugImage.debugTexImageFlag = false;
                window['teximages'] = egretExtend.DebugImage.debugTexImage.concat();
                console.log('window.teximages = \n', JSON.stringify(egretExtend.DebugImage.debugTexImage, null, 2));
                egretExtend.DebugImage.debugTexImage.length = 0;
            }
        };
        var $oldDrawDisplayObject = sysRender.drawDisplayObject;
        var lastDrawCmd = null;
        var drawDisplayTime = 0;
        var curDrawDisplayObject;
        var initDrawCmdManager = false;
        var textures;
        sysRender.drawDisplayObject = function (displayObject) {
            var sflag;
            var flag = $first;
            $first = false;
            curDrawDisplayObject = displayObject;
            if (!initDrawCmdManager) {
                initDrawCmdManager = true;
                (function () {
                    var $pushDrawTexture = $buffer.context.drawCmdManager.pushDrawTexture;
                    $buffer.context.drawCmdManager.pushDrawTexture = function (texture) {
                        if (findDisplayTexture == texture) {
                            displaysTexture.push(curDrawDisplayObject);
                        }
                        $pushDrawTexture.apply($buffer.context.drawCmdManager, arguments);
                    };
                })();
            }
            if (flag) {
                sflag = showGraphics;
                if (sflag) {
                    renderGraphicList = new Set();
                }
            }
            $oldDrawDisplayObject.apply(sysRender, arguments);
            if (flag) {
                var start = egretExtend.now();
                lastDrawCmd = $buffer.context.drawCmdManager.drawData;
                drawDisplayTime += egretExtend.now() - start;
                if (sflag) {
                    window["graphicsList"] = renderGraphicList;
                    console.log('window.graphicsList : ', renderGraphicList);
                    renderGraphicList = null;
                    showGraphics = false;
                }
            }
            curDrawDisplayObject = null;
        };
        var renderGraphicList;
        var $oldRenderGraphics = sysRender.renderGraphics;
        var renderGraphics2 = 0;
        sysRender.renderGraphics = function (node) {
            var width = node.width;
            var height = node.height;
            if (width <= 0 || height <= 0 || !width || !height || node.drawData.length == 0) {
            }
            else {
                renderGraphics2++;
                if (showGraphics) {
                    renderGraphicList.add(curDrawDisplayObject);
                }
            }
            $oldRenderGraphics.apply(sysRender, arguments);
        };
        // var callLaterTime = 0;
        // var oldCallLaterAsyncs = egret.sys.SystemTicker.prototype["callLaterAsyncs"];
        // egret.sys.SystemTicker.prototype["callLaterAsyncs"] = function () {
        //   var start = now2();
        //   oldCallLaterAsyncs.apply(this, arguments);
        //   callLaterTime += now2() - start;
        // }
        // var enterFrameTime = 0;
        // var oldBroadcastEnterFrame = egret.sys.SystemTicker.prototype["broadcastEnterFrame"];
        // egret.sys.SystemTicker.prototype["broadcastEnterFrame"] = function () {
        //   var start = now2();
        //   oldBroadcastEnterFrame.apply(this, arguments);
        //   enterFrameTime += now2() - start;
        // }
        var lastTexSum = 0;
        var lastTexTimeSum = 0;
        var lastTexImage = 0;
        var lastTexImageTime = 0;
        // var lastCallLaterTime = 0;
        // var lastEnterFrameTime = 0;
        egretExtend.Debug.updateShow(function (show, frame) {
            // show('callLater', ((~~(lastCallLaterTime * 10 / frame))/10) + 'ms');
            // show('enterFrame', ((~~(lastEnterFrameTime * 10 / frame))/10) + 'ms');
            // show('drawCall', ~~(drawTime / frame) + 'ms');
            show('render', ((~~(renderTime * 10 / frame)) / 10) + 'ms');
            // show('drawDisplay', ~~(drawDisplayTime / frame) + 'ms');
            // show('drawWebGL', ~~(drawGLTime / frame) + 'ms');
            show('drawCall', ~~(drawTriCount / frame) + '');
            show('drawTri', ~~(drawTriSize / (3 * frame)) + '  ' + ~~(drawTriSize / (frame * 6)));
            show('texs', egretExtend.DebugImage.textures.size + '  ' + (~~(egretExtend.DebugImage.getTextureMem() / (1024 * 1024))) + 'MB  ' + (~~(egretExtend.DebugImage.getTextureMoreMem() / (1024 * 1024))) + 'MB');
            show('newTex', ~~(egretExtend.DebugImage.textureSum - lastTexSum) + '  ' + ((~~(egretExtend.DebugImage.textureTimeSum - lastTexTimeSum)) / 10) + 'ms');
            show('texImage', ~~(egretExtend.DebugImage.texImageSum - lastTexImage) + '  ' + ((~~(egretExtend.DebugImage.texImageTimeSum - lastTexImageTime)) / 10) + 'ms');
            show('container', egretExtend.displaySum(egret.Sprite).length + '/' + egretExtend.displaySum().length);
            // show('renderGraphics', ~~(renderGraphics / frame) + '');
            // show('renderGraphics2', ~~(renderGraphics2 / frame) + '');
            // lastCallLaterTime = 0;
            // lastEnterFrameTime = 0;
            renderTime = 0;
            drawGLTime = 0;
            drawDisplayTime = 0;
            drawTime = 0;
            drawTriCount = 0;
            drawTriSize = 0;
            lastTexSum = egretExtend.DebugImage.textureSum;
            lastTexTimeSum = egretExtend.DebugImage.textureTimeSum;
            lastTexImage = egretExtend.DebugImage.texImageSum;
            lastTexImageTime = egretExtend.DebugImage.texImageTimeSum;
            renderGraphics = 0;
            renderGraphics2 = 0;
        });
        var showGraphics = false;
        orange.Command.register('drawinfo.graphics', function () {
            showGraphics = true;
        }, "查看下一帧渲染的所有矢量图节点");
        var showNextDrawInfo = false;
        orange.Command.register('drawinfo.list', function () {
            showNextDrawInfo = true;
        }, "查看下一帧的全部耗时");
        orange.Command.register('drawinfo.teximage', function () {
            egretExtend.DebugImage.debugTexImageFlag = true;
            egretExtend.DebugImage.debugTexImage.length = 0;
        }, "查看下一帧渲染所有的 teximage 相关信息");
    }
    egretExtend.startDebugDraw = startDebugDraw;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var DebugImage = /** @class */ (function () {
        function DebugImage() {
            this.hasDispose = false;
            DebugImage.list.push(this);
        }
        DebugImage.prototype.toJSON = function () {
            return {
                image: this.image,
                url: this.url,
                width: this.width,
                height: this.height,
                texture: this.texture,
                bitmapData: this.bitmapData
            };
        };
        DebugImage.prototype.initWithImage = function (image) {
            var _this = this;
            DebugImage.imageSum++;
            DebugImage.images.set(image, this);
            this.image = image;
            var d = setInterval(function () {
                if (!_this.url || !_this.width || !_this.hasDispose) {
                    if (!_this.url && image.src) {
                        _this.url = image.src;
                        // console.log('image src:', this.url);
                    }
                    if (!_this.width && image.width) {
                        _this.width = image.width;
                        _this.height = image.height;
                        // console.log('image size:', this.url, this.width, this.height);
                    }
                    // 无用，因为微信中 image.src 只要赋值，获取出来就不会被再是 ""
                    // if (this.url && (image.src == null || image.src == "")) {
                    //   clearInterval(d);
                    //   this.hasDispose = true;
                    //   console.log('销毁 image:', this.url, this.width, this.height);
                    // }
                }
            }, 10);
            var callDispose = false;
            var df = image.dispose = function () {
                if (!_this.hasDispose) {
                    clearInterval(d);
                    _this.disposeImage();
                }
                if (!callDispose) {
                    callDispose = true;
                    if (image.remove)
                        image.remove();
                    else if (image.destroy)
                        image.destroy();
                    else
                        image.src = "";
                }
            };
            setTimeout(function () {
                if (image.dispose != df)
                    image.dispose = df;
            }, 0);
            if (image.remove) {
                var f = image.remove;
                image.remove = function () {
                    if (!_this.hasDispose) {
                        clearInterval(d);
                        _this.disposeImage();
                    }
                    f.call(image);
                };
            }
            if (image.destroy) {
                var f = image.destroy;
                image.destroy = function () {
                    if (!_this.hasDispose) {
                        clearInterval(d);
                        _this.disposeImage();
                    }
                    f.call(image);
                };
            }
            return image;
            //拦截器在微信上有 bug : egret-extend.js? [sm]:649 Uncaught (in promise) TypeError: Illegal invocation
            // 只要加了 Proxy 就不行了
            // return new Proxy(image, {
            //   set: function (target, key, value, receiver) {
            //     if (key == 'src') {
            //       this.url = value;
            //       console.log('image src:', value);
            //     }
            //     if (key == 'onload') {
            //       console.log('onload:', value);
            //     }
            //     return Reflect.set(target, key, value, receiver);
            //   }
            // });
        };
        DebugImage.prototype.disposeImage = function () {
            DebugImage.images.delete(this.image);
            this.hasDispose = true;
            this.image = null;
            // console.log('销毁 image:', this.url, this.width, this.height);
        };
        DebugImage.getTextureMem = function () {
            var mem = 0;
            DebugImage.textures.forEach(function (item) { return mem += memSize(item.width, item.height) * 4; });
            return mem;
        };
        DebugImage.getTextureMoreMem = function () {
            var mem = 0;
            var mem2 = 0;
            DebugImage.textures.forEach(function (item) { return mem += memSize(item.width, item.height) * 4; });
            DebugImage.textures.forEach(function (item) { return mem2 += item.width * item.height * 4; });
            return mem - mem2;
        };
        /**
         * @internal
         */
        DebugImage.list = [];
        /**
            * @internal
            */
        DebugImage.images = new Map();
        /**
         * @internal
         */
        DebugImage.bitmapdatas = new Map();
        /**
            * @internal
            */
        DebugImage.textures = new Map();
        /**
            * @internal
            */
        DebugImage.imageSum = 0;
        /**
        * @internal
        * 创建的纹理累计
        */
        DebugImage.textureSum = 0;
        /**
         * @internal
         * 创建纹理耗时
         */
        DebugImage.textureTimeSum = 0;
        /**
        * @internal
        */
        DebugImage.imageTextureSum = 0;
        DebugImage.texImageSum = 0;
        /**
         * @internal
         */
        DebugImage.texImageTimeSum = 0;
        /**
         * @internal
         */
        DebugImage.debugTexImageFlag = false;
        /**
         * @internal
         */
        DebugImage.debugTexImage = [];
        return DebugImage;
    }());
    egretExtend.DebugImage = DebugImage;
    var TextureInfo = /** @class */ (function () {
        function TextureInfo(type, url) {
            if (url === void 0) { url = ''; }
            this.width = 0;
            this.height = 0;
            this.update = 0;
            this.text = "";
            this.type = type;
            this.url = url;
        }
        TextureInfo.prototype.toJSON = function () {
            return {
                type: this.type,
                url: this.url,
                width: this.width,
                height: this.height,
                update: this.update
            };
        };
        return TextureInfo;
    }());
    /**
     * @internal
     */
    var TextureType;
    (function (TextureType) {
        TextureType["IMG"] = "img";
        TextureType["TEXT"] = "text";
        TextureType["GRAPHICS"] = "graphics";
        TextureType["GROUP"] = "group";
        TextureType["MESH"] = "mesh_node";
        TextureType["NORMAL_IMG"] = "normal_img";
        TextureType["RENDER_TARGET"] = "render_target";
        TextureType["UNKNOW"] = "unknow";
    })(TextureType = egretExtend.TextureType || (egretExtend.TextureType = {}));
    orange.Command.register('meminfo', function (filter) {
        var images = new Map();
        var textures = new Map();
        DebugImage.images.forEach(function (v, k) { return (filter ? filter(v.url) : true) && images.set(k, v.toJSON()); });
        DebugImage.textures.forEach(function (v, k) { return (filter ? filter(v.url) : true) && textures.set(k, v.toJSON()); });
        var info = getMemInfo(images, textures);
        info.list.splice(0, 0, ['index', 'wx.img', 'imgW', 'imgH', 'tex-type', 'tex', 'texW', 'texH', 'update', 'mem(MB)', 'moreMem(MB)', 'url']);
        console.log(orange.StringUtil.tableToString(info.list));
        console.log("img\u4E2A\u6570:" + info.imgsum + " img\u50CF\u7D20:" + info.imgsize + " tex\u4E2A\u6570:" + info.texsum + " tex\u50CF\u7D20:" + info.texsize + " mem(MB):" + info.mem + " moreMem(MB):" + info.moreMem);
    }, '打印内存信息 参考 http://wiki.hortorgames.com/orange/innter-command/内置命令');
    var $meminfoRecord = null;
    orange.Command.register('meminfo.record', function () {
        var info = {
            "images": new Map(),
            "textures": new Map()
        };
        DebugImage.images.forEach(function (v, k) { return info.images.set(k, v.toJSON()); });
        DebugImage.textures.forEach(function (v, k) { return info.textures.set(k, v.toJSON()); });
        $meminfoRecord = info;
    });
    orange.Command.register('meminfo.diff', function (filter) {
        var oldInfo = $meminfoRecord;
        var lessImages = new Map();
        var moreImages = new Map();
        var lessTextures = new Map();
        var moreTextures = new Map();
        oldInfo.images.forEach(function (v, k) { return (filter ? filter(v.url) : true) && !DebugImage.images.has(k) && lessImages.set(k, v); });
        DebugImage.images.forEach(function (v, k) { return (filter ? filter(v.url) : true) && !oldInfo.images.has(k) && moreImages.set(k, v); });
        oldInfo.textures.forEach(function (v, k) { return (filter ? filter(v.url) : true) && !DebugImage.textures.has(k) && lessTextures.set(k, v); });
        DebugImage.textures.forEach(function (v, k) { return (filter ? filter(v.url) : true) && !oldInfo.textures.has(k) && moreTextures.set(k, v); });
        var lessInfo = getMemInfo(lessImages, lessTextures, oldInfo.textures);
        console.log('减少的内存为:');
        lessInfo.list.splice(0, 0, ['index', 'wx.img', 'imgW', 'imgH', 'tex-type', 'tex', 'texW', 'texH', 'update', 'mem(MB)', 'moreMem(MB)', 'url']);
        console.log(orange.StringUtil.tableToString(lessInfo.list));
        console.log("img\u4E2A\u6570:" + lessInfo.imgsum + " img\u50CF\u7D20:" + lessInfo.imgsize + " tex\u4E2A\u6570:" + lessInfo.texsum + " tex\u50CF\u7D20:" + lessInfo.texsize + " mem(MB):" + lessInfo.mem + " moreMem(MB):" + lessInfo.mem);
        var moresInfo = getMemInfo(moreImages, moreTextures, DebugImage.textures);
        console.log(' ');
        console.log('增加的内存为:');
        moresInfo.list.splice(0, 0, ['index', 'wx.img', 'imgW', 'imgH', 'tex-type', 'tex', 'texW', 'texH', 'update', 'mem(MB)', 'moreMem(MB)', 'url']);
        console.log(orange.StringUtil.tableToString(moresInfo.list));
        console.log("img\u4E2A\u6570:" + moresInfo.imgsum + " img\u50CF\u7D20:" + moresInfo.imgsize + " tex\u4E2A\u6570:" + moresInfo.texsum + " tex\u50CF\u7D20:" + moresInfo.texsize + " mem(MB):" + moresInfo.mem + " moreMem(MB):" + moresInfo.mem);
        console.log(' ');
        console.log("\u5408\u8BA1 img\u4E2A\u6570:" + (moresInfo.imgsum - lessInfo.imgsum) + " img\u50CF\u7D20:" + (moresInfo.imgsize -
            lessInfo.imgsize) + " tex\u4E2A\u6570:" + (moresInfo.texsum - lessInfo.texsum) + " tex\u50CF\u7D20:" + (moresInfo.texsize -
            lessInfo.texsize) + "  mem(MB):" + (moresInfo.mem - lessInfo.mem) + " moreMem(MB):" + (moresInfo.moreMem - lessInfo.moreMem));
        //先找 oldList 有，而
        // console.log(orange.StringUtil.tableToString(info.list));
        // console.log(`[meminfo.record] img个数:${info.imgsum} img像素:${info.imgsize} tex个数:${info.texsum} tex像素:${info.texsize}`);
    });
    /**
     * @internal
     */
    egretExtend.startImageDebug = function () {
        var oldDrawImage = egretExtend.egretPlatform.WebGLRenderContext.prototype.drawImage;
        egretExtend.egretPlatform.WebGLRenderContext.prototype.drawImage = function (bitmapData) {
            if (bitmapData.source && !DebugImage.bitmapdatas.has[bitmapData]) {
                DebugImage.list.forEach(function (item) {
                    if (item.image == bitmapData.source) {
                        item.bitmapData = bitmapData;
                        DebugImage.bitmapdatas.set(bitmapData, item);
                        // console.log('找到 image bitmapData', bitmapData, item)
                    }
                });
            }
            oldDrawImage.apply(this, arguments);
        };
        var lastCreateTexture;
        var oldCreateTexture = egretExtend.egretPlatform.WebGLRenderContext.getInstance().context.createTexture.bind(egretExtend.egretPlatform.WebGLRenderContext.getInstance().context);
        egretExtend.egretPlatform.WebGLRenderContext.getInstance().context.createTexture = function () {
            var time = egretExtend.now();
            var tex = oldCreateTexture.call(null);
            // console.log('[orange tip] 创建纹理', tex)
            var info = new TextureInfo($curRenderType);
            if ($curRenderType == TextureType.RENDER_TARGET) {
                info.width = $curRenderWidth;
                info.height = $curRenderHeight;
            }
            if (!DebugImage.textures.has(tex)) {
                DebugImage.textures.set(tex, info);
            }
            $curDebugImageTexture = tex;
            lastCreateTexture = tex;
            DebugImage.textureSum++;
            DebugImage.textureTimeSum += egretExtend.now() - time;
            return tex;
        };
        var oldCreateTexture2 = egretExtend.egretPlatform.WebGLRenderContext.prototype.createTexture;
        egretExtend.egretPlatform.WebGLRenderContext.prototype.createTexture = function (bitmapData) {
            lastCreateTexture = null;
            var tex = oldCreateTexture2.call(this, bitmapData);
            if (lastCreateTexture == tex) {
                if (bitmapData)
                    DebugImage.textures.get(tex).width = bitmapData.width;
                if (bitmapData)
                    DebugImage.textures.get(tex).height = bitmapData.height;
            }
            return tex;
        };
        var oldDeleteTexture = egretExtend.egretPlatform.WebGLRenderContext.getInstance().context.deleteTexture.bind(egretExtend.egretPlatform.WebGLRenderContext.getInstance().context);
        egretExtend.egretPlatform.WebGLRenderContext.getInstance().context.deleteTexture = function (tex) {
            // console.log('orange 删除纹理', tex)
            DebugImage.textures.delete(tex);
            oldDeleteTexture.call(null, tex);
        };
        var bindTexture = null;
        var oldBindTexture = egretExtend.egretPlatform.WebGLRenderContext.getInstance().context.bindTexture.bind(egretExtend.egretPlatform.WebGLRenderContext.getInstance().context);
        egretExtend.egretPlatform.WebGLRenderContext.getInstance().context.bindTexture = function (type, tex) {
            bindTexture = tex;
            oldBindTexture.call(null, type, tex);
        };
        var oldTexImage2D = egretExtend.egretPlatform.WebGLRenderContext.getInstance().context.texImage2D.bind(egretExtend.egretPlatform.WebGLRenderContext.getInstance().context);
        egretExtend.egretPlatform.WebGLRenderContext.getInstance().context.texImage2D = function () {
            // bindTexture = tex;
            var time = egretExtend.now();
            if (bindTexture) {
                if (arguments.length == 6 && arguments[5].width) {
                    if (DebugImage.textures.get(bindTexture)) {
                        DebugImage.textures.get(bindTexture).width = arguments[5].width;
                        DebugImage.textures.get(bindTexture).height = arguments[5].height;
                    }
                }
                if (DebugImage.textures.get(bindTexture)) {
                    DebugImage.textures.get(bindTexture).update++;
                }
                if (inRenderText) {
                    DebugImage.textures.get(bindTexture).text = renderTextContent;
                }
                if (DebugImage.debugTexImageFlag) {
                    var info = DebugImage.textures.get(bindTexture);
                    DebugImage.debugTexImage.push({
                        type: info.type,
                        url: info.url,
                        text: info.text,
                        update: info.update,
                        width: info.width,
                        height: info.height,
                        texture: bindTexture
                    });
                }
            }
            oldTexImage2D.apply(null, arguments);
            DebugImage.texImageSum++;
            DebugImage.texImageTimeSum += egretExtend.now() - time;
        };
        var inRenderText = false;
        var renderTextContent = '';
        var oldRenderText = egretExtend.egretPlatform.WebGLRenderer.prototype.renderText;
        egretExtend.egretPlatform.WebGLRenderer.prototype.renderText = function (node, buffer) {
            $curRenderType = TextureType.TEXT;
            inRenderText = true;
            renderTextContent = node.drawData[2];
            oldRenderText.call(this, node, buffer);
            inRenderText = false;
        };
        var oldRenderGraphics = egretExtend.egretPlatform.WebGLRenderer.prototype.renderGraphics;
        egretExtend.egretPlatform.WebGLRenderer.prototype.renderGraphics = function (node, buffer) {
            $curRenderType = TextureType.GRAPHICS;
            oldRenderGraphics.call(this, node, buffer);
        };
        var oldRenderMesh = egretExtend.egretPlatform.WebGLRenderer.prototype.renderMesh;
        egretExtend.egretPlatform.WebGLRenderer.prototype.renderMesh = function (node, buffer) {
            $curRenderType = TextureType.MESH;
            oldRenderMesh.call(this, node, buffer);
        };
        var oldRenderNormalBitmap = egretExtend.egretPlatform.WebGLRenderer.prototype.renderNormalBitmap;
        egretExtend.egretPlatform.WebGLRenderer.prototype.renderNormalBitmap = function () {
            $curRenderType = TextureType.IMG;
            var tex = oldRenderNormalBitmap.apply(this, arguments);
            return tex;
        };
        var oldCreateTextureRT = egretExtend.egretPlatform.WebGLRenderTarget.prototype.createTexture;
        egretExtend.egretPlatform.WebGLRenderTarget.prototype.createTexture = function () {
            $curRenderType = TextureType.RENDER_TARGET;
            $curRenderWidth = this.width;
            $curRenderHeight = this.height;
            var tex = oldCreateTextureRT.call(this);
            return tex;
        };
    };
    function getMemInfo(sourceImages, sourceTextures, allTextures) {
        if (allTextures === void 0) { allTextures = null; }
        var list = [];
        var images = new Set();
        var textures = new Set();
        sourceImages.forEach(function (dimg) {
            var tex = (allTextures || sourceTextures).get(dimg.texture);
            list.push([
                dimg.image ? '1' : '0',
                dimg.width,
                dimg.height,
                dimg.texture ? tex.type : '',
                dimg.texture ? '1' : '0',
                dimg.texture ? tex.width : '',
                dimg.texture ? tex.height : '',
                dimg.texture ? tex.update : '',
                memSize(dimg.image && dimg.width ? dimg.width : 0, dimg.image && dimg.width ? dimg.height : 0) * 4 / (1024 * 1024),
                memSize(dimg.image && dimg.width ? dimg.width : 0, dimg.image && dimg.width ? dimg.height : 0) * 4 / (1024 * 1024) -
                    sourceMemSize(dimg.image && dimg.width ? dimg.width : 0, dimg.image && dimg.width ? dimg.height : 0) * 4 / (1024 * 1024),
                dimg.url
            ]);
            images.add(dimg.image);
            textures.add(dimg.texture);
        });
        sourceTextures.forEach(function (texInfo, texture) {
            if (!textures.has(texture)) {
                list.push([
                    '0',
                    texInfo.width,
                    texInfo.height,
                    texInfo.type,
                    '1',
                    texInfo.width,
                    texInfo.height,
                    texInfo.update,
                    memSize(texInfo.width ? texInfo.width : 0, texInfo.height ? texInfo.height : 0) * 4 / (1024 * 1024),
                    memSize(texInfo.width ? texInfo.width : 0, texInfo.height ? texInfo.height : 0) * 4 / (1024 * 1024) -
                        sourceMemSize(texInfo.width ? texInfo.width : 0, texInfo.height ? texInfo.height : 0) * 4 / (1024 * 1024),
                    texInfo.url
                ]);
            }
        });
        list.forEach(function (item, index) { return item.splice(0, 0, index); });
        list.sort(function (a, b) { return a[4].length - b[4].length; });
        list.forEach(function (item, index) { return item[0] = index; });
        var imgsum = 0;
        var imgsize = 0;
        var texsum = 0;
        var texsize = 0;
        var mem = 0;
        var moreMem = 0;
        //['index', 'wx.img', 'imgW', 'imgH', 'tex-type', 'tex', 'texW', 'texH', 'url']
        for (var i = 0; i < list.length; i++) {
            if (list[i][1] == '1') {
                imgsum++;
                list[i][2] && (imgsize += list[i][2] * list[i][3]);
            }
            if (list[i][5] == '1') {
                texsum++;
                list[i][6] && (texsize += list[i][6] * list[i][7]);
            }
            list[i][9] = ~~(list[i][9] * 1000) / 1000;
            list[i][10] = ~~(list[i][10] * 1000) / 1000;
            mem += list[i][9];
            moreMem += list[i][10];
            if (!list[i][11])
                list[i][11] = '';
        }
        return {
            imgsum: imgsum,
            imgsize: imgsize,
            texsum: texsum,
            texsize: texsize,
            mem: ~~(mem * 100) / 100,
            moreMem: ~~(moreMem * 100) / 100,
            list: list
        };
    }
    function memSize(width, height) {
        var size = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 9182];
        for (var i = 0; i < size.length; i++) {
            if (width <= size[i]) {
                width = size[i];
                break;
            }
        }
        for (var i = 0; i < size.length; i++) {
            if (height <= size[i]) {
                height = size[i];
                break;
            }
        }
        return width * height;
    }
    function sourceMemSize(width, height) {
        return width * height;
    }
    var $curRenderType = TextureType.UNKNOW;
    var $curRenderWidth;
    var $curRenderHeight;
    var $curDebugImageTexture = null;
    /**
     * @internal
     * @param bitmapData
     */
    egretExtend.startCreateTexture = function (bitmapData) {
        // console.log('创建 texture', bitmapData)
        if (!egretExtend.debugImage)
            return;
        $curDebugImageTexture = null;
    };
    /**
     * @internal
     * @param bitmapData
     */
    egretExtend.finishCreateTexture = function (bitmapData) {
        // console.log('创建完成 texture', bitmapData)
        if (!egretExtend.debugImage)
            return;
        var dimage = DebugImage.bitmapdatas.get(bitmapData);
        if (dimage && !dimage.texture) {
            dimage.texture = bitmapData.webGLTexture;
            var info = DebugImage.textures.get(dimage.texture);
            info.url = dimage.url;
            info.type = TextureType.IMG;
            DebugImage.imageTextureSum++;
        }
        if (dimage && $curDebugImageTexture && $curDebugImageTexture != dimage.texture) {
            console.warn('[orange debug] 没有找到纹理对应的创建者');
        }
        $curDebugImageTexture = null;
    };
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    /**
     * @internal
     */
    egretExtend.debugImage = false;
    /**
     * @internal
     */
    egretExtend.egretPlatform = null;
    /**
     * @internal
     */
    function startDebugImage() {
        // if (!window['wx']) return;
        if (window['wx'] && egret['wxgame']) {
            egretExtend.egretPlatform = egret['wxgame'];
            if (!orange.debug)
                return;
            egretExtend.debugImage = true;
            window['wx'] = new Proxy(window['wx'], {
                get: function (target, key, receiver) {
                    var res = Reflect.get(target, key, receiver);
                    if (!orange.debug)
                        return res;
                    if (key == 'createImage')
                        res = createImage(res);
                    return res;
                }
            });
        }
        else if (egret['web']) {
            egretExtend.egretPlatform = egret['web'];
            if (!orange.debug)
                return;
            egretExtend.debugImage = true;
            var loadImage = egret['web']['WebImageLoader'].prototype.loadImage;
            egret['web']['WebImageLoader'].prototype.loadImage = function (src) {
                var image = createImage(function () { return new Image(); })();
                this.data = null;
                this.currentImage = image;
                if (this._hasCrossOriginSet) {
                    if (this._crossOrigin) {
                        image.crossOrigin = this._crossOrigin;
                    }
                }
                else {
                    if (egret['web']['WebImageLoader'].crossOrigin) {
                        image.crossOrigin = egret['web']['WebImageLoader'].crossOrigin;
                    }
                }
                /*else {
                    if (image.hasAttribute("crossOrigin")) {//兼容猎豹
                        image.removeAttribute("crossOrigin");
                    }
                }*/
                image.onload = this.onImageComplete.bind(this);
                image.onerror = this.onLoadError.bind(this);
                image.src = src;
            };
            egret.BitmapData.create = function (type, data, callback) {
                var base64 = "";
                if (type === "arraybuffer") {
                    base64 = egret.Base64Util.encode(data);
                }
                else {
                    base64 = data;
                }
                var imageType = "image/png"; //default value
                if (base64.charAt(0) === '/') {
                    imageType = "image/jpeg";
                }
                else if (base64.charAt(0) === 'R') {
                    imageType = "image/gif";
                }
                else if (base64.charAt(0) === 'i') {
                    imageType = "image/png";
                }
                var img;
                if (loadComplete) {
                    img = createImage(function () { return new Image(); })();
                }
                else {
                    img = new Image();
                }
                img.src = "data:" + imageType + ";base64," + base64;
                if (loadComplete) {
                    egretExtend.DebugImage.images.get(img).url = loadURL;
                }
                img.crossOrigin = '*';
                var bitmapData = new egret.BitmapData(img);
                img.onload = function () {
                    img.onload = undefined;
                    bitmapData.source = img;
                    bitmapData.height = img.height;
                    bitmapData.width = img.width;
                    if (callback) {
                        callback(bitmapData);
                    }
                };
                return bitmapData;
            };
            var loadComplete = false;
            var loadURL = "";
            var RES = window["RES"];
            RES.Resource.prototype.getResByUrl = function (url, compFunc, thisObject, type) {
                var _this = this;
                if (type === void 0) {
                    type = "";
                }
                var r = RES.config.getResource(url);
                if (!r) {
                    if (!type) {
                        type = RES.config.__temp__get__type__via__url(url);
                    }
                    // manager.config.addResourceData({ name: url, url: url });
                    r = { name: url, url: url, type: type, root: '', extra: 1 };
                    RES.config.addResourceData(r);
                    r = RES.config.getResource(url);
                    if (!r) {
                        throw 'never';
                    }
                }
                return RES.queue.pushResItem(r).then(function (value) {
                    RES.host.save(r, value);
                    if (compFunc && r) {
                        loadComplete = true;
                        loadURL = r.url;
                        compFunc.call(thisObject, value, r.url);
                        loadComplete = false;
                    }
                    return value;
                }, function (error) {
                    RES.host.remove(r);
                    RES.ResourceEvent.dispatchResourceEvent(_this, RES.ResourceEvent.ITEM_LOAD_ERROR, "", r);
                    if (compFunc) {
                        compFunc.call(thisObject, null, url);
                        return Promise.reject(null);
                    }
                    return Promise.reject(error);
                });
            };
        }
        egretExtend.startImageDebug();
    }
    egretExtend.startDebugImage = startDebugImage;
    /**
     *
     * @param img 创建微信 image
     */
    function createImage(f) {
        return function () {
            var img = f();
            return (new egretExtend.DebugImage()).initWithImage(img);
        };
    }
})(egretExtend || (egretExtend = {}));
/**
 * @internal
 */
var egretExtend;
(function (egretExtend) {
    var DecodeDisplay = /** @class */ (function () {
        function DecodeDisplay() {
        }
        DecodeDisplay.decodeDisplay = function (root, cfg) {
            var define = orange.GetUtil.getFromGlobal(cfg.type);
            var display = new define();
            DecodeDisplay.decodeProperties(display, cfg.properties);
            DecodeDisplay.decodeChildren(root, display, cfg.children);
            return display;
        };
        DecodeDisplay.decodeChildren = function (root, ui, children) {
            children.forEach(function (child) {
                var display = DecodeDisplay.decodeDisplay(root, child);
                ui.addChild(display);
                if (child.properties.id) {
                    root[child.properties.id] = display;
                }
            });
        };
        DecodeDisplay.decodeProperties = function (ui, properties) {
            for (var k in properties) {
                ui[k] = properties[k];
            }
        };
        DecodeDisplay.decode = function (ui, cfg) {
            DecodeDisplay.decodeProperties(ui, cfg.properties);
            DecodeDisplay.decodeChildren(ui, ui, cfg.children);
        };
        return DecodeDisplay;
    }());
    egretExtend.DecodeDisplay = DecodeDisplay;
})(egretExtend || (egretExtend = {}));
/**
 * @internal
 */
var egretExtend;
(function (egretExtend) {
    var DecodeTween = /** @class */ (function () {
        function DecodeTween() {
        }
        DecodeTween.decode = function (ui, cfg) {
            var tweens = [];
            var info = { hasSetWidth: false, hasSetHeight: false };
            cfg.forEach(function (itemCfg) {
                var tween = new egretExtend.TweenGroup();
                tweens.push(tween);
                tween.display = ui;
                tween.groups = tweens;
                tween.info = info;
                var time = 0;
                if (itemCfg.id) {
                    ui[itemCfg.id] = tween;
                }
                itemCfg.items.forEach(function (cfg2) {
                    var tweenItem = DecodeTween.decodeTweenItem(ui, cfg2);
                    tweenItem.tween = tween;
                    tween.pushItem(tweenItem);
                    time = tweenItem.maxTime > time ? tweenItem.maxTime : time;
                });
                tween.maxTime = time;
            });
            return tweens;
        };
        DecodeTween.decodeTweenItem = function (ui, cfg) {
            var item = new egretExtend.TweenItem();
            var time = 0;
            item.init = cfg.init;
            cfg.items.forEach(function (itemCfg) {
                if (itemCfg.duration != null) {
                    item.items.push(DecodeTween.decodeTweenTo(itemCfg));
                }
                else {
                    item.items.push(DecodeTween.decodeTweenSet(itemCfg));
                }
            });
            item.items.forEach(function (t) {
                if (t.duration != null) {
                    time = t.time + t.duration > time ? t.time + t.duration : time;
                }
                else {
                    time = t.time > time ? t.time : time;
                }
            });
            item.maxTime = time;
            item.target = ui[cfg.target];
            item.targetName = cfg.target;
            return item;
        };
        DecodeTween.decodeTweenSet = function (cfg) {
            var item = {};
            for (var k in cfg) {
                item[k] = cfg[k];
            }
            return item;
        };
        DecodeTween.decodeTweenTo = function (cfg) {
            var item = {};
            for (var k in cfg) {
                item[k] = cfg[k];
            }
            return item;
        };
        return DecodeTween;
    }());
    egretExtend.DecodeTween = DecodeTween;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var EaseFunction = /** @class */ (function () {
        function EaseFunction() {
        }
        EaseFunction.None = function (t) {
            return t;
        };
        EaseFunction.SineEaseIn = function (t) {
            return Math.sin((t - 1) * Math.PI * .5) + 1;
        };
        EaseFunction.SineEaseOut = function (t) {
            return Math.sin(t * Math.PI * .5);
        };
        EaseFunction.SineEaseInOut = function (t) {
            return Math.sin((t - .5) * Math.PI) * .5 + .5;
        };
        EaseFunction.SineEaseOutIn = function (t) {
            if (t < 0.5) {
                return Math.sin(t * Math.PI) * .5;
            }
            return Math.sin((t - 1) * Math.PI) * .5 + 1;
        };
        EaseFunction.QuadEaseIn = function (t) {
            return t * t;
        };
        EaseFunction.QuadEaseOut = function (t) {
            return -(t - 1) * (t - 1) + 1;
        };
        EaseFunction.QuadEaseInOut = function (t) {
            if (t < .5) {
                return t * t * 2;
            }
            return -(t - 1) * (t - 1) * 2 + 1;
        };
        EaseFunction.QuadEaseOutIn = function (t) {
            var s = (t - .5) * (t - .5) * 2;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
        };
        EaseFunction.CubicEaseIn = function (t) {
            return t * t * t;
        };
        EaseFunction.CubicEaseOut = function (t) {
            return (t - 1) * (t - 1) * (t - 1) + 1;
        };
        EaseFunction.CubicEaseInOut = function (t) {
            if (t < .5) {
                return t * t * t * 4;
            }
            return (t - 1) * (t - 1) * (t - 1) * 4 + 1;
        };
        EaseFunction.CubicEaseOutIn = function (t) {
            return (t - .5) * (t - .5) * (t - .5) * 4 + .5;
        };
        EaseFunction.QuartEaseIn = function (t) {
            return t * t * t * t;
        };
        EaseFunction.QuartEaseOut = function (t) {
            var a = (t - 1);
            return -a * a * a * a + 1;
        };
        EaseFunction.QuartEaseInOut = function (t) {
            if (t < .5) {
                return t * t * t * t * 8;
            }
            var a = (t - 1);
            return -a * a * a * a * 8 + 1;
        };
        EaseFunction.QuartEaseOutIn = function (t) {
            var s = (t - .5) * (t - .5) * (t - .5) * (t - .5) * 8;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
        };
        EaseFunction.QuintEaseIn = function (t) {
            return t * t * t * t * t;
        };
        EaseFunction.QuintEaseOut = function (t) {
            var a = t - 1;
            return a * a * a * a * a + 1;
        };
        EaseFunction.QuintEaseInOut = function (t) {
            if (t < .5) {
                return t * t * t * t * t * 16;
            }
            var a = t - 1;
            return a * a * a * a * a * 16 + 1;
        };
        EaseFunction.QuintEaseOutIn = function (t) {
            var a = t - .5;
            return a * a * a * a * a * 16 + 0.5;
        };
        EaseFunction.ExpoEaseIn = function (t) {
            return Math.pow(2, 10 * (t - 1));
        };
        EaseFunction.ExpoEaseOut = function (t) {
            return -Math.pow(2, -10 * t) + 1;
        };
        EaseFunction.ExpoEaseInOut = function (t) {
            if (t < .5) {
                return Math.pow(2, 10 * (t * 2 - 1)) * .5;
            }
            return -Math.pow(2, -10 * (t - .5) * 2) * .5 + 1.00048828125;
        };
        EaseFunction.ExpoEaseOutIn = function (t) {
            if (t < .5) {
                return -Math.pow(2, -20 * t) * .5 + .5;
            }
            return Math.pow(2, 10 * ((t - .5) * 2 - 1)) * .5 + .5;
        };
        EaseFunction.CircEaseIn = function (t) {
            return 1 - Math.sqrt(1 - t * t);
        };
        EaseFunction.CircEaseOut = function (t) {
            return Math.sqrt(1 - (1 - t) * (1 - t));
        };
        EaseFunction.CircEaseInOut = function (t) {
            if (t < .5) {
                return .5 - Math.sqrt(.25 - t * t);
            }
            return Math.sqrt(.25 - (1 - t) * (1 - t)) + .5;
        };
        EaseFunction.CircEaseOutIn = function (t) {
            var s = Math.sqrt(.25 - (.5 - t) * (.5 - t));
            if (t < .5) {
                return s;
            }
            return 1 - s;
        };
        EaseFunction.BackEaseIn = function (t) {
            return 2.70158 * t * t * t - 1.70158 * t * t;
        };
        EaseFunction.BackEaseOut = function (t) {
            var a = t - 1;
            return 2.70158 * a * a * a + 1.70158 * a * a + 1;
        };
        EaseFunction.BackEaseInOut = function (t) {
            var a = t - 1;
            if (t < .5) {
                return 10.80632 * t * t * t - 3.40316 * t * t;
            }
            return 10.80632 * a * a * a + 3.40316 * a * a + 1;
        };
        EaseFunction.BackEaseOutIn = function (t) {
            var a = t - .5;
            if (t < .5) {
                return 10.80632 * a * a * a + 3.40316 * a * a + .5;
            }
            return 10.80632 * a * a * a - 3.40316 * a * a + .5;
        };
        EaseFunction.ElasticEaseIn = function (t) {
            if (t == 0 || t == 1)
                return t;
            return -(Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.075) * 2 * Math.PI / .3));
        };
        EaseFunction.ElasticEaseOut = function (t) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            return (Math.pow(2, 10 * -t) * Math.sin((-t - .075) * 2 * Math.PI / .3)) + 1;
        };
        EaseFunction.ElasticEaseInOut = function (t) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            if (t < .5) {
                return -(Math.pow(2, 10 * t - 10) * Math.sin((t * 2 - 2.15) * Math.PI / .3));
            }
            return (Math.pow(2, 10 - 20 * t) * Math.sin((-4 * t + 1.85) * Math.PI / .3)) * .5 + 1;
        };
        EaseFunction.ElasticEaseOutIn = function (t) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            if (t < .5) {
                return (Math.pow(2, -20 * t) * Math.sin((-t * 4 - .15) * Math.PI / .3)) * .5 + .5;
            }
            return -(Math.pow(2, 20 * (t - 1)) * Math.sin((t * 4 - 4.15) * Math.PI / .3)) * .5 + .5;
        };
        EaseFunction.bounceEaseIn = function (t) {
            return 1 - EaseFunction.bounceEaseOut(1 - t);
        };
        EaseFunction.bounceEaseOut = function (t) {
            var s;
            var a = 7.5625;
            var b = 2.75;
            if (t < (1 / 2.75)) {
                s = a * t * t;
            }
            else if (t < (2 / b)) {
                s = (a * (t - (1.5 / b)) * (t - (1.5 / b)) + .75);
            }
            else if (t < (2.5 / b)) {
                s = (a * (t - (2.25 / b)) * (t - (2.25 / b)) + .9375);
            }
            else {
                s = (a * (t - (2.625 / b)) * (t - (2.625 / b)) + .984375);
            }
            return s;
        };
        EaseFunction.BounceEaseInOut = function (t) {
            if (t < .5)
                return EaseFunction.bounceEaseIn(t * 2) * .5;
            else
                return EaseFunction.bounceEaseOut(t * 2 - 1) * .5 + .5;
        };
        EaseFunction.BounceEaseOutIn = function (t) {
            if (t < .5)
                return EaseFunction.bounceEaseOut(t * 2) * .5;
            else
                return EaseFunction.bounceEaseIn(t * 2 - 1) * .5 + .5;
        };
        EaseFunction.BounceEaseIn = EaseFunction.bounceEaseIn;
        EaseFunction.BounceEaseOut = EaseFunction.bounceEaseOut;
        return EaseFunction;
    }());
    egretExtend.EaseFunction = EaseFunction;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var EXML = /** @class */ (function () {
        function EXML() {
        }
        EXML.decode = function (ui, cfg) {
            egretExtend.DecodeDisplay.decode(ui, cfg.root);
            return egretExtend.DecodeTween.decode(ui, cfg.tweens);
        };
        return EXML;
    }());
    egretExtend.EXML = EXML;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var TweenGroup = /** @class */ (function (_super) {
        __extends(TweenGroup, _super);
        function TweenGroup() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * @internal
             */
            _this.items = [];
            /**
             * 播放速度，只在 updateSelf 为 true 时有用
             */
            _this.speed = 1;
            _this._isPlay = false;
            _this.update = function (dt) {
                if (!_this._isPlay)
                    return;
                if (!_this.plays) {
                    _this.plays = [];
                    _this.items.forEach(function (item, index) {
                        _this.plays[index] = true;
                    });
                }
                /**
                 * 因为每个 item 的时间长度不一样，如果最后一个不是最长的，那么它就提前完成了，最后一轮还没轮到它其它的就完成了
                 * 导致这一轮更新到最后一个的时候它的 time 又为 0 了，然后又开始播放了，这样它会多播放一帧
                 * 所以要把 isPlay 标识存起来，轮到它 update 的时候直接跳过
                 */
                _this.items.forEach(function (item, index) {
                    _this.plays[index] = item.isPlay;
                });
                _this.items.forEach(function (item, index) {
                    if (!_this.plays[index])
                        return;
                    item.update(dt);
                });
            };
            /**
             * @internal
             */
            _this.hasAdd = false;
            return _this;
        }
        /**
         * @internal
         */
        TweenGroup.prototype.pushItem = function (item) {
            this.items.push(item);
            item.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        };
        TweenGroup.prototype.stopAll = function () {
            this.groups.forEach(function (group) { return group.stop(); });
        };
        TweenGroup.prototype.resetAll = function () {
            this.groups.forEach(function (group) { return group.reset(); });
        };
        /**
         * @internal
         */
        TweenGroup.prototype.onComplete = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1, _a, _b, _c, item;
                return __generator(this, function (_d) {
                    try {
                        for (_b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                            item = _c.value;
                            if (item.isPlay)
                                return [2 /*return*/];
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    this._isPlay = false;
                    this.playLoopComplete(e.data);
                    this.dispatchEventWith(egret.Event.COMPLETE);
                    return [2 /*return*/];
                });
            });
        };
        TweenGroup.prototype.play = function (time) {
            this.groups.forEach(function (group) { return group.stop(); });
            this.playComplete = null;
            this.doPlay(time);
        };
        /**
         * @internal
         * @param time
         */
        TweenGroup.prototype.doPlay = function (time, reset) {
            var _this = this;
            if (reset === void 0) { reset = true; }
            reset && this.groups.forEach(function (group) { return group != _this && group.reset(); });
            this.reset();
            if (this.items.length == 0)
                return;
            this._isPlay = true;
            this.items.forEach(function (item) { return item.isPlay = true; });
            this.items.forEach(function (item) { return item.play(time, reset); });
        };
        Object.defineProperty(TweenGroup.prototype, "isPlay", {
            get: function () {
                return this._isPlay;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 从时间 0 开始循环播放多少次
         * @param loop 循环次数
         * @param complete
         */
        TweenGroup.prototype.playLoop = function (loop, reset) {
            var _this = this;
            if (loop === void 0) { loop = 1; }
            if (reset === void 0) { reset = true; }
            this.playComplete = null;
            reset && this.groups.forEach(function (group) { return group.stop(); });
            return new Promise(function (resolve) {
                _this.playComplete = resolve;
                _this.loop = loop;
                _this.doPlay(0, reset);
            });
        };
        /**
         * @internal
         */
        TweenGroup.prototype.playLoopComplete = function (reset) {
            if (this.playComplete) {
                this.loop--;
                if (this.loop == 0) {
                    var f = this.playComplete;
                    this.playComplete = null;
                    f();
                }
                else {
                    this.doPlay(0, reset);
                }
            }
        };
        /**
         * @internal
         */
        TweenGroup.prototype.reset = function () {
            this.items.forEach(function (item) { return item.reset(); });
        };
        TweenGroup.prototype.stop = function () {
            this.playComplete = null;
            this.items.forEach(function (item) { return item.stop(); });
        };
        /**
         * @internal
         */
        TweenGroup.prototype.innerUpdate = function () {
            if (this.updateCall)
                return;
            var now = Date.now();
            var gap = (now - this.lastTime) * this.speed;
            this.lastTime = now;
            this.update(gap);
        };
        /**
         * @internal
         */
        TweenGroup.prototype.startUpdate = function () {
            if (this.hasAdd == false) {
                this.hasAdd = true;
                if (this.updateCall) {
                    this.cancelUpdate = this.updateCall(this.update);
                }
                else {
                    this.lastTime = Date.now();
                    this.display.addEventListener(egret.Event.ENTER_FRAME, this.innerUpdate, this);
                }
            }
        };
        /**
         * @internal
         */
        TweenGroup.prototype.stopUpdate = function () {
            var e_2, _a;
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (item.isPlay) {
                        return;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (this.hasAdd) {
                this.hasAdd = false;
                if (this.updateCall) {
                    if (this.cancelUpdate)
                        this.cancelUpdate();
                    this.cancelUpdate = null;
                }
                else {
                    this.display.removeEventListener(egret.Event.ENTER_FRAME, this.innerUpdate, this);
                }
            }
        };
        return TweenGroup;
    }(egret.EventDispatcher));
    egretExtend.TweenGroup = TweenGroup;
})(egretExtend || (egretExtend = {}));
/**
 * @internal
 */
var egretExtend;
(function (egretExtend) {
    var TweenItem = /** @class */ (function (_super) {
        __extends(TweenItem, _super);
        function TweenItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * @internal
             */
            _this.items = [];
            _this.time = 0;
            _this.rotation = 0;
            return _this;
        }
        TweenItem.prototype.play = function (time, reset) {
            if (reset === void 0) { reset = true; }
            this.resetFlag = reset;
            this.isPlay = true;
            this.tween.startUpdate();
            this.update(0);
            if (time != null) {
                this.tweenTo = null;
                this.time = time;
                this.update(time);
            }
        };
        TweenItem.prototype.reset = function () {
            if (this.tween.info.hasSetWidth && this.init.width == null) {
                if (this.target instanceof eui.Image && this.target.texture) {
                    this.target.width = this.target.texture.textureWidth;
                }
            }
            if (this.tween.info.hasSetHeight && this.init.height == null) {
                if (this.target instanceof eui.Image && this.target.texture) {
                    this.target.height = this.target.texture.textureHeight;
                }
            }
            if (this.init.x == null) {
                this.target.x = 0;
            }
            if (this.init.y == null) {
                this.target.y = 0;
            }
            if (this.init.rotation == null) {
                this.target.rotation = 0;
            }
            if (this.init.scaleX == null) {
                this.target.scaleX = 1;
            }
            if (this.init.scaleY == null) {
                this.target.scaleY = 1;
            }
            if (this.init.alpha == null) {
                this.target.alpha = 1;
            }
            this.rotation = 0;
            for (var k in this.init) {
                if (k == 'rotation') {
                    this.rotation = this.init[k];
                }
                this.target[k] = this.init[k];
            }
        };
        TweenItem.prototype.pause = function () {
            this.isPlay = false;
            this.tween.stopUpdate();
        };
        TweenItem.prototype.stop = function () {
            this.pause();
        };
        /**
         * @internal
         * @param gap
         */
        TweenItem.prototype.update = function (gap) {
            var _this = this;
            if (!this.isPlay)
                return;
            if (this.maxTime == 0 && gap != 0 && this.time >= this.maxTime) {
                this.tweenTo = null;
                this.isPlay = false;
                this.time = 0;
                this.dispatchEventWith(egret.Event.COMPLETE, false, this.resetFlag);
                return;
            }
            var last = this.time;
            this.time += gap;
            if (this.time >= this.maxTime)
                this.time = this.maxTime;
            this.items.forEach(function (item, index) {
                // if (item.time >= last && item.time < this.time || item.time == last && item.time == this.time || item.time == this.maxTime && this.time == this.maxTime) {
                if (item.time > last && item.time <= _this.time || _this.time === 0 && item.time === 0) {
                    if (item.duration != null && (!_this.tweenTo || _this.items.indexOf(_this.tweenTo) != index)) {
                        if (_this.tweenTo) {
                            for (var k in _this.tweenStart) {
                                if (k == 'rotation') {
                                    _this.target[k] = _this.rotation = _this.tweenTo[k];
                                }
                                else {
                                    _this.target[k] = _this.tweenTo[k];
                                }
                            }
                        }
                        _this.tweenTo = item;
                        _this.tweenStart = {};
                        for (var k in item) {
                            if (k == 'time' || k == 'duration')
                                continue;
                            if (k == 'rotation')
                                _this.tweenStart[k] = _this.rotation;
                            else
                                _this.tweenStart[k] = _this.target[k];
                            if (k == 'width')
                                _this.tween.info.hasSetWidth = true;
                            if (k == 'height')
                                _this.tween.info.hasSetHeight = true;
                        }
                    }
                    else {
                        for (var k in item) {
                            if (k == 'time')
                                continue;
                            if (k == 'rotation') {
                                _this.rotation = item[k];
                            }
                            _this.target[k] = item[k];
                            if (k == 'width')
                                _this.tween.info.hasSetWidth = true;
                            if (k == 'height')
                                _this.tween.info.hasSetHeight = true;
                        }
                    }
                }
            });
            if (this.tweenTo) {
                var p = (this.time - this.tweenTo.time) / this.tweenTo.duration;
                var over = p >= 1;
                if (p > 1)
                    p = 1;
                var ease = TweenItem.eases[this.tweenTo.ease];
                ease && (p = ease(p));
                for (var k in this.tweenStart) {
                    if (k == 'rotation') {
                        this.target[k] = this.rotation = this.tweenStart[k] + (this.tweenTo[k] - this.tweenStart[k]) * p;
                    }
                    else {
                        this.target[k] = this.tweenStart[k] + (this.tweenTo[k] - this.tweenStart[k]) * p;
                    }
                }
                if (over)
                    this.tweenTo = null;
            }
            if (this.maxTime != 0 && this.time >= this.maxTime) {
                this.tweenTo = null;
                this.isPlay = false;
                this.time = 0;
                this.dispatchEventWith(egret.Event.COMPLETE, false, this.resetFlag);
            }
        };
        TweenItem.eases = {
            'none': egretExtend.EaseFunction.None,
            'quadIn': egretExtend.EaseFunction.QuadEaseIn,
            'quadOut': egretExtend.EaseFunction.QuadEaseOut,
            'quadInOut': egretExtend.EaseFunction.QuadEaseInOut,
            'cubicIn': egretExtend.EaseFunction.CubicEaseIn,
            'cubicOut': egretExtend.EaseFunction.CubicEaseOut,
            'cubicInOut': egretExtend.EaseFunction.CubicEaseInOut,
            'quartIn': egretExtend.EaseFunction.QuartEaseIn,
            'quartOut': egretExtend.EaseFunction.QuartEaseOut,
            'quartInOut': egretExtend.EaseFunction.QuartEaseInOut,
            'quintIn': egretExtend.EaseFunction.QuintEaseIn,
            'quintOut': egretExtend.EaseFunction.QuintEaseOut,
            'quintInOut': egretExtend.EaseFunction.QuintEaseInOut,
            'sineIn': egretExtend.EaseFunction.SineEaseIn,
            'sineOut': egretExtend.EaseFunction.SineEaseOut,
            'sineInOut': egretExtend.EaseFunction.SineEaseInOut,
            'backIn': egretExtend.EaseFunction.BackEaseIn,
            'backOut': egretExtend.EaseFunction.BackEaseOut,
            'backInOut': egretExtend.EaseFunction.BackEaseInOut,
            'circIn': egretExtend.EaseFunction.CircEaseIn,
            'circOut': egretExtend.EaseFunction.CircEaseOut,
            'circInOut': egretExtend.EaseFunction.CircEaseInOut,
            'bounceIn': egretExtend.EaseFunction.BounceEaseIn,
            'bounceOut': egretExtend.EaseFunction.BounceEaseOut,
            'bounceInOut': egretExtend.EaseFunction.BounceEaseInOut,
            'elasticIn': egretExtend.EaseFunction.ElasticEaseIn,
            'elasticOut': egretExtend.EaseFunction.ElasticEaseOut,
            'elasticInOut': egretExtend.EaseFunction.ElasticEaseInOut
        };
        return TweenItem;
    }(egret.EventDispatcher));
    egretExtend.TweenItem = TweenItem;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var TweenPlay = /** @class */ (function () {
        function TweenPlay() {
        }
        TweenPlay.play = function (tween, loop, complete) {
            if (loop === void 0) { loop = 1; }
            if (loop <= 0) {
                complete && complete();
                return;
            }
            tween.addEventListener(egret.Event.COMPLETE, function () {
            }, null);
        };
        return TweenPlay;
    }());
    egretExtend.TweenPlay = TweenPlay;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var ArcFilter = /** @class */ (function (_super) {
        __extends(ArcFilter, _super);
        /**
         *
         * @param startRadius 起点弧度，范围 (-2*PI,2*PI) 坐标系方向与白鹭相同，x 向右为正，y 向下为正
         * @param endRadius 终点弧度，范围 (-2*PI,2*PI) 坐标系方向与白鹭相同，x 向右为正，y 向下为正
         * @param offRadius 偏移弧度
         */
        function ArcFilter(startRadius, endRadius, offRadius) {
            if (startRadius === void 0) { startRadius = -Math.PI; }
            if (endRadius === void 0) { endRadius = Math.PI; }
            if (offRadius === void 0) { offRadius = 0.0; }
            var _this = this;
            var vertexSrc = "attribute vec2 aVertexPosition;\n" +
                "attribute vec2 aTextureCoord;\n" +
                "uniform vec2 projectionVector;\n" +
                "varying vec2 vTextureCoord;\n" +
                'varying vec4 vColor;\n' +
                "attribute vec2 aColor;\n" +
                "const vec2 center = vec2(-1.0, 1.0);\n" +
                "void main(void) {\n" +
                "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
                "   vTextureCoord = aTextureCoord;\n" +
                "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
                "}";
            var fragmentSrc = "precision lowp float;\n" +
                "varying vec2 vTextureCoord;\n" +
                'uniform sampler2D uSampler;\n' +
                'uniform float start;\n' +
                'uniform float end;\n' +
                'uniform float off;\n' +
                'varying vec4 vColor;\n' +
                "void main(void) {\n" +
                'float r = atan(vTextureCoord.y-0.5,vTextureCoord.x-0.5);\n' +
                'float m = 0.0;\n' +
                'float PI = 3.1415926535626;\n' +
                'r = r + off;\n' +
                'if(r > PI) r -= PI * 2.0;\n' +
                'if(r < -PI) r += PI * 2.0;\n' +
                'if(start < r && r < end) m = 1.0;\n' +
                'gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor * m ;\n' +
                "}";
            _this = _super.call(this, vertexSrc, fragmentSrc, { 'start': startRadius, 'end': endRadius, 'off': offRadius }) || this;
            return _this;
        }
        return ArcFilter;
    }(egret.CustomFilter));
    egretExtend.ArcFilter = ArcFilter;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var CircleFilter = /** @class */ (function (_super) {
        __extends(CircleFilter, _super);
        function CircleFilter(size) {
            var _this = this;
            if (size != null) {
                size = ~~size;
            }
            var vertexSrc = "attribute vec2 aVertexPosition;\n" +
                "attribute vec2 aTextureCoord;\n" +
                "uniform vec2 projectionVector;\n" +
                "varying vec2 vTextureCoord;\n" +
                'varying vec4 vColor;\n' +
                "attribute vec2 aColor;\n" +
                "const vec2 center = vec2(-1.0, 1.0);\n" +
                "void main(void) {\n" +
                "   gl_Position = vec4((aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
                "   vTextureCoord = aTextureCoord;\n" +
                "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
                "}";
            var fragmentSrc = "precision lowp float;\n" +
                "varying vec2 vTextureCoord;\n" +
                'uniform sampler2D uSampler;\n' +
                'varying vec4 vColor;\n' +
                'uniform vec2 uTextureSize;\n' +
                "void main(void) {\n" +
                (size == null ? "float res = step((vTextureCoord.x-0.5)*(vTextureCoord.x-0.5) + (vTextureCoord.y-0.5)*(vTextureCoord.y-0.5),0.25);\n"
                    : "float res = step((vTextureCoord.x-0.5)*(vTextureCoord.x-0.5)*uTextureSize.x*uTextureSize.x + (vTextureCoord.y-0.5)*(vTextureCoord.y-0.5)*uTextureSize.y*uTextureSize.y,0.25*" + (size * size) + ".0);\n") +
                'gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor * res ;\n' +
                "}";
            _this = _super.call(this, vertexSrc, fragmentSrc) || this;
            return _this;
        }
        return CircleFilter;
    }(egret.CustomFilter));
    egretExtend.CircleFilter = CircleFilter;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var MediatorManager = /** @class */ (function (_super) {
        __extends(MediatorManager, _super);
        function MediatorManager() {
            var _this = _super.call(this) || this;
            _this.mediators = new Map();
            if (!MediatorManager.ist) {
                MediatorManager.ist = _this;
            }
            return _this;
        }
        /**
         * 添加一个 Mediator
         * @param mediator
         */
        MediatorManager.prototype.addMediator = function (mediator) {
            mediator.$target = this;
            this.mediators.set(mediator.name, mediator);
        };
        /**
         * 移除一个 Mediator
         * @param mediator
         */
        MediatorManager.prototype.removeMediator = function (mediator) {
            if (mediator.$target == this) {
                mediator.$target = null;
                this.mediators.delete(mediator.name);
            }
        };
        /**
         * 获取一个 Mediator
         * @param name Mediator 名称
         */
        MediatorManager.prototype.getMediator = function (name) {
            return this.mediators.get(name);
        };
        MediatorManager.prototype.forEach = function (func) {
            this.mediators.forEach(func);
        };
        Object.defineProperty(MediatorManager, "instance", {
            get: function () {
                if (!MediatorManager.ist) {
                    new MediatorManager();
                }
                return MediatorManager.ist;
            },
            enumerable: true,
            configurable: true
        });
        return MediatorManager;
    }(orange.EventEmitter));
    egretExtend.MediatorManager = MediatorManager;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    /**
     * @internal
     */
    var MediatorRegister = /** @class */ (function () {
        function MediatorRegister() {
            this.mediatorClasses = new Map();
        }
        MediatorRegister.prototype.start = function () {
            var _this = this;
            this.mediatorClasses.forEach(function (dataRute, clazz) {
                var mediator = new clazz();
                if (dataRute) {
                    if (typeof dataRute === 'string')
                        mediator.data = orange.GetUtil.getFromGlobal(dataRute, _this.rootData);
                    else
                        mediator.data = new dataRute();
                }
                _this.mediatorManager.addMediator(mediator);
                mediator.onReady();
            });
        };
        MediatorRegister.get = function (type) {
            if (MediatorRegister.map.has(type))
                return MediatorRegister.map.get(type);
            var mr = new MediatorRegister();
            mr.type = type;
            MediatorRegister.map.set(type, mr);
            return mr;
        };
        /**
         * @internal
         */
        MediatorRegister.map = new Map();
        return MediatorRegister;
    }());
    egretExtend.MediatorRegister = MediatorRegister;
    egretExtend.registerMediator = function (dataRute, mediatorManagerType) {
        if (dataRute === void 0) { dataRute = null; }
        var mr = MediatorRegister.get(mediatorManagerType);
        return function (clazz) {
            mr.mediatorClasses.set(clazz, dataRute);
            return clazz;
        };
    };
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var Mediator = /** @class */ (function () {
        function Mediator() {
            /**
             * @internal
             */
            this._events = [];
        }
        Object.defineProperty(Mediator.prototype, "target", {
            get: function () {
                return this.$target;
            },
            enumerable: true,
            configurable: true
        });
        Mediator.prototype.on = function (type, back) {
            this._events.push([this.$target, type, back, this]);
            orange.on(this.$target, type, back, this);
        };
        Mediator.prototype.once = function (type, back) {
            this._events.push([this.$target, type, back, this]);
            orange.once(this.$target, type, back, this);
        };
        Mediator.prototype.removeListener = function (type, back) {
            for (var i = 0; i < this._events.length; i++) {
                if (this._events[i][1] == type && this._events[i][2] == back) {
                    this._events.splice(i, 1);
                    i--;
                }
            }
            orange.removeListener(this.$target, type, back, this);
        };
        Mediator.prototype.hasListener = function (type) {
            var e_3, _a;
            try {
                for (var _b = __values(this._events), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var args = _c.value;
                    if (args[1] == type)
                        return true;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return false;
        };
        Mediator.prototype.removeAllListeners = function () {
            var e_4, _a;
            try {
                for (var _b = __values(this._events), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var args = _c.value;
                    orange.removeListener.apply(null, args);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            this._events.length = 0;
        };
        Mediator.prototype.emit = function (event) {
            orange.emit(this.$target, event);
        };
        Mediator.prototype.emitWith = function (type, data) {
            orange.emitWith(this.$target, type, data);
        };
        return Mediator;
    }());
    egretExtend.Mediator = Mediator;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var ViewMediator = /** @class */ (function (_super) {
        __extends(ViewMediator, _super);
        function ViewMediator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 显示
         * @param data
         */
        ViewMediator.prototype.openView = function (data) {
            if (this.parent) {
                this.parent.addChild(this.view);
            }
        };
        /**
         * 关闭显示
         * @param data
         */
        ViewMediator.prototype.closeView = function (data) {
            if (this.$view && this.$view.parent) {
                this.$view.parent.removeChild(this.$view);
            }
        };
        ViewMediator.prototype.getViewChild = function (name) {
            if (this.$view)
                return orange.GetUtil.getFromGlobal(name, this.$view);
        };
        Object.defineProperty(ViewMediator.prototype, "view", {
            /**
             * 获取 view
             */
            get: function () {
                return this.getView();
            },
            enumerable: true,
            configurable: true
        });
        ViewMediator.prototype.getView = function () {
            if (!this.$view) {
                this.$view = this.createView();
                this.onViewAddedToStage && this.$view.addEventListener(egret.Event.ADDED_TO_STAGE, this.onViewAddedToStage, this);
                this.onViewRemovedFromStage && this.$view.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onViewRemovedFromStage, this);
                this.onViewCreated && this.onViewCreated();
            }
            return this.$view;
        };
        /**
         * 销毁 view
         */
        ViewMediator.prototype.destroyView = function () {
            if (this.$view) {
                this.onViewDestroyed && this.onViewDestroyed();
                if (this.$view.parent) {
                    this.$view.parent.removeChild(this.$view);
                }
                this.onViewAddedToStage && this.$view.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onViewAddedToStage, this);
                this.onViewRemovedFromStage && this.$view.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onViewRemovedFromStage, this);
                this.$view = null;
            }
        };
        return ViewMediator;
    }(egretExtend.Mediator));
    egretExtend.ViewMediator = ViewMediator;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    /**
     * 1. 修复 egret 创建 texture 时未销毁微信 img 的问题
     * 2. 修复 egret 销毁 BimapData 时未销毁微信 img 的问题(如果未创建对应的贴图就会出现)
     */
    var $m_egret_01 = setInterval(function () {
        try {
            var egretPlatform = window["wx"] && window["wx"]["getPerformance"] ? egret['wxgame'] : egret['web'];
            var f = egretPlatform.WebGLRenderContext.getInstance().getWebGLTexture.bind(egretPlatform.WebGLRenderContext.getInstance());
            egretPlatform.WebGLRenderContext.getInstance().getWebGLTexture = function (bitmapData) {
                egretExtend.startCreateTexture(bitmapData);
                var source = bitmapData.source;
                var texture = f.apply(null, arguments);
                egretExtend.finishCreateTexture(bitmapData);
                if (source) {
                    if (!source.dispose) {
                        source.dispose = function () {
                            if (source.remove)
                                source.remove();
                            else if (source.destroy)
                                source.destroy();
                            else
                                source.src = "";
                        };
                    }
                    source.dispose && source.dispose();
                }
                return texture;
            };
            clearInterval($m_egret_01);
        }
        catch (e) {
        }
    }, 0);
})(egretExtend || (egretExtend = {}));
/**
 * @internal
 */
egret.sys.BitmapNode.$updateTextureDataWithScale9Grid = function (node, image, scale9Grid, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, destW, destH, sourceWidth, sourceHeight, smoothing) {
    node.smoothing = smoothing;
    node.image = image;
    node.imageWidth = sourceWidth;
    node.imageHeight = sourceHeight;
    var imageWidth = bitmapWidth;
    var imageHeight = bitmapHeight;
    destW = destW - (textureWidth - bitmapWidth * egret.$TextureScaleFactor);
    destH = destH - (textureHeight - bitmapHeight * egret.$TextureScaleFactor);
    var targetW0 = scale9Grid.x - offsetX;
    var targetH0 = scale9Grid.y - offsetY;
    var sourceW0 = targetW0 / egret.$TextureScaleFactor;
    var sourceH0 = targetH0 / egret.$TextureScaleFactor;
    var sourceW1 = scale9Grid.width / egret.$TextureScaleFactor;
    var sourceH1 = scale9Grid.height / egret.$TextureScaleFactor;
    //防止空心的情况出现。
    if (sourceH1 == 0) {
        sourceH1 = 1;
        if (sourceH0 >= imageHeight) {
            sourceH0--;
        }
    }
    if (sourceW1 == 0) {
        sourceW1 = 1;
        if (sourceW0 >= imageWidth) {
            sourceW0--;
        }
    }
    var sourceX0 = bitmapX;
    var sourceX1 = sourceX0 + sourceW0;
    var sourceX2 = sourceX1 + sourceW1;
    var sourceW2 = imageWidth - sourceW0 - sourceW1;
    var sourceY0 = bitmapY;
    var sourceY1 = sourceY0 + sourceH0;
    var sourceY2 = sourceY1 + sourceH1;
    var sourceH2 = imageHeight - sourceH0 - sourceH1;
    var targetW2 = sourceW2 * egret.$TextureScaleFactor;
    var targetH2 = sourceH2 * egret.$TextureScaleFactor;
    if ((sourceW0 + sourceW2) * egret.$TextureScaleFactor > destW || (sourceH0 + sourceH2) * egret.$TextureScaleFactor > destH) {
        node.drawImage(bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, destW, destH);
        return;
    }
    var targetX0 = offsetX;
    var targetX1 = targetX0 + targetW0;
    var targetX2 = targetX0 + (destW - targetW2);
    var targetW1 = destW - targetW0 - targetW2;
    var targetY0 = offsetY;
    var targetY1 = targetY0 + targetH0;
    var targetY2 = targetY0 + destH - targetH2;
    var targetH1 = destH - targetH0 - targetH2;
    if (image["texture"] || (image.source && image.source["texture"])) {
        targetY2 = offsetY;
        targetY1 = targetY2 + targetH0;
        targetY0 = targetY2 + destH - targetH2;
    }
    //
    //             x0     x1     x2
    //          y0 +------+------+------+
    //             |      |      |      | h0
    //             |      |      |      |
    //          y1 +------+------+------+
    //             |      |      |      | h1
    //             |      |      |      |
    //          y2 +------+------+------+
    //             |      |      |      | h2
    //             |      |      |      |
    //             +------+------+------+
    //                w0     w1     w2
    //
    // if (image["texture"] || (image.source && image.source["texture"])) {
    //     //如果是 RenderTexture
    //     if (sourceH0 > 0) {
    //         if (sourceW0 > 0) node.drawImage(sourceX0, sourceY0, sourceW0, sourceH0, targetX0, targetY2, targetW0, targetH2);
    //         if (sourceW1 > 0) node.drawImage(sourceX1, sourceY0, sourceW1, sourceH0, targetX1, targetY2, targetW1, targetH2);
    //         if (sourceW2 > 0) node.drawImage(sourceX2, sourceY0, sourceW2, sourceH0, targetX2, targetY2, targetW2, targetH2);
    //     }
    //     if (sourceH1 > 0) {
    //         if (sourceW0 > 0) node.drawImage(sourceX0, sourceY1, sourceW0, sourceH1, targetX0, targetY0, targetW0, targetH1);
    //         if (sourceW1 > 0) node.drawImage(sourceX1, sourceY1, sourceW1, sourceH1, targetX1, targetY1, targetW1, targetH1);
    //         if (sourceW2 > 0) node.drawImage(sourceX2, sourceY1, sourceW2, sourceH1, targetX2, targetY1, targetW2, targetH1);
    //     }
    //     if (sourceH2 > 0) {
    //         if (sourceW0 > 0) node.drawImage(sourceX0, sourceY2, sourceW0, sourceH2, targetX0, targetY0, targetW0, targetH1);
    //         if (sourceW1 > 0) node.drawImage(sourceX1, sourceY2, sourceW1, sourceH2, targetX1, targetY0, targetW1, targetH1);
    //         if (sourceW2 > 0) node.drawImage(sourceX2, sourceY2, sourceW2, sourceH2, targetX2, targetY0, targetW2, targetH1);
    //     }
    // } 
    if (sourceH0 > 0) {
        if (sourceW0 > 0)
            node.drawImage(sourceX0, sourceY0, sourceW0, sourceH0, targetX0, targetY0, targetW0, targetH0);
        if (sourceW1 > 0)
            node.drawImage(sourceX1, sourceY0, sourceW1, sourceH0, targetX1, targetY0, targetW1, targetH0);
        if (sourceW2 > 0)
            node.drawImage(sourceX2, sourceY0, sourceW2, sourceH0, targetX2, targetY0, targetW2, targetH0);
    }
    if (sourceH1 > 0) {
        if (sourceW0 > 0)
            node.drawImage(sourceX0, sourceY1, sourceW0, sourceH1, targetX0, targetY1, targetW0, targetH1);
        if (sourceW1 > 0)
            node.drawImage(sourceX1, sourceY1, sourceW1, sourceH1, targetX1, targetY1, targetW1, targetH1);
        if (sourceW2 > 0)
            node.drawImage(sourceX2, sourceY1, sourceW2, sourceH1, targetX2, targetY1, targetW2, targetH1);
    }
    if (sourceH2 > 0) {
        if (sourceW0 > 0)
            node.drawImage(sourceX0, sourceY2, sourceW0, sourceH2, targetX0, targetY2, targetW0, targetH2);
        if (sourceW1 > 0)
            node.drawImage(sourceX1, sourceY2, sourceW1, sourceH2, targetX1, targetY2, targetW1, targetH2);
        if (sourceW2 > 0)
            node.drawImage(sourceX2, sourceY2, sourceW2, sourceH2, targetX2, targetY2, targetW2, targetH2);
    }
};
var egretExtend;
(function (egretExtend) {
    /**
     * 获取图集列表
     */
    function getMergeTextures() {
        var list = [];
        MergeTexture.list.forEach(function (item) { return list.push(item.texture); });
        return list;
    }
    egretExtend.getMergeTextures = getMergeTextures;
    /**
     * 自动合图功能，在内存中动态合并图片打包成图集
     * @param filter 过滤函数，如果返回 false 则不参与合图
     */
    function startMergeTexture(filter) {
        function promisify(loader, resource) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var onSuccess = function () {
                    var texture = loader['data'] ? loader['data'] : loader['response'];
                    resolve(texture);
                };
                var onError = function () {
                    var e = new RES.ResourceManagerError(1001, resource.url);
                    reject(e);
                };
                loader.addEventListener(egret.Event.COMPLETE, onSuccess, _this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, _this);
            });
        }
        var func = RES.processor.isSupport;
        RES.processor.isSupport = function (resource) {
            if (resource.type == 'image') {
                return {
                    onLoadStart: function (host, resource) {
                        var loader = new egret.ImageLoader();
                        loader.load(RES.getVirtualUrl(resource.root + resource.url));
                        return promisify(loader, resource)
                            .then(function (bitmapData) {
                            var texture = new egret.Texture();
                            texture._setBitmapData(bitmapData);
                            var r = host.resourceConfig.getResource(resource.name);
                            if (r && r.scale9grid) {
                                var list = r.scale9grid.split(",");
                                texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                            }
                            if (filter && filter(resource) == false)
                                return texture;
                            texture = MergeTexture.merge(texture, resource);
                            return texture;
                        });
                    },
                    onRemoveStart: function (host, resource) {
                        var texture = host.get(resource);
                        texture.dispose();
                    }
                };
            }
            return func.call(RES.processor, resource);
        };
    }
    egretExtend.startMergeTexture = startMergeTexture;
    /**
     * @internal
     */
    var MergeTexture = /** @class */ (function (_super) {
        __extends(MergeTexture, _super);
        function MergeTexture() {
            var _this = _super.call(this) || this;
            _this.maxWidth = MergeTexture.MAX_WIDTH;
            _this.maxHeight = MergeTexture.MAX_HEIGHT;
            _this.currentWidth = MergeTexture.MAX_WIDTH;
            _this.currentHeight = MergeTexture.MAX_HEIGHT;
            _this.spaces = [{ x: 0, y: 0, width: _this.maxWidth, height: _this.maxHeight }];
            _this.id = MergeTexture.id++;
            _this.textures = new Map();
            // egret_stages[0].addChild(this);
            _this.x = 1000 + _this.id * MergeTexture.MAX_WIDTH;
            _this.container = new egret.Sprite();
            _this.render = new egret.RenderTexture();
            _this.texture = _this.render;
            return _this;
        }
        MergeTexture.prototype.reset = function () {
            var e_5, _a;
            try {
                for (var _b = __values(this.textures), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), t = _d[0], sp = _d[1];
                    t.$sourceWidth = this.render.bitmapData.width;
                    t.$sourceHeight = this.render.bitmapData.height;
                    t.$bitmapY = this.render.bitmapData.height - sp.y - t.$bitmapHeight;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
        };
        MergeTexture.prototype.reset2 = function () {
            var e_6, _a;
            try {
                for (var _b = __values(this.textures), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), t = _d[0], sp = _d[1];
                    t.$sourceWidth = this.render.bitmapData.width * 2;
                    t.$sourceHeight = this.render.bitmapData.height * 2;
                    t.$bitmapY = this.render.bitmapData.height - sp.y - t.$bitmapHeight;
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        };
        MergeTexture.prototype.merge = function (texture, resource) {
            var e_7, _a;
            var w = texture.textureWidth;
            var h = texture.textureHeight;
            var findSpace;
            for (var i = 0, len = this.spaces.length; i < len; i++) {
                var space = this.spaces[i];
                if (w <= space.width && h <= space.height) {
                    findSpace = space;
                    this.spaces.splice(i, 1);
                    this.spaces.splice(i, 0, { x: space.x, y: space.y + h, width: space.width, height: space.height - h }, { x: space.x + w, y: space.y, width: space.width - w, height: h });
                    this.spaces.sort(function (a, b) { return b.x == 0 ? -1 : a.height - b.height; });
                    break;
                }
            }
            if (!findSpace)
                return null;
            // if (findSpace.x + w > this.currentWidth) this.currentWidth = w + findSpace.x;
            // if (findSpace.y + h > this.currentHeight) this.currentHeight = h + findSpace.y;
            var bm = new egret.Bitmap(texture);
            this.container.addChild(bm);
            bm.x = findSpace.x;
            bm.y = findSpace.y; //this.currentHeight - findSpace.y;
            // bm.scaleY = -1;
            this.render.drawToTexture(this.container, new egret.Rectangle(0, 0, this.currentWidth, this.currentHeight));
            var txt = new egret.Texture();
            txt._setBitmapData(this.render.bitmapData);
            txt.$sourceWidth = this.render.bitmapData.width;
            txt.$sourceHeight = this.render.bitmapData.height;
            txt.$bitmapX = findSpace.x;
            txt.$bitmapY = this.render.bitmapData.height - findSpace.y - h; //findSpace.y;
            txt.$bitmapWidth = texture.textureWidth;
            txt.$bitmapHeight = texture.textureHeight;
            txt['$textureWidth'] = texture.textureWidth;
            txt['$textureHeight'] = texture.textureHeight;
            txt.$textureId = ~~(Math.random() * 100000000);
            txt.$offsetX = 0;
            txt.$offsetY = 0;
            try {
                for (var _b = __values(this.textures), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), t = _d[0], sp = _d[1];
                    t.$sourceWidth = this.render.bitmapData.width;
                    t.$sourceHeight = this.render.bitmapData.height;
                    t.$bitmapY = this.render.bitmapData.height - sp.y - t.$bitmapHeight;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
            findSpace['resource'] = resource;
            this.textures.set(txt, findSpace);
            return txt;
        };
        /**
         * 是否能融合
         * @internal
         * @param texture
         */
        MergeTexture.canMergeTexture = function (texture) {
            return texture.$bitmapX != 0 || texture.$bitmapY != 0
                || texture.textureWidth != texture.$bitmapData.width || texture.textureHeight != texture.$bitmapData.height
                || texture.textureWidth > 1024 || texture.textureHeight > 1024 ? false : true;
        };
        MergeTexture.merge = function (texture, resource) {
            var e_8, _a;
            if (!MergeTexture.canMergeTexture(texture))
                return texture;
            var res;
            var list = MergeTexture.list;
            try {
                for (var list_1 = __values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                    var mt_1 = list_1_1.value;
                    res = mt_1.merge(texture, resource);
                    if (res)
                        return res;
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (list_1_1 && !list_1_1.done && (_a = list_1.return)) _a.call(list_1);
                }
                finally { if (e_8) throw e_8.error; }
            }
            var mt = new MergeTexture();
            list.add(mt);
            res = mt.merge(texture, resource);
            if (res)
                return res;
            return texture;
        };
        MergeTexture.id = 0;
        MergeTexture.MAX_WIDTH = 1024;
        MergeTexture.MAX_HEIGHT = 1024;
        MergeTexture.list = new Set();
        return MergeTexture;
    }(egret.Bitmap));
    egretExtend.MergeTexture = MergeTexture;
})(egretExtend || (egretExtend = {}));
//if (image["texture"] || (image.source && image.source["texture"]))
//image 是 bitmapData
var egretExtend;
(function (egretExtend) {
    var GetUtil = /** @class */ (function () {
        function GetUtil() {
        }
        GetUtil.getInParent = function (display, type) {
            if (display instanceof type)
                return display;
            while (display && display.parent && display.parent != display) {
                display = display.parent;
                if (display instanceof type)
                    return display;
            }
            return null;
        };
        GetUtil.isInTargetParent = function (display, p) {
            if (display === p)
                return true;
            while (display && display.parent && display.parent != display) {
                display = display.parent;
                if (display === p)
                    return true;
            }
            return false;
        };
        return GetUtil;
    }());
    egretExtend.GetUtil = GetUtil;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var DragController = /** @class */ (function () {
        function DragController(display) {
            /**
             * @internal
             */
            this.completes = new Set();
            /**
             * @internal
             */
            this._enbaled = true;
            this.display = display;
            this.addListeners();
        }
        /**
         * @internal
         */
        DragController.prototype.addListeners = function () {
            var _this = this;
            var stageX, stageY, displayX, displayY;
            var stage;
            this.display.addEventListener("touchBegin", function (e) {
                if (!_this.enabled)
                    return;
                stageX = e.stageX;
                stageY = e.stageY;
                displayX = _this.display.x;
                displayY = _this.display.y;
                var touchMove = function (e) {
                    if (!_this.enabled)
                        return;
                    _this.display.x = e.stageX - stageX + displayX;
                    _this.display.y = e.stageY - stageY + displayY;
                };
                var touchEnd = function (e) {
                    if (!_this.enabled)
                        return;
                    _this.display.stage.removeEventListener("touchMove", touchMove, _this);
                    _this.display.stage.removeEventListener("touchEnd", touchEnd, _this);
                    _this.completes.forEach(function (complete) {
                        complete(_this);
                    });
                };
                _this.display.stage.addEventListener("touchMove", touchMove, _this);
                _this.display.stage.addEventListener("touchEnd", touchEnd, _this);
            }, this);
        };
        DragController.prototype.onComplete = function (back) {
            var _this = this;
            this.completes.add(back);
            return function () {
                _this.completes.delete(back);
            };
        };
        Object.defineProperty(DragController.prototype, "enabled", {
            get: function () {
                return this._enbaled;
            },
            set: function (flag) {
                flag = !!flag;
                if (this._enbaled == flag)
                    return;
                this._enbaled = flag;
            },
            enumerable: true,
            configurable: true
        });
        return DragController;
    }());
    egretExtend.DragController = DragController;
})(egretExtend || (egretExtend = {}));
var egretExtend;
(function (egretExtend) {
    var IDD = /** @class */ (function (_super) {
        __extends(IDD, _super);
        function IDD() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IDD;
    }(egret.DisplayObject));
    egretExtend.observer = function (c) {
        // orange.constructorCall(c.prototype, (thisObj: IDisplay) => {
        //   thisObj['update'] && thisObj['update'](); 
        //   console.log('构造函数调用', thisObj);
        // });
        return orange.observer(c);
    };
    /**
     * @internal
     * @param thisObj
     */
    function assertDisplayObject(thisObj, type) {
        if (!(thisObj instanceof egret.DisplayObject)) {
            throw type + ' 修饰的对象不是 egret.DisplayObject 类型的，无法使用此装饰器';
        }
    }
    var updateSymbol = Symbol('orange egret update');
    function addUpdate(thisObj, call) {
        if (!thisObj[updateSymbol]) {
            thisObj[updateSymbol] = new Set();
            var last_1;
            var f_1 = function () {
                var e_9, _a;
                var now = Date.now();
                try {
                    for (var _b = __values(thisObj[updateSymbol]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var call_1 = _c.value;
                        call_1(now - last_1);
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
                last_1 = now;
            };
            thisObj.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                last_1 = Date.now();
                thisObj.addEventListener(egret.Event.ENTER_FRAME, f_1, thisObj);
            }, null);
            thisObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                thisObj.removeEventListener(egret.Event.ENTER_FRAME, f_1, thisObj);
            }, null);
        }
        thisObj[updateSymbol].add(call);
    }
    function update(target, key, baseDescriptor) {
        orange.constructorCall(target, function (thisObj) {
            assertDisplayObject(thisObj, '@orange.egret.enterFrame');
            addUpdate(thisObj, function (dt) {
                thisObj[key](dt);
            });
        });
        return baseDescriptor;
    }
    egretExtend.update = update;
})(egretExtend || (egretExtend = {}));
//# sourceMappingURL=egret-extend.js.map