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
var face_scene_1 = __webpack_require__(/*! ./modules/puzzle/face/face-scene */ "../src/modules/puzzle/face/face-scene.ts");
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
                                new face_scene_1.FaceScene();
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
var PuzzleGameKeyBoard = /** @class */ (function (_super) {
    __extends(PuzzleGameKeyBoard, _super);
    function PuzzleGameKeyBoard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleGameKeyBoard.prototype.awake = function () {
        var _this = this;
        window.onkeydown = function (e) {
            // console.error(e.keyCode);
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
var puzzle_game_result_1 = __webpack_require__(/*! ./puzzle-game-result */ "../src/modules/puzzle/component/puzzle-game-result.ts");
orange.autoloadLink("PuzzleScene");
var PuzzleGameLoop = /** @class */ (function (_super) {
    __extends(PuzzleGameLoop, _super);
    function PuzzleGameLoop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moveOffset = {
            'none': { x: 0, y: 0 },
            'right': { x: 1, y: 0 },
            'left': { x: -1, y: 0 },
            'up': { x: 0, y: -1 },
            'down': { x: 0, y: 1 }
        };
        _this.forceMoveOffsets = {
            'none': {
                'none': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
                'right': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
                'left': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
                'up': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
                'down': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]
            },
            '>': {
                'none': [],
                'right': [{ x: 1, y: 0 }],
                'left': [{ x: -1, y: 0 }],
                'up': [{ x: 0, y: -1 }],
                'down': [{ x: 0, y: 1 }]
            },
            '<': {
                'none': [],
                'right': [{ x: -1, y: 0 }],
                'left': [{ x: 1, y: 0 }],
                'up': [{ x: 0, y: 1 }],
                'down': [{ x: 0, y: -1 }]
            },
            'right': {
                'none': [],
                'right': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
                'left': [],
                'up': [],
                'down': []
            },
            'left': {
                'none': [],
                'right': [],
                'left': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
                'up': [],
                'down': []
            },
            'up': {
                'none': [],
                'right': [],
                'left': [],
                'up': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
                'down': []
            },
            'down': {
                'none': [],
                'right': [],
                'left': [],
                'up': [],
                'down': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]
            },
            'moving': {
                'none': [],
                'right': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
                'left': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
                'up': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
                'down': [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]
            }
        };
        return _this;
    }
    PuzzleGameLoop.prototype.awake = function () {
        setTimeout(function () {
            // this.run(EMPuzzleMove.RIGHT);
        }, 1000);
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
        var level = this.getComponent(puzzle_game_level_1.PuzzleGameLevel);
        if (level.state === 'win' || level.state === 'lose')
            return;
        var gameConfig = this.getComponent(puzzle_game_1.PuzzleGame).config;
        var objMap = {};
        var moveOffset = this.moveOffset[move];
        //记录移动过的元素初始位置
        var movedObject = {};
        try {
            for (var _o = __values(gameConfig.rules), _p = _o.next(); !_p.done; _p = _o.next()) {
                var rule = _p.value;
                var ruleMovedObject = [];
                var offset = void 0;
                if (!rule.ranks.length || !rule.ranks[0].length || !rule.ranks[0][0].length)
                    continue;
                try {
                    for (var _q = (e_2 = void 0, __values(rule.ranks[0][0])), _r = _q.next(); !_r.done; _r = _q.next()) {
                        var objCfg = _r.value;
                        var objs = level.getObjectsByType(objCfg);
                        try {
                            for (var objs_1 = (e_3 = void 0, __values(objs)), objs_1_1 = objs_1.next(); !objs_1_1.done; objs_1_1 = objs_1.next()) {
                                var obj = objs_1_1.value;
                                var startX = obj.x;
                                var startY = obj.y;
                                objMap[obj.id] = obj;
                                //obj.id
                                var poses = [];
                                var offsets = this.forceMoveOffsets[rule.force][move];
                                try {
                                    for (var offsets_1 = (e_4 = void 0, __values(offsets)), offsets_1_1 = offsets_1.next(); !offsets_1_1.done; offsets_1_1 = offsets_1.next()) {
                                        var offset_1 = offsets_1_1.value;
                                        //开始匹配某个方向是否符合规则
                                        var flag = true;
                                        var anyPosistion = false;
                                        var checkPos = [obj.id];
                                        for (var j = 1; j < rule.ranks[0].length; j++) {
                                            if (rule.ranks[0][j] == null) {
                                                anyPosistion = true;
                                            }
                                            else {
                                                if (anyPosistion) { //前面出现过任意位置
                                                }
                                                else { //判断特定的位置是否有满足条件的对象
                                                    var x = startX + offset_1.x * j;
                                                    var y = startY + offset_1.y * j;
                                                    try {
                                                        for (var _s = (e_5 = void 0, __values(level.layers)), _t = _s.next(); !_t.done; _t = _s.next()) {
                                                            var layer = _t.value;
                                                            var check = layer.objects[y][x];
                                                            if (check && rule.ranks[0][j].indexOf(check.config) != -1) {
                                                                if (ruleMovedObject.indexOf(check.id) != -1) {
                                                                    flag = false;
                                                                    break;
                                                                }
                                                                if (poses.indexOf(check.id) != -1) { //某个对象已经用过
                                                                    flag = false;
                                                                    break;
                                                                }
                                                                objMap[check.id] = check;
                                                                checkPos.push(check.id);
                                                                break;
                                                            }
                                                            else {
                                                                if (layer.layerIndex === level.layers.length - 1) {
                                                                    flag = false;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                                    finally {
                                                        try {
                                                            if (_t && !_t.done && (_e = _s.return)) _e.call(_s);
                                                        }
                                                        finally { if (e_5) throw e_5.error; }
                                                    }
                                                    if (!flag)
                                                        break;
                                                }
                                            }
                                        }
                                        if (flag) { //匹配成功，把对象加入操作队列中
                                            poses.push(checkPos);
                                        }
                                    }
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (offsets_1_1 && !offsets_1_1.done && (_d = offsets_1.return)) _d.call(offsets_1);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                                for (var p = 0; p < poses.length; p++) {
                                    try {
                                        for (var _u = (e_6 = void 0, __values(poses[p])), _v = _u.next(); !_v.done; _v = _u.next()) {
                                            var id = _v.value;
                                            objMap[id].removeFromLayer();
                                            if (!movedObject[id]) {
                                                movedObject[id] = { x: objMap[id].x, y: objMap[id].y };
                                            }
                                            else {
                                                objMap[id].setCoord(movedObject[id].x, movedObject[id].y);
                                            }
                                            ruleMovedObject.push(id);
                                        }
                                    }
                                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                    finally {
                                        try {
                                            if (_v && !_v.done && (_f = _u.return)) _f.call(_u);
                                        }
                                        finally { if (e_6) throw e_6.error; }
                                    }
                                }
                                var errorStack_3 = [];
                                for (var p = 0; p < poses.length; p++) {
                                    try {
                                        for (var _w = (e_7 = void 0, __values(poses[p])), _x = _w.next(); !_x.done; _x = _w.next()) {
                                            var id = _x.value;
                                            var toFroce = rule.toForces[0][p];
                                            var moveSuccess = true;
                                            if (toFroce === null) {
                                                moveSuccess = objMap[id].addToLayer();
                                            }
                                            else if (toFroce === puzzle_game_config_1.EMPuzzleForce.PUSH || toFroce === puzzle_game_config_1.EMPuzzleForce.MOVING) { //推
                                                objMap[id].setCoord(objMap[id].x + moveOffset.x, objMap[id].y + moveOffset.y);
                                                moveSuccess = objMap[id].addToLayer();
                                            }
                                            else if (toFroce === puzzle_game_config_1.EMPuzzleForce.PULL) { //拉
                                                objMap[id].setCoord(objMap[id].x - moveOffset.x, objMap[id].y - moveOffset.y);
                                                moveSuccess = objMap[id].addToLayer();
                                            }
                                            else if (toFroce === puzzle_game_config_1.EMPuzzleForce.RIGHT) {
                                                objMap[id].setCoord(objMap[id].x + 1, objMap[id].y);
                                                moveSuccess = objMap[id].addToLayer();
                                            }
                                            else if (toFroce === puzzle_game_config_1.EMPuzzleForce.LEFT) {
                                                objMap[id].setCoord(objMap[id].x - 1, objMap[id].y);
                                                moveSuccess = objMap[id].addToLayer();
                                            }
                                            else if (toFroce === puzzle_game_config_1.EMPuzzleForce.UP) {
                                                objMap[id].setCoord(objMap[id].x, objMap[id].y - 1);
                                                moveSuccess = objMap[id].addToLayer();
                                            }
                                            else if (toFroce === puzzle_game_config_1.EMPuzzleForce.DOWN) {
                                                objMap[id].setCoord(objMap[id].x, objMap[id].y + 1);
                                                moveSuccess = objMap[id].addToLayer();
                                            }
                                            if (!moveSuccess) { //移动失败，还原位置
                                                errorStack_3.push(objMap[id]);
                                            }
                                        }
                                    }
                                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                    finally {
                                        try {
                                            if (_x && !_x.done && (_g = _w.return)) _g.call(_w);
                                        }
                                        finally { if (e_7) throw e_7.error; }
                                    }
                                }
                                while (errorStack_3.length) {
                                    try {
                                        for (var errorStack_1 = (e_8 = void 0, __values(errorStack_3)), errorStack_1_1 = errorStack_1.next(); !errorStack_1_1.done; errorStack_1_1 = errorStack_1.next()) {
                                            var p = errorStack_1_1.value;
                                            p.setCoord(movedObject[p.id].x, movedObject[p.id].y);
                                            if (p.addToLayer()) {
                                                errorStack_3.splice(errorStack_3.indexOf(p), 1);
                                                break;
                                            }
                                            else {
                                                if (p.layer.objects[p.y][p.x] && errorStack_3.indexOf(p.layer.objects[p.y][p.x]) == -1) {
                                                    errorStack_3.push(p.layer.objects[p.y][p.x]);
                                                    p.layer.objects[p.y][p.x].removeFromLayer();
                                                }
                                            }
                                        }
                                    }
                                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                                    finally {
                                        try {
                                            if (errorStack_1_1 && !errorStack_1_1.done && (_h = errorStack_1.return)) _h.call(errorStack_1);
                                        }
                                        finally { if (e_8) throw e_8.error; }
                                    }
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (objs_1_1 && !objs_1_1.done && (_c = objs_1.return)) _c.call(objs_1);
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_p && !_p.done && (_a = _o.return)) _a.call(_o);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var playerNotMoveList = [];
        try {
            for (var _y = __values(gameConfig.groups[puzzle_game_config_1.EMPuzzleConst.PLAYER]), _z = _y.next(); !_z.done; _z = _y.next()) {
                var playerCfg = _z.value;
                var players = level.getObjectsByType(playerCfg);
                try {
                    for (var players_1 = (e_10 = void 0, __values(players)), players_1_1 = players_1.next(); !players_1_1.done; players_1_1 = players_1.next()) {
                        var p = players_1_1.value;
                        if (!movedObject[p.id]) {
                            playerNotMoveList.push(p);
                            p.removeFromLayer();
                        }
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (players_1_1 && !players_1_1.done && (_k = players_1.return)) _k.call(players_1);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_z && !_z.done && (_j = _y.return)) _j.call(_y);
            }
            finally { if (e_9) throw e_9.error; }
        }
        var errorStack = [];
        try {
            for (var playerNotMoveList_1 = __values(playerNotMoveList), playerNotMoveList_1_1 = playerNotMoveList_1.next(); !playerNotMoveList_1_1.done; playerNotMoveList_1_1 = playerNotMoveList_1.next()) {
                var p = playerNotMoveList_1_1.value;
                movedObject[p.id] = { x: p.x, y: p.y };
                p.setCoord(p.x + moveOffset.x, p.y + moveOffset.y);
                if (!p.addToLayer()) {
                    errorStack.push(p);
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (playerNotMoveList_1_1 && !playerNotMoveList_1_1.done && (_l = playerNotMoveList_1.return)) _l.call(playerNotMoveList_1);
            }
            finally { if (e_11) throw e_11.error; }
        }
        while (errorStack.length) {
            try {
                for (var errorStack_2 = (e_12 = void 0, __values(errorStack)), errorStack_2_1 = errorStack_2.next(); !errorStack_2_1.done; errorStack_2_1 = errorStack_2.next()) {
                    var p = errorStack_2_1.value;
                    p.setCoord(movedObject[p.id].x, movedObject[p.id].y);
                    if (p.addToLayer()) {
                        errorStack.splice(errorStack.indexOf(p), 1);
                        break;
                    }
                    else {
                        if (errorStack.indexOf(p.layer.objects[p.y][p.x]) != -1) {
                            p.layer.objects[p.y][p.x].removeFromLayer();
                            errorStack.push(p.layer.objects[p.y][p.x]);
                        }
                    }
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (errorStack_2_1 && !errorStack_2_1.done && (_m = errorStack_2.return)) _m.call(errorStack_2);
                }
                finally { if (e_12) throw e_12.error; }
            }
        }
        this.checkState();
    };
    PuzzleGameLoop.prototype.checkState = function () {
        var e_13, _a, e_14, _b, e_15, _c, e_16, _d, e_17, _e, e_18, _f, e_19, _g, e_20, _h;
        var level = this.getComponent(puzzle_game_level_1.PuzzleGameLevel);
        var win = true;
        try {
            for (var _j = __values(level.config.game.winConditions), _k = _j.next(); !_k.done; _k = _j.next()) {
                var item = _k.value;
                if (item.limit === puzzle_game_config_1.EMPuzzleConditionLimit.NO) {
                    try {
                        for (var _l = (e_14 = void 0, __values(item.master)), _m = _l.next(); !_m.done; _m = _l.next()) {
                            var type = _m.value;
                            if (level.layers[type.layer].getObjectByType(type)) {
                                win = false;
                                break;
                            }
                        }
                    }
                    catch (e_14_1) { e_14 = { error: e_14_1 }; }
                    finally {
                        try {
                            if (_m && !_m.done && (_b = _l.return)) _b.call(_l);
                        }
                        finally { if (e_14) throw e_14.error; }
                    }
                }
                else if (item.limit === puzzle_game_config_1.EMPuzzleConditionLimit.ALL) {
                    try {
                        for (var _o = (e_15 = void 0, __values(item.master)), _p = _o.next(); !_p.done; _p = _o.next()) {
                            var type = _p.value;
                            var masters = level.layers[type.layer].getObjectsByType(type);
                            try {
                                for (var masters_1 = (e_16 = void 0, __values(masters)), masters_1_1 = masters_1.next(); !masters_1_1.done; masters_1_1 = masters_1.next()) {
                                    var master = masters_1_1.value;
                                    var has_1 = false;
                                    try {
                                        for (var _q = (e_17 = void 0, __values(level.layers)), _r = _q.next(); !_r.done; _r = _q.next()) {
                                            var layer = _r.value;
                                            if (layer.objects[master.y][master.x] && item.other.indexOf(layer.objects[master.y][master.x].config) != -1) {
                                                has_1 = true;
                                                break;
                                            }
                                        }
                                    }
                                    catch (e_17_1) { e_17 = { error: e_17_1 }; }
                                    finally {
                                        try {
                                            if (_r && !_r.done && (_e = _q.return)) _e.call(_q);
                                        }
                                        finally { if (e_17) throw e_17.error; }
                                    }
                                    if (!has_1) {
                                        win = false;
                                        break;
                                    }
                                }
                            }
                            catch (e_16_1) { e_16 = { error: e_16_1 }; }
                            finally {
                                try {
                                    if (masters_1_1 && !masters_1_1.done && (_d = masters_1.return)) _d.call(masters_1);
                                }
                                finally { if (e_16) throw e_16.error; }
                            }
                            if (!win)
                                break;
                        }
                    }
                    catch (e_15_1) { e_15 = { error: e_15_1 }; }
                    finally {
                        try {
                            if (_p && !_p.done && (_c = _o.return)) _c.call(_o);
                        }
                        finally { if (e_15) throw e_15.error; }
                    }
                }
                else if (item.limit === puzzle_game_config_1.EMPuzzleConditionLimit.SOME) {
                    var has_2 = false;
                    try {
                        for (var _s = (e_18 = void 0, __values(item.master)), _t = _s.next(); !_t.done; _t = _s.next()) {
                            var type = _t.value;
                            var masters = level.layers[type.layer].getObjectsByType(type);
                            try {
                                for (var masters_2 = (e_19 = void 0, __values(masters)), masters_2_1 = masters_2.next(); !masters_2_1.done; masters_2_1 = masters_2.next()) {
                                    var master = masters_2_1.value;
                                    try {
                                        for (var _u = (e_20 = void 0, __values(level.layers)), _v = _u.next(); !_v.done; _v = _u.next()) {
                                            var layer = _v.value;
                                            if (layer.objects[master.y][master.x] && item.other.indexOf(layer.objects[master.y][master.x].config) != -1) {
                                                has_2 = true;
                                                break;
                                            }
                                        }
                                    }
                                    catch (e_20_1) { e_20 = { error: e_20_1 }; }
                                    finally {
                                        try {
                                            if (_v && !_v.done && (_h = _u.return)) _h.call(_u);
                                        }
                                        finally { if (e_20) throw e_20.error; }
                                    }
                                    if (has_2)
                                        break;
                                }
                            }
                            catch (e_19_1) { e_19 = { error: e_19_1 }; }
                            finally {
                                try {
                                    if (masters_2_1 && !masters_2_1.done && (_g = masters_2.return)) _g.call(masters_2);
                                }
                                finally { if (e_19) throw e_19.error; }
                            }
                        }
                    }
                    catch (e_18_1) { e_18 = { error: e_18_1 }; }
                    finally {
                        try {
                            if (_t && !_t.done && (_f = _s.return)) _f.call(_s);
                        }
                        finally { if (e_18) throw e_18.error; }
                    }
                    if (!has_2)
                        win = false;
                }
                if (!win)
                    break;
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_k && !_k.done && (_a = _j.return)) _a.call(_j);
            }
            finally { if (e_13) throw e_13.error; }
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
        if (this.isInLayer && this.layer.objects[this.y][this.x] === this) {
            this.layer.objects[this.y][this.x] = null;
        }
        this._x = x;
        this._y = y;
        if (this.isInLayer) {
            if (!this.layer.objects[y])
                this.layer.objects[y] = [];
            this.layer.objects[y][x] = this;
        }
        this.transform.x = x * this.config.game.blockWidth;
        this.transform.y = y * this.config.game.blockHeight;
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
        this.addClick(upBtn, function () {
            _this.game.getComponent(puzzle_game_loop_1.PuzzleGameLoop).run(puzzle_game_config_1.EMPuzzleMove.UP);
        });
        this.addClick(downBtn, function () {
            _this.game.getComponent(puzzle_game_loop_1.PuzzleGameLoop).run(puzzle_game_config_1.EMPuzzleMove.DOWN);
        });
        this.addClick(leftBtn, function () {
            _this.game.getComponent(puzzle_game_loop_1.PuzzleGameLoop).run(puzzle_game_config_1.EMPuzzleMove.LEFT);
        });
        this.addClick(rightBtn, function () {
            _this.game.getComponent(puzzle_game_loop_1.PuzzleGameLoop).run(puzzle_game_config_1.EMPuzzleMove.RIGHT);
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
        txt = txt.toLocaleLowerCase();
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
                for (var name_2 in this.objects)
                    this.objects[name_2].game = this;
            }
        }
        for (var name_3 in this.objects) {
            if (this.blockWidth < this.objects[name_3].width)
                this.blockWidth = this.objects[name_3].width;
            if (this.blockHeight < this.objects[name_3].height)
                this.blockHeight = this.objects[name_3].height;
        }
    }
    PuzzleGameConfig.prototype.parseFace = function (lines, index) {
        var e_1, _a;
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
                        for (var _b = (e_1 = void 0, __values(this.legends[c])), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
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
            this.face = level;
        }
        return lines.length;
    };
    PuzzleGameConfig.prototype.parseLevels = function (lines, index) {
        var e_2, _a;
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
                        for (var _b = (e_2 = void 0, __values(this.legends[c])), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
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
        console.error(this.levels);
        return lines.length;
    };
    PuzzleGameConfig.prototype.parseWinConditions = function (lines, index) {
        var e_3, _a, e_4, _b, e_5, _c;
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (this.isBlockDevice(line)) {
                console.error(this.winConditions);
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
                        for (var _d = (e_3 = void 0, __values(cond.master)), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var c = _e.value;
                            if (this.ruleObjects.indexOf(c) === -1)
                                this.ruleObjects.push(c);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    try {
                        for (var _f = (e_4 = void 0, __values(cond.other)), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var c = _g.value;
                            if (this.ruleObjects.indexOf(c) === -1)
                                this.ruleObjects.push(c);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                else if (strs.length === 2) {
                    cond.limit = strs[0];
                    if (!this.groups[strs[1]]) {
                        console.error('parse win condition error, no object:', strs[0], " ,line:", line);
                    }
                    cond.master = this.groups[strs[0]];
                    try {
                        for (var _h = (e_5 = void 0, __values(cond.master)), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var c = _j.value;
                            if (this.ruleObjects.indexOf(c) === -1)
                                this.ruleObjects.push(c);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
                this.winConditions.push(cond);
            }
        }
    };
    PuzzleGameConfig.prototype.parseRules = function (lines, index) {
        var e_6, _a, e_7, _b, e_8, _c, e_9, _d, e_10, _e, e_11, _f;
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (this.isBlockDevice(line)) {
                console.error(this.rules);
                return i - 1;
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
                rule.ranks = [];
                rule.toRanks = [];
                rule.toForces = [];
                // line = this.deleteSpace(line);
                var befores = line.split("->")[0];
                var ends = line.split("->")[1];
                var rank = [];
                var toRank = [];
                var force = [];
                rule.ranks.push(rank);
                rule.toRanks.push(toRank);
                rule.toForces.push(force);
                //解析前半部分
                var rules = befores.match(/\[[a-zA-Z0-9><\| \t]+\]/g);
                if (!rules) {
                    console.error("parse error rule:", line);
                }
                try {
                    for (var rules_1 = (e_6 = void 0, __values(rules)), rules_1_1 = rules_1.next(); !rules_1_1.done; rules_1_1 = rules_1.next()) {
                        var str = rules_1_1.value;
                        str = str.slice(1, str.length - 1);
                        var legends = str.split("|");
                        try {
                            for (var legends_1 = (e_7 = void 0, __values(legends)), legends_1_1 = legends_1.next(); !legends_1_1.done; legends_1_1 = legends_1.next()) {
                                var legend = legends_1_1.value;
                                if (legends.indexOf(legend) === 0) {
                                    legend = this.deleteSpaceFrontEnd(this.mergeSpace(legend));
                                    rule.force = legend.split(' ')[0];
                                    legend = legend.split(' ')[1];
                                }
                                else {
                                    legend = this.deleteSpaceFrontEnd(legend);
                                }
                                if (legend === '...') {
                                    rank.push(null);
                                }
                                else {
                                    if (!this.groups[legend]) {
                                        console.error("parse error rule, no object:", legend, '\n', line);
                                    }
                                    try {
                                        for (var _g = (e_8 = void 0, __values(this.groups[legend])), _h = _g.next(); !_h.done; _h = _g.next()) {
                                            var g = _h.value;
                                            if (this.ruleObjects.indexOf(g) === -1)
                                                this.ruleObjects.push(g);
                                        }
                                    }
                                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                                    finally {
                                        try {
                                            if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                                        }
                                        finally { if (e_8) throw e_8.error; }
                                    }
                                    rank.push(this.groups[legend]);
                                }
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (legends_1_1 && !legends_1_1.done && (_b = legends_1.return)) _b.call(legends_1);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (rules_1_1 && !rules_1_1.done && (_a = rules_1.return)) _a.call(rules_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                rules = ends.match(/\[[a-zA-Z0-9><\| \t]+\]/g);
                this.rules.push(rule);
                try {
                    for (var rules_2 = (e_9 = void 0, __values(rules)), rules_2_1 = rules_2.next(); !rules_2_1.done; rules_2_1 = rules_2.next()) {
                        var str = rules_2_1.value;
                        str = str.slice(1, str.length - 1);
                        var legends = str.split("|");
                        try {
                            for (var legends_2 = (e_10 = void 0, __values(legends)), legends_2_1 = legends_2.next(); !legends_2_1.done; legends_2_1 = legends_2.next()) {
                                var legend = legends_2_1.value;
                                legend = this.deleteSpaceFrontEnd(this.mergeSpace(legend));
                                var strs = legend.split(' ');
                                console.error(strs.length, legend);
                                var toForce = null;
                                if (strs.length === 1) {
                                    legend = strs[0];
                                }
                                else if (strs.length === 2) {
                                    toForce = strs[0];
                                    legend = strs[1];
                                }
                                if (legend === '...') {
                                    force.push(toForce);
                                    toRank.push(null);
                                }
                                else {
                                    if (!this.groups[legend]) {
                                        console.error("parse error rule, no object:", legend, '\n', line);
                                    }
                                    force.push(toForce);
                                    try {
                                        for (var _j = (e_11 = void 0, __values(this.groups[legend])), _k = _j.next(); !_k.done; _k = _j.next()) {
                                            var g = _k.value;
                                            if (this.ruleObjects.indexOf(g) === -1)
                                                this.ruleObjects.push(g);
                                        }
                                    }
                                    catch (e_11_1) { e_11 = { error: e_11_1 }; }
                                    finally {
                                        try {
                                            if (_k && !_k.done && (_f = _j.return)) _f.call(_j);
                                        }
                                        finally { if (e_11) throw e_11.error; }
                                    }
                                    toRank.push(this.groups[legend]);
                                }
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (legends_2_1 && !legends_2_1.done && (_e = legends_2.return)) _e.call(legends_2);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (rules_2_1 && !rules_2_1.done && (_d = rules_2.return)) _d.call(rules_2);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
                //解析后半部分
                if (rank.length) {
                    if (rank.length != toRank.length || rank.length != force.length) {
                        console.error("parse error rule, length no equals:", line);
                    }
                }
            }
        }
        this.rules.sort(function (a, b) { return a.ranks.length - b.ranks.length; });
        return lines.length;
    };
    PuzzleGameConfig.prototype.parseCollisionLayers = function (lines, index) {
        var e_12, _a;
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (this.isBlockDevice(line)) {
                return i - 1;
            }
            line = this.deleteSpace(line);
            if (line.length) {
                var names = line.split(",");
                try {
                    for (var names_1 = (e_12 = void 0, __values(names)), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                        var name_4 = names_1_1.value;
                        name_4 = this.deleteSpace(name_4);
                        if (this.objects[name_4]) {
                            this.objects[name_4].layer = this.maxLayer;
                        }
                    }
                }
                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                finally {
                    try {
                        if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
                    }
                    finally { if (e_12) throw e_12.error; }
                }
                this.maxLayer++;
            }
        }
        return lines.length;
    };
    PuzzleGameConfig.prototype.parseLegend = function (lines, index) {
        var e_13, _a, e_14, _b;
        for (var i = index; i < lines.length; i++) {
            var line = lines[i];
            if (this.isBlockDevice(line)) {
                console.error(this.legends);
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
                        for (var names_2 = (e_13 = void 0, __values(names)), names_2_1 = names_2.next(); !names_2_1.done; names_2_1 = names_2.next()) {
                            var n = names_2_1.value;
                            n = this.deleteSpace(n);
                            this.legends[legend].push(this.objects[n]);
                        }
                    }
                    catch (e_13_1) { e_13 = { error: e_13_1 }; }
                    finally {
                        try {
                            if (names_2_1 && !names_2_1.done && (_a = names_2.return)) _a.call(names_2);
                        }
                        finally { if (e_13) throw e_13.error; }
                    }
                }
                else {
                    this.groups[legend] = [];
                    var names = name_5.split("or");
                    try {
                        for (var names_3 = (e_14 = void 0, __values(names)), names_3_1 = names_3.next(); !names_3_1.done; names_3_1 = names_3.next()) {
                            var n = names_3_1.value;
                            this.groups[legend].push(this.objects[n]);
                        }
                    }
                    catch (e_14_1) { e_14 = { error: e_14_1 }; }
                    finally {
                        try {
                            if (names_3_1 && !names_3_1.done && (_b = names_3.return)) _b.call(names_3);
                        }
                        finally { if (e_14) throw e_14.error; }
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
                console.error(this.objects);
                return i - 1;
            }
            var name_6 = line.match(/[a-zA-Z]+/) && line.match(/[a-zA-Z]+/).length ? line.match(/[a-zA-Z]+/)[0] : "";
            if (name_6 && name_6.length) {
                var obj = new PuzzleGameObjectConfig();
                obj.name = name_6;
                obj.colors = {};
                obj.blocks = [];
                obj.width = 0;
                obj.height = 0;
                i++;
                var colorTexts = lines[i++].match(/[a-zA-Z]+/g);
                var colorSum = '';
                for (var c = 0; c < colorTexts.length; c++) {
                    obj.colors[c + ''] = colorDefines[colorTexts[c].toUpperCase()];
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
    EMPuzzleDirection[EMPuzzleDirection["UP"] = 1] = "UP";
    EMPuzzleDirection[EMPuzzleDirection["LEFT"] = 2] = "LEFT";
    EMPuzzleDirection[EMPuzzleDirection["RIGHT"] = 4] = "RIGHT";
    EMPuzzleDirection[EMPuzzleDirection["DOWN"] = 8] = "DOWN";
    EMPuzzleDirection[EMPuzzleDirection["H"] = 6] = "H";
    EMPuzzleDirection[EMPuzzleDirection["V"] = 9] = "V";
    EMPuzzleDirection[EMPuzzleDirection["ALL"] = 15] = "ALL";
})(EMPuzzleDirection = exports.EMPuzzleDirection || (exports.EMPuzzleDirection = {}));
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
})(EMPuzzleForce = exports.EMPuzzleForce || (exports.EMPuzzleForce = {}));
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
    var e_15, _a;
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
    catch (e_15_1) { e_15 = { error: e_15_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_15) throw e_15.error; }
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
Object.defineProperty(exports, "__esModule", { value: true });
var module_scene_1 = __webpack_require__(/*! ../../../utils/ui/module-scene */ "../src/utils/ui/module-scene.ts");
var puzzle_scene_1 = __webpack_require__(/*! ../puzzle-scene */ "../src/modules/puzzle/puzzle-scene.ts");
var puzzle_game_1 = __webpack_require__(/*! ../component/puzzle-game */ "../src/modules/puzzle/component/puzzle-game.ts");
var FaceScene = /** @class */ (function (_super) {
    __extends(FaceScene, _super);
    function FaceScene() {
        var _this = _super.call(this) || this;
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
        ];
        var nameList = [
            '推箱子',
            '走迷宫',
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
        // new PuzzleScene('game1-1_txt')
    }
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
var puzzle_level_win_1 = __webpack_require__(/*! ./ui/puzzle-level-win */ "../src/modules/puzzle/ui/puzzle-level-win.ts");
var face_scene_1 = __webpack_require__(/*! ./face/face-scene */ "../src/modules/puzzle/face/face-scene.ts");
var PuzzleScene = /** @class */ (function (_super) {
    __extends(PuzzleScene, _super);
    function PuzzleScene(game) {
        if (game === void 0) { game = 'game1-1_txt'; }
        var _this = _super.call(this) || this;
        var child = ecs.Entity.create();
        child.parent = _this.scene;
        // ecs.Entity.create().addComponent(PuzzleGame, 'game1-1_txt', 2).parent = child;
        ecs.Entity.create().addComponent(puzzle_level_win_1.PuzzleLevelWin, game).parent = child;
        var zBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        zBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(0xffffff + "," + 0xaa0000 + "\n" +
            '0.....0\n' +
            '.0...0.\n' +
            '..0.0..\n' +
            '...0...\n' +
            '..0.0..\n' +
            '.0...0.\n' +
            '0.....0'));
        zBtn.transform.y = 10;
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

/***/ "../src/modules/puzzle/ui/puzzle-level-win.ts":
/*!****************************************************!*\
  !*** ../src/modules/puzzle/ui/puzzle-level-win.ts ***!
  \****************************************************/
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
var puzzle_game_1 = __webpack_require__(/*! ../component/puzzle-game */ "../src/modules/puzzle/component/puzzle-game.ts");
var game_storage_1 = __webpack_require__(/*! ../../../utils/storage/game-storage */ "../src/utils/storage/game-storage.ts");
var puzzle_tip_1 = __webpack_require__(/*! ./puzzle-tip */ "../src/modules/puzzle/ui/puzzle-tip.ts");
orange.autoloadLink("PuzzleScene");
var PuzzleLevelWin = /** @class */ (function (_super) {
    __extends(PuzzleLevelWin, _super);
    function PuzzleLevelWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleLevelWin.prototype.init = function (name) {
        var _this = this;
        if (name === void 0) { name = 'game1-1_txt'; }
        var root = ecs.Entity.create();
        root.parent = this.entity;
        root.transform.y = 40;
        var listScroller = ecs.Entity.create();
        listScroller.parent = root;
        var bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.parent = listScroller;
        bg.texture = leaf.PointTexture.getTexture(0x00ff00);
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight() - 40 - 60;
        bg.transform.alpha = 0;
        var levelList = ecs.Entity.create();
        levelList.parent = listScroller;
        var mask = ecs.Entity.create().addComponent(leaf.Bitmap);
        mask.texture = leaf.PointTexture.getTexture(0);
        mask.parent = this.entity;
        mask.transform.scaleX = leaf.getStageWidth();
        mask.transform.scaleY = 40;
        mask = ecs.Entity.create().addComponent(leaf.Bitmap);
        mask.texture = leaf.PointTexture.getTexture(0);
        mask.parent = this.entity;
        mask.transform.scaleX = leaf.getStageWidth();
        mask.transform.scaleY = 60;
        mask.transform.y = leaf.getStageHeight() - mask.transform.scaleY;
        var listHeight = leaf.getStageHeight() - 60 - 40;
        game_storage_1.GameStorage.getStorage(name + "_maxStage").then(function (v) {
            var maxLevel = v || 0;
            console.error('关卡', name + "_maxStage", v);
            puzzle_game_config_1.PuzzleGameConfig.loadGameConfig(name, function (cfg) {
                var _loop_1 = function (i) {
                    var levelui = ecs.Entity.create();
                    levelui.parent = levelList;
                    levelui.transform.x = [30, 140][i % 2];
                    levelui.transform.y = 130 * (~~(i / 2));
                    var level = ecs.Entity.create().addComponent(puzzle_game_1.PuzzleGame, name, cfg.levels[i].level, false, false, 100, 100);
                    level.parent = levelui;
                    var label = ecs.Entity.create().addComponent(leaf.Label);
                    label.text = "\u7B2C" + (i + 1) + "\u5173";
                    label.parent = levelui;
                    label.fontSize = 20;
                    level.transform.y = 20;
                    if (i > maxLevel) {
                        var levelMask = ecs.Entity.create().addComponent(leaf.Bitmap);
                        levelMask.texture = leaf.PointTexture.getTexture(0);
                        levelMask.transform.alpha = Math.min(0.96, 0.7 + 0.02 * (i - maxLevel));
                        levelMask.transform.scaleX = 100;
                        levelMask.transform.scaleY = 100;
                        levelMask.transform.y = 20;
                        label.transform.alpha = 0.8;
                        levelMask.parent = levelui;
                    }
                    levelui.addComponent(leaf.TouchComponent).onTouchEnd.on(function () {
                        if (startScroll)
                            return;
                        if (i + 1 > maxLevel + 1) {
                            puzzle_tip_1.PuzzleTip.show("完成上一关即可解锁，加油～");
                            return;
                        }
                        _this.entity.destroy();
                        ecs.Entity.create().addComponent(puzzle_game_1.PuzzleGame, name, i + 1).parent = leaf.world.scene;
                    });
                };
                // for (let i = cfg.levels.length; i < 40; i++) {
                //     cfg.levels[i] = cfg.levels[~~(Math.random() * cfg.levels.length)];
                // }
                for (var i = 0; i < cfg.levels.length; i++) {
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
                        if (levelList.transform.y < listHeight - 130 * (~~(cfg.levels.length / 2))) {
                            levelList.transform.y = listHeight - 130 * (~~(cfg.levels.length / 2));
                        }
                        if (levelList.transform.y > 0)
                            levelList.transform.y = 0;
                    }
                });
            });
        });
    };
    return PuzzleLevelWin;
}(ecs.Component));
exports.PuzzleLevelWin = PuzzleLevelWin;


/***/ }),

/***/ "../src/modules/puzzle/ui/puzzle-tip.ts":
/*!**********************************************!*\
  !*** ../src/modules/puzzle/ui/puzzle-tip.ts ***!
  \**********************************************/
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
var PuzzleTip = /** @class */ (function (_super) {
    __extends(PuzzleTip, _super);
    function PuzzleTip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuzzleTip.prototype.init = function (text, color, time) {
        var _this = this;
        if (text === void 0) { text = ''; }
        if (color === void 0) { color = 0xff8888; }
        if (time === void 0) { time = 2000; }
        this.parent = leaf.world.scene;
        var label = ecs.Entity.create().addComponent(leaf.Label);
        label.text = text;
        label.fontSize = 10;
        label.fontColor = color;
        var rect = ecs.Entity.create().addComponent(leaf.Bitmap);
        rect.parent = this.entity;
        rect.transform.alpha = 0.8;
        rect.texture = leaf.PointTexture.getTexture(0);
        rect.transform.scaleX = label.textWidth + 20;
        rect.transform.scaleY = label.textHeight + 10;
        label.parent = this.entity;
        label.transform.x = (leaf.getStageWidth() - label.textWidth) / 2;
        label.transform.y = (leaf.getStageHeight() - label.textHeight) / 2;
        rect.transform.x = label.transform.x - 10;
        rect.transform.y = label.transform.y - 5;
        this.transform.alpha = 0;
        this.transform.y += 30;
        this.addComponent(tween.Tween, this.transform, 300, {
            alpha: 1,
            y: this.transform.y - 30
        }, tween.EaseFunction.QuadEaseOut);
        setTimeout(function () {
            _this.addComponent(tween.Tween, _this.transform, 300, {
                alpha: 0,
                y: _this.transform.y - 30
            }, tween.EaseFunction.QuadEaseIn).onComplete = function () {
                _this.entity.destroy();
            };
        }, time);
    };
    PuzzleTip.show = function (txt, color, time) {
        if (color === void 0) { color = 0xff8888; }
        if (time === void 0) { time = 2000; }
        ecs.Entity.create().addComponent(PuzzleTip, txt);
    };
    return PuzzleTip;
}(ecs.Component));
exports.PuzzleTip = PuzzleTip;


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