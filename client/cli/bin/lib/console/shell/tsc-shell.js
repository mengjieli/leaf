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
var shell_1 = require("./shell");
var TSCShell = /** @class */ (function (_super) {
    __extends(TSCShell, _super);
    function TSCShell(cwd) {
        var _this = _super.call(this, 'tsc', null, { 'cwd': cwd }) || this;
        var last = '';
        _this.onData = function (data) {
            last += data;
            if (data.indexOf('Watching for file changes.') != -1) {
                var correct = false;
                if (data.indexOf('Found 0 errors') != -1) {
                    correct = true;
                }
                if (_this.onCompileComplete)
                    _this.onCompileComplete(correct, last);
                last = '';
            }
        };
        return _this;
    }
    return TSCShell;
}(shell_1.Shell));
exports.TSCShell = TSCShell;
//# sourceMappingURL=tsc-shell.js.map