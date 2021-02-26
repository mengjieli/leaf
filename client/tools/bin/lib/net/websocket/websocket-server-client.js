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
var event_dispatcher_1 = require("./../../event/event-dispatcher");
var event_1 = require("./../../event/event");
var WebsocketServerClient = /** @class */ (function (_super) {
    __extends(WebsocketServerClient, _super);
    function WebsocketServerClient(connection, request, big) {
        if (big === void 0) { big = true; }
        var _this_1 = _super.call(this) || this;
        _this_1._hasConnected = true;
        _this_1._url = "";
        _this_1._big = big;
        _this_1._connection = connection;
        _this_1.request = request;
        var _this = _this_1;
        _this_1._connection.on('message', _this_1._onReceiveData.bind(_this_1));
        _this_1._connection.on('close', _this_1._onClose.bind(_this_1));
        _this_1.start && _this_1.start();
        return _this_1;
    }
    Object.defineProperty(WebsocketServerClient.prototype, "big", {
        get: function () {
            return this._big;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebsocketServerClient.prototype, "connection", {
        get: function () {
            return this._connection;
        },
        enumerable: true,
        configurable: true
    });
    WebsocketServerClient.prototype._onReceiveData = function (message) {
        var d = null;
        if (message.type == "binary") {
            this.dispatchWith(event_1.Event.DATA, message.binaryData);
            d = message.binaryData;
        }
        if (d.length <= 1) {
            this.send(new Uint8Array([0]));
            return;
        }
        this.receive && this.receive(d);
    };
    Object.defineProperty(WebsocketServerClient.prototype, "connected", {
        get: function () {
            return this._hasConnected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebsocketServerClient.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    WebsocketServerClient.prototype.close = function () {
        if (this._connection) {
            this._hasConnected = false;
            var connection = this._connection;
            this._connection = null;
            connection.close();
        }
    };
    WebsocketServerClient.prototype._onClose = function (e) {
        this._hasConnected = false;
        this._connection = null;
        this.dispatchWith(event_1.Event.CLOSE, e);
    };
    WebsocketServerClient.prototype.send = function (data) {
        if (this._connection)
            this._connection.sendBytes(Buffer.from(data));
    };
    return WebsocketServerClient;
}(event_dispatcher_1.EventDispatcher));
exports.WebsocketServerClient = WebsocketServerClient;
//# sourceMappingURL=websocket-server-client.js.map