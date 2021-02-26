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
function testComponent() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test.Case.create("Component").
                        add(function () {
                        Position.type.newCount = 0;
                        Position.type.realNewCount = 0;
                        Velocity.type.newCount = 0;
                        Velocity.type.realNewCount = 0;
                        UpdateComponent.type.newCount = 0;
                        UpdateComponent.type.realNewCount = 0;
                        LateUpdateComponent.type.newCount = 0;
                        LateUpdateComponent.type.realNewCount = 0;
                        ecs.setComponentRecyclePool(new ecs.ObjectPools());
                        var entity = ecs.Entity.create();
                        entity.addComponent(Position);
                        entity.addComponent(Velocity, 100, 200);
                        entity.addComponent(UpdateComponent);
                        entity.addComponent(LateUpdateComponent);
                        entity.destroy();
                        entity = ecs.Entity.create();
                        entity.addComponent(Position);
                        entity.addComponent(Velocity, 100, 200);
                        entity.addComponent(UpdateComponent);
                        entity.addComponent(LateUpdateComponent);
                        Position.type.newCount.equal(2);
                        Position.type.realNewCount.equal(1);
                        Velocity.type.newCount.equal(2);
                        Velocity.type.realNewCount.equal(1);
                        UpdateComponent.type.newCount.equal(2);
                        UpdateComponent.type.realNewCount.equal(1);
                        LateUpdateComponent.type.newCount.equal(2);
                        LateUpdateComponent.type.realNewCount.equal(1);
                        ecs.setComponentRecyclePool(null);
                    }, "ComponentCycle")
                        .run()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var Position = /** @class */ (function (_super) {
    __extends(Position, _super);
    function Position() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Position.prototype.init = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    };
    return Position;
}(ecs.Component));
var Velocity = /** @class */ (function (_super) {
    __extends(Velocity, _super);
    function Velocity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Velocity.prototype.init = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    };
    return Velocity;
}(ecs.Component));
var UpdateComponent = /** @class */ (function (_super) {
    __extends(UpdateComponent, _super);
    function UpdateComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.time = 0;
        return _this;
    }
    UpdateComponent.prototype.update = function (dt) {
        this.time += dt;
    };
    return UpdateComponent;
}(ecs.Component));
var LateUpdateComponent = /** @class */ (function (_super) {
    __extends(LateUpdateComponent, _super);
    function LateUpdateComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.time = 0;
        return _this;
    }
    LateUpdateComponent.prototype.lateUpdate = function (dt) {
        this.time += dt;
    };
    return LateUpdateComponent;
}(ecs.Component));
function testEntity() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test.Case.create("Entity").
                        add(function () {
                        var entity = ecs.Entity.create();
                        entity.id.equal(1);
                    }).
                        add(function () {
                        var entity = ecs.Entity.create();
                        entity.isAlive.equal(true);
                        entity.destroy();
                        entity.isAlive.equal(false);
                    }, "isAlive").
                        run()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function runTest() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testEntity()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, testSystem()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, testComponent()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function testRunTime() {
    // ecs.debug = true;
    var world = new ecs.World();
    var scene = new ecs.Scene();
    world.scene = scene;
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new ecs.UpdateSystem());
    world.addSystem(new ecs.LateUpdateSystem());
    ecs.setComponentRecyclePool(new ecs.ObjectPools());
    var len = 1000;
    var dt = 0;
    var frame = 0;
    var lastTime = Date.now();
    for (var i = 0; i < len; i++) {
        var entity = ecs.Entity.create();
        entity.addComponent(Position);
        entity.addComponent(Velocity, 100, 200);
        entity.addComponent(UpdateComponent);
        entity.addComponent(LateUpdateComponent);
        entity.parent = scene;
    }
    len = 1000;
    var f = function () {
        var s = Date.now();
        for (var i = 0; i < len; i++) {
            var entity = ecs.Entity.create();
            entity.addComponent(Position);
            entity.addComponent(Velocity, 100, 200);
            entity.addComponent(UpdateComponent);
            entity.addComponent(LateUpdateComponent);
            entity.parent = scene;
        }
        world.update();
        for (var node = scene.children.head, i = 0; node && i < len; node = node.next, i++) {
            node.value.destroy();
        }
        ecs.ObjectPools.clearLinkPrePool();
        var t = Date.now();
        var gap = t - s;
        dt += gap;
        frame++;
        if (t - lastTime > 1000) {
            console.log("fps:" + (~~(10 * frame * 1000 / (t - lastTime))) / 10 + " dt:" + (~~(dt * 10 / frame)) / 10);
            frame = 0;
            lastTime = t;
            dt = 0;
        }
        requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
}
setTimeout(function () {
    runTest();
    // testRunTime();
});
function testSystem() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test.Case.create("System").
                        add(function () {
                        var world = new ecs.World();
                        var scene = new ecs.Scene();
                        world.scene = scene;
                        world.addSystem(new PhysicSystem());
                        world.addSystem(new ecs.UpdateSystem());
                        world.addSystem(new ecs.LateUpdateSystem());
                        var entity = ecs.Entity.create();
                        entity.parent = scene;
                        entity.addComponent(Position);
                        entity.addComponent(Velocity, 100, 200);
                        entity.addComponent(UpdateComponent);
                        entity.addComponent(LateUpdateComponent);
                        world.update(0.016);
                        entity.getComponent(UpdateComponent).time.equal(0.016);
                        entity.getComponent(LateUpdateComponent).time.equal(0.016);
                        entity.getComponent(Position).x.equal(1.6);
                        entity.getComponent(Position).y.equal(3.2);
                        entity.removeComponent(Velocity);
                        world.update(0.016);
                        entity.getComponent(UpdateComponent).time.equal(0.032);
                        entity.getComponent(LateUpdateComponent).time.equal(0.032);
                        entity.getComponent(Position).x.equal(1.6);
                        entity.getComponent(Position).y.equal(3.2);
                    }).
                        add(function () {
                        var world = new ecs.World();
                        var scene = new ecs.Scene();
                        world.scene = scene;
                        world.addSystem(new PhysicSystem());
                        world.addSystem(new ecs.UpdateSystem());
                        world.addSystem(new ecs.LateUpdateSystem());
                        var entity = ecs.Entity.create();
                        entity.addComponent(Position);
                        entity.addComponent(Velocity, 100, 200);
                        entity.addComponent(UpdateComponent);
                        entity.addComponent(LateUpdateComponent);
                        entity.parent = scene;
                        world.update(0.016);
                        entity.getComponent(UpdateComponent).time.equal(0.016);
                        entity.getComponent(LateUpdateComponent).time.equal(0.016);
                        entity.getComponent(Position).x.equal(1.6);
                        entity.getComponent(Position).y.equal(3.2);
                        entity.removeComponent(Velocity);
                        world.update(0.016);
                        entity.getComponent(UpdateComponent).time.equal(0.032);
                        entity.getComponent(LateUpdateComponent).time.equal(0.032);
                        entity.getComponent(Position).x.equal(1.6);
                        entity.getComponent(Position).y.equal(3.2);
                    }).
                        add(function () {
                        var world = new ecs.World();
                        var scene = new ecs.Scene();
                        world.scene = scene;
                        world.addSystem(new PhysicSystem());
                        world.addSystem(new ecs.UpdateSystem());
                        world.addSystem(new ecs.LateUpdateSystem());
                        var entity = ecs.Entity.create();
                        entity.addComponent(Position);
                        entity.addComponent(Velocity, 100, 200);
                        entity.addComponent(UpdateComponent);
                        entity.addComponent(LateUpdateComponent);
                        world.update(0.016);
                        entity.getComponent(UpdateComponent).time.equal(0);
                        entity.getComponent(LateUpdateComponent).time.equal(0);
                        entity.getComponent(Position).x.equal(0);
                        entity.getComponent(Position).y.equal(0);
                        entity.parent = scene;
                        world.update(0.016);
                        entity.getComponent(UpdateComponent).time.equal(0.016);
                        entity.getComponent(LateUpdateComponent).time.equal(0.016);
                        entity.getComponent(Position).x.equal(1.6);
                        entity.getComponent(Position).y.equal(3.2);
                    }).
                        run()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var PhysicSystem = /** @class */ (function (_super) {
    __extends(PhysicSystem, _super);
    function PhysicSystem() {
        return _super.call(this, [Position, Velocity]) || this;
    }
    PhysicSystem.prototype.update = function (dt) {
        for (var node = this.query.head; node; node = node.next) {
            var p = node.value.getComponent(Position);
            var v = node.value.getComponent(Velocity);
            p.x += v.x * dt;
            p.y += v.y * dt;
        }
    };
    return PhysicSystem;
}(ecs.EntitySystem));
//# sourceMappingURL=test.js.map