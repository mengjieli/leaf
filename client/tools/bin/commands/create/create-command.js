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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var command_1 = require("./../../lib/command/command");
var readline_1 = require("./../../lib/console/readline");
var file_1 = require("./../../lib/file/file");
var root_1 = require("./../../path/root");
var console_1 = require("./../../lib/console/console");
var array_utils_1 = require("./../../lib/utils/array-utils");
var CreateCommand = /** @class */ (function (_super) {
    __extends(CreateCommand, _super);
    function CreateCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'init';
        _this.detail = '创建项目';
        _this.info = null;
        return _this;
    }
    CreateCommand.prototype.execute = function (argv) {
        return __awaiter(this, void 0, void 0, function () {
            var projectPath, cfgPath, cfg, info, flag, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectPath = process.env.PWD;
                        cfgPath = path_1.join(projectPath, 'orange.json');
                        cfg = new file_1.File(cfgPath);
                        info = {
                            "modules": []
                        };
                        this.info = info;
                        if (!cfg.exists) return [3 /*break*/, 2];
                        return [4 /*yield*/, readline_1.readLine('已存在 orange 项目，是否覆盖 : (no) ', 'no')];
                    case 1:
                        flag = _a.sent();
                        if (flag != 'yes' && flag != 'y') {
                            console.log('不覆盖原有项目，中途退出命令');
                            "";
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, readline_1.readLine('选择项目类型 (egret、 ...): (egret) ', 'egret')];
                    case 3:
                        type = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(this.checkType(type) == false)) return [3 /*break*/, 6];
                        return [4 /*yield*/, readline_1.readLine('选择项目类型 (egret、 ...): (egret) ', 'egret')];
                    case 5:
                        type = _a.sent();
                        return [3 /*break*/, 4];
                    case 6:
                        info.type = type;
                        this.initModules(type, info);
                        return [4 /*yield*/, readline_1.readLine("\u662F\u5426\u521B\u5EFA\u5982\u4E0B orange \u9879\u76EE: \n" + JSON.stringify(info, null, 2) + "\n(yes) ", 'yes')];
                    case 7:
                        // let local: any = await readLine('是否需要安装 local 模块(读写本地资源) : (no) ', 'no');
                        // local = local === 'y' || local === 'yes' ? true : false;
                        // if (local) {
                        //   info.modules.push({
                        //     "name": "local"
                        //   });
                        // }
                        flag = _a.sent();
                        if (flag != 'yes' && flag != 'y') {
                            console.log('中途退出命令');
                            return [2 /*return*/];
                        }
                        this.saveTSConfig();
                        this.copySource();
                        cfg.save(JSON.stringify(info, null, 2));
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateCommand.prototype.initModules = function (type, info) {
        if (type == 'egret') {
            info.modules = [
                { "name": "egret-extend" },
                { "name": "sync-data" },
            ];
        }
    };
    /**
     * 修改 tsconfig.json
     */
    CreateCommand.prototype.saveTSConfig = function () {
        var projectPath = process.env.PWD;
        var cfg = JSON.stringify({
            "compilerOptions": {
                "target": "es5",
                "outDir": "bin-debug",
                "experimentalDecorators": true,
                "downlevelIteration": true,
                "lib": [
                    "es5",
                    "dom",
                    "es2015"
                ],
                "types": []
            },
            "include": [
                "src",
                "libs"
            ]
        }, null, 2);
        (new file_1.File(path_1.join(projectPath, 'tsconfig.json'))).save(cfg);
    };
    /**
     * copy 源码
     */
    CreateCommand.prototype.copySource = function () {
        var e_1, _a, e_2, _b;
        var projectPath = process.env.PWD;
        var rootPath = root_1.getRootPath();
        var ends = ['js', 'min.js', 'd.ts'];
        var file = new file_1.File(path_1.join(rootPath, 'libs/orange'));
        var list = file.readFilesWithEnd(ends);
        file = new file_1.File(path_1.join(rootPath, 'libs/mobx'));
        list = list.concat(file.readFilesWithEnd(ends));
        file = new file_1.File(path_1.join(rootPath, 'libs/msgpack'));
        list = list.concat(file.readFilesWithEnd(ends));
        file = new file_1.File(path_1.join(rootPath, 'libs/pako'));
        list = list.concat(file.readFilesWithEnd(ends));
        file = new file_1.File(path_1.join(rootPath, 'libs/orange'));
        list = list.concat(file.readFilesWithEnd(ends));
        try {
            for (var _c = __values(this.info.modules), _d = _c.next(); !_d.done; _d = _c.next()) {
                var m = _d.value;
                file = new file_1.File(path_1.join(rootPath, 'libs/orange-modules/' + m.name));
                list = list.concat(file.readFilesWithEnd(ends));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        //游戏源码
        list.push(new file_1.File(path_1.join(root_1.getRootPath(), 'src/Main.ts')));
        file = new file_1.File(path_1.join(rootPath, this.info.mediator ? 'src2/game' : 'src/game'));
        list = list.concat(file.readFilesWithEnd('ts'));
        //资源文件
        file = new file_1.File(path_1.join(rootPath, 'resource/skins'));
        list = list.concat(file.readFilesWithEnd('exml'));
        try {
            for (var list_1 = __values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                var file_2 = list_1_1.value;
                var path = file_2.url.slice(rootPath.length, file_2.url.length);
                var savePath = path_1.join(projectPath, path);
                savePath = savePath.replace('src2/game', 'src/game');
                file_2.save(file_2.readContent(), null, savePath);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (list_1_1 && !list_1_1.done && (_b = list_1.return)) _b.call(list_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        //修改 scripts
        //TODO
        //修改引入库文件 egretProperties.json
        var cfg = JSON.parse((new file_1.File('./egretProperties.json')).readContent());
        var item = array_utils_1.findArrayItem(cfg.modules, 'name', 'mobx');
        if (item)
            item.path = './libs/mobx';
        else
            cfg.modules.push({ 'name': 'mobx', 'path': './libs/mobx' });
        item = array_utils_1.findArrayItem(cfg.modules, 'name', 'orange');
        if (item)
            item.path = './libs/orange';
        else
            cfg.modules.push({ 'name': 'orange', 'path': './libs/orange' });
        item = array_utils_1.findArrayItem(cfg.modules, 'name', 'egret-extend');
        if (item)
            item.path = './libs/orange-modules/egret-extend';
        else
            cfg.modules.push({ 'name': 'egret-extend', 'path': './libs/orange-modules/egret-extend' });
        item = array_utils_1.findArrayItem(cfg.modules, 'name', 'msgpack');
        if (item)
            item.path = './libs/msgpack';
        else
            cfg.modules.push({ 'name': 'msgpack', 'path': './libs/msgpack' });
        item = array_utils_1.findArrayItem(cfg.modules, 'name', 'pako');
        if (item)
            item.path = './libs/pako';
        else
            cfg.modules.push({ 'name': 'pako', 'path': './libs/pako' });
        item = array_utils_1.findArrayItem(cfg.modules, 'name', 'sync-data');
        if (item)
            item.path = './libs/orange-modules/sync-data';
        else
            cfg.modules.push({ 'name': 'sync-data', 'path': './libs/orange-modules/sync-data' });
        item = array_utils_1.findArrayItem(cfg.modules, 'name', 'native');
        if (item)
            item.path = './libs/orange-modules/native';
        else
            cfg.modules.push({ 'name': 'native', 'path': './libs/orange-modules/native' });
        (new file_1.File('./egretProperties.json')).save(JSON.stringify(cfg, null, 2));
    };
    CreateCommand.prototype.checkType = function (type) {
        if (type == 'egret') {
            //检测 egretProperties.json 是否存在 
            if (!(new file_1.File('./egretProperties.json')).exists) {
                console.log(console_1.Console.styles.redBG[0] + " \u672A\u68C0\u6D4B\u5230 egret \u9879\u76EE " + console_1.Console.styles.redBG[1]);
                return false;
            }
            return true;
        }
        console.log("\u672A\u5B9E\u73B0\u7684\u7C7B\u578B: " + type);
        return false;
    };
    return CreateCommand;
}(command_1.Command));
exports.CreateCommand = CreateCommand;
//# sourceMappingURL=create-command.js.map