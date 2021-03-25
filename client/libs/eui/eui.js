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
var eui;
(function (eui) {
    var names = ['x', 'y', 'width', 'height', 'scaleX', 'scaleY', 'rotation', 'alpha'];
    var inits = {
        'x': 0,
        'y': 0,
        'scaleX': 1,
        'scaleY': 1,
        'alpha': 1,
        'rotation': 0
    };
    var name_width = 'width';
    var name_height = 'height';
    var name_scale9Grid = "scale9Grid";
    var name_source = "source";
    var BlendModeAdd = "add";
    var tweenConfigs = new Map();
    var EXMLParser = /** @class */ (function () {
        function EXMLParser() {
        }
        EXMLParser.getEXML = function (ui, cfg, fps) {
            if (fps === void 0) { fps = 60; }
            var childrenProperties = this.childrenProperties;
            var properties;
            if (!this.childrenProperties.has(cfg)) {
                childrenProperties.set(cfg, {});
                properties = childrenProperties.get(cfg);
                this.decodeProperties(ui.entity, cfg.root.properties);
                this.decodeChildren(ui, ui.entity, cfg.root.children, properties);
                this.decodeTween(ui, cfg.tweens, properties, fps);
            }
            else {
                this.decodeProperties(ui.entity, cfg.root.properties);
                this.decodeChildren(ui, ui.entity, cfg.root.children);
                this.decodeTween(ui, cfg.tweens, null, fps);
            }
            return ui;
        };
        EXMLParser.decodeProperties = function (ui, properties) {
            for (var k in properties) {
                if (k == name_scale9Grid) {
                    var arr = properties[k].split(",");
                    ui[k] = {
                        x: +arr[0],
                        y: +arr[1],
                        width: +arr[2],
                        height: +arr[3]
                    };
                }
                else if (k == name_source) {
                    ui.getComponent(leaf.Bitmap).resource = properties[k];
                }
                else if (k == "blendMode") {
                    if (properties[k] == BlendModeAdd) {
                        ui.getComponent(leaf.Render)["blendMode"] = leaf.BlendMode.ADD;
                    }
                    else {
                    }
                }
                else if (k === "x" || k === "y" || k === "scaleX" || k === "scaleY"
                    || k === "anchorOffsetX" || k === "anchorOffsetY") {
                    ui.transform[k] = properties[k];
                }
                else if (k === "rotation") {
                    ui.transform.angle = properties[k];
                }
                else {
                    ui[k] = properties[k];
                }
            }
        };
        EXMLParser.decodeChildren = function (root, ui, children, properties) {
            var _this = this;
            var add = ui["blendMode"] === BlendModeAdd;
            children.forEach(function (child) {
                var display = _this.decodeDisplay(root, child, properties);
                if (add) {
                    display["blendMode"] = "add";
                }
                ui.addChild(display);
                if (child.properties.id) {
                    root[child.properties.id] = display;
                    root["ids"][child.properties.id] = display;
                }
            });
            // if (add && ui instanceof Container) {
            //     ui["blendMode"] = BlendMode.NORMAL;
            // }
        };
        EXMLParser.decodeDisplay = function (root, cfg, properties) {
            var entity = ecs.Entity.create();
            var define;
            if (cfg.type == "eui.Group") {
            }
            else if (cfg.type == "eui.Component") {
            }
            else if (cfg.type == "eui.Image") {
                entity.addComponent(leaf.Bitmap);
            }
            else {
                define = window[cfg.type];
                if (define) {
                    entity.addComponent(define);
                }
            }
            if (properties && cfg.properties.id) {
                properties[cfg.properties.id] = cfg.properties;
            }
            this.decodeProperties(entity, cfg.properties);
            this.decodeChildren(root, entity, cfg.children, properties);
            return entity;
        };
        EXMLParser.decodeTween = function (ui, cfg, childrenProperties, fps) {
            var _this = this;
            if (fps === void 0) { fps = 60; }
            if (!tweenConfigs.has(cfg)) {
                var list_1 = [];
                cfg.forEach(function (tweenGroupCfg) {
                    var group = eui.TweenGroupConfig.create();
                    list_1.push(group);
                    var time = 0;
                    var length = 0;
                    tweenGroupCfg.items.forEach(function (itemCfg) {
                        var item = _this.decodeTweenItem(itemCfg, childrenProperties, fps);
                        group.items.push(item);
                        length = item.frames.length > length ? item.frames.length : length;
                        time = item.time > time ? item.time : time;
                    });
                    group.items.forEach(function (item) {
                        while (item.frames.length && item.frames.length < length) {
                            item.frames.push(item.frames[item.frames.length - 1]);
                        }
                    });
                    group.frameLength = length;
                    group.time = time;
                    group.id = tweenGroupCfg.id;
                    ui[group.id] = group;
                });
                tweenConfigs.set(cfg, list_1);
            }
            var groups = [];
            tweenConfigs.get(cfg).forEach(function (tweenGroupCfg) {
                var tweenGroup = eui.TweenGroup.create();
                groups.push(tweenGroup);
                tweenGroup.display = ui;
                tweenGroup.groups = groups;
                tweenGroup.tween = tweenGroupCfg;
                tweenGroup.fps = fps;
                ui[tweenGroupCfg.id] = tweenGroup;
                ui["ids"][tweenGroupCfg.id] = tweenGroup;
            });
        };
        EXMLParser.decodeTweenItem = function (cfg, childrenProperties, fps) {
            if (fps === void 0) { fps = 60; }
            var item = eui.TweenItemConfig.create();
            item.targetId = cfg.target;
            childrenProperties = childrenProperties[item.targetId];
            var properties = {};
            var time = 0;
            cfg.items.forEach(function (itemCfg) {
                if (itemCfg.duration) {
                    time = itemCfg.time + itemCfg.duration;
                }
                else {
                    time = itemCfg.time;
                }
                for (var k in itemCfg) {
                    if (names.indexOf(k) != -1) {
                        properties[k] = true;
                    }
                }
            });
            var initProperties = {};
            for (var k in properties) {
                if (childrenProperties[k] != null) {
                    initProperties[k] = childrenProperties[k];
                }
                else {
                    if (k == name_width) {
                        // egret.error('error peorperty "width"')
                    }
                    else if (k == name_height) {
                        // egret.error('error peorperty "height"')
                    }
                    else {
                        initProperties[k] = inits[k];
                    }
                }
            }
            var frameGap = 1000 / fps;
            var frameLength = Math.ceil(time / frameGap) + 1;
            for (var f = 0; f < frameLength; f++) {
                var t = f * frameGap;
                var currentProperties = {};
                for (var k in initProperties) {
                    currentProperties[k] = initProperties[k];
                }
                for (var ind = 0; ind < cfg.items.length; ind++) {
                    var itemCfg = cfg.items[ind];
                    if (itemCfg.time <= t) {
                        if (itemCfg.duration != null) { //tween to
                            if (itemCfg.time + itemCfg.duration <= t) {
                                for (var k in properties) {
                                    if (itemCfg[k] != null) {
                                        currentProperties[k] = itemCfg[k];
                                    }
                                }
                            }
                            else {
                                for (var k in properties) {
                                    if (itemCfg[k] != null) {
                                        currentProperties[k] = currentProperties[k] + (itemCfg[k] - currentProperties[k]) * eases[itemCfg.ease || easeName]((t - itemCfg.time) / itemCfg.duration);
                                    }
                                }
                            }
                        }
                        else { //tween set
                            for (var k in properties) {
                                if (itemCfg[k] != null) {
                                    currentProperties[k] = itemCfg[k];
                                }
                            }
                        }
                    }
                    else {
                        break;
                    }
                }
                var frame = currentProperties;
                item.time = time;
                item.frames.push(frame);
            }
            return item;
        };
        EXMLParser.childrenProperties = new Map();
        return EXMLParser;
    }());
    eui.EXMLParser = EXMLParser;
    var EaseFunction = /** @class */ (function () {
        function EaseFunction() {
        }
        EaseFunction.None = function (t) {
            return t;
        };
        EaseFunction.SineEaseIn = function (t) {
            return Math.sin((t - 1) * Math.PI * .5) + 1;
        };
        EaseFunction.SineEaseOut = function (t) {
            return Math.sin(t * Math.PI * .5);
        };
        EaseFunction.SineEaseInOut = function (t) {
            return Math.sin((t - .5) * Math.PI) * .5 + .5;
        };
        EaseFunction.SineEaseOutIn = function (t) {
            if (t < 0.5) {
                return Math.sin(t * Math.PI) * .5;
            }
            return Math.sin((t - 1) * Math.PI) * .5 + 1;
        };
        EaseFunction.QuadEaseIn = function (t) {
            return t * t;
        };
        EaseFunction.QuadEaseOut = function (t) {
            return -(t - 1) * (t - 1) + 1;
        };
        EaseFunction.QuadEaseInOut = function (t) {
            if (t < .5) {
                return t * t * 2;
            }
            return -(t - 1) * (t - 1) * 2 + 1;
        };
        EaseFunction.QuadEaseOutIn = function (t) {
            var s = (t - .5) * (t - .5) * 2;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
        };
        EaseFunction.CubicEaseIn = function (t) {
            return t * t * t;
        };
        EaseFunction.CubicEaseOut = function (t) {
            return (t - 1) * (t - 1) * (t - 1) + 1;
        };
        EaseFunction.CubicEaseInOut = function (t) {
            if (t < .5) {
                return t * t * t * 4;
            }
            return (t - 1) * (t - 1) * (t - 1) * 4 + 1;
        };
        EaseFunction.CubicEaseOutIn = function (t) {
            return (t - .5) * (t - .5) * (t - .5) * 4 + .5;
        };
        EaseFunction.QuartEaseIn = function (t) {
            return t * t * t * t;
        };
        EaseFunction.QuartEaseOut = function (t) {
            var a = (t - 1);
            return -a * a * a * a + 1;
        };
        EaseFunction.QuartEaseInOut = function (t) {
            if (t < .5) {
                return t * t * t * t * 8;
            }
            var a = (t - 1);
            return -a * a * a * a * 8 + 1;
        };
        EaseFunction.QuartEaseOutIn = function (t) {
            var s = (t - .5) * (t - .5) * (t - .5) * (t - .5) * 8;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
        };
        EaseFunction.QuintEaseIn = function (t) {
            return t * t * t * t * t;
        };
        EaseFunction.QuintEaseOut = function (t) {
            var a = t - 1;
            return a * a * a * a * a + 1;
        };
        EaseFunction.QuintEaseInOut = function (t) {
            if (t < .5) {
                return t * t * t * t * t * 16;
            }
            var a = t - 1;
            return a * a * a * a * a * 16 + 1;
        };
        EaseFunction.QuintEaseOutIn = function (t) {
            var a = t - .5;
            return a * a * a * a * a * 16 + 0.5;
        };
        EaseFunction.ExpoEaseIn = function (t) {
            return Math.pow(2, 10 * (t - 1));
        };
        EaseFunction.ExpoEaseOut = function (t) {
            return -Math.pow(2, -10 * t) + 1;
        };
        EaseFunction.ExpoEaseInOut = function (t) {
            if (t < .5) {
                return Math.pow(2, 10 * (t * 2 - 1)) * .5;
            }
            return -Math.pow(2, -10 * (t - .5) * 2) * .5 + 1.00048828125;
        };
        EaseFunction.ExpoEaseOutIn = function (t) {
            if (t < .5) {
                return -Math.pow(2, -20 * t) * .5 + .5;
            }
            return Math.pow(2, 10 * ((t - .5) * 2 - 1)) * .5 + .5;
        };
        EaseFunction.CircEaseIn = function (t) {
            return 1 - Math.sqrt(1 - t * t);
        };
        EaseFunction.CircEaseOut = function (t) {
            return Math.sqrt(1 - (1 - t) * (1 - t));
        };
        EaseFunction.CircEaseInOut = function (t) {
            if (t < .5) {
                return .5 - Math.sqrt(.25 - t * t);
            }
            return Math.sqrt(.25 - (1 - t) * (1 - t)) + .5;
        };
        EaseFunction.CircEaseOutIn = function (t) {
            var s = Math.sqrt(.25 - (.5 - t) * (.5 - t));
            if (t < .5) {
                return s;
            }
            return 1 - s;
        };
        EaseFunction.BackEaseIn = function (t) {
            return 2.70158 * t * t * t - 1.70158 * t * t;
        };
        EaseFunction.BackEaseOut = function (t) {
            var a = t - 1;
            return 2.70158 * a * a * a + 1.70158 * a * a + 1;
        };
        EaseFunction.BackEaseInOut = function (t) {
            var a = t - 1;
            if (t < .5) {
                return 10.80632 * t * t * t - 3.40316 * t * t;
            }
            return 10.80632 * a * a * a + 3.40316 * a * a + 1;
        };
        EaseFunction.BackEaseOutIn = function (t) {
            var a = t - .5;
            if (t < .5) {
                return 10.80632 * a * a * a + 3.40316 * a * a + .5;
            }
            return 10.80632 * a * a * a - 3.40316 * a * a + .5;
        };
        EaseFunction.ElasticEaseIn = function (t) {
            if (t == 0 || t == 1)
                return t;
            return -(Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.075) * 2 * Math.PI / .3));
        };
        EaseFunction.ElasticEaseOut = function (t) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            return (Math.pow(2, 10 * -t) * Math.sin((-t - .075) * 2 * Math.PI / .3)) + 1;
        };
        EaseFunction.ElasticEaseInOut = function (t) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            if (t < .5) {
                return -(Math.pow(2, 10 * t - 10) * Math.sin((t * 2 - 2.15) * Math.PI / .3));
            }
            return (Math.pow(2, 10 - 20 * t) * Math.sin((-4 * t + 1.85) * Math.PI / .3)) * .5 + 1;
        };
        EaseFunction.ElasticEaseOutIn = function (t) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            if (t < .5) {
                return (Math.pow(2, -20 * t) * Math.sin((-t * 4 - .15) * Math.PI / .3)) * .5 + .5;
            }
            return -(Math.pow(2, 20 * (t - 1)) * Math.sin((t * 4 - 4.15) * Math.PI / .3)) * .5 + .5;
        };
        EaseFunction.bounceEaseIn = function (t) {
            return 1 - EaseFunction.bounceEaseOut(1 - t);
        };
        EaseFunction.bounceEaseOut = function (t) {
            var s;
            var a = 7.5625;
            var b = 2.75;
            if (t < (1 / 2.75)) {
                s = a * t * t;
            }
            else if (t < (2 / b)) {
                s = (a * (t - (1.5 / b)) * (t - (1.5 / b)) + .75);
            }
            else if (t < (2.5 / b)) {
                s = (a * (t - (2.25 / b)) * (t - (2.25 / b)) + .9375);
            }
            else {
                s = (a * (t - (2.625 / b)) * (t - (2.625 / b)) + .984375);
            }
            return s;
        };
        EaseFunction.BounceEaseInOut = function (t) {
            if (t < .5)
                return EaseFunction.bounceEaseIn(t * 2) * .5;
            else
                return EaseFunction.bounceEaseOut(t * 2 - 1) * .5 + .5;
        };
        EaseFunction.BounceEaseOutIn = function (t) {
            if (t < .5)
                return EaseFunction.bounceEaseOut(t * 2) * .5;
            else
                return EaseFunction.bounceEaseIn(t * 2 - 1) * .5 + .5;
        };
        EaseFunction.BounceEaseIn = EaseFunction.bounceEaseIn;
        EaseFunction.BounceEaseOut = EaseFunction.bounceEaseOut;
        return EaseFunction;
    }());
    var easeName = 'none';
    var eases = {
        'none': EaseFunction.None,
        'quadIn': EaseFunction.QuadEaseIn,
        'quadOut': EaseFunction.QuadEaseOut,
        'quadInOut': EaseFunction.QuadEaseInOut,
        'cubicIn': EaseFunction.CubicEaseIn,
        'cubicOut': EaseFunction.CubicEaseOut,
        'cubicInOut': EaseFunction.CubicEaseInOut,
        'quartIn': EaseFunction.QuartEaseIn,
        'quartOut': EaseFunction.QuartEaseOut,
        'quartInOut': EaseFunction.QuartEaseInOut,
        'quintIn': EaseFunction.QuintEaseIn,
        'quintOut': EaseFunction.QuintEaseOut,
        'quintInOut': EaseFunction.QuintEaseInOut,
        'sineIn': EaseFunction.SineEaseIn,
        'sineOut': EaseFunction.SineEaseOut,
        'sineInOut': EaseFunction.SineEaseInOut,
        'backIn': EaseFunction.BackEaseIn,
        'backOut': EaseFunction.BackEaseOut,
        'backInOut': EaseFunction.BackEaseInOut,
        'circIn': EaseFunction.CircEaseIn,
        'circOut': EaseFunction.CircEaseOut,
        'circInOut': EaseFunction.CircEaseInOut,
        'bounceIn': EaseFunction.BounceEaseIn,
        'bounceOut': EaseFunction.BounceEaseOut,
        'bounceInOut': EaseFunction.BounceEaseInOut,
        'elasticIn': EaseFunction.ElasticEaseIn,
        'elasticOut': EaseFunction.ElasticEaseOut,
        'elasticInOut': EaseFunction.ElasticEaseInOut
    };
})(eui || (eui = {}));
var eui;
(function (eui) {
    var EXML = /** @class */ (function (_super) {
        __extends(EXML, _super);
        function EXML() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.skinParts = [];
            _this.tweens = [];
            _this.ids = {};
            return _this;
        }
        EXML.prototype.init = function (exml) {
            eui.EXMLParser.getEXML(this, exml);
            var ids = this.ids;
            for (var k in ids) {
                this.skinParts.push(k);
                this[k] = ids[k];
                if (this[k] instanceof eui.TweenGroup) {
                    this.tweens.push(this[k]);
                }
            }
        };
        EXML.prototype.update = function (dt) {
            var e_1, _a;
            try {
                for (var _b = __values(this.tweens), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var tween = _c.value;
                    if (tween.isPlaying) {
                        tween.update(dt);
                    }
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
        EXML.prototype.playTweenGroup = function (tween, loop, completeCall, completeCallTarget) {
            if (loop === void 0) { loop = 0; }
            if (tween.frame == 1) {
                tween.update(0);
            }
            else {
                tween.isPlaying = true;
                tween.loop = loop || 100000000;
                tween.completeCall = completeCall;
                tween.completeCallTarget = completeCallTarget;
                tween.time = 0;
                tween.frame = 0;
                tween.update(0);
            }
        };
        EXML.prototype.stopTweenGroup = function (tween) {
            tween.isPlaying = false;
        };
        EXML.prototype.onDestroy = function () {
            var e_2, _a;
            try {
                for (var _b = __values(this.skinParts), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var k = _c.value;
                    if (this[k] && this[k] instanceof eui.TweenGroup) {
                        this[k].updateCall = null;
                    }
                    delete this[k];
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.tweens.length = 0;
            this.skinParts.length = 0;
            this.ids = {};
        };
        return EXML;
    }(ecs.Component));
    eui.EXML = EXML;
})(eui || (eui = {}));
var eui;
(function (eui) {
    var TweenGroupConfig = /** @class */ (function () {
        function TweenGroupConfig() {
            this.items = [];
        }
        TweenGroupConfig.create = function () {
            this.count++;
            return new TweenGroupConfig();
        };
        TweenGroupConfig.count = 0;
        return TweenGroupConfig;
    }());
    eui.TweenGroupConfig = TweenGroupConfig;
    var TweenItemConfig = /** @class */ (function () {
        function TweenItemConfig() {
            this.frames = [];
        }
        TweenItemConfig.create = function () {
            this.count++;
            return new TweenItemConfig();
        };
        TweenItemConfig.count = 0;
        return TweenItemConfig;
    }());
    eui.TweenItemConfig = TweenItemConfig;
    var TweenItemFrameConfig = /** @class */ (function () {
        function TweenItemFrameConfig() {
        }
        return TweenItemFrameConfig;
    }());
    eui.TweenItemFrameConfig = TweenItemFrameConfig;
})(eui || (eui = {}));
var eui;
(function (eui) {
    var TweenGroup = /** @class */ (function () {
        function TweenGroup() {
            this.time = 0;
            this.frame = 0;
            this.fps = 60;
            this.isPlaying = false;
            ecs.ObjectPools.setId(this);
        }
        Object.defineProperty(TweenGroup.prototype, "maxTime", {
            get: function () {
                return this.tween.time;
            },
            enumerable: true,
            configurable: true
        });
        TweenGroup.prototype.update = function (dt) {
            var e_3, _a;
            this.time += dt;
            this.frame = Math.round(this.time * this.fps / 1000);
            var isComplete = this.frame >= this.tween.frameLength;
            if (this.frame > this.tween.frameLength)
                this.frame = this.tween.frameLength;
            try {
                for (var _b = __values(this.tween.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    var target = this.display[item.targetId];
                    if (target) {
                        for (var k in item.frames[this.frame]) {
                            target.transform[k] = item.frames[this.frame][k];
                        }
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
            if (isComplete) {
                this.loop--;
                if (this.loop > 0) {
                    this.frame = 0;
                    this.time = 0;
                }
                else {
                    this.isPlaying = false;
                    var call = this.completeCall;
                    var target = this.completeCallTarget;
                    this.completeCall = null;
                    this.completeCallTarget = null;
                    call && call.apply(target);
                }
            }
        };
        TweenGroup.create = function () {
            this.count++;
            return new TweenGroup();
        };
        TweenGroup.count = 0;
        return TweenGroup;
    }());
    eui.TweenGroup = TweenGroup;
})(eui || (eui = {}));
//# sourceMappingURL=eui.js.map