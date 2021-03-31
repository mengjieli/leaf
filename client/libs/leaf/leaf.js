var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var leaf;
(function (leaf) {
    leaf.debug = false;
    leaf.runInfo = {
        frame: 0,
        runTime: 0,
        drawCall: 0,
        drawCount: 0,
        fps: 0,
        fpsTime: 0,
        fpsDrawCall: 0,
        fpsDrawCount: 0,
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
    var onTick;
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
        leaf.world.addSystem(leaf.RenderSystem, [leaf.Render]);
        var t = 0;
        var lastTime = Date.now();
        var lastFrame = 0;
        var lastDraCall = 0;
        var lastDrawCount = 0;
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
            leaf.world.update();
            requestAnimationFrame.call(window, onTick);
            var end = Date.now();
            t += end - now;
            leaf.runInfo.frame++;
            leaf.runInfo.runTime += end - now;
            if (end - lastTime >= 1000) {
                leaf.runInfo.fps = (~~(10 * (leaf.runInfo.frame - lastFrame) * 1000 / (end - lastTime))) / 10;
                leaf.runInfo.fpsTime = (~~(10 * t / (leaf.runInfo.frame - lastFrame))) / 10;
                leaf.runInfo.fpsDrawCall = (~~((leaf.runInfo.drawCall - lastDraCall) / (leaf.runInfo.frame - lastFrame)));
                leaf.runInfo.fpsDrawCount = (~~((leaf.runInfo.drawCount - lastDrawCount) / (leaf.runInfo.frame - lastFrame)));
                lastFrame = leaf.runInfo.frame;
                lastDraCall = leaf.runInfo.drawCall;
                lastDrawCount = leaf.runInfo.drawCount;
                lastTime = end;
                t = 0;
            }
        };
        requestAnimationFrame.call(window, onTick);
        return leaf.world;
    }
    leaf.init = init;
})(leaf || (leaf = {}));
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
        GLCore.init = function () {
            var canvas = (window["canvas"] || document.getElementById('leaf'));
            this.width = canvas.width;
            this.height = canvas.height;
            var names = ["experimental-webgl", "webgl"];
            var options = { "antialias": true, "stencil": true };
            var gl;
            for (var i = 0; i < names.length; i++) {
                try {
                    gl = canvas.getContext(names[i], options);
                    gl.colorMask(true, true, true, true);
                    gl.viewport(0, 0, GLCore.width, GLCore.height);
                    gl.disable(gl.DEPTH_TEST);
                    gl.disable(gl.CULL_FACE);
                    gl.enable(gl.BLEND);
                    gl.enable(gl.STENCIL_TEST);
                    gl.blendColor(1.0, 1.0, 1.0, 1.0);
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
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
        GLCore.scale = 1;
        return GLCore;
    }());
    leaf.GLCore = GLCore;
})(leaf || (leaf = {}));
window["leaf"] = leaf;
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
            var e_1, _a;
            var gl = leaf.GLCore.gl;
            leaf.BlendModeFunc.changeBlendMode(leaf.BlendMode.NORMAL);
            //绑定舞台的渲染纹理。
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            //清除舞台，这句如果和 3d 合并之后应该去掉
            gl.clear(gl.COLOR_BUFFER_BIT);
            var tasks = [];
            for (var node = this.query.head; node; node = node.next) {
                var rd = node.value.getComponent(leaf.Render);
                var tk = rd.shader;
                if (tasks.indexOf(tk) === -1)
                    tasks.push(tk);
                rd.preRender();
            }
            leaf.TextAtlas.$checkUpdate();
            try {
                for (var tasks_1 = __values(tasks), tasks_1_1 = tasks_1.next(); !tasks_1_1.done; tasks_1_1 = tasks_1.next()) {
                    var task = tasks_1_1.value;
                    task.render();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (tasks_1_1 && !tasks_1_1.done && (_a = tasks_1.return)) _a.call(tasks_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
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
            return _this;
        }
        Render.prototype.onDestroy = function () {
        };
        Render.allowMultiply = false;
        return Render;
    }(ecs.Component));
    leaf.Render = Render;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Bitmap = /** @class */ (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shader = Bitmap.shader;
            _this._tint = 0xffffff;
            return _this;
        }
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
        Bitmap.prototype.preRender = function () {
            if (!this._texture)
                return;
            this.shader.addTask(this.texture, this.entity.transform.worldMatrix, this.entity.transform.worldAlpha, this.blendMode, this._tint);
        };
        Bitmap.prototype.onDestroy = function () {
            this.texture = null;
            if (this._res)
                this._res.removeCount();
            this._resource = this._res = null;
            this._tint = 0xffffff;
            _super.prototype.onDestroy.call(this);
        };
        Object.defineProperty(Bitmap, "shader", {
            get: function () {
                if (!this._shader) {
                    this._shader = new leaf.BitmapShaderTask5();
                }
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        return Bitmap;
    }(leaf.Render));
    leaf.Bitmap = Bitmap;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shader = leaf.Bitmap.shader;
            _this._text = "";
            _this._fontColor = 0xffffff;
            _this._fontFamily = "sans-serif";
            _this._fontSize = 30;
            _this._bold = false;
            _this._italic = false;
            _this._lineSpacing = 5;
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
            var x = 0;
            var y = 0;
            var m = ecs.Matrix.$matrix;
            var w = this.entity.transform.worldMatrix;
            var scale = Label.useScaleFont ? leaf.GLCore.scale : 1;
            var rScale = 1 / scale;
            var toSize = Math.ceil(this._fontSize * scale);
            scale = toSize / this._fontSize;
            var r = this._fontColor >> 16;
            var g = this._fontColor >> 8 & 0xFF;
            var b = this._fontColor & 0xFF;
            for (var i = 0; i < this._text.length; i++) {
                var char = this._text.charAt(i);
                if (char == "\n" || char == "\r") {
                    x = 0;
                    y += (this.fontSize + this._lineSpacing) * rScale;
                    continue;
                }
                var txt = leaf.TextAtlas.getChar("rgb(" + r + "," + g + "," + b + ")", this._fontFamily, toSize, this._bold, this._italic, char, false);
                m.identity();
                m.scale(rScale, rScale);
                m.translate(x, y);
                m.concat(w);
                this.shader.addTask(txt.texture, m, this.entity.transform.worldAlpha, this.blendMode, 0xffffff);
                x += txt.width * rScale;
            }
        };
        Label.prototype.onDestroy = function () {
            this._text = "";
            this._fontColor = 0xffffff;
            this._fontFamily = "sans-serif";
            this._fontSize = 30;
            this._bold = false;
            this._italic = false;
            this._lineSpacing = 5;
        };
        Label.useScaleFont = false;
        return Label;
    }(leaf.Render));
    leaf.Label = Label;
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
            var e_2, _a;
            var nrs = {};
            for (var k in replayRecords) {
                try {
                    for (var _b = __values(replayRecords[k]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var r = _c.value;
                        r.frame--;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
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
            var e_3, _a;
            for (var k in this.records) {
                try {
                    for (var _b = __values(this.records[k]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var r = _c.value;
                        if (r.id === id)
                            return r;
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
            var e_4, _a, e_5, _b, e_6, _c, e_7, _d, e_8, _e;
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
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                }
                finally { if (e_4) throw e_4.error; }
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
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                        }
                        finally { if (e_6) throw e_6.error; }
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
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                }
                finally { if (e_5) throw e_5.error; }
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
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                }
                finally { if (e_7) throw e_7.error; }
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
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                }
                finally { if (e_8) throw e_8.error; }
            }
            leaf.debug && console.log("[Res] \u6E05\u9664\u65E0\u7528\u8D44\u6E90\uFF0C\u8FD8\u5269 " + c + " \u4E2A\u8D44\u6E90: " + list);
        };
        Res.getAliveResources = function () {
            var e_9, _a, e_10, _b, e_11, _c, e_12, _d;
            var list = [];
            try {
                for (var _e = __values(this.singleTexutres), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var txt = _f.value;
                    if (txt.hasLoaded) {
                        leaf.debug && list.push(txt.name);
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_9) throw e_9.error; }
            }
            try {
                for (var _g = __values(this.spriteSheets), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var txt = _h.value;
                    if (txt.hasLoaded) {
                        leaf.debug && list.push(txt.name);
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_10) throw e_10.error; }
            }
            try {
                for (var _j = __values(this.texts), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var txt = _k.value;
                    if (txt.hasLoaded) {
                        leaf.debug && list.push(txt.name);
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_11) throw e_11.error; }
            }
            try {
                for (var _l = __values(this.jsons), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var txt = _m.value;
                    if (txt.hasLoaded) {
                        leaf.debug && list.push(txt.name);
                    }
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_12) throw e_12.error; }
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
                    var e_13, _a, e_14, _b;
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
                                catch (e_14_1) { e_14 = { error: e_14_1 }; }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                    }
                                    finally { if (e_14) throw e_14.error; }
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
                    catch (e_13_1) { e_13 = { error: e_13_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_13) throw e_13.error; }
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
        return Shader;
    }());
    leaf.Shader = Shader;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    leaf.$size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;
    var BitmapShaderTask = /** @class */ (function (_super) {
        __extends(BitmapShaderTask, _super);
        function BitmapShaderTask() {
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
        BitmapShaderTask.prototype.initProgram = function () {
            var gl = leaf.GLCore.gl;
            var vertexSource = "\n             attribute vec2 a_TexCoord;\n             attribute vec4 a_Position;\n             attribute float a_Alpha;\n             attribute float a_Sampler;\n             uniform mat4 u_PMatrix;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             void main(void)\n             {\n                gl_Position = u_PMatrix*a_Position;\n                v_TexCoord = a_TexCoord;\n                v_Alpha = a_Alpha;\n                v_Sampler = a_Sampler;\n             }\n             ";
            var fragmentSource = "\n             precision mediump float;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             uniform sampler2D u_Sampler0;\n             uniform sampler2D u_Sampler1;\n             uniform sampler2D u_Sampler2;\n             uniform sampler2D u_Sampler3;\n             uniform sampler2D u_Sampler4;\n             uniform sampler2D u_Sampler5;\n             uniform sampler2D u_Sampler6;\n             uniform sampler2D u_Sampler7;\n             void main(void)\n             {\n                if(v_Sampler == 0.0) {\n                    gl_FragColor = texture2D(u_Sampler0,v_TexCoord)*v_Alpha;\n                } else if(v_Sampler == 1.0) {\n                    gl_FragColor = texture2D(u_Sampler1,v_TexCoord)*v_Alpha;\n                } else if(v_Sampler == 2.0) {\n                    gl_FragColor = texture2D(u_Sampler2,v_TexCoord)*v_Alpha;\n                } else if(v_Sampler == 3.0) {\n                    gl_FragColor = texture2D(u_Sampler3,v_TexCoord)*v_Alpha;\n                } else if(v_Sampler == 4.0) {\n                    gl_FragColor = texture2D(u_Sampler4,v_TexCoord)*v_Alpha;\n                } else if(v_Sampler == 5.0) {\n                    gl_FragColor = texture2D(u_Sampler5,v_TexCoord)*v_Alpha;\n                } else if(v_Sampler == 6.0) {\n                    gl_FragColor = texture2D(u_Sampler6,v_TexCoord)*v_Alpha;\n                } else if(v_Sampler == 7.0) {\n                    gl_FragColor = texture2D(u_Sampler7,v_TexCoord)*v_Alpha;\n                }\n             }\n             ";
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
        BitmapShaderTask.prototype.initAttriLocation = function () {
            var gl = leaf.GLCore.gl;
            var projectionMatrix = this.projectionMatrix;
            projectionMatrix[0] = 2 / leaf.GLCore.width;
            projectionMatrix[5] = -2 / leaf.GLCore.height;
            var program = this.program;
            program["name"] = "bitmap program";
            gl.useProgram(this.program);
            if (!this.buffer) {
                this.buffer = gl.createBuffer();
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
            this.u_Samplers = [];
            for (var i = 0; i < 8; i++) {
                this.u_Samplers[i] = gl.getUniformLocation(program, "u_Sampler" + i);
            }
        };
        BitmapShaderTask.prototype.addTask = function (texture, matrix, alpha, blendMode, tint) {
            if (tint === void 0) { tint = 0xffffff; }
            var txtureIndex = this.textures.length ? this.textures[this.textures.length - 1].indexOf(texture.texture) : -1;
            if (!this.textures.length ||
                txtureIndex === -1 &&
                    this.textures[this.textures.length - 1].length >= 8 ||
                this.count.length && this.count[this.count.length - 1] > 512 ||
                this.blendMode[this.blendMode.length - 1] != blendMode) {
                this.textures.push([texture.texture]);
                txtureIndex = 0;
                this.positionData.push([]);
                this.count.push(0);
                this.blendMode.push(blendMode);
            }
            else {
                if (txtureIndex === -1) {
                    txtureIndex = this.textures[this.textures.length - 1].length;
                    this.textures[this.textures.length - 1].push(texture.texture);
                }
            }
            var index = this.count[this.count.length - 1] * 36;
            var positionData = this.positionData[this.positionData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;
            positionData[index] = matrix.b * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;
            positionData[4 + index] = alpha;
            positionData[5 + index] = txtureIndex;
            positionData[24 + index] = positionData[6 + index] = matrix.tx;
            positionData[25 + index] = positionData[7 + index] = matrix.ty;
            positionData[26 + index] = positionData[8 + index] = texture.startX;
            positionData[27 + index] = positionData[9 + index] = texture.startY;
            positionData[28 + index] = positionData[10 + index] = alpha;
            positionData[29 + index] = positionData[11 + index] = txtureIndex;
            positionData[18 + index] = positionData[12 + index] = matrix.a * width + matrix.b * height + matrix.tx;
            positionData[19 + index] = positionData[13 + index] = matrix.c * width + matrix.d * height + matrix.ty;
            positionData[20 + index] = positionData[14 + index] = texture.endX;
            positionData[21 + index] = positionData[15 + index] = texture.endY;
            positionData[22 + index] = positionData[16 + index] = alpha;
            positionData[23 + index] = positionData[17 + index] = txtureIndex;
            positionData[30 + index] = matrix.a * width + matrix.tx;
            positionData[31 + index] = matrix.c * width + matrix.ty;
            positionData[32 + index] = texture.endX;
            positionData[33 + index] = texture.startY;
            positionData[34 + index] = alpha;
            positionData[35 + index] = txtureIndex;
            this.count[this.count.length - 1]++;
        };
        /**
         * 渲染
         */
        BitmapShaderTask.prototype.render = function () {
            var _this = this;
            var gl = leaf.GLCore.gl;
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, leaf.$size * 6, 0);
            gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 2);
            gl.vertexAttribPointer(_this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 4);
            gl.vertexAttribPointer(_this.a_Sampler, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 5);
            //开始渲染任务
            for (var i = 0, len = _this.textures.length; i < len; i++) {
                //切换混合模式
                leaf.BlendModeFunc.changeBlendMode(this.blendMode[i]);
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
                gl.drawArrays(gl.TRIANGLES, 0, 6 * _this.count[i]);
                leaf.runInfo.drawCount += _this.count[i];
                leaf.runInfo.drawCall++;
            }
            this.reset();
        };
        BitmapShaderTask.prototype.reset = function () {
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendMode = [];
        };
        return BitmapShaderTask;
    }(leaf.Shader));
    leaf.BitmapShaderTask = BitmapShaderTask;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    leaf.$size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;
    var BitmapShaderTask5 = /** @class */ (function (_super) {
        __extends(BitmapShaderTask5, _super);
        function BitmapShaderTask5() {
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
        BitmapShaderTask5.prototype.initProgram = function () {
            var gl = leaf.GLCore.gl;
            var vertexSource = "\n             attribute vec2 a_TexCoord;\n             attribute vec4 a_Position;\n             attribute float a_Alpha;\n             attribute float a_Sampler;\n             uniform mat4 u_PMatrix;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             void main(void)\n             {\n                gl_Position = u_PMatrix*a_Position;\n                v_TexCoord = a_TexCoord;\n                v_Alpha = a_Alpha;\n                v_Sampler = a_Sampler;\n             }\n             ";
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
        BitmapShaderTask5.prototype.initAttriLocation = function () {
            var gl = leaf.GLCore.gl;
            var projectionMatrix = this.projectionMatrix;
            projectionMatrix[0] = 2 / leaf.GLCore.width;
            projectionMatrix[5] = -2 / leaf.GLCore.height;
            var program = this.program;
            program["name"] = "bitmap program";
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
        BitmapShaderTask5.prototype.addTask = function (texture, matrix, alpha, blendMode, tint) {
            var txtureIndex = this.textures.length ? this.textures[this.textures.length - 1].indexOf(texture.texture) : -1;
            if (!this.textures.length ||
                txtureIndex === -1 &&
                    this.textures[this.textures.length - 1].length >= 8 ||
                this.count.length && this.count[this.count.length - 1] > 512 ||
                this.blendMode[this.blendMode.length - 1] != blendMode ||
                this.tints[this.tints.length - 1] != tint) {
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
        /**
         * 渲染
         */
        BitmapShaderTask5.prototype.render = function () {
            var _this = this;
            var gl = leaf.GLCore.gl;
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, leaf.$size * 6, 0);
            gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 2);
            gl.vertexAttribPointer(_this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 4);
            gl.vertexAttribPointer(_this.a_Sampler, 1, gl.FLOAT, false, leaf.$size * 6, leaf.$size * 5);
            //开始渲染任务
            for (var i = 0, len = _this.textures.length; i < len; i++) {
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
            this.reset();
        };
        BitmapShaderTask5.prototype.reset = function () {
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendMode = [];
            _this.tints = [];
        };
        return BitmapShaderTask5;
    }(leaf.Shader));
    leaf.BitmapShaderTask5 = BitmapShaderTask5;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    leaf.$size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;
    var BitmapShaderTask2 = /** @class */ (function (_super) {
        __extends(BitmapShaderTask2, _super);
        function BitmapShaderTask2() {
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
        BitmapShaderTask2.prototype.initProgram = function () {
            var gl = leaf.GLCore.gl;
            var vertexSource = "\n             attribute vec2 a_TexCoord;\n             attribute vec4 a_Position;\n             attribute float a_Alpha;\n             attribute float a_Sampler;\n             uniform mat4 u_PMatrix;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             void main(void)\n             {\n                gl_Position = u_PMatrix*a_Position;\n                v_TexCoord = a_TexCoord;\n                v_Alpha = a_Alpha;\n             }\n             ";
            var fragmentSource = "\n             precision mediump float;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             uniform sampler2D u_Sampler;\n             void main(void)\n             {\n                gl_FragColor = texture2D(u_Sampler,v_TexCoord)*v_Alpha;\n             }\n             ";
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
        BitmapShaderTask2.prototype.initAttriLocation = function () {
            var gl = leaf.GLCore.gl;
            var projectionMatrix = this.projectionMatrix;
            projectionMatrix[0] = 2 / leaf.GLCore.width;
            projectionMatrix[5] = -2 / leaf.GLCore.height;
            var program = this.program;
            program["name"] = "bitmap program";
            gl.useProgram(this.program);
            if (!this.buffer) {
                this.buffer = gl.createBuffer();
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            this.a_Position = gl.getAttribLocation(program, "a_Position");
            gl.enableVertexAttribArray(this.a_Position);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, leaf.$size * 5, 0);
            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.enableVertexAttribArray(this.a_TexCoord);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 5, leaf.$size * 2);
            this.a_Alpha = gl.getAttribLocation(program, "a_Alpha");
            gl.enableVertexAttribArray(this.a_Alpha);
            gl.vertexAttribPointer(this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 5, leaf.$size * 4);
            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(this.u_PMatrix, false, projectionMatrix);
        };
        BitmapShaderTask2.prototype.addTask = function (texture, matrix, alpha, blendMode) {
            if (!this.textures.length || this.textures[this.textures.length - 1] != texture.texture ||
                this.blendMode[this.blendMode.length - 1] != blendMode) {
                this.textures.push(texture.texture);
                this.positionData.push([]);
                this.count.push(0);
                this.blendMode.push(blendMode);
            }
            var index = this.count[this.count.length - 1] * 30;
            var positionData = this.positionData[this.positionData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;
            positionData[index] = matrix.b * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;
            positionData[4 + index] = alpha;
            positionData[20 + index] = positionData[5 + index] = matrix.tx;
            positionData[21 + index] = positionData[6 + index] = matrix.ty;
            positionData[22 + index] = positionData[7 + index] = texture.startX;
            positionData[23 + index] = positionData[8 + index] = texture.startY;
            positionData[24 + index] = positionData[9 + index] = alpha;
            positionData[15 + index] = positionData[10 + index] = matrix.a * width + matrix.b * height + matrix.tx;
            positionData[16 + index] = positionData[11 + index] = matrix.c * width + matrix.d * height + matrix.ty;
            positionData[17 + index] = positionData[12 + index] = texture.endX;
            positionData[18 + index] = positionData[13 + index] = texture.endY;
            positionData[19 + index] = positionData[14 + index] = alpha;
            positionData[25 + index] = matrix.a * width + matrix.tx;
            positionData[26 + index] = matrix.c * width + matrix.ty;
            positionData[27 + index] = texture.endX;
            positionData[28 + index] = texture.startY;
            positionData[29 + index] = alpha;
            this.count[this.count.length - 1]++;
        };
        /**
         * 渲染
         */
        BitmapShaderTask2.prototype.render = function () {
            var _this = this;
            var gl = leaf.GLCore.gl;
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, leaf.$size * 5, 0);
            gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 5, leaf.$size * 2);
            gl.vertexAttribPointer(_this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 5, leaf.$size * 4);
            //开始渲染任务
            for (var i = 0, len = _this.textures.length; i < len; i++) {
                //切换混合模式
                leaf.BlendModeFunc.changeBlendMode(this.blendMode[i]);
                //绑定当前需要渲染的纹理
                gl.bindTexture(gl.TEXTURE_2D, _this.textures[i]);
                //分配 buffer 内容
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);
                //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
                //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
                gl.drawArrays(gl.TRIANGLES, 0, 6 * _this.count[i]);
                leaf.runInfo.drawCount += _this.count[i];
                leaf.runInfo.drawCall++;
            }
            this.reset();
        };
        BitmapShaderTask2.prototype.reset = function () {
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendMode = [];
        };
        return BitmapShaderTask2;
    }(leaf.Shader));
    leaf.BitmapShaderTask2 = BitmapShaderTask2;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    leaf.$size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;
    var BitmapShaderTask3 = /** @class */ (function (_super) {
        __extends(BitmapShaderTask3, _super);
        function BitmapShaderTask3() {
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
            _this_1.alpha = [];
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
        BitmapShaderTask3.prototype.initProgram = function () {
            var gl = leaf.GLCore.gl;
            var vertexSource = "\n             attribute vec2 a_TexCoord;\n             attribute vec4 a_Position;\n             attribute float a_Sampler;\n             uniform mat4 u_PMatrix;\n             varying vec2 v_TexCoord;\n             varying float v_Sampler;\n             void main(void)\n             {\n                gl_Position = u_PMatrix*a_Position;\n                v_TexCoord = a_TexCoord;\n             }\n             ";
            var fragmentSource = "\n             precision mediump float;\n             varying vec2 v_TexCoord;\n             uniform float u_Alpha;\n             varying float v_Sampler;\n             uniform sampler2D u_Sampler;\n             void main(void)\n             {\n                gl_FragColor = texture2D(u_Sampler,v_TexCoord)*u_Alpha;\n             }\n             ";
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
        BitmapShaderTask3.prototype.initAttriLocation = function () {
            var gl = leaf.GLCore.gl;
            var projectionMatrix = this.projectionMatrix;
            projectionMatrix[0] = 2 / leaf.GLCore.width;
            projectionMatrix[5] = -2 / leaf.GLCore.height;
            var program = this.program;
            program["name"] = "bitmap program";
            gl.useProgram(this.program);
            if (!this.buffer) {
                this.buffer = gl.createBuffer();
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            this.a_Position = gl.getAttribLocation(program, "a_Position");
            gl.enableVertexAttribArray(this.a_Position);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, leaf.$size * 4, 0);
            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.enableVertexAttribArray(this.a_TexCoord);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 4, leaf.$size * 2);
            this.u_Alpha = gl.getUniformLocation(program, "u_Alpha");
            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(this.u_PMatrix, false, projectionMatrix);
        };
        BitmapShaderTask3.prototype.addTask = function (texture, matrix, alpha, blendMode) {
            if (!this.textures.length ||
                this.textures[this.textures.length - 1] != texture.texture ||
                this.alpha[this.alpha.length - 1] != alpha ||
                this.blendMode[this.blendMode.length - 1] != blendMode) {
                this.textures.push(texture.texture);
                this.positionData.push([]);
                this.count.push(0);
                this.alpha.push(alpha);
                this.blendMode.push(blendMode);
            }
            var index = this.count[this.count.length - 1] * 30;
            var positionData = this.positionData[this.positionData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;
            positionData[index] = matrix.b * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;
            positionData[16 + index] = positionData[4 + index] = matrix.tx;
            positionData[17 + index] = positionData[5 + index] = matrix.ty;
            positionData[18 + index] = positionData[6 + index] = texture.startX;
            positionData[19 + index] = positionData[7 + index] = texture.startY;
            positionData[12 + index] = positionData[8 + index] = matrix.a * width + matrix.b * height + matrix.tx;
            positionData[13 + index] = positionData[9 + index] = matrix.c * width + matrix.d * height + matrix.ty;
            positionData[14 + index] = positionData[10 + index] = texture.endX;
            positionData[15 + index] = positionData[11 + index] = texture.endY;
            positionData[20 + index] = matrix.a * width + matrix.tx;
            positionData[21 + index] = matrix.c * width + matrix.ty;
            positionData[22 + index] = texture.endX;
            positionData[23 + index] = texture.startY;
            this.count[this.count.length - 1]++;
        };
        /**
         * 渲染
         */
        BitmapShaderTask3.prototype.render = function () {
            var _this = this;
            var gl = leaf.GLCore.gl;
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, leaf.$size * 4, 0);
            gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 4, leaf.$size * 2);
            //开始渲染任务
            for (var i = 0, len = _this.textures.length; i < len; i++) {
                //切换混合模式
                leaf.BlendModeFunc.changeBlendMode(this.blendMode[i]);
                //绑定当前需要渲染的纹理
                gl.bindTexture(gl.TEXTURE_2D, _this.textures[i]);
                gl.uniform1f(this.u_Alpha, _this.alpha[i]);
                //分配 buffer 内容
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);
                //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
                //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
                gl.drawArrays(gl.TRIANGLES, 0, 6 * _this.count[i]);
                leaf.runInfo.drawCount += _this.count[i];
                leaf.runInfo.drawCall++;
            }
            this.reset();
        };
        BitmapShaderTask3.prototype.reset = function () {
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendMode = [];
        };
        return BitmapShaderTask3;
    }(leaf.Shader));
    leaf.BitmapShaderTask3 = BitmapShaderTask3;
})(leaf || (leaf = {}));
var leaf;
(function (leaf) {
    leaf.$size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;
    var BitmapShaderTask4 = /** @class */ (function (_super) {
        __extends(BitmapShaderTask4, _super);
        function BitmapShaderTask4() {
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
            _this_1.indiceData = [];
            _this_1.blendMode = [];
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
        BitmapShaderTask4.prototype.initProgram = function () {
            var gl = leaf.GLCore.gl;
            var vertexSource = "\n             attribute vec2 a_TexCoord;\n             attribute vec4 a_Position;\n             attribute float a_Alpha;\n             attribute float a_Sampler;\n             uniform mat4 u_PMatrix;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             void main(void)\n             {\n                gl_Position = u_PMatrix*a_Position;\n                v_TexCoord = a_TexCoord;\n                v_Alpha = a_Alpha;\n             }\n             ";
            var fragmentSource = "\n             precision mediump float;\n             varying vec2 v_TexCoord;\n             varying float v_Alpha;\n             varying float v_Sampler;\n             uniform sampler2D u_Sampler;\n             void main(void)\n             {\n                gl_FragColor = texture2D(u_Sampler,v_TexCoord)*v_Alpha;\n             }\n             ";
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
        BitmapShaderTask4.prototype.initAttriLocation = function () {
            var gl = leaf.GLCore.gl;
            var projectionMatrix = this.projectionMatrix;
            projectionMatrix[0] = 2 / leaf.GLCore.width;
            projectionMatrix[5] = -2 / leaf.GLCore.height;
            var program = this.program;
            program["name"] = "bitmap program";
            gl.useProgram(this.program);
            if (!this.buffer) {
                this.buffer = gl.createBuffer();
                this.indexBuffer = gl.createBuffer();
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            this.a_Position = gl.getAttribLocation(program, "a_Position");
            gl.enableVertexAttribArray(this.a_Position);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, leaf.$size * 5, 0);
            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.enableVertexAttribArray(this.a_TexCoord);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 5, leaf.$size * 2);
            this.a_Alpha = gl.getAttribLocation(program, "a_Alpha");
            gl.enableVertexAttribArray(this.a_Alpha);
            gl.vertexAttribPointer(this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 5, leaf.$size * 4);
            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(this.u_PMatrix, false, projectionMatrix);
        };
        BitmapShaderTask4.prototype.addTask = function (texture, matrix, alpha, blendMode) {
            if (!this.textures.length || this.textures[this.textures.length - 1] != texture.texture ||
                this.blendMode[this.blendMode.length - 1] != blendMode) {
                this.textures.push(texture.texture);
                this.positionData.push([]);
                this.indiceData.push([]);
                this.count.push(0);
                this.blendMode.push(blendMode);
            }
            var index = this.count[this.count.length - 1] * 20;
            var index2 = this.count[this.count.length - 1] * 6;
            var index2_2 = this.count[this.count.length - 1] * 4;
            var positionData = this.positionData[this.positionData.length - 1];
            var indiceData = this.indiceData[this.indiceData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;
            positionData[index] = matrix.b * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;
            positionData[4 + index] = alpha;
            positionData[5 + index] = matrix.tx;
            positionData[6 + index] = matrix.ty;
            positionData[7 + index] = texture.startX;
            positionData[8 + index] = texture.startY;
            positionData[9 + index] = alpha;
            positionData[10 + index] = matrix.a * width + matrix.b * height + matrix.tx;
            positionData[11 + index] = matrix.c * width + matrix.d * height + matrix.ty;
            positionData[12 + index] = texture.endX;
            positionData[13 + index] = texture.endY;
            positionData[14 + index] = alpha;
            positionData[15 + index] = matrix.a * width + matrix.tx;
            positionData[16 + index] = matrix.c * width + matrix.ty;
            positionData[17 + index] = texture.endX;
            positionData[18 + index] = texture.startY;
            positionData[19 + index] = alpha;
            indiceData[0 + index2] = 0 + index2_2;
            indiceData[1 + index2] = 1 + index2_2;
            indiceData[2 + index2] = 2 + index2_2;
            indiceData[3 + index2] = 2 + index2_2;
            indiceData[4 + index2] = 1 + index2_2;
            indiceData[5 + index2] = 3 + index2_2;
            this.count[this.count.length - 1]++;
        };
        /**
         * 渲染
         */
        BitmapShaderTask4.prototype.render = function () {
            var _this = this;
            var gl = leaf.GLCore.gl;
            gl.useProgram(_this.program);
            //开始渲染任务
            for (var i = 0, len = _this.textures.length; i < len; i++) {
                //切换混合模式
                leaf.BlendModeFunc.changeBlendMode(this.blendMode[i]);
                //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
                gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, leaf.$size * 5, 0);
                gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, leaf.$size * 5, leaf.$size * 2);
                gl.vertexAttribPointer(_this.a_Alpha, 1, gl.FLOAT, false, leaf.$size * 5, leaf.$size * 4);
                //分配 buffer 内容
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(_this.indiceData[i]), gl.STATIC_DRAW);
                //绑定当前需要渲染的纹理
                gl.bindTexture(gl.TEXTURE_2D, _this.textures[i]);
                //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
                //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
                gl.drawElements(gl.TRIANGLES, _this.indiceData[i].length, gl.UNSIGNED_SHORT, 0); //利用drawElements画三角形
                leaf.runInfo.drawCount += _this.count[i];
                leaf.runInfo.drawCall++;
            }
            this.reset();
        };
        BitmapShaderTask4.prototype.reset = function () {
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendMode = [];
            _this.indiceData = [];
        };
        return BitmapShaderTask4;
    }(leaf.Shader));
    leaf.BitmapShaderTask4 = BitmapShaderTask4;
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
        };
        Texture.id = 0;
        return Texture;
    }());
    leaf.Texture = Texture;
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