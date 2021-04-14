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

/***/ "../src/main.ts":
/*!**********************!*\
  !*** ../src/main.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var bull_scene_1 = __webpack_require__(/*! ./modules/bull/bull-scene */ "../src/modules/bull/bull-scene.ts");
var Main = /** @class */ (function () {
    function Main() {
        this.init();
    }
    Main.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var k;
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
                    case 2:
                        leaf.init();
                        leaf.world.root.transform.scaleX = leaf.world.root.transform.scaleY = leaf.GLCore.width / 640;
                        leaf.Res.loadResources().then(function () {
                            leaf.Res.getRes("block_png").load().then(function () {
                                new bull_scene_1.BullScene();
                                // new MainScene();
                                // new FaceScene(true);
                                // new PuzzleScene();
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Main;
}());
exports.Main = Main;
window["Main"] = Main;


/***/ }),

/***/ "../src/modules/bull/bull-scene.ts":
/*!*****************************************!*\
  !*** ../src/modules/bull/bull-scene.ts ***!
  \*****************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_scene_1 = __webpack_require__(/*! ../../utils/ui/module-scene */ "../src/utils/ui/module-scene.ts");
var bull_core_1 = __webpack_require__(/*! ./components/bull-core */ "../src/modules/bull/components/bull-core.ts");
var BullScene = /** @class */ (function (_super) {
    __extends(BullScene, _super);
    function BullScene() {
        var _this = _super.call(this) || this;
        ecs.Entity.create().addComponent(bull_core_1.BullCore).parent = _this.scene;
        return _this;
    }
    BullScene = __decorate([
        orange.autoload("BullScene")
    ], BullScene);
    return BullScene;
}(module_scene_1.ModuleScene));
exports.BullScene = BullScene;


/***/ }),

