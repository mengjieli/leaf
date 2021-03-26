"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher(target) {
        if (target === void 0) { target = null; }
        this.__hasDispose = false;
        this.__EventDispatcher = {
            0: target || this,
            1: {}
        };
    }
    Object.defineProperty(EventDispatcher.prototype, "hasDispose", {
        get: function () {
            return this.__hasDispose;
        },
        enumerable: true,
        configurable: true
    });
    EventDispatcher.prototype.destroy = function () {
        this.__EventDispatcher = null;
        this.__hasDispose = true;
    };
    EventDispatcher.prototype.$release = function () {
        this.__EventDispatcher = {
            0: this,
            1: {}
        };
    };
    /**
     *
     * @param type
     * @param listener
     * @param thisObject
     * @param priority 监听事件的优先级，暂未实现
     */
    EventDispatcher.prototype.once = function (type, listener, thisObject, priority, args) {
        if (priority === void 0) { priority = 0; }
        if (args === void 0) { args = null; }
        this.__addListener(type, listener, thisObject, priority, true, args);
    };
    /**
     *
     * @param type
     * @param listener
     * @param thisObject
     * @param priority 监听事件的优先级，暂未实现
     */
    EventDispatcher.prototype.addListener = function (type, listener, thisObject, priority, args) {
        if (priority === void 0) { priority = 0; }
        if (args === void 0) { args = null; }
        this.__addListener(type, listener, thisObject, priority, false, args);
    };
    /**
     * 监听事件
     * @param type
     * @param listener
     * @param thisObject
     * @param priority 监听事件的优先级，暂未实现
     * @param once
     * @private
     */
    EventDispatcher.prototype.__addListener = function (type, listener, thisObject, priority, once, args) {
        // if (DEBUG) {
        //     if (this.__hasDispose) {
        //         $error(1002);
        //     }
        //     if (type == null) {
        //         $error(1100);
        //     }
        //     if (listener == null) {
        //         $error(1101);
        //     }
        // }
        var values = this.__EventDispatcher;
        var events = values[1];
        var list = events[type];
        if (!list) {
            list = values[1][type] = [];
        }
        for (var i = 0, len = list.length; i < len; i++) {
            var item = list[i];
            var agrsame = item.args == args ? true : false;
            if (!agrsame && item.args && args) {
                var arg1 = item.args.length ? item.args : [item.args];
                var arg2 = args.length ? args : [args];
                if (arg1.length == arg2.length) {
                    agrsame = true;
                    for (var a = 0; a < arg1.length; a++) {
                        if (arg1[a] != arg2[a]) {
                            agrsame = false;
                            break;
                        }
                    }
                }
            }
            if (item.listener == listener && item.thisObject == thisObject && item.del == false && agrsame) {
                return false;
            }
        }
        list.push({ "listener": listener, "thisObject": thisObject, "once": once, "del": false, args: args });
    };
    EventDispatcher.prototype.removeListener = function (type, listener, thisObject) {
        if (this.__hasDispose) {
            return;
        }
        var values = this.__EventDispatcher;
        var events = values[1];
        var list = events[type];
        if (!list) {
            return;
        }
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i].listener == listener && list[i].thisObject == thisObject && list[i].del == false) {
                list[i].listener = null;
                list[i].thisObject = null;
                list[i].del = true;
                break;
            }
        }
    };
    EventDispatcher.prototype.removeAllListener = function () {
        if (this.__hasDispose) {
            return;
        }
        var values = this.__EventDispatcher;
        var events = values[1];
        events = {};
    };
    EventDispatcher.prototype.hasListener = function (type) {
        // if (DEBUG) {
        //     if (this.__hasDispose) {
        //         $error(1002);
        //     }
        // }
        var events = this.__EventDispatcher[1];
        var list = events[type];
        if (!list) {
            return false;
        }
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i].del == false) {
                return true;
            }
        }
        return false;
    };
    EventDispatcher.prototype.dispatch = function (event) {
        if (!this.__EventDispatcher) {
            return;
        }
        // if (DEBUG) {
        //     if (this.__hasDispose) {
        //         $error(1002);
        //     }
        // }
        var list = this.__EventDispatcher[1][event.type];
        if (!list) {
            return;
        }
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i].del == false) {
                var listener = list[i].listener;
                var thisObj = list[i].thisObject;
                if (event.$target == null) {
                    event.$target = this;
                }
                event.$currentTarget = this;
                var args = [event];
                if (list[i].args) {
                    args = args.concat(list[i].args);
                }
                if (list[i].once) {
                    list[i].listener = null;
                    list[i].thisObject = null;
                    list[i].del = true;
                }
                listener.apply(thisObj, args);
            }
        }
        for (i = 0; i < list.length; i++) {
            if (list[i].del == true) {
                list.splice(i, 1);
                i--;
            }
        }
    };
    EventDispatcher.prototype.dispatchWith = function (type, data) {
        if (data === void 0) { data = null; }
        // if (DEBUG) {
        //     if (this.__hasDispose) {
        //         $error(1002);
        //     }
        // }
        var e = event_1.Event.create(type, data);
        e.$target = this;
        this.dispatch(e);
        event_1.Event.release(e);
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;
//# sourceMappingURL=event-dispatcher.js.map