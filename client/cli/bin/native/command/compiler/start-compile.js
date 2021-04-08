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
var request_command_1 = require("./../request-command");
var lib = require("./../../../lib/lib");
var path_1 = require("path");
var StartCompile = /** @class */ (function (_super) {
    __extends(StartCompile, _super);
    function StartCompile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartCompile.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var src, srcPath, compiling, file, url, cancel;
            var _this = this;
            return __generator(this, function (_a) {
                src = this.body.src;
                srcPath = this.getRoot(src);
                compiling = {};
                // console.log('[动态编译]', this.getRoot(''), src, srcPath)
                try {
                    file = new lib.File(srcPath);
                    cancel = file.watch(function (urls) {
                        // console.log('???!! change', urls);
                        if (_this.client.connected == false)
                            cancel();
                        if (urls.length)
                            url = urls[0];
                        // console.log('[文件变化]', url)
                        if (url && url.slice(url.slice(url.length - 3, url.length)) != '.ts') {
                            // console.log('change?', url)
                            var file = new lib.File(url);
                            if (file.exists) {
                                var compiler;
                                if (!global["compileThread"]) {
                                    global["compileThread"] = new Compiler();
                                }
                                compiler = global["compileThread"];
                                var source = file.readContent();
                                compiler.pushCompile(url, source, function (content) {
                                    _this.send({
                                        "cmd": "OnCompile",
                                        "rSeq": 0,
                                        "code": 0,
                                        "error": "",
                                        "body": { content: content, source: source, url: path_1.basename(url, src) }
                                    });
                                });
                            }
                        }
                    });
                    this.success({ result: true });
                }
                catch (e) {
                    console.log('[动态编译出错]');
                    console.log(e);
                    this.success({ result: false });
                }
                return [2 /*return*/];
            });
        });
    };
    return StartCompile;
}(request_command_1.RequestCommand));
exports.StartCompile = StartCompile;
var Compiler = /** @class */ (function () {
    function Compiler() {
        var _this = this;
        /**
         * 是否空闲
         */
        this.free = true;
        this.index = 0;
        this.compileList = new Array();
        this.hasCreateCompilerThread = false;
        this.waitComplete = false;
        this.onCompileComplete = function () {
            if (_this.waitComplete || !_this.compilingItem)
                return;
            _this.waitComplete = true;
            var start = Date.now();
            setTimeout(function () {
                if (_this.compilingItem) {
                    setTimeout(function () {
                        _this.compilingItem = null;
                        _this.waitComplete = false;
                        // console.log('编译耗时:', Date.now() - start);
                        _this.compileNext();
                    }, 0);
                    // console.log('[ts编译完成]', this.getPath('f.js'))
                    var file = new lib.File(_this.getPath('f.js'));
                    _this.compilingItem.completes.forEach(function (call) { return call(file.readContent()); });
                    _this.compilingItem.completes.length = 0;
                }
                else {
                    _this.waitComplete = false;
                    _this.compileNext();
                }
            }, 0);
        };
        if (global["CompilerIndex"] == null) {
            global["CompilerIndex"] = 0;
        }
        this.index = global["CompilerIndex"]++;
    }
    /**
     * 创建 tsconfig
     * @param index
     */
    Compiler.prototype.createTSConfig = function () {
        var file = new lib.File(this.getPath("tsconfig.json"));
        file.save("\n              {\n                \"compilerOptions\": {\n                  \"target\": \"es5\",\n                  \"experimentalDecorators\": true,\n                  \"lib\": [\n                    \"es5\",\n                    \"es2015\"\n                  ],\n                  \"downlevelIteration\": true,\n                  \"types\": [],\n                  \"watch\": true,\n                  \"pretty\": true,\n                \"preserveConstEnums\": true\n                }\n              }");
    };
    Compiler.prototype.createCompilerThread = function () {
        if (this.hasCreateCompilerThread)
            return;
        this.hasCreateCompilerThread = true;
        this.createTSConfig();
        var shell = new lib.TSCShell(this.getOrangePath('typescript/lib/tsc.js'), this.getPath());
        shell.onCompileComplete = this.onCompileComplete;
    };
    Compiler.prototype.compileNext = function () {
        if (this.compilingItem == null && this.compileList.length) {
            this.compilingItem = this.compileList.shift();
            var file = new lib.File(this.getPath('f.ts'));
            file.save(this.compilingItem.content);
        }
    };
    Compiler.prototype.pushCompile = function (url, content, complete) {
        // console.log('compling ?', url);
        this.createCompilerThread();
        if (this.compilingItem && this.compilingItem.content == content) {
            this.compilingItem.completes.push(complete);
            return;
        }
        for (var i = 0; i < this.compileList.length; i++) {
            if (this.compileList[i].url == url) {
                this.compileList[i].content = content;
                this.compileList[i].completes.push(complete);
                return;
            }
        }
        var item = new CompilerItemData();
        item.url = url;
        item.content = content;
        item.completes = [complete];
        this.compileList.push(item);
        if (this.compileList.length == 1)
            this.compileNext();
    };
    Compiler.prototype.getPath = function (fileName) {
        if (fileName === void 0) { fileName = ""; }
        return path_1.join(this.getOrangePath("tempcompiler/" + this.index + "/"), fileName);
    };
    Compiler.prototype.getOrangePath = function (path) {
        return path ? path_1.join(global["params"].orangePath, path) : global["params"].orangePath;
    };
    return Compiler;
}());
var CompilerItemData = /** @class */ (function () {
    function CompilerItemData() {
    }
    return CompilerItemData;
}());
//# sourceMappingURL=start-compile.js.map