/***/ "../src/modules/bull/components/bull-core.ts":
/*!***************************************************!*\
  !*** ../src/modules/bull/components/bull-core.ts ***!
  \***************************************************/
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
orange.autoloadLink("BullScene");
var BullCore = /** @class */ (function (_super) {
    __extends(BullCore, _super);
    function BullCore() {
        //比赛时间
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.time = 0;
        return _this;
    }
    BullCore.prototype.init = function () {
        this.transform.x = 0;
        this.transform.y = 250;
        this.runFlag = true;
        var start = ecs.Entity.create().addComponent(leaf.Bitmap);
        start.texture = leaf.PointTexture.getTexture(0xff0000);
        start.transform.scaleX = 640;
        start.transform.scaleY = 1;
        start.transform.y = this.transform.y;
        start.parent = leaf.world.scene;
        this.timeLabel = ecs.Entity.create().addComponent(leaf.Label);
        this.timeLabel.fontColor = 0xffffff;
        this.timeLabel.parent = leaf.world.scene;
        var core = window["core"] = this.core = new BullCoreData(4);
        core.raceLength = 800 * 1000;
        core.raceTime = 300 * 1000;
        core.lengthWeight = [60, 60, 30, 10, 10];
        core.normalSpeeds = [150, 150, 150, 150, 150];
        core.bigSpeeds = [100, 100, 100, 100, 100];
        core.lengths = [68000, 87000, 104000, 105000, 105000];
        core.strengths = [1, 2, 3, 4, 4];
        core.atks = [4, 3, 2, 1, 1];
        core.skills = [0, 0, 0, 0, 8];
        core.lengthWeight1 = [60, 60, 30, 10, 10];
        core.normalSpeeds1 = [150, 150, 150, 150, 150];
        core.bigSpeeds1 = [100, 100, 100, 100, 100];
        core.lengths1 = [68000, 87000, 104000, 105000, 105000];
        core.strengths1 = [1, 2, 3, 4, 4];
        core.atks1 = [4, 3, 2, 1, 1];
        core.skills1 = [0, 0, 0, 0, 0];
        core.teamHps = [10000, 10000];
        // core.ops = [
        //     { time: 0, team: 0, raceIndex: 0, type: 0 },
        //     { time: 0, team: 0, raceIndex: 0, type: 0 },
        //     { time: 0, team: 1, raceIndex: 0, type: 0 },
        //     { time: 1500, team: 0, raceIndex: 0, type: 1 },
        //     { time: 2000, team: 1, raceIndex: 0, type: 2 }
        // ] as any;
        core.ops = [];
        //第一个赛道放，每隔 3 ~ 5 秒放入一头牛 team0
        var time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 0, raceIndex: 0, type: ~~(5 * Math.random()) });
            time += 3000 + ~~(Math.random() * 2000);
        }
        //第二个赛道放，每隔 3 ~ 5 秒放入一头牛 team1
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 1, raceIndex: 1, type: ~~(5 * Math.random()) });
            time += 3000 + Math.random() * 2000;
        }
        //第3个赛道放，每隔 1 ~ 2 秒放入一头牛 team0 team1
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 0, raceIndex: 2, type: ~~(2 * Math.random()) });
            time += 1000 + ~~(Math.random() * 1000);
        }
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 1, raceIndex: 2, type: ~~(2 * Math.random()) });
            time += 1000 + ~~(Math.random() * 1000);
        }
        //第4个赛道放，每隔 3 ~ 5 秒放入一头牛 team0 team1
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 0, raceIndex: 3, type: ~~(5 * Math.random()) });
            time += 3000 + ~~(Math.random() * 2000);
        }
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 1, raceIndex: 3, type: ~~(5 * Math.random()) });
            time += 3000 + ~~(Math.random() * 2000);
        }
        core.ops.sort(function (a, b) { return a.time - b.time; });
        // core.ops = [{ "time": 680, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 1909, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 2995, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 3063, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 3908, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 4232, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 4268, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 4310, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 4745, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 5740, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 6089, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 6209.255774334708, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 7416, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 7484, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 7523, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 7802, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 7823, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 8603, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 9187, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 9303.987966346709, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 10189, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 10578, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 11593, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 11622, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 11950, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 12115, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 12321.028170371157, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 12395, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 12972, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 13239, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 14244, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 14536, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 15479.518700306653, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 15535, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 16014, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 16101, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 16109, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 16391, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 17154, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 17905, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 19019, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 19118, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 19405, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 19449.570363380997, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 19522, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 20489, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 20708, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 21108, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 21616, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 21779, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 22633, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 22642, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 23752, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 24073, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 24155.127065204542, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 24553, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 25383, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 25617, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 25941, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 26268, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 27232, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 27265, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 27416, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 28310, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 28322, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 28624.444993653706, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 29407, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 30084, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 30233, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 30655, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 30856, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 30933, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 32226, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 32232, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 33425, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 33425, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 33583.004992498434, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 34005, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 34047, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 34455, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 34790, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 35337, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 35863, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 36715.68989353606, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 36867, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 36928, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 37856, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 37874, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 37964, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 38122, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 38237, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 39602, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 39733, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 40762.365233082885, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 40950, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 41241, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 41627, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 42212, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 42471, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 43032, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 43181, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 43891.42405149036, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 44196, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 44864, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 44877, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 45568, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 45998, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 46102, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 46324, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 47198, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 47410.7152860588, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 47674, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 48169, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 48999, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 49171, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 49951, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 50326, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 50530, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 50615, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 51635, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 52248.8958998107, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 52393, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 52857, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 53172, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 54004, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 54031, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 54266, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 54622, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 55345.64834908661, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 55802, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 55924, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 57169, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 57190, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 57618, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 57979, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 58651, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 58798, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 59088, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 59840.752929623675, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 60180, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 60395, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 61413, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 61823, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 62096, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 62569, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 63173, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 63372, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 63996, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 64197.22615326887, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 64886, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 65357, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 65787, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 66510, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 66815, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 66856, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 67844.98250715881, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 68200, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 68222, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 68373, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 69025, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 69776, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 70290, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 71311, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 71441, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 71729, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 72110.77403170142, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 72218, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 72374, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 73156, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 73525, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 73995, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 74709, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 75533, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 75863, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 76022.05037453897, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 76183, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 76482, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 76773, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 76835, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 77046, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 78240, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 78274, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 79346, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 79583, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 80124.47731519165, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 80160, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 80181, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 81370, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 81473, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 82141, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 82714, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 83233, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 83271, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 83796.01217291829, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 84120, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 84640, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 85674, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 85723, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 86408, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 86570, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 86887.52314588551, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 87279, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 87701, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 88512, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 88971, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 90007, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 90016, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 90864, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 91102, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 91466, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 91682.26765817474, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 92531, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 92689, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 93204, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 93479, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 93592, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 94132, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 94767, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 94878, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 96034, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 96333.9477913174, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 96392, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 96780, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 97109, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 97544, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 97706, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 98312, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 98318, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 99625, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 100302, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 101026, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 101284.91643398203, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 101370, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 101561, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 102192, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 102274, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 102601, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 104043, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 104105, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 104467.23768559097, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 105095, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 105193, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 105372, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 105934, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 106516, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 106971, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 107859, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 108819, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 108876, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 109188, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 109309.57519278588, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 109485, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 109559, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 109944, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 110339, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 111245, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 111405, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 112499, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 112601, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 112940, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 112948.8844184996, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 113015, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 113634, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 114395, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 114844, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 115880, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 115899, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 116219, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 116572.78478559159, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 116645, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 117596, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 117629, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 117646, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 118957, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 119384, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 120175, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 120544, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 120850, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 120870, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 121090.11477154, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 121552, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 122492, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 122589, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 123997, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 124240, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 124413, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 125050, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 125174, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 125505.32165864123, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 125802, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 126228, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 126435, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 127725, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 128111, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 128185, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 128837, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 128866, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 129464, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 129503, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 129904, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 130351.46757824498, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 130968, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 131311, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 132617, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 132638, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 132729, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 132879, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 133353, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 133836.949249399, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 134274, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 134410, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 135838, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 136047, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 136085, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 136916, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 136935, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 137288, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 137461, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 138692.12467305825, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 138852, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 139041, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 140101, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 140410, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 140631, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 140707, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 141507, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 141763, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 142158, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 143024, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 143579.62962598028, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 143646, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 144664, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 144882, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 144965, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 145492, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 146023, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 146223, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 146595, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 147644, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 147689, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 147733.3170338342, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 148807, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 149465, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 149609, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 149653, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 149728, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 151351, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 151467, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 152208.03406476064, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 152588, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 152996, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 153088, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 153731, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 153866, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 154118, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 154191, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 155411, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 155924.66363993438, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 156115, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 156801, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 157211, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 157722, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 158134, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 158689, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 158770, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 158787, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 159705.15043908914, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 159970, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 160288, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 160503, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 161114, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 161538, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 162453, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 162894.22984058538, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 162960, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 163759, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 163802, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 164205, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 164900, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 165186, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 165196, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 165265, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 166662.16947143213, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 166803, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 167016, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 168272, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 168380, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 168472, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 168611, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 170019, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 170109, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 170425, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 171004.61759661668, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 171632, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 172240, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 172270, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 173089, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 173348, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 174174, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 174551, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 174622.73023452534, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 175045, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 175470, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 176543, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 176733, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 177086, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 177133, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 177975, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 178000, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 178270.24403319604, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 178675, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 179245, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 179770, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 180081, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 180608, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 181485, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 181640, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 182144.62292822, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 182181, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 182448, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 182679, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 183982, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 184063, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 184360, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 185238, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 185736, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 186215, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 186606.29020831754, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 186747, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 187352, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 188004, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 188655, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 189256, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 189293, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 189440, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 190415, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 191118, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 191283, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 191464.88963783695, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 192417, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 192566, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 193023, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 193418, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 193515, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 194505, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 194872.59633302325, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 194919, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 195348, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 195827, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 196320, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 196480, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 197392, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 197622, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 198127, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 198195, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 199360, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 199386, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 199458.01990904604, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 200404, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 200527, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 200549, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 200612, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 201338, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 201789, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 202476, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 202840, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 202961.62768058607, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 204243, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 204309, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 204511, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 204802, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 204865, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 205528, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 206205.09609365152, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 206629, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 206814, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 207922, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 207972, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 208031, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 208345, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 209235, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 209243, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 209994.7503671816, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 210334, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 210351, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 211230, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 211686, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 212145, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 212166, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 212319, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 213629, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 213899, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 214035.95753750906, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 214488, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 215321, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 215366, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 216678, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 216833, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 216834, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 217266, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 217763.94771957214, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 218274, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 218576, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 218828, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 220191, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 220248, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 220537, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 220956, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 221763, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 222139.1275227256, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 222316, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 222464, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 222911, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 224196, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 224224, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 224808, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 225028, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 225349, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 225710.7688741693, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 226099, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 226371, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 226512, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 227163, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 227900, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 228138, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 228236, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 228952, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 229288, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 229846, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 230399.53929866294, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 230738, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 230875, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 231222, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 232419, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 232483, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 232779, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 233258, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 233424.65594316862, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 233947, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 234329, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 234634, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 235311, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 235543, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 236437, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 236533, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 236818, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 236903.0394786224, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 237536, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 237911, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 239074, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 239143, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 239464, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 240237, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 240291, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 240406.25296798657, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 240548, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 240813, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 241396, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 242158, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 242419, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 243291, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 243584, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 243798.77234895277, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 244110, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 244890, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 244957, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 245019, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 245968, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 246877, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 246935, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 247809, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 247956.64482387822, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 248708, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 248738, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 248864, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 249826, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 249915, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 250300, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 250526, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 251532, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 251674, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 251929.0927467858, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 253177, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 253290, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 253404, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 254392, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 254834, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 255217, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 255258, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 256315, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 256378.52065877325, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 256449, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 256514, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 257900, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 257913, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 257969, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 259045, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 259519, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 259620, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 260071, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 260950, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 261108.99437933936, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 261339, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 261871, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 262190, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 262351, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 262526, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 263510, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 263962, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 264300.9489149979, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 264928, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 265551, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 265687, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 265981, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 266200, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 266296, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 266848, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 267923, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 268614.2583497203, "team": 1, "raceIndex": 1, "type": 1 }, { "time": 268794, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 269156, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 269432, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 269515, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 269911, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 270037, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 270941, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 271416, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 272151, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 272510, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 272904.5122904448, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 273275, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 273386, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 273426, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 273551, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 274639, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 275113, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 275647, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 276340.7214992769, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 276474, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 276639, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 277094, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 277213, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 277726, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 278440, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 279003, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 279875, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 279914, "team": 0, "raceIndex": 3, "type": 3 }, { "time": 280132, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 280799.40906658064, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 281240, "team": 0, "raceIndex": 0, "type": 3 }, { "time": 281281, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 281531, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 281835, "team": 1, "raceIndex": 3, "type": 0 }, { "time": 282712, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 282924, "team": 0, "raceIndex": 3, "type": 2 }, { "time": 283182, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 284613, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 285054.2873615089, "team": 1, "raceIndex": 1, "type": 3 }, { "time": 285170, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 285318, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 285328, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 285734, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 286884, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 286942, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 287594, "team": 0, "raceIndex": 3, "type": 1 }, { "time": 288641, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 288667, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 289390.2612855743, "team": 1, "raceIndex": 1, "type": 0 }, { "time": 289736, "team": 1, "raceIndex": 3, "type": 1 }, { "time": 289756, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 289866, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 289881, "team": 0, "raceIndex": 0, "type": 2 }, { "time": 291005, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 291243, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 292025, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 292738, "team": 1, "raceIndex": 3, "type": 3 }, { "time": 292742, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 292745, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 293031.01284510706, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 293766, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 293855, "team": 0, "raceIndex": 0, "type": 0 }, { "time": 293868, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 294878, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 295070, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 296161, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 296463.87342083215, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 296650, "team": 1, "raceIndex": 2, "type": 1 }, { "time": 296857, "team": 0, "raceIndex": 3, "type": 0 }, { "time": 297360, "team": 0, "raceIndex": 2, "type": 1 }, { "time": 297502, "team": 1, "raceIndex": 3, "type": 2 }, { "time": 297682, "team": 0, "raceIndex": 0, "type": 1 }, { "time": 298454, "team": 1, "raceIndex": 2, "type": 0 }, { "time": 298840, "team": 0, "raceIndex": 2, "type": 0 }, { "time": 299577.20440944313, "team": 1, "raceIndex": 1, "type": 2 }, { "time": 299634, "team": 1, "raceIndex": 2, "type": 1 }]
        var end = ecs.Entity.create().addComponent(leaf.Bitmap);
        end.texture = leaf.PointTexture.getTexture(0x00ff00);
        end.transform.scaleX = 640;
        end.transform.scaleY = 1;
        end.transform.y = this.transform.y + core.raceLength / 1000;
        end.parent = leaf.world.scene;
        var mid = ecs.Entity.create().addComponent(leaf.Bitmap);
        mid.texture = leaf.PointTexture.getTexture(0x0000ff);
        mid.transform.scaleX = 640;
        mid.transform.scaleY = 1;
        mid.transform.y = this.transform.y + 0.5 * core.raceLength / 1000;
        mid.parent = leaf.world.scene;
    };
    BullCore.prototype.update = function () {
        if (!this.runFlag)
            return;
        this.time += 16;
        this.timeLabel.text = ~~(this.time / 1000) + '';
        var _a = __read(this.runBullGame(this.core, 
        //+ 300 * 1000
        Math.min(this.time, this.core.raceTime * 1000)), 3), win = _a[0], teamHps = _a[1], other = _a[2];
        var _b = __read(other, 7), bullTypes = _b[0], bullTeams = _b[1], bullYs = _b[2], lens = _b[3], raceIndexs = _b[4], starts = _b[5], ends = _b[6];
        var bulls = [];
        for (var i = 0; i < bullTypes.length; i++) {
            bulls.push({
                type: bullTypes[i],
                team: bullTeams[i],
                length: lens[i],
                y: bullYs[i],
                race: raceIndexs[i]
            });
        }
        if (teamHps[0] <= 0 || teamHps[1] <= 0 || this.time >= this.core.raceTime * 1000) {
            this.runFlag = false;
            console.error("winner", teamHps[0] > teamHps[1] ? 0 : 1);
        }
        this.render(bulls, starts, ends);
    };
    /**
     *
     * @param ops 操作列表，每个元素包含 操作的时间、队伍(0|1) 牛的类型\
     * @param raceCount 赛道数量
     * @param raceLength 赛道长度
     * @param normalSpeeds 正常速度
     * @param winSpeeds 撞到一起后赢的速度
     * @param specialSpeed 特殊速度
     * @param teamHps 队伍(0|1)的 hp
     * @param lens 牛的长度，牛的 type 作为索引
     * @param strengths 牛的力量，牛的 type 作为索引
     * @param atks 牛的攻击，牛的 type 作为索引
     * @param skills 牛的技能，牛的 type 作为索引
     * skill 0 无技能
     * skill 1 抵达终点有概率造成双倍伤害
     * skill 2 开局额外获得 10 点血
     * skill 3 开局额外获得 3 个护盾
     * skill 4 抵达终点有概率吸血
     * skill 5 更容易出现 XL 体型的牛
     * skill 6 双方体重相同时可以推动对手
     * skill 7 同一赛道的牛越多，速度越快
     * skill 8 上场时，冰冻对手 3 秒，并且临时置对方的力量为 0
     * skill 9 上场时，清空前面的牛，包含对方的和自己的
     * @param time 比赛时间
     */
    BullCore.prototype.runBullGame = function (core, time) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e;
        var curTime = core.time;
        var hasNew = false;
        while (core.winTeam === -1 && (curTime < time || hasNew && curTime === time)) {
            core.loop++;
            hasNew = false;
            //预测下一个事件点
            var realTime = curTime;
            curTime += 1000 * 1000;
            //操作事件
            if (core.opIndex < core.ops.length) {
                var op = core.ops[core.opIndex];
                if (op.time <= curTime) {
                    curTime = Math.ceil(op.time / 16) * 16;
                }
                if (op.time <= time)
                    hasNew = true;
            }
            try {
                //获取每个赛道的下个时间点
                for (var _f = (e_1 = void 0, __values(core.races)), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var race = _g.value;
                    race.time = realTime + 1000 * 1000;
                    for (var i = 0; i < race.bulls.length; i++) {
                        var bull = race.bulls[i];
                        var nextBull = i < race.bulls.length - 1 ? race.bulls[i + 1] : null;
                        race.time = Math.min(race.time, this.getBullToEndTime(realTime, bull.speed, bull.dir === 0 ? core.raceLength - bull.start + core.lenMap[bull.ids[bull.ids.length - 1]] : 0 - bull.end - core.lenMap[bull.ids[0]]), nextBull ? this.getBullToEndTime(realTime, bull.speed - nextBull.speed, (bull.dir === 0 ? nextBull.end : nextBull.start) - (bull.dir === 0 ? bull.start : bull.end)) : race.time);
                    }
                    curTime = Math.min(curTime, race.time, time);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                }
                finally { if (e_1) throw e_1.error; }
            }
            //执行操作
            if (core.opIndex < core.ops.length && core.ops[core.opIndex].time <= curTime) {
                hasNew = true;
                this.createBull(core, curTime);
            }
            //移动牛
            if (curTime > realTime) {
                try {
                    for (var _h = (e_2 = void 0, __values(core.races)), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var race = _j.value;
                        try {
                            for (var _k = (e_3 = void 0, __values(race.bulls)), _l = _k.next(); !_l.done; _l = _k.next()) {
                                var bull = _l.value;
                                bull.end += bull.speed * (curTime - bull.time);
                                bull.start += bull.speed * (curTime - bull.time);
                                bull.time = curTime;
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            try {
                //碰撞
                for (var _m = (e_4 = void 0, __values(core.races)), _o = _m.next(); !_o.done; _o = _m.next()) {
                    var race = _o.value;
                    for (var i = 0; i < race.bulls.length; i++) {
                        var bull = race.bulls[i];
                        if (i < race.bulls.length - 1 && bull.start >= race.bulls[i + 1].end) {
                            var nextBull = race.bulls[i + 1];
                            race.bulls.splice(i, 1);
                            i--;
                            try {
                                for (var _p = (e_5 = void 0, __values(nextBull.ids)), _q = _p.next(); !_q.done; _q = _p.next()) {
                                    var nid = _q.value;
                                    bull.ids.push(nid);
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                            nextBull.ids = bull.ids;
                            nextBull.end = bull.end + nextBull.end - bull.start;
                            nextBull.strength += bull.strength;
                            nextBull.dir = nextBull.strength >= 0 ? 0 : 1;
                            nextBull.updateSpeed(core.teamMap, nextBull.strength >= 0 ? core.bigSpeeds : core.bigSpeeds1);
                        }
                        else {
                            var bullId = -1;
                            if (bull.dir === 0 && bull.start - core.lenMap[bull.ids[bull.ids.length - 1]] >= core.raceLength) {
                                bullId = bull.ids.pop();
                                bull.start = bull.end;
                                for (var j = 0; j < bull.ids.length; j++) {
                                    bull.start += core.lenMap[bull.ids[j]];
                                }
                                if (bull.ids.length === 1) {
                                    if (core.teamMap[bull.ids[0]] === 0) {
                                        bull.speed = race.ices[core.teamMap[bull.ids[0]]] ? 0 : core.normalSpeeds[core.typeMap[bull.ids[0]]];
                                    }
                                    else {
                                        bull.speed = race.ices[core.teamMap[bull.ids[0]]] ? 0 : -core.normalSpeeds1[core.typeMap[bull.ids[0]]];
                                    }
                                }
                                core.teamHps[0] -= core.atkMap[bullId];
                                if (core.teamHps[0] <= 0)
                                    core.winTeam = 1;
                            }
                            else if (bull.dir === 1 && bull.end + core.lenMap[bull.ids[0]] <= 0) {
                                bullId = bull.ids.shift();
                                bull.end = bull.start;
                                for (var j = bull.ids.length - 1; j >= 0; j--) {
                                    bull.end -= core.lenMap[bull.ids[j]];
                                }
                                if (bull.ids.length === 1) {
                                    if (core.teamMap[bull.ids[0]] === 0) {
                                        bull.speed = race.ices[core.teamMap[bull.ids[0]]] ? 0 : core.normalSpeeds[core.typeMap[bull.ids[0]]];
                                    }
                                    else {
                                        bull.speed = race.ices[core.teamMap[bull.ids[0]]] ? 0 : -core.normalSpeeds1[core.typeMap[bull.ids[0]]];
                                    }
                                }
                                core.teamHps[1] -= core.atkMap[bullId];
                                if (core.teamHps[1] <= 0)
                                    core.winTeam = 0;
                            }
                            if (bullId >= 0 && !bull.ids.length) {
                                race.bulls.splice(i, 1);
                                i--;
                            }
                        }
                        if (core.winTeam >= 0)
                            break;
                    }
                    if (core.winTeam >= 0)
                        break;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                }
                finally { if (e_4) throw e_4.error; }
            }
            if (core.winTeam >= 0)
                break;
        }
        core.time = curTime;
        return [core.winTeam, core.teamHps, this.getBullShow(core.races, core.teamMap, core.typeMap, core.lengths, core.lengths1)];
    };
    BullCore.prototype.createBull = function (core, curTime) {
        var op = core.ops[core.opIndex++];
        var type = op.type;
        core.typeMap[core.id] = type;
        core.teamMap[core.id] = op.team;
        if (op.team === 0) {
            var bulls = core.races[op.raceIndex].bulls;
            var length_1 = core.lenMap[core.id] = core.lengths[type];
            if (!bulls.length || bulls[0].end > 0) {
                var bull = new Bull();
                bull.time = curTime;
                core.atkMap[core.id] = core.atks[type];
                core.skillMap[core.id] = core.skills[type];
                bull.ids.splice(0, 0, core.id++);
                bull.start = 0;
                bull.end = -length_1;
                bull.dir = 0;
                bull.strength = core.strengths[type];
                bull.speed = core.normalSpeeds[type];
                bulls.splice(0, 0, bull);
            }
        }
        else {
            var bulls = core.races[op.raceIndex].bulls;
            var length_2 = core.lenMap[core.id] = core.lengths1[type];
            if (!bulls.length || bulls[bulls.length - 1].start < core.raceLength - length_2) {
                var bull = new Bull();
                bull.time = curTime;
                core.atkMap[core.id] = core.atks1[type];
                core.skillMap[core.id] = core.skills1[type];
                bull.ids.push(core.id++);
                bull.start = core.raceLength + length_2;
                bull.end = core.raceLength;
                bull.dir = 1;
                bull.strength = -core.strengths1[type];
                bull.speed = -core.normalSpeeds1[type];
                bulls.push(bull);
            }
        }
    };
    /**
     * 客户端用于计算牛的位置的代码
     * @param races
     * @param teamMap
     * @param typeMap
     * @param lengths
     * @param lengths1
     */
    BullCore.prototype.getBullShow = function (races, teamMap, typeMap, lengths, lengths1) {
        var e_6, _a, e_7, _b, e_8, _c;
        var types = [];
        var teams = [];
        var lens = [];
        var ys = [];
        var raceIndexs = [];
        var starts = [];
        var ends = [];
        try {
            for (var races_1 = __values(races), races_1_1 = races_1.next(); !races_1_1.done; races_1_1 = races_1.next()) {
                var race = races_1_1.value;
                try {
                    for (var _d = (e_7 = void 0, __values(race.bulls)), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var bull = _e.value;
                        var y = bull.end;
                        starts.push(bull.start);
                        ends.push(bull.end);
                        try {
                            for (var _f = (e_8 = void 0, __values(bull.ids)), _g = _f.next(); !_g.done; _g = _f.next()) {
                                var id = _g.value;
                                var len = teamMap[id] === 0 ? lengths[typeMap[id]] : lengths1[typeMap[id]];
                                types.push(typeMap[id]);
                                teams.push(teamMap[id]);
                                lens.push(len);
                                ys.push(y + (teamMap[id] === 0 ? len : 0));
                                raceIndexs.push(race.index);
                                y += len;
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (races_1_1 && !races_1_1.done && (_a = races_1.return)) _a.call(races_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return [types, teams, ys, lens, raceIndexs, starts, ends];
    };
    BullCore.prototype.bullAttack = function (atk, skill, teamHps) {
    };
    BullCore.prototype.random = function (time, weights) {
        var r = (time % 1000) / 1000; // float 0 ~ 0.999
        var s = 0; //weight sum
        for (var i = 0; i < weights.length; i++) {
            s += weights[i];
        }
        r = ~~(r * s); //int 0 ~ s - 1
        for (var i = 0; i < weights.length; i++) {
            if (r < weights[i])
                return i;
        }
        return weights.length - 1;
    };
    /**
     * 计算出牛啥时候到达终点
     * @param curTime
     * @param strength
     * @param y
     * @param speed
     * @param endPos
     */
    BullCore.prototype.getBullToEndTime = function (curTime, speed, distance) {
        var timeGap = 16;
        var time = curTime + 1000 * 1000;
        if (!speed)
            return time;
        if (!distance)
            return curTime;
        if (distance > 0 && speed < 0 || distance < 0 && speed > 0)
            return time;
        var minPos = 0;
        var maxPos = 2048; //牛最慢 2048 * timeGap 毫秒到达终点
        //~~ 取整
        var timePos = ~~((minPos + maxPos) / 2);
        var count = 0;
        while (count < 13) {
            count++;
            var pos = timePos * timeGap * speed;
            if (distance > 0) {
                if (pos >= distance && (timePos - 1) * timeGap * speed < distance) {
                    time = curTime + timePos * timeGap;
                    break;
                }
                if (pos < distance) {
                    minPos = timePos;
                    timePos = ~~((minPos + maxPos) / 2);
                    if (timePos === minPos) {
                        timePos = maxPos;
                        break;
                    }
                }
                else {
                    maxPos = timePos;
                    timePos = ~~((minPos + maxPos) / 2);
                    if (timePos === minPos) {
                        timePos = minPos;
                        break;
                    }
                }
            }
            else {
                if (pos <= distance && (timePos - 1) * timeGap * speed > distance) {
                    time = curTime + timePos * timeGap;
                    break;
                }
                if (pos > distance) {
                    minPos = timePos;
                    timePos = ~~((minPos + maxPos) / 2);
                    if (timePos === minPos) {
                        timePos = maxPos;
                        break;
                    }
                }
                else {
                    maxPos = timePos;
                    timePos = ~~((minPos + maxPos) / 2);
                    if (timePos === minPos) {
                        timePos = minPos;
                        break;
                    }
                }
            }
        }
        return time;
    };
    BullCore.prototype.render = function (bulls, starts, ends) {
        var e_9, _a, e_10, _b;
        var offsets = {
            "bull1-1-1_png": 17,
            "bull1-2-1_png": 12,
            "bull1-4-1_png": 13,
            "bull1-5-1_png": 13
        };
        var offsetx = {
            0: -86 / 2,
            1: -106 / 2,
            2: -141 / 2,
            3: -166 / 2,
            4: -166 / 2
        };
        while (this.entity.children.length) {
            this.entity.children[0].destroy();
        }
        try {
            for (var starts_1 = __values(starts), starts_1_1 = starts_1.next(); !starts_1_1.done; starts_1_1 = starts_1.next()) {
                var n = starts_1_1.value;
                var l = ecs.Entity.create().addComponent(leaf.Bitmap);
                l.texture = leaf.PointTexture.getTexture(0xff0000);
                l.transform.y = n / 1000;
                l.transform.scaleX = 100;
                l.parent = this.entity;
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (starts_1_1 && !starts_1_1.done && (_a = starts_1.return)) _a.call(starts_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        try {
            for (var ends_1 = __values(ends), ends_1_1 = ends_1.next(); !ends_1_1.done; ends_1_1 = ends_1.next()) {
                var n = ends_1_1.value;
                var l = ecs.Entity.create().addComponent(leaf.Bitmap);
                l.texture = leaf.PointTexture.getTexture(0x00ff00);
                l.transform.y = n / 1000;
                l.transform.scaleX = 100;
                l.parent = this.entity;
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (ends_1_1 && !ends_1_1.done && (_b = ends_1.return)) _b.call(ends_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
        var list = bulls.concat();
        list.sort(function (a, b) { return (a.team === 0 ? a.y : a.y + a.length) - (b.team === 0 ? b.y : b.y + b.length); });
        for (var i = 0; i < list.length; i++) {
            var b = ecs.Entity.create().addComponent(leaf.Bitmap);
            var src = "bull1-" + (list[i].type + 1) + "-" + list[i].team + "_png";
            b.resource = src;
            b.parent = this.entity;
            if (list[i].ice)
                b.tint = 0x8888ff;
            b.transform.x = list[i].race * 150 + (offsetx[list[i].type] || 0) + 80;
            b.transform.y = list[i].y / 1000 + (-offsets[src] || 0) + (list[i].team === 0 ? -list[i].length / 1000 : 0);
        }
    };
    return BullCore;
}(ecs.Component));
exports.BullCore = BullCore;
var BullCoreData = /** @class */ (function () {
    function BullCoreData(raceCount) {
        /**
         * 冰冻冷却
         */
        this.ice_cd = 3000;
        /**
         * 执行了多少次
         */
        this.loop = 0;
        this.time = 0;
        this.opIndex = 0;
        this.id = 0;
        this.winTeam = -1;
        this.typeMap = {};
        this.teamMap = {};
        this.lenMap = {};
        // iceMap: { [index: number]: number } = {};
        this.atkMap = {};
        this.skillMap = {};
        //牛的4个动态属性 id、单头牛的长度、合起来后的长度、队伍、坐标、速度、数量、解冻的绝对时间
        this.races = [];
        for (var i = 0; i < raceCount; i++) {
            this.races[i] = new Race();
            this.races[i].index = i;
        }
    }
    return BullCoreData;
}());
var Race = /** @class */ (function () {
    function Race() {
        this.bulls = [];
        this.time = 0;
        //team0 被冰冻结束时间
        this.ices = [0, 0];
    }
    return Race;
}());
var Bull = /** @class */ (function () {
    function Bull() {
        this.ids = [];
        this.start = 0;
        this.end = 0;
        this.dir = 0;
        this.time = 0;
        this.speed = 0;
        this.strength = 0;
    }
    Bull.prototype.updateSpeed = function (teamMap, speeds) {
        var e_11, _a;
        var bull = this;
        bull.speed = 0;
        if (bull.strength) {
            var c = 0;
            try {
                for (var _b = __values(bull.ids), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var id = _c.value;
                    if (teamMap[id] === bull.dir) {
                        c++;
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
            bull.speed = (bull.dir === 0 ? 1 : -1) * speeds[Math.min(speeds.length, c) - 1];
        }
    };
    return Bull;
}());


/***/ }),

/***/ "../src/utils/ui/module-scene.ts":
/*!***************************************!*\
  !*** ../src/utils/ui/module-scene.ts ***!
  \***************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
var ModuleScene = /** @class */ (function () {
    function ModuleScene(scrollSpeed) {
        if (scrollSpeed === void 0) { scrollSpeed = 1; }
        ModuleScene.instance = this;
        if (leaf.world.scene) {
            leaf.world.scene.destroy();
        }
        this.scene = new ecs.Scene();
        leaf.world.scene = this.scene;
        // let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        // bg.texture = leaf.PointTexture.getTexture(0x3f459f);//"blue-bg_png";
        // bg.parent = this.scene;
        // bg.transform.scaleX = leaf.getStageWidth();
        // bg.transform.scaleY = leaf.getStageHeight();
        // let scale = 90 / 274;
        // let w = 90;
        // let h = scale * 292;
        // for (let y = 0; y < Math.ceil(leaf.getStageHeight() / h); y++) {
        //     for (let x = 0; x < Math.ceil(leaf.getStageWidth() / w); x++) {
        //         let sc = ecs.Entity.create().addComponent(leaf.ScrollBitmap);
        //         sc.resource = "blue-bg-scroller_png";
        //         sc.parent = this.scene;
        //         sc.transform.scaleX = sc.transform.scaleY = scale;
        //         sc.transform.x = w * x;
        //         sc.transform.y = h * y;
        //         sc.transform.alpha = 0.35;
        //         sc.addComponent(Scroll, scrollSpeed);
        //     }
        // }
    }
    ModuleScene.prototype.close = function () {
        if (this.scene) {
            if (this.scene.world) {
                this.scene.world.scene = null;
            }
            this.scene.destroy();
            this.scene = null;
        }
    };
    return ModuleScene;
}());
exports.ModuleScene = ModuleScene;
var Scroll = /** @class */ (function (_super) {
    __extends(Scroll, _super);
    function Scroll() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scroll.prototype.init = function (scrollSpeed) {
        this.scrollSpeed = scrollSpeed;
    };
    Scroll.prototype.update = function () {
        var sc = this.getComponent(leaf.ScrollBitmap);
        sc.scrollX += 0.005 * this.scrollSpeed;
        sc.scrollY -= 0.005 * this.scrollSpeed;
    };
    return Scroll;
}(ecs.Component));


/***/ })

/******/ });
//# sourceMappingURL=main.js.map