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
Object.defineProperty(exports, "__esModule", { value: true });
orange.autoloadLink("BullScene");
var BullCore = /** @class */ (function (_super) {
    __extends(BullCore, _super);
    function BullCore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //比赛时间
        _this.raceTime = 30;
        _this.raceLength = 500 * 1000;
        _this.normalSpeed = 100;
        _this.winSpeed = 50;
        _this.specialSpeed = 200;
        _this.lengths = [84 - 16, 100 - 13, 107 - 3, 124 - 19];
        _this.strengths = [5, 10, 20, 40];
        _this.atks = [1, 2, 3, 4];
        _this.skills = [0, 0, 0, 0];
        _this.sizes = [1, 2, 3, 4];
        _this.time = 0;
        return _this;
    }
    BullCore.prototype.init = function () {
        this.transform.x = 200;
        this.transform.y = 150;
        this.runFlag = true;
    };
    BullCore.prototype.update = function () {
        if (!this.runFlag)
            return;
        this.time += 16;
        var _a = __read(this.runBullGame([
            { time: 0, team: 0, raceIndex: 0 }
        ], 4, this.raceLength, [60, 60, 30, 10], [150, 150, 150, 150], [100, 100, 100, 100], [100, 100], this.lengths, this.strengths, this.atks, this.skills, Math.min(this.time, this.raceTime * 1000)), 5), win = _a[0], teamHps = _a[1], bullTypes = _a[2], bullTeams = _a[3], bullYs = _a[4];
        var bulls = [];
        for (var i = 0; i < bullTypes.length; i++) {
            bulls.push({
                type: bullTypes[i],
                team: bullTeams[i],
                y: bullYs[i]
            });
        }
        if (teamHps[0] <= 0 || teamHps[1] <= 0 || this.time >= this.raceTime * 1000) {
            this.runFlag = false;
            console.error("winner", teamHps[0] > teamHps[1] ? 0 : 1);
        }
        this.render(bulls);
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
    BullCore.prototype.runBullGame = function (ops, raceCount, raceLength, lengthWeight, normalSpeeds, bigSpeeds, lengths, strengths, atks, skills, lengthWeight1, normalSpeeds1, bigSpeeds1, lengths1, strengths1, atks1, skills1, teamHps, time) {
        //牛的 id 计数器
        var id = 0;
        var winTeam = -1;
        //牛的4个动态属性 id、单头牛的长度、合起来后的长度、队伍、坐标、速度、数量、解冻的绝对时间
        var bullIds0 = [];
        var bullLengths0 = [];
        var bullMergeLengths0 = [];
        var bullTeams0 = [];
        var bullYs0 = [];
        var bullSpeeds0 = [];
        var bullCounts0 = [];
        var bullIces0 = [];
        var bullIds1 = [];
        var bullLengths1 = [];
        var bullMergeLengths1 = [];
        var bullTeams1 = [];
        var bullYs1 = [];
        var bullSpeeds1 = [];
        var bullCounts1 = [];
        var bullIces1 = [];
        //合体牛包含 id
        var bigBullIds = [];
        //合体牛的长度
        var bigBullLength = [];
        //合体牛的力量 team0 strength 为正， team1 strength 为负
        var bigBullStrength = [];
        //合体牛的位置
        var bigBullY = [];
        //合体牛的速度
        var bigBullSpeed = [];
        //每条赛道的时间
        var raceTime = [];
        for (var i = 0; i < raceCount; i++) {
            bullIds0[i] = [];
            bullLengths0[i] = [];
            bullMergeLengths0 = [];
            bullTeams0[i] = [];
            bullYs0[i] = [];
            bullSpeeds0[i] = 0;
            bullCounts0[i] = 0;
            bullIds1[i] = [];
            bullMergeLengths1[i] = [];
            bullLengths1[i] = [];
            bullTeams1[i] = [];
            bullYs1[i] = [];
            bullSpeeds1[i] = 0;
            bullCounts1[i] = 0;
            bigBullIds[i] = [];
            bigBullLength[i] = 0;
            bigBullStrength[i] = 0;
            bigBullY[i] = 0;
            bigBullSpeed[i] = 0;
            raceTime[i] = 0;
        }
        //当前跨度
        var curTime = 0;
        //当前执行过的操作索引
        var opIndex = 0;
        //最大执行次数
        var maxWhileCount = Math.ceil(time / 16); //ceil 取上限
        var maxWhileIndex = 0;
        while (maxWhileIndex < maxWhileCount && winTeam === -1 && curTime <= time) {
            //预测下一个事件点
            maxWhileIndex++;
            curTime += 1000 * 1000;
            //操作事件
            if (opIndex < ops.length) {
                var op = ops[opIndex];
                if (op.time <= curTime) {
                    curTime = Math.ceil(op.time / 16) * 16;
                }
            }
            for (var k = 0; k < raceCount; k++) {
                raceTime[k] = curTime + 1000 * 1000;
                if (bigBullLength[k] > 0) { //合体牛相关事件
                    raceTime[k] = Math.min(raceTime[k], this.getBullToEndTime(raceTime[k], bigBullSpeed[k], raceLength), bullIds0[k].length ? raceTime[k] : this.getBullToEndTime(raceTime[k], bullSpeeds0[k][0] - bigBullSpeed[k], bigBullY[k] - bigBullLength[k] - bullYs0[k][0]), bullIds1[k].length ? raceTime[k] : this.getBullToEndTime(raceTime[k], bullSpeeds1[k][0] - bigBullSpeed[k], bigBullY[k] - bigBullLength[k] - bullYs1[k][0]));
                }
                else { //无合体牛事件
                    raceTime[k] = Math.min(raceTime[k], bullIds0[k].length && !bullIds1[k].length ? this.getBullToEndTime(raceTime[k], bullSpeeds0[k][0], raceLength - bullYs0[k][0]) : raceTime[k], !bullIds0[k].length && bullIds1[k].length ? this.getBullToEndTime(raceTime[k], bullSpeeds1[k][0], -bullYs1[k][0]) : raceTime[k], bullIds0[k].length && bullIds1[k].length ? this.getBullToEndTime(raceTime[k], bullSpeeds0[k][0] - bullSpeeds1[k][0], bullYs0[k][0] - bullYs1[k][0]) : raceTime[k]);
                }
                curTime = Math.min(curTime, raceTime[k]);
            }
            if (opIndex < ops.length) {
                var op = ops[opIndex];
                if (op.time <= curTime) { //放牛
                    if (op.team === 0) {
                        var length_1 = lengths[this.random(lengthWeight)];
                        bullIds0[op.raceIndex].push([id++]);
                        bullLengths0[op.raceIndex].push([length_1]);
                        bullMergeLengths0[op.raceIndex].push(length_1);
                        bullTeams0[op.raceIndex].push(op.team);
                        bullYs0[op.raceIndex].push(0);
                        bullCounts0[op.raceIndex]++;
                        bullSpeeds0[op.raceIndex] = normalSpeeds[Math.min(normalSpeeds.length - 1, bullCounts0[op.raceIndex])];
                        if (bigBullLength[op.raceIndex] && bigBullSpeed[op.raceIndex] > 0)
                            bigBullSpeed[op.raceIndex] = bigSpeeds[Math.min(bigSpeeds.length - 1, bullCounts0[op.raceIndex])];
                    }
                    else {
                        bullIds1[op.raceIndex].push([id++]);
                        bullLengths1[op.raceIndex].push([op.type]);
                        bullTeams1[op.raceIndex].push(op.team);
                        bullYs1[op.raceIndex].push(0);
                        bullCounts1[op.raceIndex]++;
                        bullSpeeds1[op.raceIndex] = normalSpeeds[Math.min(normalSpeeds.length - 1, bullCounts1[op.raceIndex])];
                        if (bigBullLength[op.raceIndex] && bigBullSpeed[op.raceIndex] > 0)
                            bigBullSpeed[op.raceIndex] = bigSpeeds[Math.min(bigSpeeds.length - 1, bullCounts1[op.raceIndex])];
                    }
                }
            }
        }
        var bulls = [];
        // for (let n = 1; n < raceCount; n++) {
        //     bullLengths0[0] = bullLengths0[0].concat(bullLengths0[n]);
        //     bullTeams0[0] = bullTeams0[0].concat(bullTeams0[n]);
        //     bullYs0[0] = bullYs0[0].concat(bullYs0[n]);
        // }
        var types = [];
        // for (let ts of bullLengths0) {
        //     types = types.concat(ts);
        // }
        return [winTeam, teamHps, types, bullTeams0[0], bullYs0[0]];
    };
    BullCore.prototype.bullAttack = function (atk, skill, teamHps) {
    };
    BullCore.prototype.random = function (weights) {
        var r = Math.random();
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
            time;
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
    BullCore.prototype.render = function (bulls) {
        while (this.entity.children.length) {
            this.entity.children[0].destroy();
        }
        var list = bulls.concat();
        list.sort(function (a, b) { return a.y - b.y; });
        for (var i = 0; i < list.length; i++) {
            var b = ecs.Entity.create().addComponent(leaf.Bitmap);
            b.resource = "bull1-" + this.sizes[list[i].type] + "-" + (list[i].team + 1) + "_png";
            b.parent = this.entity;
            b.transform.y = list[i].y / 1000;
        }
    };
    return BullCore;
}(ecs.Component));
exports.BullCore = BullCore;


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