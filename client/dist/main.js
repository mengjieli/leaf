/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/exml/exml-parser.ts":
/*!**********************************!*\
  !*** ../src/exml/exml-parser.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var name_scale9Grid = "scale9Grid";
var name_source = "source";
var BlendModeAdd = "add";
var EXMLParser = /** @class */ (function () {
    function EXMLParser() {
    }
    EXMLParser.getEXML = function (ui, cfg, fps) {
        if (fps === void 0) { fps = 60; }
        var childrenProperties = this.childrenProperties;
        var properties;
        if (!this.childrenProperties.has(cfg)) {
            childrenProperties.set(cfg, {});
            properties = childrenProperties.get(cfg);
            this.decodeProperties(ui.entity, cfg.root.properties);
            this.decodeChildren(ui, ui.entity, cfg.root.children, properties);
            // this.decodeTween(ui, cfg.tweens, properties, fps);
        }
        else {
            this.decodeProperties(ui.entity, cfg.root.properties);
            this.decodeChildren(ui, ui.entity, cfg.root.children);
            // this.decodeTween(ui, cfg.tweens, null, fps);
        }
        return ui;
    };
    EXMLParser.decodeProperties = function (ui, properties) {
        for (var k in properties) {
            if (k == name_scale9Grid) {
                var arr = properties[k].split(",");
                ui[k] = {
                    x: +arr[0],
                    y: +arr[1],
                    width: +arr[2],
                    height: +arr[3]
                };
            }
            else if (k == name_source) {
                ui.getComponent(leaf.Bitmap).resource = properties[k];
            }
            else if (k == "blendMode") {
                if (properties[k] == BlendModeAdd) {
                    ui.getComponent(leaf.Render)["blendMode"] = leaf.BlendMode.ADD;
                }
                else {
                }
            }
            else if (k === "x" || k === "y" || k === "scaleX" || k === "scaleY") {
                ui.transform[k] = properties[k];
            }
            else if (k === "rotation") {
                ui.transform.angle = properties[k];
            }
            else {
                ui[k] = properties[k];
            }
        }
    };
    EXMLParser.decodeChildren = function (root, ui, children, properties) {
        var _this = this;
        var add = ui["blendMode"] === BlendModeAdd;
        children.forEach(function (child) {
            var display = _this.decodeDisplay(root, child, properties);
            if (add) {
                display["blendMode"] = "add";
            }
            ui.addChild(display);
            if (child.properties.id) {
                root[child.properties.id] = display;
                root["ids"][child.properties.id] = display;
            }
        });
        // if (add && ui instanceof Container) {
        //     ui["blendMode"] = BlendMode.NORMAL;
        // }
    };
    EXMLParser.decodeDisplay = function (root, cfg, properties) {
        var entity = ecs.Entity.create();
        var define;
        if (cfg.type == "eui.Group") {
        }
        else if (cfg.type == "eui.Component") {
        }
        else if (cfg.type == "eui.Image") {
            entity.addComponent(leaf.Bitmap);
        }
        else {
            define = orange.GetUtil.getFromGlobal(cfg.type);
            if (define) {
                entity.addComponent(define);
            }
        }
        if (properties && cfg.properties.id) {
            properties[cfg.properties.id] = cfg.properties;
        }
        this.decodeProperties(entity, cfg.properties);
        this.decodeChildren(root, entity, cfg.children, properties);
        return entity;
    };
    EXMLParser.childrenProperties = new Map();
    return EXMLParser;
}());
exports.EXMLParser = EXMLParser;


/***/ }),

/***/ "../src/exml/exml.ts":
/*!***************************!*\
  !*** ../src/exml/exml.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var tween_group_1 = __webpack_require__(/*! ./tween-group */ "../src/exml/tween-group.ts");
var exml_parser_1 = __webpack_require__(/*! ./exml-parser */ "../src/exml/exml-parser.ts");
var EXML = /** @class */ (function (_super) {
    __extends(EXML, _super);
    function EXML() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skinParts = [];
        _this.tweens = [];
        _this.ids = {};
        return _this;
    }
    EXML.prototype.init = function (exml) {
        // let container = new Container();
        // this.setDisplay(container);
        exml_parser_1.EXMLParser.getEXML(this, exml);
        var ids = this.ids;
        for (var k in ids) {
            this.skinParts.push(k);
            this[k] = ids[k];
            if (this[k] instanceof tween_group_1.TweenGroup) {
                this.tweens.push(this[k]);
            }
        }
    };
    EXML.prototype.update = function (dt) {
        var e_1, _a;
        try {
            for (var _b = __values(this.tweens), _c = _b.next(); !_c.done; _c = _b.next()) {
                var tween_1 = _c.value;
                if (tween_1.isPlaying) {
                    tween_1.update(dt);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    EXML.prototype.playTweenGroup = function (tween, loop, completeCall, completeCallTarget) {
        if (loop === void 0) { loop = 0; }
        if (tween.frame == 1) {
            tween.update(0);
        }
        else {
            tween.isPlaying = true;
            tween.loop = loop || 100000000;
            tween.completeCall = completeCall;
            tween.completeCallTarget = completeCallTarget;
            tween.time = 0;
            tween.frame = 0;
            tween.update(0);
        }
    };
    EXML.prototype.stopTweenGroup = function (tween) {
        tween.isPlaying = false;
    };
    EXML.prototype.onDestroy = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this.skinParts), _c = _b.next(); !_c.done; _c = _b.next()) {
                var k = _c.value;
                if (this[k] && this[k] instanceof tween_group_1.TweenGroup) {
                    this[k].updateCall = null;
                }
                delete this[k];
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.tweens.length = 0;
        this.skinParts.length = 0;
        this.ids = {};
    };
    return EXML;
}(ecs.Component));
exports.EXML = EXML;


/***/ }),

