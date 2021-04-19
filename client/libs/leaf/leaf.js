var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
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
var leaf;
(function (leaf) {
    leaf.debug = false;
    leaf.runInfo = {
        frame: 0,
        runTime: 0,
        drawCall: 0,
        drawCount: 0,
        logicTime: 0,
        renderTime: 0,
        preRenderTime: 0,
        glRenderTime: 0,
        fps: 0,
        frameTime: 0,
        frameLogicTime: 0,
        frameRenderTime: 0,
        framePreRenderTime: 0,
        frameGlRenderTime: 0,
        frameDrawCall: 0,
        frameDrawCount: 0,
    };
    var runFlag = true;
    /**
     * 暂停
     */
    function pause() {
        runFlag = false;
    }
    leaf.pause = pause;
    /**
     * 继续播放
     */
    function play() {
        runFlag = true;
    }
    leaf.play = play;
    function getStageWidth() {
        return leaf.GLCore.width / leaf.GLCore.scale;
    }
    leaf.getStageWidth = getStageWidth;
    function getStageHeight() {
        return leaf.GLCore.height / leaf.GLCore.scale;
    }
    leaf.getStageHeight = getStageHeight;
    var onTick;
    leaf.fixWidth = 640;
    /**
     * 初始化
     * @returns
     */
    function init() {
        if (leaf.world)
            return;
        leaf.GLCore.init();
        leaf.world = leaf.world || new ecs.World();
        leaf.loaderEntity = ecs.Entity.create();
        leaf.loaderEntity.parent = leaf.world.root;
        var rs;
        leaf.world.addSystem(leaf.RecordSystem, [leaf.RecordComponent]);
        rs = leaf.world.getSystem(leaf.RecordSystem);
        var rm = new leaf.RenerManager();
        var renderType = 2;
        if (renderType === 1) {
            leaf.world.addSystem(leaf.RenderSystem, [leaf.Render]);
        }
        var t = 0;
        var lastTime = Date.now();
        var lastFrame = 0;
        var lastDraCall = 0;
        var lastDrawCount = 0;
        var lastLogicTime = 0;
        var lastRenderTime = 0;
        var lastPreRenderTime = 0;
        var lastGlRenderTime = 0;
        onTick = function () {
            if (rs.checkReplayReady() === false) {
                requestAnimationFrame.call(window, onTick);
                return;
            }
            if (!runFlag) {
                requestAnimationFrame.call(window, onTick);
                return;
            }
            var now = Date.now();
            var rt = leaf.runInfo.renderTime;
            leaf.world.update();
            if (renderType === 2) {
                rm.update();
            }
            requestAnimationFrame.call(window, onTick);
            var end = Date.now();
            leaf.runInfo.logicTime += end - now - (leaf.runInfo.renderTime - rt);
            t += end - now;
            leaf.runInfo.frame++;
            leaf.runInfo.runTime += end - now;
            if (end - lastTime >= 1000) {
                leaf.runInfo.fps = (~~(10 * (leaf.runInfo.frame - lastFrame) * 1000 / (end - lastTime))) / 10;
                leaf.runInfo.frameTime = (~~(10 * t / (leaf.runInfo.frame - lastFrame))) / 10;
                leaf.runInfo.frameLogicTime = (~~(10 * (leaf.runInfo.logicTime - lastLogicTime) / (leaf.runInfo.frame - lastFrame))) / 10;
                leaf.runInfo.frameRenderTime = (~~(10 * (leaf.runInfo.renderTime - lastRenderTime) / (leaf.runInfo.frame - lastFrame))) / 10;
                leaf.runInfo.framePreRenderTime = (~~(10 * (leaf.runInfo.preRenderTime - lastPreRenderTime) / (leaf.runInfo.frame - lastFrame))) / 10;
                leaf.runInfo.frameGlRenderTime = (~~(10 * (leaf.runInfo.glRenderTime - lastGlRenderTime) / (leaf.runInfo.frame - lastFrame))) / 10;
                leaf.runInfo.frameDrawCall = (~~((leaf.runInfo.drawCall - lastDraCall) / (leaf.runInfo.frame - lastFrame)));
                leaf.runInfo.frameDrawCount = (~~((leaf.runInfo.drawCount - lastDrawCount) / (leaf.runInfo.frame - lastFrame)));
                lastFrame = leaf.runInfo.frame;
                lastDraCall = leaf.runInfo.drawCall;
                lastDrawCount = leaf.runInfo.drawCount;
                lastLogicTime = leaf.runInfo.logicTime;
                lastRenderTime = leaf.runInfo.renderTime;
                lastPreRenderTime = leaf.runInfo.preRenderTime;
                lastGlRenderTime = leaf.runInfo.glRenderTime;
                lastTime = end;
                t = 0;
            }
        };
        requestAnimationFrame.call(window, onTick);
        return leaf.world;
    }
    leaf.init = init;
})(leaf || (leaf = {}));
window["leaf"] = leaf;
var leaf;
(function (leaf) {
    var BlendMode;
    (function (BlendMode) {
        //重置混合模式
        BlendMode[BlendMode["NONE"] = -1] = "NONE";
        //普通的混合
        BlendMode[BlendMode["NORMAL"] = 0] = "NORMAL";
        //叠加
        BlendMode[BlendMode["ADD"] = 1] = "ADD";
        //覆盖
        BlendMode[BlendMode["OVERRIDE"] = 10] = "OVERRIDE";
    })(BlendMode = leaf.BlendMode || (leaf.BlendMode = {}));
    var BlendModeFunc = /** @class */ (function () {
        function BlendModeFunc() {
        }
        BlendModeFunc.changeBlendMode = function (mode) {
            if (mode == BlendModeFunc.blendMode) {
                return;
            }
            var gl = leaf.GLCore.gl;
            if (mode == BlendMode.NORMAL) {
                // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            }
            else if (mode == BlendMode.ADD) {
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFunc(gl.ONE, gl.ONE);
            }
            else if (mode == BlendMode.OVERRIDE) {
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFunc(gl.ONE, gl.ZERO);
            }
            BlendModeFunc.blendMode = mode;
        };
        BlendModeFunc.blendMode = BlendMode.NONE;
        return BlendModeFunc;
    }());
    leaf.BlendModeFunc = BlendModeFunc;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var GLCore = /** @class */ (function () {
        function GLCore() {
        }
        Object.defineProperty(GLCore, "scale", {
            get: function () {
                return this.width / leaf.fixWidth;
                // return leaf.world ? leaf.world.root.transform.scaleX : 1;
            },
            enumerable: true,
            configurable: true
        });
        GLCore.init = function () {
            var canvas = (window["canvas"] || document.getElementById('leaf'));
            var backingStore = 1; //window.devicePixelRatio || 1;
            var canvasScaleFactor = backingStore;
            var w = canvas.width * backingStore;
            var h = canvas.height * backingStore;
            // let m = new ecs.Matrix();
            // m.identity();
            // m.scale(1 / canvasScaleFactor, 1 / canvasScaleFactor);
            // var transform = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.tx + "," + m.ty + ")";
            // canvas.style.transformOrigin = "0% 0% 0px";
            // canvas.style["transform"] = transform;
            // canvas.width *= canvasScaleFactor;
            // canvas.height *= canvasScaleFactor;
            if (window["wx"]) {
                window["wx"].onTouchStart(function (e) {
                    var e_1, _a;
                    try {
                        for (var _b = __values(e.changedTouches), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var t = _c.value;
                            leaf.TouchManager.start(t.identifier, t.clientX, t.clientY);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                });
                window["wx"].onTouchMove(function (e) {
                    var e_2, _a;
                    try {
                        for (var _b = __values(e.changedTouches), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var t = _c.value;
                            leaf.TouchManager.move(t.identifier, t.clientX, t.clientY);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                });
                window["wx"].onTouchEnd(function (e) {
                    var e_3, _a;
                    try {
                        for (var _b = __values(e.changedTouches), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var t = _c.value;
                            leaf.TouchManager.end(t.identifier, t.clientX, t.clientY);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                });
            }
            else {
                canvas.addEventListener("touchstart", function (e) {
                    var e_4, _a;
                    try {
                        for (var _b = __values(e.changedTouches), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var t = _c.value;
                            leaf.TouchManager.start(t.identifier, t.clientX, t.clientY);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                });
                canvas.addEventListener("touchmove", function (e) {
                    var e_5, _a;
                    try {
                        for (var _b = __values(e.changedTouches), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var t = _c.value;
                            leaf.TouchManager.move(t.identifier, t.clientX, t.clientY);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                });
                canvas.addEventListener("touchend", function (e) {
                    var e_6, _a;
                    try {
                        for (var _b = __values(e.changedTouches), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var t = _c.value;
                            leaf.TouchManager.end(t.identifier, t.clientX, t.clientY);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                });
            }
            this.width = w;
            this.height = h;
            var names = ["experimental-webgl", "webgl"];
            var options = { "antialias": true, "stencil": true };
            var gl;
            for (var i = 0; i < names.length; i++) {
                try {
                    gl = canvas.getContext(names[i], options);
                    gl.colorMask(true, true, true, true);
                    gl.viewport(0, 0, GLCore.width, GLCore.height);
                    // gl.enable(gl.DEPTH_TEST);
                    // gl.enable(gl.CULL_FACE);
                    gl.enable(gl.BLEND);
                    gl.enable(gl.DEPTH_TEST);
                    gl.enable(gl.STENCIL_TEST);
                    gl.blendColor(1.0, 1.0, 1.0, 1.0);
                    // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
                    gl.clearColor(0.0, 0.0, 0.0, 1.0);
                }
                catch (e) {
                }
                if (gl) {
                    break;
                }
            }
            if (!gl) {
                console.log("Error : 当前环境不支持 WebGL");
                alert("Error : 当前环境不支持 WebGL 111");
            }
            if (!GLCore.$shareContext2D) {
                var canvas = document.createElement("canvas");
                canvas.width = GLCore.width;
                canvas.height = GLCore.height;
                GLCore.$shareContext2D = canvas.getContext("2d");
            }
            return this.gl = gl;
        };
        /**
        * 这里并没有加 image 对应 texture 的对应表，也就是说调用两次 createTexture，传同一个 image，会创建两个 texture，还可以进一步优化。
        * @param image
        * @returns {WebGLTexture}
        */
        GLCore.createTexture = function (image) {
            var gl = this.gl;
            var texture = gl.createTexture();
            texture["id"] = this.textureId;
            texture["width"] = image.width;
            texture["height"] = image.height;
            this.textureId++;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.bindTexture(gl.TEXTURE_2D, null);
            return texture;
        };
        GLCore.updateTexture = function (texture, image) {
            var gl = this.gl;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.bindTexture(gl.TEXTURE_2D, null);
        };
        GLCore.textureId = 0;
        return GLCore;
    }());
    leaf.GLCore = GLCore;
})(leaf || (leaf = {}));
window["leaf"] = leaf;
var leaf;
(function (leaf) {
    var RectMask = /** @class */ (function (_super) {
        __extends(RectMask, _super);
        function RectMask() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RectMask.prototype.init = function (x, y, w, h) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (w === void 0) { w = 0; }
            if (h === void 0) { h = 0; }
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        };
        return RectMask;
    }(ecs.Component));
    leaf.RectMask = RectMask;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    /**
     * @internal
     */
    var RenerManager = /** @class */ (function () {
        function RenerManager() {
            this.matrix = new ecs.Matrix4();
            this.cc = 0;
            this.masks = [];
        }
        RenerManager.prototype.update = function () {
            var now = Date.now();
            var gl = leaf.GLCore.gl;
            leaf.BlendModeFunc.changeBlendMode(leaf.BlendMode.NORMAL);
            //绑定舞台的渲染纹理。
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            //清除舞台，这句如果和 3d 合并之后应该去掉
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.clear(gl.STENCIL_BUFFER_BIT);
            var tasks = [];
            this.matrix.identity();
            this.cc = 0;
            this.masks.length = 0;
            this.newTask = false;
            this.hasMask = false;
            this.preRenderEntity(leaf.world.root, this.matrix, 1, tasks);
            var rd = leaf.world.root.getComponent(leaf.Render);
            if (rd) {
                var tk = rd.shader;
                if (tk) {
                    if (tasks.length && tasks[tasks.length - 1] != tk) {
                        tasks[tasks.length - 1].startNewTask();
                    }
                    if (!tasks.length || tasks[tasks.length - 1] != tk) {
                        tasks.push(tk);
                    }
                }
                rd.preRender2(this.matrix, 1);
            }
            tasks.length && tasks[tasks.length - 1].startNewTask();
            var now2 = Date.now();
            leaf.runInfo.preRenderTime += now2 - now;
            leaf.TextAtlas.$checkUpdate();
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                if (this.masks[i]) {
                    var mask = this.masks[i];
                    gl.enable(gl.SCISSOR_TEST);
                    // turn on scissor test
                    // set the scissor rectangle
                    var global = mask.transform.worldMatrix;
                    // global.save();
                    // global.translate(mask.x, mask.y);
                    // let x = global.tx + mask.x * global.a;
                    // let y = global.ty + mask.y * global.d;;
                    // let w = mask.width * global.a;
                    // let h = mask.height * global.d;
                    // gl.scissor(x, GLCore.height - y - h, w, h);
                    // execute drawing commands in the scissor box (e.g. clear)
                    // turn off scissor test again
                }
                task.render();
                if (this.masks[i]) {
                    gl.disable(gl.SCISSOR_TEST);
                }
            }
            var now3 = Date.now();
            leaf.runInfo.glRenderTime += now3 - now2;
            leaf.runInfo.renderTime += now3 - now;
            this.masks.length = 0;
        };
        RenerManager.prototype.preRenderEntity = function (entity, matrix, alpha, tasks) {
            var e_7, _a;
            var mask = entity.getComponent(leaf.RectMask);
            if (mask) {
                this.masks[tasks.length] = mask;
                if (tasks.length) {
                    tasks[tasks.length - 1].startNewTask();
                }
                this.newTask = true;
                this.hasMask = true;
            }
            var rd = entity.getComponent(leaf.Render);
            if (!rd || rd.renderChildren) {
                if (entity.children.length) {
                    var copy1 = matrix.elements.concat();
                    matrix.concat(entity.transform.local);
                    try {
                        for (var _b = __values(entity.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var c = _c.value;
                            rd = c.getComponent(leaf.Render);
                            if ((!rd || rd.renderChildren) && c.children.length)
                                this.preRenderEntity(c, matrix, alpha * c.transform.alpha, tasks);
                            if (rd) {
                                var tk = rd.shader;
                                if (tk) {
                                    if (tasks.length && tasks[tasks.length - 1] != tk) {
                                        tasks[tasks.length - 1].startNewTask();
                                    }
                                    if (!tasks.length || tasks[tasks.length - 1] != tk || this.newTask) {
                                        this.newTask = false;
                                        tasks.push(tk);
                                    }
                                }
                                var copy2 = matrix.elements.concat();
                                rd.preRender2(matrix, alpha);
                                matrix.elements = copy2;
                            }
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    matrix.elements = copy1;
                }
                else {
                    matrix.concat(entity.transform.local);
                }
            }
            if (mask) {
                if (tasks.length) {
                    tasks[tasks.length - 1].startNewTask();
                }
                this.newTask = true;
                this.hasMask = true;
            }
            this.cc++;
        };
        return RenerManager;
    }());
    leaf.RenerManager = RenerManager;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    /**
     * @internal
     */
    var RenderSystem = /** @class */ (function (_super) {
        __extends(RenderSystem, _super);
        function RenderSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RenderSystem.prototype.update = function () {
            var e_8, _a, e_9, _b, e_10, _c;
            var now = Date.now();
            var gl = leaf.GLCore.gl;
            leaf.BlendModeFunc.changeBlendMode(leaf.BlendMode.NORMAL);
            //绑定舞台的渲染纹理。
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            //清除舞台，这句如果和 3d 合并之后应该去掉
            gl.clear(gl.COLOR_BUFFER_BIT);
            var tasks = [];
            for (var node = this.query.head; node; node = node.next) {
                var rd = node.value.getComponent(leaf.Render);
                if (rd) {
                    var tk = rd.shader;
                    if (tk) {
                        if (tasks.length && tasks[tasks.length - 1] != tk) {
                            try {
                                for (var tasks_1 = __values(tasks), tasks_1_1 = tasks_1.next(); !tasks_1_1.done; tasks_1_1 = tasks_1.next()) {
                                    var t = tasks_1_1.value;
                                    t.startNewTask();
                                }
                            }
                            catch (e_8_1) { e_8 = { error: e_8_1 }; }
                            finally {
                                try {
                                    if (tasks_1_1 && !tasks_1_1.done && (_a = tasks_1.return)) _a.call(tasks_1);
                                }
                                finally { if (e_8) throw e_8.error; }
                            }
                        }
                        if (!tasks.length || tasks[tasks.length - 1] != tk) {
                            tasks.push(tk);
                        }
                    }
                }
                rd.preRender();
            }
            try {
                for (var tasks_2 = __values(tasks), tasks_2_1 = tasks_2.next(); !tasks_2_1.done; tasks_2_1 = tasks_2.next()) {
                    var t = tasks_2_1.value;
                    t.startNewTask();
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (tasks_2_1 && !tasks_2_1.done && (_b = tasks_2.return)) _b.call(tasks_2);
                }
                finally { if (e_9) throw e_9.error; }
            }
            var now2 = Date.now();
            leaf.runInfo.preRenderTime += now2 - now;
            leaf.TextAtlas.$checkUpdate();
            try {
                for (var tasks_3 = __values(tasks), tasks_3_1 = tasks_3.next(); !tasks_3_1.done; tasks_3_1 = tasks_3.next()) {
                    var task = tasks_3_1.value;
                    task.render();
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (tasks_3_1 && !tasks_3_1.done && (_c = tasks_3.return)) _c.call(tasks_3);
                }
                finally { if (e_10) throw e_10.error; }
            }
            var now3 = Date.now();
            leaf.runInfo.glRenderTime += now3 - now2;
            leaf.runInfo.renderTime += now3 - now;
        };
        return RenderSystem;
    }(ecs.EntitySystem));
    leaf.RenderSystem = RenderSystem;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Render = /** @class */ (function (_super) {
        __extends(Render, _super);
        function Render() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.blendMode = leaf.BlendMode.NONE;
            _this.renderChildren = true;
            return _this;
        }
        Render.prototype.onDestroy = function () {
        };
        Render.prototype.preRender = function () {
        };
        Render.prototype.preRender2 = function (matrix, alpha, shader) {
        };
        Object.defineProperty(Render.prototype, "width", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Render.prototype, "height", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Render.allowMultiply = false;
        return Render;
    }(ecs.Component));
    leaf.Render = Render;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var BatchRender = /** @class */ (function (_super) {
        __extends(BatchRender, _super);
        function BatchRender() {
            var _this_1 = _super !== null && _super.apply(this, arguments) || this;
            _this_1.shader = leaf.BatchShaderTask.shader;
            _this_1.renderChildren = false;
            _this_1.matrix = new ecs.Matrix();
            _this_1.projectionMatrix = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
            _this_1.textures = [];
            _this_1.count = [];
            _this_1.positionData = [];
            _this_1.blendModes = [];
            _this_1.tints = [];
            _this_1.buffers = [];
            return _this_1;
        }
        BatchRender.prototype.preRender2 = function (matrix, alpha) {
            var projectionMatrix = this.projectionMatrix;
            // projectionMatrix[0] = matrix.a;
            // projectionMatrix[1] = matrix.c;
            // projectionMatrix[3] = matrix.tx;
            // projectionMatrix[4] = matrix.b;
            // projectionMatrix[5] = matrix.d;
            // projectionMatrix[7] = matrix.ty;
            if (this.entity.children.length && !this.count.length) {
                this.refresh();
            }
            this.shader.batchs.push(this);
        };
        BatchRender.prototype.refresh = function () {
            this.reset();
            this.matrix.identity();
            this.shader.curBatch = this;
            this.preRenderEntity(this.entity, this.matrix, 1);
        };
        BatchRender.prototype.preRenderEntity = function (entity, matrix, alpha) {
            var e_11, _a;
            matrix.reconcat(entity.transform.local);
            try {
                for (var _b = __values(entity.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c = _c.value;
                    if (c.children.length) {
                        matrix.save();
                        this.preRenderEntity(c, matrix, alpha * c.transform.alpha);
                        matrix.restore();
                    }
                    var rd = c.getComponent(leaf.Render);
                    if (rd) {
                        matrix.save();
                        // rd.preRender2(matrix, alpha, this.shader);
                        matrix.restore();
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
        };
        BatchRender.prototype.reset = function () {
            while (this.buffers.length) {
                leaf.GLCore.gl.deleteBuffer(this.buffers.pop());
            }
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendModes = [];
            _this.tints = [];
        };
        BatchRender.prototype.onDestroy = function () {
            this.reset();
        };
        return BatchRender;
    }(leaf.Render));
    leaf.BatchRender = BatchRender;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Bitmap = /** @class */ (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shader = leaf.NormalShaderTask.shader;
            _this._tint = 0xffffff;
            return _this;
        }
        Object.defineProperty(Bitmap.prototype, "tint", {
            get: function () {
                return this._tint;
            },
            set: function (val) {
                this._tint = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bitmap.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            set: function (val) {
                this._texture = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bitmap.prototype, "resource", {
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
        Object.defineProperty(Bitmap.prototype, "width", {
            get: function () {
                return this._texture ? this._texture.sourceWidth : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bitmap.prototype, "height", {
            get: function () {
                return this._texture ? this._texture.sourceHeight : 0;
            },
            enumerable: true,
            configurable: true
        });
        Bitmap.prototype.preRender = function () {
            if (!this._texture)
                return;
            // (this.shader).addTask(this.texture, this.entity.transform.worldMatrix, this.entity.transform.worldAlpha, this.blendMode, this._tint);
        };
        Bitmap.prototype.preRender2 = function (matrix, alpha, shader) {
            if (!this._texture)
                return;
            matrix.concat(this.entity.transform.local);
            (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint);
        };
        Bitmap.prototype.onDestroy = function () {
            this.texture = null;
            if (this._res)
                this._res.removeCount();
            this._resource = this._res = null;
            this._tint = 0xffffff;
            _super.prototype.onDestroy.call(this);
        };
        return Bitmap;
    }(leaf.Render));
    leaf.Bitmap = Bitmap;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Cube = /** @class */ (function (_super) {
        __extends(Cube, _super);
        function Cube() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shader = leaf.Normal3DTask.shader;
            _this.size = 1;
            _this.color = 0xffffff;
            return _this;
        }
        Cube.prototype.preRender = function () {
        };
        Object.defineProperty(Cube.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            set: function (val) {
                this._texture = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cube.prototype, "resource", {
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
        Cube.prototype.preRender2 = function (matrix, alpha, shader) {
            if (!this.texture)
                return;
            matrix.scale(this.size, this.size, this.size);
            var m = matrix.concat(this.entity.transform.local);
            var r = (this.color >> 16) / 255.0;
            var g = ((this.color >> 8) & 0xFF) / 255.0;
            var b = (this.color & 0xFF) / 255.0;
            var colors = Cube.colors;
            for (var i = 0; i < colors.length / 3; i++) {
                colors[i * 3 + 0] = r;
                colors[i * 3 + 1] = g;
                colors[i * 3 + 2] = b;
            }
            this.shader.addTask(m, Cube.vertices, Cube.normals, Cube.colors, Cube.texCoords, this.texture, Cube.indices);
            // let hs = this.size / 2;
            // this.shader.addTask(m, 
            // //   [
            // //   -hs, -hs, hs,
            // //   hs, -hs, hs, 
            // //   hs, hs, hs,
            // //   -hs, hs, hs, 
            // //   hs, -hs, -hs, 
            // //   -hs, -hs, -hs, 
            // //   -hs, hs, -hs,
            // //   hs, hs, -hs, 
            // //   -hs, -hs, hs, 
            // //   hs, -hs, hs, 
            // //   hs, -hs, -hs, 
            // //   -hs, -hs, -hs,
            // //   -hs, hs, hs,  
            // //   hs, hs, hs, 
            // //   hs, hs, -hs, 
            // //   -hs, hs, -hs, 
            // //   -hs, -hs, hs,
            // //   -hs, hs, hs, 
            // //   -hs, hs, -hs,
            // //   -hs, -hs, -hs, 
            // //   hs, -hs, hs,  
            // //   hs, hs, hs,
            // //   hs, hs, -hs, 
            // //   hs, -hs, -hs, 
            // // ], 
            // [
            //   0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, // v0-v1-v2-v3 front
            //   0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, // v0-v3-v4-v5 right
            //   0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, // v0-v5-v6-v1 up
            //   -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, // v1-v6-v7-v2 left
            //   -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, // v7-v4-v3-v2 down
            //   0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5  // v4-v7-v6-v5 back
            // ],
            // [
            //   0, 0, -1,
            //   0, 0, -1,
            //   0, 0, -1,
            //   0, 0, -1,
            //   0, 0, 1,
            //   0, 0, 1,
            //   0, 0, 1,
            //   0, 0, 1,
            //   0, 1, 0,
            //   0, 1, 0,
            //   0, 1, 0,
            //   0, 1, 0,
            //   0, -1, 0,
            //   0, -1, 0,
            //   0, -1, 0,
            //   0, -1, 0,
            //   1, 0, 0,
            //   1, 0, 0,
            //   1, 0, 0,
            //   1, 0, 0,
            //   -1, 0, 0,
            //   -1, 0, 0,
            //   -1, 0, 0,
            //   -1, 0, 0
            // ], [
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b,
            //   r, g, b
            // ], [
            //   0, 1, 3,//后
            //   1, 2, 3,
            //   4, 5, 7, //前
            //   5, 6, 7,
            //   8, 9, 11, //上
            //   9, 10, 11,
            //   12, 13, 15,//下
            //   13, 14, 15,
            //   16, 17, 19, //左
            //   17, 18, 19,
            //   20, 21, 23, //右
            //   21, 22, 23
            // ]);
            // (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint);
        };
        Cube.prototype.onDestroy = function () {
            this.size = 1;
            this.texture = null;
            if (this._res)
                this._res.removeCount();
            this._resource = this._res = null;
        };
        Cube.vertices = [
            0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
            0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5,
            0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5,
            0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5 // v4-v7-v6-v5 back
        ];
        Cube.texCoords = [
            1, 1, 0, 1, 0, 0, 1, 0,
            1, 1, 0, 1, 0, 0, 1, 0,
            1, 1, 0, 1, 0, 0, 1, 0,
            1, 1, 0, 1, 0, 0, 1, 0,
            1, 1, 0, 1, 0, 0, 1, 0,
            1, 1, 0, 1, 0, 0, 1, 0
        ];
        // Colors
        Cube.colors = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 // v4-v7-v6-v5 back
        ];
        // Normal
        Cube.normals = [
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0 // v4-v7-v6-v5 back
        ];
        Cube.indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23 // back
        ];
        return Cube;
    }(leaf.Render));
    leaf.Cube = Cube;
})(leaf || (leaf = {}));
// namespace leaf {
//   export class Cube extends Render {
//     shader = Normal3DTask.shader;
//     size: number = 1;
//     color: number = 0xffffff;
//     preRender() {
//     }
//     static vertices = [
//       1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, // v0-v1-v2-v3 front
//       1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // v0-v3-v4-v5 right
//       1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
//       -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, // v1-v6-v7-v2 left
//       -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, // v7-v4-v3-v2 down
//       1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0  // v4-v7-v6-v5 back
//     ];
//     // Colors
//     static colors = [
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v1-v2-v3 front
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v3-v4-v5 right
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v5-v6-v1 up
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v1-v6-v7-v2 left
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v7-v4-v3-v2 down
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0　    // v4-v7-v6-v5 back
//     ];
//     // Normal
//     static normals = [
//       0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
//       1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
//       0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
//       -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
//       0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
//       0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
//     ];
//     static indices = [
//       0, 1, 2, 0, 2, 3,    // front
//       4, 5, 6, 4, 6, 7,    // right
//       8, 9, 10, 8, 10, 11,    // up
//       12, 13, 14, 12, 14, 15,    // left
//       16, 17, 18, 16, 18, 19,    // down
//       20, 21, 22, 20, 22, 23     // back
//     ];
//     preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader) {
//       let hs = this.size / 2;
//       let m = matrix.concat(this.entity.transform.local);
//       this.shader.addTask(m, Cube.vertices , Cube.normals, Cube.colors, Cube.indices);
//       // (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint);
//     }
//     onDestroy() {
//       this.size = 1;
//     }
//   }
// }
var leaf;
(function (leaf) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shader = leaf.NormalShaderTask.shader;
            _this._text = "";
            _this._fontColor = 0xffffff;
            _this._fontFamily = "sans-serif";
            _this._fontSize = 30;
            _this._bold = false;
            _this._italic = false;
            _this._lineSpacing = 5;
            _this._textWidth = 0;
            _this._textHeight = 0;
            return _this;
        }
        Object.defineProperty(Label.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (val) {
                this._text = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "fontColor", {
            get: function () {
                return this._fontColor;
            },
            set: function (val) {
                this._fontColor = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "fontFamily", {
            get: function () {
                return this._fontFamily;
            },
            set: function (val) {
                this._fontFamily = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "fontSize", {
            get: function () {
                return this._fontSize;
            },
            set: function (val) {
                this._fontSize = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "bold", {
            get: function () {
                return this._bold;
            },
            set: function (val) {
                this._bold = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "italic", {
            get: function () {
                return this._italic;
            },
            set: function (val) {
                this._italic = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "lineSpacing", {
            get: function () {
                return this._lineSpacing;
            },
            set: function (val) {
                this._lineSpacing = val;
            },
            enumerable: true,
            configurable: true
        });
        Label.prototype.preRender = function () {
            this.preRenderReal(this.entity.transform.worldMatrix, this.entity.transform.worldAlpha);
        };
        Label.prototype.preRender2 = function (matrix, alpha, shader) {
            this.preRenderReal(matrix.concat(this.entity.transform.local), alpha * this.entity.transform.alpha, shader);
        };
        Label.prototype.preRenderReal = function (w, alpha, shader) {
            var x = 0;
            var y = 0;
            var m = ecs.Matrix.$matrix;
            var scale = Label.useScaleFont ? leaf.GLCore.scale : 1;
            var rScale = 1 / scale;
            var toSize = Math.ceil(this._fontSize * scale);
            scale = toSize / this._fontSize;
            var r = this._fontColor >> 16;
            var g = this._fontColor >> 8 & 0xFF;
            var b = this._fontColor & 0xFF;
            this._textHeight = 0;
            for (var i = 0; this._text && i < this._text.length; i++) {
                var char = this._text.charAt(i);
                if (char == "\n" || char == "\r") {
                    x = 0;
                    y += (this.fontSize + this._lineSpacing);
                    continue;
                }
                if (char === ' ') {
                    x += this.fontSize * rScale;
                }
                else {
                    var txt = leaf.TextAtlas.getChar("rgb(" + r + "," + g + "," + b + ")", this._fontFamily, toSize, this._bold, this._italic, char, false);
                    m.identity();
                    m.scale(rScale, rScale);
                    m.translate(x, y);
                    m.concat(w);
                    (shader || this.shader).addTask(txt.texture, m, alpha, this.blendMode, 0xffffff);
                    x += txt.width * rScale;
                }
                if (x > this._textWidth)
                    this._textWidth = x;
            }
            this._textHeight = y + this.fontSize;
        };
        Object.defineProperty(Label.prototype, "width", {
            get: function () {
                return this._textWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "height", {
            get: function () {
                return this._textHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "textWidth", {
            get: function () {
                var x = 0;
                var y = 0;
                var m = ecs.Matrix.$matrix;
                var scale = 1;
                var rScale = 1 / scale;
                var toSize = Math.ceil(this._fontSize * scale);
                scale = toSize / this._fontSize;
                var r = this._fontColor >> 16;
                var g = this._fontColor >> 8 & 0xFF;
                var b = this._fontColor & 0xFF;
                this._textHeight = 0;
                for (var i = 0; this._text && i < this._text.length; i++) {
                    var char = this._text.charAt(i);
                    if (char == "\n" || char == "\r") {
                        x = 0;
                        y += (this.fontSize + this._lineSpacing);
                        continue;
                    }
                    if (char === ' ') {
                        x += this.fontSize * rScale;
                    }
                    else {
                        var txt = leaf.TextAtlas.getChar("rgb(" + r + "," + g + "," + b + ")", this._fontFamily, toSize, this._bold, this._italic, char, false);
                        m.identity();
                        m.scale(rScale, rScale);
                        m.translate(x, y);
                        x += txt.width * rScale;
                    }
                    if (x > this._textWidth)
                        this._textWidth = x;
                }
                return this._textWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "textHeight", {
            get: function () {
                var x = 0;
                var y = 0;
                var m = ecs.Matrix.$matrix;
                var scale = 1;
                var rScale = 1 / scale;
                var toSize = Math.ceil(this._fontSize * scale);
                scale = toSize / this._fontSize;
                var r = this._fontColor >> 16;
                var g = this._fontColor >> 8 & 0xFF;
                var b = this._fontColor & 0xFF;
                this._textHeight = 0;
                for (var i = 0; this._text && i < this._text.length; i++) {
                    var char = this._text.charAt(i);
                    if (char == "\n" || char == "\r") {
                        x = 0;
                        y += (this.fontSize + this._lineSpacing);
                        continue;
                    }
                    if (char === ' ') {
                        x += this.fontSize * rScale;
                    }
                    else {
                        var txt = leaf.TextAtlas.getChar("rgb(" + r + "," + g + "," + b + ")", this._fontFamily, toSize, this._bold, this._italic, char, false);
                        m.identity();
                        m.scale(rScale, rScale);
                        m.translate(x, y);
                        x += txt.width * rScale;
                    }
                    if (x > this._textWidth)
                        this._textWidth = x;
                }
                this._textHeight = y + this.fontSize;
                return this._textHeight;
            },
            enumerable: true,
            configurable: true
        });
        Label.prototype.onDestroy = function () {
            this._textWidth = this._textHeight = 0;
            this._text = "";
            this._fontColor = 0xffffff;
            this._fontFamily = "sans-serif";
            this._fontSize = 30;
            this._bold = false;
            this._italic = false;
            this._lineSpacing = 5;
        };
        Label.useScaleFont = true;
        return Label;
    }(leaf.Render));
    leaf.Label = Label;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Platform = /** @class */ (function (_super) {
        __extends(Platform, _super);
        function Platform() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shader = leaf.Normal3DTask.shader;
            _this.size = 1;
            _this._color = 0xffffff;
            _this.texCoords = [
                1, 1,
                0, 1,
                0, 0,
                1, 0
            ];
            // Colors
            _this.colors = [
                1, 1, 1,
                1, 1, 1,
                1, 1, 1,
                1, 1, 1 // v0-v1-v2-v3 front
            ];
            _this._width = 1;
            _this._height = 1;
            return _this;
        }
        Object.defineProperty(Platform.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (val) {
                if (this._color === val)
                    return;
                this._color = val;
                var colors = this.colors;
                var r = (this.color >> 16) / 255.0;
                var g = ((this.color >> 8) & 0xFF) / 255.0;
                var b = (this.color & 0xFF) / 255.0;
                for (var i = 0; i < colors.length / 3; i++) {
                    colors[i * 3 + 0] = r;
                    colors[i * 3 + 1] = g;
                    colors[i * 3 + 2] = b;
                }
            },
            enumerable: true,
            configurable: true
        });
        Platform.prototype.preRender = function () {
        };
        Object.defineProperty(Platform.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            set: function (val) {
                if (this._texture === val)
                    return;
                this._texture = val;
                if (val) {
                    this.texCoords = [
                        val.endX, val.endY,
                        val.startX, val.endY,
                        val.startX, val.startY,
                        val.endX, val.startY
                    ];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Platform.prototype, "resource", {
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
        Object.defineProperty(Platform.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (val) {
                this._width = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Platform.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (val) {
                this._height = val;
            },
            enumerable: true,
            configurable: true
        });
        Platform.prototype.preRender2 = function (matrix, alpha, shader) {
            if (!this.texture)
                return;
            matrix.scale(this._width, this._height, 0);
            var m = matrix.concat(this.entity.transform.local);
            this.shader.addTask(m, Platform.vertices, Platform.normals, this.colors, this.texCoords, this.texture, Platform.indices);
        };
        Platform.prototype.onDestroy = function () {
            this._color = 0xffffff;
            this._width = this._height = 1;
            this.size = 1;
            this.texture = null;
            if (this._res)
                this._res.removeCount();
            this._resource = this._res = null;
        };
        Platform.vertices = [
            0.5, 0.5, 0,
            -0.5, 0.5, 0,
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
        ];
        // Normal
        Platform.normals = [
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
        ];
        Platform.indices = [
            0, 1, 2,
            0, 2, 3,
        ];
        return Platform;
    }(leaf.Render));
    leaf.Platform = Platform;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Polygon = /** @class */ (function (_super) {
        __extends(Polygon, _super);
        function Polygon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shader = leaf.Polygon3DTask.shader;
            _this._vertices = [];
            _this._colors = [];
            _this._indices = [];
            _this._alphas = [];
            return _this;
        }
        Object.defineProperty(Polygon.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Polygon.prototype, "colors", {
            get: function () {
                return this._colors;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Polygon.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Polygon.prototype, "alphas", {
            get: function () {
                return this._alphas;
            },
            enumerable: true,
            configurable: true
        });
        Polygon.prototype.preRender2 = function (matrix, alpha, shader) {
            var m = matrix.concat(this.entity.transform.local);
            var alphas = this._alphas.concat();
            for (var i = 0; i < alphas.length; i++) {
                alphas[i] *= alpha;
            }
            this.shader.addTask(m, this.vertices, this.colors, this.indices, alphas);
        };
        Polygon.prototype.onDestroy = function () {
            this._vertices.length = 0;
            this.colors.length = 0;
            this.indices.length = 0;
        };
        return Polygon;
    }(leaf.Render));
    leaf.Polygon = Polygon;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var ScrollBitmap = /** @class */ (function (_super) {
        __extends(ScrollBitmap, _super);
        function ScrollBitmap() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shader = leaf.ScrollerShaderTask.shader;
            _this._tint = 0xffffff;
            _this.scrollX = 0;
            _this.scrollY = 0;
            return _this;
        }
        Object.defineProperty(ScrollBitmap.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            set: function (val) {
                this._texture = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollBitmap.prototype, "resource", {
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
        Object.defineProperty(ScrollBitmap.prototype, "tint", {
            get: function () {
                return this._tint;
            },
            set: function (val) {
                this._tint = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollBitmap.prototype, "width", {
            get: function () {
                return this._texture ? this._texture.sourceWidth : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollBitmap.prototype, "height", {
            get: function () {
                return this._texture ? this._texture.sourceHeight : 0;
            },
            enumerable: true,
            configurable: true
        });
        ScrollBitmap.prototype.preRender = function () {
            if (!this._texture)
                return;
            // (this.shader).addTask(this.texture, this.entity.transform.worldMatrix, this.entity.transform.worldAlpha, this.blendMode, this._tint);
        };
        ScrollBitmap.prototype.preRender2 = function (matrix, alpha, shader) {
            if (!this._texture)
                return;
            matrix.concat(this.entity.transform.local);
            (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint, this.scrollX, this.scrollY);
        };
        ScrollBitmap.prototype.onDestroy = function () {
            this.texture = null;
            if (this._res)
                this._res.removeCount();
            this._resource = this._res = null;
            this._tint = 0xffffff;
            this.scrollX = this.scrollY = 0;
            _super.prototype.onDestroy.call(this);
        };
        return ScrollBitmap;
    }(leaf.Render));
    leaf.ScrollBitmap = ScrollBitmap;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Triangle = /** @class */ (function (_super) {
        __extends(Triangle, _super);
        function Triangle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shader = leaf.Normal3DTask.shader;
            _this.point1 = { x: 0, y: 0, z: 0 };
            _this.point2 = { x: 0, y: 0, z: 0 };
            _this.point3 = { x: 0, y: 0, z: 0 };
            _this.color = 0xffffff;
            return _this;
        }
        Triangle.prototype.preRender = function () {
        };
        Triangle.prototype.preRender2 = function (matrix, alpha, shader) {
            // this.shader.addTask(matrix.concat(this.entity.transform.local), [
            //   this.point1.x, this.point1.y, this.point1.z,
            //   this.point2.x, this.point2.y, this.point2.z,
            //   this.point3.x, this.point3.y, this.point3.z,
            // ], [0, 1, 2]);
            // (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint);
        };
        Triangle.prototype.onDestroy = function () {
            this.point1 = { x: 0, y: 0, z: 0 };
            this.point2 = { x: 0, y: 0, z: 0 };
            this.point3 = { x: 0, y: 0, z: 0 };
        };
        return Triangle;
    }(leaf.Render));
    leaf.Triangle = Triangle;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var RecordComponent = /** @class */ (function (_super) {
        __extends(RecordComponent, _super);
        function RecordComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RecordComponent.prototype.init = function () {
            this.recordId = leaf.world.getSystem(leaf.RecordSystem).newId;
        };
        RecordComponent.prototype.checkRecord = function () {
        };
        RecordComponent.prototype.track = function (data) {
            if (this.entity) {
                var sys = leaf.world.getSystem(leaf.RecordSystem);
                sys.track(this.recordId, data);
            }
        };
        RecordComponent.prototype.recordReady = function (call) {
            if (!this.entity) {
                call();
                this.checkRecord();
            }
            else {
                var sys = leaf.world.getSystem(leaf.RecordSystem);
                var frame = sys.recordReady(this.recordId);
                if (frame != -1) {
                    sys.addCallAt(call, frame + 1);
                }
                else {
                    call();
                }
            }
        };
        RecordComponent.prototype.isReady = function () {
            return true;
        };
        return RecordComponent;
    }(ecs.Component));
    leaf.RecordComponent = RecordComponent;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var RecordSystem = /** @class */ (function (_super) {
        __extends(RecordSystem, _super);
        function RecordSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.frame = 0;
            _this._newId = 0;
            _this.isRecording = false;
            _this.records = {};
            _this.replayRecords = {};
            _this.isReplaying = false;
            _this.calls = {};
            return _this;
        }
        Object.defineProperty(RecordSystem.prototype, "newId", {
            get: function () {
                return this._newId++;
            },
            enumerable: true,
            configurable: true
        });
        RecordSystem.prototype.startRecord = function () {
            this.isRecording = true;
        };
        RecordSystem.prototype.startReplay = function (replayRecords) {
            var e_12, _a;
            var nrs = {};
            for (var k in replayRecords) {
                try {
                    for (var _b = __values(replayRecords[k]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var r = _c.value;
                        r.frame--;
                    }
                }
                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_12) throw e_12.error; }
                }
                nrs[(+k) - 1] = replayRecords[k];
            }
            replayRecords = nrs;
            this.replayRecords = replayRecords;
            this.isReplaying = true;
        };
        RecordSystem.prototype.update = function () {
            this.frame++;
            if (this.calls[this.frame]) {
                for (var i = 0; i < this.calls[this.frame].length; i++) {
                    this.calls[this.frame][i]();
                }
                delete this.calls[this.frame];
            }
            for (var node = this.query.head; node; node = node.next) {
                node.value.getComponent(leaf.RecordComponent).checkRecord();
            }
        };
        /**
         * @internal
         * @returns
         */
        RecordSystem.prototype.checkReplayReady = function () {
            if (this.isReplaying) {
                if (this.replayRecords[this.frame] && this.replayRecords[this.frame].length) {
                    return false;
                }
            }
            return true;
        };
        RecordSystem.prototype.track = function (id, data) {
            if (this.isRecording) {
                var r = {};
                r.id = id;
                r.frame = this.frame;
                r.data = data;
                if (!this.records[this.frame]) {
                    this.records[this.frame] = [];
                }
                this.records[this.frame].push(r);
            }
        };
        RecordSystem.prototype.recordReady = function (id) {
            var recordFrame = -1;
            if (this.isReplaying) {
                for (var frame in this.replayRecords) {
                    if (this.replayRecords[frame]) {
                        for (var i = 0; i < this.replayRecords[frame].length; i++) {
                            if (this.replayRecords[frame][i].id === id) {
                                this.replayRecords[frame].splice(i, 1);
                                i--;
                                recordFrame = +frame;
                            }
                        }
                        if (!this.replayRecords[frame].length) {
                            delete this.replayRecords[frame];
                            leaf.play();
                        }
                    }
                }
            }
            return recordFrame;
        };
        RecordSystem.prototype.addCallAt = function (call, frame) {
            if (this.frame < frame) {
                if (!this.calls[frame]) {
                    this.calls[frame] = [];
                }
                this.calls[frame].push(call);
            }
            else {
                call();
            }
        };
        RecordSystem.prototype.getRecord = function (id) {
            var e_13, _a;
            for (var k in this.records) {
                try {
                    for (var _b = __values(this.records[k]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var r = _c.value;
                        if (r.id === id)
                            return r;
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
        return RecordSystem;
    }(ecs.EntitySystem));
    leaf.RecordSystem = RecordSystem;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Loader = /** @class */ (function () {
        function Loader() {
            this.resources = {};
        }
        Loader.prototype.init = function () {
            this.resources = {};
            this.onComplete = null;
            this.curResource = this.firstName = this.lastName = "";
        };
        Loader.prototype.add = function (name, url, itemType) {
            var r = this.resources[name] = leaf.loaderEntity ? leaf.loaderEntity.addComponent(LoaderResource) : new LoaderResource();
            r.name = name;
            r.url = url;
            r.itemType = itemType;
            if (!this.firstName) {
                this.firstName = name;
            }
            else {
                this.resources[this.lastName].next = r.name;
            }
            this.lastName = name;
            return this;
        };
        Loader.prototype.load = function (onComplete) {
            if (this.curResource)
                return;
            this.onComplete = onComplete;
            this.curResource = this.firstName;
            this.loadCurrent();
        };
        Loader.prototype.loadCurrent = function () {
            var r = this.resources[this.curResource];
            r.load();
            r.onComplete.on(this.loadCurrentComplete, this);
        };
        Loader.prototype.loadCurrentComplete = function () {
            var r = this.resources[this.curResource];
            var next = this.resources[r.next];
            if (next) {
                this.curResource = next.name;
                this.loadCurrent();
            }
            else {
                var c = this.onComplete;
                this.onComplete = null;
                c && c(this, this.resources);
            }
        };
        return Loader;
    }());
    leaf.Loader = Loader;
    var LoaderResource = /** @class */ (function (_super) {
        __extends(LoaderResource, _super);
        function LoaderResource() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.onComplete = new ecs.Broadcast();
            _this.isComplete = false;
            _this.loadComplete = function () {
                _this.recordReady(function () {
                    _this.isComplete = true;
                });
            };
            _this.onReadyStateChange = function () {
                var _this = this;
                var xhr = this._xhr;
                if (xhr.readyState == 4) {
                    var ioError_1 = (xhr.status >= 400 || xhr.status == 0);
                    var url_1 = this._url;
                    var self_1 = this;
                    window.setTimeout(function () {
                        if (ioError_1) {
                            // if (true && !self_1.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                            //     egret.$error(1011, url_1);
                            // }
                            // self_1.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                        }
                        else {
                            _this.loadComplete();
                            // setTimeout(()=>{
                            //     this.loadComplete();
                            // },0);
                        }
                    }, 0);
                }
            };
            return _this;
        }
        LoaderResource.prototype.load = function () {
            var _this = this;
            if (this.itemType.loadType === LoaderType.TEXT) {
                if (window["wxloadText"] && (this.url.slice(0, "http://".length) != "http://" ||
                    this.url.slice(0, "https://".length) != "https://")) {
                    window["wxloadText"](this.url, function (data) {
                        _this._data = data;
                        _this.loadComplete();
                    });
                }
                else {
                    var xhr = this._xhr = this.getXHR();
                    xhr.onreadystatechange = this.onReadyStateChange.bind(this);
                    xhr.onprogress = this.updateProgress.bind(this);
                    xhr.open(this.itemType.method || "GET", this.url, true);
                    xhr.send(this.itemType.sendData);
                }
            }
            else if (this.itemType.loadType === LoaderType.IMAGE) {
                var img = new Image();
                img.src = this.url;
                img.crossOrigin = '*';
                this._data = img;
                img.onload = this.loadComplete;
            }
        };
        Object.defineProperty(LoaderResource.prototype, "data", {
            get: function () {
                if (this.itemType.loadType === LoaderType.TEXT) {
                    if (!this._xhr) {
                        return this._data;
                    }
                    if (this._xhr.response != undefined) {
                        return this._xhr.response;
                    }
                    if (!this.itemType.xhrType || this.itemType.xhrType == "text") {
                        return this._xhr.responseText;
                    }
                    // if (this.itemType.xhrType == "arraybuffer" && /msie 9.0/i.test(navigator.userAgent)) {
                    //     var w = window;
                    //     return w.convertResponseBodyToText(this._xhr["responseBody"]);
                    // }
                    if (this.itemType.xhrType == "document") {
                        return this._xhr.responseXML;
                    }
                }
                if (this.itemType.loadType === LoaderType.IMAGE) {
                    return this._data;
                }
            },
            enumerable: true,
            configurable: true
        });
        LoaderResource.prototype.updateProgress = function (event) {
            //event.loaded / event.total
        };
        LoaderResource.prototype.checkRecord = function () {
            if (this.isComplete) {
                this.track();
                this.destroy();
                this.onComplete.dispatch();
            }
        };
        LoaderResource.prototype.getXHR = function () {
            if (window["XMLHttpRequest"]) {
                return new window["XMLHttpRequest"]();
            }
            else {
                return new window["ActiveXObject"]("MSXML2.XMLHTTP");
            }
        };
        return LoaderResource;
    }(leaf.RecordComponent));
    leaf.LoaderResource = LoaderResource;
    var LoaderType;
    (function (LoaderType) {
        LoaderType[LoaderType["TEXT"] = 1] = "TEXT";
        LoaderType[LoaderType["IMAGE"] = 2] = "IMAGE";
    })(LoaderType = leaf.LoaderType || (leaf.LoaderType = {}));
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Res = /** @class */ (function () {
        function Res() {
        }
        Res.getRes = function (name) {
            return this.resources[name];
        };
        Res.clearUnsedTextures = function () {
            var e_14, _a, e_15, _b, e_16, _c, e_17, _d, e_18, _e;
            var c = 0;
            var list = [];
            try {
                for (var _f = __values(this.singleTexutres), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var txt = _g.value;
                    if (txt.count !== 0) {
                        c++;
                        leaf.debug && list.push(txt.name);
                        continue;
                    }
                    if (txt.resource)
                        txt.resource.src = '';
                    if (txt.data) {
                        // PIXI.BaseTexture.removeFromCache(txt.texture_id);
                        // PIXI.BaseTexture.removeFromCache(txt.texture_url);
                        // PIXI.Texture.removeFromCache(txt.texture_url);
                        // PIXI.Texture.removeFromCache(txt.texture_id);
                        txt.data.destroy();
                    }
                    txt.data = null;
                    txt.hasLoaded = false;
                    txt.isLoading = false;
                    leaf.debug && console.log("[Res] \u6E05\u9664\u65E0\u7528\u8D44\u6E90: " + txt.name);
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                }
                finally { if (e_14) throw e_14.error; }
            }
            try {
                for (var _h = __values(this.spriteSheets), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var txt = _j.value;
                    if (txt.count !== 0) {
                        c++;
                        leaf.debug && list.push(txt.name);
                        continue;
                    }
                    if (txt.resource)
                        txt.resource.src = '';
                    txt.resource = null;
                    try {
                        for (var _k = __values(txt.list), _l = _k.next(); !_l.done; _l = _k.next()) {
                            var frame = _l.value;
                            if (frame.data) {
                                frame.data.destroy();
                                frame.data = null;
                            }
                        }
                    }
                    catch (e_16_1) { e_16 = { error: e_16_1 }; }
                    finally {
                        try {
                            if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                        }
                        finally { if (e_16) throw e_16.error; }
                    }
                    if (txt.data) {
                        // PIXI.BaseTexture.removeFromCache(txt.texture_url);
                        // PIXI.BaseTexture.removeFromCache(txt.texture_id);
                        // PIXI.Texture.removeFromCache(txt.texture_url);
                        // PIXI.Texture.removeFromCache(txt.texture_id);
                        leaf.GLCore.gl.deleteTexture(txt.data);
                    }
                    txt.data = null;
                    txt.hasLoaded = false;
                    txt.isLoading = false;
                    leaf.debug && console.log("[Res] \u6E05\u9664\u65E0\u7528\u8D44\u6E90: " + txt.name);
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                }
                finally { if (e_15) throw e_15.error; }
            }
            try {
                for (var _m = __values(this.texts), _o = _m.next(); !_o.done; _o = _m.next()) {
                    var txt = _o.value;
                    if (txt.count !== 0) {
                        c++;
                        leaf.debug && list.push(txt.name);
                        continue;
                    }
                    txt.data = null;
                    txt.hasLoaded = false;
                    txt.isLoading = false;
                    leaf.debug && console.log("[Res] \u6E05\u9664\u65E0\u7528\u8D44\u6E90: " + txt.name);
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                }
                finally { if (e_17) throw e_17.error; }
            }
            try {
                for (var _p = __values(this.jsons), _q = _p.next(); !_q.done; _q = _p.next()) {
                    var txt = _q.value;
                    if (txt.count !== 0) {
                        c++;
                        leaf.debug && list.push(txt.name);
                        continue;
                    }
                    txt.data = null;
                    txt.hasLoaded = false;
                    txt.isLoading = false;
                    leaf.debug && console.log("[Res] \u6E05\u9664\u65E0\u7528\u8D44\u6E90: " + txt.name);
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                }
                finally { if (e_18) throw e_18.error; }
            }
            leaf.debug && console.log("[Res] \u6E05\u9664\u65E0\u7528\u8D44\u6E90\uFF0C\u8FD8\u5269 " + c + " \u4E2A\u8D44\u6E90: " + list);
        };
        Res.getAliveResources = function () {
            var e_19, _a, e_20, _b, e_21, _c, e_22, _d;
            var list = [];
            try {
                for (var _e = __values(this.singleTexutres), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var txt = _f.value;
                    if (txt.hasLoaded) {
                        leaf.debug && list.push(txt.name);
                    }
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_19) throw e_19.error; }
            }
            try {
                for (var _g = __values(this.spriteSheets), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var txt = _h.value;
                    if (txt.hasLoaded) {
                        leaf.debug && list.push(txt.name);
                    }
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_20) throw e_20.error; }
            }
            try {
                for (var _j = __values(this.texts), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var txt = _k.value;
                    if (txt.hasLoaded) {
                        leaf.debug && list.push(txt.name);
                    }
                }
            }
            catch (e_21_1) { e_21 = { error: e_21_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_21) throw e_21.error; }
            }
            try {
                for (var _l = __values(this.jsons), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var txt = _m.value;
                    if (txt.hasLoaded) {
                        leaf.debug && list.push(txt.name);
                    }
                }
            }
            catch (e_22_1) { e_22 = { error: e_22_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_22) throw e_22.error; }
            }
            return list;
        };
        Res.addRes = function (type, name, url) {
            if (type === EMResourceType.TEXTURE) {
                var fileName = "texture_" + name;
                var res = this.resources[name] = ecs.ObjectPools.createRecyableObject(Resource);
                this.singleTexutres.push(res);
                res.isLoading = false;
                res.hasLoaded = false;
                res.resource = null;
                res.count = 0;
                res.name = name;
                res.url = url;
                res.texture_url = url;
                res.texture_id = fileName;
                res.onLoadCompleteCalls = [];
                res.type = EMResourceType.TEXTURE;
                return res;
            }
            if (type === EMResourceType.SPRITE_SHEET) {
                var fileName = "spriteSheet_" + name;
                var res = this.resources[name] = ecs.ObjectPools.createRecyableObject(SpriteSheetResource);
                res.onLoadCompleteCalls = [];
                res.isLoading = false;
                res.hasLoaded = false;
                res.resource = null;
                res.count = 0;
                res.list = [];
                res.name = name;
                res.url = url;
                this.spriteSheets.push(res);
                res.type = EMResourceType.SPRITE_SHEET;
                res.texture_id = fileName;
                return res;
            }
            if (type === EMResourceType.SPRITE_SHEET_FRAME) {
                var res = this.resources[url];
                if (!res) {
                    console.error('没有找到对应的 SpriteSheet');
                    return;
                }
                var spriteSheetFrame = ecs.ObjectPools.createRecyableObject(SpriteSheetFrameResource);
                spriteSheetFrame.type = EMResourceType.SPRITE_SHEET_FRAME;
                spriteSheetFrame.onLoadCompleteCalls = [];
                spriteSheetFrame.spriteSheet = res;
                spriteSheetFrame.name = name;
                spriteSheetFrame.isLoading = false;
                spriteSheetFrame.hasLoaded = false;
                this.resources[name] = spriteSheetFrame;
                res.list.push(spriteSheetFrame);
                return res;
            }
            if (type === EMResourceType.TEXT) {
                var res = this.resources[name] = ecs.ObjectPools.createRecyableObject(Resource);
                res.isLoading = false;
                res.hasLoaded = false;
                res.resource = null;
                res.count = 0;
                res.name = name;
                res.url = url;
                res.type = EMResourceType.TEXT;
                this.texts.push(res);
                res.onLoadCompleteCalls = [];
                return res;
            }
            if (type === EMResourceType.JSON) {
                var res = this.resources[name] = ecs.ObjectPools.createRecyableObject(Resource);
                res.isLoading = false;
                res.hasLoaded = false;
                res.resource = null;
                res.count = 0;
                res.name = name;
                res.url = url;
                res.onLoadCompleteCalls = [];
                res.type = EMResourceType.JSON;
                this.jsons.push(res);
                return res;
            }
        };
        Res.loadTexture = function (name, url) {
            var _this = this;
            return ecs.ObjectPools.createRecyableObject(leaf.XPromise, (function (resolve) {
                if (!hasStart)
                    startClearResource();
                var res = _this.resources[name];
                if (res && res.hasLoaded) {
                    resolve(_this.resources[name]);
                    return;
                }
                var fileName = "texture_" + name;
                if (!res) {
                    res = _this.addRes(EMResourceType.TEXTURE, name, url);
                }
                res.onLoadCompleteCalls.push(resolve);
                if (!res.isLoading) {
                    res.isLoading = true;
                    _this.loading++;
                    (ecs.ObjectPools.createRecyableObject(leaf.Loader)).add(fileName, url, {
                        loadType: leaf.LoaderType.IMAGE
                    }).load(function (loader, resources) {
                        _this.loading--;
                        var txt = resources[fileName].data;
                        leaf.debug && _this.weakSet.add(txt);
                        if (!_this.loading) {
                            leaf.debug && _this.weakSet.add(loader.resources);
                            loader.resources = {};
                        }
                        ecs.ObjectPools.releaseRecyableObject(loader);
                        if (!res.isLoading || res.data) {
                            txt.src = '';
                            return;
                        }
                        res.data = new leaf.Texture(leaf.GLCore.createTexture(txt), txt.width, txt.height, 0, 0, txt.width, txt.height);
                        res.resource = txt;
                        res.hasLoaded = true;
                        leaf.debug && _this.weakSet.add(res.data);
                        leaf.debug && console.log("[Res] \u52A0\u8F7D\u8D44\u6E90: " + res.name + "\uFF0C\u5F53\u524D\u8D44\u6E90\u4E2A\u6570: " + _this.getAliveResources().length + "\uFF0C\u8D44\u6E90\u5217\u8868: " + _this.getAliveResources());
                        while (res.onLoadCompleteCalls.length) {
                            res.onLoadCompleteCalls.pop()(res);
                        }
                    });
                }
            }));
        };
        Res.loadJSON = function (name, url) {
            var _this = this;
            return ecs.ObjectPools.createRecyableObject(leaf.XPromise, (function (resolve) {
                var res = _this.resources[name];
                if (!res) {
                    res = _this.addRes(EMResourceType.JSON, name, url);
                }
                if (res.hasLoaded) {
                    resolve(res.data);
                    return;
                }
                res.onLoadCompleteCalls.push(resolve);
                if (res.isLoading)
                    return;
                var fileName = name;
                (ecs.ObjectPools.createRecyableObject(leaf.Loader))
                    .add(fileName, url, {
                    loadType: 1,
                    xhrType: 'text'
                }).load(function (loader, resources) {
                    leaf.debug && _this.weakSet.add(loader.resources);
                    res.hasLoaded = true;
                    res.isLoading = false;
                    res.data = JSON.parse(resources[fileName].data);
                    loader.resources = {};
                    while (res.onLoadCompleteCalls.length) {
                        res.onLoadCompleteCalls.shift()(res);
                    }
                    leaf.debug && _this.weakSet.add(res.data);
                    leaf.debug && console.log("[Res] \u52A0\u8F7D\u8D44\u6E90: " + res.name + "\uFF0C\u5F53\u524D\u8D44\u6E90\u4E2A\u6570: " + _this.getAliveResources().length + "\uFF0C\u8D44\u6E90\u5217\u8868: " + _this.getAliveResources());
                });
            }));
        };
        Res.loadText = function (name, url) {
            var _this = this;
            return ecs.ObjectPools.createRecyableObject(leaf.XPromise, (function (resolve) {
                var res = _this.resources[name];
                if (!res) {
                    res = _this.addRes(EMResourceType.TEXT, name, url);
                }
                if (res.hasLoaded) {
                    resolve(res.data);
                    return;
                }
                res.onLoadCompleteCalls.push(resolve);
                if (res.isLoading)
                    return;
                var fileName = name;
                (ecs.ObjectPools.createRecyableObject(leaf.Loader))
                    .add(fileName, url, {
                    loadType: 1,
                    xhrType: 'text'
                }).load(function (loader, resources) {
                    res.data = resources[fileName].data;
                    res.hasLoaded = true;
                    res.isLoading = false;
                    leaf.debug && _this.weakSet.add(loader.resources);
                    loader.resources = {};
                    leaf.debug && _this.weakSet.add(res.data);
                    leaf.debug && console.log("[Res] \u52A0\u8F7D\u8D44\u6E90: " + res.name + "\uFF0C\u5F53\u524D\u8D44\u6E90\u4E2A\u6570: " + _this.getAliveResources().length + "\uFF0C\u8D44\u6E90\u5217\u8868: " + _this.getAliveResources());
                    while (res.onLoadCompleteCalls.length) {
                        res.onLoadCompleteCalls.shift()(res);
                    }
                });
            }));
        };
        Res.loadResources = function (url, resourceRoot) {
            if (url === void 0) { url = "default.res.json"; }
            if (resourceRoot === void 0) { resourceRoot = "resources/"; }
            return ecs.ObjectPools.createRecyableObject(leaf.XPromise, (function (resolve) {
                url = resourceRoot + url;
                var fileName = url.split("/")[url.split("/").length - 1];
                (ecs.ObjectPools.createRecyableObject(leaf.Loader))
                    .add(fileName, url, {
                    loadType: 1,
                    xhrType: 'text'
                }).load(function (loader, resources) {
                    var e_23, _a, e_24, _b;
                    var cfg = JSON.parse(resources[fileName].data);
                    loader.resources = {};
                    ecs.ObjectPools.releaseRecyableObject(loader);
                    try {
                        for (var _c = __values(cfg.files), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var file = _d.value;
                            if (file.type === EMResourceType.TEXTURE) {
                                Res.addRes(EMResourceType.TEXTURE, file.name, resourceRoot + file.path);
                            }
                            else if (file.type === EMResourceType.SPRITE_SHEET) {
                                Res.addRes(EMResourceType.SPRITE_SHEET, file.name, resourceRoot + file.path);
                                try {
                                    for (var _e = __values(file.frames), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        var frame = _f.value;
                                        Res.addRes(EMResourceType.SPRITE_SHEET_FRAME, frame, file.name);
                                    }
                                }
                                catch (e_24_1) { e_24 = { error: e_24_1 }; }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                    }
                                    finally { if (e_24) throw e_24.error; }
                                }
                            }
                            else if (file.type === EMResourceType.TEXT) {
                                Res.addRes(EMResourceType.TEXT, file.name, resourceRoot + file.path);
                            }
                            else if (file.type === EMResourceType.JSON) {
                                Res.addRes(EMResourceType.JSON, file.name, resourceRoot + file.path);
                            }
                        }
                    }
                    catch (e_23_1) { e_23 = { error: e_23_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_23) throw e_23.error; }
                    }
                    resolve();
                });
            }));
        };
        Res.loadSpriteSheet = function (name, url) {
            var _this = this;
            return ecs.ObjectPools.createRecyableObject(leaf.XPromise, (function (resolve) {
                if (!hasStart)
                    startClearResource();
                var res = _this.resources[name];
                if (res && res.hasLoaded) {
                    resolve(res);
                    return;
                }
                var fileName = "spriteSheet_" + name;
                if (!res) {
                    res = _this.addRes(EMResourceType.SPRITE_SHEET, name, url);
                }
                var end = url.split("/")[url.split("/").length - 1];
                res.onLoadCompleteCalls.push(resolve);
                if (res.isLoading) {
                    return;
                }
                res.isLoading = true;
                var jsonName = name + "_json";
                _this.loading++;
                (ecs.ObjectPools.createRecyableObject(leaf.Loader)).add(jsonName, url, {
                    loadType: 1,
                    xhrType: 'text'
                }).load(function (loader, resources) {
                    var cfg = JSON.parse(resources[jsonName].data);
                    if (!res.texture_url) {
                        res.texture_url = url.slice(0, url.length - end.length) + cfg.file;
                    }
                    leaf.debug && _this.weakSet.add(loader.resources);
                    loader.resources = {};
                    ecs.ObjectPools.releaseRecyableObject(loader);
                    (ecs.ObjectPools.createRecyableObject(leaf.Loader)).add(fileName, res.texture_url, {
                        loadType: 2
                    }).load(function (loader, resources) {
                        leaf.debug && _this.weakSet.add(loader.resources);
                        _this.loading--;
                        var txt = resources[fileName].data;
                        leaf.debug && _this.weakSet.add(txt);
                        if (!_this.loading) {
                            loader.resources = {};
                        }
                        ecs.ObjectPools.releaseRecyableObject(loader);
                        if (!res.isLoading || res.data) {
                            txt.src = '';
                            return;
                        }
                        res.resource = txt;
                        res.data = leaf.GLCore.createTexture(txt);
                        for (var k in cfg.frames) {
                            var frame = cfg.frames[k];
                            var spriteSheetFrame = void 0;
                            if (!_this.resources[k]) {
                                spriteSheetFrame = ecs.ObjectPools.createRecyableObject(SpriteSheetFrameResource);
                                spriteSheetFrame.type = EMResourceType.SPRITE_SHEET_FRAME;
                                spriteSheetFrame.spriteSheet = res;
                                spriteSheetFrame.name = k;
                                spriteSheetFrame.isLoading = false;
                                spriteSheetFrame.hasLoaded = true;
                                _this.resources[k] = spriteSheetFrame;
                                res.list.push(spriteSheetFrame);
                            }
                            else {
                                spriteSheetFrame = _this.resources[k];
                            }
                            spriteSheetFrame.data = new leaf.Texture(res.data, txt.width, txt.height, frame.x + frame.offX, frame.y + frame.offY, frame.w, frame.h);
                            leaf.debug && _this.weakSet.add(spriteSheetFrame.data);
                        }
                        res.isLoading = false;
                        res.hasLoaded = true;
                        leaf.debug && _this.weakSet.add(res.data);
                        leaf.debug && console.log("[Res] \u52A0\u8F7D\u8D44\u6E90: " + res.name + "\uFF0C\u5F53\u524D\u8D44\u6E90\u4E2A\u6570: " + _this.getAliveResources().length + "\uFF0C\u8D44\u6E90\u5217\u8868: " + _this.getAliveResources());
                        while (res.onLoadCompleteCalls.length) {
                            res.onLoadCompleteCalls.pop()(res);
                        }
                    });
                });
            }));
        };
        Res.resources = {};
        Res.singleTexutres = [];
        Res.texts = [];
        Res.jsons = [];
        Res.spriteSheets = [];
        Res.loading = 0;
        Res.weakSet = new WeakSet();
        return Res;
    }());
    leaf.Res = Res;
    var hasStart = false;
    var clearList = [];
    function startClearResource() {
        if (hasStart)
            return;
        hasStart = false;
        var f = function () {
            requestAnimationFrame(f);
            while (clearList.length) {
                clearList.pop().src = '';
            }
        };
        requestAnimationFrame(f);
    }
    var EMResourceType;
    (function (EMResourceType) {
        EMResourceType[EMResourceType["TEXTURE"] = 1] = "TEXTURE";
        EMResourceType[EMResourceType["SPRITE_SHEET"] = 2] = "SPRITE_SHEET";
        EMResourceType[EMResourceType["SPRITE_SHEET_FRAME"] = 3] = "SPRITE_SHEET_FRAME";
        EMResourceType[EMResourceType["TEXT"] = 4] = "TEXT";
        EMResourceType[EMResourceType["JSON"] = 5] = "JSON";
    })(EMResourceType = leaf.EMResourceType || (leaf.EMResourceType = {}));
    var Resource = /** @class */ (function () {
        function Resource() {
            this.count = 0;
            this.usedCount = 0; //使用过的次数
            this.hasLoaded = false;
            this.isLoading = false;
        }
        Resource.prototype.addCount = function () {
            this.count++;
            this.usedCount++;
            if (this.resource) {
                clearList.push(this.resource);
                this.resource = null;
            }
        };
        Resource.prototype.removeCount = function () {
            this.count--;
        };
        Resource.prototype.load = function () {
            var _this = this;
            return ecs.ObjectPools.createRecyableObject(leaf.XPromise, function (resolve, reject) {
                if (_this.type === EMResourceType.TEXTURE) {
                    Res.loadTexture(_this.name, _this.url).then(function (r) {
                        resolve(_this);
                    }).catch(function (r) {
                        reject(r);
                    });
                }
                else if (_this.type === EMResourceType.SPRITE_SHEET_FRAME) {
                    Res.loadSpriteSheet(_this.spriteSheet.name, _this.spriteSheet.url).then(function (r) {
                        resolve(_this);
                    }).catch(function (r) {
                        reject(r);
                    });
                }
                else if (_this.type === EMResourceType.TEXT) {
                    Res.loadText(_this.name, _this.url).then(function (r) {
                        resolve(_this);
                    }).catch(function (r) {
                        reject(r);
                    });
                }
                else if (_this.type === EMResourceType.JSON) {
                    Res.loadJSON(_this.name, _this.url).then(function (r) {
                        resolve(_this);
                    }).catch(function (r) {
                        reject(r);
                    });
                }
            });
        };
        return Resource;
    }());
    leaf.Resource = Resource;
    var SpriteSheetFrameResource = /** @class */ (function (_super) {
        __extends(SpriteSheetFrameResource, _super);
        function SpriteSheetFrameResource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpriteSheetFrameResource.prototype.addCount = function () {
            this.count++;
            this.usedCount++;
            this.spriteSheet.count++;
            (this.spriteSheet.usedCount)++;
            if (this.spriteSheet.resource) {
                clearList.push(this.spriteSheet.resource);
                this.spriteSheet.resource = null;
            }
        };
        SpriteSheetFrameResource.prototype.removeCount = function () {
            this.count--;
            this.spriteSheet.count--;
        };
        return SpriteSheetFrameResource;
    }(Resource));
    leaf.SpriteSheetFrameResource = SpriteSheetFrameResource;
    var SpriteSheetResource = /** @class */ (function (_super) {
        __extends(SpriteSheetResource, _super);
        function SpriteSheetResource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SpriteSheetResource;
    }(Resource));
    leaf.SpriteSheetResource = SpriteSheetResource;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Shader = /** @class */ (function () {
        function Shader() {
        }
        /**
         * 创建应用程序。创建应用程序步骤如下：
         * 1. 创建应用程序，gl.createProgram()
         * 2. 绑定着色器，至少要绑定顶点着色器和片段着色器，gl.attachShader(program,shader)
         * 3. 链接程序，gl.linkProgram(program)
         *
         * 其它：
         * 在着色器真正起作用前还需要调用 gl.useProgram(program)
         * gl.getProgramParameter(program,status) 可以查询程序状态。
         * gl.getProgramInfoLog(program) 可以查询程序日志。
         * 如果着色器链接失败，可以调用 gl.deleteProgram(program) 删除程序。
         *
         * @param vertexShader 顶点着色器
         * @param fragmentShader 片段着色器
         * @returns {WebGLProgram}
         */
        Shader.prototype.createWebGLProgram = function (vertexShader, fragmentShader) {
            var gl = leaf.GLCore.gl;
            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.log("Link program error : ", gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
            return program;
        };
        /**
         * 创建着色器。创建着色器步骤如下：
         * 1. 创建着色器，gl.createShader(shaderType)
         * 2. 指定着色器程序，gl.shaderSource(shader,source)
         * 3. 编译着色器，gl.compileShader(shader);
         *
         * 其它补充：
         * gl.getShaderParameter(shader,status) 可以查询着色器状态。
         * gl.getShaderInfoLog(shader) 可以查询着色器日志。
         * 如果编译着色器失败，可以调用 gl.deleteShader(shader) 删除着色器。
         *
         * @param type 着色器类型 gl.VERTEX_SHADER 或 gl.FRAGMENT_SHADER
         * @param source 着色器程序
         * @returns {WebGLShader}
         */
        Shader.prototype.createShader = function (type, source) {
            var gl = leaf.GLCore.gl;
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.log("Compile shader error : ", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };
        Shader.prototype.startNewTask = function () {
        };
        return Shader;
    }());
    leaf.Shader = Shader;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    leaf.$size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;
    var BatchShaderTask = /** @class */ (function (_super) {
        __extends(BatchShaderTask, _super);
        function BatchShaderTask() {
            var _this_1 = _super.call(this) || this;
            _this_1.projectionMatrix = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                -1, 1, 0, 1
            ]);
            _this_1.indiceData = [];
            _this_1.batchs = [];
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
        BatchShaderTask.prototype.initProgram = function () {
            var gl = leaf.GLCore.gl;
            var vertexSource = "\n             attribute vec2 a_TexCoord;\n             attribute vec4 a_Position;\n             attribute float a_Alpha;\n             attribute float a_Sampler;\n             uniform mat4 u_PMatrix;\n             uniform mat4 u_GMatrix;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             void main(void)\n             {\n                gl_Position = u_PMatrix*u_GMatrix*a_Position;\n                v_TexCoord = a_TexCoord;\n                v_Alpha = a_Alpha;\n                v_Sampler = a_Sampler;\n             }\n             ";
            var fragmentSource = "\n             precision mediump float;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             uniform vec4 u_Color;\n             uniform sampler2D u_Sampler0;\n             uniform sampler2D u_Sampler1;\n             uniform sampler2D u_Sampler2;\n             uniform sampler2D u_Sampler3;\n             uniform sampler2D u_Sampler4;\n             uniform sampler2D u_Sampler5;\n             uniform sampler2D u_Sampler6;\n             uniform sampler2D u_Sampler7;\n             vec4 getTextureColor(vec2 coord);\n             void main(void)\n             {\n                gl_FragColor = getTextureColor(v_TexCoord)*u_Color*v_Alpha;\n             }\n             vec4 getTextureColor(vec2 coord) {\n                if(v_Sampler == 0.0) {\n                    return texture2D(u_Sampler0,v_TexCoord);\n                } else if(v_Sampler == 1.0) {\n                    return texture2D(u_Sampler1,v_TexCoord);\n                } else if(v_Sampler == 2.0) {\n                    return texture2D(u_Sampler2,v_TexCoord);\n                } else if(v_Sampler == 3.0) {\n                    return texture2D(u_Sampler3,v_TexCoord);\n                } else if(v_Sampler == 4.0) {\n                    return texture2D(u_Sampler4,v_TexCoord);\n                } else if(v_Sampler == 5.0) {\n                    return texture2D(u_Sampler5,v_TexCoord);\n                } else if(v_Sampler == 6.0) {\n                    return texture2D(u_Sampler6,v_TexCoord);\n                } else if(v_Sampler == 7.0) {\n                    return texture2D(u_Sampler7,v_TexCoord);\n                }\n             }\n             ";
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
        BatchShaderTask.prototype.initAttriLocation = function () {
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
            this.a_Position = gl.getAttribLocation(program, "a_Position");
            gl.enableVertexAttribArray(this.a_Position);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, leaf.$size * 6, 0);
            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.enableVertexAttribArray(this.a_TexCoord);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 2);
            this.a_Alpha = gl.getAttribLocation(program, "a_Alpha");
            gl.enableVertexAttribArray(this.a_Alpha);
            gl.vertexAttribPointer(this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 4);
            this.a_Sampler = gl.getAttribLocation(program, "a_Sampler");
            gl.enableVertexAttribArray(this.a_Sampler);
            gl.vertexAttribPointer(this.a_Sampler, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 5);
            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(this.u_PMatrix, false, projectionMatrix);
            this.u_GMatrix = gl.getUniformLocation(program, "u_GMatrix");
            this.u_Color = gl.getUniformLocation(program, "u_Color");
            gl.uniform4f(this.u_Color, 1, 1, 1, 1);
            this.u_Samplers = [];
            for (var i = 0; i < 8; i++) {
                this.u_Samplers[i] = gl.getUniformLocation(program, "u_Sampler" + i);
            }
        };
        BatchShaderTask.prototype.addTask = function (texture, matrix, alpha, blendMode, tint) {
            var batch = this.curBatch;
            if (texture.dirty) {
                texture.update();
            }
            var txtureIndex = batch.textures.length ? batch.textures[batch.textures.length - 1].indexOf(texture.texture) : -1;
            if (!batch.textures.length ||
                txtureIndex === -1 &&
                    batch.textures[batch.textures.length - 1].length >= 8 ||
                batch.count.length && batch.count[batch.count.length - 1] > 512 ||
                batch.blendModes[batch.blendModes.length - 1] != blendMode ||
                batch.tints[batch.tints.length - 1] != tint) {
                batch.textures.push([texture.texture]);
                txtureIndex = 0;
                batch.positionData.push([]);
                batch.count.push(0);
                batch.blendModes.push(blendMode);
                batch.tints.push(tint);
            }
            else {
                if (txtureIndex === -1) {
                    txtureIndex = batch.textures[batch.textures.length - 1].length;
                    batch.textures[batch.textures.length - 1].push(texture.texture);
                }
            }
            var index = batch.count[batch.count.length - 1] * 24;
            var positionData = batch.positionData[batch.positionData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;
            positionData[index] = matrix.c * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;
            positionData[4 + index] = alpha;
            positionData[5 + index] = txtureIndex;
            positionData[6 + index] = matrix.tx;
            positionData[7 + index] = matrix.ty;
            positionData[8 + index] = texture.startX;
            positionData[9 + index] = texture.startY;
            positionData[10 + index] = alpha;
            positionData[11 + index] = txtureIndex;
            positionData[12 + index] = matrix.a * width + matrix.c * height + matrix.tx;
            positionData[13 + index] = matrix.b * width + matrix.d * height + matrix.ty;
            positionData[14 + index] = texture.endX;
            positionData[15 + index] = texture.endY;
            positionData[16 + index] = alpha;
            positionData[17 + index] = txtureIndex;
            positionData[18 + index] = matrix.a * width + matrix.tx;
            positionData[19 + index] = matrix.b * width + matrix.ty;
            positionData[20 + index] = texture.endX;
            positionData[21 + index] = texture.startY;
            positionData[22 + index] = alpha;
            positionData[23 + index] = txtureIndex;
            batch.count[batch.count.length - 1]++;
        };
        BatchShaderTask.prototype.startNewTask = function () {
        };
        /**
         * 渲染
         */
        BatchShaderTask.prototype.render = function () {
            while (this.batchs.length) {
                this.renderBatch(this.batchs.shift());
            }
        };
        BatchShaderTask.prototype.renderBatch = function (batch) {
            var _this = this;
            var gl = leaf.GLCore.gl;
            gl.useProgram(_this.program);
            gl.uniformMatrix4fv(this.u_GMatrix, false, batch.projectionMatrix);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, leaf.$size * 6, 0);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 2);
            gl.vertexAttribPointer(this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 4);
            gl.vertexAttribPointer(this.a_Sampler, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 5);
            var tins = batch.tints;
            var textures = batch.textures;
            var positionData = batch.positionData;
            var count = batch.count;
            var blendMode = batch.blendMode;
            //开始渲染任务
            for (var i = 0, len = textures.length; i < len; i++) {
                //切换混合模式
                leaf.BlendModeFunc.changeBlendMode(blendMode[i]);
                gl.uniform4f(this.u_Color, (tins[i] >> 16) / 255.0, ((tins[i] >> 8) & 0xFF) / 255.0, (tins[i] & 0xFF) / 255.0, 1);
                //绑定当前需要渲染的纹理
                for (var t = 0; t < textures[i].length; t++) {
                    gl.uniform1i(this.u_Samplers[t], t);
                    gl.activeTexture(gl["TEXTURE" + t]);
                    gl.bindTexture(gl.TEXTURE_2D, textures[i][t]);
                }
                //分配 buffer 内容
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData[i]), gl.STATIC_DRAW);
                //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
                //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
                gl.drawElements(gl.TRIANGLES, count[i] * 6, gl.UNSIGNED_SHORT, 0); //利用drawElements画三角形
                leaf.runInfo.drawCount += count[i];
                leaf.runInfo.drawCall++;
            }
        };
        Object.defineProperty(BatchShaderTask, "shader", {
            get: function () {
                if (!this._shader) {
                    this._shader = new BatchShaderTask();
                }
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        return BatchShaderTask;
    }(leaf.Shader));
    leaf.BatchShaderTask = BatchShaderTask;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    leaf.$size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;
    var CustomerShaderTask = /** @class */ (function (_super) {
        __extends(CustomerShaderTask, _super);
        function CustomerShaderTask(vertexSource, fragmentSource) {
            var _this_1 = _super.call(this) || this;
            _this_1.projectionMatrix = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                -1, 1, 0, 1
            ]);
            _this_1.textures = [];
            _this_1.count = [];
            _this_1.positionData = [];
            _this_1.blendMode = [];
            _this_1.indiceData = [];
            _this_1.tints = [];
            _this_1.newAddNew = true;
            _this_1.renderCounts = [];
            _this_1.lastRenderCount = 0;
            _this_1.renderIndex = 0;
            //初始化作色器、program
            _this_1.initProgram(vertexSource, fragmentSource);
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
        CustomerShaderTask.prototype.initProgram = function (vertexSource, fragmentSource) {
            var gl = this.gl = leaf.GLCore.gl;
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
        CustomerShaderTask.prototype.initAttriLocation = function () {
            var gl = leaf.GLCore.gl;
            var projectionMatrix = this.projectionMatrix;
            projectionMatrix[0] = 2 / leaf.GLCore.width;
            projectionMatrix[5] = -2 / leaf.GLCore.height;
            var program = this.program;
            program["name"] = "customer program";
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
            this.a_Position = gl.getAttribLocation(program, "a_Position");
            gl.enableVertexAttribArray(this.a_Position);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, leaf.$size * 6, 0);
            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.enableVertexAttribArray(this.a_TexCoord);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 2);
            this.a_Alpha = gl.getAttribLocation(program, "a_Alpha");
            gl.enableVertexAttribArray(this.a_Alpha);
            gl.vertexAttribPointer(this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 4);
            this.a_Sampler = gl.getAttribLocation(program, "a_Sampler");
            gl.enableVertexAttribArray(this.a_Sampler);
            gl.vertexAttribPointer(this.a_Sampler, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 5);
            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(this.u_PMatrix, false, projectionMatrix);
            this.u_Color = gl.getUniformLocation(program, "u_Color");
            gl.uniform4f(this.u_Color, 1, 1, 1, 1);
            this.u_Samplers = [];
            for (var i = 0; i < 8; i++) {
                this.u_Samplers[i] = gl.getUniformLocation(program, "u_Sampler" + i);
            }
        };
        CustomerShaderTask.prototype.addTask = function (texture, matrix, alpha, blendMode, tint) {
            if (texture.dirty) {
                texture.update();
            }
            var txtureIndex = this.textures.length ? this.textures[this.textures.length - 1].indexOf(texture.texture) : -1;
            if (this.newAddNew ||
                !this.textures.length ||
                txtureIndex === -1 &&
                    this.textures[this.textures.length - 1].length >= 8 ||
                this.count.length && this.count[this.count.length - 1] > 512 ||
                this.blendMode[this.blendMode.length - 1] != blendMode ||
                this.tints[this.tints.length - 1] != tint) {
                this.newAddNew = false;
                this.textures.push([texture.texture]);
                txtureIndex = 0;
                this.positionData.push([]);
                this.count.push(0);
                this.blendMode.push(blendMode);
                this.tints.push(tint);
            }
            else {
                if (txtureIndex === -1) {
                    txtureIndex = this.textures[this.textures.length - 1].length;
                    this.textures[this.textures.length - 1].push(texture.texture);
                }
            }
            var index = this.count[this.count.length - 1] * 24;
            var positionData = this.positionData[this.positionData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;
            positionData[index] = matrix.c * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;
            positionData[4 + index] = alpha;
            positionData[5 + index] = txtureIndex;
            positionData[6 + index] = matrix.tx;
            positionData[7 + index] = matrix.ty;
            positionData[8 + index] = texture.startX;
            positionData[9 + index] = texture.startY;
            positionData[10 + index] = alpha;
            positionData[11 + index] = txtureIndex;
            positionData[12 + index] = matrix.a * width + matrix.c * height + matrix.tx;
            positionData[13 + index] = matrix.b * width + matrix.d * height + matrix.ty;
            positionData[14 + index] = texture.endX;
            positionData[15 + index] = texture.endY;
            positionData[16 + index] = alpha;
            positionData[17 + index] = txtureIndex;
            positionData[18 + index] = matrix.a * width + matrix.tx;
            positionData[19 + index] = matrix.b * width + matrix.ty;
            positionData[20 + index] = texture.endX;
            positionData[21 + index] = texture.startY;
            positionData[22 + index] = alpha;
            positionData[23 + index] = txtureIndex;
            this.count[this.count.length - 1]++;
        };
        CustomerShaderTask.prototype.startNewTask = function () {
            if (this.lastRenderCount != this.textures.length) {
                this.renderCounts.push(this.textures.length);
                this.lastRenderCount = this.textures.length;
            }
            this.newAddNew = true;
        };
        /**
         * 渲染
         */
        CustomerShaderTask.prototype.render = function () {
            var _this = this;
            var gl = leaf.GLCore.gl;
            var max = this.renderCounts.pop();
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, leaf.$size * 6, 0);
            gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 2);
            gl.vertexAttribPointer(_this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 4);
            gl.vertexAttribPointer(_this.a_Sampler, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 5);
            var i = this.renderIndex;
            //开始渲染任务
            for (var len = _this.textures.length; i < len && i < max; i++) {
                //切换混合模式
                leaf.BlendModeFunc.changeBlendMode(this.blendMode[i]);
                gl.uniform4f(this.u_Color, (this.tints[i] >> 16) / 255.0, ((this.tints[i] >> 8) & 0xFF) / 255.0, (this.tints[i] & 0xFF) / 255.0, 1);
                //绑定当前需要渲染的纹理
                for (var t = 0; t < _this.textures[i].length; t++) {
                    gl.uniform1i(this.u_Samplers[t], t);
                    gl.activeTexture(gl["TEXTURE" + t]);
                    gl.bindTexture(gl.TEXTURE_2D, _this.textures[i][t]);
                }
                //分配 buffer 内容
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);
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
        CustomerShaderTask.prototype.reset = function () {
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendMode = [];
            _this.tints = [];
            _this.renderCounts.length = 0;
            _this.lastRenderCount = 0;
            _this.renderIndex = 0;
        };
        return CustomerShaderTask;
    }(leaf.Shader));
    leaf.CustomerShaderTask = CustomerShaderTask;
})(leaf || (leaf = {}));
// namespace leaf {
//   export class Normal3DTask extends Shader {
//     private a_position: any;
//     private a_color: any;
//     private a_normal: any;
//     private u_mvp: any;
//     private u_model: any;
//     private u_normalMatrix: any;
//     private u_lightColor: any;
//     private u_lightDirection: any;
//     private u_ambientLight: any;
//     private u_pointLightColor: any;
//     private u_pointLightPosition: any;
//     constructor() {
//       super();
//       //初始化作色器、program
//       this.initProgram();
//       //初始化作色器固定变量 和 获取作色器中得变量
//       this.initAttriLocation();
//     }
//     initProgram() {
//       let gl = GLCore.gl;
//       // let vertexSource = `
//       //   attribute vec4 a_position;
//       //   uniform mat4 u_project;
//       //   uniform mat4 u_model;
//       //   void main() {
//       //     gl_Position = u_project * u_model * a_position;
//       //   }
//       // `;
//       // var vertexSource =
//       //   'attribute vec4 a_position;\n' +
//       //   'attribute vec4 a_color;\n' +
//       //   'attribute vec4 a_normal;\n' +       // Normal
//       //   'uniform mat4 u_mvp;\n' +
//       //   'uniform mat4 u_model;\n' +
//       //   'uniform mat4 u_normalMatrix;\n' +
//       //   'uniform vec3 u_lightColor;\n' +   // Diffuse light color
//       //   'uniform vec3 u_lightDirection;\n' + // Diffuse light direction (in the world coordinate, normalized)
//       //   'uniform vec3 u_ambientLight;\n' +   // Color of an ambient light
//       //   'uniform vec3 u_pointLightColor;\n' +
//       //   'uniform vec3 u_pointLightPosition;\n' +
//       //   'varying vec4 v_Color;\n' +
//       //   'void main() {\n' +
//       //   '  gl_Position =  u_mvp * a_position;\n' +
//       //   '  vec3 normal = normalize(vec3(u_normalMatrix * a_normal));\n' +
//       //   '  float nDotL = max(dot(u_lightDirection, normal), 0.0);\n' +
//       //   '  vec3 diffuse = u_lightColor * a_color.xyz * nDotL;\n' +
//       //   '  vec3 ambient = u_ambientLight * a_color.rgb;\n' +
//       //   '  vec4 vertexPosition = u_model * a_position;\n' +
//       //   '  vec3 pointDirection = normalize(u_pointLightPosition - vec3(vertexPosition));\n' +
//       //   '  float pDotL = max(dot(pointDirection, normal), 0.0);\n' +
//       //   '  vec3 pointColor = u_pointLightColor * a_color.xyz * pDotL;\n' +
//       //   '  v_Color = vec4(pointColor + diffuse + ambient, 1.0);\n' +
//       //   '}\n';
//       // // Fragment shader program
//       // var fragmentSource =
//       //   '#ifdef GL_ES\n' +
//       //   'precision mediump float;\n' +
//       //   '#endif\n' +
//       //   'varying vec4 v_Color;\n' +
//       //   'void main() {\n' +
//       //   '  gl_FragColor = v_Color;\n' +
//       //   // '  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n' +
//       //   '}\n';
//       var VSHADER_SOURCE =
//         'attribute vec4 a_Position;\n' +
//         'attribute vec4 a_Color;\n' +
//         'attribute vec4 a_Normal;\n' +
//         'uniform mat4 u_MvpMatrix;\n' +
//         'uniform mat4 u_ModelMatrix;\n' +   // Model matrix
//         'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
//         'uniform vec3 u_LightColor;\n' +    // Light color
//         'uniform vec3 u_LightPosition;\n' + // Position of the light source (in the world coordinate system)
//         'uniform vec3 u_AmbientLight;\n' +  // Ambient light color
//         'varying vec4 v_Color;\n' +
//         'void main() {\n' +
//         '  gl_Position = u_MvpMatrix * a_Position;\n' +
//            // Recalculate the normal based on the model matrix and make its length 1.
//         '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
//            // Calculate world coordinate of vertex
//         '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
//            // Calculate the light direction and make it 1.0 in length
//         '  vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));\n' +
//            // The dot product of the light direction and the normal
//         '  float nDotL = max(dot(vec3(a_Position), normal), 0.0);\n' +
//            // Calculate the color due to diffuse reflection
//         '  vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;\n' +
//            // Calculate the color due to ambient reflection
//         '  vec3 ambient = u_AmbientLight * a_Color.rgb;\n' +
//            //  Add the surface colors due to diffuse reflection and ambient reflection
//         '  v_Color = vec4(ambient, a_Color.a);\n' + 
//         '}\n';
//       // Fragment shader program
//       var FSHADER_SOURCE =
//         '#ifdef GL_ES\n' +
//         'precision mediump float;\n' +
//         '#endif\n' +
//         'varying vec4 v_Color;\n' +
//         'void main() {\n' +
//         '  gl_FragColor = v_Color;\n' +
//         '}\n';
//       var vertexShader = this.createShader(gl.VERTEX_SHADER, VSHADER_SOURCE);
//       var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, FSHADER_SOURCE);
//       this.program = this.createWebGLProgram(vertexShader, fragmentShader);
//     }
//     static camera = new ecs.Matrix4();
//     initAttriLocation() {
//       let gl = GLCore.gl;
//       var program = this.program;
//       this.buffer = gl.createBuffer();
//       this.indexBuffer = gl.createBuffer();
//       gl.useProgram(program);
//       let projectionMatrix = new ecs.Matrix4();
//       //projectionMatrix.orthographicCamera(0, leaf.getStageWidth(), 0, leaf.getStageHeight(), 0, -1000);
//       // projectionMatrix.orthographicCamera(0, leaf.getStageWidth(), 0, leaf.getStageHeight(), 0, 1000);
//       // projectionMatrix.orthographicCamera(-1, 1, -leaf.getStageHeight()/leaf.getStageWidth(), leaf.getStageHeight()/leaf.getStageWidth(), -1000, 1000);
//       // projectionMatrix.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 1000);
//       // projectionMatrix.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 1000);
//       // projectionMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
//       Normal3DTask.camera.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 100);
//       Normal3DTask.camera.lookAt(6, 6, 14, 0, 0, 0, 0, 1, 0);
//       this.u_mvp = gl.getUniformLocation(program, "u_MvpMatrix");
//       this.u_model = gl.getUniformLocation(program, "u_ModelMatrix");
//       this.u_normalMatrix = gl.getUniformLocation(program, "u_NormalMatrix");
//       this.a_position = gl.getAttribLocation(program, "a_Position");
//       this.a_color = gl.getAttribLocation(program, "a_Color");
//       this.a_normal = gl.getAttribLocation(program, "a_Normal");
//       // this.u_lightColor = gl.getUniformLocation(program, "u_lightColor");
//       // this.u_lightDirection = gl.getUniformLocation(program, "u_lightDirection");
//       this.u_ambientLight = gl.getUniformLocation(program, "u_AmbientLight");
//       this.u_pointLightColor = gl.getUniformLocation(program, "u_LightColor");
//       this.u_pointLightPosition = gl.getUniformLocation(program, "u_LightPosition");
//     }
//     mvp: number[][] = [];
//     model: number[][] = [];
//     normalMatrix: number[][] = [];
//     position: number[][] = [];
//     // normal: number[][] = [];
//     // color: number[][] = [];
//     indexs: number[][] = [];
//     counts: number[] = [];
//     index = 0;
//     addTask(matrix: ecs.Matrix4, positions: number[], indexs: number[]) {
//       let camera = Normal3DTask.camera;
//       let copy = camera.elements.concat();
//       camera.concat(matrix);
//       this.mvp.push(camera.elements);
//       camera.elements = copy;
//       this.model.push(matrix.elements.concat());
//       this.normalMatrix.push((new ecs.Matrix4()).setInverseOf(matrix).transpose().elements);
//       this.position.push(positions);
//       // this.normal.push(normals);
//       // this.color.push(colors);
//       this.indexs.push(indexs);
//       this.counts.push(indexs.length);
//       // this.indexs.push([this.index, this.index + 1, this.index + 2]);
//       // this.counts.push(positions.length / 3);
//       // this.index += positions.length / 3;
//     }
//     static diffuseColor = [0.0, 0.0, 0.0];
//     static diffuseDirection = [0, 0, -1];
//     static ambientColor = [0.2, 0.2, 0.2];
//     static pointColor = [0.5, 0.5, 0.5];
//     static pointPosition = [0, 0, 0];
//     render() {
//       var _this = this;
//       var gl = GLCore.gl;
//       gl.useProgram(_this.program);
//       //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
//       //开始渲染任务
//       gl.enableVertexAttribArray(this.a_position);
//       gl.enableVertexAttribArray(this.a_normal);
//       gl.enableVertexAttribArray(this.a_color);
//       // gl.uniform3fv(this.u_lightColor, Normal3DTask.diffuseColor);
//       // gl.uniform3fv(this.u_lightDirection, Normal3DTask.diffuseDirection);
//       gl.uniform3fv(this.u_ambientLight, Normal3DTask.ambientColor);
//       gl.uniform3fv(this.u_pointLightColor, Normal3DTask.pointColor);
//       gl.uniform3fv(this.u_pointLightPosition, Normal3DTask.pointPosition);
//       // gl.uniform3f(this.u_ambientLight, 0.2, 0.2, 0.2);
//       // gl.uniform3f(this.u_pointLightColor, 1.0, 1.0, 1.0);
//       // gl.uniform3f(this.u_pointLightPosition, 2.3, 4.0, 3.5);
//       for (var i = 0, len = this.position.length; i < len; i++) {
//         //切换混合模式
//         // BlendModeFunc.changeBlendMode(this.blendMode[i]);
//         //分配 buffer 内容
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
//         gl.vertexAttribPointer(_this.a_position, 3, gl.FLOAT, false, $size * 9, 0);
//         gl.vertexAttribPointer(_this.a_normal, 3, gl.FLOAT, false, $size * 9, $size * 3);
//         gl.vertexAttribPointer(_this.a_color, 3, gl.FLOAT, false, $size * 9, $size * 6);
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.position[i]), gl.STATIC_DRAW);
//         gl.uniformMatrix4fv(this.u_mvp, false, new Float32Array(this.mvp[i]));
//         gl.uniformMatrix4fv(this.u_model, false, new Float32Array(this.model[i]));
//         gl.uniformMatrix4fv(this.u_normalMatrix, false, new Float32Array(this.normalMatrix[i]));
//         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
//         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexs[i]), gl.STATIC_DRAW);
//         //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
//         //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
//         gl.drawElements(gl.TRIANGLES, this.counts[i], gl.UNSIGNED_SHORT, 0);//利用drawElements画三角形
//         runInfo.drawCount += _this.position[i].length;
//         runInfo.drawCall++;
//       }
//       this.mvp.length = 0;
//       this.model.length = 0;
//       this.normalMatrix.length = 0;
//       this.position.length = 0;
//       // this.normal.length = 0;
//       // this.color.length = 0;
//       this.indexs.length = 0;
//       this.index = 0;
//       this.counts.length = 0;
//     }
//     private static _shader: Normal3DTask;
//     static get shader(): Normal3DTask {
//       if (!this._shader) {
//         this._shader = new Normal3DTask() as any;
//       }
//       return this._shader;
//     }
//   }
// }
var leaf;
(function (leaf) {
    var Normal3DTask = /** @class */ (function (_super) {
        __extends(Normal3DTask, _super);
        function Normal3DTask() {
            var _this_1 = _super.call(this) || this;
            _this_1.mvc = [];
            _this_1.model = [];
            _this_1.normalMatrix = [];
            _this_1.position = [];
            _this_1.normal = [];
            _this_1.color = [];
            _this_1.texCoord = [];
            _this_1.texture = [];
            _this_1.indexs = [];
            _this_1.counts = [];
            _this_1.index = 0;
            //初始化作色器、program
            _this_1.initProgram();
            //初始化作色器固定变量 和 获取作色器中得变量
            _this_1.initAttriLocation();
            return _this_1;
        }
        Normal3DTask.prototype.initProgram = function () {
            var gl = leaf.GLCore.gl;
            //'uniform mat4 u_Projection;\n' +
            // 'uniform mat4 u_MvcMatrix;\n' +
            // '  gl_Position =  u_Projection * u_MvcMatrix * a_Position;\n' +
            //提高灯光效果 浮尘，噪声图
            var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' +
                'attribute vec4 a_Color;\n' + // Defined constant in main()
                'attribute vec4 a_Normal;\n' +
                'attribute vec2 a_TexCoord;\n' +
                'uniform mat4 u_Projection;\n' +
                'uniform mat4 u_MvcMatrix;\n' +
                'uniform mat4 u_ModelMatrix;\n' + // Model matrix
                'uniform mat4 u_NormalMatrix;\n' + // Transformation matrix of the normal
                'varying vec4 v_Color;\n' +
                'varying vec3 v_Normal;\n' +
                'varying vec3 v_Position;\n' +
                'varying vec2 v_TexCoord;\n' +
                'void main() {\n' +
                '  gl_Position = u_Projection * u_MvcMatrix * a_Position;\n' +
                // Calculate the vertex position in the world coordinate
                '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
                '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
                '  v_Color = a_Color;\n' +
                '  v_TexCoord = a_TexCoord;\n' +
                '}\n';
            // Fragment shader program
            var FSHADER_SOURCE = '#ifdef GL_ES\n' +
                'precision mediump float;\n' +
                '#endif\n' +
                'uniform vec3 u_LightColor;\n' + // Light color
                'uniform vec3 u_LightPosition;\n' + // Position of the light source
                'uniform vec3 u_AmbientLight;\n' + // Ambient light color
                'uniform vec3 u_SpotDirection;\n' + // Spot direction
                'uniform float u_SpotRot;\n' + // Spot direction
                'varying vec3 v_Normal;\n' +
                'varying vec3 v_Position;\n' +
                'varying vec4 v_Color;\n' +
                'varying vec2 v_TexCoord;\n' +
                'uniform sampler2D u_Sampler;\n' +
                'void main() {\n' +
                '  vec3 normal = normalize(v_Normal);\n' +
                '  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
                '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
                '  float spotDotL = max(dot(-lightDirection, normalize(u_SpotDirection)), 0.0);\n' +
                '  spotDotL = max((spotDotL - u_SpotRot),0.0)/(1.0 - u_SpotRot);\n' +
                '  vec3 diffuse = u_LightColor * v_Color.rgb * nDotL * spotDotL;\n' +
                '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
                '  gl_FragColor = texture2D(u_Sampler,v_TexCoord) * vec4(diffuse + ambient, v_Color.a);\n' +
                '}\n';
            var vertexShader = this.createShader(gl.VERTEX_SHADER, VSHADER_SOURCE);
            var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, FSHADER_SOURCE);
            this.program = this.createWebGLProgram(vertexShader, fragmentShader);
        };
        Normal3DTask.prototype.initAttriLocation = function () {
            var gl = leaf.GLCore.gl;
            var program = this.program;
            this.buffer = gl.createBuffer();
            this.colorBuffer = gl.createBuffer();
            this.normalBuffer = gl.createBuffer();
            this.indexBuffer = gl.createBuffer();
            this.texCoordBuffer = gl.createBuffer();
            gl.useProgram(program);
            this.u_mvc = gl.getUniformLocation(program, "u_MvcMatrix");
            this.u_projection = gl.getUniformLocation(program, "u_Projection");
            this.u_model = gl.getUniformLocation(program, "u_ModelMatrix");
            this.u_normalMatrix = gl.getUniformLocation(program, "u_NormalMatrix");
            this.a_position = gl.getAttribLocation(program, "a_Position");
            this.a_color = gl.getAttribLocation(program, "a_Color");
            this.a_normal = gl.getAttribLocation(program, "a_Normal");
            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            // this.u_lightColor = gl.getUniformLocation(program, "u_lightColor");
            // this.u_lightDirection = gl.getUniformLocation(program, "u_lightDirection");
            this.u_ambientLight = gl.getUniformLocation(program, "u_AmbientLight");
            this.u_pointLightColor = gl.getUniformLocation(program, "u_LightColor");
            this.u_pointLightPosition = gl.getUniformLocation(program, "u_LightPosition");
            this.u_SpotDirection = gl.getUniformLocation(program, "u_SpotDirection");
            this.u_SpotRot = gl.getUniformLocation(program, "u_SpotRot");
            this.u_Sampler = gl.getUniformLocation(program, "u_Sampler");
            this.projectionMatrix = new ecs.Matrix4();
            //projectionMatrix.orthographicCamera(0, leaf.getStageWidth(), 0, leaf.getStageHeight(), 0, -100);
            // this.projectionMatrix.orthographicCamera(0, leaf.getStageWidth(), 0, leaf.getStageHeight(), -1000, 1000);
            this.projectionMatrix.orthographicCamera(-1, 1, -leaf.getStageHeight() / leaf.getStageWidth(), leaf.getStageHeight() / leaf.getStageWidth(), -1000, 1000);
            // this.projectionMatrix.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 100);
            // this.projectionMatrix.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 100);
            // this.projectionMatrix.lookAt(6, 6, 14, 0, 0, 0, 0, 1, 0);
            // Normal3DTask.camera.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 100);
            // Normal3DTask.camera.lookAt(6, 6, 14, 0, 0, 0, 0, 1, 0);
            gl.uniformMatrix4fv(this.u_projection, false, new Float32Array(this.projectionMatrix.elements));
        };
        Normal3DTask.prototype.addTask = function (matrix, positions, normals, colors, texCoords, texture, indexs) {
            if (texture.dirty) {
                texture.update();
            }
            // let camera = this.projectionMatrix;
            var camera = Normal3DTask.camera;
            var copy = camera.elements.concat();
            camera.concat(matrix);
            this.mvc.push(camera.elements);
            camera.elements = copy;
            this.model.push(matrix.elements.concat());
            this.normalMatrix.push((new ecs.Matrix4()).setInverseOf(matrix).transpose().elements);
            this.position.push(positions);
            this.normal.push(normals);
            this.color.push(colors);
            this.texCoord.push(texCoords);
            this.texture.push(texture.texture);
            this.indexs.push(indexs);
            this.counts.push(indexs.length);
        };
        Normal3DTask.prototype.render = function () {
            var _this = this;
            var gl = leaf.GLCore.gl;
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            //开始渲染任务
            gl.enableVertexAttribArray(this.a_position);
            gl.enableVertexAttribArray(this.a_normal);
            gl.enableVertexAttribArray(this.a_color);
            gl.enableVertexAttribArray(this.a_TexCoord);
            // gl.uniform3fv(this.u_lightColor, Normal3DTask.diffuseColor);
            // gl.uniform3fv(this.u_lightDirection, Normal3DTask.diffuseDirection);
            // gl.uniform3f(this.u_ambientLight, 0.2, 0.2, 0.2);
            // gl.uniform3f(this.u_pointLightColor, 1.0, 1.0, 1.0);
            // gl.uniform3f(this.u_pointLightPosition, 2.3, 4.0, 3.5);
            gl.uniform3fv(this.u_ambientLight, Normal3DTask.ambientColor);
            gl.uniform3fv(this.u_pointLightColor, Normal3DTask.pointColor);
            gl.uniform3fv(this.u_pointLightPosition, Normal3DTask.pointPosition);
            gl.uniform3fv(this.u_SpotDirection, Normal3DTask.spotDirection);
            gl.uniform1f(this.u_SpotRot, Math.cos(Normal3DTask.spotRot));
            gl.activeTexture(gl["TEXTURE0"]);
            for (var i = 0, len = this.position.length; i < len; i++) {
                //切换混合模式
                // BlendModeFunc.changeBlendMode(this.blendMode[i]);
                //分配 buffer 内容
                gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                gl.vertexAttribPointer(_this.a_position, 3, gl.FLOAT, false, leaf.$size * 3, 0);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.position[i]), gl.STATIC_DRAW);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
                gl.vertexAttribPointer(_this.a_normal, 3, gl.FLOAT, false, leaf.$size * 3, 0);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.normal[i]), gl.STATIC_DRAW);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
                gl.vertexAttribPointer(_this.a_color, 3, gl.FLOAT, false, leaf.$size * 3, 0);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.color[i]), gl.STATIC_DRAW);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
                gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 2, 0);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.texCoord[i]), gl.STATIC_DRAW);
                gl.uniformMatrix4fv(this.u_mvc, false, new Float32Array(this.mvc[i]));
                gl.uniformMatrix4fv(this.u_model, false, new Float32Array(this.model[i]));
                gl.uniformMatrix4fv(this.u_normalMatrix, false, new Float32Array(this.normalMatrix[i]));
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexs[i]), gl.STATIC_DRAW);
                if (_this.texture[i]) {
                    gl.uniform1i(this.u_Sampler, 0);
                    gl.bindTexture(gl.TEXTURE_2D, _this.texture[i]);
                }
                //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
                //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
                gl.drawElements(gl.TRIANGLES, this.counts[i], gl.UNSIGNED_SHORT, 0); //利用drawElements画三角形
                leaf.runInfo.drawCount += _this.position[i].length;
                leaf.runInfo.drawCall++;
            }
            this.mvc.length = 0;
            this.model.length = 0;
            this.normalMatrix.length = 0;
            this.position.length = 0;
            this.normal.length = 0;
            this.color.length = 0;
            this.texCoord.length = 0;
            this.texture.length = 0;
            this.indexs.length = 0;
            this.index = 0;
            this.counts.length = 0;
        };
        Object.defineProperty(Normal3DTask, "shader", {
            get: function () {
                if (!this._shader) {
                    this._shader = new Normal3DTask();
                }
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        Normal3DTask.camera = new ecs.Matrix4();
        Normal3DTask.diffuseColor = [0.0, 0.0, 0.0];
        Normal3DTask.diffuseDirection = [0, 0, -1];
        Normal3DTask.ambientColor = [0.2, 0.2, 0.2];
        Normal3DTask.pointColor = [0.5, 0.5, 0.5];
        Normal3DTask.pointPosition = [0, 0, 0];
        Normal3DTask.spotDirection = [0, 0, -1];
        Normal3DTask.spotRot = 30 * Math.PI / 180;
        return Normal3DTask;
    }(leaf.Shader));
    leaf.Normal3DTask = Normal3DTask;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    leaf.$size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;
    var NormalShaderTask = /** @class */ (function (_super) {
        __extends(NormalShaderTask, _super);
        function NormalShaderTask() {
            var _this_1 = _super.call(this) || this;
            _this_1.projectionMatrix = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                -1, 1, 0, 1
            ]);
            _this_1.textures = [];
            _this_1.count = [];
            _this_1.positionData = [];
            _this_1.blendMode = [];
            _this_1.indiceData = [];
            _this_1.tints = [];
            _this_1.newAddNew = true;
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
        NormalShaderTask.prototype.initProgram = function () {
            var gl = leaf.GLCore.gl;
            var vertexSource = "\n             attribute vec2 a_TexCoord;\n             attribute vec4 a_Position;\n             attribute float a_Alpha;\n             attribute float a_Sampler;\n             uniform mat4 u_PMatrix;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             void main(void)\n             {\n                gl_Position = u_PMatrix*a_Position;\n                v_TexCoord = a_TexCoord;\n                v_Alpha = a_Alpha;\n                v_Sampler = a_Sampler;\n             }\n             ";
            var fragmentSource = "\n             #ifdef GL_ES\n             precision mediump float;\n             #endif\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             uniform vec4 u_Color;\n             uniform sampler2D u_Sampler0;\n             uniform sampler2D u_Sampler1;\n             uniform sampler2D u_Sampler2;\n             uniform sampler2D u_Sampler3;\n             uniform sampler2D u_Sampler4;\n             uniform sampler2D u_Sampler5;\n             uniform sampler2D u_Sampler6;\n             uniform sampler2D u_Sampler7;\n             vec4 getTextureColor(vec2 coord);\n             void main(void)\n             {\n                gl_FragColor = getTextureColor(v_TexCoord)*u_Color*v_Alpha;\n             }\n             vec4 getTextureColor(vec2 coord) {\n                if(v_Sampler == 0.0) {\n                    return texture2D(u_Sampler0,v_TexCoord);\n                } else if(v_Sampler == 1.0) {\n                    return texture2D(u_Sampler1,v_TexCoord);\n                } else if(v_Sampler == 2.0) {\n                    return texture2D(u_Sampler2,v_TexCoord);\n                } else if(v_Sampler == 3.0) {\n                    return texture2D(u_Sampler3,v_TexCoord);\n                } else if(v_Sampler == 4.0) {\n                    return texture2D(u_Sampler4,v_TexCoord);\n                } else if(v_Sampler == 5.0) {\n                    return texture2D(u_Sampler5,v_TexCoord);\n                } else if(v_Sampler == 6.0) {\n                    return texture2D(u_Sampler6,v_TexCoord);\n                } else if(v_Sampler == 7.0) {\n                    return texture2D(u_Sampler7,v_TexCoord);\n                }\n             }\n             ";
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
        NormalShaderTask.prototype.initAttriLocation = function () {
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
            this.a_Position = gl.getAttribLocation(program, "a_Position");
            gl.enableVertexAttribArray(this.a_Position);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, leaf.$size * 6, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.enableVertexAttribArray(this.a_TexCoord);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 2);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            this.a_Alpha = gl.getAttribLocation(program, "a_Alpha");
            gl.enableVertexAttribArray(this.a_Alpha);
            gl.vertexAttribPointer(this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 4);
            this.a_Sampler = gl.getAttribLocation(program, "a_Sampler");
            gl.enableVertexAttribArray(this.a_Sampler);
            gl.vertexAttribPointer(this.a_Sampler, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 5);
            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(this.u_PMatrix, false, projectionMatrix);
            this.u_Color = gl.getUniformLocation(program, "u_Color");
            gl.uniform4f(this.u_Color, 1, 1, 1, 1);
            this.u_Samplers = [];
            for (var i = 0; i < 8; i++) {
                this.u_Samplers[i] = gl.getUniformLocation(program, "u_Sampler" + i);
            }
        };
        NormalShaderTask.prototype.addTask = function (texture, matrix, alpha, blendMode, tint) {
            if (texture.dirty) {
                texture.update();
            }
            var txtureIndex = this.textures.length ? this.textures[this.textures.length - 1].indexOf(texture.texture) : -1;
            if (this.newAddNew ||
                !this.textures.length ||
                txtureIndex === -1 &&
                    this.textures[this.textures.length - 1].length >= 8 ||
                this.count.length && this.count[this.count.length - 1] > 512 ||
                this.blendMode[this.blendMode.length - 1] != blendMode ||
                this.tints[this.tints.length - 1] != tint) {
                this.newAddNew = false;
                this.textures.push([texture.texture]);
                txtureIndex = 0;
                this.positionData.push([]);
                this.count.push(0);
                this.blendMode.push(blendMode);
                this.tints.push(tint);
            }
            else {
                if (txtureIndex === -1) {
                    txtureIndex = this.textures[this.textures.length - 1].length;
                    this.textures[this.textures.length - 1].push(texture.texture);
                }
            }
            var index = this.count[this.count.length - 1] * 24;
            var positionData = this.positionData[this.positionData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;
            positionData[index] = matrix.c * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;
            positionData[4 + index] = alpha;
            positionData[5 + index] = txtureIndex;
            positionData[6 + index] = matrix.tx;
            positionData[7 + index] = matrix.ty;
            positionData[8 + index] = texture.startX;
            positionData[9 + index] = texture.startY;
            positionData[10 + index] = alpha;
            positionData[11 + index] = txtureIndex;
            positionData[12 + index] = matrix.a * width + matrix.c * height + matrix.tx;
            positionData[13 + index] = matrix.b * width + matrix.d * height + matrix.ty;
            positionData[14 + index] = texture.endX;
            positionData[15 + index] = texture.endY;
            positionData[16 + index] = alpha;
            positionData[17 + index] = txtureIndex;
            positionData[18 + index] = matrix.a * width + matrix.tx;
            positionData[19 + index] = matrix.b * width + matrix.ty;
            positionData[20 + index] = texture.endX;
            positionData[21 + index] = texture.startY;
            positionData[22 + index] = alpha;
            positionData[23 + index] = txtureIndex;
            this.count[this.count.length - 1]++;
        };
        NormalShaderTask.prototype.startNewTask = function () {
            if (this.lastRenderCount != this.textures.length) {
                this.renderCounts.push(this.textures.length);
                this.lastRenderCount = this.textures.length;
            }
            this.newAddNew = true;
        };
        /**
         * 渲染
         */
        NormalShaderTask.prototype.render = function () {
            var _this = this;
            var gl = leaf.GLCore.gl;
            var max = this.renderCounts.shift();
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, leaf.$size * 6, 0);
            gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 2);
            gl.vertexAttribPointer(_this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 4);
            gl.vertexAttribPointer(_this.a_Sampler, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 5);
            var i = this.renderIndex;
            //开始渲染任务
            for (var len = _this.textures.length; i < len && i < max; i++) {
                //切换混合模式
                // BlendModeFunc.changeBlendMode(this.blendMode[i]);
                gl.uniform4f(this.u_Color, (this.tints[i] >> 16) / 255.0, ((this.tints[i] >> 8) & 0xFF) / 255.0, (this.tints[i] & 0xFF) / 255.0, 1);
                //绑定当前需要渲染的纹理
                for (var t = 0; t < _this.textures[i].length; t++) {
                    gl.uniform1i(this.u_Samplers[t], t);
                    gl.activeTexture(gl["TEXTURE" + t]);
                    gl.bindTexture(gl.TEXTURE_2D, _this.textures[i][t]);
                }
                //分配 buffer 内容
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);
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
        NormalShaderTask.prototype.reset = function () {
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendMode = [];
            _this.tints = [];
            _this.renderCounts.length = 0;
            _this.lastRenderCount = 0;
            _this.renderIndex = 0;
        };
        Object.defineProperty(NormalShaderTask, "shader", {
            get: function () {
                if (!this._shader) {
                    this._shader = new NormalShaderTask();
                }
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        return NormalShaderTask;
    }(leaf.Shader));
    leaf.NormalShaderTask = NormalShaderTask;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Polygon3DTask = /** @class */ (function (_super) {
        __extends(Polygon3DTask, _super);
        function Polygon3DTask() {
            var _this_1 = _super.call(this) || this;
            _this_1.mvcs = [];
            _this_1.positions = [];
            _this_1.colors = [];
            _this_1.alphas = [];
            _this_1.indexs = [];
            _this_1.count = 0;
            _this_1.index = 0;
            //初始化作色器、program
            _this_1.initProgram();
            //初始化作色器固定变量 和 获取作色器中得变量
            _this_1.initAttriLocation();
            return _this_1;
        }
        Polygon3DTask.prototype.initProgram = function () {
            var gl = leaf.GLCore.gl;
            //'uniform mat4 u_Projection;\n' +
            // 'uniform mat4 u_MvcMatrix;\n' +
            // '  gl_Position =  u_Projection * u_MvcMatrix * a_Position;\n' +
            //提高灯光效果 浮尘，噪声图
            var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' +
                'attribute vec3 a_Color;\n' + // Defined constant in main()
                'attribute float a_Alpha;\n' +
                'uniform mat4 u_Projection;\n' +
                'uniform mat4 u_MvcMatrix;\n' +
                'varying vec3 v_Color;\n' +
                'varying float v_Alpha;\n' +
                'void main() {\n' +
                '  gl_Position = u_Projection * u_MvcMatrix * a_Position;\n' +
                '  v_Color = a_Color;\n' +
                '  v_Alpha = a_Alpha;\n' +
                '}\n';
            // Fragment shader program
            var FSHADER_SOURCE = '#ifdef GL_ES\n' +
                'precision mediump float;\n' +
                '#endif\n' +
                'varying vec3 v_Color;\n' +
                'varying float v_Alpha;\n' +
                'void main() {\n' +
                '  gl_FragColor = vec4(v_Color.xyz,1.0) * v_Alpha ;\n' +
                '}\n';
            var vertexShader = this.createShader(gl.VERTEX_SHADER, VSHADER_SOURCE);
            var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, FSHADER_SOURCE);
            this.program = this.createWebGLProgram(vertexShader, fragmentShader);
        };
        Polygon3DTask.prototype.initAttriLocation = function () {
            var gl = leaf.GLCore.gl;
            var program = this.program;
            this.buffer = gl.createBuffer();
            this.colorBuffer = gl.createBuffer();
            this.alphaBuffer = gl.createBuffer();
            this.indexBuffer = gl.createBuffer();
            gl.useProgram(program);
            this.u_mvc = gl.getUniformLocation(program, "u_MvcMatrix");
            this.u_projection = gl.getUniformLocation(program, "u_Projection");
            this.a_position = gl.getAttribLocation(program, "a_Position");
            this.a_color = gl.getAttribLocation(program, "a_Color");
            this.a_alpha = gl.getAttribLocation(program, "a_Alpha");
            this.projectionMatrix = new ecs.Matrix4();
            this.projectionMatrix.orthographicCamera(-1, 1, -leaf.getStageHeight() / leaf.getStageWidth(), leaf.getStageHeight() / leaf.getStageWidth(), -1000, 1000);
            gl.uniformMatrix4fv(this.u_projection, false, new Float32Array(this.projectionMatrix.elements));
        };
        Polygon3DTask.prototype.addTask = function (matrix, positions, colors, indexs, alphas) {
            // let camera = this.projectionMatrix;
            var camera = leaf.Normal3DTask.camera;
            var copy = camera.elements.concat();
            camera.concat(matrix);
            for (var i = 0, len = this.mvcs.length; i < camera.elements.length; i++) {
                this.mvcs[len + i] = camera.elements[i];
            }
            camera.elements = copy;
            for (var i = 0, len = this.positions.length; i < positions.length; i++) {
                this.positions[len + i] = positions[i];
            }
            for (var i = 0, len = this.colors.length; i < colors.length; i++) {
                this.colors[len + i] = colors[i];
            }
            for (var i = 0, len = this.indexs.length; i < indexs.length; i++) {
                this.indexs[len + i] = indexs[i];
            }
            for (var i = 0, len = this.alphas.length; i < alphas.length; i++) {
                this.alphas[len + i] = alphas[i];
            }
            this.count += indexs.length;
        };
        Polygon3DTask.prototype.render = function () {
            var _this = this;
            var gl = leaf.GLCore.gl;
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            //开始渲染任务
            gl.enableVertexAttribArray(this.a_position);
            gl.enableVertexAttribArray(this.a_color);
            gl.enableVertexAttribArray(this.a_alpha);
            //切换混合模式
            // BlendModeFunc.changeBlendMode(this.blendMode[i]);
            //分配 buffer 内容
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_position, 3, gl.FLOAT, false, leaf.$size * 3, 0);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positions), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            gl.vertexAttribPointer(_this.a_color, 3, gl.FLOAT, false, leaf.$size * 3, 0);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.colors), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.alphaBuffer);
            gl.vertexAttribPointer(_this.a_alpha, 1, gl.FLOAT, false, leaf.$size * 1, 0);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.alphas), gl.STATIC_DRAW);
            gl.uniformMatrix4fv(this.u_mvc, false, new Float32Array(this.mvcs));
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexs), gl.STATIC_DRAW);
            //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
            //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
            gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0); //利用drawElements画三角形
            leaf.runInfo.drawCount += _this.indexs.length;
            leaf.runInfo.drawCall++;
            this.mvcs.length = 0;
            this.positions.length = 0;
            this.colors.length = 0;
            this.alphas.length = 0;
            this.indexs.length = 0;
            this.index = 0;
            this.count = 0;
        };
        Object.defineProperty(Polygon3DTask, "shader", {
            get: function () {
                if (!this._shader) {
                    this._shader = new Polygon3DTask();
                }
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        return Polygon3DTask;
    }(leaf.Shader));
    leaf.Polygon3DTask = Polygon3DTask;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    leaf.$size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;
    var ScrollerShaderTask = /** @class */ (function (_super) {
        __extends(ScrollerShaderTask, _super);
        function ScrollerShaderTask() {
            var _this_1 = _super.call(this) || this;
            _this_1.projectionMatrix = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                -1, 1, 0, 1
            ]);
            _this_1.offxs = [];
            _this_1.offys = [];
            _this_1.textures = [];
            _this_1.count = [];
            _this_1.positionData = [];
            _this_1.blendMode = [];
            _this_1.indiceData = [];
            _this_1.tints = [];
            _this_1.newAddNew = true;
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
        ScrollerShaderTask.prototype.initProgram = function () {
            var gl = leaf.GLCore.gl;
            var vertexSource = "\n             attribute vec2 a_TexCoord;\n             attribute vec4 a_Position;\n             attribute float a_Alpha;\n             attribute float a_Sampler;\n             uniform mat4 u_PMatrix;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             void main(void)\n             {\n                gl_Position = u_PMatrix*a_Position;\n                v_TexCoord = a_TexCoord;\n                v_Alpha = a_Alpha;\n                v_Sampler = a_Sampler;\n             }\n             ";
            var fragmentSource = "\n             precision mediump float;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             uniform vec4 u_Color;\n             uniform sampler2D u_Sampler0;\n             uniform sampler2D u_Sampler1;\n             uniform sampler2D u_Sampler2;\n             uniform sampler2D u_Sampler3;\n             uniform sampler2D u_Sampler4;\n             uniform sampler2D u_Sampler5;\n             uniform sampler2D u_Sampler6;\n             uniform sampler2D u_Sampler7;\n             vec4 getTextureColor(vec2 coord);\n             uniform float u_offx;\n             uniform float u_offy;\n             void main(void)\n             {\n                vec2 pos = vec2(v_TexCoord[0],v_TexCoord[1]);\n                pos.x = pos.x + u_offx;\n                pos.y = pos.y + u_offy;\n                pos = mod(pos,1.0);\n                gl_FragColor = getTextureColor(pos)*u_Color*v_Alpha;\n             }\n             vec4 getTextureColor(vec2 coord) {\n                if(v_Sampler == 0.0) {\n                    return texture2D(u_Sampler0,coord);\n                } else if(v_Sampler == 1.0) {\n                    return texture2D(u_Sampler1,coord);\n                } else if(v_Sampler == 2.0) {\n                    return texture2D(u_Sampler2,coord);\n                } else if(v_Sampler == 3.0) {\n                    return texture2D(u_Sampler3,coord);\n                } else if(v_Sampler == 4.0) {\n                    return texture2D(u_Sampler4,coord);\n                } else if(v_Sampler == 5.0) {\n                    return texture2D(u_Sampler5,coord);\n                } else if(v_Sampler == 6.0) {\n                    return texture2D(u_Sampler6,coord);\n                } else if(v_Sampler == 7.0) {\n                    return texture2D(u_Sampler7,coord);\n                }\n             }\n             ";
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
        ScrollerShaderTask.prototype.initAttriLocation = function () {
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
            this.a_Position = gl.getAttribLocation(program, "a_Position");
            gl.enableVertexAttribArray(this.a_Position);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, leaf.$size * 6, 0);
            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.enableVertexAttribArray(this.a_TexCoord);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 2);
            this.a_Alpha = gl.getAttribLocation(program, "a_Alpha");
            gl.enableVertexAttribArray(this.a_Alpha);
            gl.vertexAttribPointer(this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 4);
            this.a_Sampler = gl.getAttribLocation(program, "a_Sampler");
            gl.enableVertexAttribArray(this.a_Sampler);
            gl.vertexAttribPointer(this.a_Sampler, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 5);
            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(this.u_PMatrix, false, projectionMatrix);
            this.u_offx = gl.getUniformLocation(program, "u_offx");
            gl.uniform1f(this.u_offx, 0);
            this.u_offy = gl.getUniformLocation(program, "u_offy");
            gl.uniform1f(this.u_offy, 0);
            this.u_Color = gl.getUniformLocation(program, "u_Color");
            gl.uniform4f(this.u_Color, 1, 1, 1, 1);
            this.u_Samplers = [];
            for (var i = 0; i < 8; i++) {
                this.u_Samplers[i] = gl.getUniformLocation(program, "u_Sampler" + i);
            }
        };
        ScrollerShaderTask.prototype.addTask = function (texture, matrix, alpha, blendMode, tint, offx, offy) {
            if (offx === void 0) { offx = 0; }
            if (texture.dirty) {
                texture.update();
            }
            var txtureIndex = this.textures.length ? this.textures[this.textures.length - 1].indexOf(texture.texture) : -1;
            if (this.newAddNew ||
                !this.textures.length ||
                txtureIndex === -1 &&
                    this.textures[this.textures.length - 1].length >= 8 ||
                this.count.length && this.count[this.count.length - 1] > 512 ||
                this.blendMode[this.blendMode.length - 1] != blendMode ||
                this.tints[this.tints.length - 1] != tint ||
                this.offxs[this.offxs.length - 1] != offx ||
                this.offys[this.offys.length - 1] != offy) {
                this.newAddNew = false;
                this.textures.push([texture.texture]);
                txtureIndex = 0;
                this.positionData.push([]);
                this.count.push(0);
                this.blendMode.push(blendMode);
                this.tints.push(tint);
                this.offxs.push(offx);
                this.offys.push(offy);
            }
            else {
                if (txtureIndex === -1) {
                    txtureIndex = this.textures[this.textures.length - 1].length;
                    this.textures[this.textures.length - 1].push(texture.texture);
                }
            }
            var index = this.count[this.count.length - 1] * 24;
            var positionData = this.positionData[this.positionData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;
            positionData[index] = matrix.c * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;
            positionData[4 + index] = alpha;
            positionData[5 + index] = txtureIndex;
            positionData[6 + index] = matrix.tx;
            positionData[7 + index] = matrix.ty;
            positionData[8 + index] = texture.startX;
            positionData[9 + index] = texture.startY;
            positionData[10 + index] = alpha;
            positionData[11 + index] = txtureIndex;
            positionData[12 + index] = matrix.a * width + matrix.c * height + matrix.tx;
            positionData[13 + index] = matrix.b * width + matrix.d * height + matrix.ty;
            positionData[14 + index] = texture.endX;
            positionData[15 + index] = texture.endY;
            positionData[16 + index] = alpha;
            positionData[17 + index] = txtureIndex;
            positionData[18 + index] = matrix.a * width + matrix.tx;
            positionData[19 + index] = matrix.b * width + matrix.ty;
            positionData[20 + index] = texture.endX;
            positionData[21 + index] = texture.startY;
            positionData[22 + index] = alpha;
            positionData[23 + index] = txtureIndex;
            this.count[this.count.length - 1]++;
        };
        ScrollerShaderTask.prototype.startNewTask = function () {
            if (this.lastRenderCount != this.textures.length) {
                this.renderCounts.push(this.textures.length);
                this.lastRenderCount = this.textures.length;
            }
            this.newAddNew = true;
        };
        /**
         * 渲染
         */
        ScrollerShaderTask.prototype.render = function () {
            var _this = this;
            var gl = leaf.GLCore.gl;
            var max = this.renderCounts.shift();
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, leaf.$size * 6, 0);
            gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 2);
            gl.vertexAttribPointer(_this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 4);
            gl.vertexAttribPointer(_this.a_Sampler, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 5);
            var i = this.renderIndex;
            //开始渲染任务
            for (var len = _this.textures.length; i < len && i < max; i++) {
                //切换混合模式
                leaf.BlendModeFunc.changeBlendMode(this.blendMode[i]);
                gl.uniform1f(this.u_offx, this.offxs[i]);
                gl.uniform1f(this.u_offy, this.offys[i]);
                gl.uniform4f(this.u_Color, (this.tints[i] >> 16) / 255.0, ((this.tints[i] >> 8) & 0xFF) / 255.0, (this.tints[i] & 0xFF) / 255.0, 1);
                //绑定当前需要渲染的纹理
                for (var t = 0; t < _this.textures[i].length; t++) {
                    gl.uniform1i(this.u_Samplers[t], t);
                    gl.activeTexture(gl["TEXTURE" + t]);
                    gl.bindTexture(gl.TEXTURE_2D, _this.textures[i][t]);
                }
                //分配 buffer 内容
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);
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
        ScrollerShaderTask.prototype.reset = function () {
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendMode = [];
            _this.tints = [];
            _this.renderCounts.length = 0;
            _this.lastRenderCount = 0;
            _this.renderIndex = 0;
            _this.offxs = [];
            _this.offys = [];
        };
        Object.defineProperty(ScrollerShaderTask, "shader", {
            get: function () {
                if (!this._shader) {
                    this._shader = new ScrollerShaderTask();
                }
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        return ScrollerShaderTask;
    }(leaf.Shader));
    leaf.ScrollerShaderTask = ScrollerShaderTask;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var DrawTexture = /** @class */ (function () {
        function DrawTexture(width, height) {
            this.width = width;
            this.height = height;
            this.canvas = document.createElement("canvas");
            this.canvas.width = width;
            this.canvas.height = height;
            this.context2d = this.canvas.getContext("2d");
            this.context2d.clearRect(0, 0, width, height);
            this.context2d.scale(1, 1);
            this.context2d.lineCap = 'square';
            this.context2d.lineJoin = 'miter';
            this.texture = leaf.GLCore.createTexture(this.canvas);
        }
        DrawTexture.prototype.update = function () {
            leaf.GLCore.updateTexture(this.texture, this.canvas);
        };
        return DrawTexture;
    }());
    leaf.DrawTexture = DrawTexture;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var PointTexture = /** @class */ (function (_super) {
        __extends(PointTexture, _super);
        function PointTexture() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * @internal
             */
            _this.colors = {};
            /**
             * @internal
             */
            _this.dirtyTextures = [];
            /**
             * @internal
             */
            _this.extend = 1;
            /**
             * @internal
             */
            _this.gap = 0;
            /**
             * @internal
             */
            _this.x = 1;
            /**
             * @internal
             */
            _this.y = 1;
            return _this;
        }
        PointTexture.prototype.getColor = function (color) {
            if (this.colors[color])
                return this.colors[color];
            var size = 1 + this.extend * 2;
            var gap = this.gap;
            var x = this.x;
            var y = this.y;
            this.x += size + gap;
            if (this.x > this.width + size + gap) {
                this.x = 0;
                this.y += size + gap;
            }
            this.context2d.fillStyle = "rgb(" + (color >> 16) + "," + (color >> 8 & 0xFF) + "," + (color & 0xFF) + ")";
            this.context2d.fillRect(x, y, size, size);
            var txt = this.colors[color] = new leaf.Texture(this.texture, this.width, this.height, x + this.extend, y + this.extend, 1, 1);
            txt.dirty = true;
            txt.update = this.updateTexture.bind(this);
            this.dirtyTextures.push(txt);
            return txt;
        };
        Object.defineProperty(PointTexture.prototype, "isFull", {
            get: function () {
                if (this.x >= this.width || this.y >= this.height)
                    return true;
                return false;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @internal
         */
        PointTexture.prototype.updateTexture = function () {
            this.update();
            while (this.dirtyTextures.length) {
                this.dirtyTextures.pop().dirty = false;
            }
        };
        PointTexture.getTexture = function (color) {
            var txt = this.curTexture;
            if (!txt || txt.isFull) {
                txt = this.curTexture = new PointTexture(256, 256);
            }
            return txt.getColor(color);
        };
        /**
         * @internal
         */
        PointTexture.colors = {};
        return PointTexture;
    }(leaf.DrawTexture));
    leaf.PointTexture = PointTexture;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var RectTexture = /** @class */ (function (_super) {
        __extends(RectTexture, _super);
        function RectTexture() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * @internal
             */
            _this.colors = {};
            /**
             * @internal
             */
            _this.dirtyTextures = [];
            /**
             * @internal
             */
            _this.extend = 1;
            /**
             * @internal
             */
            _this.gap = 0;
            /**
             * @internal
             */
            _this.x = 0;
            /**
             * @internal
             */
            _this.y = 0;
            return _this;
        }
        RectTexture.prototype.getColor = function (colors, id) {
            if (this.colors[id])
                return this.colors[id];
            var w = colors[0].length;
            var h = colors.length;
            var addW = w + this.extend * 2;
            var addH = h + this.extend * 2;
            var gap = this.gap;
            var x = this.x;
            var y = this.y;
            this.x += addW + gap;
            if (this.x > this.width + addW + gap) {
                this.x = 0;
                this.y += addH + gap;
            }
            for (var y2 = -1; y2 < h + 1; y2++) {
                for (var x2 = -1; x2 < w + 1; x2++) {
                    var cx = x2 < 0 ? 0 : x2 >= w ? w - 1 : x2;
                    var cy = y2 < 0 ? 0 : y2 >= h ? h - 1 : y2;
                    var color = colors[cy][cx];
                    if (color == null)
                        continue;
                    this.context2d.fillStyle = "rgb(" + (color >> 16) + "," + (color >> 8 & 0xFF) + "," + (color & 0xFF) + ")";
                    this.context2d.fillRect(x + x2 + 1, y + y2 + 1, 1, 1);
                }
            }
            var txt = this.colors[id] = new leaf.Texture(this.texture, this.width, this.height, x + this.extend, y + this.extend, w, h);
            txt.dirty = true;
            txt.update = this.updateTexture.bind(this);
            this.dirtyTextures.push(txt);
            return txt;
        };
        Object.defineProperty(RectTexture.prototype, "isFull", {
            get: function () {
                if (this.x >= this.width || this.y >= this.height)
                    return true;
                return false;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @internal
         */
        RectTexture.prototype.updateTexture = function () {
            this.update();
            while (this.dirtyTextures.length) {
                this.dirtyTextures.pop().dirty = false;
            }
        };
        RectTexture.getTexture = function (colors, id) {
            if (id == null) {
                id = '';
                for (var y = 0; y < colors.length; y++) {
                    for (var x = 0; x < colors[y].length; x++) {
                        id += (colors[y][x] || '0') + '_';
                    }
                    id += '|';
                }
            }
            var size = colors.length + '_' + colors[0].length;
            var txt = this.curTextures[size];
            if (!txt || txt.isFull) {
                txt = this.curTextures[size] = new RectTexture(256, 256);
            }
            return txt.getColor(colors, id);
        };
        /**
         * 格式化颜色，例如
         * 16711680,65280
         * 000
         * 010
         * 000
         * 第一排定义颜色，以,(英文逗号)分割
         * 下面是颜色矩阵，01代表颜色序列
         * @param str
         */
        RectTexture.formatColors = function (str) {
            var lines = str.split('\n');
            var colorsStr = lines[0].split(",");
            var colors = [];
            for (var i = 0; i < colorsStr.length; i++) {
                colors[i] = +colorsStr[i];
            }
            var blocks = [];
            for (var i = 1; i < lines.length; i++) {
                blocks[i - 1] = [];
                for (var c = 0; c < lines[i].length; c++) {
                    blocks[i - 1][c] = colors[+lines[i][c]];
                }
            }
            return blocks;
        };
        /**
         * @internal
         */
        RectTexture.curTextures = {};
        /**
         * @internal
         */
        RectTexture.colors = {};
        return RectTexture;
    }(leaf.DrawTexture));
    leaf.RectTexture = RectTexture;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    /**
     * 单个文字信息比如字母 a 就对应一个 TextAtlasInfo，字母 b 又是另外一个 TextAtlasInfo
     */
    var TextAtlasInfo = /** @class */ (function () {
        function TextAtlasInfo(texture, x, y, width, height, char) {
            this._texture = texture;
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            this._char = char;
        }
        Object.defineProperty(TextAtlasInfo.prototype, "char", {
            get: function () {
                return this._char;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextAtlasInfo.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextAtlasInfo.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextAtlasInfo.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextAtlasInfo.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextAtlasInfo.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        return TextAtlasInfo;
    }());
    leaf.TextAtlasInfo = TextAtlasInfo;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    /**
     * 文本内容管理(主要是文本纹理管理)
     * 一个 TextAtlas 对应一种 fontColor、fontFamily、fontSize、bold、italic，这些值只要一个改变就会创建不同的 TextAtlas
     * 文字在 Texture 是按照从上到下、从左到右一个个拍的，每一行文字的纹理高度取最高的那个，然后紧接着排下一行文字纹理。
     * 一张文字纹理的大小目前是 512 x 512，排满后会申请一个新的纹理来存储新的文字纹理。
     * 如果想看当前有哪些文字纹理的话可以打开 addNewTexture() 里的 document.body.appendChild(this.canvas); 就可以了。
     */
    var TextAtlas = /** @class */ (function () {
        function TextAtlas(fontColor, fontFamily, fontSize, bold, italic) {
            this.size = 512;
            this.startX = 0;
            this.startY = 0;
            this.dirtyTextures = [];
            this.dirtyTextureIds = {};
            this.dirtyCanvas = [];
            this.lineHeight = 0;
            this.dirty = false;
            this.chars = {};
            this._fontColor = fontColor;
            this._fontFamily = fontFamily;
            this._fontSize = fontSize;
            this._bold = bold;
            this._italic = italic;
            this.charHeight = fontSize;
            this.addNewTexture();
        }
        Object.defineProperty(TextAtlas.prototype, "fontColor", {
            get: function () {
                return this._fontColor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextAtlas.prototype, "fontFamily", {
            get: function () {
                return this._fontFamily;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextAtlas.prototype, "fontSize", {
            get: function () {
                return this._fontSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextAtlas.prototype, "bold", {
            get: function () {
                return this._bold;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextAtlas.prototype, "italic", {
            get: function () {
                return this._italic;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加一张新的纹理用于存储文字纹理
         */
        TextAtlas.prototype.addNewTexture = function () {
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.canvas.height = this.size;
            this.context2d = this.canvas.getContext("2d");
            this.context2d.clearRect(0, 0, this.size, this.size);
            this.context2d.scale(1, 1);
            this.context2d.textAlign = "left";
            this.context2d.textBaseline = "top";
            this.context2d.font = (this._bold ? "bold " : "") + (this._italic ? "italic " : "") + this._fontSize + "px " + this._fontFamily;
            this.context2d.fillStyle = this._fontColor;
            this.texture = leaf.GLCore.createTexture(this.canvas);
            this.startX = this.startY = 0;
            this.lineHeight = 0;
            //document.body.appendChild(this.canvas);
        };
        /**
         * 获取文字信息
         * 有新的文字信息后不会立马更新对应的 Texture，会在第一个 Canvas 绘制(render)时更新
         * @param char
         * @param realTime
         * @returns {any}
         */
        TextAtlas.prototype.getChar = function (char, realTime) {
            if (!this.chars[char]) {
                var context2d = leaf.GLCore.$shareContext2D;
                context2d.font = (this._bold ? "bold " : "") + (this._italic ? "italic " : "") + this._fontSize + "px " + this._fontFamily;
                //由于中文文字也会超出基线下方，字体每大 50 号多一像素
                var charHeight = Math.ceil(this.charHeight * 1.02);
                //gjpqy会超出基线下方，字体每大 5 号多一像素
                if (char == "g" || char == "j" || char == "p" || char == "q" || char == "y") {
                    charHeight = Math.ceil(this.charHeight * 1.2);
                }
                //Q会超出基线下方，字体每大 15 号多一像素
                if (char == "Q") {
                    charHeight += Math.ceil(this.charHeight * 0.066);
                }
                var w = leaf.GLCore.$shareContext2D.measureText(char).width;
                if (w + this.startX > this.size) {
                    this.startX = 0;
                    this.startY += this.lineHeight;
                    this.lineHeight = 0;
                }
                if (this.startY + charHeight > this.size) {
                    this.addNewTexture();
                }
                if (charHeight > this.lineHeight) {
                    this.lineHeight = charHeight;
                }
                //产生一个新的文字信息
                this.chars[char] = new leaf.TextAtlasInfo(new leaf.Texture(this.texture, this.size, this.size, this.startX, this.startY, Math.ceil(w), charHeight), this.startX, this.startY, w, charHeight, char);
                this.context2d.fillText(char, this.startX, this.startY);
                this.startX += Math.ceil(w);
                if (!this.dirtyTextureIds[this.texture["id"]]) {
                    this.dirtyTextureIds[this.texture["id"]] = true;
                    this.dirtyTextures.push(this.texture);
                    this.dirtyCanvas.push(this.canvas);
                }
                if (realTime) {
                    this.update();
                }
                else {
                    if (!this.dirty) {
                        TextAtlas.updateList.push(this);
                        this.dirty = true;
                    }
                }
            }
            return this.chars[char];
        };
        /**
         * 更新对应的纹理
         */
        TextAtlas.prototype.update = function () {
            if (this.dirtyTextures.length) {
                while (this.dirtyTextures.length) {
                    var texture = this.dirtyTextures.pop();
                    delete this.dirtyTextureIds[texture["id"]];
                    leaf.GLCore.updateTexture(texture, this.dirtyCanvas.pop());
                }
            }
            this.dirty = false;
        };
        /**
         * @internal
         */
        TextAtlas.$checkUpdate = function () {
            while (TextAtlas.updateList.length) {
                TextAtlas.updateList.pop().update();
            }
        };
        TextAtlas.getChar = function (fontColor, fontFamily, fontSize, bold, italic, char, realTime) {
            var key = fontColor + "_" + fontFamily + "_" + fontSize + "_" + (bold ? "1" : "0") + (italic ? "1" : "0");
            if (!TextAtlas.atlases[key]) {
                TextAtlas.atlases[key] = new TextAtlas(fontColor, fontFamily, fontSize, bold, italic);
            }
            return TextAtlas.atlases[key].getChar(char, realTime);
        };
        TextAtlas.updateList = [];
        TextAtlas.atlases = {};
        return TextAtlas;
    }());
    leaf.TextAtlas = TextAtlas;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Texture = /** @class */ (function () {
        function Texture(texture, width, height, sourceX, sourceY, sourceWidth, sourceHeight) {
            this._id = 0;
            /**
             * @internal
             */
            this.dirty = false;
            this._texture = texture;
            this._width = +width | 0;
            this._height = +height | 0;
            this._sourceX = +sourceX | 0;
            this._sourceY = +sourceY | 0;
            this._sourceWidth = +sourceWidth | 0;
            this._sourceHeight = +sourceHeight | 0;
            if (!this._sourceWidth) {
                this._sourceWidth = this._width;
            }
            if (!this._sourceHeight) {
                this._sourceHeight = this._height;
            }
            this._startX = this._sourceX / this._width;
            this._startY = this._sourceY / this._height;
            this._endX = (this._sourceX + this._sourceWidth) / this._width;
            this._endY = (this._sourceY + this._sourceHeight) / this._height;
            this._id = Texture.id;
            Texture.id++;
        }
        Object.defineProperty(Texture.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            set: function (val) {
                this._texture = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (val) {
                this._width = +val | 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (val) {
                this._height = +val | 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "sourceX", {
            get: function () {
                return this._sourceX;
            },
            set: function (val) {
                this._sourceX = +val | 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "sourceY", {
            get: function () {
                return this._sourceY;
            },
            set: function (val) {
                this._sourceY = +val | 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "sourceWidth", {
            get: function () {
                return this._sourceWidth;
            },
            set: function (val) {
                this._sourceWidth = +val | 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "sourceHeight", {
            get: function () {
                return this._sourceHeight;
            },
            set: function (val) {
                this._sourceHeight = +val | 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "startX", {
            get: function () {
                return this._startX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "startY", {
            get: function () {
                return this._startY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "endX", {
            get: function () {
                return this._endX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "endY", {
            get: function () {
                return this._endY;
            },
            enumerable: true,
            configurable: true
        });
        Texture.prototype.destroy = function () {
            // Stage.$webgl.deleteTexture(this._texture);
            leaf.GLCore.gl.deleteTexture(this._texture);
            this._texture = null;
            this.dirty = false;
        };
        Texture.id = 0;
        return Texture;
    }());
    leaf.Texture = Texture;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var TouchComponent = /** @class */ (function (_super) {
        __extends(TouchComponent, _super);
        function TouchComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.onTouchStart = new ecs.Broadcast();
            _this.onTouchMove = new ecs.Broadcast();
            _this.onTouchEnd = new ecs.Broadcast();
            _this.touchEnabled = true;
            _this.touchChildrenEnabled = true;
            _this.stopChildrenEvent = false;
            return _this;
        }
        TouchComponent.prototype.onDestroy = function () {
            this.touchEnabled = this.touchChildrenEnabled = true;
            this.onTouchStart.removeAll();
            this.onTouchMove.removeAll();
            this.onTouchEnd.removeAll();
        };
        TouchComponent.allowMultiply = false;
        return TouchComponent;
    }(ecs.Component));
    leaf.TouchComponent = TouchComponent;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var TouchEvent = /** @class */ (function () {
        function TouchEvent() {
        }
        return TouchEvent;
    }());
    leaf.TouchEvent = TouchEvent;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var TouchManager = /** @class */ (function () {
        function TouchManager() {
        }
        TouchManager.start = function (touchId, touchX, touchY) {
            if (!leaf.world)
                return;
            var target = this.findTarget(touchX, touchY, leaf.world.root) || leaf.world.root;
            var e = new leaf.TouchEvent();
            e.touchId = touchId;
            var m = leaf.world.root.transform.reverse;
            // e.stageX = m.a * touchX + m.c * touchY + m.tx;
            // e.stageY = m.b * touchX + m.d * touchY + m.ty;
            e.target = target;
            this.dispatchTouchEvent(e, target, touchX, touchY, "start");
        };
        TouchManager.move = function (touchId, touchX, touchY) {
            if (!leaf.world)
                return;
            var target = this.findTarget(touchX, touchY, leaf.world.root) || leaf.world.root;
            var e = new leaf.TouchEvent();
            e.touchId = touchId;
            var m = leaf.world.root.transform.reverse;
            // e.stageX = m.a * touchX + m.c * touchY + m.tx;
            // e.stageY = m.b * touchX + m.d * touchY + m.ty;
            e.target = target;
            this.dispatchTouchEvent(e, target, touchX, touchY, "move");
        };
        TouchManager.end = function (touchId, touchX, touchY) {
            if (!leaf.world)
                return;
            var target = this.findTarget(touchX, touchY, leaf.world.root) || leaf.world.root;
            var e = new leaf.TouchEvent();
            e.touchId = touchId;
            var m = leaf.world.root.transform.reverse;
            // e.stageX = m.a * touchX + m.c * touchY + m.tx;
            // e.stageY = m.b * touchX + m.d * touchY + m.ty;
            e.target = target;
            this.dispatchTouchEvent(e, target, touchX, touchY, "end");
        };
        TouchManager.dispatchTouchEvent = function (e, target, touchX, touchY, type) {
            var list = [];
            var locals = [];
            while (target) {
                list.push(target);
                target = target.parent;
            }
            var startIndex = -1;
            for (var i = list.length - 1, x = 0, y = 0; i >= 0; i--) {
                var m = list[i].transform.reverse;
                // x = m.a * (touchX + m.tx) + m.c * touchY;
                // y = m.b * touchX + m.d * (touchY + m.ty);
                touchX = x;
                touchY = y;
                locals.push([x, y]);
                if (startIndex === -1) {
                    if (list[i].getComponent(leaf.TouchComponent) && list[i].getComponent(leaf.TouchComponent).stopChildrenEvent) {
                        startIndex = i;
                    }
                }
            }
            for (var i = 0; i < list.length; i++) {
                if (startIndex != -1 && i < startIndex)
                    continue;
                e.localX = locals[list.length - 1 - i][0];
                e.localY = locals[list.length - 1 - i][1];
                e.currentTarget = list[i];
                var tc = list[i].getComponent(leaf.TouchComponent);
                if (tc) {
                    if (type === 'start')
                        tc.onTouchStart.dispatch(e);
                    else if (type === 'move')
                        tc.onTouchMove.dispatch(e);
                    else if (type === 'end')
                        tc.onTouchEnd.dispatch(e);
                }
            }
        };
        TouchManager.findTarget = function (touchX, touchY, checkEntity) {
            var m = checkEntity.transform.reverse;
            var x; // = m.a * (touchX + m.tx) + m.c * touchY;
            var y; // = m.b * touchX + m.d * (touchY + m.ty);
            var t = checkEntity.getComponent(leaf.TouchComponent);
            if (!t || t.touchChildrenEnabled) {
                for (var i = checkEntity.children.length - 1; i >= 0; i--) {
                    var target = this.findTarget(x, y, checkEntity.children[i]);
                    if (target) {
                        return target;
                    }
                }
            }
            if (!t || t.touchEnabled) {
                var render = checkEntity.getComponent(leaf.Render);
                if (render && render.width && render.height &&
                    x >= 0 && x < render.width && y >= 0 && y < render.height) {
                    return checkEntity;
                }
            }
        };
        return TouchManager;
    }());
    leaf.TouchManager = TouchManager;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var ListItemRenderer = /** @class */ (function (_super) {
        __extends(ListItemRenderer, _super);
        function ListItemRenderer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListItemRenderer.prototype.onDestroy = function () {
            this.data = null;
        };
        return ListItemRenderer;
    }(ecs.Component));
    leaf.ListItemRenderer = ListItemRenderer;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(List.prototype, "viewPort", {
            get: function () {
                return this.listRoot.transform;
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.init = function (data, itemRenderClass, width, height, virtual) {
            if (virtual === void 0) { virtual = true; }
            this._data = data;
            this.itemRenderClass = itemRenderClass;
            this.width = width;
            this.height = height;
            this.virtual = virtual;
            this.items = [];
            this.listRoot = ecs.Entity.create();
            this.listRoot.parent = this.entity;
            this.addComponent(leaf.RectMask, 0, 0, width, height);
        };
        Object.defineProperty(List.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (val) {
                this.viewPort.y = 0;
                this._data = val;
                this.updateContentRect();
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.awake = function () {
            this.updateContentRect();
            this.refresh();
        };
        List.prototype.updateContentRect = function () {
            this.contentWidth = this.contentHeight = 0;
            var layout = this.getComponent(leaf.Layout);
            if (!layout)
                return;
            var endX = 0;
            var endY = 0;
            for (var i = 0; i < this._data.length; i++) {
                if (layout) {
                    var p = layout.getPosition(i, this._data.length, this.width, this.height);
                    if (i === 0) {
                        this.contentWidth = layout.itemWidth;
                        this.contentHeight = layout.itemHeight;
                        endX = p.x + layout.itemWidth;
                        endY = p.y = layout.itemHeight;
                    }
                    else {
                        if (p.x + layout.itemWidth > endX)
                            endX = p.x + layout.itemWidth;
                        if (p.y + layout.itemHeight > endY)
                            endY = p.y + layout.itemHeight;
                    }
                }
            }
            this.contentWidth = endX;
            this.contentHeight = endY;
        };
        List.prototype.refresh = function () {
            if (this.virtual) {
                var layout = this.getComponent(leaf.Layout);
                var index = 0;
                for (var i = 0; i < this._data.length; i++) {
                    if (layout) {
                        var p = layout.getPosition(i, this._data.length, this.width, this.height);
                        p.x += this.viewPort.x;
                        p.y += this.viewPort.y;
                        if (p.x + layout.itemWidth < 0 || p.x > this.width || p.y + layout.itemHeight < 0 || p.y > this.height) {
                            for (var f = 0; f < this.items.length; f++) {
                                if (this.items[f].data === this._data[i]) {
                                    var item_1 = this.items.splice(f, 1)[0];
                                    item_1.entity.destroy();
                                    break;
                                }
                            }
                            continue;
                        }
                    }
                    var item = void 0;
                    for (var f = 0; f < this.items.length; f++) {
                        if (this.items[f].data === this._data[i]) {
                            if (f != index) {
                                item = this.items.splice(f, 1)[0];
                                this.items.splice(index, 0, item);
                            }
                            else {
                                item = this.items[f];
                            }
                            break;
                        }
                    }
                    if (!item) {
                        if (this.items[index]) {
                            this.items[this.items.length] = this.items[index];
                        }
                        item = ecs.Entity.create().addComponent(this.itemRenderClass);
                        item.data = null;
                        item.parent = this.listRoot;
                        this.items[index] = item;
                    }
                    if (layout)
                        layout.updatePosition(item.entity, i, this._data.length, this.width, this.height);
                    item.data = this._data[i];
                    item.onData(this._data[i]);
                    index++;
                }
            }
            else {
                var layout = this.getComponent(leaf.Layout);
                for (var i = 0; i < this._data.length; i++) {
                    var item = void 0;
                    if (i < this.items.length) {
                        item = this.items[i];
                    }
                    else {
                        item = ecs.Entity.create().addComponent(this.itemRenderClass);
                        item.data = null;
                        item.parent = this.listRoot;
                        this.items[i] = item;
                    }
                    if (layout)
                        layout.updatePosition(item.entity, i, this._data.length, this.width, this.height);
                    item.data = this._data[i];
                    item.onData(this._data[i]);
                }
            }
            while (this.items.length > this._data.length) {
                this.items.pop().entity.destroy();
            }
        };
        List.prototype.onDestroy = function () {
            this._data = null;
            this.itemRenderClass = null;
            this.items = null;
        };
        return List;
    }(ecs.Component));
    leaf.List = List;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Scroller = /** @class */ (function (_super) {
        __extends(Scroller, _super);
        function Scroller() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.startGapH = 30;
            _this.startGapV = 30;
            _this.speedH = 1;
            _this.speedV = 1;
            return _this;
        }
        Scroller.prototype.init = function (target, scrollHEnable, scrollVEnable) {
            if (scrollHEnable === void 0) { scrollHEnable = true; }
            this.target = target;
            this.onTouchStart.on(this.touchStart, this);
            this.onTouchMove.on(this.touchMove, this);
            this.onTouchEnd.on(this.touchEnd, this);
            this.scrollHEnable = scrollHEnable;
            this.scrollVEnable = scrollVEnable;
            this.startScrollV = false;
            this.startScrollH = false;
            this.scrollReady = false;
            this.speedH = this.speedV = 1;
            this.startGapV = this.startGapH = 30;
        };
        Scroller.prototype.touchStart = function (e) {
            if (!this.target.viewPort) {
                this.scrollReady = false;
                return;
            }
            this.startScrollV = false;
            this.startScrollH = false;
            this.startX = this.target.viewPort.x;
            this.startY = this.target.viewPort.y;
            this.startLocalX = e.localX;
            this.startLocalY = e.localY;
            this.scrollReady = true;
            this.stopChildrenEvent = false;
        };
        Scroller.prototype.touchMove = function (e) {
            if (!this.scrollReady || !this.target.viewPort)
                return;
            if (this.scrollHEnable) {
                if (!this.startScrollH) {
                    if (Math.abs(e.localX - this.startLocalX) > this.startGapH) {
                        this.stopChildrenEvent = true;
                        this.startScrollH = true;
                        this.startX = this.target.viewPort.x;
                        this.startLocalX = e.localX;
                    }
                }
                if (this.startScrollH) {
                    this.target.viewPort.x = (e.localX - this.startLocalX) * this.speedH + this.startX;
                    this.checkRange();
                    this.target.refresh && this.target.refresh();
                }
            }
            if (this.scrollVEnable) {
                if (!this.startScrollV) {
                    if (Math.abs(e.localY - this.startLocalY) > this.startGapV) {
                        this.stopChildrenEvent = true;
                        this.startScrollV = true;
                        this.startY = this.target.viewPort.y;
                        this.startLocalY = e.localY;
                    }
                }
                if (this.startScrollV) {
                    this.target.viewPort.y = (e.localY - this.startLocalY) * this.speedV + this.startY;
                    this.checkRange();
                    this.target.refresh && this.target.refresh();
                }
            }
        };
        Scroller.prototype.touchEnd = function (e) {
            this.scrollReady = false;
            this.startScrollV = false;
            this.startScrollH = false;
            this.stopChildrenEvent = false;
        };
        Scroller.prototype.checkRange = function () {
            if (!this.target.viewPort)
                return;
            if (this.scrollVEnable && this.target.viewPort.y + this.target.contentHeight < this.target.height) {
                this.target.viewPort.y = this.target.height - this.target.contentHeight;
            }
            if (this.scrollVEnable && this.target.viewPort.y > 0)
                this.target.viewPort.y = 0;
            if (this.scrollHEnable && this.target.viewPort.x + this.target.contentWidth < this.target.width) {
                this.target.viewPort.x = this.target.width - this.target.contentWidth;
            }
            if (this.scrollHEnable && this.target.viewPort.x > 0)
                this.target.viewPort.x = 0;
        };
        return Scroller;
    }(leaf.TouchComponent));
    leaf.Scroller = Scroller;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Layout = /** @class */ (function (_super) {
        __extends(Layout, _super);
        function Layout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Layout;
    }(ecs.Component));
    leaf.Layout = Layout;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var HorizontalLayout = /** @class */ (function (_super) {
        __extends(HorizontalLayout, _super);
        function HorizontalLayout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(HorizontalLayout.prototype, "itemWidth", {
            get: function () {
                return this.itemSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HorizontalLayout.prototype, "itemHeight", {
            get: function () {
                return this.itemHeight;
            },
            enumerable: true,
            configurable: true
        });
        HorizontalLayout.prototype.init = function (itemSize, gap) {
            if (itemSize === void 0) { itemSize = 0; }
            if (gap === void 0) { gap = 0; }
            this._gap = gap;
            this.itemSize = itemSize;
        };
        HorizontalLayout.prototype.updatePosition = function (item, index, max, width, height) {
            item.transform.x = this.getPosition(index, max, width, height).x;
        };
        HorizontalLayout.prototype.getPosition = function (index, max, width, height) {
            return { x: index * (this.itemSize + this._gap), y: 0 };
        };
        return HorizontalLayout;
    }(leaf.Layout));
    leaf.HorizontalLayout = HorizontalLayout;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var TileLayout = /** @class */ (function (_super) {
        __extends(TileLayout, _super);
        function TileLayout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TileLayout.prototype, "itemWidth", {
            get: function () {
                return this._itemWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "itemHeight", {
            get: function () {
                return this._itemHeight;
            },
            enumerable: true,
            configurable: true
        });
        TileLayout.prototype.init = function (itemWidth, itemHeight, gapv, gaph) {
            if (itemWidth === void 0) { itemWidth = 0; }
            if (gapv === void 0) { gapv = 0; }
            if (gaph === void 0) { gaph = 0; }
            this._gapv = gapv;
            this._gaph = gaph;
            this._itemWidth = itemWidth;
            this._itemHeight = itemHeight;
        };
        TileLayout.prototype.updatePosition = function (item, index, max, width, height) {
            var p = this.getPosition(index, max, width, height);
            item.transform.x = p.x;
            item.transform.y = p.y;
        };
        TileLayout.prototype.getPosition = function (index, max, width, height) {
            var maxWidth = ~~((width + this._gaph) / (this.itemWidth + this._gaph)) || 1;
            return {
                x: (index % maxWidth) * (this.itemWidth + this._gaph),
                y: (~~(index / maxWidth)) * (this.itemHeight + this._gapv)
            };
        };
        return TileLayout;
    }(leaf.Layout));
    leaf.TileLayout = TileLayout;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var VerticalLayout = /** @class */ (function (_super) {
        __extends(VerticalLayout, _super);
        function VerticalLayout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(VerticalLayout.prototype, "itemWidth", {
            get: function () {
                return this.itemSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VerticalLayout.prototype, "itemHeight", {
            get: function () {
                return this.itemHeight;
            },
            enumerable: true,
            configurable: true
        });
        VerticalLayout.prototype.init = function (itemSize, gap) {
            if (itemSize === void 0) { itemSize = 0; }
            if (gap === void 0) { gap = 0; }
            this._gap = gap;
            this.itemSize = itemSize;
        };
        VerticalLayout.prototype.updatePosition = function (item, index, max, width, height) {
            item.transform.y = this.getPosition(index, max, width, height).y;
        };
        VerticalLayout.prototype.getPosition = function (index, max, width, height) {
            return { y: index * (this.itemSize + this._gap), x: 0 };
        };
        return VerticalLayout;
    }(leaf.Layout));
    leaf.VerticalLayout = VerticalLayout;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var KeyBoard = /** @class */ (function (_super) {
        __extends(KeyBoard, _super);
        function KeyBoard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.onPressUp = new ecs.Broadcast();
            _this.onPressDown = new ecs.Broadcast();
            _this.onPressLeft = new ecs.Broadcast();
            _this.onPressRight = new ecs.Broadcast();
            _this.onPressZ = new ecs.Broadcast();
            _this.onPressX = new ecs.Broadcast();
            _this.onKeyDown = function (e) {
                console.log(e.keyCode);
                if (e.keyCode === 87 || e.keyCode === 38) {
                    _this.onPressUp.dispatch();
                }
                else if (e.keyCode === 83 || e.keyCode === 40) {
                    _this.onPressDown.dispatch();
                }
                else if (e.keyCode === 65 || e.keyCode === 37) {
                    _this.onPressLeft.dispatch();
                }
                else if (e.keyCode === 68 || e.keyCode === 39) {
                    _this.onPressRight.dispatch();
                }
                else if (e.keyCode === 90) {
                    _this.onPressZ.dispatch();
                }
                else if (e.keyCode === 88) {
                    _this.onPressX.dispatch();
                }
            };
            return _this;
        }
        KeyBoard.prototype.awake = function () {
            window.onkeydown = this.onKeyDown;
        };
        KeyBoard.prototype.onDestroy = function () {
            if (window.onkeydown === this.onKeyDown)
                window.onkeydown = null;
            this.onPressUp.removeAll();
            this.onPressDown.removeAll();
            this.onPressLeft.removeAll();
            this.onPressRight.removeAll();
        };
        return KeyBoard;
    }(ecs.Component));
    leaf.KeyBoard = KeyBoard;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var StateWin = /** @class */ (function (_super) {
        __extends(StateWin, _super);
        function StateWin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StateWin.prototype.awake = function () {
            this.transform.alpha = 0.8;
            this.addComponent(leaf.Label).fontSize = 16;
            this.getComponent(leaf.Label).lineSpacing = 3;
            this.transform.scaleX = this.transform.scaleY = 1 / leaf.GLCore.scale;
            this.addComponent(leaf.TouchComponent).touchChildrenEnabled = false;
        };
        StateWin.prototype.lateUpdate = function () {
            var txt = "fps          " + leaf.runInfo.fps + "\n";
            txt += "draw call  " + leaf.runInfo.frameDrawCall + "\n";
            txt += "count       " + leaf.runInfo.frameDrawCount + "\n";
            // txt += `frameTime:${runInfo.frameTime}\n`;
            txt += "logic        " + leaf.runInfo.frameLogicTime + "\n";
            // txt += `renderTime:${runInfo.frameRenderTime}\n`;
            txt += "render      " + leaf.runInfo.framePreRenderTime + "\n";
            txt += "webgl       " + leaf.runInfo.frameGlRenderTime + "\n";
            this.getComponent(leaf.Label).text = txt;
            this.transform.y = (leaf.GLCore.height - 111) / leaf.GLCore.scale;
        };
        StateWin.show = function () {
            if (this.ist)
                return;
            this.ist = ecs.Entity.create().addComponent(StateWin);
            this.ist.parent = leaf.world.root;
        };
        StateWin.hide = function () {
            if (this.ist)
                this.ist.entity.destroy();
        };
        return StateWin;
    }(ecs.Component));
    leaf.StateWin = StateWin;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var XPromise = /** @class */ (function () {
        function XPromise() {
            var _this = this;
            this.state = 0;
            /**
             * @internal
             * @param t
             */
            this.onComplete = function (t) {
                _this.state = 1;
                _this.args = t;
                var r = _this.resolve;
                _this.resolve = null;
                _this.reject = null;
                // ecs.ObjectPools.releaseRecyableObject(this);
                if (r) {
                    r(t);
                }
            };
            /**
             * @internal
             * @param reason
             */
            this.onFail = function (reason) {
                _this.state = 2;
                _this.args = reason;
                var r = _this.reject;
                _this.resolve = null;
                _this.reject = null;
                // ecs.ObjectPools.releaseRecyableObject(this);
                if (r) {
                    r(reason);
                }
            };
        }
        XPromise.prototype.init = function (call) {
            this.state = 0;
            this.resolve = null;
            this.reject = null;
            call(this.onComplete, this.onFail);
        };
        XPromise.prototype.then = function (resolve) {
            if (this.state) {
                if (this.state === 1) {
                    resolve(this.args);
                }
            }
            else {
                this.resolve = resolve;
            }
            return this;
        };
        XPromise.prototype.catch = function (reject) {
            if (this.state) {
                if (this.state === 2) {
                    reject(this.args);
                }
            }
            else {
                this.reject = reject;
            }
            return this;
        };
        return XPromise;
    }());
    leaf.XPromise = XPromise;
})(leaf || (leaf = {}));
//# sourceMappingURL=leaf.js.map