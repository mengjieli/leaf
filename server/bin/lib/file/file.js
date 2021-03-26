"use strict";
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
var fs_1 = require("fs");
var path_1 = require("path");
var File = /** @class */ (function () {
    function File(url) {
        this._url = url;
        var name = url.split("/")[url.split("/").length - 1];
        if (name.split(".").length > 1) {
            this._end = name.slice(name.split(".")[0].length + 1, name.length);
        }
        else {
            this._end = "";
        }
    }
    File.prototype.delete = function () {
        if (this.exists == false) {
            return;
        }
        if (!this.isDirection) {
            fs_1.unlinkSync(this.url);
        }
        else if (this.isDirection) {
            var list = fs_1.readdirSync(this.url);
            for (var i = 0; i < list.length; i++) {
                var file = new File(this.url + "/" + list[i]);
                file.delete();
            }
            try {
                fs_1.rmdirSync(this.url);
            }
            catch (e) {
                console.log(e);
            }
        }
    };
    File.prototype.watch = function (callBack, time) {
        var _this = this;
        if (time === void 0) { time = 0.3; }
        if (!global["$watchFile"]) {
            global["$watchFile"] = {
                "count": 0,
                "time": 0,
                "list": {}
            };
            var last = Date.now();
            setInterval(function () {
                var now = Date.now();
                var per = global["$watchFile"].time / (now - last);
                // console.log('watch file:', per, global["$watchFile"].count);
                global["$watchFile"].time = 0;
                last = now;
            }, 1000);
        }
        var dir = this.url;
        if (!global["$watchFile"][dir]) {
            global["$watchFile"].count++;
            var changes = {};
            var fswatch = fs_1.watch(dir, { recursive: true }, function (event, filename) {
                changes[path_1.join(_this.url, filename)] = true;
                setTimeout(function () {
                    for (var k in changes) {
                        backs.forEach(function (call) { return call([k]); });
                    }
                    changes = {};
                }, 50);
            });
            var cancel_1 = false;
            // let files = {};
            // let f = function () {
            //   var start = Date.now();
            //   try {
            //     let nfiles = {};
            //     let list = (new File(dir)).readFilesWithEnd("*");
            //     for (let i = 0; i < list.length; i++) {
            //       nfiles[list[i].url] = list[i].createTime
            //         + "," + list[i].changeTime + "," + list[i].modifyTime;
            //     }
            //     if (Object.keys(files).length != Object.keys(nfiles).length) {
            //       backs.forEach(call => call([]))
            //     } else {
            //       for (let key in nfiles) {
            //         if (!files[key] || files[key] != nfiles[key]) {
            //           backs.forEach(call => call([key]))
            //           break;
            //         }
            //       }
            //     }
            //     files = nfiles;
            //   } catch (e) { }
            //   global["$watchFile"].time += Date.now() - start;
            //   !cancel && setTimeout(f, time * 1000);
            // }.bind(this);
            // f();
            var cancelWatch = function () {
                cancel_1 = true;
                fswatch.close();
            };
            var backs = new Set();
            global["$watchFile"][dir] = {
                add: function (f) {
                    backs.add(f);
                },
                remove: function (f) {
                    backs.delete(f);
                    if (!backs.size) {
                        // delete global["$watchFile"][dir];
                        // cancelWatch();
                    }
                }
            };
        }
        global["$watchFile"][dir].add(callBack);
        return function () {
            global["$watchFile"][dir].remove(callBack);
        };
    };
    File.prototype.save = function (data, format, url) {
        if (format === void 0) { format = "binary"; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                format = format === "binary" ? null : format;
                return [2 /*return*/, new Promise(function (resolve) {
                        url = url || _this.url;
                        if (url.split("/").length > 1 || url.split(".").length == 1) {
                            if (url.split(".").length == 1) {
                                var dir = new File(url.slice(0, url.length - url.split("/")[url.split("/").length - 1].length));
                                if (dir.exists == false) {
                                    File.mkdirsSync(url);
                                }
                            }
                            else {
                                File.mkdirsSync(url.slice(0, url.length - url.split("/")[url.split("/").length - 1].length));
                            }
                        }
                        fs_1.writeFile(url, data, format, function (err) {
                            if (err) {
                                console.log("保存文件失败！ url = " + url);
                                resolve(false);
                            }
                            else {
                                resolve(true);
                            }
                        });
                    })];
            });
        });
    };
    Object.defineProperty(File.prototype, "isDirection", {
        get: function () {
            return this.stats.isFile() ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    File.prototype.readContent = function (format) {
        if (format === void 0) { format = "utf-8"; }
        try {
            if (!this.stats.isFile()) {
                return null;
            }
        }
        catch (e) {
            return null;
        }
        format = format === "binary" ? null : format;
        var content = fs_1.readFileSync(this.url, format);
        return content;
    };
    File.prototype.readFilesWithEnd = function (ends) {
        try {
            if (typeof ends == "string") {
                ends = [ends];
            }
            var files = [];
            if (this.stats.isFile()) {
                for (var i = 0; i < ends.length; i++) {
                    var end = ends[i];
                    if (end == "*" || end == this.end) {
                        files.push(this);
                    }
                }
            }
            else {
                var list = fs_1.readdirSync(this.url);
                for (var i = 0; i < list.length; i++) {
                    var file = new File(this.url + "/" + list[i]);
                    files = files.concat(file.readFilesWithEnd(ends));
                }
            }
        }
        catch (e) { }
        return files;
    };
    Object.defineProperty(File.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "end", {
        get: function () {
            return this._end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "stats", {
        get: function () {
            return fs_1.statSync(this.url);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "list", {
        get: function () {
            return fs_1.readdirSync(this.url);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "exists", {
        get: function () {
            return fs_1.existsSync(this.url);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "changeTime", {
        get: function () {
            return fs_1.statSync(this.url).ctime.getTime();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "modifyTime", {
        get: function () {
            return fs_1.statSync(this.url).mtime.getTime();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "createTime", {
        get: function () {
            return fs_1.statSync(this.url).birthtime.getTime();
        },
        enumerable: true,
        configurable: true
    });
    File.mkdirsSync = function (dirpath, mode) {
        if (!fs_1.existsSync(dirpath)) {
            var pathtmp;
            dirpath.split(path_1.sep).forEach(function (dirname) {
                if (dirname == "") {
                    pathtmp = "/";
                    return;
                }
                if (pathtmp) {
                    pathtmp = path_1.join(pathtmp, dirname);
                }
                else {
                    pathtmp = dirname;
                }
                if (!fs_1.existsSync(pathtmp)) {
                    fs_1.mkdirSync(pathtmp, mode);
                }
            });
        }
        return true;
    };
    File.join = function (path1, path2) {
        if (path1.charAt(path1.length - 1) != "/") {
            path1 += "/";
        }
        if (path2.charAt(0) === "/") {
            path2 = path2.slice(1, path2.length);
        }
        return path1 + path2;
    };
    return File;
}());
exports.File = File;
//# sourceMappingURL=file.js.map