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
        var _this = this;
        this.transform.x = 0;
        this.transform.y = 250;
        this.runFlag = true;
        var start = ecs.Entity.create().addComponent(leaf.Bitmap);
        start.texture = leaf.PointTexture.getTexture(0xff0000);
        start.transform.scaleX = 640;
        start.transform.scaleY = 1;
        start.transform.y = this.transform.y;
        start.parent = leaf.world.scene;
        this.hp0 = ecs.Entity.create().addComponent(leaf.Label);
        this.hp0.text = "?";
        this.hp0.transform.x = 400;
        this.hp0.parent = leaf.world.scene;
        this.hp1 = ecs.Entity.create().addComponent(leaf.Label);
        this.hp1.text = "?";
        this.hp1.transform.x = 400;
        this.hp1.transform.y = 1200;
        this.hp1.parent = leaf.world.scene;
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
        core.extraAtks = [6, 4, 2, 1, 1];
        core.extraAtksWeight = [50, 50, 50, 50, 50];
        core.suckBlood = [1, 1, 1, 1];
        core.suckBloodWeight = [50, 50, 50, 50, 50];
        core.skills = [0, 0, 0, 0, 9];
        core.shield = 3;
        core.equalsPush = 1;
        core.lengthWeight1 = [60, 60, 30, 10, 10];
        core.normalSpeeds1 = [150, 150, 150, 150, 150];
        core.bigSpeeds1 = [100, 100, 100, 100, 100];
        core.lengths1 = [68000, 87000, 104000, 105000, 105000];
        core.strengths1 = [1, 2, 3, 4, 4];
        core.atks1 = [4, 3, 2, 1, 1];
        core.extraAtks1 = [6, 4, 2, 1, 1];
        core.extraAtksWeight1 = [50, 50, 50, 50, 50];
        core.suckBlood1 = [1, 1, 1, 1];
        core.suckBloodWeight1 = [50, 50, 50, 50, 50];
        core.skills1 = [0, 0, 0, 0, 9];
        core.shield1 = 0;
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
            core.ops.push({ time: time, team: 0, raceIndex: 2, type: ~~(5 * Math.random()) });
            time += 1000 + ~~(Math.random() * 1000);
        }
        time = ~~(5000 * Math.random());
        while (time < core.raceTime) {
            core.ops.push({ time: time, team: 1, raceIndex: 2, type: ~~(5 * Math.random()) });
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
        core.ops = [
            { time: 0, team: 0, raceIndex: 0, type: 2 },
            // { time: 0, team: 0, raceIndex: 0, type: 0 },
            // { time: 4000, team: 0, raceIndex: 0, type: 1 },
            // { time: 6000, team: 0, raceIndex: 0, type: 4 },
            { time: 0, team: 1, raceIndex: 0, type: 3 },
        ];
        core.ops.sort(function (a, b) { return a.time - b.time; });
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
        this.runFlag = false;
        setTimeout(function () {
            _this.runFlag = true;
            // this.time = 275000;
        }, 200);
        setTimeout(function () {
            core.ops.push({ time: 1000, team: 0, raceIndex: 0, type: 0 });
        }, 4000);
    };
    BullCore.prototype.update = function () {
        if (!this.runFlag)
            return;
        this.time += 16;
        this.timeLabel.text = ~~(this.time / 1000) + '/' + (this.core.raceTime / 1000);
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
                race: raceIndexs[i],
                ice: !!this.core.races[raceIndexs[i]].ices[bullTeams[i]]
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
     * skill 1 抵达终点有概率造成双倍伤害 ok
     * skill 2 开局额外获得 10 点血
     * skill 3 开局额外获得 3 个护盾
     * skill 4 抵达终点有概率吸血  ok
     * skill 5 更容易出现 XL 体型的牛  ok
     * skill 6 双方体重相同时可以推动对手   ok
     * skill 7 同一赛道的牛越多，速度越快 ok
     * skill 8 上场时，冰冻对手 3 秒，并且临时置对方的力量为 0 ok
     * skill 9 上场时，清空前面的牛，包含对方的和自己的 ok
     * @param time 比赛时间
     */
    BullCore.prototype.runBullGame = function (core, time) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, e_7, _g, e_8, _h, e_9, _j;
        var curTime = core.time;
        var hasNew = false;
        while (core.winTeam === -1 && (curTime < time || hasNew && curTime === time)) {
            core.loop++;
            hasNew = false;
            //预测下一个事件点
            var realTime = curTime;
            curTime += 1000 * 1000;
            try {
                //解冻
                for (var _k = (e_1 = void 0, __values(core.races)), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var race = _l.value;
                    try {
                        for (var _m = (e_2 = void 0, __values(race.ices)), _o = _m.next(); !_o.done; _o = _m.next()) {
                            var ice = _o.value;
                            if (ice) {
                                curTime = Math.min(curTime, ice);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_o && !_o.done && (_b = _m.return)) _b.call(_m);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_a = _k.return)) _a.call(_k);
                }
                finally { if (e_1) throw e_1.error; }
            }
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
                for (var _p = (e_3 = void 0, __values(core.races)), _q = _p.next(); !_q.done; _q = _p.next()) {
                    var race = _q.value;
                    race.time = realTime + 1000 * 1000;
                    for (var i = 0; i < race.bulls.length; i++) {
                        var bull = race.bulls[i];
                        var nextBull = i < race.bulls.length - 1 ? race.bulls[i + 1] : null;
                        race.time = Math.min(race.time, this.getBullToEndTime(realTime, bull.speed, bull.dir === 0 ? core.raceLength - bull.start + core.lenMap[bull.ids[bull.ids.length - 1]] : 0 - bull.end - core.lenMap[bull.ids[0]]), nextBull ? this.getBullToEndTime(realTime, bull.speed - nextBull.speed, (bull.dir === 0 ? nextBull.end : nextBull.start) - (bull.dir === 0 ? bull.start : bull.end)) : race.time);
                    }
                    curTime = Math.min(curTime, race.time, time);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_q && !_q.done && (_c = _p.return)) _c.call(_p);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                //解冻
                for (var _r = (e_4 = void 0, __values(core.races)), _s = _r.next(); !_s.done; _s = _r.next()) {
                    var race = _s.value;
                    for (var i = 0; i < race.ices.length; i++) {
                        if (race.ices[i] && race.ices[i] <= curTime) {
                            hasNew = true;
                            race.ices[i] = 0;
                            try {
                                for (var _t = (e_5 = void 0, __values(race.bulls)), _u = _t.next(); !_u.done; _u = _t.next()) {
                                    var bull = _u.value;
                                    bull.updateStrength(core);
                                    bull.updateSpeed(core);
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (_u && !_u.done && (_e = _t.return)) _e.call(_t);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                        }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_s && !_s.done && (_d = _r.return)) _d.call(_r);
                }
                finally { if (e_4) throw e_4.error; }
            }
            //执行操作
            if (core.opIndex < core.ops.length && core.ops[core.opIndex].time <= curTime) {
                hasNew = true;
                this.createBull(core, curTime);
            }
            //移动牛
            if (curTime > realTime) {
                try {
                    for (var _v = (e_6 = void 0, __values(core.races)), _w = _v.next(); !_w.done; _w = _v.next()) {
                        var race = _w.value;
                        try {
                            for (var _x = (e_7 = void 0, __values(race.bulls)), _y = _x.next(); !_y.done; _y = _x.next()) {
                                var bull = _y.value;
                                bull.end += bull.speed * (curTime - bull.time);
                                bull.start += bull.speed * (curTime - bull.time);
                                bull.time = curTime;
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (_y && !_y.done && (_g = _x.return)) _g.call(_x);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_w && !_w.done && (_f = _v.return)) _f.call(_v);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            try {
                //碰撞
                for (var _z = (e_8 = void 0, __values(core.races)), _0 = _z.next(); !_0.done; _0 = _z.next()) {
                    var race = _0.value;
                    for (var i = 0; i < race.bulls.length; i++) {
                        var bull = race.bulls[i];
                        if (i < race.bulls.length - 1 && bull.start >= race.bulls[i + 1].end) {
                            hasNew = true;
                            var nextBull = race.bulls[i + 1];
                            race.bulls.splice(i, 1);
                            i--;
                            try {
                                for (var _1 = (e_9 = void 0, __values(nextBull.ids)), _2 = _1.next(); !_2.done; _2 = _1.next()) {
                                    var nid = _2.value;
                                    bull.ids.push(nid);
                                }
                            }
                            catch (e_9_1) { e_9 = { error: e_9_1 }; }
                            finally {
                                try {
                                    if (_2 && !_2.done && (_j = _1.return)) _j.call(_1);
                                }
                                finally { if (e_9) throw e_9.error; }
                            }
                            nextBull.ids = bull.ids;
                            nextBull.end = bull.end + nextBull.end - bull.start;
                            nextBull.updateStrength(core);
                            nextBull.updateSpeed(core);
                        }
                        else {
                            var bullId = -1;
                            if (bull.speed > 0 && bull.start - core.lenMap[bull.ids[bull.ids.length - 1]] >= core.raceLength) {
                                hasNew = true;
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
                                this.bullAttack(core, bullId, 1, curTime);
                            }
                            else if (bull.speed < 0 && bull.end + core.lenMap[bull.ids[0]] <= 0) {
                                hasNew = true;
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
                                this.bullAttack(core, bullId, 0, curTime);
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
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_0 && !_0.done && (_h = _z.return)) _h.call(_z);
                }
                finally { if (e_8) throw e_8.error; }
            }
            if (core.winTeam >= 0)
                break;
        }
        core.time = curTime;
        return [core.winTeam, core.teamHps, this.getBullShow(core.races, core.teamMap, core.typeMap, core.lengths, core.lengths1)];
    };
    BullCore.prototype.createBull = function (core, curTime) {
        var e_10, _a, e_11, _b;
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
                bull.raceIndex = op.raceIndex;
                core.atkMap[core.id] = core.atks[type];
                core.skillMap[core.id] = core.skills[type];
                core.strengthMap[core.id] = core.strengths[type];
                bull.ids.splice(0, 0, core.id++);
                bull.start = 0;
                bull.end = -length_1;
                bull.dir = 0;
                bull.updateStrength(core);
                bull.updateSpeed(core);
                if (core.skills[type] === 8) { //冰冻
                    var race = core.races[op.raceIndex];
                    race.ices[1] = curTime + 3000;
                    try {
                        for (var _c = __values(race.bulls), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var bull_1 = _d.value;
                            bull_1.updateStrength(core);
                            bull_1.updateSpeed(core);
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
                else if (core.skills[type] === 9) { //清空前面所有的牛
                    core.races[op.raceIndex].bulls.length = 0;
                }
                bulls.splice(0, 0, bull);
            }
        }
        else {
            var bulls = core.races[op.raceIndex].bulls;
            var length_2 = core.lenMap[core.id] = core.lengths1[type];
            if (!bulls.length || bulls[bulls.length - 1].start < core.raceLength - length_2) {
                var bull = new Bull();
                bull.time = curTime;
                bull.raceIndex = op.raceIndex;
                core.atkMap[core.id] = core.atks1[type];
                core.skillMap[core.id] = core.skills1[type];
                core.strengthMap[core.id] = -core.strengths1[type];
                bull.ids.push(core.id++);
                bull.start = core.raceLength + length_2;
                bull.end = core.raceLength;
                bull.dir = 1;
                bull.updateStrength(core);
                bull.updateSpeed(core);
                if (core.skills[type] === 8) { //冰冻
                    var race = core.races[op.raceIndex];
                    race.ices[0] = curTime + 3000;
                    try {
                        for (var _e = __values(race.bulls), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var bull_2 = _f.value;
                            bull_2.updateStrength(core);
                            bull_2.updateSpeed(core);
                        }
                    }
                    catch (e_11_1) { e_11 = { error: e_11_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_11) throw e_11.error; }
                    }
                }
                else if (core.skills[type] === 9) { //清空前面所有的牛
                    core.races[op.raceIndex].bulls.length = 0;
                }
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
        var e_12, _a, e_13, _b, e_14, _c;
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
                    for (var _d = (e_13 = void 0, __values(race.bulls)), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var bull = _e.value;
                        var y = bull.end;
                        starts.push(bull.start);
                        ends.push(bull.end);
                        try {
                            for (var _f = (e_14 = void 0, __values(bull.ids)), _g = _f.next(); !_g.done; _g = _f.next()) {
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
                        catch (e_14_1) { e_14 = { error: e_14_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                            }
                            finally { if (e_14) throw e_14.error; }
                        }
                    }
                }
                catch (e_13_1) { e_13 = { error: e_13_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_13) throw e_13.error; }
                }
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (races_1_1 && !races_1_1.done && (_a = races_1.return)) _a.call(races_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return [types, teams, ys, lens, raceIndexs, starts, ends];
    };
    BullCore.prototype.bullAttack = function (core, bullId, beAttackedTeam, time) {
        var extraAtk = 0;
        var type = core.typeMap[bullId];
        var r = this.getRandom(time);
        if (core.teamMap[bullId] === 0) {
            if (r * 100 < core.extraAtksWeight[type]) {
                extraAtk = core.extraAtks[type];
            }
        }
        else {
            if (r * 100 < core.extraAtksWeight1[type]) {
                extraAtk = core.extraAtks1[type];
            }
        }
        var suckBlood = 0;
        if (core.teamMap[bullId] === 0 && beAttackedTeam === 1) {
            if (r * 100 < core.suckBloodWeight[type]) {
                suckBlood = core.suckBlood[type];
            }
        }
        else if (core.teamMap[bullId] === 1 && beAttackedTeam === 0) {
            if (r * 100 < core.suckBloodWeight1[type]) {
                suckBlood = core.suckBlood1[type];
            }
        }
        if (beAttackedTeam === 0) {
            if (core.shield) {
                core.shield--;
            }
            else {
                core.teamHps[0] -= core.atkMap[bullId] + extraAtk;
                if (core.teamHps[0] <= 0)
                    core.winTeam = 1;
                if (suckBlood)
                    core.teamHps[1] += suckBlood;
            }
        }
        else {
            core.teamHps[1] -= core.atkMap[bullId] + extraAtk;
            if (core.teamHps[1] <= 0)
                core.winTeam = 0;
            if (suckBlood)
                core.teamHps[0] += suckBlood;
        }
    };
    BullCore.prototype.getRandom = function (time) {
        return (time % 1000) / 1000; // float 0 ~ 0.999
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
        var e_15, _a, e_16, _b;
        this.hp0.text = this.core.teamHps[0] + '';
        this.hp1.text = this.core.teamHps[1] + '';
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
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (starts_1_1 && !starts_1_1.done && (_a = starts_1.return)) _a.call(starts_1);
            }
            finally { if (e_15) throw e_15.error; }
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
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (ends_1_1 && !ends_1_1.done && (_b = ends_1.return)) _b.call(ends_1);
            }
            finally { if (e_16) throw e_16.error; }
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
        this.strengthMap = {};
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
    Bull.prototype.updateStrength = function (core) {
        var e_17, _a;
        var strength = 0;
        try {
            for (var _b = __values(this.ids), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                if (core.teamMap[id] === 0) {
                    if (!core.races[this.raceIndex].ices[0]) {
                        strength += core.strengthMap[id];
                    }
                }
                else {
                    if (!core.races[this.raceIndex].ices[1]) {
                        strength += core.strengthMap[id];
                    }
                }
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_17) throw e_17.error; }
        }
        if (this.ids.length === 1)
            this.dir = core.teamMap[this.ids[0]];
        else
            this.dir = strength >= 0 ? 0 : 1;
        this.strength = strength;
    };
    Bull.prototype.updateSpeed = function (core) {
        var e_18, _a;
        var bull = this;
        bull.speed = 0;
        if (bull.strength || core.equalsPush != -1) {
            var c = 0;
            try {
                for (var _b = __values(bull.ids), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var id = _c.value;
                    if (core.teamMap[id] === bull.dir || !bull.strength && core.teamMap[id] === core.equalsPush) {
                        c++;
                    }
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_18) throw e_18.error; }
            }
            if (c) {
                var speeds = bull.ids.length > 1 ? (this.strength > 0 || this.strength === 0 && core.equalsPush === 0 ? core.bigSpeeds : core.bigSpeeds1) : (this.strength >= 0 ? core.normalSpeeds : core.normalSpeeds1);
                bull.speed = (bull.strength > 0 || bull.strength === 0 && core.equalsPush === 0 ? 1 : -1) * speeds[Math.min(speeds.length, c) - 1];
            }
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