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

/***/ "../src/config/game-config.ts":
/*!************************************!*\
  !*** ../src/config/game-config.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EMGameType;
(function (EMGameType) {
    EMGameType["PUZZLE"] = "puzzle";
    EMGameType["VIEW"] = "view";
})(EMGameType = exports.EMGameType || (exports.EMGameType = {}));
exports.gameConfigs = {
    "1": {
        id: 1,
        type: EMGameType.PUZZLE,
        name: "初级推箱子",
        desc: "难度相对比较简单，尽情的闯关吧！"
    },
    "2": {
        id: 2,
        type: EMGameType.PUZZLE,
        name: "经典推箱子",
        desc: "经典的推箱子玩法，难度适中"
    },
    "3": {
        id: 3,
        type: EMGameType.PUZZLE,
        name: "勇闯迷宫",
        desc: "敢问路在何方～～",
    },
    "4": {
        id: 4,
        type: EMGameType.PUZZLE,
        name: "青蛇与红苹果",
        desc: "小蛇看上了红红的大苹果？"
    },
    "5": {
        id: 5,
        type: EMGameType.PUZZLE,
        name: "收藏有礼",
        desc: "收藏游戏后可立即获得丰富奖励",
        isActive: true
    }
};


/***/ }),

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
var main_scene_1 = __webpack_require__(/*! ./modules/main/main-scene */ "../src/modules/main/main-scene.ts");
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
                                new main_scene_1.MainScene();
                                // new FaceScene(true);
                                // new PuzzleScene();
                                // new BubbleScene();
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

/***/ "../src/modules/main/components/game-item-renderer.ts":
/*!************************************************************!*\
  !*** ../src/modules/main/components/game-item-renderer.ts ***!
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
var game_config_1 = __webpack_require__(/*! ../../../config/game-config */ "../src/config/game-config.ts");
orange.autoloadLink("MainScene");
var GameItemRenderer = /** @class */ (function (_super) {
    __extends(GameItemRenderer, _super);
    function GameItemRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameItemRenderer.prototype.init = function () {
        var _this = this;
        this.addComponent(leaf.TouchComponent).onTouchEnd.on(function () {
            console.error("click", _this.data);
        });
    };
    GameItemRenderer.prototype.onData = function (d) {
        var bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.texture = leaf.PointTexture.getTexture(0xffffff);
        bg.transform.scaleX = 300;
        bg.transform.scaleY = 300;
        bg.parent = this.entity;
        var cfg = game_config_1.gameConfigs[d.id];
        var shortCut = ecs.Entity.create().addComponent(leaf.Bitmap);
        shortCut.resource = "game" + d.id + "_png";
        shortCut.transform.x = (300 - 282) / 2;
        shortCut.transform.y = (300 - 282) / 2;
        shortCut.parent = this.entity;
        var nameLabel = ecs.Entity.create().addComponent(leaf.Label);
        nameLabel.text = cfg.name;
        nameLabel.transform.x = shortCut.transform.x;
        nameLabel.transform.y = 250;
        nameLabel.fontColor = 0;
        nameLabel.fontSize = 20;
        nameLabel.parent = this.entity;
    };
    return GameItemRenderer;
}(leaf.ListItemRenderer));
exports.GameItemRenderer = GameItemRenderer;


/***/ }),