/***/ "../src/exml/tween-group.ts":
/*!**********************************!*\
  !*** ../src/exml/tween-group.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var TweenGroup = /** @class */ (function () {
    function TweenGroup() {
        this.time = 0;
        this.frame = 0;
        this.fps = 60;
        this.isPlaying = false;
        ecs.ObjectPools.setId(this);
    }
    Object.defineProperty(TweenGroup.prototype, "maxTime", {
        get: function () {
            return this.tween.time;
        },
        enumerable: true,
        configurable: true
    });
    TweenGroup.prototype.update = function (dt) {
        var e_1, _a;
        this.time += dt;
        this.frame = Math.round(this.time * this.fps / 1000);
        var isComplete = this.frame >= this.tween.frameLength;
        if (this.frame > this.tween.frameLength)
            this.frame = this.tween.frameLength;
        try {
            for (var _b = __values(this.tween.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                var target = this.display[item.targetId];
                if (target) {
                    for (var k in item.frames[this.frame]) {
                        target[k] = item.frames[this.frame][k];
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (isComplete) {
            this.loop--;
            if (this.loop > 0) {
                this.frame = 0;
                this.time = 0;
            }
            else {
                this.isPlaying = false;
                var call = this.completeCall;
                var target = this.completeCallTarget;
                this.completeCall = null;
                this.completeCallTarget = null;
                call && call.apply(target);
            }
        }
    };
    TweenGroup.create = function () {
        this.count++;
        return new TweenGroup();
    };
    TweenGroup.count = 0;
    return TweenGroup;
}());
exports.TweenGroup = TweenGroup;


/***/ }),

/***/ "../src/main.ts":
/*!**********************!*\
  !*** ../src/main.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var elimination_scene_1 = __webpack_require__(/*! ./modules/elimination/elimination-scene */ "../src/modules/elimination/elimination-scene.ts");
var Main = /** @class */ (function () {
    function Main() {
        this.init();
    }
    Main.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var k, world;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window["IS_WEB"]) return [3 /*break*/, 2];
                        try {
                            window["require"] = eval("__webpack_require__");
                            for (k in window["require"].c) {
                                window["require"].c["../client" + k.slice(2, k.length)] = window["require"].c[k];
                            }
                        }
                        catch (e) {
                        }
                        return [4 /*yield*/, orange.startup({
                                native: {
                                    ip: "localhost",
                                    autoCompile: true
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, leaf.Res.loadResources()];
                    case 3:
                        _a.sent();
                        world = leaf.init();
                        new elimination_scene_1.EliminationScene(world);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Main;
}());
exports.Main = Main;
var Move = /** @class */ (function (_super) {
    __extends(Move, _super);
    function Move() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Move.prototype.update = function () {
        for (var i = 0; i < this.entity.children.length - 1; i++) {
            var child = this.entity.children[i];
            child.transform.x = 300 * Math.random();
            child.transform.y = 300 * Math.random();
        }
    };
    return Move;
}(ecs.Component));
window["Main"] = Main;


/***/ }),

/***/ "../src/modules/elimination/elimination-scene.ts":
/*!*******************************************************!*\
  !*** ../src/modules/elimination/elimination-scene.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var exml_1 = __webpack_require__(/*! ../../exml/exml */ "../src/exml/exml.ts");
var EliminationScene = /** @class */ (function () {
    function EliminationScene(world) {
        var _this = this;
        this.world = world;
        world.scene = this.scene = new ecs.Scene();
        // let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
        // bm.entity.parent = world.scene;
        // bm.resource = "chicken-1";
        console.error("wt");
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var json, exml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, leaf.Res.getRes("pure-exml_json").load()];
                    case 1:
                        _a.sent();
                        json = leaf.Res.getRes("pure-exml_json").data["pure-chicken-show.json"];
                        console.error(json);
                        exml = ecs.Entity.create().addComponent(exml_1.EXML, json);
                        exml.entity.parent = world.scene;
                        window["te"] = exml;
                        return [2 /*return*/];
                }
            });
        }); })();
        //
    }
    EliminationScene.prototype.close = function () {
        this.scene.destroy();
    };
    EliminationScene = __decorate([
        orange.autoload("EliminationScene")
    ], EliminationScene);
    return EliminationScene;
}());
exports.EliminationScene = EliminationScene;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map