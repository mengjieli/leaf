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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var command_1 = require("./../../lib/command/command");
var root_1 = require("./../../path/root");
var child_process_1 = require("child_process");
var http_server_1 = require("./../../../js/http-server");
var os = require("os");
var ServerCommand = /** @class */ (function (_super) {
    __extends(ServerCommand, _super);
    function ServerCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'server';
        _this.detail = [
            '启动本地服务器，启动后 orange.native 相关的 api 即可使用',
            ['-hr|-httproot', '选填', 'http-server 的根目录，默认为命令执行的目录'],
            ['-d|-dir', '选填', 'orange.native.File 的相对目录，默认为命令执行的目录'],
            ['-p|-port', '选填', 'orange.server 的启动端口']
        ];
        _this.info = null;
        return _this;
    }
    ServerCommand.prototype.execute = function (argv) {
        return __awaiter(this, void 0, void 0, function () {
            var projectPath, rootPath, js, fileRoot, dir, p, httpdir;
            return __generator(this, function (_a) {
                projectPath = process.env.PWD;
                rootPath = root_1.getRootPath();
                js = path_1.join(rootPath, 'server/bin/native/native-server.js');
                fileRoot = projectPath;
                dir = this.getArgument(argv, ['d', 'dir']);
                if (dir) {
                    if (dir.slice(0, 2) == './') {
                        fileRoot = path_1.join(projectPath, dir);
                    }
                    else {
                        fileRoot = dir;
                    }
                }
                console.log("\u542F\u52A8 orange.native \u76F8\u5173 api \uFF0C\u76F8\u5BF9\u6839\u76EE\u5F55: " + fileRoot);
                child_process_1.fork(js, [fileRoot, rootPath]);
                p = 52080;
                httpdir = this.getArgument(argv, ['hr', 'httproot', '51443']);
                if (httpdir) {
                    if (httpdir.slice(0, 2) == './') {
                        projectPath = path_1.join(projectPath, httpdir);
                    }
                    else {
                        projectPath = httpdir;
                    }
                }
                (new http_server_1.HttpServer(p, projectPath)).start();
                console.log("\u542F\u52A8 http \u670D\u52A1\u5668\uFF0C\u6839\u76EE\u5F55: " + projectPath);
                console.log("http://" + this.getIPV4() + ":" + p + "");
                return [2 /*return*/];
            });
        });
    };
    ServerCommand.prototype.getIPV4 = function () {
        var IPv4 = '127.0.0.1', hostName;
        hostName = os.hostname();
        var network = os.networkInterfaces();
        var netKey;
        for (var key in network) {
            if (key.slice(0, "en".length) == "en") {
                netKey = key;
            }
        }
        try {
            for (var i = 0; i < os.networkInterfaces()[netKey].length; i++) {
                if (os.networkInterfaces()[netKey][i].family == 'IPv4') {
                    IPv4 = os.networkInterfaces()[netKey][i].address;
                }
            }
        }
        catch (e) {
        }
        return IPv4;
    };
    return ServerCommand;
}(command_1.Command));
exports.ServerCommand = ServerCommand;
//# sourceMappingURL=server-command.js.map