/***/ "../src/modules/main/components/main-top.ts":
/*!**************************************************!*\
  !*** ../src/modules/main/components/main-top.ts ***!
  \**************************************************/
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
orange.autoloadLink("MainScene");
var MainTop = /** @class */ (function (_super) {
    __extends(MainTop, _super);
    function MainTop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChangeMenu = new ecs.Broadcast();
        return _this;
    }
    Object.defineProperty(MainTop.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (val) {
            if (this._selected === val)
                return;
            if (val < 0)
                return;
            if (val >= this.menuRoot.children.length)
                return;
            this._selected = val;
            this.onChangeMenu.dispatch(val);
            for (var i = 0; i < this.menuRoot.children.length; i++) {
                if (i === val) {
                    this.menuRoot.children[i].children[1].getComponent(leaf.Label).transform.alpha = 0;
                    this.menuRoot.children[i].children[2].getComponent(leaf.Label).transform.alpha = 1;
                }
                else {
                    this.menuRoot.children[i].children[1].getComponent(leaf.Label).transform.alpha = 1;
                    this.menuRoot.children[i].children[2].getComponent(leaf.Label).transform.alpha = 0;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MainTop.prototype.init = function () {
        this.menuIndex = 0;
        this.menuRoot = ecs.Entity.create();
        this.menuRoot.parent = this.entity;
        this.menuRoot.transform.y = 200;
        this.addMenu("收藏");
        this.addMenu("活动");
        this.addMenu("热门");
        this.addMenu("推荐");
        this.addMenu("其它");
    };
    MainTop.prototype.addMenu = function (name) {
        var _this = this;
        var index = this.menuIndex++;
        var p = ecs.Entity.create();
        p.transform.x = 17 + index * 121;
        p.parent = this.menuRoot;
        var bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.texture = leaf.PointTexture.getTexture(0);
        bg.parent = p;
        bg.transform.scaleX = 120;
        bg.transform.scaleY = 50;
        bg.transform.alpha = 0;
        var label1 = ecs.Entity.create().addComponent(leaf.Label);
        label1.fontSize = 28;
        label1.fontColor = 0x777777;
        label1.text = name;
        label1.parent = p;
        label1.transform.x = 33;
        label1.transform.y = 10;
        var label2 = ecs.Entity.create().addComponent(leaf.Label);
        label2.fontSize = 31;
        label2.fontColor = 0xfb76a3;
        label2.text = name;
        label2.parent = p;
        label2.transform.x = label1.transform.x - 3;
        label2.transform.y = label1.transform.y - 3;
        label2.transform.alpha = 0;
        p.addComponent(leaf.TouchComponent).onTouchStart.on(function () {
            _this.selected = index;
        });
    };
    MainTop.prototype.onDestroy = function () {
        this.onChangeMenu.removeAll();
        this.menuRoot = null;
    };
    return MainTop;
}(ecs.Component));
exports.MainTop = MainTop;


/***/ }),

/***/ "../src/modules/main/components/main-ui.ts":
/*!*************************************************!*\
  !*** ../src/modules/main/components/main-ui.ts ***!
  \*************************************************/
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
var top_info_view_1 = __webpack_require__(/*! ./top-info-view */ "../src/modules/main/components/top-info-view.ts");
var main_top_1 = __webpack_require__(/*! ./main-top */ "../src/modules/main/components/main-top.ts");
var game_item_renderer_1 = __webpack_require__(/*! ./game-item-renderer */ "../src/modules/main/components/game-item-renderer.ts");
var game_config_1 = __webpack_require__(/*! ../../../config/game-config */ "../src/config/game-config.ts");
var game_tag_1 = __webpack_require__(/*! ../../../net/game-tag */ "../src/net/game-tag.ts");
orange.autoloadLink("MainScene");
var MainUI = /** @class */ (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.top = 255;
        _this.bottom = 50;
        return _this;
    }
    MainUI.prototype.init = function () {
        this.addBg();
        ecs.Entity.create().addComponent(top_info_view_1.TopInfoView).parent = this.entity;
        var top = this.addComponent(main_top_1.MainTop);
        top.selected = 0;
        top.onChangeMenu.on(this.refresh, this);
        var list = this.list = ecs.Entity.create().addComponent(leaf.List, [], game_item_renderer_1.GameItemRenderer, 640, leaf.getStageHeight() - this.top - this.bottom);
        list.addComponent(leaf.TileLayout, 300, 300, 10, 10).addComponent(leaf.Scroller, list, false, true).speedV = 3;
        list.parent = this.entity;
        list.transform.y = this.top + 10;
        list.transform.x = 15;
        this.refresh(top.selected);
    };
    MainUI.prototype.refresh = function (index) {
        var e_1, _a, e_2, _b;
        if (this.emptyLabel) {
            this.emptyLabel.entity.destroy();
            this.emptyLabel = null;
        }
        var data = [];
        if (index === 2) {
            try {
                for (var _c = __values(game_tag_1.GameTag.tags.hot.gameIds), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var id = _d.value;
                    if (game_config_1.gameConfigs[id]) {
                        data.push(game_config_1.gameConfigs[id]);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else if (index === 3) {
            try {
                for (var _e = __values(game_tag_1.GameTag.tags.push.gameIds), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var id = _f.value;
                    if (game_config_1.gameConfigs[id]) {
                        data.push(game_config_1.gameConfigs[id]);
                    }
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
        else {
            for (var k in game_config_1.gameConfigs) {
                var cfg = game_config_1.gameConfigs[k];
                if (index === 4) {
                    if (!cfg.isActive)
                        data.push(cfg);
                }
                if (index === 1) {
                    if (cfg.isActive)
                        data.push(cfg);
                }
            }
        }
        this.list.data = data;
        if (!data.length) {
            this.emptyLabel = ecs.Entity.create().addComponent(leaf.Label);
            this.emptyLabel.fontColor = 0x777777;
            this.emptyLabel.text = "列表暂时是空的，看看其它分类吧~";
            this.emptyLabel.parent = this.entity;
            this.emptyLabel.transform.x = (leaf.getStageWidth() - this.emptyLabel.textWidth) / 2;
            this.emptyLabel.transform.y = this.top + (leaf.getStageHeight() - this.top - this.emptyLabel.textHeight) / 2;
        }
    };
    MainUI.prototype.addBg = function () {
        var bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.resource = "bg";
        bg.parent = this.entity;
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight();
        var bg2 = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg2.texture = leaf.PointTexture.getTexture(0xf4f4f4);
        bg2.parent = this.entity;
        bg2.transform.scaleX = leaf.getStageWidth();
        bg2.transform.y = this.top;
        bg2.transform.scaleY = leaf.getStageHeight() - bg2.transform.y;
        for (var i = 0; i < 10; i++) {
            var ball = ecs.Entity.create().addComponent(leaf.Bitmap);
            ball.entity.parent = this.entity;
            ball.resource = "bubble_ball1_png";
            ball.entity.transform.x = 52 * i;
            ball.entity.transform.y = 300;
        }
    };
    return MainUI;
}(ecs.Component));
exports.MainUI = MainUI;


/***/ }),

/***/ "../src/modules/main/components/top-info-view.ts":
/*!*******************************************************!*\
  !*** ../src/modules/main/components/top-info-view.ts ***!
  \*******************************************************/
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
var system_1 = __webpack_require__(/*! ../../../utils/system */ "../src/utils/system.ts");
orange.autoloadLink("MainScene");
var TopInfoView = /** @class */ (function (_super) {
    __extends(TopInfoView, _super);
    function TopInfoView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopInfoView.prototype.init = function () {
        this.entity.transform.y = system_1.System.topHeight;
        var bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.resource = "top_info_bg_png";
        bg.transform.x = 17;
        bg.parent = this.entity;
        var heart = ecs.Entity.create().addComponent(leaf.Bitmap);
        heart.resource = "heart";
        heart.transform.x = bg.transform.x + 15;
        heart.transform.y = 4;
        heart.parent = this.entity;
        var heartCount = ecs.Entity.create().addComponent(leaf.Label);
        heartCount.transform.x = heart.transform.x + 65;
        heartCount.transform.y = 13;
        heartCount.text = "9999";
        heartCount.fontSize = 40;
        heartCount.fontColor = 0x777777;
        heartCount.bold = true;
        heartCount.parent = this.entity;
        bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.resource = "top_info_bg";
        bg.transform.x = 220;
        bg.parent = this.entity;
        var gold = ecs.Entity.create().addComponent(leaf.Bitmap);
        gold.resource = "gold";
        gold.transform.x = bg.transform.x + 15;
        gold.transform.y = 4;
        gold.parent = this.entity;
        var goldCount = ecs.Entity.create().addComponent(leaf.Label);
        goldCount.transform.x = gold.transform.x + 65;
        goldCount.transform.y = 13;
        goldCount.text = "9999";
        goldCount.fontSize = 40;
        goldCount.fontColor = 0x777777;
        goldCount.bold = true;
        goldCount.parent = this.entity;
    };
    return TopInfoView;
}(ecs.Component));
exports.TopInfoView = TopInfoView;


/***/ }),

/***/ "../src/modules/main/main-scene.ts":
/*!*****************************************!*\
  !*** ../src/modules/main/main-scene.ts ***!
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
var main_ui_1 = __webpack_require__(/*! ./components/main-ui */ "../src/modules/main/components/main-ui.ts");
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        ecs.Entity.create().addComponent(main_ui_1.MainUI).parent = _this.scene;
        return _this;
    }
    MainScene = __decorate([
        orange.autoload("MainScene")
    ], MainScene);
    return MainScene;
}(module_scene_1.ModuleScene));
exports.MainScene = MainScene;


/***/ }),

/***/ "../src/net/game-tag.ts":
/*!******************************!*\
  !*** ../src/net/game-tag.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameTag = /** @class */ (function () {
    function GameTag() {
        this.gameIds = [];
    }
    GameTag.tags = {
        hot: {
            name: "hot",
            gameIds: [1, 4]
        },
        push: {
            name: "push",
            gameIds: [2]
        }
    };
    return GameTag;
}());
exports.GameTag = GameTag;


/***/ }),

/***/ "../src/utils/system.ts":
/*!******************************!*\
  !*** ../src/utils/system.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var System = /** @class */ (function () {
    function System() {
    }
    System.hasTop = true;
    System.topHeight = 73;
    return System;
}());
exports.System = System;


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