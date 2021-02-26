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

/***/ "../src/ImageLoader.ts":
/*!*****************************!*\
  !*** ../src/ImageLoader.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ImageLoader = /** @class */ (function () {
    /**
     * Image 对象或 Image 对象数组作为参数返回给回调函数。
     * @param url
     * @param back
     * @param thisObj
     */
    function ImageLoader(url, back, thisObj) {
        var image;
        if (typeof url === "string") {
            image = new Image();
            image.src = url;
            image.onload = function () {
                back.apply(thisObj, [image]);
            };
        }
        else {
            var urls = url;
            var len = urls.length;
            var images = [];
            var count = 0;
            var load = function (image) {
                return function () {
                    for (var i = 0; i < len; i++) {
                        if (images[i] == image) {
                            count++;
                            break;
                        }
                    }
                    if (count == len) {
                        back.apply(thisObj, [images]);
                    }
                };
            };
            for (var i = 0; i < len; i++) {
                image = new Image();
                image.src = urls[i];
                image.onload = load(image);
                images.push(image);
            }
        }
    }
    return ImageLoader;
}());
exports.ImageLoader = ImageLoader;


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
Object.defineProperty(exports, "__esModule", { value: true });
var ImageLoader_1 = __webpack_require__(/*! ./ImageLoader */ "../src/ImageLoader.ts");
var Main = /** @class */ (function () {
    function Main() {
        leaf.GLCore.init();
        var gl = leaf.GLCore.gl;
        gl.viewport(0, 0, leaf.GLCore.width, leaf.GLCore.height);
        gl.enable(gl.BLEND);
        gl.enable(gl.STENCIL_TEST);
        gl.blendColor(1.0, 1.0, 1.0, 1.0);
        //gl.enable(gl.CULL_FACE);
        gl.activeTexture(gl.TEXTURE0);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        var ts = ["resources/64x64_1.png", "resources/64x64_2.png", "resources/128x128_1.png", "resources/128x128_2.png", "resources/256x256_1.png", "resources/256x256_2.png", "resources/flower.png"];
        new ImageLoader_1.ImageLoader(ts, this.loadImageComplete, this);
    }
    Main.prototype.loadImageComplete = function (images) {
        // var t1 = new leaf.Texture(leaf.GLCore.createTexture(images[0]), images[0].width, images[0].height);
        // var t2 = new leaf.Texture(leaf.GLCore.createTexture(images[1]), images[1].width, images[1].height);
        // var t3 = new leaf.Texture(leaf.GLCore.createTexture(images[2]), images[2].width, images[2].height);
        // var t4 = new leaf.Texture(leaf.GLCore.createTexture(images[3]), images[3].width, images[3].height);
        // var t5 = new leaf.Texture(leaf.GLCore.createTexture(images[4]), images[4].width, images[4].height);
        // var t6 = new leaf.Texture(leaf.GLCore.createTexture(images[5]), images[5].width, images[5].height);
        // var t7 = new leaf.Texture(leaf.GLCore.createTexture(images[6]), images[6].width, images[6].height);
        var ts = [];
        // var ts = [t1, t2, t3, t4, t5, t6, t7];
        for (var i = 0; i < images.length; i++) {
            ts[i] = new leaf.Texture(leaf.GLCore.createTexture(images[i]), images[i].width, images[i].height);
        }
        var world = leaf.init();
        var scene = new ecs.Scene();
        world.scene = scene;
        for (var i = 0; i < 1; i++) {
            var t_1 = ts[~~(Math.random() * ts.length)];
            ;
            var entity_1 = ecs.Entity.create();
            entity_1.parent = scene;
            entity_1.addComponent(leaf.Bitmap).texture = t_1;
            entity_1 = ecs.Entity.create();
            entity_1.parent = scene;
            entity_1.addComponent(leaf.Bitmap).texture = t_1;
            entity_1 = ecs.Entity.create();
            entity_1.parent = scene;
            entity_1.addComponent(leaf.Bitmap).texture = t_1;
        }
        // scene.addComponent(Move);
        var t = ts[~~(Math.random() * ts.length)];
        ;
        var entity = ecs.Entity.create();
        // entity.parent = scene;
        // entity.addComponent(leaf.Bitmap).texture = ts[2];
        // entity = ecs.Entity.create();
        entity.parent = scene;
        var lb = entity.addComponent(leaf.Label);
        // lb.text = "你在想啥？!~";
        window["lb"] = lb;
        lb.fontColor = 0xff0000;
        entity.transform.tx = 0;
        entity.transform.ty = 0;
        leaf.GLCore.scale = leaf.GLCore.width / 640;
        scene.transform.scale(leaf.GLCore.width / 640, leaf.GLCore.width / 640);
        window["st"] = function () {
            // for (let k in leaf.TextAtlas["atlases"]) {
            //     let ta: leaf.TextAtlas = leaf.TextAtlas["atlases"][k];
            //     for (let c in ta['chars']) {
            //     }
            // }
            var tt = leaf.TextAtlas["atlases"]["sans-serif1700"].chars["d"];
            var entity = ecs.Entity.create();
            entity.parent = scene;
            entity.addComponent(leaf.Bitmap).texture = tt.texture;
        };
        scene.transform.rotate(-0.5);
        setInterval(function () {
            lb.text = "fps:" + leaf.runInfo.fps + "\nt:" + leaf.runInfo.fpsTime + "\ndc:" + leaf.runInfo.fpsDrawCall + "\nnum:" + leaf.runInfo.fpsDrawCount;
        }, 1000);
        // scene.addComponent(leaf.Bitmap).texture = t1;
        // setInterval(() => {
        //     scene.transform.identity();
        //     scene.transform.translate(300 * Math.random(), 300 * Math.random());
        // })
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
            child.transform.tx = 300 * Math.random();
            child.transform.ty = 300 * Math.random();
        }
    };
    return Move;
}(ecs.Component));
window["Main"] = Main;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map