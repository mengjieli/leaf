"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var webSocket = require('websocket').server;
var http = require('http');
var event_dispatcher_1 = require("./../../event/event-dispatcher");
var event_1 = require("./../../event/event");
var websocket_server_client_1 = require("./websocket-server-client");
var WebsocketServer = /** @class */ (function (_super) {
    __extends(WebsocketServer, _super);
    function WebsocketServer(clientClass, big) {
        if (big === void 0) { big = true; }
        var _this_1 = _super.call(this) || this;
        _this_1._big = big;
        _this_1._clientClass = clientClass || websocket_server_client_1.WebsocketServerClient;
        _this_1._server = null;
        _this_1._clients = [];
        return _this_1;
    }
    Object.defineProperty(WebsocketServer.prototype, "big", {
        /**
         * 表示服务器是 大端还是小端，目前主流服务器都是大端
         */
        get: function () {
            return this._big;
        },
        enumerable: true,
        configurable: true
    });
    WebsocketServer.prototype.start = function (port) {
        var server = http.createServer(function (request, response) {
        });
        server.listen(port, function () {
            //console.log("Server on " + port);
        });
        this._server = new webSocket({
            // WebSocket server is tied to a HTTP server. WebSocket request is just
            // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
            httpServer: server
        });
        var _this = this;
        this._server.on('request', this._connectClient.bind(this));
    };
    WebsocketServer.prototype.stop = function () {
        this._server.stop();
    };
    WebsocketServer.prototype._connectClient = function (request) {
        var connection = request.accept(null, request.origin);
        var client = new this._clientClass(connection, request, this.big);
        client.addListener(event_1.Event.CLOSE, this._closeClient, this);
        this._clients.push(client);
        this.dispatchWith(event_1.Event.CONNECT, client);
        return client;
    };
    WebsocketServer.prototype._closeClient = function (event) {
        var client = event.currentTarget;
        for (var i = 0, len = this._clients.length; i < len; i++) {
            if (this._clients[i] == client) {
                this._clients.splice(i, 1);
                break;
            }
        }
        return client;
    };
    return WebsocketServer;
}(event_dispatcher_1.EventDispatcher));
exports.WebsocketServer = WebsocketServer;
//# sourceMappingURL=websocket-server.js.map