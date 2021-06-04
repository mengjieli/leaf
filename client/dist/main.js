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
        var _this_1 = _super.call(this) || this;
        leaf.StateWin.show();
        for (var i = 0; i < 1; i++) {
            _this_1.addParticle();
        }
        return _this_1;
    }
    PixiScene.prototype.addParticle = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var p = ecs.Entity.create().addComponent(Particle);
        p.entity.parent = this.scene;
        p.resource = "snow_png";
        // p.texture = leaf.PointTexture.getTexture(0xffffff);
        p.config = {
            lifeTime: 5,
            frequency: 5,
            allTime: 100,
            alpha: [0.73, 0.46],
            scale: [1, 1],
            speed: {
                start: 200,
                end: 200
            },
            startRotation: {
                min: 80,
                max: 100
            },
            rotationSpeed: {
                min: 0,
                max: 200
            },
            spawnType: EMSpawnType.RECT,
            spawnRect: {
                x: 0,
                y: 0,
                w: 640,
                h: -20
            }
        };
        // p.transform.scaleX = p.transform.scaleY = 0.1;
        p.transform.x = x;
        p.transform.y = y;
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
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.shader = ParticleShaderTask.shader;
        _this_1._tint = 0xffffff;
        _this_1.time = 0;
        return _this_1;
    }
    Object.defineProperty(Particle.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (val) {
            this._config = val;
            if (this.buffer) {
                leaf.GLCore.gl.deleteBuffer(this.buffer);
            }
            this.buffer = null;
            if (val) {
                this.bufferDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
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
            var _this_1 = this;
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
                    if (_this_1._res !== res)
                        return;
                    _this_1.texture = res.data;
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "tint", {
        get: function () {
            return this._tint;
        },
        set: function (val) {
            this._tint = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "width", {
        get: function () {
            return this._texture ? this._texture.sourceWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "height", {
        get: function () {
            return this._texture ? this._texture.sourceHeight : 0;
        },
        enumerable: true,
        configurable: true
    });
    Particle.prototype.refreshBuffer = function () {
        this.bufferDirty = false;
        this.buffer = leaf.GLCore.gl.createBuffer();
        var count = Math.ceil((1 / this.config.frequency) * this.config.lifeTime);
        var positionData = [];
        for (var i = 0; i < count; i++) {
            var index = i * 8;
            var r = Math.random();
            positionData[0 + index] = index + 0;
            positionData[1 + index] = r;
            positionData[2 + index] = index + 1;
            positionData[3 + index] = r;
            positionData[4 + index] = index + 2;
            positionData[5 + index] = r;
            positionData[6 + index] = index + 3;
            positionData[7 + index] = r;
        }
        var bufferData = new Float32Array(positionData);
        var gl = leaf.GLCore.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        //切换混合模式
        // BlendModeFunc.changeBlendMode(this.blendMode[i]);
        gl.vertexAttribPointer(this.shader.a_Index, 1, gl.FLOAT, false, exports.$size * 2, 0);
        gl.vertexAttribPointer(this.shader.a_Seed, 1, gl.FLOAT, false, exports.$size * 2, exports.$size * 1);
        gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
    };
    Particle.prototype.preRender = function () {
        if (this._texture && this.bufferDirty) {
            this.refreshBuffer();
        }
        if (!this._texture || !this.config)
            return;
        var count = Math.ceil((1 / this.config.frequency) * this.config.lifeTime);
        (this.shader).addTask(this.time * 0.001, this.buffer, count, this.texture, this.config, this.entity.transform.worldMatrix, this.blendMode, this._tint);
    };
    Particle.prototype.preRender2 = function (matrix, alpha, shader) {
        if (this._texture && this.bufferDirty) {
            this.refreshBuffer();
        }
        if (!this._texture || !this.config)
            return;
        matrix.reconcat(this.entity.transform.local);
        var count = Math.ceil((1 / this.config.frequency) * this.config.lifeTime);
        (shader || this.shader).addTask(this.time * 0.001, this.buffer, count, this.texture, this.config, this.entity.transform.worldMatrix, this.blendMode, this._tint);
    };
    Particle.prototype.update = function (dt) {
        this.time += dt;
    };
    Particle.prototype.onDestroy = function () {
        this.texture = null;
        if (this._res)
            this._res.removeCount();
        this._resource = this._res = null;
        this._tint = 0xffffff;
        this.config = null;
        this.time = 0;
        _super.prototype.onDestroy.call(this);
    };
    return Particle;
}(leaf.Render));
exports.Particle = Particle;
var EMSpawnType;
(function (EMSpawnType) {
    EMSpawnType[EMSpawnType["RECT"] = 0] = "RECT";
})(EMSpawnType = exports.EMSpawnType || (exports.EMSpawnType = {}));
exports.$size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;
var ParticleShaderTask = /** @class */ (function (_super) {
    __extends(ParticleShaderTask, _super);
    function ParticleShaderTask() {
        var _this_1 = _super.call(this) || this;
        _this_1.projectionMatrix = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -1, 1, 0, 1
        ]);
        _this_1.attributes = [];
        _this_1.textures = [];
        _this_1.sizes = [];
        _this_1.ranges = [];
        _this_1.matrixs = [];
        _this_1.time = [];
        _this_1.configs = [];
        _this_1.count = [];
        _this_1.blendMode = [];
        _this_1.indiceData = [];
        _this_1.renderCounts = [];
        _this_1.lastRenderCount = 0;
        _this_1.renderIndex = 0;
        //初始化作色器、program
        _this_1.initProgram();
        //初始化作色器固定变量 和 获取作色器中得变量
        _this_1.initAttriLocation();
        return _this_1;
    }
    /**
     * 初始化作色器、program
     * 1. 初始化 shader
     * 2. 初始化 program
     * 目前没有加 filter (滤镜) 的功能，后续可以继续扩展这两个 shader
     * @param gl
     */
    ParticleShaderTask.prototype.initProgram = function () {
        var gl = leaf.GLCore.gl;
        var vertexSource = "\n            attribute float a_Index;\n            attribute float a_Seed;\n\n             uniform vec2 u_TexSize;\n             uniform vec4 u_TexRange;\n             uniform mat4 u_PMatrix;\n             uniform mat3 u_VMatrix;\n             uniform float u_LifeTime;\n             uniform float u_Frequency;\n             uniform float u_AllTime;\n             uniform float u_Time;\n             uniform vec2 u_Alpha;\n             uniform vec2 u_Scale;\n             uniform vec2 u_Speed;\n             uniform vec2 u_StartRotation;\n             uniform vec2 u_RotationSpeed;\n             uniform int u_SpawnType;\n             uniform vec4 u_SpawnRect;\n\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n\n             void main(void)\n             {\n                float type = mod(a_Index, 4.0);\n                float ind = (a_Index - type) / 4.0;\n                float t = u_Time + ind * u_Frequency;\n                float pi = 3.1415926535;\n                t = mod(t, u_LifeTime);\n                float scale = u_Scale.x + (u_Scale.y - u_Scale.x) *  t / u_LifeTime;\n                float speed = u_Speed.x;\n                float seed0 =  mod(a_Seed * (ind + t / u_LifeTime), 1.0);\n                float r = (u_StartRotation.x + (u_StartRotation.y - u_StartRotation.x) * mod(a_Seed * ind, 1.0) ) * pi / 180.0;\n                float x = t * speed * cos(r);\n                float y = t * speed * sin(r);\n                float offx = 0.0;\n                float offy = 0.0;\n                if(u_SpawnType == 0) {\n                    offx = u_SpawnRect.x + u_SpawnRect.z * a_Seed;\n                    offy = u_SpawnRect.y + u_SpawnRect.w * a_Seed;\n                }\n                vec2 a_Pisition = vec2(0.0,0.0);\n                vec2 a_TexCoord = vec2(0.0,0.0);\n                if(type < 1.0) {\n                    a_Pisition.x = 0.0;\n                    a_Pisition.y = 1.0;\n                    a_TexCoord.x = u_TexRange.x;\n                    a_TexCoord.y = u_TexRange.w;\n                } else if(type < 2.0) {\n                    a_Pisition.x = 0.0;\n                    a_Pisition.y = 0.0;\n                    a_TexCoord.x = u_TexRange.x;\n                    a_TexCoord.y = u_TexRange.y;\n                } else if(type < 3.0) {\n                    a_Pisition.x = 1.0;\n                    a_Pisition.y = 1.0;\n                    a_TexCoord.x = u_TexRange.z;\n                    a_TexCoord.y = u_TexRange.w;\n                } else {\n                    a_Pisition.x = 1.0;\n                    a_Pisition.y = 0.0;\n                    a_TexCoord.x = u_TexRange.z;\n                    a_TexCoord.y = u_TexRange.y;\n                } \n                float rot = 30.0 * pi / 180.0;\n                float sx = a_Pisition.x * u_TexSize.x;\n                float sy = a_Pisition.y * u_TexSize.y;\n                float len = sqrt(a_Pisition.x * a_Pisition.x + a_Pisition.y * a_Pisition.y);\n                vec3 pos = u_VMatrix * vec3(a_Pisition.x * u_TexSize.x * scale + x + offx,a_Pisition.y * u_TexSize.y * scale + y + offy, 1.0);\n                gl_Position = u_PMatrix*vec4(pos,1.0);\n                v_TexCoord = a_TexCoord;\n                v_Alpha = u_Alpha.x + (u_Alpha.y - u_Alpha.x) *  t / u_LifeTime;\n             }\n\n             ";
        var fragmentSource = "\n             precision mediump float;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n\n             uniform sampler2D u_Sampler;\n\n             vec4 getTextureColor(vec2 coord);\n\n             void main(void)\n             {\n                gl_FragColor = getTextureColor(v_TexCoord) * v_Alpha;\n             }\n\n             vec4 getTextureColor(vec2 coord) {\n                return texture2D(u_Sampler,v_TexCoord);\n             }\n             ";
        var vertexShader = this.createShader(gl.VERTEX_SHADER, vertexSource);
        var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentSource);
        this.program = this.createWebGLProgram(vertexShader, fragmentShader);
    };
    /**
     * 初始化作色器固定变量 和 获取作色器中得变量
     * 主要初始化投影矩阵，投影矩阵不用每次调用都初始化，只要设置一次即可，除非舞台 (Stage) 的大小改变 (glViewPort)
     * 获取一些变量。
     * @param gl
     * @param width
     * @param height
     */
    ParticleShaderTask.prototype.initAttriLocation = function () {
        var gl = leaf.GLCore.gl;
        var projectionMatrix = this.projectionMatrix;
        projectionMatrix[0] = 2 / leaf.GLCore.width;
        projectionMatrix[5] = -2 / leaf.GLCore.height;
        var program = this.program;
        program["name"] = "normal program";
        gl.useProgram(this.program);
        if (!this.buffer) {
            this.buffer = gl.createBuffer();
            this.indexBuffer = gl.createBuffer();
            var indiceData = this.indiceData;
            var count = 30000;
            for (var i = 0; i < count; i++) {
                var index2 = i * 6;
                var index2_2 = i * 4;
                indiceData[0 + index2] = 0 + index2_2;
                indiceData[1 + index2] = 1 + index2_2;
                indiceData[2 + index2] = 2 + index2_2;
                indiceData[3 + index2] = 2 + index2_2;
                indiceData[4 + index2] = 1 + index2_2;
                indiceData[5 + index2] = 3 + index2_2;
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indiceData), gl.STATIC_DRAW);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        this.a_Index = gl.getAttribLocation(program, "a_Index");
        gl.enableVertexAttribArray(this.a_Index);
        this.a_Seed = gl.getAttribLocation(program, "a_Seed");
        gl.enableVertexAttribArray(this.a_Seed);
        // this.a_Pisition = gl.getAttribLocation(program, "a_Pisition");
        // gl.enableVertexAttribArray(this.a_Pisition);
        // this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
        // gl.enableVertexAttribArray(this.a_TexCoord);
        this.u_Sampler = gl.getUniformLocation(program, "u_Sampler");
        this.u_TexRange = gl.getUniformLocation(program, "u_TexRange");
        this.u_TexSize = gl.getUniformLocation(program, "u_TexSize");
        this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
        this.u_VMatrix = gl.getUniformLocation(program, "u_VMatrix");
        this.u_LifeTime = gl.getUniformLocation(program, "u_LifeTime");
        this.u_Frequency = gl.getUniformLocation(program, "u_Frequency");
        this.u_AllTime = gl.getUniformLocation(program, "u_AllTime");
        this.u_Alpha = gl.getUniformLocation(program, "u_Alpha");
        this.u_Scale = gl.getUniformLocation(program, "u_Scale");
        this.u_Speed = gl.getUniformLocation(program, "u_Speed");
        this.u_StartRotation = gl.getUniformLocation(program, "u_StartRotation");
        this.u_RotationSpeed = gl.getUniformLocation(program, "u_RotationSpeed");
        this.u_SpawnType = gl.getUniformLocation(program, "u_SpawnType");
        this.u_SpawnRect = gl.getUniformLocation(program, "u_SpawnRect");
        this.u_Time = gl.getUniformLocation(program, "u_Time");
    };
    ParticleShaderTask.prototype.addTask = function (time, attributes, count, texture, config, matrix, blendMode, tint) {
        this.time.push(time);
        this.attributes.push(attributes);
        this.textures.push(texture.texture);
        this.configs.push(config);
        this.sizes.push({ width: texture.sourceWidth, height: texture.sourceHeight });
        this.ranges.push([texture.startX, texture.startY, texture.endX, texture.endY]);
        this.matrixs.push(matrix);
        this.count.push(0);
        this.blendMode.push(blendMode);
        this.count[this.count.length - 1] += count;
    };
    ParticleShaderTask.prototype.startNewTask = function () {
        if (this.lastRenderCount != this.textures.length) {
            this.renderCounts.push(this.textures.length);
            this.lastRenderCount = this.textures.length;
        }
    };
    /**
     * 渲染
     */
    ParticleShaderTask.prototype.render = function () {
        var _this = this;
        var gl = leaf.GLCore.gl;
        var max = this.renderCounts.shift();
        gl.useProgram(_this.program);
        gl.uniformMatrix4fv(this.u_PMatrix, false, this.projectionMatrix);
        var i = this.renderIndex;
        //开始渲染任务
        for (var len = _this.textures.length; i < len && i < max; i++) {
            gl.uniform2f(this.u_TexSize, _this.sizes[i].width, _this.sizes[i].height);
            gl.uniform4f(this.u_TexRange, _this.ranges[i][0], _this.ranges[i][1], _this.ranges[i][2], _this.ranges[i][3]);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attributes[i]);
            gl.vertexAttribPointer(this.a_Index, 1, gl.FLOAT, false, exports.$size * 2, exports.$size * 0);
            gl.vertexAttribPointer(this.a_Seed, 1, gl.FLOAT, false, exports.$size * 2, exports.$size * 1);
            // gl.vertexAttribPointer(this.a_Pisition, 2, gl.FLOAT, false, $size * 5, $size);
            // gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, $size * 5, $size * 3);
            //切换混合模式
            // BlendModeFunc.changeBlendMode(this.blendMode[i]);
            // gl.vertexAttribPointer(_this.a_Index, 1, gl.FLOAT, false, $size * 3, 0);
            // gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, $size * 3, $size);
            // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);
            var cfg = this.configs[i];
            gl.uniform1f(this.u_LifeTime, cfg.lifeTime);
            gl.uniform1f(this.u_Frequency, cfg.frequency);
            gl.uniform1f(this.u_AllTime, cfg.allTime);
            gl.uniform1f(this.u_Time, this.time[i]);
            gl.uniform2f(this.u_Alpha, cfg.alpha[0], cfg.alpha[1]);
            gl.uniform2f(this.u_Scale, cfg.scale[0], cfg.scale[1]);
            gl.uniform2f(this.u_Speed, cfg.speed.start, cfg.speed.end);
            gl.uniform2f(this.u_StartRotation, cfg.startRotation.min, cfg.startRotation.max);
            gl.uniform2f(this.u_RotationSpeed, cfg.rotationSpeed.min, cfg.rotationSpeed.max);
            gl.uniform1i(this.u_SpawnType, cfg.spawnType);
            gl.uniform4f(this.u_SpawnRect, cfg.spawnRect.x, cfg.spawnRect.y, cfg.spawnRect.w, cfg.spawnRect.h);
            var m = this.matrixs[i];
            gl.uniformMatrix3fv(this.u_VMatrix, false, [
                m.a, m.b, 0,
                m.c, m.d, 0,
                m.tx, m.ty, 1
            ]);
            gl.uniform1i(this.u_Sampler, 0);
            gl.activeTexture(gl["TEXTURE0"]);
            gl.bindTexture(gl.TEXTURE_2D, _this.textures[i]);
            //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
            //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
            gl.drawElements(gl.TRIANGLES, _this.count[i] * 6, gl.UNSIGNED_SHORT, 0); //利用drawElements画三角形
            leaf.runInfo.drawCount += _this.count[i];
            leaf.runInfo.drawCall++;
        }
        _this.renderIndex = i;
        if (_this.renderIndex === _this.textures.length) {
            _this.reset();
        }
    };
    ParticleShaderTask.prototype.reset = function () {
        this.attributes = [];
        this.textures = [];
        this.sizes = [];
        this.ranges = [];
        this.matrixs = [];
        this.count = [];
        this.blendMode = [];
        this.configs = [];
        this.time = [];
        this.renderCounts.length = 0;
        this.lastRenderCount = 0;
        this.renderIndex = 0;
    };
    Object.defineProperty(ParticleShaderTask, "shader", {
        get: function () {
            if (!this._shader) {
                this._shader = new ParticleShaderTask();
            }
            return this._shader;
        },
        enumerable: true,
        configurable: true
    });
    return ParticleShaderTask;
}(leaf.Shader));
exports.ParticleShaderTask = ParticleShaderTask;


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