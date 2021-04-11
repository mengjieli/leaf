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
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var tween;
(function (tween) {
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
    tween.EaseFunction = EaseFunction;
})(tween || (tween = {}));
var tween;
(function (tween) {
    var BasicPlugin = /** @class */ (function () {
        function BasicPlugin() {
            this.name = "basicPlugin";
        }
        /**
         * 初始化相关属性
         * @param target 对象
         * @param data  相关的属性
         */
        BasicPlugin.prototype.init = function (target, data, timeTotal) {
            for (var k in data.propsInit) {
                data.properties.push(k);
                var from = data.propsInit && data.propsInit.from &&
                    data.propsInit.from[k] != null ? data.propsInit.from[k] : target[k];
                var to = data.propsInit[k];
                //计算变化率
                data.propsStorage[k] = (to - from) / timeTotal;
            }
        };
        /**
         *
         * @param target 对象
         * @param data 相关的属性
         * @param dt 时间差
         * @param time 总的时间
         * @param timeTotal 总时间
         */
        BasicPlugin.prototype.update = function (target, data, dt, time, timeTotal) {
            var e_1, _a;
            try {
                for (var _b = __values(data.properties), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var k = _c.value;
                    target[k] += data.propsStorage[k] * dt;
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
        return BasicPlugin;
    }());
    tween.BasicPlugin = BasicPlugin;
})(tween || (tween = {}));
var tween;
(function (tween) {
    var BezierPlugin = /** @class */ (function () {
        function BezierPlugin() {
            this.name = "bezierPlugin";
        }
        /**
         * 初始化相关属性
         * @param target 对象
         * @param data  相关的属性
         */
        BezierPlugin.prototype.init = function (target, data, timeTotal) {
            var e_2, _a, e_3, _b;
            var params = data.propsInit;
            if (!params)
                return false;
            if (typeof params.x != "object" || !(params.x instanceof Array))
                return;
            if (typeof params.y != "object" || !(params.y instanceof Array))
                return;
            var fromX = data.propsStorage.fromX = params.from && params.from.x != null ? params.from.x : target.x;
            var fromY = data.propsStorage.fromY = params.from && params.from.y != null ? params.from.y : target.y;
            var points = [{ x: fromX, y: fromY }];
            for (var i = 0; i < params.x.length && i < params.y.length; i++) {
                points.push({ x: params.x[i], y: params.y[i] });
            }
            data.propsStorage.lines = this.getCubicBezierLines(data, points, params.k != null ? params.k : 0.8, params.p != null ? params.p : 0.5);
            data.propsStorage.lineIndex = 0;
            data.propsStorage.linePassLength = 0;
            var length = 0;
            try {
                for (var _c = __values(data.propsStorage.lines), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var line = _d.value;
                    length += line.len;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var p = 0;
            try {
                for (var _e = __values(data.propsStorage.lines), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var line = _f.value;
                    p += line.len / length;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
            data.propsStorage.lineLength = length;
            data.propsStorage.v = length / timeTotal;
            return true;
        };
        /**
         *
         * @param target 对象
         * @param data 相关的属性
         * @param dt 时间差
         * @param time 总的时间
         * @param timeTotal 总时间
         */
        BezierPlugin.prototype.update = function (target, data, dt, time, timeTotal) {
            var lines = data.propsStorage.lines;
            var p = time / timeTotal;
            var lineLength = data.propsStorage.lineLength;
            var lp = 0;
            if (p < 0) {
                p = -p;
                for (var i = 0, len = lines.length; i < len; i++) {
                    lp = lines[i].len / lineLength;
                    if (p <= lp) {
                        target.x = 2 * data.propsStorage.fromX - (lines[i].x1 + (lines[i].x2 - lines[i].x1) * p / lp);
                        target.y = 2 * data.propsStorage.fromY - (lines[i].y1 + (lines[i].y2 - lines[i].y1) * p / lp);
                        break;
                    }
                    else {
                        p -= lp;
                    }
                }
            }
            else if (p > 1) {
                p = 2 - p;
                for (var i = 0, len = lines.length; i < len; i++) {
                    lp = lines[i].len / lineLength;
                    if (p <= lp) {
                        target.x = 2 * lines[len - 1].x2 - (lines[i].x1 + (lines[i].x2 - lines[i].x1) * p / lp);
                        target.y = 2 * lines[len - 1].y2 - (lines[i].y1 + (lines[i].y2 - lines[i].y1) * p / lp);
                        break;
                    }
                    else {
                        p -= lp;
                    }
                }
            }
            else {
                for (var i = 0, len = lines.length; i < len; i++) {
                    lp = lines[i].len / lineLength;
                    if (p <= lp) {
                        target.x = lines[i].x1 + (lines[i].x2 - lines[i].x1) * p / lp;
                        target.y = lines[i].y1 + (lines[i].y2 - lines[i].y1) * p / lp;
                        break;
                    }
                    else {
                        p -= lp;
                    }
                }
            }
            // x1: lastX,
            //             y1: lastY,
            //             x2: x,
            //             y2: y,
            //             len: Math.sqrt((x - lastX) * (x - lastX) + (y - lastY) * (y - lastY))
        };
        /**
             * 根据已知点获取贝塞尔曲线的模拟线段
             * @param points 经过的点
             * @param devices 贝塞尔曲线的拆分个数，个数越多拆分的越精确
             * @param k 平滑系数，范围 0 ~ 1.0，越大就越平滑，越小就越尖锐
             */
        BezierPlugin.prototype.getCubicBezierLines = function (data, points, k, p) {
            if (k === void 0) { k = 1; }
            if (p === void 0) { p = 1; }
            var controls = this.getCubicBezierControlPoints(points, k);
            var lines = [];
            var lineLength = 0;
            for (var i = 0; i < points.length - 1; i++) {
                var p1x = points[i].x;
                var p1y = points[i].y;
                var p2x = controls[i * 2].x;
                var p2y = controls[i * 2].y;
                var p3x = controls[i * 2 + 1].x;
                var p3y = controls[i * 2 + 1].y;
                var p4x = points[i + 1].x;
                var p4y = points[i + 1].y;
                var lastX = p1x;
                var lastY = p1y;
                var devices = ~~(Math.sqrt((p1x - p4x) * (p1x - p4x) + (p1y - p4y) * (p1y - p4y)) * p) || 2;
                for (var d = 1; d <= devices; d++) {
                    var t = d / devices;
                    var x = p1x * (1 - t) * (1 - t) * (1 - t) + p2x * 3 * (1 - t) * (1 - t) * t + p3x * 3 * (1 - t) * t * t + p4x * t * t * t;
                    var y = p1y * (1 - t) * (1 - t) * (1 - t) + p2y * 3 * (1 - t) * (1 - t) * t + p3y * 3 * (1 - t) * t * t + p4y * t * t * t;
                    lines.push({
                        x1: lastX,
                        y1: lastY,
                        x2: x,
                        y2: y,
                        len: Math.sqrt((x - lastX) * (x - lastX) + (y - lastY) * (y - lastY))
                    });
                    lastX = x;
                    lastY = y;
                    lineLength += lines[lines.length - 1].len;
                }
            }
            data.propsStorage.lineLength = lineLength;
            return lines;
        };
        /**
         * 根据已知点获取贝塞尔曲线的控制点
         * @param points 路径点
         * @param k 平滑系数，范围 0 ~ 1.0，越大就越平滑，越小就越尖锐
         */
        BezierPlugin.prototype.getCubicBezierControlPoints = function (points, k) {
            points = points.concat();
            if (points.length > 2) {
                var r1 = Math.atan2(points[1].y - points[0].y, points[1].x - points[0].x);
                var r2 = Math.atan2(points[2].y - points[1].y, points[2].x - points[1].x);
                var r = r1 + (r1 - r2) * 0.67;
                r -= Math.PI;
                var l = Math.sqrt((points[2].y - points[1].y) * (points[2].y - points[1].y) + (points[2].x - points[1].x) * (points[2].x - points[1].x));
                points = [{
                    x: points[0].x + Math.cos(r) * l * 0.5,
                    y: points[0].y + Math.sin(r) * l * 1,
                }].concat(points);
                var len = points.length;
                r1 = Math.atan2(points[len - 1].y - points[len - 2].y, points[len - 1].x - points[len - 2].x);
                r2 = Math.atan2(points[len - 2].y - points[len - 3].y, points[len - 2].x - points[len - 3].x);
                r = r1 + (r1 - r2) * 0.67;
                r -= Math.PI;
                l = Math.sqrt((points[len - 3].y - points[len - 2].y) * (points[len - 3].y - points[len - 2].y) + (points[len - 3].x - points[len - 2].x) * (points[len - 3].x - points[len - 2].x));
                points.push({
                    x: -(-points[len - 1].x + Math.cos(r) * l * 0.5),
                    y: -(-points[len - 1].y + Math.sin(r) * l * 0.5),
                });
            }
            else {
                points = [{
                    x: points[0].x + (points[0].x - points[1].x),
                    y: points[0].y + points[0].y - points[1].y
                }].concat(points);
                points.push({
                    x: points[points.length - 1].x + points[points.length - 1].x - points[points.length - 2].x,
                    y: points[points.length - 1].y + points[points.length - 1].y - points[points.length - 2].y
                });
            }
            var controls = [];
            for (var i = 1; i < points.length - 1; i++) {
                var point1 = points[i - 1];
                var point2 = points[i];
                var point3 = points[i + 1];
                var control1 = { x: (point1.x + point2.x) * .5, y: (point1.y + point2.y) * .5 };
                var control2 = { x: (point2.x + point3.x) * .5, y: (point2.y + point3.y) * .5 };
                var len1 = Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
                var len2 = Math.sqrt((point3.x - point2.x) * (point3.x - point2.x) + (point3.y - point2.y) * (point3.y - point2.y));
                var controlCenter = {
                    x: control1.x + (control2.x - control1.x) * (len1 + len2 == 0 ? 0 : len1 / (len1 + len2)),
                    y: control1.y + (control2.y - control1.y) * (len1 + len2 == 0 ? 0 : len1 / (len1 + len2)),
                };
                if (k != 1.0) {
                    control1.x = controlCenter.x + (control1.x - controlCenter.x) * k;
                    control1.y = controlCenter.y + (control1.y - controlCenter.y) * k;
                    control2.x = controlCenter.x + (control2.x - controlCenter.x) * k;
                    control2.y = controlCenter.y + (control2.y - controlCenter.y) * k;
                }
                control1.x += point2.x - controlCenter.x;
                control1.y += point2.y - controlCenter.y;
                control2.x += point2.x - controlCenter.x;
                control2.y += point2.y - controlCenter.y;
                controls.push(control1);
                controls.push(control2);
            }
            controls.shift();
            controls.pop();
            return controls;
        };
        return BezierPlugin;
    }());
    tween.BezierPlugin = BezierPlugin;
})(tween || (tween = {}));
var tween;
(function (tween) {
    var VelocityPlugin = /** @class */ (function () {
        function VelocityPlugin() {
            this.name = "vPlugin";
        }
        /**
         * 初始化相关属性
         * @param target 对象
         * @param data  相关的属性
         */
        VelocityPlugin.prototype.init = function (target, data, timeTotal) {
            data.propsStorage.vx = data.propsInit.vx || 0;
            data.propsStorage.vy = data.propsInit.vy || 0;
            data.propsStorage.ax = data.propsInit.ax || 0;
            data.propsStorage.ay = data.propsInit.ay || 0;
        };
        /**
         *
         * @param target 对象
         * @param data 相关的属性
         * @param dt 时间差
         * @param time 总的时间
         * @param timeTotal 总时间
         */
        VelocityPlugin.prototype.update = function (target, data, dt, time, timeTotal) {
            if (time === 0) {
                if (data.propsInit.from && data.propsInit.from.x != null) {
                    target.x = data.propsInit.from.x;
                }
                if (data.propsInit.from && data.propsInit.from.y != null) {
                    target.y = data.propsInit.from.y;
                }
            }
            data.propsStorage.vx += data.propsStorage.ax * dt;
            target.x += data.propsStorage.vx * dt;
            data.propsStorage.vy += data.propsStorage.ay * dt;
            target.y += data.propsStorage.vy * dt;
        };
        return VelocityPlugin;
    }());
    tween.VelocityPlugin = VelocityPlugin;
})(tween || (tween = {}));
var tween;
(function (tween_1) {
    var Tween = /** @class */ (function (_super) {
        __extends(Tween, _super);
        function Tween() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.plugins = new ecs.Link();
            return _this;
        }
        Tween.prototype.init = function (target, totalTime, props, ease) {
            if (!target || totalTime <= 0) {
                this.destroy();
                return;
            }
            this.propsInit = props;
            this.target = target;
            this.totalTime = totalTime;
            this.ease = ease || tween_1.EaseFunction.None;
            this.curTime = 0;
            this.isPlaying = true;
        };
        Tween.prototype.awake = function () {
            this.update(0);
        };
        Tween.prototype.update = function (dt) {
            var e_4, _a;
            if (!this.isPlaying)
                return;
            if (this.plugins.length === 0) {
                try {
                    for (var _b = __values(Tween.plugins), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var plugin = _c.value;
                        if (this.propsInit[plugin.name]) {
                            this.addPlugin(plugin);
                            delete this.propsInit[plugin.name];
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                this.addPlugin(Tween.basicPlugin);
            }
            var lastTime = this.ease(this.curTime / this.totalTime) * this.totalTime;
            this.curTime += dt;
            if (this.curTime >= this.totalTime) {
                this.curTime = this.totalTime;
            }
            var time = this.ease(this.curTime / this.totalTime) * this.totalTime;
            for (var node = this.plugins.head; node; node = node.next) {
                node.value.plugin.update(this.target, node.value, time - lastTime, time, this.totalTime);
            }
            this.onUpdate && this.onUpdate(this.curTime / this.totalTime, this);
            if (this.curTime >= this.totalTime) {
                var onComplete = this.onComplete;
                this.destroy();
                onComplete && onComplete();
            }
        };
        Tween.prototype.addPlugin = function (plugin) {
            var data = ecs.ObjectPools.createRecyableObject(TweenPluginData);
            data.propsInit = this.propsInit[plugin.name] || this.propsInit;
            data.propsStorage = {};
            data.properties.length = 0;
            data.plugin = plugin;
            plugin.init(this.target, data, this.totalTime);
            this.plugins.add(data);
        };
        Tween.prototype.onDestroy = function () {
            this.propsInit = null;
            this.target = null;
            this.plugins.clear(true);
            this.onComplete = null;
            this.onUpdate = null;
        };
        Tween.registerPlugin = function (plugin) {
            this.plugins.push(new plugin());
        };
        Tween.plugins = [];
        Tween.basicPlugin = new tween_1.BasicPlugin();
        return Tween;
    }(ecs.Component));
    tween_1.Tween = Tween;
    Tween.registerPlugin(tween_1.VelocityPlugin);
    Tween.registerPlugin(tween_1.BezierPlugin);
    var TweenPluginData = /** @class */ (function () {
        function TweenPluginData() {
            this.properties = [];
        }
        return TweenPluginData;
    }());
    tween_1.TweenPluginData = TweenPluginData;

    window["tween"] = tween_1;
})(tween || (tween = {}));
//# sourceMappingURL=tween.js.map