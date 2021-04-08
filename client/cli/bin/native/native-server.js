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
var lib = require("../lib/lib");
require("./../../../libs/mobx/mobx");
require("./../../../libs/msgpack/msgpack");
require("./../../../libs/orange/orange");
var command = require("./command/command");
var args = process.argv;
var rootPath = args[2];
var orangePath = args[3];
global["params"] = {
    rootPath: rootPath,
    orangePath: orangePath
};
var NativeServer = /** @class */ (function () {
    function NativeServer(port) {
        var server = new lib.WebsocketServer(NativeServerClient);
        server.start(port);
    }
    return NativeServer;
}());
exports.NativeServer = NativeServer;
var NativeServerClient = /** @class */ (function (_super) {
    __extends(NativeServerClient, _super);
    function NativeServerClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastSeq = 0;
        return _this;
    }
    NativeServerClient.prototype.start = function () {
        var url = decodeURIComponent(this.request.resource.slice(2, this.request.resource.length));
        // console.log('[客户端连上]', url);
    };
    NativeServerClient.prototype.receive = function (data) {
        if (data.length == 0) {
            this.receiveHert();
            return;
        }
        var info = msgpack.decode(new Uint8Array(data));
        var cmd = info.cmd;
        var seq = info.seq;
        var body = msgpack.decode(info.body);
        if (seq != this.lastSeq + 1) {
            // console.log('丢弃消息', cmd, seq, body);
            var msg = {
                "cmd": 'error',
                "rSeq": seq,
                "code": -2,
                "error": '服务器消息丢失',
                "body": {}
            };
            msg.body = msgpack.encode(msg.body);
            this.send(msgpack.encode(msg));
            return;
        }
        // console.log('[receive client]', cmd, seq, body);
        this.lastSeq = seq;
        if (command[cmd]) {
            var c_1 = new command[cmd]();
            c_1.cmd = cmd;
            c_1.seq = seq;
            c_1.body = body;
            c_1.client = this;
            c_1.execute().catch(function (e) {
                console.log(e);
                c_1.fail(-1, "内部错误:" + e);
            });
        }
        else {
        }
    };
    NativeServerClient.prototype.receiveHert = function () {
        this.send(new Uint8Array([]));
        // console.log('返回心跳')
    };
    NativeServerClient.prototype.readFileContent = function (cmd, seq, body) {
        var file = new lib.File(body.url);
        file.readContent();
        var back = {
            'cmd': cmd,
            'rSeq': seq
        };
    };
    return NativeServerClient;
}(lib.WebsocketServerClient));
new NativeServer(51443);
//# sourceMappingURL=native-server.js.map