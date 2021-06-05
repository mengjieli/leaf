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
var pixi_scene_1 = __webpack_require__(/*! ./modules/pixi/pixi-scene */ "../src/modules/pixi/pixi-scene.ts");
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
                                // new BullScene();
                                // new FaceScene(true);
                                // new PuzzleScene();
                                // new MainScene();
                                // new BubbleScene();
                                // new SquareManScene();
                                new pixi_scene_1.PixiScene();
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

/***/ "../src/modules/pixi/pixi-scene.ts":
/*!*****************************************!*\
  !*** ../src/modules/pixi/pixi-scene.ts ***!
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
var PixiScene = /** @class */ (function (_super) {
    __extends(PixiScene, _super);
    function PixiScene() {
        var _this = _super.call(this) || this;
        var bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        // bg.resource = "airbg_jpg";
        bg.texture = leaf.PointTexture.getTexture(0);
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight();
        bg.parent = _this.scene;
        leaf.StateWin.show();
        for (var i = 0; i < 0; i++) {
            var bm = ecs.Entity.create().addComponent(leaf.Bitmap);
            bm.resource = "snow_png";
            bm.parent = _this.scene;
            bm.transform.scaleX = bm.transform.scaleY = 0.01;
            bm.transform.x = Math.random() * leaf.getStageWidth();
            bm.transform.y = Math.random() * leaf.getStageHeight() - 300;
            // bm.blendMode = leaf.BlendMode.ADD;
        }
        for (var i = 0; i < 2; i++) {
            _this.addParticle(0, 0);
        }
        return _this;
    }
    PixiScene.prototype.addParticle = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var cfg = {
            "alpha": {
                "start": 1,
                "end": 1
            },
            "scale": {
                "start": 0.01,
                "end": 0.01
            },
            "color": {
                "start": "ff00ff",
                "end": "00ff00"
            },
            "speed": {
                "start": 100,
                "end": 100
            },
            "startRotation": {
                "min": 0,
                "max": 90
            },
            "rotationSpeed": {
                "min": 30,
                "max": 30
            },
            "lifetime": {
                "min": 10,
                "max": 10
            },
            "frequency": 0.001,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 10
            },
            max: 30000
        };
        var p = ecs.Entity.create().addComponent(Particle, cfg);
        // let p = ecs.Entity.create().addComponent(leaf.GpuParticle);
        // p.config = cfg;
        p.entity.parent = this.scene;
        p.resource = "snow_png";
        // p.texture = leaf.PointTexture.getTexture(0xffffff);
        // p.transform.scaleX = p.transform.scaleY = 0.1;
        p.transform.x = x;
        p.transform.y = y;
        // p.transform.angle = 30 * Math.PI / 180;
    };
    PixiScene.prototype.close = function () {
        _super.prototype.close.call(this);
    };
    PixiScene = __decorate([
        orange.autoload("PixiScene")
    ], PixiScene);
    return PixiScene;
}(module_scene_1.ModuleScene));
exports.PixiScene = PixiScene;
var Particle = /** @class */ (function (_super) {
    __extends(Particle, _super);
    function Particle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shader = leaf.NormalShaderTask.shader;
        return _this;
    }
    Object.defineProperty(Particle.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Particle.prototype.init = function (config) {
        this._config = config;
        this.lastTime = 0;
        this.nowTime = 0;
        this.count = 0;
        this.configExt = {
            colors: []
        };
        if (config.color) {
            if (config.color.start != null) {
                var start = typeof config.color.start == "string" ? ~~("0x" + config.color.start) : config.color.start;
                var end = typeof config.color.end == "string" ? ~~("0x" + config.color.end) : config.color.end;
                this.configExt.colors = [{
                        startR: (start >> 16), endR: (end >> 16),
                        startG: (start >> 8 & 0xFF), endG: (end >> 8 & 0xFF),
                        startB: (start & 0xFF), endB: (end & 0xFF),
                        startTime: 0, endTime: config.lifetime.max
                    }];
            }
            else {
            }
        }
        else {
            this.configExt.colors = [{ startR: 1, endR: 1, startG: 1, endG: 1, startB: 1, endB: 1, startTime: 0, endTime: config.lifetime.max }];
        }
        this.countLabel = ecs.Entity.create().addComponent(leaf.Label);
        this.countLabel.fontColor = 0x00ff00;
        // this.countLabel.parent = this.entity;
    };
    Object.defineProperty(Particle.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        set: function (val) {
            this._texture = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "resource", {
        get: function () {
            return this._resource;
        },
        set: function (val) {
            var _this = this;
            if (this._resource === val)
                return;
            if (this._res)
                this._res.removeCount();
            this._resource = val;
            var res = this._res = leaf.Res.getRes(val);
            if (!res) {
                this.texture = null;
                return;
            }
            if (res.data) {
                this.texture = res.data;
                res.addCount();
            }
            else {
                res.addCount();
                res.load().then(function () {
                    if (_this._res !== res)
                        return;
                    _this.texture = res.data;
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Particle.prototype.preRender = function () {
        if (!this._texture)
            return;
        (this.shader).addTask(this.texture, this.entity.transform.worldMatrix, this.entity.transform.worldAlpha, this.blendMode, 0xffffff);
    };
    Particle.prototype.preRender2 = function (matrix, alpha, shader) {
        if (!this._texture)
            return;
        matrix.reconcat(this.entity.transform.local);
        var allAlpha = alpha * this.entity.transform.alpha;
        if (this.head) {
            for (var node = this.head; node; node = node.next) {
                if (!node.startMatrix) {
                    node.startMatrix = ecs.Matrix.create();
                    node.startMatrix.setTo(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                }
                matrix = node.startMatrix;
                matrix.save();
                var local = node.matrix;
                local.identity();
                var tw = this.texture.sourceWidth;
                var th = this.texture.sourceHeight;
                matrix.translate(node.x, node.y);
                local.translate(-tw * 0.5, -th * 0.5);
                local.scale(node.scale, node.scale);
                local.rotate(node.rotation);
                matrix.reconcat(local);
                (shader || this.shader).addTask(this.texture, matrix, allAlpha * node.alpha, this.blendMode, node.color);
                matrix.restore();
            }
        }
        // (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint);
    };
    Particle.prototype.update = function (dt) {
        var lastTime = this.lastTime;
        this.nowTime += dt;
        var sendTimeGap = this.config.frequency * 1000;
        var lastN = ~~(lastTime / sendTimeGap);
        var nowN = ~~(this.nowTime / sendTimeGap);
        var cfg = this._config;
        var ext = this.configExt;
        for (var i = lastN; lastN <= nowN && i <= nowN && this.count < cfg.max; i++) {
            var startColor = typeof cfg.color.start == "string" ? ~~("0x" + cfg.color.start) : cfg.color.start;
            var endColor = typeof cfg.color.end == "string" ? ~~("0x" + cfg.color.end) : cfg.color.end;
            var lifeTime = cfg.lifetime.min + (cfg.lifetime.max - cfg.lifetime.min) * Math.random();
            var p = {
                lifeTime: lifeTime,
                time: 0,
                next: null,
                startMatrix: null,
                matrix: ecs.Matrix.create(),
                x: 0,
                y: 0,
                rotation: 0,
                startRotation: cfg.startRotation.min + (cfg.startRotation.max - cfg.startRotation.min) * Math.random() * Math.PI / 180.0,
                rotationSpeed: cfg.rotationSpeed.min,
                speedRotation: 0,
                scale: 1,
                color: 0xffffff,
                colors: [{ r: startColor >> 16, g: startColor >> 8 & 0xFF, b: startColor & 0xFF, time: 0 },
                    { r: endColor >> 16, g: endColor >> 8 & 0xFF, b: endColor & 0xFF, time: lifeTime }],
                alpha: 0
            };
            // p.startRotation = 90 * Math.PI / 180;
            if (!this.head)
                this.head = p;
            if (this.end)
                this.end.next = p;
            this.end = p;
            this.count++;
            this.lastTime = (i + 1) * sendTimeGap;
        }
        for (var node = this.head, last = null; node; node = node.next) {
            var t = node.time = Math.min(node.time + dt * 0.001, node.lifeTime);
            if (node.time >= node.lifeTime) {
                if (node == this.head) {
                    this.head = null;
                }
                if (node == this.end) {
                    this.end = last;
                }
                if (last && last.next == node)
                    last.next = null;
                this.count--;
                continue;
            }
            if (last && !last.next)
                last.next = node;
            last = node;
            if (!this.head)
                this.head = node;
            var life = node.lifeTime;
            var p = t / life;
            var r = node.startRotation;
            var len = cfg.speed.start * t + 0.5 * (cfg.speed.end - cfg.speed.start) * t * t / life;
            var x = len * Math.cos(r) + 0.5 * (cfg.acceleration ? cfg.acceleration.x : 0) * t * t;
            var y = len * Math.sin(r) + 0.5 * (cfg.acceleration ? cfg.acceleration.y : 0) * t * t;
            node.rotation = (cfg.rotationSpeed.min * t + 0.5 * (cfg.rotationSpeed.max - cfg.rotationSpeed.min) * t * t / life) * Math.PI / 180.0;
            node.x = x;
            node.y = y;
            node.scale = cfg.scale.start + (cfg.scale.end - cfg.scale.start) * p;
            var speed = cfg.speed.start + (cfg.speed.end - cfg.speed.start) * p;
            var speedX = speed * Math.cos(r) + (cfg.acceleration ? cfg.acceleration.x : 0) * t;
            var speedY = speed * Math.sin(r) + (cfg.acceleration ? cfg.acceleration.y : 0) * t;
            node.speedRotation = Math.atan2(speedY, speedX);
            node.alpha = cfg.alpha.start + (cfg.alpha.end - cfg.alpha.start) * p;
            for (var i = 0; i < ext.colors.length; i++) {
                var c = ext.colors[i];
                if (t >= c.startTime && t <= c.endTime) {
                    node.color = (c.startR + (c.endR - c.startR) * (t - c.startTime) / (c.endTime - c.startTime)) << 16
                        | (c.startG + (c.endG - c.startG) * (t - c.startTime) / (c.endTime - c.startTime)) << 8
                        | (c.startB + (c.endB - c.startB) * (t - c.startTime) / (c.endTime - c.startTime));
                }
            }
        }
        this.countLabel.text = this.count + "";
    };
    Particle.prototype.onDestroy = function () {
        this._config = null;
        if (this.head) {
            for (var node = this.head; node; node = node.next) {
                node.matrix && ecs.Matrix.release(node.matrix);
                node.matrix = null;
            }
        }
        this.head = null;
        this.end = null;
    };
    return Particle;
}(leaf.Render));
exports.Particle = Particle;
var spawnTypes = {
    "rect": 0,
    "ring": 1,
    "circle": 2
};
var cc = window.requestAnimationFrame;
window.requestAnimationFrame = function () {
    return cc.apply(null, arguments);
};


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