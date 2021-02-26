"use strict";
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
var console_1 = require("./../console/console");
var root_1 = require("./../../path/root");
var commandClass = [];
var commands = [];
var defaultCommand = null;
function registerCommand(clazz) {
    commandClass.push(clazz);
    return clazz;
}
exports.registerCommand = registerCommand;
function registerDefaultCommand(clazz) {
    defaultCommand = new clazz();
    return clazz;
}
exports.registerDefaultCommand = registerDefaultCommand;
function startCommand() {
    commandClass.forEach(function (clazz) {
        commands.push(new clazz());
    });
}
exports.startCommand = startCommand;
function receiveCommand(argv) {
    var e_1, _a;
    try {
        for (var commands_1 = __values(commands), commands_1_1 = commands_1.next(); !commands_1_1.done; commands_1_1 = commands_1.next()) {
            var command = commands_1_1.value;
            if (command.receiveCommand(argv))
                return;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (commands_1_1 && !commands_1_1.done && (_a = commands_1.return)) _a.call(commands_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log('⚠️  没有匹配到对应的命令');
    if (defaultCommand) {
        defaultCommand.execute(argv);
    }
}
exports.receiveCommand = receiveCommand;
function getCommands() {
    return commands;
}
exports.getCommands = getCommands;
var Command = /** @class */ (function () {
    function Command() {
    }
    Object.defineProperty(Command.prototype, "rootPath", {
        get: function () {
            return root_1.getRootPath();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Command.prototype, "executePath", {
        get: function () {
            return process.env.PWD;
        },
        enumerable: true,
        configurable: true
    });
    Command.prototype.receiveCommand = function (argv) {
        var _this = this;
        this.argv = argv;
        if (argv.length && argv[0] == this.name) {
            this.execute(argv)
                .catch(function (e) {
                console.log(console_1.Console.styles.red[0] + " \u6267\u884C " + _this.name + " \u547D\u4EE4\u51FA\u9519: " + console_1.Console.styles.red[1]);
                console.log(console_1.Console.styles.red[0] + " " + e + " " + console_1.Console.styles.red[1]);
                console.log(e);
                console.log("" + _this.getHelp());
            });
            return true;
        }
        return false;
    };
    Command.prototype.checkArguments = function (argv, necessaryArgs) {
        var e_2, _a;
        try {
            for (var necessaryArgs_1 = __values(necessaryArgs), necessaryArgs_1_1 = necessaryArgs_1.next(); !necessaryArgs_1_1.done; necessaryArgs_1_1 = necessaryArgs_1.next()) {
                var arg = necessaryArgs_1_1.value;
                if (!this.getArgument(argv, arg)) {
                    throw "\u7F3A\u5C11\u53C2\u6570 " + arg;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (necessaryArgs_1_1 && !necessaryArgs_1_1.done && (_a = necessaryArgs_1.return)) _a.call(necessaryArgs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Command.prototype.getArgument = function (argv, name) {
        var e_3, _a;
        if (typeof name == 'string')
            name = [name];
        try {
            for (var name_1 = __values(name), name_1_1 = name_1.next(); !name_1_1.done; name_1_1 = name_1.next()) {
                var n = name_1_1.value;
                if (argv.indexOf('-' + n) != -1 && argv.indexOf('-' + n) < argv.length - 1 &&
                    argv[argv.indexOf('-' + n) + 1].charAt(0) != '-') {
                    return argv[argv.indexOf('-' + n) + 1];
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (name_1_1 && !name_1_1.done && (_a = name_1.return)) _a.call(name_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return null;
    };
    Command.prototype.getHelp = function () {
        var str = "";
        var command = this;
        if (typeof command.detail === 'string') {
            str += '\n' + command.name + '\t\t' + command.detail + '\n';
        }
        else {
            str += command.name + '\t\t' + command.detail[0] + '\n';
            for (var i = 1; i < command.detail.length; i++) {
                str += '\t' + command.detail[i] + '\n';
            }
        }
        return str;
    };
    return Command;
}());
exports.Command = Command;
//# sourceMappingURL=command.js.map