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
var command_1 = require("./../../lib/command/command");
var console_1 = require("./../../lib/console/console");
var Main_1 = require("./../../../js/config/Main");
var ConfigCommand = /** @class */ (function (_super) {
    __extends(ConfigCommand, _super);
    function ConfigCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'config';
        _this.detail = ['解析配置表',
            ['-f', '选填', '单个配置表文件'],
            ['-s', '选填', '配置表文件夹目录，默认为当前目录'],
            ['-o', '选填', '导出的 json 配置表文件夹目录，默认为当前目录'],
            ['-m', '选填', '导出的合成单个 json 配置表文件目录'],
            ['-t', '选填', '导出的解析代码文件(单一文件)目录，目前支持 ts、go 文件以 ts 或 go 作为后缀'],
            ['-p', '选填', '导出的解析代码所在的 package (ts 表示 namespace)，默认为 config'],
            ['-r', '选填', '哪些配置表是竖版的(只需填文件名，带后缀)，比如 Skill+Item ，填写导出的表类名，多张表以 + 分割'],
            ['-c', '选填', '哪些表格按照多表方式融合，比如 Skill+Item ，填写导出的表类名，多张表以 + 分割'],
            ['-a', '选填', '是否以数组的格式导出 json，默认为键值对，如需要此参数填 true 即可'],
            ['-i', '选填', '获取更多信息']
        ];
        _this.necessaryArgs = [];
        return _this;
    }
    ConfigCommand.prototype.execute = function (argv) {
        return __awaiter(this, void 0, void 0, function () {
            var rootPath, lan, params;
            return __generator(this, function (_a) {
                rootPath = process.env.PWD;
                //检测必要参数
                this.checkArguments(argv, this.necessaryArgs);
                lan = 'ts';
                argv.push('-l');
                if (this.getArgument(argv, 't')) {
                    lan = this.getArgument(argv, 't').split('.')[this.getArgument(argv, 't').split('.').length - 1];
                }
                argv.push(lan);
                if (!this.getArgument(argv, 's') && !this.getArgument(argv, 'f')) {
                    argv.push('-s');
                    argv.push(rootPath);
                }
                if (!this.getArgument(argv, 'o')) {
                    argv.push('-o');
                    argv.push(rootPath);
                }
                if (!this.getArgument(argv, 'p')) {
                    argv.push('-p');
                    argv.push('config');
                }
                try {
                    params = [
                        "--concat=" + this.getArgument(argv, 'c'),
                        "--tool=config",
                        "--l=" + this.getArgument(argv, 'l'),
                        "--file=" + this.getArgument(argv, 'f'),
                        "--dir=" + this.getArgument(argv, 's'),
                        "--" + this.getArgument(argv, 'l') + "out=" + this.getArgument(argv, 't'),
                        "--package=" + this.getArgument(argv, 'p')
                    ];
                    if (this.getArgument(argv, 'a')) {
                        params.push("--array=" + this.getArgument(argv, 'a'));
                    }
                    if (this.getArgument(argv, 'i')) {
                        params.push("--info=1");
                    }
                    if (this.getArgument(argv, 'r')) {
                        params.push("--direction=" + this.getArgument(argv, 'r'));
                    }
                    if (this.getArgument(argv, 'g')) {
                        params.push("--group=" + this.getArgument(argv, 'g'));
                    }
                    if (this.getArgument(argv, 'o')) {
                        params.push("--out=" + this.getArgument(argv, 'o'));
                    }
                    if (this.getArgument(argv, 'm') && this.getArgument(argv, 'l')) {
                        if (this.getArgument(argv, 'l') != 'ts') {
                            throw console_1.Console.styles.red[0] + "\u76EE\u524D " + this.getArgument(argv, 'l') + " \u8BED\u8A00\u8FD8\u4E0D\u652F\u6301 m \u53C2\u6570" + console_1.Console.styles.red[1];
                        }
                        params.push("--merge=" + this.getArgument(argv, 'm'));
                    }
                    Main_1.configTool(params);
                }
                catch (e) {
                    console.log(e);
                }
                return [2 /*return*/];
            });
        });
    };
    return ConfigCommand;
}(command_1.Command));
exports.ConfigCommand = ConfigCommand;
//# sourceMappingURL=config-command.js.map