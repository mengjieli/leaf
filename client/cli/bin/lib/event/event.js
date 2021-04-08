"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event(type) {
        this.$cycle = false;
        this.$target = null;
        this.$currentTarget = null;
        this._isPropagationStopped = false;
        this.$type = type;
        // this.$bubbles = bubbles;
    }
    Event.prototype.stopPropagation = function () {
        this._isPropagationStopped = true;
    };
    Object.defineProperty(Event.prototype, "isPropagationStopped", {
        get: function () {
            return this._isPropagationStopped;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "type", {
        get: function () {
            return this.$type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "target", {
        // get bubbles() {
        //     return this.$bubbles;
        // }
        get: function () {
            return this.$target;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "currentTarget", {
        get: function () {
            return this.$currentTarget;
        },
        enumerable: true,
        configurable: true
    });
    Event.create = function (type, data, bubbles) {
        if (data === void 0) { data = null; }
        if (bubbles === void 0) { bubbles = false; }
        var e;
        if (!Event._eventPool.length) {
            e = new Event(type);
        }
        else {
            e = Event._eventPool.pop();
            e.$cycle = false;
        }
        e.$type = type;
        e.$bubbles = bubbles;
        e.data = data;
        return e;
    };
    Event.release = function (e) {
        if (e.$cycle) {
            return;
        }
        e.$cycle = true;
        e.data = null;
        Event._eventPool.push(e);
    };
    Event.SEND = "send";
    Event.DATA = "data";
    Event.READY = "ready";
    Event.COMPLETE = "complete";
    Event.ADDED = "added";
    Event.REMOVED = "removed";
    Event.ADD = "add";
    Event.REMOVE = "remove";
    Event.ADDED_TO_STAGE = "added_to_stage";
    Event.REMOVED_FROM_STAGE = "removed_from_stage";
    Event.CONNECT = "connect";
    Event.CONNECT_ERROR = "connect_error";
    Event.CLOSE = "close";
    Event.CHANGE = "change";
    Event.ERROR = "error";
    Event.FOCUS_IN = "focus_in";
    Event.FOCUS_OUT = "focus_out";
    Event.CONFIRM = "confirm";
    Event.CANCEL = "cancel";
    Event.START_INPUT = "start_input";
    Event.STOP_INPUT = "stop_input";
    Event.DISTORT = "distort";
    Event.CREATION_COMPLETE = "creation_complete";
    Event.SELECTED_ITEM_CHANGE = "selected_item_change";
    Event.CLICK_ITEM = "click_item";
    Event.TOUCH_BEGIN_ITEM = "touch_begin_item";
    Event._eventPool = [];
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=event.js.map