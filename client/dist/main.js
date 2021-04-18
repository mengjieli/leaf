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
var test3d_scene_1 = __webpack_require__(/*! ./modules/test3d/test3d-scene */ "../src/modules/test3d/test3d-scene.ts");
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
                        // leaf.world.root.transform.scaleX = leaf.world.root.transform.scaleY = leaf.GLCore.width / 640;
                        leaf.Res.loadResources().then(function () {
                            leaf.Res.getRes("block_png").load().then(function () {
                                new test3d_scene_1.Test3dScene();
                                // new BullScene();
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

/***/ "../src/modules/test3d/test3d-scene.ts":
/*!*********************************************!*\
  !*** ../src/modules/test3d/test3d-scene.ts ***!
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
var Test3dScene = /** @class */ (function (_super) {
    __extends(Test3dScene, _super);
    function Test3dScene() {
        var _this = _super.call(this) || this;
        var x = 0;
        var y = 0;
        // let t1 = this.addTriangle([
        //   x, y, -1,
        //   x + 640, y, -1,
        //   x, y + 640, -1
        // ]);
        // t1.color = 0xff5555;
        // t1.transform.x = 0;
        // t1.transform.y = 0;
        // let cb = ecs.Entity.create().addComponent(leaf.Cube);
        // cb.size = 4;
        // cb.entity.parent = this.scene;
        // cb.transform.setRotate(90, 0, 1, 0);
        // cb.color = 0xffffff;
        // cb.resource = "house_png";
        var platform = ecs.Entity.create().addComponent(leaf.Platform);
        platform.width = 1.5;
        platform.height = 1.5 * 1052 / 678;
        platform.entity.parent = _this.scene;
        platform.resource = "house_png";
        // platform.texture=  leaf.PointTexture.getTexture(0xffffff);//
        var kb = platform.addComponent(leaf.KeyBoard);
        kb.onPressRight.on(function () {
            leaf.Normal3DTask.pointPosition[0] += 0.1;
            console.error(leaf.Normal3DTask.pointPosition);
        });
        kb.onPressLeft.on(function () {
            leaf.Normal3DTask.pointPosition[0] -= 0.1;
            console.error(leaf.Normal3DTask.pointPosition);
        });
        kb.onPressUp.on(function () {
            leaf.Normal3DTask.pointPosition[1] += 0.1;
            console.error(leaf.Normal3DTask.pointPosition);
        });
        kb.onPressDown.on(function () {
            leaf.Normal3DTask.pointPosition[1] -= 0.1;
            console.error(leaf.Normal3DTask.pointPosition);
        });
        kb.onPressZ.on(function () {
            leaf.Normal3DTask.pointPosition[2] += 0.1;
            console.error(leaf.Normal3DTask.pointPosition);
        });
        kb.onPressX.on(function () {
            leaf.Normal3DTask.pointPosition[2] -= 0.1;
            console.error(leaf.Normal3DTask.pointPosition);
        });
        // platform.color = 0xffffff;
        leaf.Normal3DTask.diffuseColor = [0.0, 0.0, 0.0];
        leaf.Normal3DTask.diffuseDirection = [1, 1, -1];
        leaf.Normal3DTask.ambientColor = [0.1, 0.1, 0.1];
        leaf.Normal3DTask.pointColor = [1.5, 1.5, 0.5];
        leaf.Normal3DTask.pointPosition = [0, 0, 0.5];
        leaf.Normal3DTask.spotDirection = [0, -1, -1];
        leaf.Normal3DTask.spotRot = 10 * Math.PI / 180;
        leaf.Normal3DTask.camera.identity();
        leaf.Normal3DTask.camera.translate(0, 0, -4);
        platform.addComponent(SpotRotate);
        // leaf.Normal3DTask.camera.lookAt(6, 6, 14, 0, 0, 0, 0, 1, 0);
        // leaf.Normal3DTask.pointPosition = [0,0,0];
        // // Set the light color (white)
        // gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
        // // Set the light direction (in the world coordinate)
        // gl.uniform3f(u_LightPosition, 2.3, 4.0, 3.5);
        // // Set the ambient light
        // gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2);
        x = 0;
        y = 0;
        return _this;
        // let t2 = this.addTriangle([
        //   x, y, -0.9,
        //   x + 200, y, -1.1,
        //   x, y + 200, -1
        // ]);
        // t2.color = 0x5555ff;
        // console.error(t1.entity.id)
        // console.error("scene 3d");
        // leaf.StateWin.show();
    }
    Test3dScene.prototype.addTriangle = function (pos) {
        var t = ecs.Entity.create().addComponent(leaf.Triangle);
        t.point1.x = pos[0];
        t.point1.y = pos[1];
        t.point1.z = pos[2];
        t.point2.x = pos[3];
        t.point2.y = pos[4];
        t.point2.z = pos[5];
        t.point3.x = pos[6];
        t.point3.y = pos[7];
        t.point3.z = pos[8];
        t.parent = this.scene;
        return t;
    };
    Test3dScene = __decorate([
        orange.autoload("Test3dScene")
    ], Test3dScene);
    return Test3dScene;
}(module_scene_1.ModuleScene));
exports.Test3dScene = Test3dScene;
var SpotRotate = /** @class */ (function (_super) {
    __extends(SpotRotate, _super);
    function SpotRotate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.add = 0.001;
        return _this;
    }
    SpotRotate.prototype.update = function () {
        leaf.Normal3DTask.spotDirection[0] += this.add;
        if (leaf.Normal3DTask.spotDirection[0] > 0.1)
            this.add = -this.add;
        if (leaf.Normal3DTask.spotDirection[0] < -0.1)
            this.add = -this.add;
    };
    return SpotRotate;
}(ecs.Component));
var Rotate = /** @class */ (function (_super) {
    __extends(Rotate, _super);
    function Rotate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rotate.prototype.update = function () {
        this.transform.angleX += 0.1;
        this.transform.angleY += 0.1;
        this.transform.angleZ += 0.1;
    };
    return Rotate;
}(ecs.Component));
window["ca"] = function (a, b) {
    if (a.length != b.length) {
        console.error("length not equals !");
        return false;
    }
    for (var i = 0; i < a.length; i++) {
        if (~~(a[i] * 1000) != ~~(b[i] * 1000)) {
            console.error(i, a[i], b[i]);
            return false;
        }
    }
    return true;
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