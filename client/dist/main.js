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
var puzzle_script_scene_1 = __webpack_require__(/*! ./modules/puzzle-script/puzzle-script-scene */ "../src/modules/puzzle-script/puzzle-script-scene.ts");
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
                        leaf.world.root.transform.scaleX = leaf.world.root.transform.scaleY = leaf.GLCore.width / 256;
                        console.error(leaf.GLCore.width, leaf.world.root.transform.scaleX);
                        leaf.Res.loadResources().then(function () {
                            leaf.Res.getRes("block_png").load().then(function () {
                                // new PuzzleScene();
                                // new FaceScene();
                                new puzzle_script_scene_1.PuzzleScriptScene();
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

/***/ "../src/modules/puzzle-script/components/puzzle-script-game-key-board.ts":
/*!*******************************************************************************!*\
  !*** ../src/modules/puzzle-script/components/puzzle-script-game-key-board.ts ***!
  \*******************************************************************************/
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
var puzzle_script_game_1 = __webpack_require__(/*! ./puzzle-script-game */ "../src/modules/puzzle-script/components/puzzle-script-game.ts");
var PuzzleScriptGameKeyBoard = /** @class */ (function (_super) {
    __extends(PuzzleScriptGameKeyBoard, _super);
    function PuzzleScriptGameKeyBoard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleScriptGameKeyBoard.prototype.awake = function () {
        var _this = this;
        window.onkeydown = function (e) {
            console.error(e.keyCode);
            if (e.keyCode === 87 || e.keyCode === 38) {
                _this.getComponent(puzzle_script_game_1.PuzzleScriptGame).data.run("up");
            }
            else if (e.keyCode === 83 || e.keyCode === 40) {
                _this.getComponent(puzzle_script_game_1.PuzzleScriptGame).data.run("down");
            }
            else if (e.keyCode === 65 || e.keyCode === 37) {
                _this.getComponent(puzzle_script_game_1.PuzzleScriptGame).data.run("left");
            }
            else if (e.keyCode === 68 || e.keyCode === 39) {
                _this.getComponent(puzzle_script_game_1.PuzzleScriptGame).data.run("right");
            }
            else if (e.keyCode === 90) {
                _this.getComponent(puzzle_script_game_1.PuzzleScriptGame).data.run("undo");
            }
            else if (e.keyCode === 82) {
                _this.getComponent(puzzle_script_game_1.PuzzleScriptGame).data.run("restart");
            }
        };
    };
    return PuzzleScriptGameKeyBoard;
}(ecs.Component));
exports.PuzzleScriptGameKeyBoard = PuzzleScriptGameKeyBoard;


/***/ }),

/***/ "../src/modules/puzzle-script/components/puzzle-script-game.ts":
/*!*********************************************************************!*\
  !*** ../src/modules/puzzle-script/components/puzzle-script-game.ts ***!
  \*********************************************************************/
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
var puzzle_script_game_data_1 = __webpack_require__(/*! ../data/puzzle-script-game-data */ "../src/modules/puzzle-script/data/puzzle-script-game-data.ts");
var puzzle_script_game_key_board_1 = __webpack_require__(/*! ./puzzle-script-game-key-board */ "../src/modules/puzzle-script/components/puzzle-script-game-key-board.ts");
orange.autoloadLink("PuzzleScriptScene");
var PuzzleScriptGame = /** @class */ (function (_super) {
    __extends(PuzzleScriptGame, _super);
    function PuzzleScriptGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleScriptGame.prototype.init = function (game, level) {
        if (level === void 0) { level = 0; }
        this.level = level;
        this.gridsRoot = ecs.Entity.create();
        this.gridsRoot.parent = this.entity;
        this.data = puzzle_script_game_data_1.PuzzleScriptGameData.getGameData(game);
        if (!this.data.data) {
            this.data.onComplete.on(this.onDataReady, this);
            this.data.load();
        }
        else {
            this.onDataReady();
        }
    };
    PuzzleScriptGame.prototype.onDataReady = function () {
        this.createLevel();
        //创建纹理
        this.transform.scaleX = this.transform.scaleY = 5;
        this.bitmaps = [];
        for (var l = 0; l < this.data.data.collisionLayers.length; l++) {
            this.bitmaps[l] = [];
            for (var y = 0; y < this.height; y++) {
                this.bitmaps[l][y] = [];
            }
        }
        this.addComponent(puzzle_script_game_key_board_1.PuzzleScriptGameKeyBoard);
    };
    PuzzleScriptGame.prototype.update = function () {
        var e_1, _a;
        if (this.bitmaps) {
            for (var l = 0; l < this.data.data.collisionLayers.length; l++) {
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        if (this.bitmaps[l][y][x]) {
                            this.bitmaps[l][y][x].texture = null;
                        }
                        var index = y + x * this.height;
                        var mask = window["level"].objects[index];
                        try {
                            for (var _b = (e_1 = void 0, __values(this.data.data.collisionLayers[l])), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var name_1 = _c.value;
                                var objMask = this.data.data.objectMasks[name_1].data;
                                var flag = true;
                                for (var i = 0; i < objMask.length; i++) {
                                    if (!(objMask[i] & mask))
                                        flag = false;
                                }
                                if (flag) {
                                    if (!this.bitmaps[l][y][x]) {
                                        this.bitmaps[l][y][x] = ecs.Entity.create().addComponent(leaf.Bitmap);
                                        this.bitmaps[l][y][x].parent = this.gridsRoot;
                                        this.bitmaps[l][y][x].transform.x = x * this.data.blockWidth;
                                        this.bitmaps[l][y][x].transform.y = y * this.data.blockHeight;
                                    }
                                    var bm = this.bitmaps[l][y][x];
                                    bm.texture = this.data.getObjectTexture(name_1);
                                    break;
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
                    }
                }
            }
        }
    };
    PuzzleScriptGame.prototype.createLevel = function () {
        window["loadLevelFromState"](this.data.data, this.level);
    };
    Object.defineProperty(PuzzleScriptGame.prototype, "width", {
        get: function () {
            return window["level"].width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PuzzleScriptGame.prototype, "height", {
        get: function () {
            return window["level"].height;
        },
        enumerable: true,
        configurable: true
    });
    PuzzleScriptGame.prototype.onDestroy = function () {
        this.data.onComplete.remove(this.onDataReady, this);
        this.data = null;
        this.gridsRoot = null;
        this.bitmaps = null;
    };
    return PuzzleScriptGame;
}(ecs.Component));
exports.PuzzleScriptGame = PuzzleScriptGame;


/***/ }),

/***/ "../src/modules/puzzle-script/data/puzzle-script-game-data.ts":
/*!********************************************************************!*\
  !*** ../src/modules/puzzle-script/data/puzzle-script-game-data.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PuzzleScriptGameData = /** @class */ (function () {
    function PuzzleScriptGameData(name) {
        this.blockWidth = 5;
        this.blockHeight = 5;
        this.objectTexture = {};
        this.isLoading = false;
        this.onComplete = new ecs.Broadcast();
        this.name = name;
    }
    Object.defineProperty(PuzzleScriptGameData.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PuzzleScriptGameData.prototype, "levels", {
        get: function () {
            return this._levels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PuzzleScriptGameData.prototype, "objects", {
        get: function () {
            return this.data.objects;
        },
        enumerable: true,
        configurable: true
    });
    PuzzleScriptGameData.prototype.start = function (level) {
        window["loadLevelFromState"](this._data, this.levels[level].index);
    };
    PuzzleScriptGameData.prototype.getObjectTexture = function (name) {
        if (this.objectTexture[name])
            return this.objectTexture[name];
        var colors = [];
        var colorTable = [];
        var obj = this.data.objects[name];
        for (var o = 0; o < obj.colors.length; o++) {
            colorTable[o] = 0;
            var cstr = this.data.objects[name].colors[o];
            cstr = cstr.slice(1, cstr.length);
            var nums = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 };
            for (var i = 0; i < cstr.length; i++) {
                var char = cstr.charAt(cstr.length - 1 - i);
                colorTable[o] += (nums[char]) * Math.pow(16, i);
            }
        }
        var colorSum = '';
        var source = this.data.objects[name].spritematrix;
        for (var y = 0; y < source.length; y++) {
            colors[y] = [];
            for (var x = 0; x < source[y].length; x++) {
                var index = +source[y][x];
                var color = null;
                if (index >= 0 || index < colorTable.length)
                    color = colorTable[index];
                colors[y][x] = color;
                colorSum += (color || '.') + "_";
            }
            colorSum += "|";
        }
        return this.objectTexture[name] = leaf.RectTexture.getTexture(colors, colorSum);
    };
    PuzzleScriptGameData.prototype.run = function (op) {
        if (op === "up") {
            window["processInput"](0);
        }
        else if (op === "down") {
            window["processInput"](2);
        }
        else if (op === "left") {
            window["processInput"](1);
        }
        else if (op === "right") {
            window["processInput"](3);
        }
        else if (op === "undo") {
            window["processInput"]("undo");
            window["DoUndo"](false, true);
        }
        else if (op === 'restart') {
            window["processInput"]("restart");
            window["DoRestart"]();
        }
        else {
            window["processInput"](4);
        }
    };
    PuzzleScriptGameData.prototype.load = function () {
        var _this = this;
        if (this._data)
            return;
        if (this.isLoading)
            return;
        console.error("load game", this.name);
        this.isLoading = true;
        leaf.Res.getRes(this.name).load().then(function (r) {
            _this.isLoading = false;
            _this._data = compile(["restart"], r.data);
            _this._levels = [];
            for (var i = 0; i < _this._data.levels.length; i++) {
                if (_this._data.levels[i] && !_this._data.levels[i].message) {
                    _this._data.levels[i].index = _this._levels.length;
                    _this._levels.push(_this._data.levels[i]);
                }
            }
            _this.onComplete.dispatch(_this.data);
        });
    };
    PuzzleScriptGameData.getGameData = function (name) {
        if (!this.games[name]) {
            this.games[name] = new PuzzleScriptGameData(name);
        }
        return this.games[name];
    };
    PuzzleScriptGameData.games = {};
    return PuzzleScriptGameData;
}());
exports.PuzzleScriptGameData = PuzzleScriptGameData;


/***/ }),

/***/ "../src/modules/puzzle-script/puzzle-script-scene.ts":
/*!***********************************************************!*\
  !*** ../src/modules/puzzle-script/puzzle-script-scene.ts ***!
  \***********************************************************/
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
var puzzle_script_game_1 = __webpack_require__(/*! ./components/puzzle-script-game */ "../src/modules/puzzle-script/components/puzzle-script-game.ts");
var PuzzleScriptScene = /** @class */ (function (_super) {
    __extends(PuzzleScriptScene, _super);
    function PuzzleScriptScene(game, level) {
        if (game === void 0) { game = 'game1-4_txt'; }
        if (level === void 0) { level = 1; }
        var _this = _super.call(this) || this;
        ecs.Entity.create().addComponent(puzzle_script_game_1.PuzzleScriptGame, game, level).parent = _this.scene;
        return _this;
    }
    PuzzleScriptScene = __decorate([
        orange.autoload("PuzzleScriptScene")
    ], PuzzleScriptScene);
    return PuzzleScriptScene;
}(module_scene_1.ModuleScene));
exports.PuzzleScriptScene = PuzzleScriptScene;


/***/ }),

/***/ "../src/utils/ui/module-scene.ts":
/*!***************************************!*\
  !*** ../src/utils/ui/module-scene.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModuleScene = /** @class */ (function () {
    function ModuleScene() {
        this.scene = new ecs.Scene();
        leaf.world.scene = this.scene;
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


/***/ })

/******/ });
//# sourceMappingURL=main.js.map