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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = /** @class */ (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = /** @class */ (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
orange.debug = true;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        this.addChild(new game.Stage());
    };
    return Main;
}(eui.UILayer));
var DebugPlatform = /** @class */ (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
if (!window.platform) {
    window.platform = new DebugPlatform();
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = /** @class */ (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
var game;
(function (game) {
    var Stage = /** @class */ (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.start, _this);
            return _this;
        }
        Stage.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                var e_2, _a, configs, _b, _c, key;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            //打开调试模式
                            orange.debug = true;
                            //等待 orange 初始化
                            return [4 /*yield*/, orange.startup({
                                    'stage': this.stage,
                                    'egret': {},
                                    'native': {}
                                })];
                        case 1:
                            //等待 orange 初始化
                            _d.sent();
                            orange.egret.Debug.show();
                            configs = {};
                            try {
                                for (_b = __values(game.config.list), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    key = _c.value;
                                    configs[key] = RES.getRes(key + '_json');
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            game.config.decodeConfig(configs);
                            //初始化数据
                            game.root = new game.data.Root();
                            game.root.start();
                            //注册场景
                            this.addChild(game.SceneManager.instance);
                            game.SceneManager.instance.registerScene(new game.modules.LoginScene());
                            game.SceneManager.instance.registerScene(new game.main.MainScene());
                            //切换到登陆场景
                            game.SceneManager.instance.switchScene(game.SceneName.LOGIN);
                            return [2 /*return*/];
                    }
                });
            });
        };
        Stage = __decorate([
            orange.observer
        ], Stage);
        return Stage;
    }(egret.Sprite));
    game.Stage = Stage;
})(game || (game = {}));
var game;
(function (game) {
    var SceneManager = /** @class */ (function (_super) {
        __extends(SceneManager, _super);
        function SceneManager() {
            var _this = _super.call(this) || this;
            _this.scenes = new Set();
            if (SceneManager.lock)
                throw '不能实例化 SceneManager， 请通过 SceneManager.instance 访问';
            SceneManager.ist = _this;
            return _this;
        }
        /**
         * 注册场景
         * @param scene
         */
        SceneManager.prototype.registerScene = function (scene) {
            this.scenes.add(scene);
        };
        /**
         * 获取场景
         * @param name
         */
        SceneManager.prototype.getScene = function (name) {
            var e_3, _a;
            try {
                for (var _b = __values(this.scenes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var scene = _c.value;
                    if (scene.name == name) {
                        return scene;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return null;
        };
        Object.defineProperty(SceneManager.prototype, "currentScene", {
            /**
             * 获取当前场景
             */
            get: function () {
                return this._currentScene;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 切换场景
         *
         * @param name
         * @param data
         */
        SceneManager.prototype.switchScene = function (name, data) {
            var scene = this.getScene(name);
            if (!scene) {
                throw "\u6CA1\u6709\u521B\u5EFA\u5BF9\u5E94\u7684\u573A\u666F:" + name;
            }
            if (this._currentScene) {
                this._currentScene.exit(data);
                this._currentScene.parent === this && this.removeChild(this._currentScene);
                this._currentScene = null;
            }
            this._currentScene = scene;
            this.addChild(this._currentScene);
            scene.enter(data);
        };
        Object.defineProperty(SceneManager, "instance", {
            get: function () {
                if (!SceneManager.ist) {
                    SceneManager.lock = false;
                    new SceneManager();
                    SceneManager.lock = true;
                }
                return SceneManager.ist;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.lock = true;
        return SceneManager;
    }(egret.Sprite));
    game.SceneManager = SceneManager;
})(game || (game = {}));
var game;
(function (game) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            var _this = _super.call(this) || this;
            _this.addChild(_this.gameLayer = new game.Layer());
            _this.addChild(_this.uiLayer = new game.UILayer());
            _this.addChild(_this.popLayer = new game.PopLayer());
            _this.addChild(_this.topLayer = new game.UILayer());
            return _this;
        }
        Scene.prototype.exit = function (data) {
            this.exitLayers();
        };
        Scene.prototype.exitLayers = function () {
            for (var i = 0; i < this.numChildren; i++) {
                this.getChildAt(i)['exit'] && this.getChildAt(i)['exit']();
            }
        };
        return Scene;
    }(egret.DisplayObjectContainer));
    game.Scene = Scene;
})(game || (game = {}));
var game;
(function (game) {
    var Layer = /** @class */ (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Layer.prototype.exit = function () {
            this.removeAll();
        };
        Layer.prototype.removeAll = function () {
            for (var i = 0; i < this.numChildren; i++) {
                if (this.getChildAt(i)) {
                    this.removeChildAt(i);
                    i--;
                    continue;
                }
            }
        };
        return Layer;
    }(egret.Sprite));
    game.Layer = Layer;
})(game || (game = {}));
var game;
(function (game) {
    var PopLayer = /** @class */ (function (_super) {
        __extends(PopLayer, _super);
        function PopLayer() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PopLayer.prototype, "mask", {
            get: function () {
                if (!this._mask) {
                    this._mask = new eui.Rect();
                    this._mask.fillColor = 0;
                    this._mask.fillAlpha = 0.5;
                }
                this._mask.width = this.stage.stageWidth;
                this._mask.height = this.stage.stageHeight;
                return this._mask;
            },
            enumerable: true,
            configurable: true
        });
        PopLayer.prototype.addChild = function (child) {
            var _this = this;
            if (this.mask.parent)
                this.mask.parent.removeChild(this.mask);
            _super.prototype.addChild.call(this, this.mask);
            _super.prototype.addChild.call(this, child);
            child.x = (this.stage.stageWidth - child.width) >> 1;
            child.y = (this.stage.stageHeight - child.height) >> 1;
            child.addEventListener(egret.Event.REMOVED, function (e) {
                if (e.target != child)
                    return;
                if (child.parent == _this && _this.getChildIndex(child) == _this.numChildren - 1) {
                    if (_this.mask.parent)
                        _this.mask.parent.removeChild(_this.mask);
                }
            }, this);
            return child;
        };
        return PopLayer;
    }(game.Layer));
    game.PopLayer = PopLayer;
})(game || (game = {}));
var game;
(function (game) {
    var UILayer = /** @class */ (function (_super) {
        __extends(UILayer, _super);
        function UILayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UILayer.prototype.exit = function () {
            this.removeChildren();
        };
        return UILayer;
    }(egret.Sprite));
    game.UILayer = UILayer;
})(game || (game = {}));
var game;
(function (game) {
    var UIView = /** @class */ (function (_super) {
        __extends(UIView, _super);
        function UIView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UIView.prototype.closeView = function () {
            if (this.parent)
                this.parent.removeChild(this);
        };
        return UIView;
    }(eui.Component));
    game.UIView = UIView;
})(game || (game = {}));
//游戏内的公共属性
var game;
(function (game) {
    /**
     * 平台  可选项目为 debug 或者 hortor
     */
    game.platform = 'debug';
    game.eventMgr = new orange.EventEmitter();
})(game || (game = {}));
var game;
(function (game) {
    var SceneName = /** @class */ (function () {
        function SceneName() {
        }
        /**
         * 登陆场景
         */
        SceneName.LOGIN = 'login';
        /**
         * 游戏主场景
         */
        SceneName.GAME = 'game';
        return SceneName;
    }());
    game.SceneName = SceneName;
})(game || (game = {}));
var game;
(function (game) {
    var config;
    (function (config) {
        function decodeConfig(tables) {
            for (var k in tables) {
            }
        }
        config.decodeConfig = decodeConfig;
        config.list = [];
    })(config = game.config || (game.config = {}));
})(game || (game = {}));
var game;
(function (game) {
    var config;
    (function (config) {
        var Item = /** @class */ (function () {
            function Item(id, name) {
                this.id = id;
                this.name = name;
            }
            Item.getById = function (id) {
                var e_4, _a;
                try {
                    for (var _b = __values(Item.list), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        if (item.id == id)
                            return item;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return null;
            };
            Item.list = [];
            return Item;
        }());
        config.Item = Item;
        for (var i = 0; i < 1000; i++) {
            Item.list.push(new Item(i + 1, "\u7269\u54C1" + (i + 1)));
        }
    })(config = game.config || (game.config = {}));
})(game || (game = {}));
var game;
(function (game) {
    var data;
    (function (data) {
        function changeProperty() {
            //修改属性的类型，这样在数据同步的时候就会创建 ItemData 对象
            game.net.GD_Bag.properties.get('items').classType = game.net.ItemData;
        }
        data.changeProperty = changeProperty;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
var game;
(function (game) {
    var data;
    (function (data) {
        /**
         * 游戏公共数据
         */
        var Root = /** @class */ (function () {
            function Root() {
            }
            Root.prototype.start = function () {
                //修改属性的类型
                data.changeProperty();
                this.server = new data.Server();
                game.player = this.server.playerData;
            };
            return Root;
        }());
        data.Root = Root;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
var game;
(function (game) {
    var data;
    (function (data) {
        var Server = /** @class */ (function () {
            function Server() {
                this.playerData = new game.net.GD_PlayerData();
            }
            return Server;
        }());
        data.Server = Server;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
var game;
(function (game) {
    /**
     * 公共纯函数
     */
    var Formula = /** @class */ (function () {
        function Formula() {
        }
        return Formula;
    }());
    game.Formula = Formula;
})(game || (game = {}));
var game;
(function (game) {
    var Alert = /** @class */ (function (_super) {
        __extends(Alert, _super);
        function Alert(title, content) {
            var _this = _super.call(this) || this;
            _this.skinName = gameSkins.AlertSkin;
            _this.titleLabel.text = title;
            _this.contentLabel.text = content;
            _this.sureButton.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.parent.removeChild(_this);
                _this.onSure && _this.onSure();
            }, _this);
            _this.closeButton.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.parent.removeChild(_this);
                _this.onCancel && _this.onCancel();
            }, _this);
            return _this;
        }
        Alert_1 = Alert;
        Alert.show = function (content, title, sureBack, cancelBack) {
            if (title === void 0) { title = '提示'; }
            var alert = new Alert_1(title, content);
            alert.onSure = sureBack;
            alert.onCancel = cancelBack;
            game.SceneManager.instance.currentScene.popLayer.addChild(alert);
        };
        var Alert_1;
        Alert = Alert_1 = __decorate([
            orange.observer
        ], Alert);
        return Alert;
    }(game.UIView));
    game.Alert = Alert;
})(game || (game = {}));
var game;
(function (game) {
    var bag;
    (function (bag) {
        var BagData = /** @class */ (function () {
            function BagData() {
                this.titleLabel = '背包';
            }
            Object.defineProperty(BagData.prototype, "sizeLabel", {
                get: function () {
                    var count = 0;
                    game.root.server.playerData.bag.items.forEach(function (value, key) {
                        count += value.count;
                    });
                    return "\u7269\u54C1\u603B\u7C7B:" + game.root.server.playerData.bag.items.size + "\uFF0C\u603B\u4E2A\u6570:" + count;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BagData.prototype, "nameLabel", {
                get: function () {
                    return "\u540D\u79F0:" + game.root.server.playerData.name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BagData.prototype, "list", {
                get: function () {
                    //把从服务器获取的原始数据 (Map<number, net.ItemData>) 转换成 eui.ArrayCollection<BagItem>
                    var collection = new eui.ArrayCollection();
                    game.root.server.playerData.bag.items.forEach(function (source) {
                        var item = new bag.BagItemData();
                        item.source = source;
                        collection.addItem(item);
                    });
                    return collection;
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                orange.calculate
            ], BagData.prototype, "sizeLabel", null);
            __decorate([
                orange.calculate
            ], BagData.prototype, "nameLabel", null);
            __decorate([
                orange.calculate
            ], BagData.prototype, "list", null);
            return BagData;
        }());
        bag.BagData = BagData;
    })(bag = game.bag || (game.bag = {}));
})(game || (game = {}));
var game;
(function (game) {
    var bag;
    (function (bag) {
        var BagItemData = /** @class */ (function () {
            function BagItemData() {
            }
            Object.defineProperty(BagItemData.prototype, "nameLabel", {
                get: function () {
                    return this.source ? this.source.cfg.name : '';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BagItemData.prototype, "countLabel", {
                get: function () {
                    return this.source ? "" + this.source.count : '';
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                orange.watch
            ], BagItemData.prototype, "source", void 0);
            __decorate([
                orange.calculate
            ], BagItemData.prototype, "nameLabel", null);
            __decorate([
                orange.calculate
            ], BagItemData.prototype, "countLabel", null);
            return BagItemData;
        }());
        bag.BagItemData = BagItemData;
    })(bag = game.bag || (game.bag = {}));
})(game || (game = {}));
var game;
(function (game) {
    var bag;
    (function (bag) {
        var BagPanelItemRenderer = /** @class */ (function (_super) {
            __extends(BagPanelItemRenderer, _super);
            function BagPanelItemRenderer() {
                var _this = _super.call(this) || this;
                _this.skinName = gameSkins.BagPanelItemSkin;
                return _this;
            }
            BagPanelItemRenderer.prototype.render = function () {
                if (this.data) {
                    this.nameLabel.text = this.data.nameLabel;
                    this.countLabel.text = this.data.countLabel;
                }
            };
            __decorate([
                orange.watch
            ], BagPanelItemRenderer.prototype, "data", void 0);
            __decorate([
                orange.render
            ], BagPanelItemRenderer.prototype, "render", null);
            BagPanelItemRenderer = __decorate([
                orange.observer
            ], BagPanelItemRenderer);
            return BagPanelItemRenderer;
        }(eui.ItemRenderer));
        bag.BagPanelItemRenderer = BagPanelItemRenderer;
    })(bag = game.bag || (game.bag = {}));
})(game || (game = {}));
var game;
(function (game) {
    var bag;
    (function (bag) {
        var BagPanel = /** @class */ (function (_super) {
            __extends(BagPanel, _super);
            function BagPanel() {
                var _this = _super.call(this) || this;
                _this.data = new bag.BagData();
                _this.skinName = gameSkins.BagPanelSkin;
                return _this;
            }
            BagPanel_1 = BagPanel;
            BagPanel.prototype.render = function () {
                this.sizeLabel.text = this.data.sizeLabel;
                this.list.dataProvider = this.data.list;
            };
            BagPanel.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                this.list.itemRenderer = bag.BagPanelItemRenderer;
                //注册事件
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_END, this.closeView, this);
                this.addItemButton.addEventListener(egret.TouchEvent.TOUCH_END, this.addItem, this);
                this.delItemButton.addEventListener(egret.TouchEvent.TOUCH_END, this.delItem, this);
            };
            /**
             * 随机添加一个物品
             */
            BagPanel.prototype.addItem = function () {
                var itemId = 1 + ~~(100 * Math.random());
                var count = 1 + ~~(100 * Math.random());
                game.net.send(game.net.GM_AddItem(itemId, itemId, count));
            };
            /**
             * 随机删除一个已有物品
             */
            BagPanel.prototype.delItem = function () {
                var items = this.data.list;
                if (items.length) {
                    var item = items.getItemAt(~~(Math.random() * items.length));
                    game.net.send(game.net.GM_DelItem(item.source.id));
                }
            };
            BagPanel.prototype.openView = function () {
                game.SceneManager.instance.currentScene.popLayer.addChild(this);
            };
            Object.defineProperty(BagPanel, "instance", {
                get: function () {
                    if (!BagPanel_1.ist) {
                        BagPanel_1.ist = new BagPanel_1();
                    }
                    return BagPanel_1.ist;
                },
                enumerable: true,
                configurable: true
            });
            var BagPanel_1;
            __decorate([
                orange.render
            ], BagPanel.prototype, "render", null);
            __decorate([
                orange.modify
            ], BagPanel.prototype, "addItem", null);
            BagPanel = BagPanel_1 = __decorate([
                orange.observer
            ], BagPanel);
            return BagPanel;
        }(game.UIView));
        bag.BagPanel = BagPanel;
    })(bag = game.bag || (game.bag = {}));
})(game || (game = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var LoginScene = /** @class */ (function (_super) {
            __extends(LoginScene, _super);
            function LoginScene() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.name = game.SceneName.LOGIN;
                return _this;
            }
            LoginScene.prototype.enter = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var ui;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                ui = new eui.Component();
                                ui.skinName = gameSkins.LoginPanelSkin;
                                this.uiLayer.addChild(ui);
                                //链接网络
                                return [4 /*yield*/, this.connectToServer()];
                            case 1:
                                //链接网络
                                _a.sent();
                                //等待 100 毫秒
                                return [4 /*yield*/, orange.sleep(100).then(function () {
                                        //切换到游戏场景
                                        game.SceneManager.instance.switchScene(game.SceneName.GAME);
                                    })];
                            case 2:
                                //等待 100 毫秒
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            LoginScene.prototype.connectToServer = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: 
                            //实现了 h5 和 微信平台的登陆  154.8.219.77  10.1.1.79
                            return [4 /*yield*/, game.login('ws://10.1.2.18:10001', game.platform, 'test0000').then(function (back) { return __awaiter(_this, void 0, void 0, function () {
                                    var proxy;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                proxy = game.net.proxy = back.proxy;
                                                proxy.debug = true;
                                                proxy.root = game.root.server;
                                                orange.on(proxy.connection, orange.Event.CLOSE, function (e) {
                                                    game.Alert.show('断开链接:' + e.data.reason);
                                                    console.log(e.data);
                                                });
                                                return [4 /*yield*/, game.net.proxy.send(game.net.Game_Login())];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }).catch(function (e) {
                                    game.Alert.show('登陆出错:');
                                    //可能是登陆平台出错，或者登陆服务器出错，以 e 为准
                                    throw ('登陆出错:' + e);
                                })];
                            case 1:
                                //实现了 h5 和 微信平台的登陆  154.8.219.77  10.1.1.79
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return LoginScene;
        }(game.Scene));
        modules.LoginScene = LoginScene;
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
var game;
(function (game) {
    var LOGIN_ERROR;
    (function (LOGIN_ERROR) {
        LOGIN_ERROR["CONNECT_SERVER_ERROR"] = "\u94FE\u63A5\u670D\u52A1\u5668\u51FA\u9519";
        LOGIN_ERROR["LOGIN_PLATFORM_ERROR"] = "\u767B\u9646\u5E73\u53F0\u51FA\u9519";
        LOGIN_ERROR["NO_TOKEN"] = "\u672A\u6536\u5230 token";
        LOGIN_ERROR["LOGIN_ERROR"] = "\u767B\u9646\u51FA\u9519";
    })(LOGIN_ERROR = game.LOGIN_ERROR || (game.LOGIN_ERROR = {}));
    /**
     *
     * @param url 服务器地址
     * @param platform 平台 debug 或者 hortor
     * @param id 游戏账户，只在 debug 模式有效
     */
    function login(url, platform, id, debug) {
        var _this = this;
        if (id === void 0) { id = 'test0000'; }
        if (debug === void 0) { debug = true; }
        return new Promise(function (resolve, reject) {
            //获取角色信息，如果是 debug 模式则直接使用 id，如果是平台模式则使用平台 sdk
            getPlatformInfo(platform, id).then(function (info) {
                var socket = new orange.WebSocketClient();
                socket.connect(url).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                    var closeHandler, req, token;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                closeHandler = function () {
                                    reject(new Error(LOGIN_ERROR.NO_TOKEN));
                                };
                                orange.on(connection, orange.Event.CLOSE, closeHandler);
                                connection.protocol = new syncData.Protocol();
                                connection.proxy = new syncData.Proxy();
                                connection.proxy.debug = debug;
                                return [4 /*yield*/, connection.proxy.request({
                                        "cmd": "Auth_Login",
                                        "params": {
                                            "platform": platform,
                                            "info": info
                                        }
                                    })];
                            case 1:
                                req = _a.sent();
                                token = req.body.token;
                                orange.removeListener(connection, orange.Event.CLOSE, closeHandler);
                                connection.close();
                                socket = new orange.WebSocketClient();
                                socket.connect(url + '?token=' + encodeURIComponent(token)).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        connection.protocol = new syncData.Protocol();
                                        connection.proxy = new syncData.Proxy();
                                        resolve({
                                            "proxy": connection.proxy,
                                            "info": info
                                        });
                                        return [2 /*return*/];
                                    });
                                }); }).catch(function (e) {
                                    reject(new Error(LOGIN_ERROR.LOGIN_ERROR));
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }).catch(function (e) {
                    reject(new Error(LOGIN_ERROR.CONNECT_SERVER_ERROR));
                });
            }).catch(function (e) {
                reject(new Error(LOGIN_ERROR.LOGIN_PLATFORM_ERROR));
            });
        });
    }
    game.login = login;
    game.loginMany = false;
    //角色信息
    var info;
    /**
     * 获取平台信息
     * @param platform
     * @param id
     */
    function getPlatformInfo(platform, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!game.loginMany && info) {
                            resolve(info);
                        }
                        if (platform == 'debug') {
                            info = {
                                "id": id,
                                "name": id //角色显示的名称
                            };
                            resolve(JSON.stringify(info));
                        }
                        else {
                            var hortor = window["hortor"];
                            var conf = hortor.config;
                            var sdk = hortor.sdk;
                            hortor.init(conf);
                            sdk.login(function (user, err) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    info = JSON.stringify(user);
                                    resolve(info);
                                }
                            });
                        }
                    })];
            });
        });
    }
})(game || (game = {}));
var game;
(function (game) {
    var main;
    (function (main) {
        var MainScene = /** @class */ (function (_super) {
            __extends(MainScene, _super);
            function MainScene() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.name = game.SceneName.GAME;
                return _this;
            }
            MainScene.prototype.enter = function () {
                var ui = new main.MainView();
                this.uiLayer.addChild(ui);
            };
            return MainScene;
        }(game.Scene));
        main.MainScene = MainScene;
    })(main = game.main || (game.main = {}));
})(game || (game = {}));
var game;
(function (game) {
    var main;
    (function (main) {
        var MainView = /** @class */ (function (_super) {
            __extends(MainView, _super);
            function MainView() {
                var _this = _super.call(this) || this;
                MainView_1.ist = _this;
                _this.skinName = gameSkins.MainUISkin;
                _this.playerButton.addEventListener(egret.TouchEvent.TOUCH_END, _this.onClickPlayerButton, _this);
                _this.bagButton.addEventListener(egret.TouchEvent.TOUCH_END, _this.onClickBagButton, _this);
                var c = orange.reaction(function () {
                    game.root.server.playerData.level;
                    return game.root.server.playerData.nickName;
                }, function (name) {
                    console.log('名称:', name);
                });
                setTimeout(c, 5000);
                return _this;
            }
            MainView_1 = MainView;
            MainView.prototype.render = function () {
                this.nameLabel.text = "" + game.root.server.playerData.nickName;
                this.levelLabel.text = "Lv. " + game.root.server.playerData.level;
                this.goldLabel.text = "Gold : " + game.root.server.playerData.gold;
            };
            MainView.prototype.onClickPlayerButton = function (e) {
                game.playerPanel.PlayerPanel.instance.openView();
            };
            MainView.prototype.onClickBagButton = function (e) {
                game.bag.BagPanel.instance.openView();
            };
            var MainView_1;
            __decorate([
                egretExtend.render
            ], MainView.prototype, "render", null);
            MainView = MainView_1 = __decorate([
                orange.observer
            ], MainView);
            return MainView;
        }(game.UIView));
        main.MainView = MainView;
    })(main = game.main || (game.main = {}));
})(game || (game = {}));
var game;
(function (game) {
    var playerPanel;
    (function (playerPanel) {
        var PlayerPanel = /** @class */ (function (_super) {
            __extends(PlayerPanel, _super);
            function PlayerPanel() {
                var _this = _super.call(this) || this;
                _this.skinName = gameSkins.PlayPanel;
                return _this;
            }
            PlayerPanel_1 = PlayerPanel;
            PlayerPanel.prototype.render = function () {
                //因为计算量比较小，不用建立数据进行优化处理
                this.titleLabel.text = '角色属性';
                this.nameLabel.text = "\u540D\u79F0:" + game.root.server.playerData.nickName;
                this.levelLabel.text = "\u7B49\u7EA7:" + game.root.server.playerData.level;
                this.goldLabel.text = "\u91D1\u94B1:" + game.root.server.playerData.gold;
            };
            PlayerPanel.prototype.childrenCreated = function () {
                _super.prototype.childrenCreated.call(this);
                //监听事件
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_END, this.closeView, this);
                this.addGoldButton.addEventListener(egret.TouchEvent.TOUCH_END, this.addGold, this);
            };
            PlayerPanel.prototype.openView = function () {
                game.SceneManager.instance.currentScene.popLayer.addChild(this);
            };
            PlayerPanel.prototype.addGold = function () {
                var add = ~~(100 * Math.random());
                game.net.send(game.net.GM_ChangeGold(game.root.server.playerData.gold + add));
            };
            Object.defineProperty(PlayerPanel, "instance", {
                get: function () {
                    if (!PlayerPanel_1.ist) {
                        PlayerPanel_1.ist = new PlayerPanel_1();
                    }
                    return PlayerPanel_1.ist;
                },
                enumerable: true,
                configurable: true
            });
            var PlayerPanel_1;
            __decorate([
                orange.render
            ], PlayerPanel.prototype, "render", null);
            PlayerPanel = PlayerPanel_1 = __decorate([
                orange.observer
            ], PlayerPanel);
            return PlayerPanel;
        }(game.UIView));
        playerPanel.PlayerPanel = PlayerPanel;
        function disconnect() {
            orange.sync.Proxy.self = false;
            game.net.proxy.connection.close();
            var add = ~~(100 * Math.random());
            game.net.send(game.net.GM_ChangeGold(game.root.server.playerData.gold + add));
        }
        playerPanel.disconnect = disconnect;
    })(playerPanel = game.playerPanel || (game.playerPanel = {}));
})(game || (game = {}));
var game;
(function (game) {
    var Test = /** @class */ (function (_super) {
        __extends(Test, _super);
        // @orange.egret.render
        // flushMap1() {
        //   console.log('map 改变1，长度:', this.data.map.size);
        // }
        // @orange.egret.render
        // flushMap2() {
        //   this.data.map.forEach(item => item);
        //   console.log('map 改变2');
        // }
        // @orange.egret.render
        // flushMap3() {
        //   for (let [k, v] of this.data.map);
        //   console.log('map 改变3')
        // }
        // @orange.egret.render
        // flushMap4() {
        //   this.data.map.has(0);
        //   console.log('map 改变4')
        // }
        // @orange.egret.render
        // flushMap5() {
        //   this.data.map.values();
        //   console.log('map 改变5')
        // }
        // @orange.egret.render
        // flushMap6() {
        //   this.data.map.keys;
        //   console.log('map 改变6')
        // }
        // @orange.egret.render
        // flushArray1(): void {
        //   console.log('array 改变1，长度:', this.data.list.length);
        // }
        // @orange.egret.render
        // flushArray2(): void {
        //   this.data.list.forEach(item => item);
        //   console.log('array 改变2');
        // }
        // @orange.egret.render
        // flushArray3(): void {
        //   for (let item of this.data.list);
        //   console.log('array 改变3');
        // }
        // @orange.egret.render
        // flushArray4(): void {
        //   this.data.list.indexOf(null);
        //   console.log('array 改变4');
        // }
        function Test() {
            var _this = _super.call(this) || this;
            _this.data = new Data();
            setTimeout(_this.test, 1000);
            setTimeout(_this.test2, 1500);
            setTimeout(_this.test3, 2000);
            return _this;
        }
        // update():void {
        //   console.log('update!!!!')
        // }
        // @orange.egret.update
        // update(dt: number): void {
        //   console.log('update', dt);
        // }
        Test.prototype.test = function () {
            this.data.map.set(1, { id: 1, name: 'name1' });
            this.data.map.delete(1);
            this.data.list.push({ id: 1, name: 'name1' });
            this.data.list.splice(0, 1);
        };
        Test.prototype.test2 = function () {
            this.data.map.set(1, { id: 2, name: 'name2' });
            this.data.list.push({ id: 2, name: 'name2' });
        };
        Test.prototype.test3 = function () {
            this.data.map.set(3, { id: 3, name: 'name3' });
            this.data.map.delete(1);
            this.data.list.splice(0, 1);
            this.data.list.push({ id: 3, name: 'name3' });
        };
        __decorate([
            orange.modify
        ], Test.prototype, "test", null);
        __decorate([
            orange.modify
        ], Test.prototype, "test2", null);
        __decorate([
            orange.modify
        ], Test.prototype, "test3", null);
        Test = __decorate([
            orange.egret.observer
        ], Test);
        return Test;
    }(egret.Sprite));
    game.Test = Test;
    var Data = /** @class */ (function () {
        function Data() {
            this.map = new Map();
            this.list = new Array();
        }
        __decorate([
            orange.watch
        ], Data.prototype, "map", void 0);
        __decorate([
            orange.watch
        ], Data.prototype, "list", void 0);
        return Data;
    }());
    game.Data = Data;
    var interval = setInterval(function () {
        egret_stages[0] && egret_stages[0].addChild(new Test()) && clearInterval(interval);
    }, 1000);
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function send(data) {
            return net.proxy.request(data);
        }
        net.send = send;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Auth_Login(platform, id, name) {
            return {
                "cmd": "Auth_Login",
                "params": {
                    "platform": platform,
                    "id": id,
                    "name": name
                }
            };
        }
        net.Auth_Login = Auth_Login;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Fight_BattleChoose(
        /**
         * 玩家选择的答案
         */
        answer, 
        /**
         * 战斗id
         */
        battleID) {
            return {
                "cmd": "Fight_BattleChoose",
                "params": {
                    "answer": answer,
                    "battleID": battleID
                }
            };
        }
        net.Fight_BattleChoose = Fight_BattleChoose;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 离开战斗
         */
        function Fight_BattleLeaveReq(
        /**
         * 战斗id
         */
        battleId) {
            return {
                "cmd": "Fight_BattleLeaveReq",
                "params": {
                    "battleId": battleId
                }
            };
        }
        net.Fight_BattleLeaveReq = Fight_BattleLeaveReq;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 观看战斗，会先返回战斗全量数据并推送更新
         */
        function Fight_BattleWatch(
        /**
         * 战斗id
         */
        battleID) {
            return {
                "cmd": "Fight_BattleWatch",
                "params": {
                    "battleID": battleID
                }
            };
        }
        net.Fight_BattleWatch = Fight_BattleWatch;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Fight_BattleWithHistory(
        /**
         * 战斗id
         */
        battleID, 
        /**
         * 该战斗中的好友分享码
         */
        friendShareCode, 
        /**
         * 镜像对战的角色类型
         */
        roleType) {
            return {
                "cmd": "Fight_BattleWithHistory",
                "params": {
                    "battleID": battleID,
                    "friendShareCode": friendShareCode,
                    "roleType": roleType
                }
            };
        }
        net.Fight_BattleWithHistory = Fight_BattleWithHistory;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function GM_AddItem(id, typeId, count) {
            return {
                "cmd": "GM_AddItem",
                "params": {
                    "id": id,
                    "typeId": typeId,
                    "count": count
                }
            };
        }
        net.GM_AddItem = GM_AddItem;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function GM_ChangeGold(gold) {
            return {
                "cmd": "GM_ChangeGold",
                "params": {
                    "gold": gold
                }
            };
        }
        net.GM_ChangeGold = GM_ChangeGold;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function GM_ChangeLv(lv) {
            return {
                "cmd": "GM_ChangeLv",
                "params": {
                    "lv": lv
                }
            };
        }
        net.GM_ChangeLv = GM_ChangeLv;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function GM_DelItem(id) {
            return {
                "cmd": "GM_DelItem",
                "params": {
                    "id": id
                }
            };
        }
        net.GM_DelItem = GM_DelItem;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_AccountChangeCharacterReq(
        /**
         * 插槽位置
         */
        slot, 
        /**
         * 角色id
         */
        characterId) {
            return {
                "cmd": "Game_AccountChangeCharacterReq",
                "params": {
                    "slot": slot,
                    "characterId": characterId
                }
            };
        }
        net.Game_AccountChangeCharacterReq = Game_AccountChangeCharacterReq;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_BankFriendHelp(
        /**
         * 邀请人的id
         */
        friendId) {
            return {
                "cmd": "Game_BankFriendHelp",
                "params": {
                    "friendId": friendId
                }
            };
        }
        net.Game_BankFriendHelp = Game_BankFriendHelp;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_BankGetAdReward() {
            return {
                "cmd": "Game_BankGetAdReward",
                "params": {}
            };
        }
        net.Game_BankGetAdReward = Game_BankGetAdReward;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_BankGetInfo() {
            return {
                "cmd": "Game_BankGetInfo",
                "params": {}
            };
        }
        net.Game_BankGetInfo = Game_BankGetInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_BankGetReward() {
            return {
                "cmd": "Game_BankGetReward",
                "params": {}
            };
        }
        net.Game_BankGetReward = Game_BankGetReward;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_BuySeasonPassport() {
            return {
                "cmd": "Game_BuySeasonPassport",
                "params": {}
            };
        }
        net.Game_BuySeasonPassport = Game_BuySeasonPassport;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_ChangeEmote(
        /**
         * 表情数组 -- 多个更改最后一起设置
         */
        use) {
            return {
                "cmd": "Game_ChangeEmote",
                "params": {
                    "use": use
                }
            };
        }
        net.Game_ChangeEmote = Game_ChangeEmote;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_ChangeHead(
        /**
         * 头像Id
         */
        headId) {
            return {
                "cmd": "Game_ChangeHead",
                "params": {
                    "headId": headId
                }
            };
        }
        net.Game_ChangeHead = Game_ChangeHead;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_ChangeTitle(
        /**
         * 称号Id
         */
        titleId) {
            return {
                "cmd": "Game_ChangeTitle",
                "params": {
                    "titleId": titleId
                }
            };
        }
        net.Game_ChangeTitle = Game_ChangeTitle;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_ChatSendMessageReq(gD_ChatMessage) {
            return {
                "cmd": "Game_ChatSendMessageReq",
                "params": {
                    "gD_ChatMessage": gD_ChatMessage
                }
            };
        }
        net.Game_ChatSendMessageReq = Game_ChatSendMessageReq;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_CoinBuy(
        /**
         * 商品Id
         */
        shopId) {
            return {
                "cmd": "Game_CoinBuy",
                "params": {
                    "shopId": shopId
                }
            };
        }
        net.Game_CoinBuy = Game_CoinBuy;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_CreateOrder(
        /**
         * 商品Id
         */
        shopId) {
            return {
                "cmd": "Game_CreateOrder",
                "params": {
                    "shopId": shopId
                }
            };
        }
        net.Game_CreateOrder = Game_CreateOrder;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_ExecGm(
        /**
         * gm 命令
         */
        code) {
            return {
                "cmd": "Game_ExecGm",
                "params": {
                    "code": code
                }
            };
        }
        net.Game_ExecGm = Game_ExecGm;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 通过分享码请求好友
         */
        function Game_FriendAddWithShareCode(
        /**
         * 好友的分享码
         */
        shareCode) {
            return {
                "cmd": "Game_FriendAddWithShareCode",
                "params": {
                    "shareCode": shareCode
                }
            };
        }
        net.Game_FriendAddWithShareCode = Game_FriendAddWithShareCode;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 根据分享码获取用户信息
         */
        function Game_FriendGetInfoWithCode(
        /**
         * 分享码
         */
        shareCode) {
            return {
                "cmd": "Game_FriendGetInfoWithCode",
                "params": {
                    "shareCode": shareCode
                }
            };
        }
        net.Game_FriendGetInfoWithCode = Game_FriendGetInfoWithCode;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_GenAdReward(
        /**
         * 广告位置
         */
        adScene, 
        /**
         * 分享还是视频
         */
        from) {
            return {
                "cmd": "Game_GenAdReward",
                "params": {
                    "adScene": adScene,
                    "from": from
                }
            };
        }
        net.Game_GenAdReward = Game_GenAdReward;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_GenSeasonPassportReward(
        /**
         * 奖励id
         */
        id) {
            return {
                "cmd": "Game_GenSeasonPassportReward",
                "params": {
                    "id": id
                }
            };
        }
        net.Game_GenSeasonPassportReward = Game_GenSeasonPassportReward;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_ItemUse(
        /**
         * 物品id
         */
        itemID) {
            return {
                "cmd": "Game_ItemUse",
                "params": {
                    "itemID": itemID
                }
            };
        }
        net.Game_ItemUse = Game_ItemUse;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_Login() {
            return {
                "cmd": "Game_Login",
                "params": {}
            };
        }
        net.Game_Login = Game_Login;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_MatchRank() {
            return {
                "cmd": "Game_MatchRank",
                "params": {}
            };
        }
        net.Game_MatchRank = Game_MatchRank;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 通过uid搜索玩家
         */
        function Game_ReqAccountSearch(
        /**
         * 玩家uid
         */
        uid) {
            return {
                "cmd": "Game_ReqAccountSearch",
                "params": {
                    "uid": uid
                }
            };
        }
        net.Game_ReqAccountSearch = Game_ReqAccountSearch;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 加好友请求
         */
        function Game_ReqAddFriend(
        /**
         * 目标玩家id
         */
        uid) {
            return {
                "cmd": "Game_ReqAddFriend",
                "params": {
                    "uid": uid
                }
            };
        }
        net.Game_ReqAddFriend = Game_ReqAddFriend;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 回应好友请求
         */
        function Game_ReqAddFriendAnswer(
        /**
         * 目标uid
         */
        uid, 
        /**
         * 回应好友请求
         */
        result) {
            return {
                "cmd": "Game_ReqAddFriendAnswer",
                "params": {
                    "uid": uid,
                    "result": result
                }
            };
        }
        net.Game_ReqAddFriendAnswer = Game_ReqAddFriendAnswer;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 回应好友对战邀请
         */
        function Game_ReqAnswerFriendBattleInvite(
        /**
         * 好友回应
         */
        answer, 
        /**
         * 好友id
         */
        friendID, 
        /**
         * 房间id
         */
        roomID) {
            return {
                "cmd": "Game_ReqAnswerFriendBattleInvite",
                "params": {
                    "answer": answer,
                    "friendID": friendID,
                    "roomID": roomID
                }
            };
        }
        net.Game_ReqAnswerFriendBattleInvite = Game_ReqAnswerFriendBattleInvite;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 删除好友请求
         */
        function Game_ReqDelFriend(
        /**
         * 好友id
         */
        uid) {
            return {
                "cmd": "Game_ReqDelFriend",
                "params": {
                    "uid": uid
                }
            };
        }
        net.Game_ReqDelFriend = Game_ReqDelFriend;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 开始好友对战
         */
        function Game_ReqEnterFriendBattle(
        /**
         * 房间id
         */
        roomID, 
        /**
         * 房间类型，如果进入已存在的房间会忽略这个参数
         */
        roomType) {
            return {
                "cmd": "Game_ReqEnterFriendBattle",
                "params": {
                    "roomID": roomID,
                    "roomType": roomType
                }
            };
        }
        net.Game_ReqEnterFriendBattle = Game_ReqEnterFriendBattle;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_ReqFindFriendInfo() {
            return {
                "cmd": "Game_ReqFindFriendInfo",
                "params": {}
            };
        }
        net.Game_ReqFindFriendInfo = Game_ReqFindFriendInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 邀请好友参战
         */
        function Game_ReqInviteToRoom(
        /**
         * 好友uid数组
         */
        uids) {
            return {
                "cmd": "Game_ReqInviteToRoom",
                "params": {
                    "uids": uids
                }
            };
        }
        net.Game_ReqInviteToRoom = Game_ReqInviteToRoom;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 加入房间，房间过期不会创建
         */
        function Game_ReqJoinRoom(
        /**
         * 房间id
         */
        roomId) {
            return {
                "cmd": "Game_ReqJoinRoom",
                "params": {
                    "roomId": roomId
                }
            };
        }
        net.Game_ReqJoinRoom = Game_ReqJoinRoom;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 离开好友房间
         */
        function Game_ReqLeaveFriendRoom(
        /**
         * 房间id
         */
        roomID) {
            return {
                "cmd": "Game_ReqLeaveFriendRoom",
                "params": {
                    "roomID": roomID
                }
            };
        }
        net.Game_ReqLeaveFriendRoom = Game_ReqLeaveFriendRoom;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 开始好友对战请求
         */
        function Game_ReqStartFriendBattle(
        /**
         * 房间id
         */
        roomID) {
            return {
                "cmd": "Game_ReqStartFriendBattle",
                "params": {
                    "roomID": roomID
                }
            };
        }
        net.Game_ReqStartFriendBattle = Game_ReqStartFriendBattle;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Game_RespAccountSearch = /** @class */ (function () {
            function Game_RespAccountSearch() {
            }
            return Game_RespAccountSearch;
        }());
        net.Game_RespAccountSearch = Game_RespAccountSearch;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Game_RespFindFriendInfo = /** @class */ (function () {
            function Game_RespFindFriendInfo() {
            }
            return Game_RespFindFriendInfo;
        }());
        net.Game_RespFindFriendInfo = Game_RespFindFriendInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 切换角色请求
         */
        function Game_RoomChangeRoleReq(
        /**
         * 角色
         */
        roleFlag, 
        /**
         * 队伍位置
         */
        teamFlag, 
        /**
         * 房间号
         */
        roomId) {
            return {
                "cmd": "Game_RoomChangeRoleReq",
                "params": {
                    "roleFlag": roleFlag,
                    "teamFlag": teamFlag,
                    "roomId": roomId
                }
            };
        }
        net.Game_RoomChangeRoleReq = Game_RoomChangeRoleReq;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_RoomChangeSettingReq(
        /**
         * 房间id
         */
        roomId, 
        /**
         * 房间类型
         */
        roomType, 
        /**
         * 难度
         */
        difficulty, 
        /**
         * 分享文案id
         */
        shareTextID) {
            return {
                "cmd": "Game_RoomChangeSettingReq",
                "params": {
                    "roomId": roomId,
                    "roomType": roomType,
                    "difficulty": difficulty,
                    "shareTextID": shareTextID
                }
            };
        }
        net.Game_RoomChangeSettingReq = Game_RoomChangeSettingReq;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        /**
         * 房主踢人
         */
        function Game_RoomKickMemberReq(
        /**
         * 被踢人的uid
         */
        uid, 
        /**
         * 房间号
         */
        roomId) {
            return {
                "cmd": "Game_RoomKickMemberReq",
                "params": {
                    "uid": uid,
                    "roomId": roomId
                }
            };
        }
        net.Game_RoomKickMemberReq = Game_RoomKickMemberReq;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Game_SeasonCalReward() {
            return {
                "cmd": "Game_SeasonCalReward",
                "params": {}
            };
        }
        net.Game_SeasonCalReward = Game_SeasonCalReward;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Match_CreateMatchTeam() {
            return {
                "cmd": "Match_CreateMatchTeam",
                "params": {}
            };
        }
        net.Match_CreateMatchTeam = Match_CreateMatchTeam;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Match_JoinMatchTeam(
        /**
         * 队伍ID
         */
        teamID) {
            return {
                "cmd": "Match_JoinMatchTeam",
                "params": {
                    "teamID": teamID
                }
            };
        }
        net.Match_JoinMatchTeam = Match_JoinMatchTeam;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Match_LeaveMatchTeam(
        /**
         * 队伍ID
         */
        teamID) {
            return {
                "cmd": "Match_LeaveMatchTeam",
                "params": {
                    "teamID": teamID
                }
            };
        }
        net.Match_LeaveMatchTeam = Match_LeaveMatchTeam;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Match_MatchTeamBegin(
        /**
         * 队伍ID
         */
        teamID) {
            return {
                "cmd": "Match_MatchTeamBegin",
                "params": {
                    "teamID": teamID
                }
            };
        }
        net.Match_MatchTeamBegin = Match_MatchTeamBegin;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Match_MatchTeamCancel(
        /**
         * 队伍ID
         */
        teamID) {
            return {
                "cmd": "Match_MatchTeamCancel",
                "params": {
                    "teamID": teamID
                }
            };
        }
        net.Match_MatchTeamCancel = Match_MatchTeamCancel;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Match_MatchTeamInviteFriend(
        /**
         * 队伍ID
         */
        teamID, 
        /**
         * 好友id
         */
        friendID) {
            return {
                "cmd": "Match_MatchTeamInviteFriend",
                "params": {
                    "teamID": teamID,
                    "friendID": friendID
                }
            };
        }
        net.Match_MatchTeamInviteFriend = Match_MatchTeamInviteFriend;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Match_MatchTeamKick(
        /**
         * 队伍ID
         */
        teamID, 
        /**
         * 好友id
         */
        friendID) {
            return {
                "cmd": "Match_MatchTeamKick",
                "params": {
                    "teamID": teamID,
                    "friendID": friendID
                }
            };
        }
        net.Match_MatchTeamKick = Match_MatchTeamKick;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Match_SingleMatchCancel() {
            return {
                "cmd": "Match_SingleMatchCancel",
                "params": {}
            };
        }
        net.Match_SingleMatchCancel = Match_SingleMatchCancel;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Match_Single_Match() {
            return {
                "cmd": "Match_Single_Match",
                "params": {}
            };
        }
        net.Match_Single_Match = Match_Single_Match;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_AddFriendRequest = /** @class */ (function () {
            function Notify_AddFriendRequest() {
            }
            return Notify_AddFriendRequest;
        }());
        net.Notify_AddFriendRequest = Notify_AddFriendRequest;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_BankFriendHelp = /** @class */ (function () {
            function Notify_BankFriendHelp() {
            }
            return Notify_BankFriendHelp;
        }());
        net.Notify_BankFriendHelp = Notify_BankFriendHelp;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_BeFriend = /** @class */ (function () {
            function Notify_BeFriend() {
            }
            return Notify_BeFriend;
        }());
        net.Notify_BeFriend = Notify_BeFriend;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_BeKicked = /** @class */ (function () {
            function Notify_BeKicked() {
            }
            return Notify_BeKicked;
        }());
        net.Notify_BeKicked = Notify_BeKicked;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_BuffHelp = /** @class */ (function () {
            function Notify_BuffHelp() {
            }
            return Notify_BuffHelp;
        }());
        net.Notify_BuffHelp = Notify_BuffHelp;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_Choose = /** @class */ (function () {
            function Notify_Choose() {
            }
            return Notify_Choose;
        }());
        net.Notify_Choose = Notify_Choose;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_FriendRoomInvite = /** @class */ (function () {
            function Notify_FriendRoomInvite() {
            }
            return Notify_FriendRoomInvite;
        }());
        net.Notify_FriendRoomInvite = Notify_FriendRoomInvite;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_FriendRoomInviteResult = /** @class */ (function () {
            function Notify_FriendRoomInviteResult() {
            }
            return Notify_FriendRoomInviteResult;
        }());
        net.Notify_FriendRoomInviteResult = Notify_FriendRoomInviteResult;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_MatchTeamBeKicked = /** @class */ (function () {
            function Notify_MatchTeamBeKicked() {
            }
            return Notify_MatchTeamBeKicked;
        }());
        net.Notify_MatchTeamBeKicked = Notify_MatchTeamBeKicked;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_MatchTeamInvite = /** @class */ (function () {
            function Notify_MatchTeamInvite() {
            }
            return Notify_MatchTeamInvite;
        }());
        net.Notify_MatchTeamInvite = Notify_MatchTeamInvite;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_MatchTeamStatus = /** @class */ (function () {
            function Notify_MatchTeamStatus() {
            }
            return Notify_MatchTeamStatus;
        }());
        net.Notify_MatchTeamStatus = Notify_MatchTeamStatus;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_ReceiveMessage = /** @class */ (function () {
            function Notify_ReceiveMessage() {
            }
            return Notify_ReceiveMessage;
        }());
        net.Notify_ReceiveMessage = Notify_ReceiveMessage;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Notify_UpgradeLevel = /** @class */ (function () {
            function Notify_UpgradeLevel() {
            }
            return Notify_UpgradeLevel;
        }());
        net.Notify_UpgradeLevel = Notify_UpgradeLevel;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function OIM_JoinChatRoom(chatRoomId) {
            return {
                "cmd": "OIM_JoinChatRoom",
                "params": {
                    "chatRoomId": chatRoomId
                }
            };
        }
        net.OIM_JoinChatRoom = OIM_JoinChatRoom;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function OIM_JoinGroup(groupId) {
            return {
                "cmd": "OIM_JoinGroup",
                "params": {
                    "groupId": groupId
                }
            };
        }
        net.OIM_JoinGroup = OIM_JoinGroup;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var OIM_RecivedMessage = /** @class */ (function () {
            function OIM_RecivedMessage() {
            }
            return OIM_RecivedMessage;
        }());
        net.OIM_RecivedMessage = OIM_RecivedMessage;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function OIM_SendMessage(userInfo, conversationType, contentType, toIds, content) {
            return {
                "cmd": "OIM_SendMessage",
                "params": {
                    "userInfo": userInfo,
                    "conversationType": conversationType,
                    "contentType": contentType,
                    "toIds": toIds,
                    "content": content
                }
            };
        }
        net.OIM_SendMessage = OIM_SendMessage;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Push_MatchCanceled = /** @class */ (function () {
            function Push_MatchCanceled() {
            }
            return Push_MatchCanceled;
        }());
        net.Push_MatchCanceled = Push_MatchCanceled;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Push_MatchStared = /** @class */ (function () {
            function Push_MatchStared() {
            }
            return Push_MatchStared;
        }());
        net.Push_MatchStared = Push_MatchStared;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Push_MatchTeamBeKicked = /** @class */ (function () {
            function Push_MatchTeamBeKicked() {
            }
            return Push_MatchTeamBeKicked;
        }());
        net.Push_MatchTeamBeKicked = Push_MatchTeamBeKicked;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Push_MatchTeamDismissed = /** @class */ (function () {
            function Push_MatchTeamDismissed() {
            }
            return Push_MatchTeamDismissed;
        }());
        net.Push_MatchTeamDismissed = Push_MatchTeamDismissed;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Push_MatchTeamMemberJoined = /** @class */ (function () {
            function Push_MatchTeamMemberJoined() {
            }
            return Push_MatchTeamMemberJoined;
        }());
        net.Push_MatchTeamMemberJoined = Push_MatchTeamMemberJoined;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Push_MatchTeamMemberLeaved = /** @class */ (function () {
            function Push_MatchTeamMemberLeaved() {
            }
            return Push_MatchTeamMemberLeaved;
        }());
        net.Push_MatchTeamMemberLeaved = Push_MatchTeamMemberLeaved;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Res_Query(version) {
            return {
                "cmd": "Res_Query",
                "params": {
                    "version": version
                }
            };
        }
        net.Res_Query = Res_Query;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var RespAuth_Login = /** @class */ (function () {
            function RespAuth_Login() {
            }
            return RespAuth_Login;
        }());
        net.RespAuth_Login = RespAuth_Login;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var RespRes_Query = /** @class */ (function () {
            function RespRes_Query() {
            }
            return RespRes_Query;
        }());
        net.RespRes_Query = RespRes_Query;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Resp_BasicPlayer = /** @class */ (function () {
            function Resp_BasicPlayer() {
            }
            return Resp_BasicPlayer;
        }());
        net.Resp_BasicPlayer = Resp_BasicPlayer;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Resp_CreateOrder = /** @class */ (function () {
            function Resp_CreateOrder() {
            }
            return Resp_CreateOrder;
        }());
        net.Resp_CreateOrder = Resp_CreateOrder;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Resp_LoginBack = /** @class */ (function () {
            function Resp_LoginBack() {
            }
            return Resp_LoginBack;
        }());
        net.Resp_LoginBack = Resp_LoginBack;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Resp_MatchRank = /** @class */ (function () {
            function Resp_MatchRank() {
            }
            return Resp_MatchRank;
        }());
        net.Resp_MatchRank = Resp_MatchRank;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Resp_None = /** @class */ (function () {
            function Resp_None() {
            }
            return Resp_None;
        }());
        net.Resp_None = Resp_None;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Resp_SeasonCalReward = /** @class */ (function () {
            function Resp_SeasonCalReward() {
            }
            return Resp_SeasonCalReward;
        }());
        net.Resp_SeasonCalReward = Resp_SeasonCalReward;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Resp_Sync = /** @class */ (function () {
            function Resp_Sync() {
            }
            return Resp_Sync;
        }());
        net.Resp_Sync = Resp_Sync;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Resp_TestPong = /** @class */ (function () {
            function Resp_TestPong() {
            }
            return Resp_TestPong;
        }());
        net.Resp_TestPong = Resp_TestPong;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var Resp_TestPush = /** @class */ (function () {
            function Resp_TestPush() {
            }
            return Resp_TestPush;
        }());
        net.Resp_TestPush = Resp_TestPush;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Team_MatchCancel() {
            return {
                "cmd": "Team_MatchCancel",
                "params": {}
            };
        }
        net.Team_MatchCancel = Team_MatchCancel;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Team_MatchStart() {
            return {
                "cmd": "Team_MatchStart",
                "params": {}
            };
        }
        net.Team_MatchStart = Team_MatchStart;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Team_TeamCreate() {
            return {
                "cmd": "Team_TeamCreate",
                "params": {}
            };
        }
        net.Team_TeamCreate = Team_TeamCreate;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Team_TeamJoin(
        /**
         * 队伍id
         */
        teamId, 
        /**
         * 队长id
         */
        masterId) {
            return {
                "cmd": "Team_TeamJoin",
                "params": {
                    "teamId": teamId,
                    "masterId": masterId
                }
            };
        }
        net.Team_TeamJoin = Team_TeamJoin;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Team_TeamKick(
        /**
         * 队友id
         */
        memberId) {
            return {
                "cmd": "Team_TeamKick",
                "params": {
                    "memberId": memberId
                }
            };
        }
        net.Team_TeamKick = Team_TeamKick;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Team_TeamLeave(
        /**
         * 队伍id
         */
        teamId) {
            return {
                "cmd": "Team_TeamLeave",
                "params": {
                    "teamId": teamId
                }
            };
        }
        net.Team_TeamLeave = Team_TeamLeave;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Test_Ping() {
            return {
                "cmd": "Test_Ping",
                "params": {}
            };
        }
        net.Test_Ping = Test_Ping;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Test_Push() {
            return {
                "cmd": "Test_Push",
                "params": {}
            };
        }
        net.Test_Push = Test_Push;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Test_Sync1() {
            return {
                "cmd": "Test_Sync1",
                "params": {}
            };
        }
        net.Test_Sync1 = Test_Sync1;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Test_Sync2() {
            return {
                "cmd": "Test_Sync2",
                "params": {}
            };
        }
        net.Test_Sync2 = Test_Sync2;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Test_Sync3() {
            return {
                "cmd": "Test_Sync3",
                "params": {}
            };
        }
        net.Test_Sync3 = Test_Sync3;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        function Test_Sync4() {
            return {
                "cmd": "Test_Sync4",
                "params": {}
            };
        }
        net.Test_Sync4 = Test_Sync4;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var IMD_MessageContent = /** @class */ (function (_super) {
            __extends(IMD_MessageContent, _super);
            function IMD_MessageContent(properties) {
                return _super.call(this, properties || IMD_MessageContent_1.properties) || this;
            }
            IMD_MessageContent_1 = IMD_MessageContent;
            Object.defineProperty(IMD_MessageContent, "properties", {
                get: function () {
                    if (!IMD_MessageContent_1._map_imd_messagecontent) {
                        IMD_MessageContent_1._map_imd_messagecontent = new Map([
                            ['extra', new syncData.DataType(0, null, "")],
                        ]);
                    }
                    return IMD_MessageContent_1._map_imd_messagecontent;
                },
                enumerable: true,
                configurable: true
            });
            var IMD_MessageContent_1;
            __decorate([
                orange.watch.emit
            ], IMD_MessageContent.prototype, "extra", void 0);
            IMD_MessageContent = IMD_MessageContent_1 = __decorate([
                orange.autorunClass
            ], IMD_MessageContent);
            return IMD_MessageContent;
        }(syncData.DataBase));
        net.IMD_MessageContent = IMD_MessageContent;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_ADScene;
        (function (EM_ADScene) {
            EM_ADScene[EM_ADScene["Bank"] = 1] = "Bank";
            EM_ADScene[EM_ADScene["BattleFail"] = 2] = "BattleFail";
            EM_ADScene[EM_ADScene["FirstShare"] = 3] = "FirstShare";
            EM_ADScene[EM_ADScene["LevelUp"] = 4] = "LevelUp";
        })(EM_ADScene = net.EM_ADScene || (net.EM_ADScene = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_Difficulty_Type;
        (function (EM_Difficulty_Type) {
            EM_Difficulty_Type[EM_Difficulty_Type["Easy"] = 1] = "Easy";
            EM_Difficulty_Type[EM_Difficulty_Type["Normal"] = 2] = "Normal";
            EM_Difficulty_Type[EM_Difficulty_Type["Hard"] = 3] = "Hard";
        })(EM_Difficulty_Type = net.EM_Difficulty_Type || (net.EM_Difficulty_Type = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_FightSubType;
        (function (EM_FightSubType) {
            EM_FightSubType[EM_FightSubType["RankMatch"] = 1] = "RankMatch";
            EM_FightSubType[EM_FightSubType["Friend1v1"] = 2] = "Friend1v1";
            EM_FightSubType[EM_FightSubType["Friend3v3"] = 3] = "Friend3v3";
            EM_FightSubType[EM_FightSubType["HistoryHelper"] = 4] = "HistoryHelper";
            EM_FightSubType[EM_FightSubType["HistoryEnemy"] = 5] = "HistoryEnemy";
        })(EM_FightSubType = net.EM_FightSubType || (net.EM_FightSubType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_FightType;
        (function (EM_FightType) {
            EM_FightType[EM_FightType["Match"] = 1] = "Match";
            EM_FightType[EM_FightType["Friend"] = 2] = "Friend";
            EM_FightType[EM_FightType["History"] = 3] = "History";
        })(EM_FightType = net.EM_FightType || (net.EM_FightType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_HistoryBattleRole;
        (function (EM_HistoryBattleRole) {
            EM_HistoryBattleRole[EM_HistoryBattleRole["Helper"] = 1] = "Helper";
            EM_HistoryBattleRole[EM_HistoryBattleRole["Enemy"] = 2] = "Enemy";
        })(EM_HistoryBattleRole = net.EM_HistoryBattleRole || (net.EM_HistoryBattleRole = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_MatchTeamState;
        (function (EM_MatchTeamState) {
            EM_MatchTeamState[EM_MatchTeamState["Idle"] = 1] = "Idle";
            EM_MatchTeamState[EM_MatchTeamState["Matching"] = 2] = "Matching";
            EM_MatchTeamState[EM_MatchTeamState["Fighting"] = 3] = "Fighting";
        })(EM_MatchTeamState = net.EM_MatchTeamState || (net.EM_MatchTeamState = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_MatchTeamType;
        (function (EM_MatchTeamType) {
            EM_MatchTeamType[EM_MatchTeamType["Single"] = 1] = "Single";
            EM_MatchTeamType[EM_MatchTeamType["Team"] = 2] = "Team";
        })(EM_MatchTeamType = net.EM_MatchTeamType || (net.EM_MatchTeamType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_MessageType;
        (function (EM_MessageType) {
            EM_MessageType[EM_MessageType["Emote"] = 1] = "Emote";
        })(EM_MessageType = net.EM_MessageType || (net.EM_MessageType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_QuizType;
        (function (EM_QuizType) {
            EM_QuizType[EM_QuizType["TrueOrFalse"] = 1] = "TrueOrFalse";
            EM_QuizType[EM_QuizType["Choice"] = 2] = "Choice";
            EM_QuizType[EM_QuizType["Mix"] = 3] = "Mix";
            EM_QuizType[EM_QuizType["Cloze"] = 4] = "Cloze";
            EM_QuizType[EM_QuizType["Match"] = 5] = "Match";
        })(EM_QuizType = net.EM_QuizType || (net.EM_QuizType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_RewardFromType;
        (function (EM_RewardFromType) {
            EM_RewardFromType[EM_RewardFromType["Share"] = 1] = "Share";
            EM_RewardFromType[EM_RewardFromType["Video"] = 2] = "Video";
        })(EM_RewardFromType = net.EM_RewardFromType || (net.EM_RewardFromType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_RoomRoleFlag;
        (function (EM_RoomRoleFlag) {
            EM_RoomRoleFlag[EM_RoomRoleFlag["Fighter"] = 1] = "Fighter";
            EM_RoomRoleFlag[EM_RoomRoleFlag["Viewer"] = 2] = "Viewer";
        })(EM_RoomRoleFlag = net.EM_RoomRoleFlag || (net.EM_RoomRoleFlag = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var EM_RoomType;
        (function (EM_RoomType) {
            EM_RoomType[EM_RoomType["Type1v1"] = 1] = "Type1v1";
            EM_RoomType[EM_RoomType["Type3v3"] = 2] = "Type3v3";
        })(EM_RoomType = net.EM_RoomType || (net.EM_RoomType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_ADGold = /** @class */ (function (_super) {
            __extends(GD_ADGold, _super);
            function GD_ADGold(properties) {
                var _this = _super.call(this, properties || GD_ADGold_1.properties) || this;
                /**
                 * 下次获取时间
                 */
                _this.nextGen = 0;
                /**
                 * 今日领取次数
                 */
                _this.numDay = 0;
                return _this;
            }
            GD_ADGold_1 = GD_ADGold;
            Object.defineProperty(GD_ADGold, "properties", {
                get: function () {
                    if (!GD_ADGold_1._map_gd_adgold) {
                        GD_ADGold_1._map_gd_adgold = new Map([
                            ['nextGen', new syncData.DataType(0, null, 0)],
                            ['numDay', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_ADGold_1._map_gd_adgold;
                },
                enumerable: true,
                configurable: true
            });
            var GD_ADGold_1;
            __decorate([
                orange.watch.emit
            ], GD_ADGold.prototype, "nextGen", void 0);
            __decorate([
                orange.watch.emit
            ], GD_ADGold.prototype, "numDay", void 0);
            GD_ADGold = GD_ADGold_1 = __decorate([
                orange.autorunClass
            ], GD_ADGold);
            return GD_ADGold;
        }(syncData.DataBase));
        net.GD_ADGold = GD_ADGold;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_AddFriendReceive = /** @class */ (function (_super) {
            __extends(GD_AddFriendReceive, _super);
            function GD_AddFriendReceive(properties) {
                var _this = _super.call(this, properties || GD_AddFriendReceive_1.properties) || this;
                /**
                 * 发送者基础信息
                 */
                _this.senderInfo = _this.createProperty('senderInfo');
                /**
                 * 发送者uid
                 */
                _this.senderUID = 0;
                /**
                 * 请求时间
                 */
                _this.tm = 0;
                /**
                 * 好友请求结果
                 */
                _this.result = _this.createProperty('result');
                /**
                 * 发送者等级
                 */
                _this.senderLevel = 0;
                return _this;
            }
            GD_AddFriendReceive_1 = GD_AddFriendReceive;
            Object.defineProperty(GD_AddFriendReceive, "properties", {
                get: function () {
                    if (!GD_AddFriendReceive_1._map_gd_addfriendreceive) {
                        GD_AddFriendReceive_1._map_gd_addfriendreceive = new Map([
                            ['senderInfo', new syncData.DataType(1, net.GD_UserInfo)],
                            ['senderUID', new syncData.DataType(0, null, 0)],
                            ['tm', new syncData.DataType(0, null, 0)],
                            ['result', new syncData.DataType(0, net.GD_AgreeOrRefuse)],
                            ['senderLevel', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_AddFriendReceive_1._map_gd_addfriendreceive;
                },
                enumerable: true,
                configurable: true
            });
            var GD_AddFriendReceive_1;
            __decorate([
                orange.watch.emit
            ], GD_AddFriendReceive.prototype, "senderInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_AddFriendReceive.prototype, "senderUID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_AddFriendReceive.prototype, "tm", void 0);
            __decorate([
                orange.watch.emit
            ], GD_AddFriendReceive.prototype, "result", void 0);
            __decorate([
                orange.watch.emit
            ], GD_AddFriendReceive.prototype, "senderLevel", void 0);
            GD_AddFriendReceive = GD_AddFriendReceive_1 = __decorate([
                orange.autorunClass
            ], GD_AddFriendReceive);
            return GD_AddFriendReceive;
        }(syncData.DataBase));
        net.GD_AddFriendReceive = GD_AddFriendReceive;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_AddFriendSend = /** @class */ (function (_super) {
            __extends(GD_AddFriendSend, _super);
            function GD_AddFriendSend(properties) {
                var _this = _super.call(this, properties || GD_AddFriendSend_1.properties) || this;
                /**
                 * 接收者基础信息
                 */
                _this.receiverInfo = _this.createProperty('receiverInfo');
                /**
                 * 接收者uid
                 */
                _this.receiverUID = 0;
                /**
                 * 请求时间
                 */
                _this.tm = 0;
                /**
                 * 好友请求结果
                 */
                _this.result = _this.createProperty('result');
                /**
                 * 接收者等级
                 */
                _this.receiverLevel = 0;
                return _this;
            }
            GD_AddFriendSend_1 = GD_AddFriendSend;
            Object.defineProperty(GD_AddFriendSend, "properties", {
                get: function () {
                    if (!GD_AddFriendSend_1._map_gd_addfriendsend) {
                        GD_AddFriendSend_1._map_gd_addfriendsend = new Map([
                            ['receiverInfo', new syncData.DataType(1, net.GD_UserInfo)],
                            ['receiverUID', new syncData.DataType(0, null, 0)],
                            ['tm', new syncData.DataType(0, null, 0)],
                            ['result', new syncData.DataType(0, net.GD_AgreeOrRefuse)],
                            ['receiverLevel', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_AddFriendSend_1._map_gd_addfriendsend;
                },
                enumerable: true,
                configurable: true
            });
            var GD_AddFriendSend_1;
            __decorate([
                orange.watch.emit
            ], GD_AddFriendSend.prototype, "receiverInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_AddFriendSend.prototype, "receiverUID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_AddFriendSend.prototype, "tm", void 0);
            __decorate([
                orange.watch.emit
            ], GD_AddFriendSend.prototype, "result", void 0);
            __decorate([
                orange.watch.emit
            ], GD_AddFriendSend.prototype, "receiverLevel", void 0);
            GD_AddFriendSend = GD_AddFriendSend_1 = __decorate([
                orange.autorunClass
            ], GD_AddFriendSend);
            return GD_AddFriendSend;
        }(syncData.DataBase));
        net.GD_AddFriendSend = GD_AddFriendSend;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_AgreeOrRefuse;
        (function (GD_AgreeOrRefuse) {
            GD_AgreeOrRefuse[GD_AgreeOrRefuse["UnHandle"] = 1] = "UnHandle";
            GD_AgreeOrRefuse[GD_AgreeOrRefuse["Agree"] = 2] = "Agree";
            GD_AgreeOrRefuse[GD_AgreeOrRefuse["Refuse"] = 3] = "Refuse";
        })(GD_AgreeOrRefuse = net.GD_AgreeOrRefuse || (net.GD_AgreeOrRefuse = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_Bag = /** @class */ (function (_super) {
            __extends(GD_Bag, _super);
            function GD_Bag(properties) {
                var _this = _super.call(this, properties || GD_Bag.properties) || this;
                _this.items = _this.createProperty('items');
                _this.list = [];
                return _this;
            }
            Object.defineProperty(GD_Bag, "properties", {
                get: function () {
                    if (!GD_Bag._map) {
                        GD_Bag._map = new Map([
                            ['items', new syncData.DataType(3, net.GD_Item)],
                        ]);
                    }
                    return GD_Bag._map;
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                orange.watch
            ], GD_Bag.prototype, "items", void 0);
            __decorate([
                orange.watch
            ], GD_Bag.prototype, "list", void 0);
            return GD_Bag;
        }(syncData.DataBase));
        net.GD_Bag = GD_Bag;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_BankHelper = /** @class */ (function (_super) {
            __extends(GD_BankHelper, _super);
            function GD_BankHelper(properties) {
                var _this = _super.call(this, properties || GD_BankHelper_1.properties) || this;
                _this.uid = 0;
                _this.userInfo = _this.createProperty('userInfo');
                _this.headInfo = _this.createProperty('headInfo');
                /**
                 * 结束时间
                 */
                _this.endTime = 0;
                return _this;
            }
            GD_BankHelper_1 = GD_BankHelper;
            Object.defineProperty(GD_BankHelper, "properties", {
                get: function () {
                    if (!GD_BankHelper_1._map_gd_bankhelper) {
                        GD_BankHelper_1._map_gd_bankhelper = new Map([
                            ['uid', new syncData.DataType(0, null, 0)],
                            ['userInfo', new syncData.DataType(1, net.GD_UserInfo)],
                            ['headInfo', new syncData.DataType(1, net.GD_HeadInfo)],
                            ['endTime', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_BankHelper_1._map_gd_bankhelper;
                },
                enumerable: true,
                configurable: true
            });
            var GD_BankHelper_1;
            __decorate([
                orange.watch.emit
            ], GD_BankHelper.prototype, "uid", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BankHelper.prototype, "userInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BankHelper.prototype, "headInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BankHelper.prototype, "endTime", void 0);
            GD_BankHelper = GD_BankHelper_1 = __decorate([
                orange.autorunClass
            ], GD_BankHelper);
            return GD_BankHelper;
        }(syncData.DataBase));
        net.GD_BankHelper = GD_BankHelper;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_BankInfo = /** @class */ (function (_super) {
            __extends(GD_BankInfo, _super);
            function GD_BankInfo(properties) {
                var _this = _super.call(this, properties || GD_BankInfo_1.properties) || this;
                /**
                 * 下一次领奖时间
                 */
                _this.nextRewardTime = 0;
                /**
                 * 下一次广告领奖时间
                 */
                _this.nextAdRewardTime = 0;
                /**
                 * 剩余广告奖励次数
                 */
                _this.remainAdTimes = 0;
                /**
                 * 下一次重置广告奖励次数的时间
                 */
                _this.nextAdResetTime = 0;
                /**
                 * 助力的好友
                 */
                _this.helpers = _this.createProperty('helpers');
                return _this;
            }
            GD_BankInfo_1 = GD_BankInfo;
            Object.defineProperty(GD_BankInfo, "properties", {
                get: function () {
                    if (!GD_BankInfo_1._map_gd_bankinfo) {
                        GD_BankInfo_1._map_gd_bankinfo = new Map([
                            ['nextRewardTime', new syncData.DataType(0, null, 0)],
                            ['nextAdRewardTime', new syncData.DataType(0, null, 0)],
                            ['remainAdTimes', new syncData.DataType(0, null, 0)],
                            ['nextAdResetTime', new syncData.DataType(0, null, 0)],
                            ['helpers', new syncData.DataType(3, net.GD_BankHelper)],
                        ]);
                    }
                    return GD_BankInfo_1._map_gd_bankinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_BankInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_BankInfo.prototype, "nextRewardTime", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BankInfo.prototype, "nextAdRewardTime", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BankInfo.prototype, "remainAdTimes", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BankInfo.prototype, "nextAdResetTime", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BankInfo.prototype, "helpers", void 0);
            GD_BankInfo = GD_BankInfo_1 = __decorate([
                orange.autorunClass
            ], GD_BankInfo);
            return GD_BankInfo;
        }(syncData.DataBase));
        net.GD_BankInfo = GD_BankInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_BaseSyncData = /** @class */ (function (_super) {
            __extends(GD_BaseSyncData, _super);
            function GD_BaseSyncData(properties) {
                var _this = _super.call(this, properties || GD_BaseSyncData_1.properties) || this;
                /**
                 * 系统时间
                 */
                _this.sysTime = 0;
                return _this;
            }
            GD_BaseSyncData_1 = GD_BaseSyncData;
            Object.defineProperty(GD_BaseSyncData, "properties", {
                get: function () {
                    if (!GD_BaseSyncData_1._map_gd_basesyncdata) {
                        GD_BaseSyncData_1._map_gd_basesyncdata = new Map([
                            ['sysTime', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_BaseSyncData_1._map_gd_basesyncdata;
                },
                enumerable: true,
                configurable: true
            });
            var GD_BaseSyncData_1;
            __decorate([
                orange.watch.emit
            ], GD_BaseSyncData.prototype, "sysTime", void 0);
            GD_BaseSyncData = GD_BaseSyncData_1 = __decorate([
                orange.autorunClass
            ], GD_BaseSyncData);
            return GD_BaseSyncData;
        }(syncData.DataBase));
        net.GD_BaseSyncData = GD_BaseSyncData;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_BattleInfo = /** @class */ (function (_super) {
            __extends(GD_BattleInfo, _super);
            function GD_BattleInfo(properties) {
                var _this = _super.call(this, properties || GD_BattleInfo_1.properties) || this;
                /**
                 * 战斗id
                 */
                _this.iD = 0;
                _this._key_ = "iD";
                /**
                 * 题目列表
                 */
                _this.quizMap = _this.createProperty('quizMap');
                /**
                 * 题号
                 */
                _this.quizNum = 0;
                /**
                 * 队伍数组
                 */
                _this.teams = _this.createProperty('teams');
                /**
                 * 玩家信息
                 */
                _this.playerBattleInfo = _this.createProperty('playerBattleInfo');
                /**
                 * 下一状态开始时间
                 */
                _this.nextStateBeginTime = 0;
                /**
                 * 当前战斗状态
                 */
                _this.battleState = _this.createProperty('battleState');
                /**
                 * 战斗类型
                 */
                _this.battleType = _this.createProperty('battleType');
                /**
                 * 对战子类型
                 */
                _this.battleSubType = _this.createProperty('battleSubType');
                return _this;
            }
            GD_BattleInfo_1 = GD_BattleInfo;
            Object.defineProperty(GD_BattleInfo, "properties", {
                get: function () {
                    if (!GD_BattleInfo_1._map_gd_battleinfo) {
                        GD_BattleInfo_1._map_gd_battleinfo = new Map([
                            ['config', new syncData.DataType(0, null, "")],
                            ['iD', new syncData.DataType(0, null, 0)],
                            ['quizMap', new syncData.DataType(3, net.GD_QuizDataShare)],
                            ['quizNum', new syncData.DataType(0, null, 0)],
                            ['teams', new syncData.DataType(3, net.GD_Team)],
                            ['playerBattleInfo', new syncData.DataType(3, net.GD_PlayerBattleInfo)],
                            ['nextStateBeginTime', new syncData.DataType(0, null, 0)],
                            ['battleState', new syncData.DataType(0, net.GD_BattleState)],
                            ['battleType', new syncData.DataType(0, net.EM_FightType)],
                            ['battleSubType', new syncData.DataType(0, net.EM_FightSubType)],
                        ]);
                    }
                    return GD_BattleInfo_1._map_gd_battleinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_BattleInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_BattleInfo.prototype, "iD", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BattleInfo.prototype, "quizMap", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BattleInfo.prototype, "quizNum", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BattleInfo.prototype, "teams", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BattleInfo.prototype, "playerBattleInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BattleInfo.prototype, "nextStateBeginTime", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BattleInfo.prototype, "battleState", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BattleInfo.prototype, "battleType", void 0);
            __decorate([
                orange.watch.emit
            ], GD_BattleInfo.prototype, "battleSubType", void 0);
            GD_BattleInfo = GD_BattleInfo_1 = __decorate([
                orange.autorunClass
            ], GD_BattleInfo);
            return GD_BattleInfo;
        }(syncData.DataBase));
        net.GD_BattleInfo = GD_BattleInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_BattleState;
        (function (GD_BattleState) {
            GD_BattleState[GD_BattleState["Invalid"] = 1] = "Invalid";
            GD_BattleState[GD_BattleState["Ready"] = 2] = "Ready";
            GD_BattleState[GD_BattleState["FindQuiz"] = 3] = "FindQuiz";
            GD_BattleState[GD_BattleState["Answering"] = 4] = "Answering";
            GD_BattleState[GD_BattleState["CalQuiz"] = 5] = "CalQuiz";
            GD_BattleState[GD_BattleState["EndBattle"] = 6] = "EndBattle";
        })(GD_BattleState = net.GD_BattleState || (net.GD_BattleState = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_CharacterInfo = /** @class */ (function (_super) {
            __extends(GD_CharacterInfo, _super);
            function GD_CharacterInfo(properties) {
                var _this = _super.call(this, properties || GD_CharacterInfo_1.properties) || this;
                /**
                 * 当前使用的伙伴
                 */
                _this.slots = _this.createProperty('slots');
                /**
                 * 拥有的伙伴列表
                 */
                _this.list = _this.createProperty('list');
                return _this;
            }
            GD_CharacterInfo_1 = GD_CharacterInfo;
            Object.defineProperty(GD_CharacterInfo, "properties", {
                get: function () {
                    if (!GD_CharacterInfo_1._map_gd_characterinfo) {
                        GD_CharacterInfo_1._map_gd_characterinfo = new Map([
                            ['slots', new syncData.DataType(3, null, 0)],
                            ['list', new syncData.DataType(2, null, 0)],
                        ]);
                    }
                    return GD_CharacterInfo_1._map_gd_characterinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_CharacterInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_CharacterInfo.prototype, "slots", void 0);
            __decorate([
                orange.watch.emit
            ], GD_CharacterInfo.prototype, "list", void 0);
            GD_CharacterInfo = GD_CharacterInfo_1 = __decorate([
                orange.autorunClass
            ], GD_CharacterInfo);
            return GD_CharacterInfo;
        }(syncData.DataBase));
        net.GD_CharacterInfo = GD_CharacterInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_ChatMessage = /** @class */ (function (_super) {
            __extends(GD_ChatMessage, _super);
            function GD_ChatMessage(properties) {
                var _this = _super.call(this, properties || GD_ChatMessage_1.properties) || this;
                /**
                 * 发送者id
                 */
                _this.senderId = 0;
                /**
                 * 消息类型
                 */
                _this.messageType = _this.createProperty('messageType');
                /**
                 * 表情id
                 */
                _this.emoteId = 0;
                /**
                 * 接收者
                 */
                _this.receiverIds = _this.createProperty('receiverIds');
                return _this;
            }
            GD_ChatMessage_1 = GD_ChatMessage;
            Object.defineProperty(GD_ChatMessage, "properties", {
                get: function () {
                    if (!GD_ChatMessage_1._map_gd_chatmessage) {
                        GD_ChatMessage_1._map_gd_chatmessage = new Map([
                            ['senderId', new syncData.DataType(0, null, 0)],
                            ['messageType', new syncData.DataType(0, net.EM_MessageType)],
                            ['content', new syncData.DataType(0, null, "")],
                            ['emoteId', new syncData.DataType(0, null, 0)],
                            ['receiverIds', new syncData.DataType(2, null, 0)],
                        ]);
                    }
                    return GD_ChatMessage_1._map_gd_chatmessage;
                },
                enumerable: true,
                configurable: true
            });
            var GD_ChatMessage_1;
            __decorate([
                orange.watch.emit
            ], GD_ChatMessage.prototype, "senderId", void 0);
            __decorate([
                orange.watch.emit
            ], GD_ChatMessage.prototype, "messageType", void 0);
            __decorate([
                orange.watch.emit
            ], GD_ChatMessage.prototype, "content", void 0);
            __decorate([
                orange.watch.emit
            ], GD_ChatMessage.prototype, "emoteId", void 0);
            __decorate([
                orange.watch.emit
            ], GD_ChatMessage.prototype, "receiverIds", void 0);
            GD_ChatMessage = GD_ChatMessage_1 = __decorate([
                orange.autorunClass
            ], GD_ChatMessage);
            return GD_ChatMessage;
        }(syncData.DataBase));
        net.GD_ChatMessage = GD_ChatMessage;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_Choose_Data = /** @class */ (function (_super) {
            __extends(GD_Choose_Data, _super);
            function GD_Choose_Data(properties) {
                var _this = _super.call(this, properties || GD_Choose_Data_1.properties) || this;
                /**
                 * 答案
                 */
                _this.chooseData = _this.createProperty('chooseData');
                /**
                 * 花费时间
                 */
                _this.costTime = 0;
                return _this;
            }
            GD_Choose_Data_1 = GD_Choose_Data;
            Object.defineProperty(GD_Choose_Data, "properties", {
                get: function () {
                    if (!GD_Choose_Data_1._map_gd_choose_data) {
                        GD_Choose_Data_1._map_gd_choose_data = new Map([
                            ['chooseData', new syncData.DataType(2, null, 0)],
                            ['costTime', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_Choose_Data_1._map_gd_choose_data;
                },
                enumerable: true,
                configurable: true
            });
            var GD_Choose_Data_1;
            __decorate([
                orange.watch.emit
            ], GD_Choose_Data.prototype, "chooseData", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Choose_Data.prototype, "costTime", void 0);
            GD_Choose_Data = GD_Choose_Data_1 = __decorate([
                orange.autorunClass
            ], GD_Choose_Data);
            return GD_Choose_Data;
        }(syncData.DataBase));
        net.GD_Choose_Data = GD_Choose_Data;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_DailyInfo = /** @class */ (function (_super) {
            __extends(GD_DailyInfo, _super);
            function GD_DailyInfo(properties) {
                var _this = _super.call(this, properties || GD_DailyInfo_1.properties) || this;
                /**
                 * 今日好友对战次数
                 */
                _this.friendBattleCount = 0;
                return _this;
            }
            GD_DailyInfo_1 = GD_DailyInfo;
            Object.defineProperty(GD_DailyInfo, "properties", {
                get: function () {
                    if (!GD_DailyInfo_1._map_gd_dailyinfo) {
                        GD_DailyInfo_1._map_gd_dailyinfo = new Map([
                            ['friendBattleCount', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_DailyInfo_1._map_gd_dailyinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_DailyInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_DailyInfo.prototype, "friendBattleCount", void 0);
            GD_DailyInfo = GD_DailyInfo_1 = __decorate([
                orange.autorunClass
            ], GD_DailyInfo);
            return GD_DailyInfo;
        }(syncData.DataBase));
        net.GD_DailyInfo = GD_DailyInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_EmoteInfo = /** @class */ (function (_super) {
            __extends(GD_EmoteInfo, _super);
            function GD_EmoteInfo(properties) {
                var _this = _super.call(this, properties || GD_EmoteInfo_1.properties) || this;
                /**
                 * 当前使用列表
                 */
                _this.use = _this.createProperty('use');
                /**
                 * 表情列表
                 */
                _this.list = _this.createProperty('list');
                return _this;
            }
            GD_EmoteInfo_1 = GD_EmoteInfo;
            Object.defineProperty(GD_EmoteInfo, "properties", {
                get: function () {
                    if (!GD_EmoteInfo_1._map_gd_emoteinfo) {
                        GD_EmoteInfo_1._map_gd_emoteinfo = new Map([
                            ['use', new syncData.DataType(2, null, 0)],
                            ['list', new syncData.DataType(2, null, 0)],
                        ]);
                    }
                    return GD_EmoteInfo_1._map_gd_emoteinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_EmoteInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_EmoteInfo.prototype, "use", void 0);
            __decorate([
                orange.watch.emit
            ], GD_EmoteInfo.prototype, "list", void 0);
            GD_EmoteInfo = GD_EmoteInfo_1 = __decorate([
                orange.autorunClass
            ], GD_EmoteInfo);
            return GD_EmoteInfo;
        }(syncData.DataBase));
        net.GD_EmoteInfo = GD_EmoteInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_FriendInfo = /** @class */ (function (_super) {
            __extends(GD_FriendInfo, _super);
            function GD_FriendInfo(properties) {
                var _this = _super.call(this, properties || GD_FriendInfo_1.properties) || this;
                /**
                 * 玩家信息
                 */
                _this.playerInfo = _this.createProperty('playerInfo');
                /**
                 * 在线状态
                 */
                _this.onlineState = _this.createProperty('onlineState');
                return _this;
            }
            GD_FriendInfo_1 = GD_FriendInfo;
            Object.defineProperty(GD_FriendInfo, "properties", {
                get: function () {
                    if (!GD_FriendInfo_1._map_gd_friendinfo) {
                        GD_FriendInfo_1._map_gd_friendinfo = new Map([
                            ['playerInfo', new syncData.DataType(1, net.GD_Player)],
                            ['onlineState', new syncData.DataType(0, net.GD_OnlineState)],
                        ]);
                    }
                    return GD_FriendInfo_1._map_gd_friendinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_FriendInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_FriendInfo.prototype, "playerInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendInfo.prototype, "onlineState", void 0);
            GD_FriendInfo = GD_FriendInfo_1 = __decorate([
                orange.autorunClass
            ], GD_FriendInfo);
            return GD_FriendInfo;
        }(syncData.DataBase));
        net.GD_FriendInfo = GD_FriendInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_FriendMatchRoom = /** @class */ (function (_super) {
            __extends(GD_FriendMatchRoom, _super);
            function GD_FriendMatchRoom(properties) {
                var _this = _super.call(this, properties || GD_FriendMatchRoom_1.properties) || this;
                /**
                 * 房间id
                 */
                _this.iD = 0;
                _this._key_ = "iD";
                /**
                 * 创建者uid
                 */
                _this.creatorID = 0;
                /**
                 * 房主id
                 */
                _this.managerId = 0;
                /**
                 * 玩家信息
                 */
                _this.members = _this.createProperty('members');
                /**
                 * 队伍A成员
                 */
                _this.teamA = _this.createProperty('teamA');
                /**
                 * 队伍B成员
                 */
                _this.teamB = _this.createProperty('teamB');
                /**
                 * 题目难度
                 */
                _this.difficulty = _this.createProperty('difficulty');
                /**
                 * 房间人数上限
                 */
                _this.maxPlayers = 0;
                /**
                 * 创建时间
                 */
                _this.createAt = 0;
                /**
                 * 过期时间
                 */
                _this.endTime = 0;
                /**
                 * 当前房间状态
                 */
                _this.roomState = _this.createProperty('roomState');
                /**
                 * 观众上限
                 */
                _this.viewerCount = 0;
                /**
                 * 房间类型
                 */
                _this.roomType = _this.createProperty('roomType');
                /**
                 * 分享文案id
                 */
                _this.shareTextID = 0;
                return _this;
            }
            GD_FriendMatchRoom_1 = GD_FriendMatchRoom;
            Object.defineProperty(GD_FriendMatchRoom, "properties", {
                get: function () {
                    if (!GD_FriendMatchRoom_1._map_gd_friendmatchroom) {
                        GD_FriendMatchRoom_1._map_gd_friendmatchroom = new Map([
                            ['iD', new syncData.DataType(0, null, 0)],
                            ['creatorID', new syncData.DataType(0, null, 0)],
                            ['managerId', new syncData.DataType(0, null, 0)],
                            ['members', new syncData.DataType(3, net.GD_RoomMemberInfo)],
                            ['teamA', new syncData.DataType(2, null, 0)],
                            ['teamB', new syncData.DataType(2, null, 0)],
                            ['difficulty', new syncData.DataType(0, net.EM_Difficulty_Type)],
                            ['maxPlayers', new syncData.DataType(0, null, 0)],
                            ['createAt', new syncData.DataType(0, null, 0)],
                            ['endTime', new syncData.DataType(0, null, 0)],
                            ['roomState', new syncData.DataType(0, net.GD_FriendRoomState)],
                            ['viewerCount', new syncData.DataType(0, null, 0)],
                            ['roomType', new syncData.DataType(0, net.EM_RoomType)],
                            ['shareTextID', new syncData.DataType(0, null, 0)],
                            ['shareActivityId', new syncData.DataType(0, null, "")],
                        ]);
                    }
                    return GD_FriendMatchRoom_1._map_gd_friendmatchroom;
                },
                enumerable: true,
                configurable: true
            });
            var GD_FriendMatchRoom_1;
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "iD", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "creatorID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "managerId", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "members", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "teamA", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "teamB", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "difficulty", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "maxPlayers", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "createAt", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "endTime", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "roomState", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "viewerCount", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "roomType", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "shareTextID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_FriendMatchRoom.prototype, "shareActivityId", void 0);
            GD_FriendMatchRoom = GD_FriendMatchRoom_1 = __decorate([
                orange.autorunClass
            ], GD_FriendMatchRoom);
            return GD_FriendMatchRoom;
        }(syncData.DataBase));
        net.GD_FriendMatchRoom = GD_FriendMatchRoom;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_FriendRoomState;
        (function (GD_FriendRoomState) {
            GD_FriendRoomState[GD_FriendRoomState["Invalid"] = 1] = "Invalid";
            GD_FriendRoomState[GD_FriendRoomState["Idle"] = 2] = "Idle";
            GD_FriendRoomState[GD_FriendRoomState["Fighting"] = 3] = "Fighting";
        })(GD_FriendRoomState = net.GD_FriendRoomState || (net.GD_FriendRoomState = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_HeadInfo = /** @class */ (function (_super) {
            __extends(GD_HeadInfo, _super);
            function GD_HeadInfo(properties) {
                var _this = _super.call(this, properties || GD_HeadInfo_1.properties) || this;
                /**
                 * 当前头像框ID，-1无头像
                 */
                _this.curHead = 0;
                /**
                 * 拥有头像列表
                 */
                _this.headList = _this.createProperty('headList');
                return _this;
            }
            GD_HeadInfo_1 = GD_HeadInfo;
            Object.defineProperty(GD_HeadInfo, "properties", {
                get: function () {
                    if (!GD_HeadInfo_1._map_gd_headinfo) {
                        GD_HeadInfo_1._map_gd_headinfo = new Map([
                            ['curHead', new syncData.DataType(0, null, 0)],
                            ['headList', new syncData.DataType(2, null, 0)],
                        ]);
                    }
                    return GD_HeadInfo_1._map_gd_headinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_HeadInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_HeadInfo.prototype, "curHead", void 0);
            __decorate([
                orange.watch.emit
            ], GD_HeadInfo.prototype, "headList", void 0);
            GD_HeadInfo = GD_HeadInfo_1 = __decorate([
                orange.autorunClass
            ], GD_HeadInfo);
            return GD_HeadInfo;
        }(syncData.DataBase));
        net.GD_HeadInfo = GD_HeadInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_Item = /** @class */ (function (_super) {
            __extends(GD_Item, _super);
            function GD_Item(properties) {
                var _this = _super.call(this, properties || GD_Item.properties) || this;
                _this.id = _this.createProperty('id');
                _this.typeId = _this.createProperty('typeId');
                _this.count = _this.createProperty('count');
                return _this;
            }
            Object.defineProperty(GD_Item, "properties", {
                get: function () {
                    if (!GD_Item._map) {
                        GD_Item._map = new Map([
                            ['id', new syncData.DataType(0, null, 0)],
                            ['typeId', new syncData.DataType(0, null, 0)],
                            ['count', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_Item._map;
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                orange.watch
            ], GD_Item.prototype, "id", void 0);
            __decorate([
                orange.watch
            ], GD_Item.prototype, "typeId", void 0);
            __decorate([
                orange.watch
            ], GD_Item.prototype, "count", void 0);
            return GD_Item;
        }(syncData.DataBase));
        net.GD_Item = GD_Item;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_ItemSubType;
        (function (GD_ItemSubType) {
            GD_ItemSubType[GD_ItemSubType["Gold"] = 2] = "Gold";
            GD_ItemSubType[GD_ItemSubType["Exp"] = 3] = "Exp";
            GD_ItemSubType[GD_ItemSubType["ExpBuf"] = 4] = "ExpBuf";
            GD_ItemSubType[GD_ItemSubType["GoldBuf"] = 5] = "GoldBuf";
            GD_ItemSubType[GD_ItemSubType["HoldBuf"] = 6] = "HoldBuf";
            GD_ItemSubType[GD_ItemSubType["HelpBuf"] = 7] = "HelpBuf";
        })(GD_ItemSubType = net.GD_ItemSubType || (net.GD_ItemSubType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_ItemType;
        (function (GD_ItemType) {
            GD_ItemType[GD_ItemType["Gold"] = 0] = "Gold";
            GD_ItemType[GD_ItemType["Box"] = 1] = "Box";
            GD_ItemType[GD_ItemType["Change"] = 2] = "Change";
            GD_ItemType[GD_ItemType["Buf"] = 3] = "Buf";
        })(GD_ItemType = net.GD_ItemType || (net.GD_ItemType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_MatchInfo = /** @class */ (function (_super) {
            __extends(GD_MatchInfo, _super);
            function GD_MatchInfo(properties) {
                var _this = _super.call(this, properties || GD_MatchInfo_1.properties) || this;
                /**
                 * 最高段位Id
                 */
                _this.maxMatchID = 0;
                /**
                 * 段位Id
                 */
                _this.matchID = 0;
                /**
                 * 段位星星数
                 */
                _this.matchStar = 0;
                /**
                 * 王者段位排名
                 */
                _this.matchRank = 0;
                /**
                 * 匹配积分
                 */
                _this.matchScore = 0;
                /**
                 * 达到王者次数
                 */
                _this.toWzNum = 0;
                /**
                 * mvp次数
                 */
                _this.mvpNum = 0;
                /**
                 * 连胜
                 */
                _this.rowWin = 0;
                /**
                 * 历史最高连胜
                 */
                _this.maxRowWin = 0;
                /**
                 * 获胜场次
                 */
                _this.winRoom = 0;
                /**
                 * 总场次
                 */
                _this.roomNum = 0;
                /**
                 * 大类能力值 -- 计算值
                 */
                _this.abilityStats = _this.createProperty('abilityStats');
                /**
                 * 答对统计按小分类
                 */
                _this.rightStats = _this.createProperty('rightStats');
                return _this;
            }
            GD_MatchInfo_1 = GD_MatchInfo;
            Object.defineProperty(GD_MatchInfo, "properties", {
                get: function () {
                    if (!GD_MatchInfo_1._map_gd_matchinfo) {
                        GD_MatchInfo_1._map_gd_matchinfo = new Map([
                            ['maxMatchID', new syncData.DataType(0, null, 0)],
                            ['matchID', new syncData.DataType(0, null, 0)],
                            ['matchStar', new syncData.DataType(0, null, 0)],
                            ['matchRank', new syncData.DataType(0, null, 0)],
                            ['matchScore', new syncData.DataType(0, null, 0)],
                            ['toWzNum', new syncData.DataType(0, null, 0)],
                            ['mvpNum', new syncData.DataType(0, null, 0)],
                            ['rowWin', new syncData.DataType(0, null, 0)],
                            ['maxRowWin', new syncData.DataType(0, null, 0)],
                            ['winRoom', new syncData.DataType(0, null, 0)],
                            ['roomNum', new syncData.DataType(0, null, 0)],
                            ['abilityStats', new syncData.DataType(3, null, 0)],
                            ['rightStats', new syncData.DataType(3, null, 0)],
                        ]);
                    }
                    return GD_MatchInfo_1._map_gd_matchinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_MatchInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "maxMatchID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "matchID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "matchStar", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "matchRank", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "matchScore", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "toWzNum", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "mvpNum", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "rowWin", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "maxRowWin", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "winRoom", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "roomNum", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "abilityStats", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchInfo.prototype, "rightStats", void 0);
            GD_MatchInfo = GD_MatchInfo_1 = __decorate([
                orange.autorunClass
            ], GD_MatchInfo);
            return GD_MatchInfo;
        }(syncData.DataBase));
        net.GD_MatchInfo = GD_MatchInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_MatchTeam = /** @class */ (function (_super) {
            __extends(GD_MatchTeam, _super);
            function GD_MatchTeam(properties) {
                var _this = _super.call(this, properties || GD_MatchTeam_1.properties) || this;
                /**
                 * 队伍id
                 */
                _this.id = 0;
                /**
                 * 队长id
                 */
                _this.masterId = 0;
                /**
                 * 成员信息,包括队长
                 */
                _this.members = _this.createProperty('members');
                /**
                 * 队伍类型
                 */
                _this.type = _this.createProperty('type');
                /**
                 * 队伍状态
                 */
                _this.state = _this.createProperty('state');
                /**
                 * 队伍状态过期时间点，防止意外卡死
                 */
                _this.stateTimeout = 0;
                return _this;
            }
            GD_MatchTeam_1 = GD_MatchTeam;
            Object.defineProperty(GD_MatchTeam, "properties", {
                get: function () {
                    if (!GD_MatchTeam_1._map_gd_matchteam) {
                        GD_MatchTeam_1._map_gd_matchteam = new Map([
                            ['id', new syncData.DataType(0, null, 0)],
                            ['masterId', new syncData.DataType(0, null, 0)],
                            ['members', new syncData.DataType(3, net.GD_MatchTeamMember)],
                            ['type', new syncData.DataType(0, net.EM_MatchTeamType)],
                            ['state', new syncData.DataType(0, net.EM_MatchTeamState)],
                            ['stateTimeout', new syncData.DataType(0, null, 0)],
                            ['shareActivityId', new syncData.DataType(0, null, "")],
                        ]);
                    }
                    return GD_MatchTeam_1._map_gd_matchteam;
                },
                enumerable: true,
                configurable: true
            });
            var GD_MatchTeam_1;
            __decorate([
                orange.watch.emit
            ], GD_MatchTeam.prototype, "id", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeam.prototype, "masterId", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeam.prototype, "members", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeam.prototype, "type", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeam.prototype, "state", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeam.prototype, "stateTimeout", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeam.prototype, "shareActivityId", void 0);
            GD_MatchTeam = GD_MatchTeam_1 = __decorate([
                orange.autorunClass
            ], GD_MatchTeam);
            return GD_MatchTeam;
        }(syncData.DataBase));
        net.GD_MatchTeam = GD_MatchTeam;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_MatchTeamInfo = /** @class */ (function (_super) {
            __extends(GD_MatchTeamInfo, _super);
            function GD_MatchTeamInfo(properties) {
                var _this = _super.call(this, properties || GD_MatchTeamInfo_1.properties) || this;
                /**
                 * 队伍ID
                 */
                _this.teamID = 0;
                /**
                 * 成员列表
                 */
                _this.members = _this.createProperty('members');
                return _this;
            }
            GD_MatchTeamInfo_1 = GD_MatchTeamInfo;
            Object.defineProperty(GD_MatchTeamInfo, "properties", {
                get: function () {
                    if (!GD_MatchTeamInfo_1._map_gd_matchteaminfo) {
                        GD_MatchTeamInfo_1._map_gd_matchteaminfo = new Map([
                            ['teamID', new syncData.DataType(0, null, 0)],
                            ['members', new syncData.DataType(2, net.GD_Player)],
                        ]);
                    }
                    return GD_MatchTeamInfo_1._map_gd_matchteaminfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_MatchTeamInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_MatchTeamInfo.prototype, "teamID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeamInfo.prototype, "members", void 0);
            GD_MatchTeamInfo = GD_MatchTeamInfo_1 = __decorate([
                orange.autorunClass
            ], GD_MatchTeamInfo);
            return GD_MatchTeamInfo;
        }(syncData.DataBase));
        net.GD_MatchTeamInfo = GD_MatchTeamInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_MatchTeamMember = /** @class */ (function (_super) {
            __extends(GD_MatchTeamMember, _super);
            function GD_MatchTeamMember(properties) {
                var _this = _super.call(this, properties || GD_MatchTeamMember_1.properties) || this;
                /**
                 * 角色id
                 */
                _this.id = 0;
                /**
                 * 队伍中的位置
                 */
                _this.idx = 0;
                /**
                 * 角色等级
                 */
                _this.level = 0;
                /**
                 * 对战信息
                 */
                _this.matchInfo = _this.createProperty('matchInfo');
                /**
                 * 用户信息
                 */
                _this.userInfo = _this.createProperty('userInfo');
                /**
                 * 头像信息
                 */
                _this.headInfo = _this.createProperty('headInfo');
                /**
                 * 称号信息
                 */
                _this.title = _this.createProperty('title');
                /**
                 * 在线？
                 */
                _this.online = false;
                return _this;
            }
            GD_MatchTeamMember_1 = GD_MatchTeamMember;
            Object.defineProperty(GD_MatchTeamMember, "properties", {
                get: function () {
                    if (!GD_MatchTeamMember_1._map_gd_matchteammember) {
                        GD_MatchTeamMember_1._map_gd_matchteammember = new Map([
                            ['id', new syncData.DataType(0, null, 0)],
                            ['idx', new syncData.DataType(0, null, 0)],
                            ['level', new syncData.DataType(0, null, 0)],
                            ['matchInfo', new syncData.DataType(1, net.GD_MatchInfo)],
                            ['userInfo', new syncData.DataType(1, net.GD_UserInfo)],
                            ['headInfo', new syncData.DataType(1, net.GD_HeadInfo)],
                            ['title', new syncData.DataType(1, net.GD_TitleInfo)],
                            ['online', new syncData.DataType(0, null, false)],
                        ]);
                    }
                    return GD_MatchTeamMember_1._map_gd_matchteammember;
                },
                enumerable: true,
                configurable: true
            });
            var GD_MatchTeamMember_1;
            __decorate([
                orange.watch.emit
            ], GD_MatchTeamMember.prototype, "id", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeamMember.prototype, "idx", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeamMember.prototype, "level", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeamMember.prototype, "matchInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeamMember.prototype, "userInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeamMember.prototype, "headInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeamMember.prototype, "title", void 0);
            __decorate([
                orange.watch.emit
            ], GD_MatchTeamMember.prototype, "online", void 0);
            GD_MatchTeamMember = GD_MatchTeamMember_1 = __decorate([
                orange.autorunClass
            ], GD_MatchTeamMember);
            return GD_MatchTeamMember;
        }(syncData.DataBase));
        net.GD_MatchTeamMember = GD_MatchTeamMember;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_MatchTeams = /** @class */ (function (_super) {
            __extends(GD_MatchTeams, _super);
            function GD_MatchTeams(properties) {
                var _this = _super.call(this, properties || GD_MatchTeams_1.properties) || this;
                /**
                 * 一堆队伍信息
                 */
                _this.teams = _this.createProperty('teams');
                return _this;
            }
            GD_MatchTeams_1 = GD_MatchTeams;
            Object.defineProperty(GD_MatchTeams, "properties", {
                get: function () {
                    if (!GD_MatchTeams_1._map_gd_matchteams) {
                        GD_MatchTeams_1._map_gd_matchteams = new Map([
                            ['teams', new syncData.DataType(3, net.GD_MatchTeam)],
                        ]);
                    }
                    return GD_MatchTeams_1._map_gd_matchteams;
                },
                enumerable: true,
                configurable: true
            });
            var GD_MatchTeams_1;
            __decorate([
                orange.watch.emit
            ], GD_MatchTeams.prototype, "teams", void 0);
            GD_MatchTeams = GD_MatchTeams_1 = __decorate([
                orange.autorunClass
            ], GD_MatchTeams);
            return GD_MatchTeams;
        }(syncData.DataBase));
        net.GD_MatchTeams = GD_MatchTeams;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_OnlineState;
        (function (GD_OnlineState) {
            GD_OnlineState[GD_OnlineState["OnLine"] = 1] = "OnLine";
            GD_OnlineState[GD_OnlineState["Leave"] = 2] = "Leave";
            GD_OnlineState[GD_OnlineState["OffLine"] = 3] = "OffLine";
        })(GD_OnlineState = net.GD_OnlineState || (net.GD_OnlineState = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_Player = /** @class */ (function (_super) {
            __extends(GD_Player, _super);
            function GD_Player(properties) {
                var _this = _super.call(this, properties || GD_Player_1.properties) || this;
                /**
                 * 玩家ID
                 */
                _this.id = 0;
                /**
                 * 用户信息
                 */
                _this.userInfo = _this.createProperty('userInfo');
                /**
                 * 创建时间
                 */
                _this.createdAt = 0;
                /**
                 * 是否关注
                 */
                _this.isSubscribed = false;
                /**
                 * 关注奖励是否领取
                 */
                _this.subscribedReward = false;
                /**
                 * 总支付金额
                 */
                _this.purchaseNum = 0;
                /**
                 * 支付统计
                 */
                _this.purchaseCount = _this.createProperty('purchaseCount');
                /**
                 * 金币信息
                 */
                _this.gold = 0;
                /**
                 * 等级
                 */
                _this.level = 0;
                /**
                 * 经验
                 */
                _this.exp = 0;
                /**
                 * 物品列表
                 */
                _this.items = _this.createProperty('items');
                /**
                 * 段位信息
                 */
                _this.matchInfo = _this.createProperty('matchInfo');
                /**
                 * 头像信息
                 */
                _this.headInfo = _this.createProperty('headInfo');
                /**
                 * 称号信息
                 */
                _this.titleInfo = _this.createProperty('titleInfo');
                /**
                 * 表情信息
                 */
                _this.emoteInfo = _this.createProperty('emoteInfo');
                /**
                 * 角色信息
                 */
                _this.characterInfo = _this.createProperty('characterInfo');
                /**
                 * 当前赛季
                 */
                _this.curSeason = 0;
                /**
                 * 赛季目标
                 */
                _this.seasonPass = _this.createProperty('seasonPass');
                /**
                 * 赛季加成
                 */
                _this.seasonBuf = _this.createProperty('seasonBuf');
                /**
                 * 普通加成
                 */
                _this.buff = _this.createProperty('buff');
                /**
                 * 广告金币
                 */
                _this.aDGold = _this.createProperty('aDGold');
                /**
                 * 广告分享奖励相关数据
                 */
                _this.aDInfo = _this.createProperty('aDInfo');
                /**
                 * 好友列表,uid->time
                 */
                _this.friendUids = _this.createProperty('friendUids');
                /**
                 * 未处理的好友请求消息,发送者uid-info
                 */
                _this.friendReqMsgReceive = _this.createProperty('friendReqMsgReceive');
                /**
                 * 发出的好友请求
                 */
                _this.friendReqMsgSend = _this.createProperty('friendReqMsgSend');
                /**
                 * 正在进行战斗
                 */
                _this.battleID = 0;
                /**
                 * 有效期内的房间id
                 */
                _this.battleRoomID = 0;
                /**
                 * 上次领取银行奖励时间
                 */
                _this.lastGetBankGoldTime = 0;
                /**
                 * 银行信息
                 */
                _this.bankInfo = _this.createProperty('bankInfo');
                /**
                 * 最后一个teamId
                 */
                _this.lastTeamId = 0;
                return _this;
            }
            GD_Player_1 = GD_Player;
            Object.defineProperty(GD_Player, "properties", {
                get: function () {
                    if (!GD_Player_1._map_gd_player) {
                        GD_Player_1._map_gd_player = new Map([
                            ['config', new syncData.DataType(0, null, "")],
                            ['id', new syncData.DataType(0, null, 0)],
                            ['platform', new syncData.DataType(0, null, "")],
                            ['platformUId', new syncData.DataType(0, null, "")],
                            ['openId', new syncData.DataType(0, null, "")],
                            ['shareCode', new syncData.DataType(0, null, "")],
                            ['userInfo', new syncData.DataType(1, net.GD_UserInfo)],
                            ['createdAt', new syncData.DataType(0, null, 0)],
                            ['isSubscribed', new syncData.DataType(0, null, false)],
                            ['subscribedReward', new syncData.DataType(0, null, false)],
                            ['purchaseNum', new syncData.DataType(0, null, 0)],
                            ['purchaseCount', new syncData.DataType(3, null, 0)],
                            ['gold', new syncData.DataType(0, null, 0)],
                            ['level', new syncData.DataType(0, null, 0)],
                            ['exp', new syncData.DataType(0, null, 0)],
                            ['items', new syncData.DataType(3, null, 0)],
                            ['matchInfo', new syncData.DataType(1, net.GD_MatchInfo)],
                            ['headInfo', new syncData.DataType(1, net.GD_HeadInfo)],
                            ['titleInfo', new syncData.DataType(1, net.GD_TitleInfo)],
                            ['emoteInfo', new syncData.DataType(1, net.GD_EmoteInfo)],
                            ['characterInfo', new syncData.DataType(1, net.GD_CharacterInfo)],
                            ['curSeason', new syncData.DataType(0, null, 0)],
                            ['seasonPass', new syncData.DataType(1, net.GD_SeasonPass)],
                            ['seasonBuf', new syncData.DataType(1, net.GD_SeasonBuf)],
                            ['buff', new syncData.DataType(3, null, 0)],
                            ['aDGold', new syncData.DataType(1, net.GD_ADGold)],
                            ['aDInfo', new syncData.DataType(3, net.GD_ADGold)],
                            ['friendUids', new syncData.DataType(3, null, 0)],
                            ['friendReqMsgReceive', new syncData.DataType(3, net.GD_AddFriendReceive)],
                            ['friendReqMsgSend', new syncData.DataType(3, net.GD_AddFriendSend)],
                            ['battleID', new syncData.DataType(0, null, 0)],
                            ['battleRoomID', new syncData.DataType(0, null, 0)],
                            ['lastGetBankGoldTime', new syncData.DataType(0, null, 0)],
                            ['bankInfo', new syncData.DataType(1, net.GD_BankInfo)],
                            ['lastTeamId', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_Player_1._map_gd_player;
                },
                enumerable: true,
                configurable: true
            });
            var GD_Player_1;
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "id", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "platform", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "platformUId", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "openId", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "shareCode", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "userInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "createdAt", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "isSubscribed", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "subscribedReward", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "purchaseNum", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "purchaseCount", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "gold", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "level", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "exp", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "items", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "matchInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "headInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "titleInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "emoteInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "characterInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "curSeason", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "seasonPass", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "seasonBuf", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "buff", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "aDGold", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "aDInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "friendUids", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "friendReqMsgReceive", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "friendReqMsgSend", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "battleID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "battleRoomID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "lastGetBankGoldTime", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "bankInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Player.prototype, "lastTeamId", void 0);
            GD_Player = GD_Player_1 = __decorate([
                orange.autorunClass
            ], GD_Player);
            return GD_Player;
        }(syncData.DataBase));
        net.GD_Player = GD_Player;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_PlayerBattleInfo = /** @class */ (function (_super) {
            __extends(GD_PlayerBattleInfo, _super);
            function GD_PlayerBattleInfo(properties) {
                var _this = _super.call(this, properties || GD_PlayerBattleInfo_1.properties) || this;
                /**
                 * 用户id
                 */
                _this.uid = 0;
                _this._key_ = "uid";
                /**
                 * 用户信息
                 */
                _this.playerInfo = _this.createProperty('playerInfo');
                /**
                 * 正确题号
                 */
                _this.rightQuizIDs = _this.createProperty('rightQuizIDs');
                /**
                 * 错误题号
                 */
                _this.wrongQuizIDs = _this.createProperty('wrongQuizIDs');
                /**
                 * quizNum:answer
                 */
                _this.answers = _this.createProperty('answers');
                /**
                 * 所属队伍
                 */
                _this.teamFlag = _this.createProperty('teamFlag');
                /**
                 * 队伍ID。0无队伍
                 */
                _this.teamID = 0;
                /**
                 * 每题的分数
                 */
                _this.scores = _this.createProperty('scores');
                /**
                 * 在线状态
                 */
                _this.onlineState = _this.createProperty('onlineState');
                /**
                 * 成员角色，玩家或者观众
                 */
                _this.memberFlag = _this.createProperty('memberFlag');
                /**
                 * 奖励增量
                 */
                _this.rewardAttr = _this.createProperty('rewardAttr');
                /**
                 * 队伍成员数量
                 */
                _this.teamSize = 0;
                return _this;
            }
            GD_PlayerBattleInfo_1 = GD_PlayerBattleInfo;
            Object.defineProperty(GD_PlayerBattleInfo, "properties", {
                get: function () {
                    if (!GD_PlayerBattleInfo_1._map_gd_playerbattleinfo) {
                        GD_PlayerBattleInfo_1._map_gd_playerbattleinfo = new Map([
                            ['uid', new syncData.DataType(0, null, 0)],
                            ['playerInfo', new syncData.DataType(1, net.GD_Player)],
                            ['rightQuizIDs', new syncData.DataType(2, null, 0)],
                            ['wrongQuizIDs', new syncData.DataType(2, null, 0)],
                            ['answers', new syncData.DataType(3, net.GD_Choose_Data)],
                            ['teamFlag', new syncData.DataType(0, net.GD_TeamFlag)],
                            ['teamID', new syncData.DataType(0, null, 0)],
                            ['scores', new syncData.DataType(3, null, 0)],
                            ['onlineState', new syncData.DataType(0, net.GD_OnlineState)],
                            ['memberFlag', new syncData.DataType(0, net.EM_RoomRoleFlag)],
                            ['rewardAttr', new syncData.DataType(1, net.GD_RewardAttr)],
                            ['teamSize', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_PlayerBattleInfo_1._map_gd_playerbattleinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_PlayerBattleInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "uid", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "playerInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "rightQuizIDs", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "wrongQuizIDs", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "answers", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "teamFlag", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "teamID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "scores", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "onlineState", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "memberFlag", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "rewardAttr", void 0);
            __decorate([
                orange.watch.emit
            ], GD_PlayerBattleInfo.prototype, "teamSize", void 0);
            GD_PlayerBattleInfo = GD_PlayerBattleInfo_1 = __decorate([
                orange.autorunClass
            ], GD_PlayerBattleInfo);
            return GD_PlayerBattleInfo;
        }(syncData.DataBase));
        net.GD_PlayerBattleInfo = GD_PlayerBattleInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_PlayerData = /** @class */ (function (_super) {
            __extends(GD_PlayerData, _super);
            function GD_PlayerData(properties) {
                var _this = _super.call(this, properties || GD_PlayerData.properties) || this;
                _this.nickName = _this.createProperty('nickName');
                _this.bag = _this.createProperty('bag');
                return _this;
            }
            Object.defineProperty(GD_PlayerData, "properties", {
                get: function () {
                    if (!GD_PlayerData._map) {
                        GD_PlayerData._map = new Map([
                            ['config', new syncData.DataType(0, null, undefined)],
                            ['id', new syncData.DataType(0, null, 0)],
                            ['name', new syncData.DataType(0, null, undefined)],
                            ['nickName', new syncData.DataType(0, null, "default")],
                            ['level', new syncData.DataType(0, null, 0)],
                            ['gold', new syncData.DataType(0, null, 0)],
                            ['lastLoginTime', new syncData.DataType(0, null, 0)],
                            ['time', new syncData.DataType(0, null, "")],
                            ['bag', new syncData.DataType(1, net.GD_Bag)],
                        ]);
                    }
                    return GD_PlayerData._map;
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                orange.watch
            ], GD_PlayerData.prototype, "id", void 0);
            __decorate([
                orange.watch
            ], GD_PlayerData.prototype, "name", void 0);
            __decorate([
                orange.watch
            ], GD_PlayerData.prototype, "nickName", void 0);
            __decorate([
                orange.watch
            ], GD_PlayerData.prototype, "level", void 0);
            __decorate([
                orange.watch
            ], GD_PlayerData.prototype, "gold", void 0);
            __decorate([
                orange.watch
            ], GD_PlayerData.prototype, "lastLoginTime", void 0);
            __decorate([
                orange.watch
            ], GD_PlayerData.prototype, "time", void 0);
            __decorate([
                orange.watch
            ], GD_PlayerData.prototype, "bag", void 0);
            return GD_PlayerData;
        }(syncData.DataBase));
        net.GD_PlayerData = GD_PlayerData;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_QuizData = /** @class */ (function (_super) {
            __extends(GD_QuizData, _super);
            function GD_QuizData(properties) {
                var _this = _super.call(this, properties || GD_QuizData_1.properties) || this;
                /**
                 * 题目ID
                 */
                _this.id = 0;
                /**
                 * 题目类型
                 */
                _this.quizType = _this.createProperty('quizType');
                /**
                 * 小分类ID
                 */
                _this.class = 0;
                /**
                 * 科目ID(大分类)
                 */
                _this.category = 0;
                /**
                 * 匹配列表左边，仅用于匹配题
                 */
                _this.matchList = _this.createProperty('matchList');
                /**
                 * 选择项
                 */
                _this.options = _this.createProperty('options');
                /**
                 * 正确答案options数组索引
                 */
                _this.answers = _this.createProperty('answers');
                return _this;
            }
            GD_QuizData_1 = GD_QuizData;
            Object.defineProperty(GD_QuizData, "properties", {
                get: function () {
                    if (!GD_QuizData_1._map_gd_quizdata) {
                        GD_QuizData_1._map_gd_quizdata = new Map([
                            ['id', new syncData.DataType(0, null, 0)],
                            ['quizType', new syncData.DataType(0, net.EM_QuizType)],
                            ['class', new syncData.DataType(0, null, 0)],
                            ['className', new syncData.DataType(0, null, "")],
                            ['category', new syncData.DataType(0, null, 0)],
                            ['categoryName', new syncData.DataType(0, null, "")],
                            ['quiz', new syncData.DataType(0, null, "")],
                            ['matchList', new syncData.DataType(2, null, "")],
                            ['options', new syncData.DataType(2, null, "")],
                            ['answers', new syncData.DataType(2, null, 0)],
                            ['contributor', new syncData.DataType(0, null, "")],
                            ['partner', new syncData.DataType(0, null, "")],
                        ]);
                    }
                    return GD_QuizData_1._map_gd_quizdata;
                },
                enumerable: true,
                configurable: true
            });
            var GD_QuizData_1;
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "id", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "quizType", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "class", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "className", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "category", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "categoryName", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "quiz", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "matchList", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "options", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "answers", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "contributor", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizData.prototype, "partner", void 0);
            GD_QuizData = GD_QuizData_1 = __decorate([
                orange.autorunClass
            ], GD_QuizData);
            return GD_QuizData;
        }(syncData.DataBase));
        net.GD_QuizData = GD_QuizData;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_QuizDataShare = /** @class */ (function (_super) {
            __extends(GD_QuizDataShare, _super);
            function GD_QuizDataShare(properties) {
                var _this = _super.call(this, properties || GD_QuizDataShare_1.properties) || this;
                /**
                 * 开始时间
                 */
                _this.beginTime = 0;
                /**
                 * 结束时间
                 */
                _this.endTime = 0;
                /**
                 * 正确选项，结算时才会有
                 */
                _this.answersShow = _this.createProperty('answersShow');
                /**
                 * 答案个数
                 */
                _this.answerNum = 0;
                return _this;
            }
            GD_QuizDataShare_1 = GD_QuizDataShare;
            Object.defineProperty(GD_QuizDataShare, "properties", {
                get: function () {
                    if (!GD_QuizDataShare_1._map_gd_quizdatashare) {
                        GD_QuizDataShare_1._map_gd_quizdatashare = new Map([
                            ['beginTime', new syncData.DataType(0, null, 0)],
                            ['endTime', new syncData.DataType(0, null, 0)],
                            ['answersShow', new syncData.DataType(2, null, 0)],
                            ['answerNum', new syncData.DataType(0, null, 0)],
                        ]);
                        net.GD_QuizData.properties.forEach(function (value, key) {
                            GD_QuizDataShare_1._map_gd_quizdatashare.set(key, value);
                        });
                    }
                    return GD_QuizDataShare_1._map_gd_quizdatashare;
                },
                enumerable: true,
                configurable: true
            });
            var GD_QuizDataShare_1;
            __decorate([
                orange.watch.emit
            ], GD_QuizDataShare.prototype, "beginTime", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizDataShare.prototype, "endTime", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizDataShare.prototype, "answersShow", void 0);
            __decorate([
                orange.watch.emit
            ], GD_QuizDataShare.prototype, "answerNum", void 0);
            GD_QuizDataShare = GD_QuizDataShare_1 = __decorate([
                orange.autorunClass
            ], GD_QuizDataShare);
            return GD_QuizDataShare;
        }(net.GD_QuizData));
        net.GD_QuizDataShare = GD_QuizDataShare;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_RankInfo = /** @class */ (function (_super) {
            __extends(GD_RankInfo, _super);
            function GD_RankInfo(properties) {
                var _this = _super.call(this, properties || GD_RankInfo_1.properties) || this;
                /**
                 * 排名
                 */
                _this.rank = 0;
                /**
                 * 玩家id
                 */
                _this.uid = 0;
                /**
                 * 用户信息
                 */
                _this.userInfo = _this.createProperty('userInfo');
                /**
                 * 段位ID
                 */
                _this.matchID = 0;
                /**
                 * 段位星数
                 */
                _this.matchStar = 0;
                /**
                 * 积分
                 */
                _this.score = 0;
                /**
                 * 头像
                 */
                _this.curHead = 0;
                /**
                 * 称号
                 */
                _this.curTitle = 0;
                /**
                 * 是否在线
                 */
                _this.isOnline = false;
                /**
                 * 等级
                 */
                _this.level = 0;
                return _this;
            }
            GD_RankInfo_1 = GD_RankInfo;
            Object.defineProperty(GD_RankInfo, "properties", {
                get: function () {
                    if (!GD_RankInfo_1._map_gd_rankinfo) {
                        GD_RankInfo_1._map_gd_rankinfo = new Map([
                            ['rank', new syncData.DataType(0, null, 0)],
                            ['uid', new syncData.DataType(0, null, 0)],
                            ['userInfo', new syncData.DataType(1, net.GD_UserInfo)],
                            ['matchID', new syncData.DataType(0, null, 0)],
                            ['matchStar', new syncData.DataType(0, null, 0)],
                            ['score', new syncData.DataType(0, null, 0)],
                            ['curHead', new syncData.DataType(0, null, 0)],
                            ['curTitle', new syncData.DataType(0, null, 0)],
                            ['isOnline', new syncData.DataType(0, null, false)],
                            ['level', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_RankInfo_1._map_gd_rankinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_RankInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_RankInfo.prototype, "rank", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RankInfo.prototype, "uid", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RankInfo.prototype, "userInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RankInfo.prototype, "matchID", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RankInfo.prototype, "matchStar", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RankInfo.prototype, "score", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RankInfo.prototype, "curHead", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RankInfo.prototype, "curTitle", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RankInfo.prototype, "isOnline", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RankInfo.prototype, "level", void 0);
            GD_RankInfo = GD_RankInfo_1 = __decorate([
                orange.autorunClass
            ], GD_RankInfo);
            return GD_RankInfo;
        }(syncData.DataBase));
        net.GD_RankInfo = GD_RankInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_RewardAttr = /** @class */ (function (_super) {
            __extends(GD_RewardAttr, _super);
            function GD_RewardAttr(properties) {
                var _this = _super.call(this, properties || GD_RewardAttr_1.properties) || this;
                /**
                 * 金币增量
                 */
                _this.gold = 0;
                /**
                 * 经验增量
                 */
                _this.exp = 0;
                /**
                 * 星星增量
                 */
                _this.star = 0;
                /**
                 * 段位增量
                 */
                _this.dan = 0;
                /**
                 * 当前段位
                 */
                _this.currentDan = 0;
                /**
                 * 当前星星数量
                 */
                _this.currentStar = 0;
                /**
                 * 升级奖励金币
                 */
                _this.levelUpGold = 0;
                return _this;
            }
            GD_RewardAttr_1 = GD_RewardAttr;
            Object.defineProperty(GD_RewardAttr, "properties", {
                get: function () {
                    if (!GD_RewardAttr_1._map_gd_rewardattr) {
                        GD_RewardAttr_1._map_gd_rewardattr = new Map([
                            ['gold', new syncData.DataType(0, null, 0)],
                            ['exp', new syncData.DataType(0, null, 0)],
                            ['star', new syncData.DataType(0, null, 0)],
                            ['dan', new syncData.DataType(0, null, 0)],
                            ['currentDan', new syncData.DataType(0, null, 0)],
                            ['currentStar', new syncData.DataType(0, null, 0)],
                            ['levelUpGold', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_RewardAttr_1._map_gd_rewardattr;
                },
                enumerable: true,
                configurable: true
            });
            var GD_RewardAttr_1;
            __decorate([
                orange.watch.emit
            ], GD_RewardAttr.prototype, "gold", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RewardAttr.prototype, "exp", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RewardAttr.prototype, "star", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RewardAttr.prototype, "dan", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RewardAttr.prototype, "currentDan", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RewardAttr.prototype, "currentStar", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RewardAttr.prototype, "levelUpGold", void 0);
            GD_RewardAttr = GD_RewardAttr_1 = __decorate([
                orange.autorunClass
            ], GD_RewardAttr);
            return GD_RewardAttr;
        }(syncData.DataBase));
        net.GD_RewardAttr = GD_RewardAttr;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_RewardType;
        (function (GD_RewardType) {
            GD_RewardType[GD_RewardType["Exp"] = 1] = "Exp";
            GD_RewardType[GD_RewardType["Item"] = 2] = "Item";
            GD_RewardType[GD_RewardType["Title"] = 3] = "Title";
            GD_RewardType[GD_RewardType["Head"] = 4] = "Head";
            GD_RewardType[GD_RewardType["Emote"] = 5] = "Emote";
            GD_RewardType[GD_RewardType["EmoteGroup"] = 6] = "EmoteGroup";
            GD_RewardType[GD_RewardType["Passport"] = 7] = "Passport";
            GD_RewardType[GD_RewardType["MatchStar"] = 10] = "MatchStar";
            GD_RewardType[GD_RewardType["QuizCategoryScore"] = 11] = "QuizCategoryScore";
            GD_RewardType[GD_RewardType["QuizClassScore"] = 12] = "QuizClassScore";
        })(GD_RewardType = net.GD_RewardType || (net.GD_RewardType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_RoomMemberInfo = /** @class */ (function (_super) {
            __extends(GD_RoomMemberInfo, _super);
            function GD_RoomMemberInfo(properties) {
                var _this = _super.call(this, properties || GD_RoomMemberInfo_1.properties) || this;
                /**
                 * 玩家信息
                 */
                _this.playerInfo = _this.createProperty('playerInfo');
                /**
                 * 角色,观众或者玩家
                 */
                _this.roleFlag = _this.createProperty('roleFlag');
                /**
                 * 队伍标识
                 */
                _this.teamFlag = _this.createProperty('teamFlag');
                /**
                 * 玩家在线状态
                 */
                _this.onlineState = _this.createProperty('onlineState');
                return _this;
            }
            GD_RoomMemberInfo_1 = GD_RoomMemberInfo;
            Object.defineProperty(GD_RoomMemberInfo, "properties", {
                get: function () {
                    if (!GD_RoomMemberInfo_1._map_gd_roommemberinfo) {
                        GD_RoomMemberInfo_1._map_gd_roommemberinfo = new Map([
                            ['playerInfo', new syncData.DataType(1, net.GD_Player)],
                            ['roleFlag', new syncData.DataType(0, net.EM_RoomRoleFlag)],
                            ['teamFlag', new syncData.DataType(0, net.GD_TeamFlag)],
                            ['onlineState', new syncData.DataType(0, net.GD_OnlineState)],
                        ]);
                    }
                    return GD_RoomMemberInfo_1._map_gd_roommemberinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_RoomMemberInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_RoomMemberInfo.prototype, "playerInfo", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RoomMemberInfo.prototype, "roleFlag", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RoomMemberInfo.prototype, "teamFlag", void 0);
            __decorate([
                orange.watch.emit
            ], GD_RoomMemberInfo.prototype, "onlineState", void 0);
            GD_RoomMemberInfo = GD_RoomMemberInfo_1 = __decorate([
                orange.autorunClass
            ], GD_RoomMemberInfo);
            return GD_RoomMemberInfo;
        }(syncData.DataBase));
        net.GD_RoomMemberInfo = GD_RoomMemberInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_SeasonBuf = /** @class */ (function (_super) {
            __extends(GD_SeasonBuf, _super);
            function GD_SeasonBuf(properties) {
                var _this = _super.call(this, properties || GD_SeasonBuf_1.properties) || this;
                /**
                 * 题目小分类答题得分加成百分比, 分类id-加成等级
                 */
                _this.scoreCategoryRate = _this.createProperty('scoreCategoryRate');
                /**
                 * 题目大分类答题得分加成百分比, 分类id-加成等级
                 */
                _this.scoreClassRate = _this.createProperty('scoreClassRate');
                /**
                 * 星数增加值
                 */
                _this.starVal = 0;
                return _this;
            }
            GD_SeasonBuf_1 = GD_SeasonBuf;
            Object.defineProperty(GD_SeasonBuf, "properties", {
                get: function () {
                    if (!GD_SeasonBuf_1._map_gd_seasonbuf) {
                        GD_SeasonBuf_1._map_gd_seasonbuf = new Map([
                            ['scoreCategoryRate', new syncData.DataType(3, null, 0)],
                            ['scoreClassRate', new syncData.DataType(3, null, 0)],
                            ['starVal', new syncData.DataType(0, null, 0)],
                        ]);
                    }
                    return GD_SeasonBuf_1._map_gd_seasonbuf;
                },
                enumerable: true,
                configurable: true
            });
            var GD_SeasonBuf_1;
            __decorate([
                orange.watch.emit
            ], GD_SeasonBuf.prototype, "scoreCategoryRate", void 0);
            __decorate([
                orange.watch.emit
            ], GD_SeasonBuf.prototype, "scoreClassRate", void 0);
            __decorate([
                orange.watch.emit
            ], GD_SeasonBuf.prototype, "starVal", void 0);
            GD_SeasonBuf = GD_SeasonBuf_1 = __decorate([
                orange.autorunClass
            ], GD_SeasonBuf);
            return GD_SeasonBuf;
        }(syncData.DataBase));
        net.GD_SeasonBuf = GD_SeasonBuf;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_SeasonPass = /** @class */ (function (_super) {
            __extends(GD_SeasonPass, _super);
            function GD_SeasonPass(properties) {
                var _this = _super.call(this, properties || GD_SeasonPass_1.properties) || this;
                /**
                 * 进度值 对应buyPass值显示
                 */
                _this.num = 0;
                /**
                 * 是否购买通行证 0未购买，1已购买
                 */
                _this.buyPass = 0;
                /**
                 * 奖励领取状态， 1已领取。 无或者0未领取
                 */
                _this.reward = _this.createProperty('reward');
                return _this;
            }
            GD_SeasonPass_1 = GD_SeasonPass;
            Object.defineProperty(GD_SeasonPass, "properties", {
                get: function () {
                    if (!GD_SeasonPass_1._map_gd_seasonpass) {
                        GD_SeasonPass_1._map_gd_seasonpass = new Map([
                            ['num', new syncData.DataType(0, null, 0)],
                            ['buyPass', new syncData.DataType(0, null, 0)],
                            ['reward', new syncData.DataType(3, null, 0)],
                        ]);
                    }
                    return GD_SeasonPass_1._map_gd_seasonpass;
                },
                enumerable: true,
                configurable: true
            });
            var GD_SeasonPass_1;
            __decorate([
                orange.watch.emit
            ], GD_SeasonPass.prototype, "num", void 0);
            __decorate([
                orange.watch.emit
            ], GD_SeasonPass.prototype, "buyPass", void 0);
            __decorate([
                orange.watch.emit
            ], GD_SeasonPass.prototype, "reward", void 0);
            GD_SeasonPass = GD_SeasonPass_1 = __decorate([
                orange.autorunClass
            ], GD_SeasonPass);
            return GD_SeasonPass;
        }(syncData.DataBase));
        net.GD_SeasonPass = GD_SeasonPass;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_Team = /** @class */ (function (_super) {
            __extends(GD_Team, _super);
            function GD_Team(properties) {
                var _this = _super.call(this, properties || GD_Team_1.properties) || this;
                /**
                 * 成员id
                 */
                _this.members = _this.createProperty('members');
                /**
                 * 分数
                 */
                _this.score = 0;
                /**
                 * 正确题目id
                 */
                _this.winQuizIDs = _this.createProperty('winQuizIDs');
                /**
                 * 错误题目id
                 */
                _this.loseQuizIDs = _this.createProperty('loseQuizIDs');
                /**
                 * 队伍标识
                 */
                _this.tType = _this.createProperty('tType');
                return _this;
            }
            GD_Team_1 = GD_Team;
            Object.defineProperty(GD_Team, "properties", {
                get: function () {
                    if (!GD_Team_1._map_gd_team) {
                        GD_Team_1._map_gd_team = new Map([
                            ['members', new syncData.DataType(2, null, 0)],
                            ['score', new syncData.DataType(0, null, 0)],
                            ['winQuizIDs', new syncData.DataType(2, null, 0)],
                            ['loseQuizIDs', new syncData.DataType(2, null, 0)],
                            ['tType', new syncData.DataType(0, net.GD_TeamFlag)],
                        ]);
                    }
                    return GD_Team_1._map_gd_team;
                },
                enumerable: true,
                configurable: true
            });
            var GD_Team_1;
            __decorate([
                orange.watch.emit
            ], GD_Team.prototype, "members", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Team.prototype, "score", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Team.prototype, "winQuizIDs", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Team.prototype, "loseQuizIDs", void 0);
            __decorate([
                orange.watch.emit
            ], GD_Team.prototype, "tType", void 0);
            GD_Team = GD_Team_1 = __decorate([
                orange.autorunClass
            ], GD_Team);
            return GD_Team;
        }(syncData.DataBase));
        net.GD_Team = GD_Team;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_TeamFlag;
        (function (GD_TeamFlag) {
            GD_TeamFlag[GD_TeamFlag["Invalid"] = 1] = "Invalid";
            GD_TeamFlag[GD_TeamFlag["TeamA"] = 2] = "TeamA";
            GD_TeamFlag[GD_TeamFlag["TeamB"] = 3] = "TeamB";
        })(GD_TeamFlag = net.GD_TeamFlag || (net.GD_TeamFlag = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_TitleInfo = /** @class */ (function (_super) {
            __extends(GD_TitleInfo, _super);
            function GD_TitleInfo(properties) {
                var _this = _super.call(this, properties || GD_TitleInfo_1.properties) || this;
                /**
                 * 当前称号，-1无称号
                 */
                _this.curTitle = 0;
                /**
                 * 拥有称号列表
                 */
                _this.titleList = _this.createProperty('titleList');
                return _this;
            }
            GD_TitleInfo_1 = GD_TitleInfo;
            Object.defineProperty(GD_TitleInfo, "properties", {
                get: function () {
                    if (!GD_TitleInfo_1._map_gd_titleinfo) {
                        GD_TitleInfo_1._map_gd_titleinfo = new Map([
                            ['curTitle', new syncData.DataType(0, null, 0)],
                            ['titleList', new syncData.DataType(2, null, 0)],
                        ]);
                    }
                    return GD_TitleInfo_1._map_gd_titleinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_TitleInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_TitleInfo.prototype, "curTitle", void 0);
            __decorate([
                orange.watch.emit
            ], GD_TitleInfo.prototype, "titleList", void 0);
            GD_TitleInfo = GD_TitleInfo_1 = __decorate([
                orange.autorunClass
            ], GD_TitleInfo);
            return GD_TitleInfo;
        }(syncData.DataBase));
        net.GD_TitleInfo = GD_TitleInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var GD_UserInfo = /** @class */ (function (_super) {
            __extends(GD_UserInfo, _super);
            function GD_UserInfo(properties) {
                var _this = _super.call(this, properties || GD_UserInfo_1.properties) || this;
                _this._key_ = "nickName";
                /**
                 * 性别
                 */
                _this.gender = 0;
                return _this;
            }
            GD_UserInfo_1 = GD_UserInfo;
            Object.defineProperty(GD_UserInfo, "properties", {
                get: function () {
                    if (!GD_UserInfo_1._map_gd_userinfo) {
                        GD_UserInfo_1._map_gd_userinfo = new Map([
                            ['nickName', new syncData.DataType(0, null, "")],
                            ['gender', new syncData.DataType(0, null, 0)],
                            ['city', new syncData.DataType(0, null, "")],
                            ['province', new syncData.DataType(0, null, "")],
                            ['country', new syncData.DataType(0, null, "")],
                            ['avatarURL', new syncData.DataType(0, null, "")],
                        ]);
                    }
                    return GD_UserInfo_1._map_gd_userinfo;
                },
                enumerable: true,
                configurable: true
            });
            var GD_UserInfo_1;
            __decorate([
                orange.watch.emit
            ], GD_UserInfo.prototype, "nickName", void 0);
            __decorate([
                orange.watch.emit
            ], GD_UserInfo.prototype, "gender", void 0);
            __decorate([
                orange.watch.emit
            ], GD_UserInfo.prototype, "city", void 0);
            __decorate([
                orange.watch.emit
            ], GD_UserInfo.prototype, "province", void 0);
            __decorate([
                orange.watch.emit
            ], GD_UserInfo.prototype, "country", void 0);
            __decorate([
                orange.watch.emit
            ], GD_UserInfo.prototype, "avatarURL", void 0);
            GD_UserInfo = GD_UserInfo_1 = __decorate([
                orange.autorunClass
            ], GD_UserInfo);
            return GD_UserInfo;
        }(syncData.DataBase));
        net.GD_UserInfo = GD_UserInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var IMD_ImageMessageContent = /** @class */ (function (_super) {
            __extends(IMD_ImageMessageContent, _super);
            function IMD_ImageMessageContent(properties) {
                var _this = _super.call(this, properties || IMD_ImageMessageContent_1.properties) || this;
                _this.content = _this.createProperty('content');
                return _this;
            }
            IMD_ImageMessageContent_1 = IMD_ImageMessageContent;
            Object.defineProperty(IMD_ImageMessageContent, "properties", {
                get: function () {
                    if (!IMD_ImageMessageContent_1._map_imd_imagemessagecontent) {
                        IMD_ImageMessageContent_1._map_imd_imagemessagecontent = new Map([
                            ['content', new syncData.DataType(2, null, 0)],
                            ['url', new syncData.DataType(0, null, "")],
                        ]);
                        net.IMD_MessageContent.properties.forEach(function (value, key) {
                            IMD_ImageMessageContent_1._map_imd_imagemessagecontent.set(key, value);
                        });
                    }
                    return IMD_ImageMessageContent_1._map_imd_imagemessagecontent;
                },
                enumerable: true,
                configurable: true
            });
            var IMD_ImageMessageContent_1;
            __decorate([
                orange.watch.emit
            ], IMD_ImageMessageContent.prototype, "content", void 0);
            __decorate([
                orange.watch.emit
            ], IMD_ImageMessageContent.prototype, "url", void 0);
            IMD_ImageMessageContent = IMD_ImageMessageContent_1 = __decorate([
                orange.autorunClass
            ], IMD_ImageMessageContent);
            return IMD_ImageMessageContent;
        }(net.IMD_MessageContent));
        net.IMD_ImageMessageContent = IMD_ImageMessageContent;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var IMD_Message = /** @class */ (function (_super) {
            __extends(IMD_Message, _super);
            function IMD_Message(properties) {
                var _this = _super.call(this, properties || IMD_Message_1.properties) || this;
                _this.id = 0;
                _this.userInfo = _this.createProperty('userInfo');
                _this.time = 0;
                _this.conversationType = _this.createProperty('conversationType');
                _this.contentType = _this.createProperty('contentType');
                return _this;
            }
            IMD_Message_1 = IMD_Message;
            Object.defineProperty(IMD_Message, "properties", {
                get: function () {
                    if (!IMD_Message_1._map_imd_message) {
                        IMD_Message_1._map_imd_message = new Map([
                            ['id', new syncData.DataType(0, null, 0)],
                            ['userInfo', new syncData.DataType(1, net.IMD_UserInfo)],
                            ['time', new syncData.DataType(0, null, 0)],
                            ['conversationType', new syncData.DataType(0, net.IME_ConversationType)],
                            ['contentType', new syncData.DataType(0, net.IME_MessageContentType)],
                            ['content', new syncData.DataType(0, null, "")],
                        ]);
                    }
                    return IMD_Message_1._map_imd_message;
                },
                enumerable: true,
                configurable: true
            });
            var IMD_Message_1;
            __decorate([
                orange.watch.emit
            ], IMD_Message.prototype, "id", void 0);
            __decorate([
                orange.watch.emit
            ], IMD_Message.prototype, "userInfo", void 0);
            __decorate([
                orange.watch.emit
            ], IMD_Message.prototype, "time", void 0);
            __decorate([
                orange.watch.emit
            ], IMD_Message.prototype, "conversationType", void 0);
            __decorate([
                orange.watch.emit
            ], IMD_Message.prototype, "contentType", void 0);
            __decorate([
                orange.watch.emit
            ], IMD_Message.prototype, "content", void 0);
            IMD_Message = IMD_Message_1 = __decorate([
                orange.autorunClass
            ], IMD_Message);
            return IMD_Message;
        }(syncData.DataBase));
        net.IMD_Message = IMD_Message;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var IMD_TextMessageContent = /** @class */ (function (_super) {
            __extends(IMD_TextMessageContent, _super);
            function IMD_TextMessageContent(properties) {
                return _super.call(this, properties || IMD_TextMessageContent_1.properties) || this;
            }
            IMD_TextMessageContent_1 = IMD_TextMessageContent;
            Object.defineProperty(IMD_TextMessageContent, "properties", {
                get: function () {
                    if (!IMD_TextMessageContent_1._map_imd_textmessagecontent) {
                        IMD_TextMessageContent_1._map_imd_textmessagecontent = new Map([
                            ['content', new syncData.DataType(0, null, "")],
                        ]);
                        net.IMD_MessageContent.properties.forEach(function (value, key) {
                            IMD_TextMessageContent_1._map_imd_textmessagecontent.set(key, value);
                        });
                    }
                    return IMD_TextMessageContent_1._map_imd_textmessagecontent;
                },
                enumerable: true,
                configurable: true
            });
            var IMD_TextMessageContent_1;
            __decorate([
                orange.watch.emit
            ], IMD_TextMessageContent.prototype, "content", void 0);
            IMD_TextMessageContent = IMD_TextMessageContent_1 = __decorate([
                orange.autorunClass
            ], IMD_TextMessageContent);
            return IMD_TextMessageContent;
        }(net.IMD_MessageContent));
        net.IMD_TextMessageContent = IMD_TextMessageContent;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var IMD_UserInfo = /** @class */ (function (_super) {
            __extends(IMD_UserInfo, _super);
            function IMD_UserInfo(properties) {
                return _super.call(this, properties || IMD_UserInfo_1.properties) || this;
            }
            IMD_UserInfo_1 = IMD_UserInfo;
            Object.defineProperty(IMD_UserInfo, "properties", {
                get: function () {
                    if (!IMD_UserInfo_1._map_imd_userinfo) {
                        IMD_UserInfo_1._map_imd_userinfo = new Map([
                            ['id', new syncData.DataType(0, null, "")],
                            ['name', new syncData.DataType(0, null, "")],
                            ['head', new syncData.DataType(0, null, "")],
                            ['extra', new syncData.DataType(0, null, "")],
                        ]);
                    }
                    return IMD_UserInfo_1._map_imd_userinfo;
                },
                enumerable: true,
                configurable: true
            });
            var IMD_UserInfo_1;
            __decorate([
                orange.watch.emit
            ], IMD_UserInfo.prototype, "id", void 0);
            __decorate([
                orange.watch.emit
            ], IMD_UserInfo.prototype, "name", void 0);
            __decorate([
                orange.watch.emit
            ], IMD_UserInfo.prototype, "head", void 0);
            __decorate([
                orange.watch.emit
            ], IMD_UserInfo.prototype, "extra", void 0);
            IMD_UserInfo = IMD_UserInfo_1 = __decorate([
                orange.autorunClass
            ], IMD_UserInfo);
            return IMD_UserInfo;
        }(syncData.DataBase));
        net.IMD_UserInfo = IMD_UserInfo;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var IME_ConversationType;
        (function (IME_ConversationType) {
            IME_ConversationType[IME_ConversationType["System"] = 0] = "System";
            IME_ConversationType[IME_ConversationType["Private"] = 1] = "Private";
            IME_ConversationType[IME_ConversationType["Group"] = 2] = "Group";
            IME_ConversationType[IME_ConversationType["ChatRoom"] = 3] = "ChatRoom";
        })(IME_ConversationType = net.IME_ConversationType || (net.IME_ConversationType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var IME_MessageContentType;
        (function (IME_MessageContentType) {
            IME_MessageContentType[IME_MessageContentType["Text"] = 0] = "Text";
            IME_MessageContentType[IME_MessageContentType["Image"] = 1] = "Image";
            IME_MessageContentType[IME_MessageContentType["Voice"] = 2] = "Voice";
            IME_MessageContentType[IME_MessageContentType["Custom"] = 99] = "Custom";
        })(IME_MessageContentType = net.IME_MessageContentType || (net.IME_MessageContentType = {}));
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var net;
    (function (net) {
        var ItemData = /** @class */ (function (_super) {
            __extends(ItemData, _super);
            function ItemData() {
                return _super.call(this) || this;
            }
            Object.defineProperty(ItemData.prototype, "cfg", {
                //加上 orange.calculate 之后如果 typeId 不改变不会重复调用 get 函数，而是从缓存值中获取
                get: function () {
                    return game.config.Item.getById(this.typeId);
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                orange.calculate
            ], ItemData.prototype, "cfg", null);
            return ItemData;
        }(net.GD_Item));
        net.ItemData = ItemData;
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
var test;
(function (test) {
    var NetNormalTestServer = /** @class */ (function () {
        function NetNormalTestServer() {
            this.player = new game.net.GD_Player();
            this.battleInfo = new game.net.GD_BattleInfo();
            this.roomInfo = new game.net.GD_FriendMatchRoom();
            this.baseSync = new game.net.GD_BaseSyncData(); //用于同步时间
            this.matchTeams = new game.net.GD_MatchTeams();
        }
        return NetNormalTestServer;
    }());
    var NetNormalTest = /** @class */ (function (_super) {
        __extends(NetNormalTest, _super);
        function NetNormalTest() {
            var _this = _super.call(this) || this;
            NetNormalTest.ist = _this;
            _this.init();
            return _this;
        }
        NetNormalTest.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.login()];
                        case 1:
                            _a.sent();
                            this.proxy.debug = true;
                            this.proxy.root = new NetNormalTestServer();
                            this.test();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NetNormalTest.prototype.login = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve) {
                            var user = _this.user = 'user' + (~~(Math.random() * 100000000));
                            game.login('ws://10.1.1.79:10000', 'debug', user, false).then(function (res) {
                                _this.proxy = res.proxy;
                                resolve(true);
                            }).catch(function (err) {
                                resolve(false);
                            });
                        })];
                });
            });
        };
        NetNormalTest.prototype.send = function (info) {
            return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.proxy.request(info)];
                        case 1:
                            _a.sent();
                            r = this.proxy.root;
                            console.log(r.player.hash, r.battleInfo.hash, r.roomInfo.hash);
                            console.log('r.player.userInfo.hash:', r.player.userInfo.hash, r.player.userInfo.nickName, r.player.userInfo.city);
                            console.log('r.battleInfo.playerBattleInfo.get(1).hash:', r.battleInfo.playerBattleInfo.get(1).hash, r.battleInfo.playerBattleInfo.get(1).teamID, r.battleInfo.playerBattleInfo.get(1).uid);
                            return [2 /*return*/];
                    }
                });
            });
        };
        NetNormalTest.prototype.test = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.send(game.net.Test_Sync1())];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.send(game.net.Test_Sync2())];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.send(game.net.Test_Sync3())];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.send(game.net.Test_Sync4())];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return NetNormalTest;
    }(egret.Sprite));
    test.NetNormalTest = NetNormalTest;
})(test || (test = {}));
/**
 * 网络测试用例场景
 *
 * 消息设计
 * 1. 每隔 0.05 秒发送一个消息，保障测试的覆盖率
 * 2. 每个消息携带当次登陆的时间，测试下次登陆会不会收到上次登陆的消息
 * 3. 消息携带唯一递增 id ，保证消息的顺序和不断档
 * 4. 随机每 3 分钟切一次后台，分为短时间切后台、中等时间切后台和长时间切后台
 *    短时间切后台分为 0 ~ 3 秒，不断线
 *    中等时间切后台分为 3 ~ 300 秒，断线
 *    长时间断线为 1 ~ 3 个小时
 * 5. 并发数为 10000
 */
var test;
(function (test) {
    var db;
    var dbName = 'test';
    var collectionName = 'nettestlog';
    var NetTest = /** @class */ (function (_super) {
        __extends(NetTest, _super);
        function NetTest() {
            var _this = _super.call(this) || this;
            _this.start();
            return _this;
        }
        NetTest.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            //打开调试模式
                            orange.debug = false;
                            //等待 orange 初始化
                            return [4 /*yield*/, orange.startup({
                                    'stage': this.stage,
                                    'egret': {},
                                    'native': {}
                                })];
                        case 1:
                            //等待 orange 初始化
                            _a.sent();
                            db = new orange.native.MongoDB();
                            return [4 /*yield*/, db.connect('mongodb://localhost:27017/')];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.init()];
                        case 3:
                            _a.sent();
                            game.loginMany = true; //容许同时登陆
                            for (i = 0; i < 10; i++) {
                                new TestCase().execute();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        NetTest.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _i, k, res, _c, _d, _e, _f, k, res, _g, _h, _j, _k, k, reason, res, _l;
                return __generator(this, function (_m) {
                    switch (_m.label) {
                        case 0:
                            _a = [];
                            for (_b in LogType)
                                _a.push(_b);
                            _i = 0;
                            _m.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            k = _a[_i];
                            return [4 /*yield*/, db.findOne(dbName, collectionName, { 'type': LogType[k] })];
                        case 2:
                            res = _m.sent();
                            _c = !res.length;
                            if (!_c) return [3 /*break*/, 4];
                            return [4 /*yield*/, db.insertOne(dbName, collectionName, { 'type': LogType[k], 'count': 0 })];
                        case 3:
                            _c = (_m.sent());
                            _m.label = 4;
                        case 4:
                            _c;
                            _m.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6:
                            _d = [];
                            for (_e in game.LOGIN_ERROR)
                                _d.push(_e);
                            _f = 0;
                            _m.label = 7;
                        case 7:
                            if (!(_f < _d.length)) return [3 /*break*/, 12];
                            k = _d[_f];
                            return [4 /*yield*/, db.findOne(dbName, collectionName, { 'type': LogType.LOGIN_ERROR, 'message': game.LOGIN_ERROR[k] })];
                        case 8:
                            res = _m.sent();
                            _g = !res.length;
                            if (!_g) return [3 /*break*/, 10];
                            return [4 /*yield*/, db.insertOne(dbName, collectionName, { 'type': LogType.LOGIN_ERROR, 'message': game.LOGIN_ERROR[k], 'count': 0 })];
                        case 9:
                            _g = (_m.sent());
                            _m.label = 10;
                        case 10:
                            _g;
                            _m.label = 11;
                        case 11:
                            _f++;
                            return [3 /*break*/, 7];
                        case 12:
                            _h = [];
                            for (_j in orange.ConnectionCloseReason)
                                _h.push(_j);
                            _k = 0;
                            _m.label = 13;
                        case 13:
                            if (!(_k < _h.length)) return [3 /*break*/, 18];
                            k = _h[_k];
                            reason = orange.ConnectionCloseReason[k];
                            return [4 /*yield*/, db.findOne(dbName, collectionName, { 'type': LogType.CLOSE, 'reason': reason })];
                        case 14:
                            res = _m.sent();
                            _l = !res.length;
                            if (!_l) return [3 /*break*/, 16];
                            return [4 /*yield*/, db.insertOne(dbName, collectionName, { 'type': LogType.CLOSE, 'reason': reason, 'count': 0 })];
                        case 15:
                            _l = (_m.sent());
                            _m.label = 16;
                        case 16:
                            _l;
                            _m.label = 17;
                        case 17:
                            _k++;
                            return [3 /*break*/, 13];
                        case 18: return [2 /*return*/];
                    }
                });
            });
        };
        return NetTest;
    }(egret.Sprite));
    test.NetTest = NetTest;
    var TestCase = /** @class */ (function () {
        function TestCase() {
        }
        TestCase.prototype.execute = function () {
            return __awaiter(this, void 0, void 0, function () {
                var flag, f;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.login()];
                        case 1:
                            flag = _a.sent();
                            if (!flag)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.proxy.request(game.net.Game_Login())];
                        case 2:
                            _a.sent();
                            setInterval(function () {
                                if (!_this.proxy)
                                    return;
                                if (_this.proxy.active == false) {
                                    console.log('!!!!');
                                }
                                _this.proxy.send(game.net.Test_Ping());
                            }, 0.05);
                            f = function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.proxy)
                                                return [2 /*return*/];
                                            return [4 /*yield*/, orange.sleep(2000 + Math.random() * 1000)];
                                        case 1:
                                            _a.sent();
                                            if (!this.proxy)
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this.toBack()];
                                        case 2:
                                            _a.sent();
                                            if (!this.proxy)
                                                return [2 /*return*/];
                                            f();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            f();
                            return [2 /*return*/];
                    }
                });
            });
        };
        TestCase.prototype.toBack = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.proxy.active = false;
                            if (!(Math.random() < 0.3)) return [3 /*break*/, 2];
                            printLogUpdateOne(LogType.SWITCH_1, { "$inc": { "count": 1 } });
                            return [4 /*yield*/, orange.sleep(Math.random() * 3000)];
                        case 1:
                            _a.sent();
                            printLogUpdateOne(LogType.SWITCH_COMPLETE_1, { "$inc": { "count": 1 } });
                            return [3 /*break*/, 8];
                        case 2:
                            if (!(Math.random() < 0.5)) return [3 /*break*/, 5];
                            printLogUpdateOne(LogType.SWITCH_2, { "$inc": { "count": 1 } });
                            return [4 /*yield*/, orange.sleep(3000)];
                        case 3:
                            _a.sent();
                            this.proxy['_connection']._connection.client._client.close();
                            return [4 /*yield*/, orange.sleep(300000)];
                        case 4:
                            _a.sent();
                            printLogUpdateOne(LogType.SWITCH_COMPLETE_2, { "$inc": { "count": 1 } });
                            return [3 /*break*/, 8];
                        case 5:
                            printLogUpdateOne(LogType.SWITCH_3, { "$inc": { "count": 1 } });
                            return [4 /*yield*/, orange.sleep(3000)];
                        case 6:
                            _a.sent();
                            this.proxy['_connection']._connection.client._client.close();
                            return [4 /*yield*/, orange.sleep((1 + 2 * Math.random()) * 3600 * 1000)];
                        case 7:
                            _a.sent();
                            printLogUpdateOne(LogType.SWITCH_COMPLETE_3, { "$inc": { "count": 1 } });
                            _a.label = 8;
                        case 8:
                            this.proxy.active = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        TestCase.prototype.login = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve) {
                            var user = _this.user = 'user' + (~~(Math.random() * 100000000));
                            game.login('ws://10.1.1.79:10000', 'debug', user, false).then(function (res) {
                                _this.proxy = res.proxy;
                                _this.proxy.root = new NetNormalTestServer();
                                orange.on(_this.proxy.connection, orange.Event.CLOSE, function (e) {
                                    _this.proxy = null;
                                    var r = e.data.reason;
                                    console.log('close reason:', r);
                                    printLogUpdateOne(LogType.CLOSE, { "$inc": { "count": 1 } });
                                    printLogUpdateOne(LogType.LOGIN_ERROR, { "$inc": { "count": 1 } }, { 'reason': r });
                                });
                                printLogUpdateOne(LogType.LOGIN_COMPLETE_SUM, { "$inc": { "count": 1 } });
                                resolve(true);
                            }).catch(function (err) {
                                printLogUpdateOne(LogType.LOGIN_ERROR_SUM, { "$inc": { "count": 1 } });
                                printLogUpdateOne(LogType.LOGIN_ERROR, { "$inc": { "count": 1 } }, { 'message': err.message });
                                resolve(false);
                            });
                        })];
                });
            });
        };
        return TestCase;
    }());
    /**
     * 打印日志
     * @param type
     * @param value
     */
    function printLog(type, user, value) {
        var data = { 'type': type, 'user': user };
        for (var k in value) {
            data[k] = value[k];
        }
        db.insertOne(dbName, collectionName, data);
    }
    /**
     * 打印日志
     * @param type
     * @param value
     */
    function printLogUpdateOne(type, value, find) {
        var obj = { 'type': type };
        if (find) {
            for (var k in find) {
                obj[k] = find[k];
            }
        }
        db.updateOne(dbName, collectionName, obj, value);
    }
    var LogType;
    (function (LogType) {
        LogType["LOGIN_ERROR"] = "connect-error";
        LogType["LOGIN_ERROR_SUM"] = "connect-error-sum";
        LogType["LOGIN_COMPLETE_SUM"] = "login-complete-sum";
        LogType["CLOSE"] = "close";
        LogType["SWITCH_1"] = "switch-1";
        LogType["SWITCH_2"] = "switch-2";
        LogType["SWITCH_3"] = "switch-3";
        LogType["SWITCH_COMPLETE_1"] = "switch-complete-1";
        LogType["SWITCH_COMPLETE_2"] = "switch-complete-2";
        LogType["SWITCH_COMPLETE_3"] = "switch-complete-3";
    })(LogType || (LogType = {}));
    var NetNormalTestServer = /** @class */ (function () {
        function NetNormalTestServer() {
            this.player = new game.net.GD_Player();
            this.battleInfo = new game.net.GD_BattleInfo();
            this.roomInfo = new game.net.GD_FriendMatchRoom();
            this.baseSync = new game.net.GD_BaseSyncData(); //用于同步时间
            this.matchTeams = new game.net.GD_MatchTeams();
        }
        return NetNormalTestServer;
    }());
})(test || (test = {}));
//# sourceMappingURL=game.js.map