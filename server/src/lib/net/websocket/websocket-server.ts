var webSocket = require('websocket').server;
var http = require('http');

import { EventDispatcher } from './../../event/event-dispatcher'
import { Event } from './../../event/event'
import { WebsocketServerClient } from './websocket-server-client'

export class WebsocketServer extends EventDispatcher {

    constructor(clientClass?: any, big = true) {
        super();
        this._big = big;
        this._clientClass = clientClass || WebsocketServerClient;
        this._server = null;
        this._clients = [];
    }

    private _big: boolean;
    /**
     * 表示服务器是 大端还是小端，目前主流服务器都是大端
     */
    public get big(): boolean {
        return this._big;
    }

    private _clientClass;

    private _server;

    private _clients: Array<any>;

    public start(port) {
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
    }

    public stop(): void {
        this._server.stop();
    }

    private _connectClient(request) {
        var connection = request.accept(null, request.origin);
        var client = new this._clientClass(connection, request, this.big);
        client.addListener(Event.CLOSE, this._closeClient, this);
        this._clients.push(client);
        this.dispatchWith(Event.CONNECT, client);
        return client;
    }

    private _closeClient(event) {
        var client = event.currentTarget;
        for (var i = 0, len = this._clients.length; i < len; i++) {
            if (this._clients[i] == client) {
                this._clients.splice(i, 1);
                break;
            }
        }
        return client;
    }
}