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
var tiny2d;
(function (tiny2d) {
    function addToWorld(world) {
        world.addSystem(tiny2d.ForceSystem, [tiny2d.RigidBody, tiny2d.Force]);
        world.addSystem(tiny2d.MoveSystem, [tiny2d.RigidBody]);
    }
    tiny2d.addToWorld = addToWorld;
    function removeFromWorld(world) {
        world.removeSystem(tiny2d.Tiny2dSystem);
    }
    tiny2d.removeFromWorld = removeFromWorld;
    window["tiny2d"] = tiny2d;
})(tiny2d || (tiny2d = {}));
var tiny2d;
(function (tiny2d) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.sin = function (r) {
            return Math.sin(r);
        };
        Utils.cos = function (r) {
            return Math.cos(r);
        };
        Utils.atan2 = function (y, x) {
            return Math.atan2(y, x);
        };
        return Utils;
    }());
    tiny2d.Utils = Utils;
})(tiny2d || (tiny2d = {}));
var tiny2d;
(function (tiny2d) {
    /**
     * 矢量
     */
    var Vector = /** @class */ (function () {
        function Vector() {
            /**
             * @internal
             */
            this._d = 0;
        }
        Object.defineProperty(Vector.prototype, "r", {
            get: function () {
                return this._r;
            },
            set: function (val) {
                if (this._r === val)
                    return;
                this._r = val;
                this._x = tiny2d.Utils.cos(val);
                this._y = tiny2d.Utils.sin(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (val) {
                if (this._x === val)
                    return;
                this._x = val;
                this._r = tiny2d.Utils.atan2(this._y, this._x);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (val) {
                if (this._y === val)
                    return;
                this._y = val;
                this._r = tiny2d.Utils.atan2(this._y, this._x);
            },
            enumerable: true,
            configurable: true
        });
        Vector.prototype.init = function (x, y, d) {
            if (x === void 0) { x = 1; }
            if (y === void 0) { y = 0; }
            if (d === void 0) { d = 0; }
            this._x = x;
            this._y = y;
            this._r = tiny2d.Utils.atan2(this._y, this._x);
            this._d = d;
            this.dx = this.x * this._d;
            this.dy = this.y * this._d;
        };
        Object.defineProperty(Vector.prototype, "d", {
            /**
             * 大小
             */
            get: function () {
                return this._d;
            },
            set: function (val) {
                if (this._d === val)
                    return;
                this._d = val;
                this.dx = this.x * this._d;
                this.dy = this.y * this._d;
            },
            enumerable: true,
            configurable: true
        });
        return Vector;
    }());
    tiny2d.Vector = Vector;
})(tiny2d || (tiny2d = {}));
var tiny2d;
(function (tiny2d) {
    var ForceField = /** @class */ (function (_super) {
        __extends(ForceField, _super);
        function ForceField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ForceField;
    }(ecs.Component));
    tiny2d.ForceField = ForceField;
})(tiny2d || (tiny2d = {}));
var tiny2d;
(function (tiny2d) {
    /**
     * 力
     */
    var Force = /** @class */ (function (_super) {
        __extends(Force, _super);
        function Force() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.v = new tiny2d.Vector();
            return _this;
        }
        Force.prototype.init = function (r, d) {
            this.v.init(tiny2d.Utils.cos(r), tiny2d.Utils.sin(r), d);
        };
        return Force;
    }(ecs.Component));
    tiny2d.Force = Force;
})(tiny2d || (tiny2d = {}));
var tiny2d;
(function (tiny2d) {
    /**
     * 定点力
     */
    var PointForce = /** @class */ (function (_super) {
        __extends(PointForce, _super);
        function PointForce() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PointForce.prototype.init = function (r, d, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            _super.prototype.init.call(this, r, d);
            this.x = x;
            this.y = y;
        };
        return PointForce;
    }(tiny2d.Force));
    tiny2d.PointForce = PointForce;
})(tiny2d || (tiny2d = {}));
var tiny2d;
(function (tiny2d) {
    var Tiny2dSystem = /** @class */ (function (_super) {
        __extends(Tiny2dSystem, _super);
        function Tiny2dSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Tiny2dSystem.recycleEnable = false;
        return Tiny2dSystem;
    }(ecs.EntitySystem));
    tiny2d.Tiny2dSystem = Tiny2dSystem;
})(tiny2d || (tiny2d = {}));
var tiny2d;
(function (tiny2d) {
    var ForceSystem = /** @class */ (function (_super) {
        __extends(ForceSystem, _super);
        function ForceSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ForceSystem.prototype.update = function (dt) {
            var e_1, _a;
            dt *= 0.001;
            for (var node = this.query.head; node; node = node.next) {
                var object = node.value.getComponent(tiny2d.RigidBody);
                var forces = node.value.getComponents(tiny2d.Force);
                //计算运动合力
                var fx = 0;
                var fy = 0;
                try {
                    for (var forces_1 = __values(forces), forces_1_1 = forces_1.next(); !forces_1_1.done; forces_1_1 = forces_1.next()) {
                        var f = forces_1_1.value;
                        fx += f.v.dx;
                        fy += f.v.dy;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (forces_1_1 && !forces_1_1.done && (_a = forces_1.return)) _a.call(forces_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (fx !== 0) {
                    object.vx += fx * dt / object.m;
                }
                if (fy !== 0) {
                    object.vy += fy * dt / object.m;
                }
            }
        };
        return ForceSystem;
    }(tiny2d.Tiny2dSystem));
    tiny2d.ForceSystem = ForceSystem;
})(tiny2d || (tiny2d = {}));
var tiny2d;
(function (tiny2d) {
    var MoveSystem = /** @class */ (function (_super) {
        __extends(MoveSystem, _super);
        function MoveSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MoveSystem.prototype.update = function (dt) {
            dt *= 0.001;
            for (var node = this.query.head; node; node = node.next) {
                var object = node.value.getComponent(tiny2d.RigidBody);
                if (object.vx !== 0) {
                    object.transform.x += object.vx * dt;
                }
                if (object.vy !== 0) {
                    object.transform.y += object.vy * dt;
                }
            }
        };
        return MoveSystem;
    }(tiny2d.Tiny2dSystem));
    tiny2d.MoveSystem = MoveSystem;
})(tiny2d || (tiny2d = {}));
var tiny2d;
(function (tiny2d) {
    var RigidBody = /** @class */ (function (_super) {
        __extends(RigidBody, _super);
        function RigidBody() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RigidBody.prototype.init = function (m) {
            if (m === void 0) { m = 1; }
            this.m = m;
            this.vx = 0;
            this.vy = 0;
            this.w = 0;
        };
        return RigidBody;
    }(ecs.Component));
    tiny2d.RigidBody = RigidBody;
})(tiny2d || (tiny2d = {}));
var tiny2d;
(function (tiny2d) {
    var Box = /** @class */ (function (_super) {
        __extends(Box, _super);
        function Box() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Box;
    }(tiny2d.RigidBody));
    tiny2d.Box = Box;
})(tiny2d || (tiny2d = {}));
//# sourceMappingURL=tiny2d.js.map