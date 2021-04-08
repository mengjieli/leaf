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
var request_command_1 = require("./request-command");
var lib = require("./../../lib/lib");
var FileWatch = /** @class */ (function (_super) {
    __extends(FileWatch, _super);
    function FileWatch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileWatch.prototype.execute = function () {
        var _this = this;
        var url = this.body.url;
        if (url == "" || url.slice(0, 2) == "./")
            url = this.getRoot(url);
        var file = new lib.File(url);
        if (file.exists) {
            var first_1 = true;
            var w_1 = file.watch(function () {
                if (first_1) {
                    first_1 = false;
                    return;
                }
                try {
                    _this.success();
                }
                catch (e) {
                    w_1();
                }
            });
        }
        else {
            this.fail(1000, "文件不存在");
        }
    };
    return FileWatch;
}(request_command_1.RequestCommand));
exports.FileWatch = FileWatch;
//# sourceMappingURL=file-watch.js.map