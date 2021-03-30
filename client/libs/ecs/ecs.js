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
var ecs;
(function (ecs) {
    var Link = /** @class */ (function () {
        function Link() {
            this.head = null;
            this.tail = null;
            this.length = 0;
            this.nodes = {};
        }
        Link.prototype.add = function (item) {
            if (Link.debugPoints && Link.addPoints.length) {
                for (var node_1 = Link.addPoints.head; node_1; node_1 = node_1.next) {
                    if (node_1.value.id == item.id) {
                        node_1.value.call && node_1.value.call();
                        Link.addPoints.remove(node_1.value);
                    }
                }
            }
            Link.addCount++;
            var key = item.id;
            if (this.nodes[key] !== undefined) {
                return;
            }
            var node = ecs.ObjectPools.linkPool.length ? ecs.ObjectPools.linkPool.pop() : new Node();
            node.key = key;
            node.value = item;
            if (this.head === null) {
                this.head = node;
                this.tail = node;
            }
            else {
                node.prev = this.tail;
                this.tail._next = node;
                this.tail = node;
            }
            this.length++;
            this.nodes[key] = node;
            return item;
        };
        Link.prototype.remove = function (item) {
            if (Link.debugPoints && Link.removePoints.length) {
                for (var node_2 = Link.removePoints.head; node_2; node_2 = node_2.next) {
                    if (node_2.value.id == item.id) {
                        node_2.value.call && node_2.value.call();
                        Link.removePoints.remove(node_2.value);
                    }
                }
            }
            var key = item.id;
            Link.removeCount++;
            var node = this.nodes[key];
            if (node === undefined)
                return;
            if (node == this.head) {
                this.head = node._next;
            }
            else {
                node.prev._next = node._next;
            }
            if (node == this.tail) {
                this.tail = node.prev;
            }
            else {
                node._next.prev = node.prev;
            }
            this.length--;
            delete this.nodes[key];
            var value = node.value;
            node.value = null;
            // node.prev = node.next = null;
            ecs.ObjectPools.linkPrePool.push(node);
            return value;
        };
        Object.defineProperty(Link.prototype, "toArray", {
            get: function () {
                var list = [];
                for (var node = this.head; node; node = node.next) {
                    list.push(node.value);
                }
                return list;
            },
            enumerable: true,
            configurable: true
        });
        Link.prototype.hasId = function (key) {
            return this.nodes[key] !== undefined;
        };
        Link.prototype.has = function (item) {
            return this.nodes[item.id] !== undefined;
        };
        Link.prototype.get = function (item) {
            if (this.nodes[item.id] === undefined)
                return;
            return this.nodes[item.id].value;
        };
        Link.prototype.getById = function (id) {
            if (this.nodes[id] === undefined)
                return;
            return this.nodes[id].value;
        };
        Link.prototype.clear = function (releaseValue) {
            if (releaseValue === void 0) { releaseValue = false; }
            if (this.length == 0)
                return;
            for (var node = this.head, next = null; node;) {
                if (releaseValue && node.value) {
                    ecs.ObjectPools.releaseRecyableObject(node.value);
                }
                next = node._next;
                node.value = null;
                ecs.ObjectPools.linkPrePool.push(node);
                node = next;
                Link.removeCount++;
            }
            this.nodes = {};
            this.length = 0;
            this.head = this.tail = null;
        };
        Link.addCount = 0;
        Link.removeCount = 0;
        /**
         * @internal
         */
        Link.addPoints = new Link();
        /**
         * @internal
         */
        Link.removePoints = new Link();
        /**
         * @internal
         */
        Link.debugPoints = false;
        return Link;
    }());
    ecs.Link = Link;
    var Node = /** @class */ (function () {
        function Node() {
            this.prev = null;
            this.value = null;
            /**
             * @internal
             */
            this._next = null;
        }
        Object.defineProperty(Node.prototype, "next", {
            get: function () {
                var val = this._next;
                if (!val || val.value)
                    return val;
                while (val && !val.value) {
                    val = val._next;
                }
                return val;
            },
            enumerable: true,
            configurable: true
        });
        return Node;
    }());
    ecs.Node = Node;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var Broadcast = /** @class */ (function () {
        function Broadcast() {
            /**
             * @internal
             */
            this.bindings = [];
        }
        Broadcast.prototype.on = function (listener, listenerContext) {
            var binding = new ListenerBinding(listener, listenerContext, false, this);
            this.bindings.push(binding);
            return binding;
        };
        Broadcast.prototype.once = function (listener, listenerContext) {
            var binding = new ListenerBinding(listener, listenerContext, true, this);
            this.bindings.push(binding);
            return binding;
        };
        Broadcast.prototype.dispatch = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var e_1, _a;
            var flag = false;
            try {
                for (var _b = __values(this.bindings), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (!item.hasDestroyed) {
                        item.execute.apply(item, params);
                    }
                    else {
                        flag = true;
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
            if (flag) {
                for (var i = 0; i < this.bindings.length; i++) {
                    if (this.bindings[i].hasDestroyed) {
                        this.bindings.splice(i, 1);
                        i--;
                    }
                }
            }
        };
        Broadcast.prototype.get = function (listener, listenerContext) {
            var e_2, _a;
            try {
                for (var _b = __values(this.bindings), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (item.listener == listener && item.listenerContext == listenerContext && !item.hasDestroyed)
                        return item;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return null;
        };
        Broadcast.prototype.has = function (listener, listenerContext) {
            var e_3, _a;
            try {
                for (var _b = __values(this.bindings), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (item.listener == listener && item.listenerContext == listenerContext && !item.hasDestroyed)
                        return true;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return false;
        };
        Broadcast.prototype.remove = function (listener, listenerContext) {
            var e_4, _a;
            try {
                for (var _b = __values(this.bindings), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (item.listener == listener && item.listenerContext == listenerContext && !item.hasDestroyed) {
                        return item.destroy();
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
        };
        Broadcast.prototype.removeAll = function () {
            while (this.bindings.length) {
                this.bindings.pop().destroy();
            }
        };
        return Broadcast;
    }());
    ecs.Broadcast = Broadcast;
    var ListenerBinding = /** @class */ (function () {
        function ListenerBinding(listener, listenerContext, once, boradcast) {
            var _this = this;
            this.destroySelf = function () {
                _this.destroy();
            };
            this.listener = listener;
            this.listenerContext = listenerContext;
            this.once = once;
            this.broadcast = boradcast;
            this.hasDestroyed = false;
        }
        ListenerBinding.prototype.execute = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            if (!this.hasDestroyed) {
                var result = this.listener.apply(this.listenerContext, params);
                if (this.once) {
                    this.destroy();
                }
                return result;
            }
            return null;
        };
        ListenerBinding.prototype.destroy = function () {
            this.listener = null;
            this.listenerContext = null;
            this.once = null;
            this.broadcast = null;
            this.hasDestroyed = true;
        };
        return ListenerBinding;
    }());
    ecs.ListenerBinding = ListenerBinding;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    /**
     * @internal
     */
    ecs.$newComponent = false;
    var Component = /** @class */ (function () {
        function Component() {
            this.id = ecs.ObjectPools.setId(this, true);
            this.syncProperties = new ecs.Link();
            /**
             * @internal
             */
            this._enabled = true;
            /**
             * 第几代，每重用一次加 1
             */
            this.lifeCount = 0;
            /**
             * 在整个世界中是否有效，依赖自身和 requireComponents 的 enable 属性
             */
            this.enableInWorld = true;
            ecs.$newComponent = true;
        }
        Object.defineProperty(Component.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            set: function (val) {
                if (this._enabled === val)
                    return;
                this._enabled = val;
                this.checkEnableInWorld();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @internal
         */
        Component.prototype.checkEnableInWorld = function () {
            var enableInWorld = this.enableInWorld;
            if (!this._enabled) {
                this.enableInWorld = false;
                if (enableInWorld === true) {
                    this.changeEnableInWorld();
                }
            }
            else {
                var classType = this.classType;
                this.enableInWorld = true;
                for (var i = 0; i < classType.requireComponents.length; i++) {
                    if (!this.entity.componentEnableCount[classType.requireComponents[i].id]) {
                        this.enableInWorld = false;
                        break;
                    }
                }
                if (enableInWorld !== this.enableInWorld) {
                    this.changeEnableInWorld();
                }
            }
        };
        /**
         * @internal
         */
        Component.prototype.changeEnableInWorld = function () {
            var classType = this.classType;
            if (this.enableInWorld) {
                for (var i = 0; i < classType.types.length; i++) {
                    var clazz = classType.types[i];
                    this.entity.componentEnableCount[clazz.id]++;
                    if (this.entity.componentEnableCount[clazz.id] === 1) {
                        if (this.entity.componentsRequire[clazz.id]) {
                            var list = this.entity.componentsRequire[clazz.id];
                            for (var i_1 = 0; i_1 < list.length; i_1++) {
                                list[i_1].checkEnableInWorld();
                            }
                        }
                    }
                }
                this.world && this.world.onAddComponent(this.entity, this);
            }
            else {
                for (var i = 0; i < classType.types.length; i++) {
                    var clazz = classType.types[i];
                    this.entity.componentEnableCount[clazz.id]--;
                    if (this.entity.componentEnableCount[clazz.id] < 0) {
                        ecs.debug && ecs.error(ecs.EMError.COMPONENT_REQUIRE_COUNT);
                    }
                    if (this.entity.componentEnableCount[clazz.id] === 0) {
                        if (this.entity.componentsRequire[clazz.id]) {
                            var list = this.entity.componentsRequire[clazz.id];
                            for (var i_2 = 0; i_2 < list.length; i_2++) {
                                list[i_2].checkEnableInWorld();
                            }
                        }
                    }
                }
                this.world && this.world.onRemoveComponent(this.entity, this);
            }
        };
        Component.prototype.addComponent = function (componentClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return this.entity ? this.entity.addComponent.apply(this.entity, arguments) : null;
        };
        Component.prototype.removeComponent = function (componentClass) {
            return this.entity ? this.entity.removeComponent(componentClass) : null;
        };
        Component.prototype.removeComponents = function (componentClass) {
            this.entity && this.entity.removeComponents(componentClass);
        };
        Component.prototype.getComponent = function (componentClass) {
            return this.entity ? this.entity.getComponent(componentClass) : null;
        };
        Component.prototype.getComponents = function (componentClass) {
            return this.entity ? this.entity.getComponents(componentClass) : null;
        };
        Component.prototype.getComponentsInParent = function (componentClass) {
            return this.entity ? this.entity.getComponentsInParent(componentClass) : null;
        };
        Component.prototype.getComponentsInChildren = function (componentClass) {
            return this.entity ? this.entity.getComponentsInChildren(componentClass) : null;
        };
        Object.defineProperty(Component.prototype, "transform", {
            get: function () {
                return this.entity && this.entity.transform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "world", {
            get: function () {
                return this.entity && this.entity.world;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "parent", {
            get: function () {
                return this.entity && this.entity.parent;
            },
            set: function (val) {
                if (this.entity) {
                    this.entity.parent = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Component.prototype.dispatch = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.entity.dispatch.apply(this.entity, arguments);
        };
        Component.prototype.getChildByName = function (name) {
            if (!this.entity)
                return null;
            return this.entity.getChildByName(name);
        };
        Component.prototype.getChildByPath = function (name) {
            if (!this.entity)
                return null;
            return this.entity.getChildByPath(name);
        };
        /**
         * 不应该覆盖的方法
         */
        Component.prototype.destroy = function () {
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.COMPONENT_HAS_DESTROYED, this);
                return;
            }
            this.entity && this.entity.removeComponent(this, true);
        };
        /**
         * @internal
         * @param world
         * @param componentClass
         */
        Component.register = function (componentClass) {
            var e_5, _a, e_6, _b;
            if (componentClass.classType && componentClass.classType.define === componentClass || componentClass == Component)
                return;
            var type = new ComponentType();
            componentClass.classType = type;
            ecs.ObjectPools.setId(type);
            type.define = componentClass;
            componentClass.id = type.id;
            type.name = componentClass.name;
            type.newCount = 0;
            type.realNewCount = 0;
            type.allowMultiply = componentClass.allowMultiply;
            type.typeMap = {};
            ecs.ObjectPools.componentClasses.push(type.define);
            type.requireComponents = [];
            try {
                for (var _c = __values(componentClass.requireComponents), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var requireComponentClass = _d.value;
                    this.register(requireComponentClass);
                    !~type.requireComponents.indexOf(requireComponentClass.classType) && type.requireComponents.push(requireComponentClass.classType);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            this.componentClasses[type.id] = componentClass;
            type.types = [type];
            type.typeMap[type.id] = type;
            var parent;
            if (!componentClass["__proto__"].virtualComponent) {
                this.register(componentClass["__proto__"]);
                parent = componentClass["__proto__"];
            }
            while (parent && parent != Component) {
                if (parent.virtualComponent)
                    break;
                try {
                    for (var _e = __values(parent.classType.requireComponents), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var requireComponentClass = _f.value;
                        !~type.requireComponents.indexOf(requireComponentClass) && type.requireComponents.push(requireComponentClass);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                type.types.push(parent.classType);
                type.typeMap[parent.classType.id] = parent.classType;
                parent = parent["__proto__"];
            }
            type.recycleEnable = componentClass.recycleEnable;
            if (componentClass["__proto__"] && !componentClass["__proto__"].virtualComponent) {
                type.recycleEnable = componentClass.recycleEnable && componentClass["__proto__"].recycleEnable;
            }
            this.onRegister.dispatch(type);
        };
        Component.componentDestroyedPoints = new ecs.Link();
        /**
         * @internal
         */
        Component.onRegister = new ecs.Broadcast();
        /**
         * @internal
         */
        Component.componentClasses = [];
        Component.aliveCount = 0;
        Component.newCount = 0;
        Component.realNewCount = 0;
        Component.allowMultiply = true;
        Component.requireComponents = [];
        Component.recycleEnable = false;
        Component.virtualComponent = false;
        Component.syncComponents = {};
        return Component;
    }());
    ecs.Component = Component;
    var EMSyncType;
    (function (EMSyncType) {
        EMSyncType[EMSyncType["BASE"] = 0] = "BASE";
        EMSyncType[EMSyncType["COMPONENT"] = 1] = "COMPONENT";
        // ARRAY_COMPONENT
    })(EMSyncType = ecs.EMSyncType || (ecs.EMSyncType = {}));
    function sync(writable, type) {
        if (writable === void 0) { writable = true; }
        if (type === void 0) { type = EMSyncType.BASE; }
        return function (target, key, descriptor) {
            var name = target.constructor.name;
            if (!Component.syncComponents[name]) {
                Component.syncComponents[name] = target.constructor;
            }
            else if (Component.syncComponents[name] != target.constructor) {
                Component.syncComponents[name] = target.constructor;
                ecs.debug && ecs.error(ecs.EMError.SYNC_COMPONENT_SAME_NAME, name);
            }
            if (descriptor) {
                var set_1 = descriptor.set;
                descriptor.set = function (val) {
                    var p;
                    if (!this.syncProperties.hasId(key)) {
                        if (SyncProperty.pools.length) {
                            p = SyncProperty.pools.pop();
                        }
                        else {
                            p = new SyncProperty();
                        }
                        p.id = key;
                        p.writable = ecs.World.subWorld ? !writable : writable;
                        p.type = type;
                        p.target = this;
                        p.hasChange = false;
                        p.value = null;
                        p.reValue = false;
                        this.syncProperties.add(p);
                    }
                    else {
                        p = this.syncProperties.getById(key);
                    }
                    if (p.type === EMSyncType.COMPONENT) {
                        if (val && typeof val !== 'number') {
                            val = val.id;
                        }
                        if (ecs.World.isSyncing && ecs.World.subWorld) {
                            p.reValue = true;
                        }
                    }
                    //  else if (p.type === EMSyncType.ARRAY_COMPONENT && val.length) {
                    //     if (val && typeof val[0] !== 'number') {
                    //         for (let i = 0; i < val.length; i++) {
                    //             val[i] = val[i].id;
                    //         }
                    //     }
                    //     if (World.isSyncing && World.subWorld) {
                    //         p.reValue = true;
                    //     }
                    // }
                    if (p.value === val)
                        return;
                    p.value = val;
                    set_1.call(this, val);
                    p.hasChange = p.writable ? true : false;
                    if (this.world && !this.world.syncComponents.has(this)) {
                        this.world.syncComponents.add(this);
                    }
                };
            }
            else {
                Object.defineProperty(target, key, {
                    set: function (val) {
                        var p;
                        if (!this.syncProperties.hasId(key)) {
                            if (SyncProperty.pools.length) {
                                p = SyncProperty.pools.pop();
                            }
                            else {
                                p = new SyncProperty();
                            }
                            p.id = key;
                            p.writable = ecs.World.subWorld ? !writable : writable;
                            p.type = type;
                            p.target = this;
                            p.hasChange = false;
                            p.value = null;
                            // if (p.type === EMSyncType.ARRAY_COMPONENT) {
                            //     p.value = new SyncArray();
                            //     p.value.prop = p;
                            // }
                            p.reValue = false;
                            this.syncProperties.add(p);
                        }
                        else {
                            p = this.syncProperties.getById(key);
                        }
                        if (p.type === EMSyncType.COMPONENT) {
                            if (val && typeof val !== 'number') {
                                val = val.id;
                            }
                            if (ecs.World.isSyncing && ecs.World.subWorld) {
                                p.reValue = true;
                            }
                        }
                        // else if (p.type === EMSyncType.ARRAY_COMPONENT && val.length) {
                        //     if (val && typeof val[0] !== 'number') {
                        //         p.value.length = val.length;
                        //         for (let i = 0; i < val.length; i++) {
                        //             p.value[i] = val[i].id;
                        //         }
                        //     }
                        //     if (World.isSyncing && World.subWorld) {
                        //         p.reValue = true;
                        //     }
                        // }
                        if (p.value === val)
                            return;
                        p.value = val;
                        p.hasChange = p.writable ? true : false;
                        if (this.world && !this.world.syncComponents.has(this)) {
                            this.world.syncComponents.add(this);
                        }
                    },
                    get: function () {
                        var p;
                        if (!this.syncProperties.hasId(key)) {
                            return;
                        }
                        else {
                            p = this.syncProperties.getById(key);
                        }
                        if (p.type === EMSyncType.COMPONENT) {
                            if (p.reValue)
                                return ecs.ObjectPools.all[ecs.World.syncIds[p.value]];
                            return ecs.ObjectPools.all[p.value];
                        }
                        // else if (p.type === EMSyncType.ARRAY_COMPONENT) {
                        // }
                        return p.value;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        };
    }
    ecs.sync = sync;
    var SyncProperty = /** @class */ (function () {
        function SyncProperty() {
        }
        SyncProperty.id = 0;
        SyncProperty.pools = [];
        return SyncProperty;
    }());
    ecs.SyncProperty = SyncProperty;
    var SyncArray = /** @class */ (function (_super) {
        __extends(SyncArray, _super);
        function SyncArray() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._length = 0;
            return _this;
        }
        Object.defineProperty(SyncArray.prototype, "length", {
            get: function () {
                return this._length;
            },
            set: function (val) {
                if (val === this._length)
                    return;
                if (val < 0)
                    val = 0;
                if (val < this._length) {
                    this.splice(val, this._length - val);
                    this._length = val;
                }
                else {
                    this._length = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
          * Removes the last element from an array and returns it.
          */
        SyncArray.prototype.pop = function () {
            this.prop.hasChange = true;
            if (this._length > 0)
                this._length--;
            return _super.prototype.pop.apply(this);
        };
        /**
          * Appends new elements to an array, and returns the new length of the array.
          * @param items New elements of the Array.
          */
        SyncArray.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            this.prop.hasChange = true;
            this._length += items.length;
            return _super.prototype.push.apply(this, arguments);
        };
        /**
          * Removes the first element from an array and returns it.
          */
        SyncArray.prototype.shift = function () {
            this.prop.hasChange = true;
            if (this._length > 0)
                this._length--;
            return _super.prototype.shift.apply(this);
        };
        /**
          * Sorts an array.
          * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
          */
        SyncArray.prototype.sort = function (compareFn) {
            this.prop.hasChange = true;
            return _super.prototype.sort.apply(this, arguments);
        };
        /**
          * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
          * @param start The zero-based location in the array from which to start removing elements.
          * @param deleteCount The number of elements to remove.
          */
        SyncArray.prototype.splice = function (start, deleteCount) {
            var items = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                items[_i - 2] = arguments[_i];
            }
            this.prop.hasChange = true;
            if (deleteCount > 0) {
                this._length -= Math.min(deleteCount, this._length - start);
            }
            else {
                this._length += items.length;
            }
            return _super.prototype.splice.apply(this, arguments);
        };
        /**
          * Inserts new elements at the start of an array.
          * @param items  Elements to insert at the start of the Array.
          */
        SyncArray.prototype.unshift = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            this.prop.hasChange = true;
            this._length += items.length;
            return _super.prototype.unshift.apply(this, arguments);
        };
        return SyncArray;
    }(Array));
    var ComponentType = /** @class */ (function () {
        function ComponentType() {
        }
        return ComponentType;
    }());
    ecs.ComponentType = ComponentType;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var Entity = /** @class */ (function (_super) {
        __extends(Entity, _super);
        function Entity() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 以 ComponentTypeId 为 key
             */
            _this.components = [];
            /**
             * @internal
             */
            _this.componentTypes = [];
            /**
             * @internal
             */
            _this.componentEnableCount = [];
            /**
             * @internal
             */
            _this.componentsRequire = [];
            _this.children = [];
            // _world: World;
            // get world(): World { return this._world; }
            // set world(val: World) {
            //     this._world = val;
            // }
            _this.isAlive = true;
            _this.transform = new ecs.Transform(_this);
            _this.type = 0;
            _this.parentChangeCount = 0;
            return _this;
        }
        Entity.prototype.addComponent = function (componentClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            var classType;
            var component;
            var createComponent = false;
            if (!componentClass.classType || componentClass.id === componentClass.classType.id) {
                ecs.Component.register(componentClass);
                classType = componentClass.classType;
                for (var i = 0; i < classType.requireComponents.length; i++) {
                    if (!this.componentTypes[classType.requireComponents[i].id] || !this.componentTypes[classType.requireComponents[i].id].length) {
                        ecs.debug && ecs.error(ecs.EMError.COMPONENT_REQUIRE, componentClass.classType.name, classType.requireComponents[i].name);
                        return;
                    }
                }
                if (!classType.allowMultiply && this.componentTypes[componentClass.classType.id] &&
                    this.componentTypes[componentClass.classType.id].length) {
                    ecs.debug && ecs.error(ecs.EMError.NOT_ALLOW_MUTIPLY_COMPONENT, componentClass.classType.name);
                    return;
                }
                ecs.$newComponent = false;
                component = ecs.$componentRecyclePool && ecs.$componentRecyclePool.createComponent(componentClass) || new componentClass();
                if (ecs.$newComponent) {
                    componentClass.classType.realNewCount++;
                    ecs.Component.realNewCount++;
                }
                createComponent = true;
            }
            else {
                classType = componentClass.classType;
                if (!classType.allowMultiply && this.componentTypes[componentClass.classType.id] &&
                    this.componentTypes[componentClass.classType.id].length) {
                    ecs.debug && ecs.error(ecs.EMError.NOT_ALLOW_MUTIPLY_COMPONENT, componentClass.classType.name);
                    return;
                }
                component = componentClass;
            }
            component.isAlive = true;
            classType.newCount++;
            ecs.Component.newCount++;
            ecs.Component.aliveCount++;
            component.classType = classType;
            this.components.push(component);
            for (var i = 0; i < classType.types.length; i++) {
                var id_1 = classType.types[i].id;
                if (!this.componentTypes[id_1]) {
                    this.componentTypes[id_1] = [];
                    this.componentEnableCount[id_1] = 0;
                }
                this.componentTypes[classType.types[i].id].push(component);
                this.componentEnableCount[classType.types[i].id]++;
            }
            component.entity = this;
            component.checkEnableInWorld();
            if (classType.requireComponents.length) {
                var list = classType.requireComponents;
                for (var i = 0; i < list.length; i++) {
                    if (!this.componentsRequire[list[i].id]) {
                        this.componentsRequire[list[i].id] = [];
                    }
                    this.componentsRequire[list[i].id].push(component);
                }
            }
            var id = component.id;
            if (Entity.componentCreatedPoints.length) {
                for (var node = Entity.componentCreatedPoints.head; node; node = node.next) {
                    if (node.value.id === id) {
                        node.value.call && node.value.call();
                        Entity.componentCreatedPoints.remove(node.value);
                    }
                }
            }
            createComponent && component.init && component.init.apply(component, args);
            if (component.id != id || !component.isAlive)
                return;
            createComponent && component.afterInit && component.afterInit();
            if (component.id != id || !component.isAlive)
                return;
            this.world && this.world.onAddComponent(this, component);
            if (component.id != id || !component.isAlive)
                return;
            return component;
        };
        Entity.prototype.removeComponent = function (componentClass, atuoDestroy) {
            if (atuoDestroy === void 0) { atuoDestroy = true; }
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            var component;
            var componentIndex = -1;
            if (!componentClass.classType || componentClass.id === componentClass.classType.id) {
                ecs.Component.register(componentClass);
                if (!this.componentTypes[componentClass.id] || !this.componentTypes[componentClass.id].length)
                    return;
                component = this.componentTypes[componentClass.id][0];
                componentIndex = this.components.indexOf(component);
                if (componentIndex == -1) {
                    ecs.debug && ecs.error(ecs.EMError.COMPONENT_REMOVED_INDEX_ERROR, componentClass.classType.name);
                    return;
                }
            }
            else {
                component = componentClass;
                componentClass = component.constructor;
                componentIndex = this.components.indexOf(component);
                if (componentIndex == -1) {
                    ecs.debug && ecs.error(ecs.EMError.COMPONENT_REMOVED_INDEX_ERROR, componentClass.classType.name);
                    return;
                }
            }
            var classType = componentClass.classType;
            var types = classType.types;
            for (var i = 0; i < types.length; i++) {
                if (this.componentsRequire[types[i].id] && this.componentsRequire[types[i].id].length) {
                    if (this.componentTypes[types[i].id].length === 1) {
                        ecs.debug && ecs.error(ecs.EMError.COMPONENT_REQUIRE_DELETE, types[i].name);
                        return;
                    }
                }
            }
            var enable = component.enableInWorld;
            if (classType.requireComponents.length) {
                var list = classType.requireComponents;
                for (var i = 0; i < list.length; i++) {
                    var index = this.componentsRequire[list[i].id].indexOf(component);
                    if (index === -1) {
                        ecs.debug && ecs.error(ecs.EMError.COMPONENT_HAS_DESTROYED, this);
                    }
                    else {
                        this.componentsRequire[list[i].id].splice(index, 1);
                    }
                }
            }
            if (ecs.Component.componentDestroyedPoints.length) {
                for (var node = ecs.Component.componentDestroyedPoints.head; node; node = node.next) {
                    if (node.value.id === component.id) {
                        node.value.call && node.value.call();
                        ecs.Component.componentDestroyedPoints.remove(node.value);
                    }
                }
            }
            component.onDestroy && component.onDestroy();
            this.world && this.world.onRemoveComponent(this, component);
            component.entity = null;
            for (var i = 0; i < classType.types.length; i++) {
                var clazz = classType.types[i];
                var index = this.componentTypes[clazz.id].indexOf(component);
                if (index == this.componentTypes[clazz.id].length - 1)
                    this.componentTypes[clazz.id].pop();
                else if (index >= 0)
                    this.componentTypes[clazz.id].splice(index, 1);
                if (enable) {
                    this.componentEnableCount[clazz.id]--;
                    if (this.componentEnableCount[clazz.id] < 0) {
                        ecs.debug && ecs.error(ecs.EMError.COMPONENT_HAS_DESTROYED, this);
                    }
                    if (this.componentsRequire.length && this.componentEnableCount[clazz.id] <= 0) {
                        var list = this.componentsRequire[clazz.id];
                        if (list) {
                            for (var i_3 = 0; i_3 < list.length; i_3++) {
                                list[i_3].checkEnableInWorld();
                            }
                        }
                    }
                }
            }
            if (componentIndex === this.components.length - 1)
                this.components.pop();
            else
                this.components.splice(componentIndex, 1);
            if (atuoDestroy) {
                component.entity = null;
                component.isAlive = false;
                if (component.syncProperties.length) {
                    this.world.syncComponents.remove(component);
                    this.world.syncDeleteComponents.push(component.id);
                    for (var node = component.syncProperties.head; node; node = node.next) {
                        node.value.target = null;
                        ecs.SyncProperty.pools.push(node.value);
                    }
                    component.syncProperties.clear();
                }
                component._enabled = true;
                component.enableInWorld = true;
                component.lifeCount++;
                ecs.Component.aliveCount--;
                component.classType.recycleEnable && ecs.$componentRecyclePool && ecs.$componentRecyclePool.releaseComponent(component);
                ecs.ObjectPools.releaseId(component.id);
            }
            else {
                if (component.syncProperties.length) {
                    for (var node = component.syncProperties.head; node; node = node.next) {
                        node.value.hasChange = true;
                    }
                }
            }
            return atuoDestroy ? null : component;
        };
        Entity.prototype.removeComponents = function (componentClass, atuoDestroy) {
            if (atuoDestroy === void 0) { atuoDestroy = true; }
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            ecs.Component.register(componentClass);
            var components = this.componentTypes[componentClass.id];
            if (!components || !components.length)
                return;
            for (var i = 0; i < components.length; i++) {
                components[i].onDestroy && components[i].onDestroy();
            }
            while (components.length) {
                var component = components.pop();
                this.world && this.world.onRemoveComponent(this, component);
                var enable = component.enableInWorld;
                var classType = componentClass.classType;
                var types = classType.types;
                for (var i = 0; i < types.length; i++) {
                    if (this.componentsRequire[types[i].id] && this.componentsRequire[types[i].id].length) {
                        if (this.componentTypes[types[i].id].length === 1) {
                            ecs.debug && ecs.error(ecs.EMError.COMPONENT_REQUIRE_DELETE, types[i].name);
                            return;
                        }
                    }
                }
                if (classType.requireComponents.length) {
                    var list = classType.requireComponents;
                    for (var i = 0; i < list.length; i++) {
                        var index = this.componentsRequire[list[i].id].indexOf(component);
                        if (index === -1) {
                            ecs.debug && ecs.error(ecs.EMError.COMPONENT_HAS_DESTROYED, this);
                        }
                        else {
                            this.componentsRequire[list[i].id].splice(index, 1);
                        }
                    }
                }
                if (ecs.Component.componentDestroyedPoints.length) {
                    for (var node = ecs.Component.componentDestroyedPoints.head; node; node = node.next) {
                        if (node.value.id === component.id) {
                            node.value.call && node.value.call();
                            ecs.Component.componentDestroyedPoints.remove(node.value);
                        }
                    }
                }
                component.entity = null;
                for (var i = 0; i < classType.types.length; i++) {
                    var clazz = classType.types[i];
                    var index = this.componentTypes[clazz.id].indexOf(component);
                    if (index == this.componentTypes[clazz.id].length - 1)
                        this.componentTypes[clazz.id].pop();
                    else if (index >= 0)
                        this.componentTypes[clazz.id].splice(index, 1);
                    if (enable) {
                        this.componentEnableCount[clazz.id]--;
                        if (this.componentEnableCount[clazz.id] < 0) {
                            ecs.debug && ecs.error(ecs.EMError.COMPONENT_HAS_DESTROYED, this);
                        }
                        if (this.componentsRequire.length && this.componentEnableCount[clazz.id] <= 0) {
                            var list = this.componentsRequire[clazz.id];
                            if (list) {
                                for (var i_4 = 0; i_4 < list.length; i_4++) {
                                    list[i_4].checkEnableInWorld();
                                }
                            }
                        }
                    }
                }
                var componentIndex = this.components.indexOf(component);
                if (componentIndex === this.components.length - 1)
                    this.components.pop();
                else
                    this.components.splice(componentIndex, 1);
                if (atuoDestroy) {
                    component.entity = null;
                    component.isAlive = false;
                    if (component.syncProperties.length) {
                        this.world.syncComponents.remove(component);
                        this.world.syncDeleteComponents.push(component.id);
                        for (var node = component.syncProperties.head; node; node = node.next) {
                            node.value.target = null;
                            ecs.SyncProperty.pools.push(node.value);
                        }
                        component.syncProperties.clear();
                    }
                    component._enabled = true;
                    component.enableInWorld = true;
                    component.lifeCount++;
                    ecs.Component.aliveCount--;
                    component.classType.recycleEnable && ecs.$componentRecyclePool && ecs.$componentRecyclePool.releaseComponent(component);
                    ecs.ObjectPools.releaseId(component.id);
                }
            }
        };
        Entity.prototype.getComponent = function (componentClass) {
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (!componentClass.classType)
                return;
            return this.componentTypes[componentClass.classType.id] && this.componentTypes[componentClass.classType.id][0];
        };
        Entity.prototype.getComponents = function (componentClass) {
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (!componentClass.classType)
                return;
            return this.componentTypes[componentClass.classType.id];
        };
        Entity.prototype.getComponentsInParent = function (componentClass) {
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (!componentClass.classType)
                return;
            var list = [];
            var parent = this.parent;
            while (parent) {
                var arr = parent.componentTypes[componentClass.classType.id];
                if (arr) {
                    for (var c = 0; c < arr.length; c++) {
                        list.push(arr[c]);
                    }
                }
                parent = parent.parent;
            }
            return list;
        };
        Entity.prototype.getComponentsInChildren = function (componentClass) {
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (!componentClass.classType)
                return;
            return this.$getComponentsInChildren(componentClass, []);
        };
        /**
         * @internal
         */
        Entity.prototype.$getComponentsInChildren = function (componentClass, list) {
            for (var i = 0; i < this.children.length; i++) {
                var arr = this.children[i].componentTypes[componentClass.classType.id];
                if (arr) {
                    for (var c = 0; c < arr.length; c++) {
                        list.push(arr[c]);
                    }
                }
                this.children[i].$getComponentsInChildren(componentClass, list);
            }
            return list;
        };
        Entity.prototype.dispatch = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].receive && this.components[i].receive.apply(this.components[i], arguments);
            }
            _super.prototype.dispatch.apply(this, arguments);
        };
        Entity.prototype.destroy = function () {
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            //删除子对象
            while (this.children.length) {
                this.children[this.children.length - 1].destroy();
            }
            //调用 Component 的 onDestroy
            for (var i = this.components.length - 1; i >= 0;) {
                var component = this.components[i];
                component.onDestroy && component.onDestroy();
                this.world && this.world.onRemoveComponent(this, component);
                i--;
                if (i >= this.components.length - 1)
                    i = this.components.length - 2;
            }
            this._parent && this.$setParent(null);
            Entity.onDestroyEntity && Entity.onDestroyEntity(this);
            //删除 Component
            for (var i = this.components.length - 1; i >= 0; i--) {
                var component = this.components[i];
                if (ecs.Component.componentDestroyedPoints.length) {
                    for (var node = ecs.Component.componentDestroyedPoints.head; node; node = node.next) {
                        if (node.value.id === component.id) {
                            node.value.call && node.value.call();
                            ecs.Component.componentDestroyedPoints.remove(node.value);
                        }
                    }
                }
                component.entity = null;
                component.isAlive = false;
                component._enabled = true;
                component.enableInWorld = true;
                component.lifeCount++;
                ecs.Component.aliveCount--;
                component.classType.recycleEnable && ecs.$componentRecyclePool && ecs.$componentRecyclePool.releaseComponent(component);
                ecs.ObjectPools.releaseId(component.id);
                this.components.pop();
            }
            this.parentChangeCount = 0;
            ecs.ObjectPools.releaseId(this.id);
            this.componentTypes.length = 0;
            this.componentEnableCount.length = 0;
            this.componentsRequire.length = 0;
            this.removeAll();
            ecs.ObjectPools.entities.push(this);
            this.isAlive = false;
            this.transform.reset();
            Entity.aliveCount--;
        };
        Object.defineProperty(Entity.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (val) {
                if (!this.isAlive) {
                    ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                    return;
                }
                if (this._parent == val)
                    return;
                this.$setParent(val);
            },
            enumerable: true,
            configurable: true
        });
        Entity.prototype.addChild = function (entity) {
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (entity.parent == this) {
                //TODO
            }
            else {
                entity.$setParent(this);
            }
        };
        Entity.prototype.addChildAt = function (entity, index) {
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (entity.parent == this) {
                var ind = this.children.indexOf(entity);
                if (ind != index) {
                    this.children.splice(ind, 1);
                    this.children.splice(index, 0, entity);
                    Entity.onChangeEntityParent && Entity.onChangeEntityParent(this, index);
                }
            }
            else {
                entity.$setParent(this, index);
            }
        };
        Entity.prototype.sort = function (call) {
            this.children.sort(call);
            Entity.onSortEntityChildren && Entity.onSortEntityChildren(this);
        };
        /**
         * @internal
         * @param val
         */
        Entity.prototype.$setParent = function (val, index) {
            if (index === void 0) { index = -1; }
            this.parentChangeCount++;
            if (this._parent) {
                this._parent.children.splice(this._parent.children.indexOf(this), 1);
                this._parent = null;
                this.$setWorld(this._parent && this._parent.world);
                Entity.onChangeEntityParent && Entity.onChangeEntityParent(this);
            }
            this._parent = val;
            if (val)
                this.transform.$parent = val.transform;
            else
                this.transform.$parent = null;
            if (this._parent) {
                var children = this._parent.children;
                if (~index) {
                    children.splice(index, 0, this);
                }
                else {
                    index = children.length;
                    children.push(this);
                }
                this.$setWorld(this._parent && this._parent.world);
                Entity.onChangeEntityParent && Entity.onChangeEntityParent(this, index);
            }
        };
        Entity.prototype.getChildByName = function (name) {
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].name == name)
                    return this.children[i];
            }
            return null;
        };
        Entity.prototype.getChildByPath = function (name) {
            var names = name.split(".");
            var entity = this;
            for (var n = 0; n < names.length; n++) {
                var find = null;
                for (var i = 0; i < entity.children.length; i++) {
                    if (entity.children[i].name == names[n]) {
                        find = entity.children[i];
                        break;
                    }
                }
                if (!find)
                    return null;
                entity = find;
            }
            return entity;
        };
        /**
         *
         * @internal
         * @param val
         */
        Entity.prototype.$setWorld = function (val) {
            if (!this.isAlive) {
                ecs.debug && ecs.error(ecs.EMError.ENEIEY_HAS_DESTROYED);
                return;
            }
            if (val === this.world)
                return;
            !val && this.world && this.world.onRemoveEntity(this);
            this.world = val;
            this.world && this.world.onAddEntity(this);
            for (var i = 0, len = this.children.length; i < len; i++) {
                this.children[i].$setWorld(this.world);
            }
        };
        Entity.create = function (type, name, tag) {
            if (type === void 0) { type = 0; }
            if (name === void 0) { name = ''; }
            if (tag === void 0) { tag = ''; }
            var entity;
            if (ecs.ObjectPools.entities.length) {
                entity = ecs.ObjectPools.entities.pop();
                ecs.ObjectPools.setId(entity, false);
                entity.isAlive = true;
            }
            else {
                entity = new Entity();
                ecs.ObjectPools.setId(entity);
                this.realNewCount++;
            }
            entity.name = name;
            entity.tag = tag;
            entity.type = type;
            this.aliveCount++;
            this.newCount++;
            this.onCreateEntity && this.onCreateEntity(entity);
            return entity;
        };
        /**
         * @internal
         */
        Entity.componentCreatedPoints = new ecs.Link();
        Entity.aliveCount = 0;
        Entity.newCount = 0;
        Entity.realNewCount = 0;
        Entity.onCreateEntity = null;
        Entity.onDestroyEntity = null;
        Entity.onChangeEntityParent = null;
        Entity.onSortEntityChildren = null;
        return Entity;
    }(ecs.Broadcast));
    ecs.Entity = Entity;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var Matrix = /** @class */ (function () {
        function Matrix() {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.tx = 0;
            this.ty = 0;
            this._storeList = [];
        }
        Matrix.prototype.identity = function () {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.tx = 0;
            this.ty = 0;
        };
        Matrix.prototype.setTo = function (a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
        Matrix.prototype.translate = function (x, y) {
            this.tx += x;
            this.ty += y;
        };
        Matrix.prototype.rotate = function (angle) {
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
            this.setTo(this.a * cos - this.c * sin, this.a * sin + this.c * cos, this.b * cos - this.d * sin, this.b * sin + this.d * cos, this.tx * cos - this.ty * sin, this.tx * sin + this.ty * cos);
        };
        Matrix.prototype.scale = function (scaleX, scaleY) {
            this.a *= scaleX;
            this.d *= scaleY;
            this.tx *= scaleX;
            this.ty *= scaleY;
        };
        // transformPoint(pointX, pointY, resultPoint) {
        //     var x = this.a * pointX + this.c * pointY + this.tx;
        //     var y = this.b * pointX + this.d * pointY + this.ty;
        //     if (resultPoint) {
        //         resultPoint.setTo(x, y);
        //         return resultPoint;
        //     }
        //     return new Point(x, y);
        // }
        Matrix.prototype.$updateSR = function (scaleX, scaleY, rotation) {
            var sin = 0;
            var cos = 1;
            if (rotation) {
                sin = Math.sin(rotation);
                cos = Math.cos(rotation);
            }
            this.a = cos * scaleX;
            this.b = sin * scaleY;
            this.c = -sin * scaleX;
            this.d = cos * scaleY;
        };
        Matrix.prototype.$updateRST = function (rotation, scaleX, scaleY, tx, ty) {
            var sin = 0;
            var cos = 1;
            if (rotation) {
                sin = Math.sin(rotation);
                cos = Math.cos(rotation);
            }
            this.a = cos * scaleX;
            this.b = sin * scaleX;
            this.c = -sin * scaleY;
            this.d = cos * scaleY;
            this.tx = cos * scaleX * tx - sin * scaleY * ty;
            this.ty = sin * scaleX * tx + cos * scaleY * ty;
        };
        Matrix.prototype.$transformRectangle = function (rect) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            var x = rect.x;
            var y = rect.y;
            var xMax = x + rect.width;
            var yMax = y + rect.height;
            var x0 = a * x + c * y + tx;
            var y0 = b * x + d * y + ty;
            var x1 = a * xMax + c * y + tx;
            var y1 = b * xMax + d * y + ty;
            var x2 = a * xMax + c * yMax + tx;
            var y2 = b * xMax + d * yMax + ty;
            var x3 = a * x + c * yMax + tx;
            var y3 = b * x + d * yMax + ty;
            var tmp = 0;
            if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
            }
            if (x2 > x3) {
                tmp = x2;
                x2 = x3;
                x3 = tmp;
            }
            rect.x = Math.floor(x0 < x2 ? x0 : x2);
            rect.width = Math.ceil((x1 > x3 ? x1 : x3) - rect.x);
            if (y0 > y1) {
                tmp = y0;
                y0 = y1;
                y1 = tmp;
            }
            if (y2 > y3) {
                tmp = y2;
                y2 = y3;
                y3 = tmp;
            }
            rect.y = Math.floor(y0 < y2 ? y0 : y2);
            rect.height = Math.ceil((y1 > y3 ? y1 : y3) - rect.y);
        };
        Matrix.prototype.concat = function (other) {
            var a = this.a * other.a;
            var b = 0.0;
            var c = 0.0;
            var d = this.d * other.d;
            var tx = this.tx * other.a + other.tx;
            var ty = this.ty * other.d + other.ty;
            if (this.b !== 0.0 || this.c !== 0.0 || other.b !== 0.0 || other.c !== 0.0) {
                a += this.b * other.c;
                d += this.c * other.b;
                b += this.a * other.b + this.b * other.d;
                c += this.c * other.a + this.d * other.c;
                tx += this.ty * other.c;
                ty += this.tx * other.b;
            }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
        Matrix.prototype.reconcat = function (other) {
            var _this = other;
            other = this;
            var a = _this.a * other.a;
            var b = 0.0;
            var c = 0.0;
            var d = _this.d * other.d;
            var tx = _this.tx * other.a + other.tx;
            var ty = _this.ty * other.d + other.ty;
            if (_this.b !== 0.0 || _this.c !== 0.0 || other.b !== 0.0 || other.c !== 0.0) {
                a += _this.b * other.c;
                d += _this.c * other.b;
                b += _this.a * other.b + _this.b * other.d;
                c += _this.c * other.a + _this.d * other.c;
                tx += _this.ty * other.c;
                ty += _this.tx * other.b;
            }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
        Object.defineProperty(Matrix.prototype, "deformation", {
            get: function () {
                if (this.a != 1 || this.b != 0 || this.c != 0 || this.d != 1)
                    return true;
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Matrix.prototype.save = function () {
            var matrix = Matrix.create();
            matrix.a = this.a;
            matrix.b = this.b;
            matrix.c = this.c;
            matrix.d = this.d;
            matrix.tx = this.tx;
            matrix.ty = this.ty;
            this._storeList.push(matrix);
        };
        Matrix.prototype.restore = function () {
            var matrix = this._storeList.pop();
            this.setTo(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            Matrix.release(matrix);
        };
        Matrix.release = function (matrix) {
            if (!matrix) {
                return;
            }
            matrix._storeList.length = 0;
            Matrix.matrixPool.push(matrix);
        };
        /**
         * 创建出来的矩阵可能不是规范矩阵
         * @returns {Matrix}
         */
        Matrix.create = function () {
            var matrix = Matrix.matrixPool.pop();
            if (!matrix) {
                matrix = new Matrix();
            }
            return matrix;
        };
        Matrix.$matrix = new Matrix();
        Matrix.matrixPool = [];
        return Matrix;
    }());
    ecs.Matrix = Matrix;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    ecs.$componentRecyclePool = null;
    function setComponentRecyclePool(pool) {
        ecs.$componentRecyclePool = pool;
    }
    ecs.setComponentRecyclePool = setComponentRecyclePool;
    var RecyclableClassType = /** @class */ (function () {
        function RecyclableClassType() {
        }
        return RecyclableClassType;
    }());
    ecs.RecyclableClassType = RecyclableClassType;
    var ObjectPools = /** @class */ (function () {
        function ObjectPools() {
        }
        ObjectPools.prototype.releaseComponent = function (component) {
            ObjectPools.components[component.classType.id].push(component);
        };
        ObjectPools.prototype.createComponent = function (componentClass) {
            var pools = ObjectPools.components;
            var id = componentClass.classType.id;
            if (pools[id] === undefined)
                pools[id] = [];
            if (pools[id].length) {
                var c = pools[id].pop();
                ObjectPools.setId(c, false);
                return c;
            }
            else
                return new componentClass();
        };
        ObjectPools.releaseRecyableObject = function (obj) {
            this.releaseId(obj.id);
            obj.onDestroy && obj.onDestroy();
            this.objects[obj.classType.id].push(obj);
        };
        ObjectPools.createRecyableObject = function (objectClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.registerRecyclableClass(objectClass);
            var obj;
            if (this.objects[objectClass.classType.id].length) {
                obj = this.objects[objectClass.classType.id].pop();
                this.setId(obj, false);
                objectClass.classType.realNewCount++;
            }
            else {
                obj = new objectClass();
                this.setId(obj);
            }
            objectClass.classType.newCount++;
            obj.classType = objectClass.classType;
            obj.init && obj.init.apply(obj, args);
            return obj;
        };
        ObjectPools.registerRecyclableClass = function (clazz) {
            if (clazz.classType && clazz.classType.define === clazz)
                return;
            ObjectPools.objectClasses.push(clazz);
            var type = new RecyclableClassType();
            clazz.classType = type;
            ObjectPools.setId(type);
            type.define = clazz;
            type.name = clazz.name;
            type.newCount = 0;
            type.realNewCount = 0;
            this.objects[type.id] = [];
        };
        ObjectPools.setId = function (obj, isNew) {
            if (isNew === void 0) { isNew = true; }
            this.id++;
            var id = this.id;
            this.all[id] = obj;
            obj.id = id;
            if (isNew) {
                this.realNewObjectCount++;
            }
            ecs.debug && this.weakSet.add(obj);
            this.allCount++;
            return id;
        };
        /**
         * @internal
         */
        ObjectPools.releaseIds = function () {
            while (this.waitToDeleteIds.length) {
                delete this.all[this.waitToDeleteIds.pop()];
            }
        };
        ObjectPools.releaseId = function (id) {
            if (ecs.debug) {
                if (!this.all[id]) {
                    ecs.error(ecs.EMError.RELEASE_ID_ERROR);
                    return;
                }
            }
            this.allCount--;
            delete this.all[id];
            this.waitToDeleteIds.push(id);
        };
        ObjectPools.clearLinkPrePool = function () {
            var prepool = this.linkPrePool;
            var pool = this.linkPool;
            for (var i = 0, len = prepool.length; i < len; i++) {
                var node = prepool.pop();
                if (!node)
                    return;
                node._next = node.prev = null;
                pool.push(node);
            }
        };
        ObjectPools.objects = {};
        ObjectPools.objectClasses = [];
        ObjectPools.components = {};
        ObjectPools.componentClasses = [];
        ObjectPools.entities = [];
        ObjectPools.id = 1;
        ObjectPools.realNewObjectCount = 0;
        /**
         * 所有存活的对象
         */
        ObjectPools.all = { 0: null };
        /**
         * 所有存活对象的数量
         */
        ObjectPools.allCount = 0;
        ObjectPools.weakSet = new WeakSet();
        /**
         * @internal
         */
        ObjectPools.waitToDeleteIds = [];
        ObjectPools.linkPool = [];
        ObjectPools.linkPrePool = [];
        return ObjectPools;
    }());
    ecs.ObjectPools = ObjectPools;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var Query = /** @class */ (function (_super) {
        __extends(Query, _super);
        function Query() {
            return _super.call(this) || this;
        }
        return Query;
    }(ecs.Link));
    ecs.Query = Query;
    var EntityQuery = /** @class */ (function (_super) {
        __extends(EntityQuery, _super);
        function EntityQuery() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.componentClassList = [];
            _this.componentClassMap = {};
            return _this;
        }
        EntityQuery.prototype.init = function (componentClasses) {
            this.componentClassList = componentClasses;
            for (var i = 0; i < this.componentClassList.length; i++) {
                this.componentClassList[i].register(this.componentClassList[i]);
                this.componentClassMap[this.componentClassList[i].classType.id] = this.componentClassList[i];
            }
        };
        EntityQuery.prototype.onAddEntity = function (entity) {
            if (this.componentClassList.length == 1) {
                if (!entity.componentEnableCount[this.componentClassList[0].classType.id]) {
                    return;
                }
            }
            else {
                var list = this.componentClassList;
                for (var i = 0; i < list.length; i++) {
                    if (!entity.componentEnableCount[list[i].classType.id]) {
                        return;
                    }
                }
            }
            this.add(entity);
        };
        EntityQuery.prototype.onRemoveEntity = function (entity) {
            if (!this.has(entity))
                return;
            this.remove(entity);
        };
        EntityQuery.prototype.onAddComponent = function (entity, component) {
            // if (this.has(entity) || this.componentClassMap[component.classType.id] === undefined) return;
            if (this.has(entity))
                return;
            var list = this.componentClassList;
            for (var i = 0; i < list.length; i++) {
                if (!entity.componentEnableCount[list[i].classType.id]) {
                    return;
                }
            }
            this.add(entity);
        };
        EntityQuery.prototype.onRemoveComponent = function (entity, component) {
            // if (!this.has(entity) || this.componentClassMap[component.classType.id] === undefined) return;
            if (!this.has(entity))
                return;
            var list = this.componentClassList;
            for (var i = 0; i < list.length; i++) {
                var id = list[i].classType.id;
                if (component.classType.typeMap[id]) {
                    if (entity.componentEnableCount[id] <= 1) {
                        this.remove(entity);
                        return;
                    }
                }
                else {
                    if (!entity.componentEnableCount[id]) {
                        this.remove(entity);
                        return;
                    }
                }
            }
        };
        return EntityQuery;
    }(Query));
    ecs.EntityQuery = EntityQuery;
    var ComponentQuery = /** @class */ (function (_super) {
        __extends(ComponentQuery, _super);
        function ComponentQuery() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComponentQuery.prototype.init = function (callName) {
            this.callName = callName;
        };
        ComponentQuery.prototype.onAddEntity = function (entity) {
            for (var i = 0; i < entity.components.length; i++) {
                var component = entity.components[i];
                if (component[this.callName] !== undefined && typeof component[this.callName] === 'function') {
                    this.add(component);
                }
            }
        };
        ComponentQuery.prototype.onRemoveEntity = function (entity) {
            for (var i = 0; i < entity.components.length; i++) {
                this.remove(entity.components[i]);
            }
        };
        ComponentQuery.prototype.onAddComponent = function (entity, component) {
            if (this.has(component))
                return;
            if (component[this.callName] !== undefined && typeof component[this.callName] === 'function') {
                this.add(component);
            }
        };
        ComponentQuery.prototype.onRemoveComponent = function (entity, component) {
            if (!this.has(component))
                return;
            this.remove(component);
        };
        return ComponentQuery;
    }(Query));
    ecs.ComponentQuery = ComponentQuery;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var System = /** @class */ (function () {
        function System() {
            this.updateFixTime = 0;
            this.lateUpdateFixTime = 0;
            /**
             * @internal
             */
            this.updateMoreTime = 0;
            /**
             * @internal
             */
            this.lateUpdateMoreTime = 0;
            this.isRunning = true;
        }
        System.prototype.init = function (query) {
            this.query = query;
        };
        System.prototype.destroy = function () {
            if (this.query) {
                this.query.clear();
                ecs.ObjectPools.releaseRecyableObject(this.query);
                this.query = null;
            }
            this.updateMoreTime = 0;
            this.lateUpdateMoreTime = 0;
        };
        System.recycleEnable = false;
        System.sync = false;
        System.syncSystemClasses = {};
        return System;
    }());
    ecs.System = System;
    var EMSyncSystemMode;
    (function (EMSyncSystemMode) {
        EMSyncSystemMode[EMSyncSystemMode["SUB_WORLD_ONLY"] = 1] = "SUB_WORLD_ONLY";
        EMSyncSystemMode[EMSyncSystemMode["ALL_WORLD"] = 2] = "ALL_WORLD";
    })(EMSyncSystemMode = ecs.EMSyncSystemMode || (ecs.EMSyncSystemMode = {}));
    function syncSystem(mode) {
        if (mode === void 0) { mode = EMSyncSystemMode.SUB_WORLD_ONLY; }
        return function (c) {
            c["sync"] = true;
            System.syncSystemClasses[c.name] = {
                define: c,
                mode: mode
            };
            return c;
        };
    }
    ecs.syncSystem = syncSystem;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var Transform = /** @class */ (function () {
        function Transform(entity) {
            /**
             * @internal
             */
            this._x = 0;
            /**
             * @internal
             */
            this._y = 0;
            /**
             * @internal
             */
            this._anchorOffsetX = 0;
            /**
             * @internal
             */
            this._anchorOffsetY = 0;
            /**
             * @internal
             */
            this._scaleX = 1;
            /**
             * @internal
             */
            this._scaleY = 1;
            /**
             * @internal
             */
            this._angle = 0;
            /**
             * @internal
             */
            this._alpha = 1;
            /**
             * @internal
             */
            this._local = new ecs.Matrix();
            /**
             * @internal
             */
            this.dirty = false;
            /**
             * @internal
             */
            this._worldMatrix = new ecs.Matrix();
            this._entity = entity;
        }
        Object.defineProperty(Transform.prototype, "entity", {
            get: function () {
                return this._entity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "x", {
            get: function () { return this._x; },
            set: function (val) {
                if (this._x === val)
                    return;
                this.dirty = true;
                this._x = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "y", {
            get: function () { return this._y; },
            set: function (val) {
                if (this._y === val)
                    return;
                this.dirty = true;
                this._y = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "anchorOffsetX", {
            get: function () { return this._anchorOffsetX; },
            set: function (val) {
                if (this._anchorOffsetX === val)
                    return;
                this.dirty = true;
                this._anchorOffsetX = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "anchorOffsetY", {
            get: function () { return this._anchorOffsetY; },
            set: function (val) {
                if (this._anchorOffsetY === val)
                    return;
                this.dirty = true;
                this._anchorOffsetY = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "scaleX", {
            get: function () { return this._scaleX; },
            set: function (val) {
                if (this._scaleX === val)
                    return;
                this.dirty = true;
                this._scaleX = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "scaleY", {
            get: function () { return this._scaleY; },
            set: function (val) {
                if (this._scaleY === val)
                    return;
                this.dirty = true;
                this._scaleY = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "angle", {
            get: function () { return this._angle; },
            set: function (val) {
                if (this._angle === val)
                    return;
                this.dirty = true;
                this._angle = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "alpha", {
            get: function () { return this._alpha; },
            set: function (val) {
                this._alpha = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "parent", {
            get: function () {
                return this.$parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "local", {
            get: function () {
                if (this.dirty) {
                    this.dirty = false;
                    var local = this._local;
                    this._local.identity();
                    var sx = this._scaleX;
                    var sy = this._scaleY;
                    if (sx != 1 || sy != 1) {
                        local.a *= sx;
                        local.d *= sy;
                    }
                    if (this._angle) {
                        var sin = Math.sin(this._angle);
                        var cos = Math.cos(this._angle);
                        local.a = cos * sx;
                        local.b = sin * sx;
                        local.c = -sin * sy;
                        local.d = cos * sy;
                    }
                    var tx = -this._anchorOffsetX * local.a + this._x;
                    var ty = -this._anchorOffsetY * local.d + this._y;
                    tx += -this._anchorOffsetY * local.c;
                    ty += -this._anchorOffsetX * local.b;
                    local.tx = tx;
                    local.ty = ty;
                }
                return this._local;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "worldMatrix", {
            get: function () {
                var dis = this.$parent;
                var local = this.local;
                this._worldMatrix.setTo(local.a, local.b, local.c, local.d, local.tx, local.ty);
                while (dis) {
                    this._worldMatrix.concat(dis.local);
                    dis = dis.$parent;
                }
                return this._worldMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "worldAlpha", {
            get: function () {
                var dis = this.$parent;
                var alpha = this._alpha;
                while (dis) {
                    alpha *= dis._alpha;
                    dis = dis.$parent;
                }
                return alpha;
            },
            enumerable: true,
            configurable: true
        });
        Transform.prototype.reset = function () {
            this.local.identity();
            this.dirty = false;
            this._anchorOffsetX = this._anchorOffsetY = this._x = this._y = this._angle = 0;
            this._scaleX = this._scaleY = this._alpha = 1;
        };
        return Transform;
    }());
    ecs.Transform = Transform;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var UpdateInfo = /** @class */ (function () {
        function UpdateInfo() {
        }
        return UpdateInfo;
    }());
    ecs.UpdateInfo = UpdateInfo;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var World = /** @class */ (function () {
        function World() {
            this.entities = new ecs.Link();
            this.queries = [];
            this.systems = [];
            this.subWorld = false;
            this.syncWorldEnable = false;
            this.syncComponents = new ecs.Link();
            this.syncDeleteComponents = [];
            this.syncFrames = [];
            this.syncSystems = [];
            this.syncDeleteSystems = [];
            this.waitToSyncFrames = [];
            this.runInfo = new ecs.RunInfo;
            this.root = new RootEntity();
            this.root.world = this;
            this.onAddEntity(this.root);
            this._lastTime = Date.now();
            this.addSystem(ecs.AwakeSystem);
            this.addSystem(ecs.StartSystem);
            this.addSystem(ecs.UpdateSystem);
            this.addSystem(ecs.LateUpdateSystem);
        }
        World.prototype.update = function (dt) {
            var e_7, _a, e_8, _b;
            World.subWorld = this.subWorld;
            while (this.waitToSyncFrames.length) {
                this.decodeSyncComponents(this.waitToSyncFrames.shift());
            }
            var start = Date.now();
            dt = dt != null ? dt : (start - this._lastTime);
            if (dt < 0)
                dt = 0;
            this._lastTime = start;
            try {
                for (var _c = __values(this.systems), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var sys = _d.value;
                    if (!sys.isRunning)
                        continue;
                    if (sys.updateFixTime) {
                        var sysdt = dt;
                        while (sysdt >= sys.updateFixTime) {
                            sys.update && sys.update(sys.updateFixTime);
                            sysdt -= sys.updateFixTime;
                        }
                        sys.updateMoreTime = sysdt;
                    }
                    else {
                        sys.update && sys.update(dt);
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_7) throw e_7.error; }
            }
            var ut = (Date.now() - start);
            try {
                for (var _e = __values(this.systems), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var sys = _f.value;
                    if (!sys.isRunning)
                        continue;
                    if (sys.lateUpdateFixTime) {
                        var sysdt = dt;
                        var sysut = ut;
                        while (sysdt >= sys.lateUpdateFixTime) {
                            sysdt -= sys.lateUpdateFixTime;
                            ut -= sys.lateUpdateFixTime;
                        }
                        sysdt = dt;
                        while (sysdt >= sys.lateUpdateFixTime) {
                            sysut += sys.lateUpdateFixTime;
                            sys.lateUpdate && sys.lateUpdate(sys.lateUpdateFixTime, sysut);
                            sysdt -= sys.updateFixTime;
                        }
                    }
                    else {
                        sys.lateUpdate && sys.lateUpdate(dt, ut);
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_8) throw e_8.error; }
            }
            var at = Date.now() - start;
            // if (at < 5 || ObjectPools.linkPrePool.length > 10000) {
            //     ObjectPools.clearLinkPrePool();
            // }
            ecs.ObjectPools.clearLinkPrePool();
            this.runInfo.frame++;
            this.runInfo.lastProcessTime = at;
            if (this.syncWorldEnable) {
                if (this.syncComponents.length || !this.subWorld && this.syncDeleteComponents.length ||
                    this.syncSystems.length || !this.subWorld && this.syncDeleteSystems.length) {
                    this.syncFrames.push(this.encodeSyncWorld());
                }
            }
        };
        World.prototype.onAddEntity = function (entity) {
            var e_9, _a;
            this.entities.add(entity);
            try {
                for (var _b = __values(entity.components), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var component = _c.value;
                    if (component.syncProperties.length) {
                        if (!this.syncComponents.has(component)) {
                            this.syncComponents.add(component);
                        }
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_9) throw e_9.error; }
            }
            if (entity.components.length) {
                for (var i = 0, len = this.queries.length; i < len; i++) {
                    this.queries[i].onAddEntity(entity);
                }
            }
        };
        World.prototype.onRemoveEntity = function (entity) {
            var e_10, _a;
            this.entities.remove(entity);
            if (entity.components.length) {
                try {
                    for (var _b = __values(entity.components), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var component = _c.value;
                        if (component.syncProperties.length) {
                            this.syncComponents.remove(component);
                            this.syncDeleteComponents.push(component.id);
                            for (var node = component.syncProperties.head; node; node = node.next) {
                                node.value.target = null;
                                ecs.SyncProperty.pools.push(node.value);
                            }
                            component.syncProperties.clear();
                        }
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
                for (var i = 0, len = this.queries.length; i < len; i++) {
                    this.queries[i].onRemoveEntity(entity);
                }
            }
        };
        World.prototype.onAddComponent = function (entity, component) {
            if (component.syncProperties.length) {
                if (!this.syncComponents.has(component)) {
                    this.syncComponents.add(component);
                }
            }
            for (var i = 0; i < this.queries.length; i++) {
                this.queries[i].onAddComponent(entity, component);
            }
        };
        World.prototype.onRemoveComponent = function (entity, component) {
            for (var i = 0; i < this.queries.length; i++) {
                this.queries[i].onRemoveComponent(entity, component);
            }
        };
        World.prototype.addSystem = function (systemClass, initArgs) {
            var e_11, _a, e_12, _b;
            if (initArgs && !(typeof initArgs === 'string')) {
                try {
                    for (var initArgs_1 = __values(initArgs), initArgs_1_1 = initArgs_1.next(); !initArgs_1_1.done; initArgs_1_1 = initArgs_1.next()) {
                        var comp = initArgs_1_1.value;
                        ecs.Component.register(comp);
                    }
                }
                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                finally {
                    try {
                        if (initArgs_1_1 && !initArgs_1_1.done && (_a = initArgs_1.return)) _a.call(initArgs_1);
                    }
                    finally { if (e_11) throw e_11.error; }
                }
            }
            var data = ecs.System.syncSystemClasses[systemClass.name];
            if (this.syncWorldEnable && data && !this.subWorld) {
                var comps = void 0;
                if (typeof initArgs === 'string')
                    comps = initArgs;
                else {
                    comps = [];
                    try {
                        for (var initArgs_2 = __values(initArgs), initArgs_2_1 = initArgs_2.next(); !initArgs_2_1.done; initArgs_2_1 = initArgs_2.next()) {
                            var comp = initArgs_2_1.value;
                            comps.push(comp.classType.name);
                        }
                    }
                    catch (e_12_1) { e_12 = { error: e_12_1 }; }
                    finally {
                        try {
                            if (initArgs_2_1 && !initArgs_2_1.done && (_b = initArgs_2.return)) _b.call(initArgs_2);
                        }
                        finally { if (e_12) throw e_12.error; }
                    }
                }
                this.syncSystems.push({
                    system: systemClass.name,
                    components: comps
                });
                if (data.mode === ecs.EMSyncSystemMode.SUB_WORLD_ONLY)
                    return;
            }
            var system = ecs.ObjectPools.createRecyableObject(systemClass, initArgs);
            if (this.systems.indexOf(system) !== -1)
                return;
            this.systems.push(system);
            if (system.query) {
                this.queries.push(system.query);
                for (var entityNode = this.entities.head; entityNode; entityNode = entityNode.next) {
                    system.query.onAddEntity(entityNode.value);
                }
            }
        };
        World.prototype.removeSystem = function (system) {
            var systemClass;
            var singleSystem;
            if (system instanceof ecs.System) {
                systemClass = system.constructor;
                singleSystem = system;
            }
            else {
                systemClass = system;
            }
            var data = ecs.System.syncSystemClasses[systemClass.name];
            if (data && !this.subWorld) {
                this.syncDeleteSystems.push(systemClass.name);
                if (data.mode === ecs.EMSyncSystemMode.SUB_WORLD_ONLY)
                    return;
            }
            for (var i = 0; i < this.systems.length; i++) {
                var sys = this.systems[i];
                if (sys instanceof systemClass) {
                    if (!singleSystem || singleSystem && singleSystem === sys) {
                        this.systems.splice(this.systems.indexOf(sys), 1);
                        sys.query && this.queries.splice(this.queries.indexOf(sys.query), 1);
                        sys.destroy();
                        if (sys.constructor["recycleEnable"]) {
                            ecs.ObjectPools.releaseRecyableObject(sys);
                        }
                        else {
                            ecs.ObjectPools.releaseId(sys.id);
                        }
                        i--;
                    }
                }
            }
        };
        World.prototype.getSystem = function (system) {
            var systemClass;
            var singleSystem;
            if (system instanceof ecs.System) {
                systemClass = system.constructor;
                singleSystem = system;
            }
            else {
                systemClass = system;
            }
            var data = ecs.System.syncSystemClasses[systemClass.name];
            if (data && !this.subWorld) {
                this.syncDeleteSystems.push(systemClass.name);
                if (data.mode === ecs.EMSyncSystemMode.SUB_WORLD_ONLY)
                    return;
            }
            for (var i = 0; i < this.systems.length; i++) {
                var sys = this.systems[i];
                if (sys instanceof systemClass) {
                    if (!singleSystem || singleSystem && singleSystem === sys) {
                        return sys;
                    }
                }
            }
        };
        World.prototype.encodeSyncWorld = function () {
            var components = this.syncComponents;
            var entities = {};
            var entityList = [];
            for (var node = components.head; node; node = node.next) {
                if (node.value.syncProperties.length) {
                    var entity = void 0;
                    var id = node.value.entity.id;
                    if (this.subWorld)
                        id = World.resyncIds[id];
                    if (entities[id] == null) {
                        entities[id] = {
                            id: id,
                            components: []
                        };
                        entityList.push(entities[id]);
                    }
                    entity = entities[id];
                    id = node.value.id;
                    if (this.subWorld)
                        id = World.resyncIds[id];
                    var obj = {
                        define: node.value.classType.name,
                        id: id,
                    };
                    for (var p = node.value.syncProperties.head; p; p = p.next) {
                        if (p.value.hasChange) {
                            if (p.value.type === ecs.EMSyncType.BASE)
                                obj[p.value.id] = p.value.value;
                            else if (p.value.type === ecs.EMSyncType.COMPONENT) {
                                if (!this.subWorld)
                                    obj[p.value.id] = p.value.value;
                                else {
                                    if (p.value.reValue)
                                        obj[p.value.id] = p.value.value;
                                    else
                                        obj[p.value.id] = World.resyncIds[p.value.value];
                                }
                                if (obj[p.value.id] == null)
                                    obj[p.value.id] = 0;
                            }
                            p.value.hasChange = false;
                        }
                    }
                    entity.components.push(obj);
                }
            }
            this.syncComponents.clear(false);
            var ids = this.subWorld ? [] : this.syncDeleteComponents.concat();
            this.syncDeleteComponents.length = 0;
            var syncSystems = this.syncSystems.concat();
            this.syncSystems.length = 0;
            var syncDeleteSystems = this.subWorld ? [] : this.syncDeleteSystems.concat();
            this.syncDeleteSystems.length = 0;
            return {
                entities: entityList,
                deleteIds: ids,
                systems: syncSystems,
                deleteSystems: syncDeleteSystems
            };
        };
        World.prototype.decodeSyncComponents = function (syncWorld) {
            var e_13, _a, e_14, _b, e_15, _c, e_16, _d, e_17, _e, e_18, _f;
            if (!syncWorld)
                return;
            World.isSyncing = true;
            var world = this;
            if (syncWorld.systems.length) {
                try {
                    for (var _g = __values(syncWorld.systems), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var syncSystem_1 = _h.value;
                        var systemClass = ecs.System.syncSystemClasses[syncSystem_1.system].define;
                        var comps = void 0;
                        if (syncSystem_1.components) {
                            if (typeof syncSystem_1.components === 'string')
                                comps = syncSystem_1.components;
                            else {
                                comps = [];
                                try {
                                    for (var _j = __values(syncSystem_1.components), _k = _j.next(); !_k.done; _k = _j.next()) {
                                        var syncComponent = _k.value;
                                        comps.push(ecs.Component.syncComponents[syncComponent]);
                                    }
                                }
                                catch (e_14_1) { e_14 = { error: e_14_1 }; }
                                finally {
                                    try {
                                        if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
                                    }
                                    finally { if (e_14) throw e_14.error; }
                                }
                            }
                        }
                        this.addSystem(systemClass, comps);
                    }
                }
                catch (e_13_1) { e_13 = { error: e_13_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
                    }
                    finally { if (e_13) throw e_13.error; }
                }
            }
            if (syncWorld.deleteSystems.length) {
                try {
                    for (var _l = __values(syncWorld.deleteSystems), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var syncSystem_2 = _m.value;
                        var systemClass = ecs.System.syncSystemClasses[syncSystem_2].define;
                        this.removeSystem(systemClass);
                    }
                }
                catch (e_15_1) { e_15 = { error: e_15_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_c = _l.return)) _c.call(_l);
                    }
                    finally { if (e_15) throw e_15.error; }
                }
            }
            if (syncWorld.entities.length) {
                try {
                    for (var _o = __values(syncWorld.entities), _p = _o.next(); !_p.done; _p = _o.next()) {
                        var syncEntity = _p.value;
                        var entity = void 0;
                        if (this.subWorld) {
                            if (!World.syncIds[syncEntity.id]) {
                                entity = ecs.Entity.create();
                                World.syncIds[syncEntity.id] = entity.id;
                                World.resyncIds[entity.id] = syncEntity.id;
                                entity.parent = world.root;
                            }
                            else {
                                entity = ecs.ObjectPools.all[World.syncIds[syncEntity.id]];
                            }
                        }
                        else {
                            entity = ecs.ObjectPools.all[syncEntity.id];
                            if (!entity)
                                continue;
                        }
                        try {
                            for (var _q = __values(syncEntity.components), _r = _q.next(); !_r.done; _r = _q.next()) {
                                var syncComponent = _r.value;
                                var component = void 0;
                                if (this.subWorld) {
                                    if (!World.syncIds[syncComponent.id]) {
                                        component = entity.addComponent(ecs.Component.syncComponents[syncComponent.define]);
                                        World.syncIds[syncComponent.id] = component.id;
                                        World.resyncIds[component.id] = syncComponent.id;
                                    }
                                    else {
                                        component = ecs.ObjectPools.all[World.syncIds[syncComponent.id]];
                                    }
                                }
                                else {
                                    component = ecs.ObjectPools.all[syncComponent.id];
                                    if (!component)
                                        continue;
                                }
                                for (var key in syncComponent) {
                                    if (key === "id")
                                        continue;
                                    component[key] = syncComponent[key];
                                }
                            }
                        }
                        catch (e_17_1) { e_17 = { error: e_17_1 }; }
                        finally {
                            try {
                                if (_r && !_r.done && (_e = _q.return)) _e.call(_q);
                            }
                            finally { if (e_17) throw e_17.error; }
                        }
                    }
                }
                catch (e_16_1) { e_16 = { error: e_16_1 }; }
                finally {
                    try {
                        if (_p && !_p.done && (_d = _o.return)) _d.call(_o);
                    }
                    finally { if (e_16) throw e_16.error; }
                }
            }
            if (syncWorld.deleteIds.length) {
                try {
                    for (var _s = __values(syncWorld.deleteIds), _t = _s.next(); !_t.done; _t = _s.next()) {
                        var id = _t.value;
                        if (!World.syncIds[id])
                            continue;
                        var reid = World.syncIds[id];
                        delete World.syncIds[id];
                        delete World.resyncIds[reid];
                        var comp = ecs.ObjectPools.all[reid];
                        if (!comp)
                            continue;
                        var entity = comp.entity;
                        comp.destroy();
                        if (entity && entity.components.length === 0) {
                            reid = entity.id;
                            id = World.resyncIds[reid];
                            delete World.syncIds[id];
                            delete World.resyncIds[reid];
                            entity.destroy();
                        }
                    }
                }
                catch (e_18_1) { e_18 = { error: e_18_1 }; }
                finally {
                    try {
                        if (_t && !_t.done && (_f = _s.return)) _f.call(_s);
                    }
                    finally { if (e_18) throw e_18.error; }
                }
            }
            World.isSyncing = false;
        };
        Object.defineProperty(World.prototype, "scene", {
            get: function () {
                return this.$scene;
            },
            set: function (val) {
                this.$scene && (this.$scene.parent = null);
                this.$scene = val;
                this.$scene && (this.$scene.parent = this.root);
            },
            enumerable: true,
            configurable: true
        });
        World.subWorld = false;
        World.syncIds = { 0: 0 };
        World.resyncIds = { 0: 0 };
        World.isSyncing = false;
        return World;
    }());
    ecs.World = World;
    var RootEntity = /** @class */ (function (_super) {
        __extends(RootEntity, _super);
        function RootEntity() {
            var _this = _super.call(this) || this;
            ecs.Entity.realNewCount++;
            ecs.Entity.newCount++;
            ecs.Entity.aliveCount++;
            ecs.Entity.onCreateEntity && ecs.Entity.onCreateEntity(_this);
            return _this;
        }
        RootEntity.prototype.$setParent = function () {
            return;
        };
        RootEntity.prototype.$setWorld = function () {
            return;
        };
        return RootEntity;
    }(ecs.Entity));
})(ecs || (ecs = {}));
window["ecs"] = ecs;
var ecs;
(function (ecs) {
    var DebugTool = /** @class */ (function () {
        function DebugTool() {
        }
        DebugTool.componentCreated = function (id, call) {
            var _this = this;
            if (ecs.debug) {
                this.debugPointTip("组件 " + id + " 何时被创建?");
            }
            ecs.Entity.componentCreatedPoints.add({
                id: id,
                call: function () {
                    if (ecs.debug) {
                        _this.debugPointTip("发现组件 " + id + " 被创建!!!", false);
                    }
                    call && call();
                }
            });
        };
        DebugTool.componentDestroyed = function (id, call) {
            var _this = this;
            if (ecs.debug) {
                this.debugPointTip("组件 " + id + " 何时被销毁?");
            }
            ecs.Component.componentDestroyedPoints.add({
                id: id,
                call: function () {
                    if (ecs.debug) {
                        _this.debugPointTip("发现组件 " + id + " 被销毁!!!", false);
                    }
                    call && call();
                }
            });
        };
        DebugTool.addedToLink = function (id, call) {
            var _this = this;
            if (ecs.debug) {
                this.debugPointTip("组件 " + id + " 何时加入队列?");
            }
            ecs.Link.debugPoints = true;
            ecs.Link.addPoints.add({
                id: id,
                call: function () {
                    if (ecs.debug) {
                        _this.debugPointTip("发现组件 " + id + " 加入队列!!!", false);
                    }
                    call && call();
                }
            });
        };
        DebugTool.remvedFromLink = function (id, call) {
            var _this = this;
            if (ecs.debug) {
                this.debugPointTip("组件 " + id + " 何时移出队列?");
            }
            ecs.Link.debugPoints = true;
            ecs.Link.addPoints.add({
                id: id,
                call: function () {
                    if (ecs.debug) {
                        _this.debugPointTip("发现组件 " + id + " 移出队列!!!", false);
                    }
                    call && call();
                }
            });
        };
        DebugTool.debugPointTip = function (name, tip) {
            if (tip === void 0) { tip = true; }
            if (tip) {
                console.warn("调试点:" + name);
            }
            else {
                console.warn("调试点:" + name);
            }
        };
        return DebugTool;
    }());
    ecs.DebugTool = DebugTool;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    ecs.debug = false;
    var EMError;
    (function (EMError) {
        EMError[EMError["RELEASE_ID_ERROR"] = 10001] = "RELEASE_ID_ERROR";
        EMError[EMError["ENEIEY_HAS_DESTROYED"] = 10002] = "ENEIEY_HAS_DESTROYED";
        EMError[EMError["NOT_ALLOW_MUTIPLY_COMPONENT"] = 11000] = "NOT_ALLOW_MUTIPLY_COMPONENT";
        EMError[EMError["COMPONENT_EXIST"] = 11001] = "COMPONENT_EXIST";
        EMError[EMError["COMPONENT_HAS_DESTROYED"] = 11002] = "COMPONENT_HAS_DESTROYED";
        EMError[EMError["COMPONENT_REQUIRE"] = 11003] = "COMPONENT_REQUIRE";
        EMError[EMError["COMPONENT_REQUIRE_COUNT"] = 11004] = "COMPONENT_REQUIRE_COUNT";
        EMError[EMError["COMPONENT_REQUIRE_INDEX_ERROR"] = 11005] = "COMPONENT_REQUIRE_INDEX_ERROR";
        EMError[EMError["COMPONENT_REQUIRE_DELETE"] = 11006] = "COMPONENT_REQUIRE_DELETE";
        EMError[EMError["SYNC_COMPONENT_SAME_NAME"] = 11007] = "SYNC_COMPONENT_SAME_NAME";
        EMError[EMError["COMPONENT_REMOVED_INDEX_ERROR"] = 11008] = "COMPONENT_REMOVED_INDEX_ERROR";
    })(EMError = ecs.EMError || (ecs.EMError = {}));
    var ErrorMessage = {
        10001: "对象已释放",
        10002: "Entity 已销毁",
        11000: "Component 不容许有重复，类 : $arg0",
        11001: "Component 对象已存在",
        11002: "Component 已销毁",
        11003: "Component $arg0 缺少依赖，类 : $arg1",
        11004: "Component 依赖计数器错误",
        11005: "Component 依赖索引错误",
        11006: "Component $arg0 无法删除，存在依赖",
        11007: "异步 Component 重名 : $arg0",
        11008: "Component 删除索引错误 : $arg0",
    };
    var onError;
    function setOnError(call) {
        onError = call;
    }
    ecs.setOnError = setOnError;
    function error(type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (onError) {
            onError(type);
        }
        if (ecs.debug) {
            var str = ErrorMessage[type];
            if (args && args.length) {
                for (var i = 0; i < args.length; i++) {
                    str = str.replace("$arg" + i, args[i]);
                }
            }
            logError(str);
        }
    }
    ecs.error = error;
    function logError() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (ecs.debug) {
            console.error.apply(null, args);
        }
    }
    ecs.logError = logError;
    function logWarn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (ecs.debug) {
            console.error.apply(null, args);
        }
    }
    ecs.logWarn = logWarn;
    function logInfo() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (ecs.debug) {
            console.error.apply(null, args);
        }
    }
    ecs.logInfo = logInfo;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var RunInfo = /** @class */ (function () {
        function RunInfo() {
            this.frame = 0;
            this.lastProcessTime = 0;
        }
        return RunInfo;
    }());
    ecs.RunInfo = RunInfo;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            var _this = _super.call(this) || this;
            ecs.ObjectPools.setId(_this);
            ecs.Entity.realNewCount++;
            ecs.Entity.newCount++;
            ecs.Entity.aliveCount++;
            ecs.Entity.onCreateEntity && ecs.Entity.onCreateEntity(_this);
            return _this;
        }
        Scene.prototype.$setParent = function (val) {
            if (this.world && this.world.$scene === this) {
                this.world.$scene = null;
            }
            _super.prototype.$setParent.call(this, val);
        };
        Scene.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            ecs.ObjectPools.releaseIds();
        };
        return Scene;
    }(ecs.Entity));
    ecs.Scene = Scene;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var ComponentSystem = /** @class */ (function (_super) {
        __extends(ComponentSystem, _super);
        function ComponentSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComponentSystem.prototype.init = function (callName) {
            _super.prototype.init.call(this, ecs.ObjectPools.createRecyableObject(ecs.ComponentQuery, callName));
        };
        return ComponentSystem;
    }(ecs.System));
    ecs.ComponentSystem = ComponentSystem;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    var EntitySystem = /** @class */ (function (_super) {
        __extends(EntitySystem, _super);
        function EntitySystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EntitySystem.prototype.init = function (componentClasses) {
            _super.prototype.init.call(this, ecs.ObjectPools.createRecyableObject(ecs.EntityQuery, componentClasses));
        };
        return EntitySystem;
    }(ecs.System));
    ecs.EntitySystem = EntitySystem;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    /**
     * @internal
     */
    var AwakeSystem = /** @class */ (function (_super) {
        __extends(AwakeSystem, _super);
        function AwakeSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AwakeSystem.prototype.init = function () {
            _super.prototype.init.call(this, "awake");
        };
        AwakeSystem.prototype.update = function (dt) {
            for (var node = this.query.head; node; node = node.next) {
                node.value.awake();
                node.value && this.query.remove(node.value);
            }
        };
        return AwakeSystem;
    }(ecs.ComponentSystem));
    ecs.AwakeSystem = AwakeSystem;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    /**
     * @internal
     */
    var LateUpdateSystem = /** @class */ (function (_super) {
        __extends(LateUpdateSystem, _super);
        function LateUpdateSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LateUpdateSystem.prototype.init = function () {
            _super.prototype.init.call(this, "lateUpdate");
        };
        LateUpdateSystem.prototype.lateUpdate = function (dt, ut) {
            for (var node = this.query.head; node; node = node.next) {
                node.value.lateUpdate(dt, ut);
            }
        };
        return LateUpdateSystem;
    }(ecs.ComponentSystem));
    ecs.LateUpdateSystem = LateUpdateSystem;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    /**
     * @internal
     */
    var StartSystem = /** @class */ (function (_super) {
        __extends(StartSystem, _super);
        function StartSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StartSystem.prototype.init = function () {
            _super.prototype.init.call(this, "start");
        };
        StartSystem.prototype.update = function (dt) {
            for (var node = this.query.head; node; node = node.next) {
                var value = node.value;
                this.query.remove(node.value);
                value.start();
            }
        };
        return StartSystem;
    }(ecs.ComponentSystem));
    ecs.StartSystem = StartSystem;
})(ecs || (ecs = {}));
var ecs;
(function (ecs) {
    /**
     * @internal
     */
    var UpdateSystem = /** @class */ (function (_super) {
        __extends(UpdateSystem, _super);
        function UpdateSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UpdateSystem.prototype.init = function () {
            _super.prototype.init.call(this, "update");
        };
        UpdateSystem.prototype.update = function (dt) {
            for (var node = this.query.head; node; node = node.next) {
                node.value.update(dt);
            }
        };
        return UpdateSystem;
    }(ecs.ComponentSystem));
    ecs.UpdateSystem = UpdateSystem;
})(ecs || (ecs = {}));
//# sourceMappingURL=ecs.js.map