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
var lse;
(function (lse) {
    var Item = /** @class */ (function () {
        function Item() {
        }
        Item.prototype.init = function (type, world, id, data, player) {
            this.type = type;
            this.world = world;
            this.id = id;
            data.lockStepItem = this;
            this.data = data;
            this.player = player;
        };
        Object.defineProperty(Item.prototype, "showData", {
            get: function () {
                return this.world.items[lse.EMWorldType.SHOW].getById(this.id).data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "syncData", {
            get: function () {
                return this.world.items[lse.EMWorldType.SHOW].getById(this.id).data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "realData", {
            get: function () {
                return this.world.items[lse.EMWorldType.SHOW].getById(this.id).data;
            },
            enumerable: true,
            configurable: true
        });
        Item.prototype.onDestroy = function () {
            this.world = null;
            this.data = null;
            this.player = null;
        };
        return Item;
    }());
    lse.Item = Item;
})(lse || (lse = {}));
var lse;
(function (lse) {
    var Link = /** @class */ (function () {
        function Link(key) {
            if (key === void 0) { key = "id"; }
            this.head = null;
            this.tail = null;
            this.length = 0;
            this.nodes = {};
            this.key = key;
        }
        Link.prototype.add = function (item) {
            if (Link.debugPoints && Link.addPoints.length) {
                for (var node_1 = Link.addPoints.head; node_1; node_1 = node_1.next) {
                    if (node_1.value[this.key] == item[this.key]) {
                        node_1.value.call && node_1.value.call();
                        Link.addPoints.remove(node_1.value);
                    }
                }
            }
            Link.addCount++;
            var key = item[this.key];
            if (this.nodes[key] !== undefined) {
                return;
            }
            var node = lse.ObjectPools.linkPool.length ? lse.ObjectPools.linkPool.pop() : new Node();
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
        Link.prototype.removeById = function (id) {
            var item = this.nodes[id];
            if (!item)
                return;
            this.remove(item.value);
        };
        Link.prototype.remove = function (item) {
            if (Link.debugPoints && Link.removePoints.length) {
                for (var node_2 = Link.removePoints.head; node_2; node_2 = node_2.next) {
                    if (node_2.value[this.key] == item[this.key]) {
                        node_2.value.call && node_2.value.call();
                        Link.removePoints.remove(node_2.value);
                    }
                }
            }
            var key = item[this.key];
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
            lse.ObjectPools.linkPrePool.push(node);
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
            return this.nodes[item[this.key]] !== undefined;
        };
        Link.prototype.get = function (item) {
            if (this.nodes[item[this.key]] === undefined)
                return;
            return this.nodes[item[this.key]].value;
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
                    lse.ObjectPools.releaseRecyableObject(node.value);
                }
                next = node._next;
                node.value = null;
                lse.ObjectPools.linkPrePool.push(node);
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
    lse.Link = Link;
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
    lse.Node = Node;
})(lse || (lse = {}));
var lse;
(function (lse) {
    lse.debug = false;
    var RecyclableClassType = /** @class */ (function () {
        function RecyclableClassType() {
        }
        return RecyclableClassType;
    }());
    lse.RecyclableClassType = RecyclableClassType;
    var ObjectPools = /** @class */ (function () {
        function ObjectPools() {
        }
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
            lse.debug && this.weakSet.add(obj);
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
            if (lse.debug) {
                if (!this.all[id]) {
                    console.error("[lock step engine] realse id error:" + id);
                    // error(EMError.RELEASE_ID_ERROR);
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
        /**
         * @internal
         */
        ObjectPools.linkPool = [];
        ObjectPools.objectClasses = [];
        /**
         * @internal
         */
        ObjectPools.linkPrePool = [];
        return ObjectPools;
    }());
    lse.ObjectPools = ObjectPools;
})(lse || (lse = {}));
var lse;
(function (lse) {
    var PlayerAction = /** @class */ (function () {
        function PlayerAction(type, data) {
            this.type = type;
            this.data = data;
        }
        PlayerAction.prototype.encode = function () {
            return {
                type: this.type,
                data: this.data
            };
        };
        PlayerAction.prototype.decode = function (cfg) {
            this.type = cfg.type;
            this.data = cfg.data;
        };
        return PlayerAction;
    }());
    lse.PlayerAction = PlayerAction;
})(lse || (lse = {}));
var lse;
(function (lse) {
    var PlayerFrame = /** @class */ (function () {
        function PlayerFrame(playerId, frame) {
            this.actions = [];
            this.playerId = playerId;
            this.frame = frame;
        }
        PlayerFrame.prototype.encode = function () {
            var e_1, _a;
            var actions = [];
            try {
                for (var _b = __values(this.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var a = _c.value;
                    actions.push(a.encode());
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return {
                playerId: this.playerId,
                frame: this.frame,
                actions: actions
            };
        };
        PlayerFrame.prototype.decode = function (cfg) {
            var e_2, _a;
            this.playerId = cfg.playerId;
            this.frame = cfg.frame;
            this.actions.length = 0;
            try {
                for (var _b = __values(cfg.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var a = _c.value;
                    var action = new lse.PlayerAction(0);
                    action.decode(a);
                    this.actions.push(action);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        return PlayerFrame;
    }());
    lse.PlayerFrame = PlayerFrame;
})(lse || (lse = {}));
var lse;
(function (lse) {
    var Player = /** @class */ (function () {
        function Player(id, local, extendedData) {
            this.frame = 0;
            /**
             * @internal
             */
            this.frames = [];
            this.id = id;
            this.local = local;
            this.extendedData = extendedData;
        }
        Player.prototype.getFrameData = function (frame) {
            var e_3, _a;
            try {
                for (var _b = __values(this.frames), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var data = _c.value;
                    if (data.frame === frame)
                        return data;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        return Player;
    }());
    lse.Player = Player;
})(lse || (lse = {}));
var lse;
(function (lse) {
    var World = /** @class */ (function () {
        /**
         *
         * @param frameTime 一帧运行的时间(毫秒)
         */
        function World(frameTime, extendedData) {
            if (frameTime === void 0) { frameTime = 16; }
            this.frame = {};
            this.frame[EMWorldType.SHOW] = 0;
            this.frame[EMWorldType.SYNC] = 0;
            this.frame[EMWorldType.REAL] = 0;
            this.itemIds = {};
            this.itemIds[EMWorldType.SHOW] = 0;
            this.itemIds[EMWorldType.SYNC] = 0;
            this.itemIds[EMWorldType.REAL] = 0;
            this.frameTime = frameTime;
            this.extendedData = extendedData;
            this.players = {};
            this.players[EMWorldType.SHOW] = new lse.Link();
            this.players[EMWorldType.SYNC] = new lse.Link();
            this.players[EMWorldType.REAL] = new lse.Link();
            this.items = {};
            this.items[EMWorldType.SHOW] = new lse.Link();
            this.items[EMWorldType.SYNC] = new lse.Link();
            this.items[EMWorldType.REAL] = new lse.Link();
        }
        World.prototype.clear = function () {
            this.extendedData = null;
            this.frame[EMWorldType.SHOW] = 0;
            this.frame[EMWorldType.SYNC] = 0;
            this.frame[EMWorldType.REAL] = 0;
            this.itemIds[EMWorldType.SHOW] = 0;
            this.itemIds[EMWorldType.SYNC] = 0;
            this.itemIds[EMWorldType.REAL] = 0;
            this.players = {};
            this.items = {};
        };
        World.prototype.getNewItemId = function (type) {
            return this.itemIds[type]++;
        };
        Object.defineProperty(World.prototype, "showFrame", {
            /**
             * 当前显示的帧序号
             */
            get: function () {
                return this.frame[EMWorldType.SHOW];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(World.prototype, "syncFrame", {
            /**
             * 同步预测的帧序号
             */
            get: function () {
                return this.frame[EMWorldType.SYNC];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(World.prototype, "realFrame", {
            /**
             * 真实的帧序号
             */
            get: function () {
                return this.frame[EMWorldType.REAL];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加玩家
         * @param id
         * @param data
         * @param extendedData
         */
        World.prototype.addPlayer = function (id, local, extendedData, worldType) {
            if (worldType === void 0) { worldType = EMWorldType.ALL; }
            if (worldType & EMWorldType.SHOW) {
                this.players[EMWorldType.SHOW].add(new lse.Player(id, local, extendedData));
            }
            if (worldType & EMWorldType.SYNC) {
                this.players[EMWorldType.SYNC].add(new lse.Player(id, local, extendedData));
            }
            if (worldType & EMWorldType.REAL) {
                this.players[EMWorldType.REAL].add(new lse.Player(id, local, extendedData));
            }
        };
        /**
         * 删除玩家
         * @param id
         */
        World.prototype.removePlayer = function (id, worldType) {
            if (worldType === void 0) { worldType = EMWorldType.ALL; }
            if (worldType & EMWorldType.SHOW) {
                this.players[EMWorldType.SHOW].removeById(id);
            }
            if (worldType & EMWorldType.SYNC) {
                this.players[EMWorldType.SYNC].removeById(id);
            }
            if (worldType & EMWorldType.REAL) {
                this.players[EMWorldType.REAL].removeById(id);
            }
        };
        Object.defineProperty(World.prototype, "currentItems", {
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        World.prototype.addPlayerFrame = function (id, frame, worldType) {
            if (worldType === void 0) { worldType = EMWorldType.ALL; }
            if (worldType & EMWorldType.REAL) {
                var player = this.players[EMWorldType.REAL].getById(id);
                if (player) {
                    player.frame = frame;
                    var frameData = player.getFrameData(frame);
                    if (!frameData) {
                        frameData = new lse.PlayerFrame(id, frame);
                        player.frames.push(frameData);
                    }
                }
            }
            if (worldType & EMWorldType.SYNC) {
                var player = this.players[EMWorldType.SYNC].getById(id);
                if (player) {
                    player.frame = frame;
                    var frameData = player.getFrameData(frame);
                    if (!frameData) {
                        frameData = new lse.PlayerFrame(id, frame);
                        player.frames.push(frameData);
                    }
                }
            }
            if (worldType & EMWorldType.SHOW) {
                var player = this.players[EMWorldType.SHOW].getById(id);
                if (player) {
                    player.frame = frame;
                    var frameData = player.getFrameData(frame);
                    if (!frameData) {
                        frameData = new lse.PlayerFrame(id, frame);
                        player.frames.push(frameData);
                    }
                }
            }
        };
        World.prototype.addPlayerAction = function (id, type, data, frame, worldType) {
            if (frame === void 0) { frame = -1; }
            if (worldType === void 0) { worldType = EMWorldType.ALL; }
            if (frame === -1)
                frame = this.showFrame + 1;
            this.addPlayerFrame(id, frame, worldType);
            if (worldType & EMWorldType.REAL) {
                var player = this.players[EMWorldType.REAL].getById(id);
                if (player) {
                    var frameData = player.getFrameData(frame);
                    var action = new lse.PlayerAction(type, data);
                    frameData.actions.push(action);
                }
            }
            if (worldType & EMWorldType.SYNC) {
                var player = this.players[EMWorldType.SYNC].getById(id);
                if (player) {
                    var frameData = player.getFrameData(frame);
                    var action = new lse.PlayerAction(type, data);
                    frameData.actions.push(action);
                }
            }
            if (worldType & EMWorldType.SHOW) {
                var player = this.players[EMWorldType.SHOW].getById(id);
                if (player) {
                    var frameData = player.getFrameData(frame);
                    var action = new lse.PlayerAction(type, data);
                    frameData.actions.push(action);
                }
            }
        };
        World.prototype.addItem = function (id, data, playerId, worldType) {
            if (playerId === void 0) { playerId = -1; }
            this.items[worldType].add(lse.ObjectPools.createRecyableObject(lse.Item, worldType, this, id, data, this.players[worldType].getById(playerId)));
        };
        World.prototype.removeItem = function (id, worldType) {
            var item = this.items[worldType].getById(id);
            if (item) {
                this.items[worldType].remove(item);
                lse.ObjectPools.releaseRecyableObject(item);
            }
        };
        World.prototype.update = function () {
            this.updateRealWorld();
            this.updateSyncWorld();
            this.updateShowWorld();
            this.syncShowWorld(this.items[EMWorldType.SHOW], this.items[EMWorldType.SYNC], EMWorldType.SYNC, this);
            lse.ObjectPools.clearLinkPrePool();
        };
        /**
         * @internal
         */
        World.prototype.updateRealWorld = function () {
            var e_4, _a;
            this._items = this.items[EMWorldType.REAL];
            var isOk = true;
            var hasUpdateAndHasAction = false;
            while (isOk && this.realFrame < this.showFrame + 1) {
                isOk = true;
                var frame = this.realFrame;
                for (var node = this.players[EMWorldType.REAL].head; node; node = node.next) {
                    var player = node.value;
                    if (!player.getFrameData(frame)) {
                        isOk = false;
                        break;
                    }
                }
                if (!isOk)
                    break;
                //执行操作
                for (var node = this.players[EMWorldType.REAL].head; node; node = node.next) {
                    var player = node.value;
                    var frameData = player.getFrameData(frame);
                    player.frames.splice(player.frames.indexOf(frameData), 1);
                    if (frameData.actions.length) {
                        try {
                            for (var _b = __values(frameData.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var action = _c.value;
                                hasUpdateAndHasAction = true;
                                this.executePlayerAction(this.items[EMWorldType.REAL], player, action, EMWorldType.REAL, this);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
                //运行一帧
                this.runFrame(this.currentItems, EMWorldType.REAL, this);
                this.frame[EMWorldType.REAL]++;
                this.itemIds[EMWorldType.REAL] = 0;
                if (!this.players[EMWorldType.REAL].length)
                    break;
            }
            if (!hasUpdateAndHasAction)
                return;
            //同步预测世界
            //目前采用每次逻辑帧回来都回滚
            var realItems = this.items[EMWorldType.REAL];
            var syncItems = this.items[EMWorldType.SYNC];
            //复制已有的数据和删除无用数据
            for (var node = syncItems.head; node; node = node.next) {
                var realItem = realItems.getById(node.value.id);
                if (!realItem) {
                    node.value.data.dispose();
                    syncItems.remove(node.value);
                }
                else {
                    realItem.data.copyTo(node.value.data, EMWorldType.SYNC);
                }
            }
            //创建没有的数据
            for (var node = realItems.head; node; node = node.next) {
                var syncItem = syncItems.getById(node.value.id);
                if (!syncItem) {
                    this.items[EMWorldType.SYNC].add(lse.ObjectPools.createRecyableObject(lse.Item, EMWorldType.SYNC, this, node.value.id, node.value.data.clone(EMWorldType.SYNC), node.value.player ? this.players[EMWorldType.SYNC].getById(node.value.player.id) : null));
                }
            }
            this.frame[EMWorldType.SYNC] = this.frame[EMWorldType.REAL];
            this.itemIds[EMWorldType.SYNC] = this.itemIds[EMWorldType.REAL];
        };
        /**
         * @internal
         */
        World.prototype.updateSyncWorld = function () {
            var e_5, _a, e_6, _b;
            this._items = this.items[EMWorldType.SYNC];
            while (this.syncFrame <= this.frame[EMWorldType.SHOW]) {
                var frame = this.syncFrame;
                //执行操作
                for (var node = this.players[EMWorldType.SYNC].head; node; node = node.next) {
                    var player = node.value;
                    //清理过期的帧数据
                    for (var i = 0; i < player.frames.length; i++) {
                        if (player.frames[i].frame < this.realFrame) {
                            if (player.frames[i].actions.length) {
                                try {
                                    for (var _c = __values(player.frames[i].actions), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        var action = _d.value;
                                        this.executePlayerAction(this.items[EMWorldType.SYNC], player, action, EMWorldType.SYNC, this);
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                            }
                            player.frames.splice(i, 1);
                            i--;
                        }
                    }
                    var frameData = player.getFrameData(frame);
                    if (!frameData)
                        continue;
                    if (frame < this.realFrame) {
                        player.frames.splice(player.frames.indexOf(frameData), 1);
                    }
                    if (frameData.actions.length) {
                        try {
                            for (var _e = __values(frameData.actions), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var action = _f.value;
                                this.executePlayerAction(this.items[EMWorldType.SYNC], player, action, EMWorldType.SYNC, this);
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                    }
                }
                //运行一帧
                this.runFrame(this.currentItems, EMWorldType.SYNC, this);
                this.frame[EMWorldType.SYNC]++;
                this.itemIds[EMWorldType.SYNC] = 0;
            }
        };
        /**
         * @internal
         */
        World.prototype.updateShowWorld = function () {
            var e_7, _a, e_8, _b;
            this._items = this.items[EMWorldType.SHOW];
            var frame = this.showFrame;
            //执行操作
            for (var node = this.players[EMWorldType.SHOW].head; node; node = node.next) {
                var player = node.value;
                //清理过期的帧数据
                for (var i = 0; i < player.frames.length; i++) {
                    if (player.frames[i].frame < this.realFrame) {
                        if (player.frames[i].actions.length) {
                            try {
                                for (var _c = __values(player.frames[i].actions), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var action = _d.value;
                                    this.executePlayerAction(this.items[EMWorldType.SHOW], player, action, EMWorldType.SHOW, this);
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                        }
                        player.frames.splice(i, 1);
                        i--;
                    }
                }
                var frameData = player.getFrameData(frame);
                if (!frameData)
                    continue;
                if (frameData.actions.length) {
                    try {
                        for (var _e = __values(frameData.actions), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var action = _f.value;
                            this.executePlayerAction(this.items[EMWorldType.SHOW], player, action, EMWorldType.SHOW, this);
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                }
                player.frames.splice(player.frames.indexOf(frameData), 1);
            }
            //运行一帧
            this.runFrame(this.currentItems, EMWorldType.SHOW, this);
            this.frame[EMWorldType.SHOW]++;
            this.itemIds[EMWorldType.SHOW] = 0;
        };
        return World;
    }());
    lse.World = World;
    var EMWorldType;
    (function (EMWorldType) {
        EMWorldType[EMWorldType["SHOW"] = 1] = "SHOW";
        EMWorldType[EMWorldType["SYNC"] = 2] = "SYNC";
        EMWorldType[EMWorldType["REAL"] = 4] = "REAL";
        EMWorldType[EMWorldType["SHOW_SYNC"] = 3] = "SHOW_SYNC";
        EMWorldType[EMWorldType["SHOW_REAL"] = 5] = "SHOW_REAL";
        EMWorldType[EMWorldType["SYNC_REAL"] = 6] = "SYNC_REAL";
        EMWorldType[EMWorldType["ALL"] = 7] = "ALL";
    })(EMWorldType = lse.EMWorldType || (lse.EMWorldType = {}));
})(lse || (lse = {}));
window["lse"] = lse;
//# sourceMappingURL=lock-step-engine.js.map