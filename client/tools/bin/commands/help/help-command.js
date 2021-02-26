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
var command_1 = require("./../../lib/command/command");
var string_util_1 = require("./../../lib/utils/string-util");
var HelpCommand = /** @class */ (function (_super) {
    __extends(HelpCommand, _super);
    function HelpCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'help';
        _this.detail = '获取帮助信息';
        return _this;
    }
    HelpCommand.prototype.execute = function (argv) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, commands, str, commands_1, commands_1_1, command, i;
            return __generator(this, function (_b) {
                commands = command_1.getCommands();
                str = '\n可用的命令如下:\n';
                try {
                    for (commands_1 = __values(commands), commands_1_1 = commands_1.next(); !commands_1_1.done; commands_1_1 = commands_1.next()) {
                        command = commands_1_1.value;
                        if (command != this)
                            if (typeof command.detail === 'string') {
                                str += '\n' + command.name + string_util_1.getRepeat(' ', 12 - command.name.length) + command.detail + '\n';
                            }
                            else {
                                str += '\n' + command.name + string_util_1.getRepeat(' ', 12 - command.name.length) + command.detail[0] + '\n';
                                for (i = 1; i < command.detail.length; i++) {
                                    str += string_util_1.getRepeat(' ', 12) + command.detail[i][0] + string_util_1.getRepeat(' ', 16 - command.detail[i][0].length) + command.detail[i][1] + string_util_1.getRepeat(' ', 4) + command.detail[i][2] + '\n';
                                }
                            }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (commands_1_1 && !commands_1_1.done && (_a = commands_1.return)) _a.call(commands_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                console.log(str);
                return [2 /*return*/];
            });
        });
    };
    return HelpCommand;
}(command_1.Command));
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=help-command.js.map