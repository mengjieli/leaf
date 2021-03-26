"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spawn = require('child_process').spawn;
var Shell = /** @class */ (function () {
    /**
     *
     * @param cmd
     * @param params
     * @param option cwd 当前工作目录
     */
    function Shell(cmd, params, option) {
        var _this = this;
        var free = spawn(cmd, params || [], option);
        // 捕获标准输出并将其打印到控制台
        free.stdout.on('data', function (data) {
            if (_this.onData)
                _this.onData(data + '');
        });
        // 捕获标准错误输出并将其打印到控制台
        free.stderr.on('data', function (data) {
            if (_this.onError)
                _this.onError(data + '');
        });
        // 注册子进程关闭事件
        free.on('exit', function (code, signal) {
            if (_this.onExit)
                _this.onExit(code, signal);
        });
        this.process = free;
    }
    Shell.prototype.kill = function () {
        this.process.kill('SIGHUP');
    };
    return Shell;
}());
exports.Shell = Shell;
//# sourceMappingURL=shell.js.map