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
var puzzle_scene_1 = __webpack_require__(/*! ./modules/puzzle/puzzle-scene */ "../src/modules/puzzle/puzzle-scene.ts");
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
                                new puzzle_scene_1.PuzzleScene();
                                // new FaceScene();
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

/***/ "../src/modules/puzzle/component/puzzle-game-debug.ts":
/*!************************************************************!*\
  !*** ../src/modules/puzzle/component/puzzle-game-debug.ts ***!
  \************************************************************/
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
var puzzle_game_level_1 = __webpack_require__(/*! ./puzzle-game-level */ "../src/modules/puzzle/component/puzzle-game-level.ts");
var puzzle_game_config_1 = __webpack_require__(/*! ../config/puzzle-game-config */ "../src/modules/puzzle/config/puzzle-game-config.ts");
orange.autoloadLink("PuzzleScene");
var PuzzleGameDebug = /** @class */ (function (_super) {
    __extends(PuzzleGameDebug, _super);
    function PuzzleGameDebug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleGameDebug.prototype.awake = function () {
        return;
        var level = this.getComponent(puzzle_game_level_1.PuzzleGameLevel);
        for (var y = 0; y < level.config.height; y++) {
            for (var x = 0; x < level.config.width; x++) {
                ecs.Entity.create().
                    addComponent(PuzzleGameCoordDebug, x, y, level.layers[level.config.game.groups[puzzle_game_config_1.EMPuzzleConst.PLAYER][0].layer]).entity.parent = this.entity;
            }
        }
    };
    return PuzzleGameDebug;
}(ecs.Component));
exports.PuzzleGameDebug = PuzzleGameDebug;
var PuzzleGameCoordDebug = /** @class */ (function (_super) {
    __extends(PuzzleGameCoordDebug, _super);
    function PuzzleGameCoordDebug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleGameCoordDebug.prototype.init = function (x, y, layer) {
        this.x = x;
        this.y = y;
        this.entity.transform.x = x * layer.levelConfig.game.blockWidth;
        this.entity.transform.y = y * layer.levelConfig.game.blockHeight;
        this.layer = layer;
        var lb = this.addComponent(leaf.Label);
        lb.fontSize = 12;
        lb.fontSize = 12;
        lb.fontColor = 0xff0000;
        lb.transform.scaleX = lb.transform.scaleY = 0.1;
    };
    PuzzleGameCoordDebug.prototype.update = function () {
        this.getComponent(leaf.Label).text = this.x + ' ' + this.y + '\n'
            + (this.layer.objects[this.y][this.x] ? this.layer.objects[this.y][this.x].id : '') + '\n';
    };
    return PuzzleGameCoordDebug;
}(ecs.Component));


/***/ }),

/***/ "../src/modules/puzzle/component/puzzle-game-keyboard.ts":
/*!***************************************************************!*\
  !*** ../src/modules/puzzle/component/puzzle-game-keyboard.ts ***!
  \***************************************************************/
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
var puzzle_game_loop_1 = __webpack_require__(/*! ./puzzle-game-loop */ "../src/modules/puzzle/component/puzzle-game-loop.ts");
var puzzle_game_config_1 = __webpack_require__(/*! ../config/puzzle-game-config */ "../src/modules/puzzle/config/puzzle-game-config.ts");
var puzzle_game_1 = __webpack_require__(/*! ./puzzle-game */ "../src/modules/puzzle/component/puzzle-game.ts");
var PuzzleGameKeyBoard = /** @class */ (function (_super) {
    __extends(PuzzleGameKeyBoard, _super);
    function PuzzleGameKeyBoard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleGameKeyBoard.prototype.awake = function () {
        var _this = this;
        window.onkeydown = function (e) {
            console.error(e.keyCode);
            if (e.keyCode === 87 || e.keyCode === 38) {
                _this.getComponent(puzzle_game_loop_1.PuzzleGameLoop).run(puzzle_game_config_1.EMPuzzleMove.UP);
            }
            else if (e.keyCode === 83 || e.keyCode === 40) {
                _this.getComponent(puzzle_game_loop_1.PuzzleGameLoop).run(puzzle_game_config_1.EMPuzzleMove.DOWN);
            }
            else if (e.keyCode === 65 || e.keyCode === 37) {
                _this.getComponent(puzzle_game_loop_1.PuzzleGameLoop).run(puzzle_game_config_1.EMPuzzleMove.LEFT);
            }
            else if (e.keyCode === 68 || e.keyCode === 39) {
                _this.getComponent(puzzle_game_loop_1.PuzzleGameLoop).run(puzzle_game_config_1.EMPuzzleMove.RIGHT);
            }
            else if (e.keyCode === 90) {
                _this.getComponent(puzzle_game_loop_1.PuzzleGameLoop).back();
            }
            else if (e.keyCode === 82) {
                _this.getComponent(puzzle_game_1.PuzzleGame).reload();
            }
        };
    };
    return PuzzleGameKeyBoard;
}(ecs.Component));
exports.PuzzleGameKeyBoard = PuzzleGameKeyBoard;


/***/ }),

