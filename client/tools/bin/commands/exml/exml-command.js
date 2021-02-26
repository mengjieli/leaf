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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var command_1 = require("./../../lib/command/command");
var lib = require("./../../lib/lib");
var path_1 = require("path");
var image_1 = require("../../lib/egret/display/image");
var EXMLCommand = /** @class */ (function (_super) {
    __extends(EXMLCommand, _super);
    function EXMLCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'egret.exml';
        _this.detail = ['解析 exml 为 json 格式，采用 orange.egret.EXML 可还原对象',
            ['-f', '选填', '选择要转换的 exml 文件，多个文件以 + 链接'],
            ['-s', '选填', '要读取的 exml 根目录'],
            ['-o', '选填', '导出的 json 文件目录'],
            ['-c', '选填', '导出所有 exml 的配置文件目录，例如 ./csvs/fightEXML.csv'],
            ['-i', '选填', '忽略的对象名称，多个文件以 + 链接'],
            ['-m', '选填', '是否合并 json 文件'],
            ['-c', '选填', '是否压缩 json']
        ];
        _this.ignore = [];
        _this.compressed = false;
        return _this;
    }
    EXMLCommand.prototype.execute = function (argv) {
        return __awaiter(this, void 0, void 0, function () {
            var exmls, f, list, merge_1, mergeFile, bigJson_1, dir, file, file_1, url, list_1, cfg, file;
            var _this = this;
            return __generator(this, function (_a) {
                this.out = this.getArgument(argv, 'o');
                if (this.out.slice(0, 2) == './') {
                    this.out = path_1.join(this.executePath, this.out);
                }
                if (this.getArgument(argv, 'i')) {
                    this.ignore = this.getArgument(argv, 'i').split('+');
                }
                if (this.getArgument(argv, 'c')) {
                    this.compressed = true;
                }
                exmls = [];
                if (this.getArgument(argv, 'f')) {
                    f = this.getArgument(argv, 'f');
                    list = f.split("+");
                    list.forEach(function (url) { return exmls.push(_this.decode(url)); });
                }
                if (this.getArgument(argv, 's')) {
                    merge_1 = false;
                    mergeFile = this.out.split("/")[this.out.split("/").length - 1];
                    if (this.getArgument(argv, 'm')) {
                        merge_1 = true;
                        mergeFile = this.getArgument(argv, 'm');
                    }
                    bigJson_1 = {};
                    dir = this.getArgument(argv, 's');
                    if (dir.slice(0, 2) == './') {
                        dir = path_1.join(this.executePath, dir);
                    }
                    file = new lib.File(dir);
                    file.readFilesWithEnd('exml').forEach(function (f) { return exmls.push(_this.decode(f.url, merge_1 ? bigJson_1 : null)); });
                    if (merge_1) {
                        file_1 = new lib.File(path_1.join(this.out, mergeFile + ".json"));
                        file_1.save(this.compressed ? lib.compressJSON(bigJson_1) : JSON.stringify(bigJson_1));
                    }
                }
                if (this.getArgument(argv, 'c')) {
                    url = this.getArgument(argv, 'c');
                    if (url.slice(0, 2) == './') {
                        url = path_1.join(this.executePath, url);
                    }
                    list_1 = [];
                    list_1.push(['ts', 'ts', 'ts', 'ts']);
                    list_1.push(['int', 'string', 'string', 'Array(string)']);
                    list_1.push(['id', 'className', 'fileName', 'images']);
                    list_1.push(['id', '导出类名', '文件名', '用到的图片资源名称(xxx_png)']);
                    exmls.forEach(function (exml) {
                        var className = exml[0];
                        var fileName = exml[1];
                        fileName = fileName.replace('.', '_');
                        var displays = exml[2];
                        var images = [];
                        displays.forEach(function (display) {
                            if (display instanceof image_1.Image) {
                                var source = display.properties.source;
                                if (source && source != "") {
                                    images.push(source);
                                }
                            }
                        });
                        list_1.push([list_1.length, className, fileName, Array.from(new Set(images))]);
                    });
                    cfg = lib.encodeCSV(list_1, '|');
                    file = new lib.File(url);
                    file.save(cfg);
                }
                return [2 /*return*/];
            });
        });
    };
    EXMLCommand.prototype.decode = function (url, bigJson) {
        var path = url;
        if (url.slice(0, 2) == './') {
            path = path_1.join(this.executePath, url);
        }
        var _a = __read(lib.EXML.decode(path, this.ignore), 3), json = _a[0], className = _a[1], displays = _a[2];
        var name = path.split('/')[path.split('/').length - 1];
        name = name.replace('.exml', '.json');
        // if (json.class) {
        //   name = json.class + '.json';
        // }
        if (!bigJson) {
            var file = new lib.File(path_1.join(this.out, name));
            file.save(this.compressed ? lib.compressJSON(bigJson) : JSON.stringify(json, null, 2));
        }
        else {
            bigJson[path_1.join(this.out, name).split("/")[path_1.join(this.out, name).split("/").length - 1]] = json;
        }
        return [className, name, displays];
    };
    return EXMLCommand;
}(command_1.Command));
exports.EXMLCommand = EXMLCommand;
//# sourceMappingURL=exml-command.js.map