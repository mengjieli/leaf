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
var behaviorTree;
(function (behaviorTree) {
    var Node = /** @class */ (function () {
        function Node() {
            this.children = [];
            this.isLeaf = false;
        }
        return Node;
    }());
    behaviorTree.Node = Node;
    var EMState;
    (function (EMState) {
        EMState["SUCCESS"] = "success";
        EMState["FAILURE"] = "failure";
        EMState["RUNNING"] = "ruinning";
    })(EMState = behaviorTree.EMState || (behaviorTree.EMState = {}));
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    var RunningData = /** @class */ (function () {
        function RunningData() {
            this.stack = [];
            this.loops = [];
        }
        RunningData.prototype.destroy = function () {
            this.currentNode = null;
            this.nextNode = null;
            this.stack.length = 0;
            this.loops.length = 0;
            this.tree = null;
            this.data = null;
            RunningData.pool.push(this);
        };
        RunningData.prototype.runToLeafRunning = function () {
            while (this.nextNode) {
                this.nextNode.run(this);
                if (this.currentState === behaviorTree.EMState.RUNNING &&
                    this.currentNode && this.currentNode.isLeaf)
                    break;
            }
        };
        RunningData.create = function (tree, data) {
            var stack;
            if (this.pool.length) {
                stack = this.pool.pop();
            }
            else {
                stack = new RunningData();
            }
            stack.tree = tree;
            if (tree.root) {
                stack.nextNode = tree.root;
            }
            stack.data = data;
            return stack;
        };
        RunningData.pool = [];
        return RunningData;
    }());
    behaviorTree.RunningData = RunningData;
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    var Tree = /** @class */ (function () {
        function Tree() {
        }
        Tree.createWithJSON = function (json) {
            var tree = new Tree();
            tree.nodeMap = {};
            tree.leafMap = {};
            tree.root = this.createNode(tree, null, json.root);
            return tree;
        };
        Tree.createNode = function (tree, parent, cfg) {
            var e_1, _a;
            var node;
            if (cfg.type === "leaf") {
                node = new behaviorTree.Leaf();
                node.isLeaf = true;
                if (!tree.leafMap[cfg.name])
                    tree.leafMap[cfg.name] = [];
                tree.leafMap[cfg.name].push(node);
            }
            else if (cfg.type === "inverter")
                node = new behaviorTree.Inverter();
            else if (cfg.type === "repeat-until-fail")
                node = new behaviorTree.RepeatUntilFail();
            else if (cfg.type === "repeater") {
                node = new behaviorTree.Repeater();
                node.init(cfg.loop || 0);
            }
            else if (cfg.type === "selector")
                node = new behaviorTree.Selector();
            else if (cfg.type === "sequence")
                node = new behaviorTree.Sequence();
            else if (cfg.type === "succeeder")
                node = new behaviorTree.Succeeder();
            node.name = cfg.name;
            node.data = cfg.data;
            node.parent = parent;
            // if (node.name && tree.nodeMap[node.name]) console.error("节点名称重复:" + node.name);
            tree.nodeMap[node.name] = node;
            if (parent)
                parent.children.push(node);
            if (cfg.children) {
                try {
                    for (var _b = __values(cfg.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        if (!child)
                            continue;
                        this.createNode(tree, node, child);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return node;
        };
        return Tree;
    }());
    behaviorTree.Tree = Tree;
    window["behaviorTree"] = behaviorTree;
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    var Composite = /** @class */ (function (_super) {
        __extends(Composite, _super);
        function Composite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Composite;
    }(behaviorTree.Node));
    behaviorTree.Composite = Composite;
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    var Decorator = /** @class */ (function (_super) {
        __extends(Decorator, _super);
        function Decorator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Decorator.prototype.run = function (data) {
            var currentState = data.currentState;
            var lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入节点
            if (lastNode === this.parent || lastNode === null) {
                if (this.children.length === 0) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = behaviorTree.EMState.SUCCESS;
                }
                else {
                    data.nextNode = this.children[0];
                    return data.currentState = behaviorTree.EMState.RUNNING;
                }
            }
            //如果子节点返回
            var index = this.children.indexOf(lastNode);
            if (index < this.children.length - 1) {
                data.nextNode = this.children[index + 1];
                return data.currentState = behaviorTree.EMState.RUNNING;
            }
            return currentState;
        };
        return Decorator;
    }(behaviorTree.Node));
    behaviorTree.Decorator = Decorator;
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    var Leaf = /** @class */ (function (_super) {
        __extends(Leaf, _super);
        function Leaf() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Leaf.prototype.run = function (data) {
            var lastNode = data.currentNode;
            data.currentNode = this;
            if (lastNode !== this) {
                if (!this.execute) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = behaviorTree.EMState.SUCCESS;
                }
                var state_1 = this.execute(data);
                if (state_1 != behaviorTree.EMState.RUNNING) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = state_1;
                }
                return data.currentState = behaviorTree.EMState.RUNNING;
            }
            var state = this.execute(data);
            if (state != behaviorTree.EMState.RUNNING) {
                data.nextNode = data.stack.pop();
                return data.currentState = state;
            }
            return data.currentState = behaviorTree.EMState.RUNNING;
        };
        return Leaf;
    }(behaviorTree.Node));
    behaviorTree.Leaf = Leaf;
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    /**
     * 单个子节点
     */
    var Inverter = /** @class */ (function (_super) {
        __extends(Inverter, _super);
        function Inverter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Inverter.prototype.run = function (data) {
            var currentState = data.currentState;
            var lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入节点
            if (lastNode === this.parent || lastNode === null) {
                if (this.children.length === 0) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = behaviorTree.EMState.SUCCESS;
                }
                else {
                    data.nextNode = this.children[0];
                    data.stack.push(this);
                    return data.currentState = behaviorTree.EMState.RUNNING;
                }
            }
            //子节点跑完
            data.nextNode = data.stack.pop();
            return data.currentState = currentState === behaviorTree.EMState.SUCCESS ? behaviorTree.EMState.FAILURE : behaviorTree.EMState.SUCCESS;
        };
        return Inverter;
    }(behaviorTree.Decorator));
    behaviorTree.Inverter = Inverter;
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    var RepeatUntilFail = /** @class */ (function (_super) {
        __extends(RepeatUntilFail, _super);
        function RepeatUntilFail() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RepeatUntilFail.prototype.run = function (data) {
            var lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入节点
            if (lastNode === this.parent || lastNode === null) {
                if (this.children.length === 0) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = behaviorTree.EMState.SUCCESS;
                }
                else {
                    data.nextNode = this.children[0];
                    data.stack.push(this);
                    return data.currentState = behaviorTree.EMState.RUNNING;
                }
            }
            //如果子节点返回 fail 则直接返回
            if (data.currentState === behaviorTree.EMState.FAILURE) {
                data.nextNode = data.stack.pop();
                return data.currentState = behaviorTree.EMState.FAILURE;
            }
            data.nextNode = this.children[0];
            data.stack.push(this);
            return data.currentState = behaviorTree.EMState.RUNNING;
        };
        return RepeatUntilFail;
    }(behaviorTree.Decorator));
    behaviorTree.RepeatUntilFail = RepeatUntilFail;
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    var Repeater = /** @class */ (function (_super) {
        __extends(Repeater, _super);
        function Repeater() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.loop = -1;
            return _this;
        }
        Repeater.prototype.init = function (loop) {
            this.loop = loop;
        };
        Repeater.prototype.run = function (data) {
            var lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入节点
            if (lastNode === this.parent || lastNode === null) {
                if (this.children.length === 0) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = behaviorTree.EMState.SUCCESS;
                }
                else {
                    data.loops.push(this.loop);
                    data.loops[data.loops.length]--;
                    data.nextNode = this.children[0];
                    data.stack.push(this);
                    return data.currentState = behaviorTree.EMState.RUNNING;
                }
            }
            //子节点跑完
            var loop = data.loops[data.loops.length];
            if (loop !== 0) {
                data.loops[data.loops.length]--;
                data.nextNode = this.children[0];
                data.stack.push(this);
                return data.currentState = behaviorTree.EMState.RUNNING;
            }
            data.nextNode = data.stack.pop();
            data.loops.pop();
            return data.currentState = behaviorTree.EMState.SUCCESS;
        };
        return Repeater;
    }(behaviorTree.Decorator));
    behaviorTree.Repeater = Repeater;
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    var Selector = /** @class */ (function (_super) {
        __extends(Selector, _super);
        function Selector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Selector.prototype.run = function (data) {
            var currentState = data.currentState;
            var lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入子节点
            if (lastNode === this.parent || lastNode === null) {
                if (this.children.length === 0) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = behaviorTree.EMState.SUCCESS;
                }
                else {
                    data.nextNode = this.children[0];
                    data.stack.push(this);
                    return data.currentState = behaviorTree.EMState.RUNNING;
                }
            }
            //如果子节点返回的是 success 则直接返回结果
            if (currentState === behaviorTree.EMState.SUCCESS) {
                data.nextNode = data.stack.pop();
                return data.currentState = currentState;
            }
            //否则进入下一个子节点
            var index = this.children.indexOf(lastNode);
            if (index < this.children.length - 1) {
                data.nextNode = this.children[index + 1];
                data.stack.push(this);
                return data.currentState = behaviorTree.EMState.RUNNING;
            }
            //所有子节点跑完
            data.nextNode = data.stack.pop();
            return data.currentState = currentState;
        };
        return Selector;
    }(behaviorTree.Composite));
    behaviorTree.Selector = Selector;
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    var Sequence = /** @class */ (function (_super) {
        __extends(Sequence, _super);
        function Sequence() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sequence.prototype.run = function (data) {
            var currentState = data.currentState;
            var lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入子节点
            if (lastNode === this.parent || lastNode === null) {
                if (this.children.length === 0) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = behaviorTree.EMState.SUCCESS;
                }
                else {
                    data.nextNode = this.children[0];
                    data.stack.push(this);
                    return data.currentState = behaviorTree.EMState.RUNNING;
                }
            }
            //如果子节点返回的是 failure 则直接返回结果
            if (currentState === behaviorTree.EMState.FAILURE) {
                data.nextNode = data.stack.pop();
                return data.currentState = currentState;
            }
            //否则进入下一个子节点
            var index = this.children.indexOf(lastNode);
            if (index < this.children.length - 1) {
                data.nextNode = this.children[index + 1];
                data.stack.push(this);
                return data.currentState = behaviorTree.EMState.RUNNING;
            }
            //所有子节点跑完
            data.nextNode = data.stack.pop();
            return data.currentState = currentState;
        };
        return Sequence;
    }(behaviorTree.Composite));
    behaviorTree.Sequence = Sequence;
})(behaviorTree || (behaviorTree = {}));
var behaviorTree;
(function (behaviorTree) {
    /**
     * 单个子节点
     */
    var Succeeder = /** @class */ (function (_super) {
        __extends(Succeeder, _super);
        function Succeeder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Succeeder.prototype.run = function (data) {
            var lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入节点
            if (lastNode === this.parent || lastNode === null) {
                if (this.children.length === 0) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = behaviorTree.EMState.SUCCESS;
                }
                else {
                    data.nextNode = this.children[0];
                    data.stack.push(this);
                    return data.currentState = behaviorTree.EMState.RUNNING;
                }
            }
            //子节点跑完
            data.nextNode = data.stack.pop();
            return data.currentState = behaviorTree.EMState.SUCCESS;
        };
        return Succeeder;
    }(behaviorTree.Decorator));
    behaviorTree.Succeeder = Succeeder;
})(behaviorTree || (behaviorTree = {}));
//# sourceMappingURL=behavior-tree.js.map