/***/ "../src/modules/puzzle/component/puzzle-game-layer.ts":
/*!************************************************************!*\
  !*** ../src/modules/puzzle/component/puzzle-game-layer.ts ***!
  \************************************************************/
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
var puzzle_game_object_1 = __webpack_require__(/*! ./puzzle-game-object */ "../src/modules/puzzle/component/puzzle-game-object.ts");
orange.autoloadLink("PuzzleScene");
var PuzzleGameLayer = /** @class */ (function (_super) {
    __extends(PuzzleGameLayer, _super);
    function PuzzleGameLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.objects = [];
        _this.ruleObjects = [];
        return _this;
    }
    PuzzleGameLayer.prototype.init = function (levelConfig, cfg, layerIndex) {
        this.levelConfig = levelConfig;
        this.isStatic = true;
        this.layerIndex = layerIndex;
        for (var y = 0; y < levelConfig.height; y++) {
            this.objects[y] = [];
            for (var x = 0; x < levelConfig.width; x++) {
                this.objects[y][x] = null;
                if (!cfg)
                    continue;
                var objCfg = cfg[y] && cfg[y][x];
                if (!objCfg) {
                    if (layerIndex === 0) {
                        if (levelConfig.game.objects["background"]) {
                            ecs.Entity.create().addComponent(puzzle_game_object_1.PuzzleGameObject, this, levelConfig.game.objects["background"], x, y);
                        }
                    }
                }
                else {
                    if (levelConfig.game.ruleObjects.indexOf(objCfg) != -1)
                        this.isStatic = false;
                    ecs.Entity.create().addComponent(puzzle_game_object_1.PuzzleGameObject, this, objCfg, x, y);
                }
            }
        }
        if (this.isStatic) {
            // this.addComponent(leaf.BatchRender);
        }
    };
    PuzzleGameLayer.prototype.getObjectByType = function (type) {
        var e_1, _a;
        try {
            for (var _b = __values(this.ruleObjects), _c = _b.next(); !_c.done; _c = _b.next()) {
                var obj = _c.value;
                if (obj.config === type)
                    return obj;
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
    PuzzleGameLayer.prototype.getObjectsByType = function (type) {
        var e_2, _a;
        var list = [];
        try {
            for (var _b = __values(this.ruleObjects), _c = _b.next(); !_c.done; _c = _b.next()) {
                var obj = _c.value;
                if (obj.config === type)
                    list.push(obj);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return list;
    };
    return PuzzleGameLayer;
}(ecs.Component));
exports.PuzzleGameLayer = PuzzleGameLayer;


/***/ }),

/***/ "../src/modules/puzzle/component/puzzle-game-level.ts":
/*!************************************************************!*\
  !*** ../src/modules/puzzle/component/puzzle-game-level.ts ***!
  \************************************************************/
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
var puzzle_game_layer_1 = __webpack_require__(/*! ./puzzle-game-layer */ "../src/modules/puzzle/component/puzzle-game-layer.ts");
var puzzle_game_loop_1 = __webpack_require__(/*! ./puzzle-game-loop */ "../src/modules/puzzle/component/puzzle-game-loop.ts");
var puzzle_game_debug_1 = __webpack_require__(/*! ./puzzle-game-debug */ "../src/modules/puzzle/component/puzzle-game-debug.ts");
var puzzle_game_1 = __webpack_require__(/*! ./puzzle-game */ "../src/modules/puzzle/component/puzzle-game.ts");
orange.autoloadLink("PuzzleScene");
var PuzzleGameLevel = /** @class */ (function (_super) {
    __extends(PuzzleGameLevel, _super);
    function PuzzleGameLevel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layers = [];
        return _this;
    }
    PuzzleGameLevel.prototype.init = function (cfg) {
        var e_1, _a;
        var game = this.getComponent(puzzle_game_1.PuzzleGame);
        this.state = 'game';
        this.config = cfg;
        var layerIndex = 0;
        var width = (this.config.width * this.config.game.blockWidth);
        var height = (this.config.height * this.config.game.blockHeight);
        var maxWidth = leaf.getStageWidth();
        var maxHeight = leaf.getStageHeight() - this.transform.y - 200;
        if (!game.scaleToStage) {
            maxWidth = game.maxWidth;
            maxHeight = game.maxHeight;
        }
        else {
            this.transform.y = 60;
        }
        var scaleWidth = maxWidth / width;
        var maxScaleY = maxHeight / height;
        scaleWidth = Math.min(scaleWidth, maxScaleY);
        if (this.getComponent(puzzle_game_1.PuzzleGame).scaleToStage) {
            this.transform.y = (maxHeight - height * scaleWidth) / 2 + 60;
            this.transform.x = (maxWidth - width * scaleWidth) / 2;
        }
        this.transform.scaleX = this.transform.scaleY = scaleWidth;
        try {
            for (var _b = __values(cfg.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var layerCfg = _c.value;
                var layer = ecs.Entity.create().addComponent(puzzle_game_layer_1.PuzzleGameLayer, this.config, layerCfg, layerIndex++);
                layer.parent = this.entity;
                this.layers.push(layer);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.addComponent(puzzle_game_loop_1.PuzzleGameLoop);
        this.addComponent(puzzle_game_debug_1.PuzzleGameDebug);
        window["level"] = this;
    };
    PuzzleGameLevel.prototype.getObjectByType = function (type) {
        var e_2, _a, e_3, _b;
        try {
            for (var _c = __values(this.layers), _d = _c.next(); !_d.done; _d = _c.next()) {
                var layer = _d.value;
                try {
                    for (var _e = (e_3 = void 0, __values(layer.ruleObjects)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var obj = _f.value;
                        if (obj.config === type)
                            return obj;
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
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    PuzzleGameLevel.prototype.getObjectsByType = function (type) {
        var e_4, _a, e_5, _b;
        var list = [];
        try {
            for (var _c = __values(this.layers), _d = _c.next(); !_d.done; _d = _c.next()) {
                var layer = _d.value;
                try {
                    for (var _e = (e_5 = void 0, __values(layer.ruleObjects)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var obj = _f.value;
                        if (obj.config === type)
                            list.push(obj);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return list;
    };
    return PuzzleGameLevel;
}(ecs.Component));
exports.PuzzleGameLevel = PuzzleGameLevel;


/***/ }),

/***/ "../src/modules/puzzle/component/puzzle-game-loop.ts":
/*!***********************************************************!*\
  !*** ../src/modules/puzzle/component/puzzle-game-loop.ts ***!
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
var puzzle_game_config_1 = __webpack_require__(/*! ../config/puzzle-game-config */ "../src/modules/puzzle/config/puzzle-game-config.ts");
var puzzle_game_1 = __webpack_require__(/*! ./puzzle-game */ "../src/modules/puzzle/component/puzzle-game.ts");
var puzzle_game_level_1 = __webpack_require__(/*! ./puzzle-game-level */ "../src/modules/puzzle/component/puzzle-game-level.ts");
var puzzle_game_object_1 = __webpack_require__(/*! ./puzzle-game-object */ "../src/modules/puzzle/component/puzzle-game-object.ts");
var puzzle_game_result_1 = __webpack_require__(/*! ./puzzle-game-result */ "../src/modules/puzzle/component/puzzle-game-result.ts");
orange.autoloadLink("PuzzleScene");
var PuzzleGameLoop = /** @class */ (function (_super) {
    __extends(PuzzleGameLoop, _super);
    function PuzzleGameLoop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shortCuts = [];
        _this.moveOffset = {
            'none': { x: 0, y: 0 },
            'right': { x: 1, y: 0 },
            'left': { x: -1, y: 0 },
            'up': { x: 0, y: -1 },
            'down': { x: 0, y: 1 }
        };
        _this.forceMoveOffsets = {
            'none': {
                'none': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
                'right': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
                'left': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
                'up': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
                'down': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }]
            },
            '>': {
                'none': [],
                'right': [{ x: 1, y: 0, dir: 'right' }],
                'left': [{ x: -1, y: 0, dir: 'left' }],
                'up': [{ x: 0, y: -1, dir: 'up' }],
                'down': [{ x: 0, y: 1, dir: 'down' }]
            },
            '<': {
                'none': [],
                'right': [{ x: -1, y: 0, dir: 'left' }],
                'left': [{ x: 1, y: 0, dir: 'right' }],
                'up': [{ x: 0, y: 1, dir: 'down' }],
                'down': [{ x: 0, y: -1, dir: 'up' }]
            },
            'right': {
                'none': [],
                'right': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
                'left': [],
                'up': [],
                'down': []
            },
            'left': {
                'none': [],
                'right': [],
                'left': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
                'up': [],
                'down': []
            },
            'up': {
                'none': [],
                'right': [],
                'left': [],
                'up': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
                'down': []
            },
            'down': {
                'none': [],
                'right': [],
                'left': [],
                'up': [],
                'down': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }]
            },
            'moving': {
                'none': [],
                'right': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
                'left': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
                'up': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
                'down': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }]
            }
        };
        return _this;
    }
    PuzzleGameLoop.prototype.awake = function () {
        setTimeout(function () {
            // this.run(EMPuzzleMove.RIGHT);
        }, 1000);
    };
    PuzzleGameLoop.prototype.createShortCut = function () {
        var sc = new GameShortCut();
        sc.layers = [];
        var level = this.getComponent(puzzle_game_level_1.PuzzleGameLevel);
        for (var i = 0; i < level.layers.length; i++) {
            var layer = new GameShortCutLayer();
            layer.layer = i;
            layer.objects = level.config.blocks;
            layer.types = {};
            if (level.config.game.ruleLayers[i]) {
                layer.objects = [];
                for (var y = 0; y < level.config.height; y++) {
                    layer.objects[y] = [];
                    for (var x = 0; x < level.config.width; x++) {
                        var obj = level.layers[layer.layer].objects[y][x];
                        layer.objects[y][x] = obj ? { config: obj.config, x: x, y: y } : null;
                        if (obj) {
                            if (!layer.types[obj.config.id])
                                layer.types[obj.config.id] = [];
                            layer.types[obj.config.id].push(layer.objects[y][x]);
                        }
                    }
                }
            }
            sc.layers[layer.layer] = layer;
        }
        this.shortCuts.push(sc);
        return sc;
    };
    /**
     * 运行一次
     * 后面的运动会把前面的运动覆盖，即先还原位置，再进行相应的移动，
     * 但如果某一次运动失败，会还原位置，前面的移动也相当于失效
        [ MOVING Player |  Crate ] -> [ MOVING Player | MOVING Crate ]
        [ Crate ] -> [ right Crate ]
     * ... 表示中间相隔任意远都可
     * [ > Player | ... | Crate ] -> [ | ... | Player ]
     *
     * 方位限定强于任意远，即有方位时，任意远是受限制的，即不生效
     * right [ Player | ... |  Crate ] -> [ down Player | ... | down Crate ]
     *
     */
    PuzzleGameLoop.prototype.run = function (move) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, e_7, _g, e_8, _h, e_9, _j, e_10, _k, e_11, _l, e_12, _m;
        var shortCut = this.createShortCut();
        var level = this.getComponent(puzzle_game_level_1.PuzzleGameLevel);
        if (level.state === 'win' || level.state === 'lose')
            return;
        var gameConfig = this.getComponent(puzzle_game_1.PuzzleGame).config;
        var moveOffset = this.moveOffset[move];
        //记录移动过的元素初始位置
        var changedObjects = {};
        var changeObjecteSource = {};
        try {
            for (var _o = __values(gameConfig.rules), _p = _o.next(); !_p.done; _p = _o.next()) {
                var rule = _p.value;
                if (!rule.ranks.length || !rule.ranks[0].length || !rule.ranks[0][0].length || !rule.ranks[0][0][0].length)
                    continue;
                var ruleExecuteOK = true;
                while (ruleExecuteOK) {
                    ruleExecuteOK = false;
                    try {
                        for (var _q = (e_2 = void 0, __values(rule.ranks[0][0])), _r = _q.next(); !_r.done; _r = _q.next()) {
                            var overlapObjCfg = _r.value;
                            try {
                                for (var overlapObjCfg_1 = (e_3 = void 0, __values(overlapObjCfg)), overlapObjCfg_1_1 = overlapObjCfg_1.next(); !overlapObjCfg_1_1.done; overlapObjCfg_1_1 = overlapObjCfg_1.next()) {
                                    var objCfg = overlapObjCfg_1_1.value;
                                    var objs = void 0;
                                    if (objCfg.isPlayer) {
                                        objs = shortCut.layers[objCfg.layer] ? shortCut.layers[objCfg.layer].types[objCfg.id] : null;
                                    }
                                    else {
                                        objs = level.getObjectsByType(objCfg);
                                    }
                                    if (!objs)
                                        continue;
                                    try {
                                        for (var objs_1 = (e_4 = void 0, __values(objs)), objs_1_1 = objs_1.next(); !objs_1_1.done; objs_1_1 = objs_1.next()) {
                                            var obj = objs_1_1.value;
                                            var startX = obj.x;
                                            var startY = obj.y;
                                            var offsets = this.forceMoveOffsets[rule.force][move];
                                            var successfull = false;
                                            try {
                                                for (var offsets_1 = (e_5 = void 0, __values(offsets)), offsets_1_1 = offsets_1.next(); !offsets_1_1.done; offsets_1_1 = offsets_1.next()) {
                                                    var offset = offsets_1_1.value;
                                                    if (rule.directions && rule.directions.length && rule.directions.indexOf(offset.dir) === -1)
                                                        continue;
                                                    //开始匹配某个方向是否符合规则
                                                    var flag = true;
                                                    var anyPosistion = false;
                                                    for (var m = 0; m < rule.ranks.length; m++) {
                                                        //计算 [> p k | c][ m ]
                                                        for (var n = 0; n < rule.ranks[m].length; n++) {
                                                            //计算 > p k | c
                                                            var x = startX + offset.x * n;
                                                            var y = startY + offset.y * n;
                                                            if (!rule.ranks[m][n]) {
                                                                anyPosistion = true;
                                                            }
                                                            else {
                                                                for (var o = !m && !n && successfull ? 1 : 0; o < rule.ranks[m][n].length; o++) {
                                                                    if (!rule.ranks[m][n][o].length)
                                                                        continue;
                                                                    var levelInstance = rule.ranks[m][n][o][0].isPlayer && rule.isPlayerMoved ? shortCut : level;
                                                                    if (rule.limits[m][n][o] === puzzle_game_config_1.EMPuzzleConditionLimit.NO) {
                                                                        var find = false;
                                                                        try {
                                                                            //计算 p k 是否符合规则
                                                                            for (var _s = (e_6 = void 0, __values(levelInstance.layers)), _t = _s.next(); !_t.done; _t = _s.next()) {
                                                                                var layer = _t.value;
                                                                                var check = layer.objects[y][x];
                                                                                if (check && rule.ranks[m][n][o].indexOf(check.config) != -1) {
                                                                                    find = true;
                                                                                    break;
                                                                                }
                                                                            }
                                                                        }
                                                                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                                                        finally {
                                                                            try {
                                                                                if (_t && !_t.done && (_f = _s.return)) _f.call(_s);
                                                                            }
                                                                            finally { if (e_6) throw e_6.error; }
                                                                        }
                                                                        if (find) {
                                                                            flag = false;
                                                                        }
                                                                    }
                                                                    else {
                                                                        var find = false;
                                                                        try {
                                                                            //计算 p k 是否符合规则
                                                                            for (var _u = (e_7 = void 0, __values(levelInstance.layers)), _v = _u.next(); !_v.done; _v = _u.next()) {
                                                                                var layer = _v.value;
                                                                                var check = layer.objects[y][x];
                                                                                if (check && rule.ranks[m][n][o].indexOf(check.config) != -1) {
                                                                                    find = true;
                                                                                    break;
                                                                                }
                                                                            }
                                                                        }
                                                                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                                                        finally {
                                                                            try {
                                                                                if (_v && !_v.done && (_g = _u.return)) _g.call(_u);
                                                                            }
                                                                            finally { if (e_7) throw e_7.error; }
                                                                        }
                                                                        if (!find) {
                                                                            flag = false;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            if (!flag)
                                                                break;
                                                        }
                                                        if (!flag)
                                                            break;
                                                    }
                                                    if (flag) { //成功了，开始执行
                                                        if (rule.force === puzzle_game_config_1.EMPuzzleForce.NONE && rule.ranks[0] && rule.ranks[0][0] && rule.ranks[0][0].length > 1) {
                                                            ruleExecuteOK = true;
                                                        }
                                                        var deleteConfigs = [];
                                                        var deleteObjects = [];
                                                        anyPosistion = false;
                                                        for (var m = 0; m < rule.ranks.length; m++) {
                                                            deleteObjects[m] = [];
                                                            for (var n = 0; n < rule.ranks[m].length; n++) {
                                                                //计算 > p k | c
                                                                var x = startX + offset.x * n;
                                                                var y = startY + offset.y * n;
                                                                deleteObjects[m][n] = [];
                                                                if (!rule.ranks[m][n]) {
                                                                    anyPosistion = true;
                                                                }
                                                                else {
                                                                    for (var o = !m && !n && successfull ? 1 : 0; o < rule.ranks[m][n].length; o++) {
                                                                        try {
                                                                            //计算 p k 
                                                                            for (var _w = (e_8 = void 0, __values(level.layers)), _x = _w.next(); !_x.done; _x = _w.next()) {
                                                                                var layer = _x.value;
                                                                                var check = layer.objects[y][x];
                                                                                if (check && rule.ranks[m][n][o].indexOf(check.config) != -1) {
                                                                                    //找到了，删除对象
                                                                                    if (changedObjects[(x + y * level.config.width) * 1000 + check.config.layer]) {
                                                                                        changedObjects[(x + y * level.config.width) * 1000 + check.config.layer] = null;
                                                                                    }
                                                                                    deleteObjects[m][n][o] = check.config;
                                                                                    if (deleteConfigs.indexOf(check.config) === -1) {
                                                                                        deleteConfigs.push(check.config);
                                                                                    }
                                                                                    check.removeFromLayer();
                                                                                    check.entity.destroy();
                                                                                    break;
                                                                                }
                                                                            }
                                                                        }
                                                                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                                                                        finally {
                                                                            try {
                                                                                if (_x && !_x.done && (_h = _w.return)) _h.call(_w);
                                                                            }
                                                                            finally { if (e_8) throw e_8.error; }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        anyPosistion = false;
                                                        for (var m = 0; m < rule.toRanks.length; m++) {
                                                            for (var n = 0; n < rule.toRanks[m].length; n++) {
                                                                //计算 > p k | c
                                                                var x = startX + offset.x * n;
                                                                var y = startY + offset.y * n;
                                                                if (!rule.toRanks[m][n]) {
                                                                    anyPosistion = true;
                                                                }
                                                                else {
                                                                    for (var o = !m && !n && successfull ? 1 : 0; o < rule.toRanks[m][n].length; o++) {
                                                                        if (rule.toLimits[m][n][o] === puzzle_game_config_1.EMPuzzleConditionLimit.NO)
                                                                            continue;
                                                                        //计算 p k 
                                                                        //生成对象
                                                                        //1. 优先查找原先位置是否和现在位置的属性相符，如果相符就生成这个
                                                                        //2. 查找其他位置的元素是否有相符的，有就生成
                                                                        //3. 使用组里第一个
                                                                        //如果是空表示删除对象
                                                                        if (!rule.toRanks[m][n][o])
                                                                            continue;
                                                                        var toRankConfigs = rule.toRanks[m][n][o];
                                                                        // if (rule.ranks[m][n] && rule.ranks[m][n][o]) {
                                                                        //     let isPlayer = false;
                                                                        //     for (let ck of rule.ranks[m][n][o]) {
                                                                        //         if (ck.isPlayer) {
                                                                        //             isPlayer = true;
                                                                        //             break;
                                                                        //         }
                                                                        //     }
                                                                        //     if (isPlayer) continue;
                                                                        // }
                                                                        var newObjCfg = void 0;
                                                                        if (toRankConfigs.indexOf(deleteObjects[m][n][o]) != -1) {
                                                                            newObjCfg = deleteObjects[m][n][o];
                                                                        }
                                                                        if (!newObjCfg) {
                                                                            try {
                                                                                for (var deleteConfigs_1 = (e_9 = void 0, __values(deleteConfigs)), deleteConfigs_1_1 = deleteConfigs_1.next(); !deleteConfigs_1_1.done; deleteConfigs_1_1 = deleteConfigs_1.next()) {
                                                                                    var checkDeleteCfg = deleteConfigs_1_1.value;
                                                                                    if (toRankConfigs.indexOf(checkDeleteCfg) != -1) {
                                                                                        newObjCfg = checkDeleteCfg;
                                                                                        break;
                                                                                    }
                                                                                }
                                                                            }
                                                                            catch (e_9_1) { e_9 = { error: e_9_1 }; }
                                                                            finally {
                                                                                try {
                                                                                    if (deleteConfigs_1_1 && !deleteConfigs_1_1.done && (_j = deleteConfigs_1.return)) _j.call(deleteConfigs_1);
                                                                                }
                                                                                finally { if (e_9) throw e_9.error; }
                                                                            }
                                                                        }
                                                                        if (!newObjCfg) {
                                                                            newObjCfg = toRankConfigs[0];
                                                                        }
                                                                        var posIndex = (x + y * level.config.width) * 1000 + newObjCfg.layer;
                                                                        //这个位置的元素生成过就删除掉
                                                                        if (changedObjects[posIndex]) {
                                                                            changedObjects[posIndex].removeFromLayer();
                                                                            changedObjects[posIndex].entity.destroy();
                                                                        }
                                                                        var toX = x;
                                                                        var toY = y;
                                                                        var toFroce = rule.toForces[m][n][o];
                                                                        if (toFroce === null) {
                                                                        }
                                                                        else if (toFroce === puzzle_game_config_1.EMPuzzleForce.PUSH || toFroce === puzzle_game_config_1.EMPuzzleForce.MOVING) { //推
                                                                            toX += moveOffset.x;
                                                                            toY += moveOffset.y;
                                                                        }
                                                                        else if (toFroce === puzzle_game_config_1.EMPuzzleForce.PULL) { //拉
                                                                            toX -= moveOffset.x;
                                                                            toY -= moveOffset.y;
                                                                        }
                                                                        else if (toFroce === puzzle_game_config_1.EMPuzzleForce.RIGHT) {
                                                                            toX++;
                                                                        }
                                                                        else if (toFroce === puzzle_game_config_1.EMPuzzleForce.LEFT) {
                                                                            toX--;
                                                                        }
                                                                        else if (toFroce === puzzle_game_config_1.EMPuzzleForce.UP) {
                                                                            toY--;
                                                                        }
                                                                        else if (toFroce === puzzle_game_config_1.EMPuzzleForce.DOWN) {
                                                                            toY++;
                                                                        }
                                                                        if (toX < 0 || toX >= level.config.width || toY < 0 || toY >= level.config.height) {
                                                                            toX = x;
                                                                            toY = y;
                                                                        }
                                                                        else if (level.layers[newObjCfg.layer].objects[toY][toX]) { //要移动的位置有东西了
                                                                            toX = x;
                                                                            toY = y;
                                                                        }
                                                                        //原来的位置也有对象，即开始递归还原
                                                                        if (level.layers[newObjCfg.layer].objects[toY][toX]) {
                                                                            var list = [level.layers[newObjCfg.layer].objects[toY][toX]];
                                                                            while (true) {
                                                                                var hasNew = false;
                                                                                try {
                                                                                    for (var list_1 = (e_10 = void 0, __values(list)), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                                                                                        var check = list_1_1.value;
                                                                                        var checkSource = changeObjecteSource[check.id];
                                                                                        var sourceObject = level.layers[check.config.layer].objects[checkSource.y][checkSource.x];
                                                                                        if (sourceObject && sourceObject != check && list.indexOf(sourceObject) === -1) {
                                                                                            list.push(sourceObject);
                                                                                            hasNew = true;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                                                                                finally {
                                                                                    try {
                                                                                        if (list_1_1 && !list_1_1.done && (_k = list_1.return)) _k.call(list_1);
                                                                                    }
                                                                                    finally { if (e_10) throw e_10.error; }
                                                                                }
                                                                                if (!hasNew)
                                                                                    break;
                                                                            }
                                                                            try {
                                                                                //把列表上的元素全部移除
                                                                                for (var list_2 = (e_11 = void 0, __values(list)), list_2_1 = list_2.next(); !list_2_1.done; list_2_1 = list_2.next()) {
                                                                                    var check = list_2_1.value;
                                                                                    check.removeFromLayer();
                                                                                }
                                                                            }
                                                                            catch (e_11_1) { e_11 = { error: e_11_1 }; }
                                                                            finally {
                                                                                try {
                                                                                    if (list_2_1 && !list_2_1.done && (_l = list_2.return)) _l.call(list_2);
                                                                                }
                                                                                finally { if (e_11) throw e_11.error; }
                                                                            }
                                                                            try {
                                                                                //全部还原
                                                                                for (var list_3 = (e_12 = void 0, __values(list)), list_3_1 = list_3.next(); !list_3_1.done; list_3_1 = list_3.next()) {
                                                                                    var check = list_3_1.value;
                                                                                    check.setCoord(changeObjecteSource[check.id].x, changeObjecteSource[check.id].y);
                                                                                    check.addToLayer();
                                                                                }
                                                                            }
                                                                            catch (e_12_1) { e_12 = { error: e_12_1 }; }
                                                                            finally {
                                                                                try {
                                                                                    if (list_3_1 && !list_3_1.done && (_m = list_3.return)) _m.call(list_3);
                                                                                }
                                                                                finally { if (e_12) throw e_12.error; }
                                                                            }
                                                                        }
                                                                        //开始移动
                                                                        changedObjects[posIndex] = ecs.Entity.create().addComponent(puzzle_game_object_1.PuzzleGameObject, level.layers[newObjCfg.layer], newObjCfg, toX, toY);
                                                                        changeObjecteSource[changedObjects[posIndex].id] = { x: x, y: y };
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        successfull = true;
                                                    }
                                                }
                                            }
                                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                            finally {
                                                try {
                                                    if (offsets_1_1 && !offsets_1_1.done && (_e = offsets_1.return)) _e.call(offsets_1);
                                                }
                                                finally { if (e_5) throw e_5.error; }
                                            }
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (objs_1_1 && !objs_1_1.done && (_d = objs_1.return)) _d.call(objs_1);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (overlapObjCfg_1_1 && !overlapObjCfg_1_1.done && (_c = overlapObjCfg_1.return)) _c.call(overlapObjCfg_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_r && !_r.done && (_b = _q.return)) _b.call(_q);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_p && !_p.done && (_a = _o.return)) _a.call(_o);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.checkState();
    };
    PuzzleGameLoop.prototype.back = function () {
        var e_13, _a;
        var level = this.getComponent(puzzle_game_level_1.PuzzleGameLevel);
        if (this.shortCuts.length) {
            var shortCut = this.shortCuts.pop();
            try {
                for (var _b = __values(shortCut.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var layer = _c.value;
                    if (!level.config.game.ruleLayers[layer.layer])
                        continue;
                    var realLayer = level.layers[layer.layer];
                    for (var y = 0; y < level.config.height; y++) {
                        for (var x = 0; x < level.config.width; x++) {
                            var obj = realLayer.objects[y][x];
                            if (obj) {
                                obj.removeFromLayer();
                                obj.entity.destroy();
                            }
                        }
                    }
                    for (var y = 0; y < level.config.height; y++) {
                        for (var x = 0; x < level.config.width; x++) {
                            var obj = layer.objects[y][x];
                            if (obj) {
                                ecs.Entity.create().addComponent(puzzle_game_object_1.PuzzleGameObject, realLayer, obj.config, x, y);
                            }
                        }
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_13) throw e_13.error; }
            }
        }
    };
    PuzzleGameLoop.prototype.checkState = function () {
        var e_14, _a, e_15, _b, e_16, _c, e_17, _d, e_18, _e, e_19, _f, e_20, _g, e_21, _h;
        var level = this.getComponent(puzzle_game_level_1.PuzzleGameLevel);
        var win = true;
        try {
            for (var _j = __values(level.config.game.winConditions), _k = _j.next(); !_k.done; _k = _j.next()) {
                var item = _k.value;
                if (item.limit === puzzle_game_config_1.EMPuzzleConditionLimit.NO) {
                    try {
                        for (var _l = (e_15 = void 0, __values(item.master)), _m = _l.next(); !_m.done; _m = _l.next()) {
                            var type = _m.value;
                            if (level.layers[type.layer].getObjectByType(type)) {
                                win = false;
                                break;
                            }
                        }
                    }
                    catch (e_15_1) { e_15 = { error: e_15_1 }; }
                    finally {
                        try {
                            if (_m && !_m.done && (_b = _l.return)) _b.call(_l);
                        }
                        finally { if (e_15) throw e_15.error; }
                    }
                }
                else if (item.limit === puzzle_game_config_1.EMPuzzleConditionLimit.ALL) {
                    try {
                        for (var _o = (e_16 = void 0, __values(item.master)), _p = _o.next(); !_p.done; _p = _o.next()) {
                            var type = _p.value;
                            var masters = level.layers[type.layer].getObjectsByType(type);
                            try {
                                for (var masters_1 = (e_17 = void 0, __values(masters)), masters_1_1 = masters_1.next(); !masters_1_1.done; masters_1_1 = masters_1.next()) {
                                    var master = masters_1_1.value;
                                    var has_1 = false;
                                    try {
                                        for (var _q = (e_18 = void 0, __values(level.layers)), _r = _q.next(); !_r.done; _r = _q.next()) {
                                            var layer = _r.value;
                                            if (layer.objects[master.y][master.x] && item.other.indexOf(layer.objects[master.y][master.x].config) != -1) {
                                                has_1 = true;
                                                break;
                                            }
                                        }
                                    }
                                    catch (e_18_1) { e_18 = { error: e_18_1 }; }
                                    finally {
                                        try {
                                            if (_r && !_r.done && (_e = _q.return)) _e.call(_q);
                                        }
                                        finally { if (e_18) throw e_18.error; }
                                    }
                                    if (!has_1) {
                                        win = false;
                                        break;
                                    }
                                }
                            }
                            catch (e_17_1) { e_17 = { error: e_17_1 }; }
                            finally {
                                try {
                                    if (masters_1_1 && !masters_1_1.done && (_d = masters_1.return)) _d.call(masters_1);
                                }
                                finally { if (e_17) throw e_17.error; }
                            }
                            if (!win)
                                break;
                        }
                    }
                    catch (e_16_1) { e_16 = { error: e_16_1 }; }
                    finally {
                        try {
                            if (_p && !_p.done && (_c = _o.return)) _c.call(_o);
                        }
                        finally { if (e_16) throw e_16.error; }
                    }
                }
                else if (item.limit === puzzle_game_config_1.EMPuzzleConditionLimit.SOME) {
                    var has_2 = false;
                    try {
                        for (var _s = (e_19 = void 0, __values(item.master)), _t = _s.next(); !_t.done; _t = _s.next()) {
                            var type = _t.value;
                            var masters = level.layers[type.layer].getObjectsByType(type);
                            try {
                                for (var masters_2 = (e_20 = void 0, __values(masters)), masters_2_1 = masters_2.next(); !masters_2_1.done; masters_2_1 = masters_2.next()) {
                                    var master = masters_2_1.value;
                                    try {
                                        for (var _u = (e_21 = void 0, __values(level.layers)), _v = _u.next(); !_v.done; _v = _u.next()) {
                                            var layer = _v.value;
                                            if (layer.objects[master.y][master.x] && item.other.indexOf(layer.objects[master.y][master.x].config) != -1) {
                                                has_2 = true;
                                                break;
                                            }
                                        }
                                    }
                                    catch (e_21_1) { e_21 = { error: e_21_1 }; }
                                    finally {
                                        try {
                                            if (_v && !_v.done && (_h = _u.return)) _h.call(_u);
                                        }
                                        finally { if (e_21) throw e_21.error; }
                                    }
                                    if (has_2)
                                        break;
                                }
                            }
                            catch (e_20_1) { e_20 = { error: e_20_1 }; }
                            finally {
                                try {
                                    if (masters_2_1 && !masters_2_1.done && (_g = masters_2.return)) _g.call(masters_2);
                                }
                                finally { if (e_20) throw e_20.error; }
                            }
                        }
                    }
                    catch (e_19_1) { e_19 = { error: e_19_1 }; }
                    finally {
                        try {
                            if (_t && !_t.done && (_f = _s.return)) _f.call(_s);
                        }
                        finally { if (e_19) throw e_19.error; }
                    }
                    if (!has_2)
                        win = false;
                }
                if (!win)
                    break;
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (_k && !_k.done && (_a = _j.return)) _a.call(_j);
            }
            finally { if (e_14) throw e_14.error; }
        }
        if (win) {
            level.state = 'win';
            console.error('恭喜过关');
            this.getComponent(puzzle_game_1.PuzzleGame).ui.addComponent(puzzle_game_result_1.PuzzleGameResult, this.getComponent(puzzle_game_1.PuzzleGame));
        }
    };
    return PuzzleGameLoop;
}(ecs.Component));
exports.PuzzleGameLoop = PuzzleGameLoop;
var GameShortCut = /** @class */ (function () {
    function GameShortCut() {
    }
    return GameShortCut;
}());
var GameShortCutLayer = /** @class */ (function () {
    function GameShortCutLayer() {
    }
    return GameShortCutLayer;
}());


/***/ }),

/***/ "../src/modules/puzzle/component/puzzle-game-object.ts":
/*!*************************************************************!*\
  !*** ../src/modules/puzzle/component/puzzle-game-object.ts ***!
  \*************************************************************/
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
orange.autoloadLink("PuzzleScene");
var PuzzleGameObject = /** @class */ (function (_super) {
    __extends(PuzzleGameObject, _super);
    function PuzzleGameObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PuzzleGameObject.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PuzzleGameObject.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    PuzzleGameObject.prototype.init = function (layer, config, x, y) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        this.config = config;
        this.layer = layer;
        this._x = x;
        this._y = y;
        this.createShow();
        this.setCoord(x, y);
        this.addToLayer();
        this.entity.parent = this.layer.entity;
        if (this.config.game.ruleObjects.indexOf(this.config) != -1) {
            layer.ruleObjects.push(this);
        }
    };
    PuzzleGameObject.prototype.removeFromLayer = function () {
        this.isInLayer = false;
        this.layer.objects[this.y][this.x] = null;
    };
    PuzzleGameObject.prototype.addToLayer = function () {
        if (this.x < 0 || this.x >= this.layer.levelConfig.width ||
            this.y < 0 || this.y >= this.layer.levelConfig.height ||
            this.layer.objects[this.y][this.x] && this.layer.objects[this.y][this.x] != this) {
            return false;
        }
        this.isInLayer = true;
        this.layer.objects[this.y][this.x] = this;
        return true;
    };
    PuzzleGameObject.prototype.setCoord = function (x, y) {
        if (this.isInLayer && this.layer.objects[y][x] && this.layer.objects[y][x] != this) {
            return false;
        }
        if (this.isInLayer && this.layer.objects[this.y][this.x] !== this) {
            console.error('出错叻!?');
            return false;
        }
        this.layer.objects[this.y][this.x] = null;
        this._x = x;
        this._y = y;
        if (this.isInLayer) {
            if (!this.layer.objects[y])
                this.layer.objects[y] = [];
            this.layer.objects[y][x] = this;
        }
        this.transform.x = x * this.config.game.blockWidth;
        this.transform.y = y * this.config.game.blockHeight;
        return true;
    };
    PuzzleGameObject.prototype.createShow = function () {
        this.addComponent(leaf.Bitmap).texture = leaf.RectTexture.getTexture(this.config.blocks, this.config.colorId);
    };
    PuzzleGameObject.prototype.onDestroy = function () {
        this.layer.objects[this.y][this.x] = null;
        if (this.layer.ruleObjects.indexOf(this) != -1) {
            this.layer.ruleObjects.splice(this.layer.ruleObjects.indexOf(this), 1);
        }
        this.layer = null;
        this.config = null;
    };
    return PuzzleGameObject;
}(ecs.Component));
exports.PuzzleGameObject = PuzzleGameObject;


/***/ }),

/***/ "../src/modules/puzzle/component/puzzle-game-result.ts":
/*!*************************************************************!*\
  !*** ../src/modules/puzzle/component/puzzle-game-result.ts ***!
  \*************************************************************/
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
var game_storage_1 = __webpack_require__(/*! ../../../utils/storage/game-storage */ "../src/utils/storage/game-storage.ts");
var puzzle_game_level_1 = __webpack_require__(/*! ./puzzle-game-level */ "../src/modules/puzzle/component/puzzle-game-level.ts");
var face_scene_1 = __webpack_require__(/*! ../face/face-scene */ "../src/modules/puzzle/face/face-scene.ts");
orange.autoloadLink("PuzzleScene");
var PuzzleGameResult = /** @class */ (function (_super) {
    __extends(PuzzleGameResult, _super);
    function PuzzleGameResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleGameResult.prototype.init = function (game) {
        var _this = this;
        var lv = game.level;
        if (game.getComponent(puzzle_game_level_1.PuzzleGameLevel).state === 'win') {
            game_storage_1.GameStorage.getStorage(game.gameName + "_maxStage").then(function (v) {
                console.error("lv:", v, lv);
                if (+v < lv) {
                    console.error("保存关卡进度", lv);
                    game_storage_1.GameStorage.setStorage(game.gameName + "_maxStage", lv);
                }
            });
        }
        setTimeout(function () {
            var entity = ecs.Entity.create();
            entity.parent = _this.entity;
            entity.addComponent(leaf.Bitmap).texture = leaf.PointTexture.getTexture(0);
            entity.transform.scaleX = leaf.getStageWidth();
            entity.transform.scaleY = leaf.getStageHeight();
            entity.transform.alpha = 0.8;
            var label = ecs.Entity.create().addComponent(leaf.Label);
            label.text = lv >= game.config.levels.length ? '恭喜你已通关' : '你真棒!';
            label.fontSize = 20;
            label.parent = _this.entity;
            label.transform.alpha = 0;
            setTimeout(function () {
                label.transform.alpha = 1;
                label.transform.x = (leaf.getStageWidth() - label.width) / 2;
                label.transform.y = (leaf.getStageHeight() - label.height) / 2;
            }, 100);
            setTimeout(function () {
                if (lv >= game.config.levels.length) {
                    new face_scene_1.FaceScene();
                }
                else {
                    game.loadNextStage();
                }
            }, 1000);
        }, 500);
    };
    return PuzzleGameResult;
}(ecs.Component));
exports.PuzzleGameResult = PuzzleGameResult;


/***/ }),

/***/ "../src/modules/puzzle/component/puzzle-game-ui.ts":
/*!*********************************************************!*\
  !*** ../src/modules/puzzle/component/puzzle-game-ui.ts ***!
  \*********************************************************/
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
var puzzle_game_loop_1 = __webpack_require__(/*! ./puzzle-game-loop */ "../src/modules/puzzle/component/puzzle-game-loop.ts");
var puzzle_game_config_1 = __webpack_require__(/*! ../config/puzzle-game-config */ "../src/modules/puzzle/config/puzzle-game-config.ts");
var puzzle_game_1 = __webpack_require__(/*! ./puzzle-game */ "../src/modules/puzzle/component/puzzle-game.ts");
orange.autoloadLink("PuzzleScene");
var PuzzleGameUI = /** @class */ (function (_super) {
    __extends(PuzzleGameUI, _super);
    function PuzzleGameUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleGameUI.prototype.init = function (game) {
        this.game = game;
    };
    PuzzleGameUI.prototype.awake = function () {
        var _this = this;
        this.uiRoot = ecs.Entity.create();
        this.uiRoot.parent = this.entity;
        // let upBtn = [
        //     [0]
        // ]
        var dirGroup = ecs.Entity.create();
        dirGroup.parent = this.uiRoot;
        var arrGroup = ecs.Entity.create();
        arrGroup.parent = dirGroup;
        var upBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        upBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(0xffffff + "," + 0xaa0000 + "\n" +
            '...0...\n' +
            '..000..\n' +
            '.00000.\n' +
            '0..0..0\n' +
            '...0...\n' +
            '...0...\n' +
            '...0...'));
        upBtn.transform.x = 9;
        upBtn.parent = arrGroup;
        var rightBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        rightBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(0xffffff + "," + 0xaa0000 + "\n" +
            '...0...\n' +
            '..0....\n' +
            '.00....\n' +
            '0000000\n' +
            '.00....\n' +
            '..0....\n' +
            '...0...\n'));
        rightBtn.transform.angle = Math.PI * 180 / 180;
        rightBtn.transform.x = 25;
        rightBtn.transform.y = 17;
        rightBtn.parent = arrGroup;
        var leftBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        leftBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(0xffffff + "," + 0xaa0000 + "\n" +
            '...0...\n' +
            '..0....\n' +
            '.00....\n' +
            '0000000\n' +
            '.00....\n' +
            '..0....\n' +
            '...0...\n'));
        leftBtn.transform.x = 0;
        leftBtn.transform.y = 10;
        leftBtn.parent = arrGroup;
        var downBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        downBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(0xffffff + "," + 0xaa0000 + "\n" +
            '...0...\n' +
            '..000..\n' +
            '.00000.\n' +
            '0..0..0\n' +
            '...0...\n' +
            '...0...\n' +
            '...0...'));
        downBtn.transform.angle = Math.PI * 180 / 180;
        downBtn.transform.x = 16;
        downBtn.transform.y = 26;
        downBtn.parent = arrGroup;
        var rect = ecs.Entity.create().addComponent(leaf.Bitmap);
        rect.texture = leaf.PointTexture.getTexture(0xff0000);
        rect.transform.scaleX = rect.transform.scaleY = 33;
        rect.parent = arrGroup;
        rect.transform.x = -4;
        rect.transform.alpha = 0;
        rect.transform.y = -4;
        rect.addComponent(leaf.TouchComponent).onTouchStart.on(function (e) {
            var rot = Math.atan2(e.localY - 0.5, e.localX - 0.5) * 180 / Math.PI;
            leftBtn.transform.alpha = rightBtn.transform.alpha
                = upBtn.transform.alpha = downBtn.transform.alpha = 1;
            if (rot <= 45 && rot >= -45) {
                rightBtn.transform.alpha = 0.5;
            }
            else if (rot >= -135 && rot < -45) {
                upBtn.transform.alpha = 0.5;
            }
            else if (rot >= 45 && rot <= 135) {
                downBtn.transform.alpha = 0.5;
            }
            else {
                leftBtn.transform.alpha = 0.5;
            }
        });
        rect.getComponent(leaf.TouchComponent).onTouchEnd.on(function (e) {
            leftBtn.transform.alpha = rightBtn.transform.alpha
                = upBtn.transform.alpha = downBtn.transform.alpha = 1;
            var rot = Math.atan2(e.localY - 0.5, e.localX - 0.5) * 180 / Math.PI;
            var dir = puzzle_game_config_1.EMPuzzleMove.RIGHT;
            if (rot <= 45 && rot >= -45) {
                dir = puzzle_game_config_1.EMPuzzleMove.RIGHT;
            }
            else if (rot >= -135 && rot < -45) {
                dir = puzzle_game_config_1.EMPuzzleMove.UP;
            }
            else if (rot >= 45 && rot <= 135) {
                dir = puzzle_game_config_1.EMPuzzleMove.DOWN;
            }
            else {
                dir = puzzle_game_config_1.EMPuzzleMove.LEFT;
            }
            _this.game.getComponent(puzzle_game_loop_1.PuzzleGameLoop).run(dir);
            console.error(dir);
            // console.error(e.localX, e.localY, Math.atan2(e.localY - 0.5, e.localX - 0.5) * 180 / Math.PI);
        });
        arrGroup.transform.x = 5;
        arrGroup.transform.y = 0;
        dirGroup.transform.x = 2;
        dirGroup.transform.y = -5;
        dirGroup.transform.scaleX = dirGroup.transform.scaleY = 1.3;
        var xBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        xBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(0xffffff + "," + 0xaa0000 + "\n" +
            '...0...\n' +
            '..0.0..\n' +
            '.00000.\n' +
            '0.....0'));
        xBtn.transform.scaleY = 2;
        xBtn.transform.x = 40;
        xBtn.transform.y = 10;
        xBtn.parent = dirGroup;
        var zBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        zBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(0xffffff + "," + 0xaa0000 + "\n" +
            '000....\n' +
            '0..0...\n' +
            '0000...\n' +
            '0..0...\n' +
            '000....\n'));
        zBtn.transform.scaleY = 1.6;
        zBtn.transform.x = 55;
        zBtn.transform.y = 10;
        zBtn.parent = dirGroup;
        leftBtn.entity.name = 'h';
        this.entity.name = 'w';
        this.uiRoot.transform.y = leaf.getStageHeight() - 100;
        this.uiRoot.transform.scaleX = this.uiRoot.transform.scaleY = 3;
        // this.addClick(upBtn, () => {
        //     this.game.getComponent(PuzzleGameLoop).run(EMPuzzleMove.UP);
        // })
        // this.addClick(downBtn, () => {
        //     this.game.getComponent(PuzzleGameLoop).run(EMPuzzleMove.DOWN);
        // })
        // this.addClick(leftBtn, () => {
        //     this.game.getComponent(PuzzleGameLoop).run(EMPuzzleMove.LEFT);
        // })
        // this.addClick(rightBtn, () => {
        //     this.game.getComponent(PuzzleGameLoop).run(EMPuzzleMove.RIGHT);
        // })
        this.addClick(xBtn, function () {
            _this.game.getComponent(puzzle_game_loop_1.PuzzleGameLoop).back();
        });
        this.addClick(zBtn, function () {
            _this.game.getComponent(puzzle_game_1.PuzzleGame).reload();
        });
    };
    PuzzleGameUI.prototype.addClick = function (btn, call) {
        btn.addComponent(leaf.TouchComponent).onTouchStart.on(function () {
            btn.transform.alpha = 0.8;
        });
        btn.getComponent(leaf.TouchComponent).onTouchEnd.on(function () {
            btn.transform.alpha = 1;
            call && call();
        });
    };
    return PuzzleGameUI;
}(ecs.Component));
exports.PuzzleGameUI = PuzzleGameUI;


/***/ }),

/***/ "../src/modules/puzzle/component/puzzle-game.ts":
/*!******************************************************!*\
  !*** ../src/modules/puzzle/component/puzzle-game.ts ***!
  \******************************************************/
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
var puzzle_game_config_1 = __webpack_require__(/*! ../config/puzzle-game-config */ "../src/modules/puzzle/config/puzzle-game-config.ts");
var puzzle_game_level_1 = __webpack_require__(/*! ./puzzle-game-level */ "../src/modules/puzzle/component/puzzle-game-level.ts");
var puzzle_game_keyboard_1 = __webpack_require__(/*! ./puzzle-game-keyboard */ "../src/modules/puzzle/component/puzzle-game-keyboard.ts");
var puzzle_game_ui_1 = __webpack_require__(/*! ./puzzle-game-ui */ "../src/modules/puzzle/component/puzzle-game-ui.ts");
orange.autoloadLink("PuzzleScene");
var PuzzleGame = /** @class */ (function (_super) {
    __extends(PuzzleGame, _super);
    function PuzzleGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleGame.prototype.init = function (name, level, withUI, scaleToStage, maxWidth, maxHeight) {
        if (name === void 0) { name = 'game1-1_txt'; }
        if (level === void 0) { level = 1; }
        if (withUI === void 0) { withUI = true; }
        if (scaleToStage === void 0) { scaleToStage = true; }
        if (maxWidth === void 0) { maxWidth = 0; }
        if (maxHeight === void 0) { maxHeight = 0; }
        this.gameName = name;
        this.level = level;
        this.withUI = withUI;
        this.scaleToStage = scaleToStage;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        leaf.StateWin.show();
    };
    PuzzleGame.prototype.awake = function () {
        var _this = this;
        puzzle_game_config_1.PuzzleGameConfig.loadGameConfig(this.gameName, function (cfg) {
            _this.config = cfg;
            _this.createLevel(_this.level);
            if (_this.withUI) {
                var label = _this.lvLabel = ecs.Entity.create().addComponent(leaf.Label);
                label.text = "\u7B2C" + _this.level + "\u5173";
                label.fontSize = 14;
                label.transform.x = (leaf.getStageWidth() - label.textWidth) / 2;
                label.transform.y = 40;
                label.parent = _this.entity.parent;
            }
        });
    };
    PuzzleGame.prototype.reload = function () {
        var p = this.entity.parent;
        this.ui.destroy();
        this.lvLabel.entity.destroy();
        this.entity.destroy();
        ecs.Entity.create().addComponent(PuzzleGame, this.gameName, this.level, this.withUI, this.scaleToStage, this.maxWidth, this.maxHeight).parent = p;
    };
    PuzzleGame.prototype.loadNextStage = function () {
        var p = this.entity.parent;
        this.ui.destroy();
        this.lvLabel.entity.destroy();
        this.entity.destroy();
        ecs.Entity.create().addComponent(PuzzleGame, this.gameName, Math.min(this.config.levels.length, this.level + 1), this.withUI, this.scaleToStage, this.maxWidth, this.maxHeight).parent = p;
    };
    PuzzleGame.prototype.createLevel = function (level) {
        if (level === void 0) { level = 1; }
        this.level = level;
        if (!this.config)
            return;
        var cfg;
        if (level === 0) {
            cfg = this.config.face;
        }
        if (!cfg) {
            cfg = this.config.levels[this.level - 1];
        }
        if (!cfg)
            return;
        this.addComponent(puzzle_game_level_1.PuzzleGameLevel, cfg);
        this.addComponent(puzzle_game_keyboard_1.PuzzleGameKeyBoard);
        this.ui = ecs.Entity.create();
        this.ui.parent = this.entity.parent;
        if (this.withUI)
            this.ui.addComponent(puzzle_game_ui_1.PuzzleGameUI, this);
    };
    PuzzleGame.prototype.onDestroy = function () {
        this.ui && this.ui.destroy();
        this.lvLabel && this.lvLabel.entity && this.lvLabel.entity.destroy();
    };
    return PuzzleGame;
}(ecs.Component));
exports.PuzzleGame = PuzzleGame;


/***/ }),

/***/ "../src/modules/puzzle/config/puzzle-game-config.ts":
/*!**********************************************************!*\
  !*** ../src/modules/puzzle/config/puzzle-game-config.ts ***!
  \**********************************************************/
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
orange.autoloadLink("PuzzleScene");
var PuzzleGameConfig = /** @class */ (function () {
    function PuzzleGameConfig(txt) {
        var e_1, _a, e_2, _b;
        this.blockWidth = 0;
        this.blockHeight = 0;
        this.objects = {};
        this.legends = {};
        this.groups = {};
        this.ruleObjects = [];
        this.maxLayer = 0;
        this.rules = [];
        this.winConditions = [];
        this.levels = [];
        this.messages = [];
        this.ruleLayers = {};
        txt = txt.toLocaleLowerCase();
        txt = this.mergeSpace(txt);
        // while (txt.indexOf('(') != -1) {
        //     let toIndex = txt.indexOf(')', txt.indexOf('('));
        //     if (toIndex === -1) break;
        //     txt = txt.slice(0, txt.indexOf('(')) + txt.slice(txt.indexOf(')', txt.indexOf('(')) + 1, txt.length);
        // }
        var lines = txt.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var isDevice = this.isBlockDevice(line);
            if (isDevice) {
                i++;
                var name_1 = lines[i];
                if (name_1 === EMPuzzleGameModel.OBJECTS)
                    i = this.parseObjects(lines, i + 2);
                if (name_1 === EMPuzzleGameModel.LEGEND)
                    i = this.parseLegend(lines, i + 2);
                if (name_1 === EMPuzzleGameModel.COLLISIONLAYERS)
                    i = this.parseCollisionLayers(lines, i + 2);
                if (name_1 === EMPuzzleGameModel.RULES)
                    i = this.parseRules(lines, i + 2);
                if (name_1 === EMPuzzleGameModel.WINCONDITIONS)
                    i = this.parseWinConditions(lines, i + 2);
                if (name_1 === EMPuzzleGameModel.LEVELS)
                    i = this.parseLevels(lines, i + 2);
                if (name_1 === EMPuzzleGameModel.FACE)
                    i = this.parseFace(lines, i + 2);
            }
        }
        var index = 0;
        for (var name_2 in this.objects) {
            this.objects[name_2].id = index++;
            if (this.groups[EMPuzzleConst.PLAYER].indexOf(this.objects[name_2]) != -1) {
                this.objects[name_2].isPlayer = true;
            }
            if (this.blockWidth < this.objects[name_2].width)
                this.blockWidth = this.objects[name_2].width;
            if (this.blockHeight < this.objects[name_2].height)
                this.blockHeight = this.objects[name_2].height;
        }
        for (var name_3 in this.objects) {
            var obj = this.objects[name_3];
            if (!obj.blocks.length || !obj.blocks[0].length) {
                for (var y = 0; y < this.blockHeight; y++) {
                    obj.blocks[y] = [];
                    for (var x = 0; x < this.blockWidth; x++) {
                        obj.blocks[y][x] = obj.colors[0];
                    }
                }
            }
        }
        try {
            for (var _c = __values(this.ruleObjects), _d = _c.next(); !_d.done; _d = _c.next()) {
                var obj = _d.value;
                this.ruleLayers[obj.layer] = true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var _loop_1 = function (level) {
            if (false) { var w; }
            level.blocks = [];
            for (var y = 0; y < level.height; y++) {
                level.blocks[y] = [];
                for (var x = 0; x < level.width; x++) {
                    level.blocks[y][x] = null;
                }
            }
        };
        try {
            for (var _e = __values(this.levels), _f = _e.next(); !_f.done; _f = _e.next()) {
                var level = _f.value;
                _loop_1(level);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    PuzzleGameConfig.prototype.parseFace = function (lines, index) {
        var e_3, _a;
        var level;
        var y = 0;
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (this.isBlockDevice(line)) {
                if (level) {
                    this.levels.push(level);
                }
                console.error(this.levels);
                return i - 1;
            }
            line = this.deleteSpace(line);
            if (line.length) {
                if (!level) {
                    level = new PuzzleGameLevelConfig();
                    level.game = this;
                    level.width = 0;
                    level.height = 0;
                }
                for (var i_1 = 0; i_1 < line.length; i_1++) {
                    var c = line.charAt(i_1);
                    if (i_1 >= level.width)
                        level.width = i_1 + 1;
                    if (!this.legends[c]) {
                        console.error("parse level error, no legend:", c, 'layer:', line);
                    }
                    var x = i_1;
                    try {
                        for (var _b = (e_3 = void 0, __values(this.legends[c])), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var obj = _c.value;
                            if (!level.layerObjects[obj.layer])
                                level.layerObjects[obj.layer] = [];
                            if (level.layerObjects[obj.layer].indexOf(obj) === -1)
                                level.layerObjects[obj.layer].push(obj);
                            if (!level.layers[obj.layer])
                                level.layers[obj.layer] = [];
                            if (!level.layers[obj.layer][y])
                                level.layers[obj.layer][y] = [];
                            level.layers[obj.layer][y][x] = obj;
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                level.height++;
                y++;
            }
            else {
                if (level) {
                    this.face = level;
                }
                level = null;
            }
        }
        if (level) {
            this.face = level;
        }
        return lines.length;
    };
    PuzzleGameConfig.prototype.parseLevels = function (lines, index) {
        var e_4, _a;
        var level;
        var y = 0;
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (line.slice(0, 'message '.length) === 'message ') {
                if (!this.messages[this.levels.length]) {
                    this.messages[this.levels.length] = [];
                }
                this.messages[this.levels.length].push(line.slice('message '.length, line.length));
                continue;
            }
            if (this.isBlockDevice(line)) {
                if (level) {
                    this.levels.push(level);
                }
                // console.error(this.levels);
                return i - 1;
            }
            line = this.deleteSpace(line);
            if (line.length) {
                if (!level) {
                    level = new PuzzleGameLevelConfig();
                    level.game = this;
                    level.width = 0;
                    level.height = 0;
                    y = 0;
                }
                for (var i_2 = 0; i_2 < line.length; i_2++) {
                    var c = line.charAt(i_2);
                    if (i_2 >= level.width)
                        level.width = i_2 + 1;
                    if (!this.legends[c]) {
                        console.error("parse level error, no legend:", c, 'layer:', line);
                    }
                    var x = i_2;
                    try {
                        for (var _b = (e_4 = void 0, __values(this.legends[c])), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var obj = _c.value;
                            if (!level.layerObjects[obj.layer])
                                level.layerObjects[obj.layer] = [];
                            if (level.layerObjects[obj.layer].indexOf(obj) === -1)
                                level.layerObjects[obj.layer].push(obj);
                            if (!level.layers[obj.layer])
                                level.layers[obj.layer] = [];
                            if (!level.layers[obj.layer][y])
                                level.layers[obj.layer][y] = [];
                            level.layers[obj.layer][y][x] = obj;
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                level.height++;
                y++;
            }
            else {
                if (level) {
                    this.levels.push(level);
                }
                level = null;
            }
        }
        if (level) {
            this.levels.push(level);
        }
        // console.error(this.levels);
        return lines.length;
    };
    PuzzleGameConfig.prototype.parseWinConditions = function (lines, index) {
        var e_5, _a, e_6, _b, e_7, _c;
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (this.isBlockDevice(line)) {
                // console.error(this.winConditions);
                return i - 1;
            }
            line = this.mergeSpace(line);
            line = this.deleteSpaceFrontEnd(line);
            if (line.length) {
                var cond = new PuzzleCondition();
                var strs = line.split(' ');
                if (strs.length === 4) {
                    cond.limit = strs[0];
                    if (!this.groups[strs[1]]) {
                        console.error('parse win condition error, no object:', strs[1], " ,line:", line);
                    }
                    cond.master = this.groups[strs[1]];
                    cond.relation = strs[2];
                    if (!this.groups[strs[3]]) {
                        console.error('parse win condition error, no object:', strs[3], " ,line:", line);
                    }
                    cond.other = this.groups[strs[3]];
                    try {
                        for (var _d = (e_5 = void 0, __values(cond.master)), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var c = _e.value;
                            if (c && this.ruleObjects.indexOf(c) === -1)
                                this.ruleObjects.push(c);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    try {
                        for (var _f = (e_6 = void 0, __values(cond.other)), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var c = _g.value;
                            if (c && this.ruleObjects.indexOf(c) === -1)
                                this.ruleObjects.push(c);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                }
                else if (strs.length === 2) {
                    cond.limit = strs[0];
                    if (!this.groups[strs[1]]) {
                        console.error('parse win condition error, no object:', strs[0], " ,line:", line);
                    }
                    cond.master = this.groups[strs[0]];
                    try {
                        for (var _h = (e_7 = void 0, __values(cond.master)), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var c = _j.value;
                            if (c && this.ruleObjects.indexOf(c) === -1)
                                this.ruleObjects.push(c);
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                }
                this.winConditions.push(cond);
            }
        }
    };
    PuzzleGameConfig.prototype.parseRules = function (lines, index) {
        var e_8, _a, e_9, _b, e_10, _c, e_11, _d, e_12, _e, e_13, _f, e_14, _g, e_15, _h, e_16, _j;
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (this.isBlockDevice(line)) {
                // console.error(this.rules);
                return i - 1;
            }
            if (i === index && !this.rules.length) {
                i--;
                line = '[moving player] -> [moving player]';
            }
            //[ >  Player | Crate ] -> [  >  Player | > Crate  ]
            //1. -> 分割前后
            //2. [] 分为一组
            //3. 第一个分组的第一个力为初始力
            //4. 每个分组由 | 分割为部分
            //5. 每个部分由 "力 对象" 的格式组成
            // force: EMPuzzleKey;
            // ranks: PuzzleGameObjectConfig[][];
            // toRanks: PuzzleGameObjectConfig[][];
            // toForces: EMPuzzleForce[][];
            if (line.indexOf("->") != -1) {
                var rule = new PuzzleRule();
                rule.source = line;
                rule.ranks = [];
                rule.toRanks = [];
                rule.toForces = [];
                rule.limits = [];
                rule.toLimits = [];
                // line = this.deleteSpace(line);
                var befores = line.split("->")[0];
                var ends = line.split("->")[1];
                //解析前面的限定词
                var lets = line.split("[")[0];
                lets = this.deleteSpaceFrontEnd(lets);
                if (lets.length) {
                    var words = lets.split(" ");
                    try {
                        for (var words_1 = (e_8 = void 0, __values(words)), words_1_1 = words_1.next(); !words_1_1.done; words_1_1 = words_1.next()) {
                            var word = words_1_1.value;
                            if (exports.puzzleDirections.indexOf(word) != -1) {
                                rule.directions = exports.puzzleDirection[word];
                            }
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (words_1_1 && !words_1_1.done && (_a = words_1.return)) _a.call(words_1);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                }
                //解析前半部分
                var rules = befores.match(/\[[a-zA-Z0-9><\| \t]+\]/g);
                if (!rules) {
                    console.error("parse error rule:", line);
                }
                try {
                    for (var rules_1 = (e_9 = void 0, __values(rules)), rules_1_1 = rules_1.next(); !rules_1_1.done; rules_1_1 = rules_1.next()) {
                        var str = rules_1_1.value;
                        var rank = [];
                        var limit = [];
                        rule.ranks.push(rank);
                        rule.limits.push(limit);
                        str = str.slice(1, str.length - 1);
                        var legends = str.split("|");
                        try {
                            for (var legends_1 = (e_10 = void 0, __values(legends)), legends_1_1 = legends_1.next(); !legends_1_1.done; legends_1_1 = legends_1.next()) {
                                var legend = legends_1_1.value;
                                var limit2 = [];
                                var isFirst = legends.indexOf(legend) === 0;
                                legend = this.deleteSpaceFrontEnd(this.mergeSpace(legend));
                                if (legend === '...') {
                                    rank.push(null);
                                }
                                else {
                                    var rank2 = [];
                                    limit.push(limit2);
                                    rank.push(rank2);
                                    if (!legend) {
                                        continue;
                                    }
                                    var strs = legend.split(' ');
                                    if (exports.puzzleForces.indexOf(strs[0]) != -1) {
                                        rule.force = strs[0];
                                        strs.shift();
                                    }
                                    var index_1 = 0;
                                    try {
                                        for (var strs_1 = (e_11 = void 0, __values(strs)), strs_1_1 = strs_1.next(); !strs_1_1.done; strs_1_1 = strs_1.next()) {
                                            var subStr = strs_1_1.value;
                                            if (exports.puzzleConditionLimits.indexOf(subStr) != -1) {
                                                limit2[index_1] = subStr;
                                            }
                                            else {
                                                if (!this.groups[subStr]) {
                                                    console.error("parse error rule, no object:", subStr, '\n', line);
                                                }
                                                try {
                                                    for (var _k = (e_12 = void 0, __values(this.groups[subStr])), _l = _k.next(); !_l.done; _l = _k.next()) {
                                                        var objCfg = _l.value;
                                                        if (objCfg && this.ruleObjects.indexOf(objCfg) === -1) {
                                                            this.ruleObjects.push(objCfg);
                                                        }
                                                    }
                                                }
                                                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                                                finally {
                                                    try {
                                                        if (_l && !_l.done && (_e = _k.return)) _e.call(_k);
                                                    }
                                                    finally { if (e_12) throw e_12.error; }
                                                }
                                                limit2[index_1] = limit2[index_1] || null;
                                                rank2[index_1++] = this.groups[subStr];
                                            }
                                        }
                                    }
                                    catch (e_11_1) { e_11 = { error: e_11_1 }; }
                                    finally {
                                        try {
                                            if (strs_1_1 && !strs_1_1.done && (_d = strs_1.return)) _d.call(strs_1);
                                        }
                                        finally { if (e_11) throw e_11.error; }
                                    }
                                }
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (legends_1_1 && !legends_1_1.done && (_c = legends_1.return)) _c.call(legends_1);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (rules_1_1 && !rules_1_1.done && (_b = rules_1.return)) _b.call(rules_1);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
                if (!rule.force)
                    rule.force = EMPuzzleForce.NONE;
                if (rule.force != EMPuzzleForce.NONE && !(rule.ranks[0]
                    && rule.ranks[0][0] && rule.ranks[0][0][0]
                    && this.groups[EMPuzzleConst.PLAYER].indexOf(rule.ranks[0][0][0][0]) != -1)) {
                    continue;
                }
                if (rule.force != EMPuzzleForce.NONE) {
                    rule.isPlayerMoved = true;
                }
                rules = ends.match(/\[[a-zA-Z0-9><\| \t]+\]/g);
                rule.index = this.rules.length;
                this.rules.push(rule);
                try {
                    for (var rules_2 = (e_13 = void 0, __values(rules)), rules_2_1 = rules_2.next(); !rules_2_1.done; rules_2_1 = rules_2.next()) {
                        var str = rules_2_1.value;
                        var toRank = [];
                        var toForce = [];
                        var toLimit = [];
                        rule.toRanks.push(toRank);
                        rule.toForces.push(toForce);
                        rule.toLimits.push(toLimit);
                        str = str.slice(1, str.length - 1);
                        var legends = str.split("|");
                        try {
                            for (var legends_2 = (e_14 = void 0, __values(legends)), legends_2_1 = legends_2.next(); !legends_2_1.done; legends_2_1 = legends_2.next()) {
                                var legend = legends_2_1.value;
                                var froceIndex = 0;
                                var toRank2 = [];
                                var toLimit2 = [];
                                var toForce2 = [];
                                toRank.push(toRank2);
                                toLimit.push(toLimit2);
                                toForce.push(toForce2);
                                if (!legend) {
                                    continue;
                                }
                                legend = this.deleteSpaceFrontEnd(this.mergeSpace(legend));
                                var strs = legend.split(' ');
                                var index_2 = 0;
                                try {
                                    for (var strs_2 = (e_15 = void 0, __values(strs)), strs_2_1 = strs_2.next(); !strs_2_1.done; strs_2_1 = strs_2.next()) {
                                        var str_1 = strs_2_1.value;
                                        if (legend === '...') {
                                            toForce2[froceIndex] = null;
                                            toLimit2[index_2] = null;
                                            toRank2[index_2++] = null;
                                        }
                                        else if (exports.puzzleForces.indexOf(str_1) != -1) {
                                            toForce2[froceIndex] = str_1;
                                        }
                                        else if (exports.puzzleConditionLimits.indexOf(str_1) != -1) {
                                            toLimit2[index_2] = str_1;
                                        }
                                        else {
                                            if (!str_1) {
                                                toLimit2[index_2] = toLimit2[index_2] || null;
                                                toRank2[index_2++] = null;
                                            }
                                            else {
                                                if (!this.groups[str_1]) {
                                                    console.error("parse error rule, no object:", legend, '\n', line);
                                                }
                                                try {
                                                    for (var _m = (e_16 = void 0, __values(this.groups[str_1])), _o = _m.next(); !_o.done; _o = _m.next()) {
                                                        var objCfg = _o.value;
                                                        if (objCfg && this.ruleObjects.indexOf(objCfg) === -1) {
                                                            this.ruleObjects.push(objCfg);
                                                        }
                                                    }
                                                }
                                                catch (e_16_1) { e_16 = { error: e_16_1 }; }
                                                finally {
                                                    try {
                                                        if (_o && !_o.done && (_j = _m.return)) _j.call(_m);
                                                    }
                                                    finally { if (e_16) throw e_16.error; }
                                                }
                                                toLimit2[index_2] = toLimit2[index_2] || null;
                                                toRank2[index_2++] = this.groups[str_1];
                                            }
                                        }
                                    }
                                }
                                catch (e_15_1) { e_15 = { error: e_15_1 }; }
                                finally {
                                    try {
                                        if (strs_2_1 && !strs_2_1.done && (_h = strs_2.return)) _h.call(strs_2);
                                    }
                                    finally { if (e_15) throw e_15.error; }
                                }
                            }
                        }
                        catch (e_14_1) { e_14 = { error: e_14_1 }; }
                        finally {
                            try {
                                if (legends_2_1 && !legends_2_1.done && (_g = legends_2.return)) _g.call(legends_2);
                            }
                            finally { if (e_14) throw e_14.error; }
                        }
                    }
                }
                catch (e_13_1) { e_13 = { error: e_13_1 }; }
                finally {
                    try {
                        if (rules_2_1 && !rules_2_1.done && (_f = rules_2.return)) _f.call(rules_2);
                    }
                    finally { if (e_13) throw e_13.error; }
                }
                //解析后半部分
                // if (rank.length) {
                //     if (rank.length != toRank.length || rank.length != force.length) {
                //         console.error("parse error rule, length no equals:", line);
                //     }
                // }
            }
        }
        this.rules.sort(function (a, b) { return a.ranks.length - b.ranks.length; });
        return lines.length;
    };
    PuzzleGameConfig.prototype.parseCollisionLayers = function (lines, index) {
        var e_17, _a, e_18, _b;
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (this.isBlockDevice(line)) {
                return i - 1;
            }
            line = this.deleteSpace(line);
            if (line.length) {
                var names = line.split(",");
                try {
                    for (var names_1 = (e_17 = void 0, __values(names)), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                        var name_4 = names_1_1.value;
                        name_4 = this.deleteSpace(name_4);
                        try {
                            for (var _c = (e_18 = void 0, __values(this.groups[name_4])), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var obj = _d.value;
                                obj.layer = this.maxLayer;
                            }
                        }
                        catch (e_18_1) { e_18 = { error: e_18_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_18) throw e_18.error; }
                        }
                    }
                }
                catch (e_17_1) { e_17 = { error: e_17_1 }; }
                finally {
                    try {
                        if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
                    }
                    finally { if (e_17) throw e_17.error; }
                }
                this.maxLayer++;
            }
        }
        return lines.length;
    };
    PuzzleGameConfig.prototype.parseLegend = function (lines, index) {
        var e_19, _a, e_20, _b;
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (this.isBlockDevice(line)) {
                // console.error(this.legends);
                return i - 1;
            }
            if (line.indexOf("=") != -1) {
                var legend = line.split("=")[0];
                var name_5 = line.split("=")[1];
                name_5 = this.deleteSpace(name_5);
                legend = this.deleteSpace(legend);
                if (legend.length === 1) {
                    this.legends[legend] = [];
                    var names = name_5.split("and");
                    try {
                        for (var names_2 = (e_19 = void 0, __values(names)), names_2_1 = names_2.next(); !names_2_1.done; names_2_1 = names_2.next()) {
                            var n = names_2_1.value;
                            n = this.deleteSpace(n);
                            this.legends[legend].push(this.objects[n]);
                        }
                    }
                    catch (e_19_1) { e_19 = { error: e_19_1 }; }
                    finally {
                        try {
                            if (names_2_1 && !names_2_1.done && (_a = names_2.return)) _a.call(names_2);
                        }
                        finally { if (e_19) throw e_19.error; }
                    }
                }
                else {
                    this.groups[legend] = [];
                    var names = name_5.split("or");
                    try {
                        for (var names_3 = (e_20 = void 0, __values(names)), names_3_1 = names_3.next(); !names_3_1.done; names_3_1 = names_3.next()) {
                            var n = names_3_1.value;
                            this.groups[legend].push(this.objects[n]);
                        }
                    }
                    catch (e_20_1) { e_20 = { error: e_20_1 }; }
                    finally {
                        try {
                            if (names_3_1 && !names_3_1.done && (_b = names_3.return)) _b.call(names_3);
                        }
                        finally { if (e_20) throw e_20.error; }
                    }
                }
            }
        }
        return lines.length;
    };
    PuzzleGameConfig.prototype.parseObjects = function (lines, index) {
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (this.isBlockDevice(line)) {
                // console.error(this.objects);
                for (var name_6 in this.objects)
                    this.objects[name_6].game = this;
                return i - 1;
            }
            var name_7 = line.match(/[a-zA-Z0-9_]+/) && line.match(/[a-zA-Z0-9_]+/).length ? line.match(/[a-zA-Z0-9_]+/)[0] : "";
            if (name_7 && name_7.length) {
                var obj = new PuzzleGameObjectConfig();
                obj.name = name_7;
                obj.colors = {};
                obj.blocks = [];
                obj.width = 0;
                obj.height = 0;
                i++;
                var colorTexts = lines[i++].match(/[#0-9a-zA-Z_]+/g);
                var colorSum = '';
                for (var c = 0; c < colorTexts.length; c++) {
                    var cstr = colorTexts[c];
                    var nums = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 };
                    if (cstr.charAt(0) == '#') {
                        obj.colors[c + ''] = 0;
                        for (var i_3 = 0; i_3 < cstr.length - 1; i_3++) {
                            var char = cstr.charAt(cstr.length - 1 - i_3);
                            obj.colors[c + ''] += (nums[char]) * Math.pow(16, i_3);
                        }
                    }
                    else {
                        obj.colors[c + ''] = colorDefines[colorTexts[c].toUpperCase()];
                    }
                }
                for (; i < lines.length; i++) {
                    if (!lines[i].match(/[0-9\.]+/)) {
                        break;
                    }
                    var lineBlock = [];
                    for (var c = 0; c < lines[i].length; c++) {
                        lineBlock.push(obj.colors[lines[i][c]]);
                        colorSum += (obj.colors[lines[i][c]] || '0') + "_";
                    }
                    colorSum += "|";
                    obj.colorId = colorSum;
                    obj.blocks.push(lineBlock);
                    obj.width = lineBlock.length;
                }
                i--;
                obj.height = obj.blocks.length;
                this.objects[obj.name] = obj;
                this.groups[obj.name] = [obj];
            }
        }
        return lines.length;
    };
    PuzzleGameConfig.prototype.isBlockDevice = function (line) {
        line = this.deleteSpace(line);
        return line.length && line.match(/=/g) && line.match(/=/g).length === line.length;
    };
    PuzzleGameConfig.prototype.deleteSpace = function (line) {
        while (line.indexOf(" ") != -1) {
            line = line.replace(" ", "");
        }
        while (line.indexOf("\t") != -1) {
            line = line.replace("\t", "");
        }
        while (line.indexOf("\n") != -1) {
            line = line.replace("\n", "");
        }
        while (line.indexOf("\r") != -1) {
            line = line.replace("\r", "");
        }
        return line;
    };
    PuzzleGameConfig.prototype.mergeSpace = function (line) {
        return line.replace(/[ \t]+/g, ' ');
    };
    PuzzleGameConfig.prototype.deleteSpaceFrontEnd = function (line) {
        var start = 0;
        for (; start < line.length; start++) {
            if (line.charAt(start) != ' ' && line.charAt(start) != '\t'
                && line.charAt(start) != '\n' && line.charAt(start) != '\r')
                break;
        }
        var end = line.length - 1;
        for (; end >= 0; end--) {
            if (line.charAt(end) != ' ' && line.charAt(end) != '\t'
                && line.charAt(start) != '\n' && line.charAt(start) != '\r')
                break;
        }
        return line.slice(start, end + 1);
    };
    PuzzleGameConfig.getGameConfig = function (name, txt) {
        if (this.map[name])
            return this.map[name];
        return this.map[name] = new PuzzleGameConfig(txt);
    };
    PuzzleGameConfig.loadGameConfig = function (name, call) {
        var _this = this;
        leaf.Res.getRes(name) &&
            leaf.Res.getRes(name).load().then(function (r) {
                try {
                    var cfg = _this.getGameConfig(name, r.data);
                    call && call(cfg);
                }
                catch (e) {
                    console.error('parse puzzle error:\n', r.data);
                    console.error(e);
                }
            });
    };
    PuzzleGameConfig.map = {};
    return PuzzleGameConfig;
}());
exports.PuzzleGameConfig = PuzzleGameConfig;
var PuzzleGameLevelConfig = /** @class */ (function () {
    function PuzzleGameLevelConfig() {
        this.layers = [];
        this.layerObjects = [];
    }
    Object.defineProperty(PuzzleGameLevelConfig.prototype, "level", {
        get: function () {
            return this.game && this.game.levels.indexOf(this) + 1 || 0;
        },
        enumerable: true,
        configurable: true
    });
    return PuzzleGameLevelConfig;
}());
exports.PuzzleGameLevelConfig = PuzzleGameLevelConfig;
var EMPuzzleKey;
(function (EMPuzzleKey) {
    EMPuzzleKey["UP"] = "up";
    EMPuzzleKey["DOWN"] = "down";
    EMPuzzleKey["LEFT"] = "left";
    EMPuzzleKey["RIGHT"] = "right";
    EMPuzzleKey["A"] = "z";
    EMPuzzleKey["B"] = "x";
})(EMPuzzleKey = exports.EMPuzzleKey || (exports.EMPuzzleKey = {}));
var EMPuzzleDirection;
(function (EMPuzzleDirection) {
    EMPuzzleDirection["UP"] = "up";
    EMPuzzleDirection["DOWN"] = "down";
    EMPuzzleDirection["LEFT"] = "left";
    EMPuzzleDirection["RIGHT"] = "right";
})(EMPuzzleDirection = exports.EMPuzzleDirection || (exports.EMPuzzleDirection = {}));
exports.puzzleDirection = {
    up: ['up'],
    left: ['left'],
    right: ['right'],
    down: ['down'],
    horizontal: ['left', 'right'],
    vertical: ['up', 'down'],
};
exports.puzzleDirections = ['up', 'left', 'right', 'down', 'horizontal', 'vertical'];
var EMPuzzleConst;
(function (EMPuzzleConst) {
    EMPuzzleConst["PLAYER"] = "player";
    EMPuzzleConst["BACKGROUND"] = "background";
})(EMPuzzleConst = exports.EMPuzzleConst || (exports.EMPuzzleConst = {}));
var EMPuzzleMove;
(function (EMPuzzleMove) {
    EMPuzzleMove["NONE"] = "none";
    EMPuzzleMove["UP"] = "up";
    EMPuzzleMove["DOWN"] = "down";
    EMPuzzleMove["LEFT"] = "left";
    EMPuzzleMove["RIGHT"] = "right";
})(EMPuzzleMove = exports.EMPuzzleMove || (exports.EMPuzzleMove = {}));
var EMPuzzleForce;
(function (EMPuzzleForce) {
    EMPuzzleForce["PUSH"] = ">";
    EMPuzzleForce["PULL"] = "<";
    EMPuzzleForce["UP"] = "up";
    EMPuzzleForce["DOWN"] = "down";
    EMPuzzleForce["LEFT"] = "left";
    EMPuzzleForce["RIGHT"] = "right";
    EMPuzzleForce["MOVING"] = "moving";
    EMPuzzleForce["NONE"] = "none";
})(EMPuzzleForce = exports.EMPuzzleForce || (exports.EMPuzzleForce = {}));
exports.puzzleForces = ['>', '<', 'up', 'down', 'left', 'right', 'moving'];
var EMPuzzleGameModel;
(function (EMPuzzleGameModel) {
    EMPuzzleGameModel["OBJECTS"] = "objects";
    EMPuzzleGameModel["LEGEND"] = "legend";
    EMPuzzleGameModel["SOUNDS"] = "sounds";
    EMPuzzleGameModel["COLLISIONLAYERS"] = "collisionlayers";
    EMPuzzleGameModel["RULES"] = "rules";
    EMPuzzleGameModel["WINCONDITIONS"] = "winconditions";
    EMPuzzleGameModel["LEVELS"] = "levels";
    EMPuzzleGameModel["FACE"] = "face";
})(EMPuzzleGameModel = exports.EMPuzzleGameModel || (exports.EMPuzzleGameModel = {}));
var PuzzleGameObjectConfig = /** @class */ (function () {
    function PuzzleGameObjectConfig() {
        this.layer = 0;
        this.isPlayer = false;
    }
    return PuzzleGameObjectConfig;
}());
exports.PuzzleGameObjectConfig = PuzzleGameObjectConfig;
var PuzzleRule = /** @class */ (function () {
    function PuzzleRule() {
    }
    return PuzzleRule;
}());
exports.PuzzleRule = PuzzleRule;
var EMPuzzleConditionLimit;
(function (EMPuzzleConditionLimit) {
    EMPuzzleConditionLimit["NO"] = "no";
    EMPuzzleConditionLimit["ALL"] = "all";
    EMPuzzleConditionLimit["SOME"] = "some";
})(EMPuzzleConditionLimit = exports.EMPuzzleConditionLimit || (exports.EMPuzzleConditionLimit = {}));
exports.puzzleConditionLimits = ['no', 'all', 'some'];
var EMPuzzleConditionRelation;
(function (EMPuzzleConditionRelation) {
    EMPuzzleConditionRelation["NONE"] = "";
    EMPuzzleConditionRelation["ON"] = "on";
})(EMPuzzleConditionRelation = exports.EMPuzzleConditionRelation || (exports.EMPuzzleConditionRelation = {}));
var PuzzleCondition = /** @class */ (function () {
    function PuzzleCondition() {
    }
    return PuzzleCondition;
}());
exports.PuzzleCondition = PuzzleCondition;
var colorDefines = {
    "TRANSPARENT": 0x777777,
    "BLACK": 0x555555,
    "WHITE": 0xffffff,
    "GREY": 0x9d9d9d,
    "DARKGREY": 0x6d6d6d,
    "LIGHTGREY": 0xc1c1c1,
    "GRAY": 0x9d9d9d,
    "DARKGRAY": 0x6d6d6d,
    "LIGHTGRAY": 0xc1c1c1,
    "RED": 0xbe2633,
    "DARKRED": 0x732930,
    "LIGHTRED": 0xe06f8b,
    "BROWN": 0xa46422,
    "DARKBROWN": 0x493c2b,
    "LIGHTBROWN": 0xeeb62f,
    "ORANGE": 0xeb8931,
    "YELLOW": 0xf7e26b,
    "GREEN": 0x44891a,
    "DARKGREEN": 0x2f484e,
    "LIGHTGREEN": 0xa3ce27,
    "BLUE": 0x31a2f2,
    "DARKBLUE": 0x005784,
    "LIGHTBLUE": 0xb2dcef,
    "PURPLE": 0x580780,
    "PINK": 0xe06f8b
};
function parseColorDefines(txt) {
    var e_21, _a;
    txt = "\n    .cm-s-midnight span.cm-COLOR-TRANSPARENT {\n        color: #777;\n        font-weight: normal\n    }\n    \n    .cm-s-midnight span.cm-COLOR-BLACK {\n        color: #555\n    }\n    \n    .cm-s-midnight span.cm-COLOR-WHITE {\n        color: #fff\n    }\n    ";
    var lines = txt.split("\n");
    var name;
    var colors = {};
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            if (line.indexOf("span.cm-COLOR-") != -1) {
                name = line.slice(line.indexOf("span.cm-COLOR-") + "span.cm-COLOR-".length, line.indexOf(" {"));
                line = lines[lines.indexOf(line) + 1];
                var color = "0x" + line.split("#")[1];
                if (color.length === 5) {
                    color = "0x" + color[2] + color[2] + color[3] + color[3] + color[4] + color[4];
                }
                colors[name] = color;
            }
        }
    }
    catch (e_21_1) { e_21 = { error: e_21_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_21) throw e_21.error; }
    }
    console.error(JSON.stringify(colors, null, 2));
}


/***/ }),

/***/ "../src/modules/puzzle/face/face-scene.ts":
/*!************************************************!*\
  !*** ../src/modules/puzzle/face/face-scene.ts ***!
  \************************************************/
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
var module_scene_1 = __webpack_require__(/*! ../../../utils/ui/module-scene */ "../src/utils/ui/module-scene.ts");
var puzzle_scene_1 = __webpack_require__(/*! ../puzzle-scene */ "../src/modules/puzzle/puzzle-scene.ts");
var puzzle_game_1 = __webpack_require__(/*! ../component/puzzle-game */ "../src/modules/puzzle/component/puzzle-game.ts");
var FaceScene = /** @class */ (function (_super) {
    __extends(FaceScene, _super);
    function FaceScene() {
        var _this = _super.call(this) || this;
        // //9,17,33
        // let size = 29
        // let blocks = MazeAlgorithm.makeSimpleMaze(17, 17);
        // blocks[0][1] = 2;
        // blocks[blocks.length - 1][blocks[0].length - 2] = 3;
        // let print = (blocks) => {
        //     let str = '\n';
        //     for (let y = 0; y < blocks.length; y++) {
        //         for (let x = 0; x < blocks[y].length; x++) {
        //             blocks[y][x] = [".", "#", "P", "O"][blocks[y][x]] as any;
        //             str += blocks[y][x];
        //         }
        //         str += '\n';
        //     }
        //     console.error(str);
        // }
        // print(blocks);
        // // this.makeLevel();
        // return
        // let label = ecs.Entity.create().addComponent(leaf.Label);
        // label.text = '开心游戏合集';
        // label.fontSize = 10;
        // label.transform.x = (leaf.getStageWidth() - label.textWidth) / 2;
        // label.transform.y = 25;
        // label.parent = this.scene;
        var top = 100;
        var ui = ecs.Entity.create();
        ui.parent = _this.scene;
        var root = ecs.Entity.create();
        root.parent = ui;
        root.transform.y = top;
        var listScroller = ecs.Entity.create();
        listScroller.parent = root;
        var bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.parent = listScroller;
        bg.texture = leaf.PointTexture.getTexture(0x00ff00);
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight() - top - 60;
        bg.transform.alpha = 0;
        var levelList = ecs.Entity.create();
        levelList.parent = listScroller;
        var mask = ecs.Entity.create().addComponent(leaf.Bitmap);
        mask.texture = leaf.PointTexture.getTexture(0);
        mask.parent = ui;
        mask.transform.scaleX = leaf.getStageWidth();
        mask.transform.scaleY = top;
        mask = ecs.Entity.create().addComponent(leaf.Bitmap);
        mask.texture = leaf.PointTexture.getTexture(0);
        mask.parent = ui;
        mask.transform.scaleX = leaf.getStageWidth();
        mask.transform.scaleY = 60;
        mask.transform.y = leaf.getStageHeight() - mask.transform.scaleY;
        var listHeight = leaf.getStageHeight() - 60 - top;
        var gameList = [
            'game1-1_txt',
            'game1-2_txt',
            'game1-3_txt',
            'game1-4_txt'
        ];
        var nameList = [
            '经典推箱子',
            '走迷宫',
            '初级推箱子',
            '吃苹果'
        ];
        var _loop_1 = function (i) {
            var levelui = ecs.Entity.create();
            levelui.parent = levelList;
            levelui.transform.x = [30, 140][i % 2];
            levelui.transform.y = 130 * (~~(i / 2));
            var level = ecs.Entity.create().addComponent(puzzle_game_1.PuzzleGame, gameList[i], 0, false, false, 100, 100);
            level.parent = levelui;
            var label = ecs.Entity.create().addComponent(leaf.Label);
            label.text = nameList[i];
            label.parent = levelui;
            label.fontSize = 20;
            level.transform.y = 20;
            if (window["lv"] == null)
                window["lv"] = level;
            levelui.addComponent(leaf.TouchComponent).onTouchEnd.on(function () {
                new puzzle_scene_1.PuzzleScene(gameList[i]);
            });
        };
        for (var i = 0; i < gameList.length; i++) {
            _loop_1(i);
        }
        var startX = 0;
        var startY = 0;
        var levelY = levelList.transform.y;
        var startScroll = false;
        listScroller.addComponent(leaf.TouchComponent).onTouchStart.on(function (e) {
            startScroll = false;
            startX = e.stageX;
            startY = e.stageY;
            levelY = levelList.transform.y;
        });
        listScroller.getComponent(leaf.TouchComponent).onTouchMove.on(function (e) {
            if (Math.abs(e.stageX - startX) > 10 || Math.abs(e.stageY - startY) > 10) {
                startScroll = true;
            }
            if (startScroll) {
                levelList.transform.y = levelY - startY + e.stageY;
                if (levelList.transform.y < listHeight - 130 * (~~(gameList.length / 2))) {
                    levelList.transform.y = listHeight - 130 * (~~(gameList.length / 2));
                }
                if (levelList.transform.y > 0)
                    levelList.transform.y = 0;
            }
        });
        return _this;
        // ui.addComponent(HPComponent);
    }
    FaceScene.prototype.makeLevel = function () {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        var copySearch = function (source) {
            var copy = [];
            for (var y = 0; y < h; y++) {
                copy[y] = [];
                for (var x = 0; x < w; x++) {
                    copy[y][x] = source[y][x];
                }
            }
            return copy;
        };
        console.clear();
        var w = 25;
        var h = 25;
        var grids = [];
        var search = [];
        for (var y = 0; y < h; y++) {
            search[y] = [];
            grids[y] = [];
            for (var x = 0; x < w; x++) {
                search[y][x] = 0;
                grids[y][x] = y === 0 || x === 0 || x === w - 1 || y === h - 1 ? 1 : 0;
            }
        }
        grids[0][1] = 2;
        grids[h - 1][w - 2] = 3;
        var offsets = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        var source = copySearch(grids);
        while (true) {
            var count_1 = 0;
            grids = copySearch(source);
            for (var y = 0; y < h; y++) {
                var x = ~~(w * Math.random());
                if (grids[y][x]) {
                    continue;
                }
                var flag = true;
                if (grids[y + 1][x] || grids[y - 1][x] || grids[y - 1][x - 1] || grids[y - 1][x + 1]
                    || grids[y + 1][x - 1] || grids[y + 1][x + 1]) {
                    flag = false;
                    continue;
                }
                if (!flag)
                    continue;
                grids[y][x] = 1;
                var addX = Math.random() < 0.5 ? -1 : 1;
                var cx = x + addX;
                while (cx >= 1 && cx < w - 1) {
                    var flag_1 = true;
                    if (grids[y + 1][cx] || grids[y - 1][cx] || grids[y - 1][cx - 1] || grids[y - 1][cx + 1] ||
                        grids[y + 1][cx - 1] || grids[y + 1][cx + 1]) {
                        flag_1 = false;
                        break;
                    }
                    grids[y][cx] = 1;
                    count_1++;
                    cx += addX;
                    if (!flag_1)
                        continue;
                    if (Math.random() < 0.2)
                        continue;
                }
            }
            if (count_1 > w + h)
                break;
        }
        var count = 0;
        while (count < h / 2) {
            for (var y = 0; y < h; y++) {
                var x = ~~(w * Math.random());
                if (!grids[y][x] && !grids[y][x - 1] && !grids[y][x + 1] &&
                    (!grids[y - 1][x] && !grids[y - 1][x - 1] && !grids[y - 1][x + 1]
                        || !grids[y + 1][x] && !grids[y + 1][x - 1] && !grids[y + 1][x + 1])) {
                    grids[y][x] = 1;
                    count++;
                }
            }
        }
        var print = function (blocks) {
            var str = '\n';
            for (var y = 0; y < h; y++) {
                for (var x = 0; x < w; x++) {
                    str += blocks[y][x];
                }
                str += '\n';
            }
            console.error(str);
        };
        var endX = w - 2;
        var endY = h - 1;
        var results = [];
        var paths = [{ x: 1, y: 0, path: [{ x: 1, y: 0 }], search: search }];
        while (paths.length && true) {
            if (results.length >= 1)
                break;
            var path_3 = paths.splice(~~(paths.length * Math.random()), 1)[0];
            // if (path.path.length < (w + h) * 1) continue;
            path_3.search[path_3.y][path_3.x] = 1;
            var cks = offsets.concat();
            while (cks.length) {
                var offset = cks.splice(~~(Math.random() * cks.length), 1)[0];
                var x = path_3.x + offset[0];
                var y = path_3.y + offset[1];
                if (x === endX && y === endY) {
                    results.push(path_3.path.concat({ x: x, y: y }));
                    print(path_3.search);
                    console.error(path_3.path.length);
                    continue;
                }
                if (x < 0 || x >= w || y < 0 || y >= h)
                    continue;
                if (path_3.search[y][x])
                    continue;
                if (grids[y][x])
                    continue;
                var flag = true;
                try {
                    for (var offsets_1 = (e_1 = void 0, __values(offsets)), offsets_1_1 = offsets_1.next(); !offsets_1_1.done; offsets_1_1 = offsets_1.next()) {
                        var co = offsets_1_1.value;
                        if (path_3.search[y + co[1]][x + co[0]] && (x + co[0] != path_3.x || y + co[1] != path_3.y)) {
                            flag = false;
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (offsets_1_1 && !offsets_1_1.done && (_a = offsets_1.return)) _a.call(offsets_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (!flag)
                    continue;
                var search_1 = copySearch(path_3.search);
                search_1[path_3.y][path_3.x] = 1;
                paths.push({
                    x: x, y: y, path: path_3.path.concat([{ x: x, y: y }]),
                    search: search_1
                });
            }
        }
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results.length; j++) {
                if (i === j)
                    continue;
                if (results[i].length != results[j].length)
                    continue;
                var flag = true;
                for (var k = 0; k < results[i].length; k++) {
                    if (results[i][k].x != results[j][k].x || results[i][k].y != results[j][k].y) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    console.error("same ???", i, j, results[i], results[j]);
                    return;
                }
            }
        }
        // console.error(results);
        grids = copySearch(source);
        var path = results.pop();
        path.shift();
        var indexs = [];
        try {
            for (var path_1 = __values(path), path_1_1 = path_1.next(); !path_1_1.done; path_1_1 = path_1.next()) {
                var p = path_1_1.value;
                var ind = p.x + p.y * w;
                indexs.push(ind);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (path_1_1 && !path_1_1.done && (_b = path_1.return)) _b.call(path_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var path_2 = __values(path), path_2_1 = path_2.next(); !path_2_1.done; path_2_1 = path_2.next()) {
                var p = path_2_1.value;
                try {
                    for (var offsets_2 = (e_4 = void 0, __values(offsets)), offsets_2_1 = offsets_2.next(); !offsets_2_1.done; offsets_2_1 = offsets_2.next()) {
                        var off = offsets_2_1.value;
                        var x = p.x + off[1];
                        var y = p.y + off[0];
                        if (x < 0 || x >= w || y < 0 || y >= h)
                            continue;
                        var ind = x + y * w;
                        if (indexs.indexOf(ind) != -1)
                            continue;
                        if (!grids[y][x])
                            grids[y][x] = 1;
                        // console.error(x, y, ind, indexs);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (offsets_2_1 && !offsets_2_1.done && (_d = offsets_2.return)) _d.call(offsets_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (path_2_1 && !path_2_1.done && (_c = path_2.return)) _c.call(path_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                grids[y][x] = [".", "#", "P", "O"][grids[y][x]];
            }
        }
        print(grids);
        // console.error(JSON.stringify(grids, null, 2));
    };
    FaceScene = __decorate([
        orange.autoload("FaceScene")
    ], FaceScene);
    return FaceScene;
}(module_scene_1.ModuleScene));
exports.FaceScene = FaceScene;


/***/ }),

/***/ "../src/modules/puzzle/puzzle-scene.ts":
/*!*********************************************!*\
  !*** ../src/modules/puzzle/puzzle-scene.ts ***!
  \*********************************************/
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
var puzzle_game_1 = __webpack_require__(/*! ./component/puzzle-game */ "../src/modules/puzzle/component/puzzle-game.ts");
var face_scene_1 = __webpack_require__(/*! ./face/face-scene */ "../src/modules/puzzle/face/face-scene.ts");
var PuzzleScene = /** @class */ (function (_super) {
    __extends(PuzzleScene, _super);
    function PuzzleScene(game) {
        if (game === void 0) { game = 'game1-1_txt'; }
        var _this = _super.call(this) || this;
        var child = ecs.Entity.create();
        child.parent = _this.scene;
        ecs.Entity.create().addComponent(puzzle_game_1.PuzzleGame, 'game1-4_txt', 1).parent = child;
        // ecs.Entity.create().addComponent(PuzzleLevelWin, game).parent = child;
        var zBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        zBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(0xffffff + "," + 0xaa0000 + "\n" +
            '0.....0\n' +
            '.0...0.\n' +
            '..0.0..\n' +
            '...0...\n' +
            '..0.0..\n' +
            '.0...0.\n' +
            '0.....0'));
        zBtn.transform.y = 15;
        zBtn.transform.x = 10;
        zBtn.transform.scaleX = zBtn.transform.scaleY = 3;
        zBtn.parent = _this.scene;
        zBtn.entity.name = 'z';
        var label = ecs.Entity.create().addComponent(leaf.Label);
        label.text = '开心合集';
        label.fontSize = 10;
        label.transform.x = (leaf.getStageWidth() - label.textWidth) / 2;
        label.transform.y = 25;
        label.parent = _this.scene;
        _this.addClick(zBtn, function () {
            new face_scene_1.FaceScene();
        });
        return _this;
    }
    PuzzleScene.prototype.addClick = function (btn, call) {
        btn.addComponent(leaf.TouchComponent).onTouchStart.on(function () {
            btn.transform.alpha = 0.8;
        });
        btn.getComponent(leaf.TouchComponent).onTouchEnd.on(function () {
            btn.transform.alpha = 1;
            call && call();
        });
    };
    PuzzleScene = __decorate([
        orange.autoload("PuzzleScene")
    ], PuzzleScene);
    return PuzzleScene;
}(module_scene_1.ModuleScene));
exports.PuzzleScene = PuzzleScene;


/***/ }),

/***/ "../src/utils/storage/game-storage.ts":
/*!********************************************!*\
  !*** ../src/utils/storage/game-storage.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
var iswx = false;
/**
 * @internal
 */
var wx = window["wx"];
try {
    if (window["wx"] && window["wx"].getFileSystemManager && window["wx"].getFileSystemManager()["stat"]) {
        iswx = true;
    }
}
catch (e) {
    iswx = false;
}
if (iswx) {
    window["ofs"] = (function () {
        var _this = this;
        var fs = wx.getFileSystemManager();
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
            return path == '' ? wx.env.USER_DATA_PATH : wx.env.USER_DATA_PATH + '/' + path;
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
        out.setStorages = function (type, list) {
            return new Promise(function (resolve, reject) {
                if (list.length == 0) {
                    resolve();
                }
                else {
                    var n = list.length;
                    list.forEach(function (item) {
                        console.warn('存储:' + wx.env.USER_DATA_PATH + '/ofs/storage/' + type + '/' + item.key + '.txt');
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
        out.setStorage = function (type, val) {
            return out.setStorages(type, [{ key: type, value: val }]);
        };
        out.getStorages = function (type) {
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
        out.getStorage = function (type) {
            return new Promise(function (resolve, reject) {
                out.readDir('ofs/storage/' + type).then(function (list) {
                    if (list.length == 0) {
                        resolve(null);
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
                                    resolve(all.length ? all[0].value : null);
                            }).catch(function (e) { return resolve(null); }); //reject(e)
                        });
                    }
                }).catch(function (e) { return resolve(null); }); //reject(e)
            });
        };
        out.removeStorage = function (type) {
            return new Promise(function (resolve, reject) {
                out.removeDir('ofs/storage/' + type).then(function () { return resolve(); }).catch(function (e) { return reject(e); });
            });
        };
        return out;
    }).call(function () { });
}
else {
    var f = {};
    window["ofs"] = f;
    f.setStorages = function (type, list) {
        return new Promise(function (resolve) {
            try {
                window.localStorage.setItem(type, JSON.stringify(list));
            }
            catch (e) {
            }
            resolve();
        });
    };
    f.setStorage = function (type, val) {
        return f.setStorages(type, [{ key: type, value: val }]);
    };
    f.getStorages = function (type) {
        return new Promise(function (resolve) {
            var items = [];
            try {
                items = JSON.parse(window.localStorage.getItem(type));
            }
            catch (e) {
                items = [];
            }
            resolve(items);
        });
    };
    f.getStorage = function (type) {
        return new Promise(function (resolve) {
            var items = [];
            try {
                items = JSON.parse(window.localStorage.getItem(type));
            }
            catch (e) {
                items = [];
            }
            resolve(items && items.length ? items[0].value : null);
        });
    };
    f.removeStorage = function (type) {
        return new Promise(function (resolve) {
            window.localStorage.removeItem(type);
            resolve();
        });
    };
}
var File = /** @class */ (function () {
    function File() {
    }
    File.removeFile = window["ofs"].removeFile || (function () { return new Promise(function (resolve) { return resolve(); }); });
    return File;
}());
exports.File = File;
var GameStorage = /** @class */ (function () {
    function GameStorage() {
    }
    GameStorage.setStorages = window["ofs"].setStorage;
    GameStorage.getStorages = window["ofs"].getStorage;
    GameStorage.setStorage = window["ofs"].setStorage;
    GameStorage.getStorage = window["ofs"].getStorage;
    GameStorage.removeStorage = window["ofs"].removeStorage;
    return GameStorage;
}());
exports.GameStorage = GameStorage;
window["GameStorage"] = GameStorage;


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