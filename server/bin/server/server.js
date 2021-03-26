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
var lib_1 = require("../lib/lib");
var TestServer = /** @class */ (function () {
    function TestServer(port) {
        var server = new lib_1.WebsocketServer(TestServerClient);
        server.start(port);
    }
    return TestServer;
}());
exports.TestServer = TestServer;
var TestServerClient = /** @class */ (function (_super) {
    __extends(TestServerClient, _super);
    function TestServerClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestServerClient.prototype.start = function () {
        var url = decodeURIComponent(this.request.resource.slice(2, this.request.resource.length));
        // console.log('客户端连上', url);
    };
    TestServerClient.prototype.receive = function (data) {
        var info = msgpack.decode(new Uint8Array(data));
        var cmd = info.cmd;
        var seq = info.seq;
        var body = msgpack.decode(info.body);
        console.log('[receive]', cmd, seq, body);
        if (this[cmd])
            this[cmd](cmd, seq, body);
    };
    TestServerClient.prototype.Auth_Login = function (cmd, seq, body) {
        var token = 'xxx:' + body.info;
        var back = {
            'cmd': cmd,
            'rSeq': seq,
            'body': msgpack.encode({ 'token': token })
        };
        this.send(msgpack.encode(back));
    };
    return TestServerClient;
}(lib_1.WebsocketServerClient));
//# sourceMappingURL=server.js.map