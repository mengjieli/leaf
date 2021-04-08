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
var FileSave = /** @class */ (function (_super) {
    __extends(FileSave, _super);
    function FileSave() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileSave.prototype.execute = function () {
        var url = this.body.url;
        if (url == "" || url.slice(0, 2) == "./")
            url = this.getRoot(url);
        var file = new lib.File(url);
        try {
            file.save(this.body.content);
            this.success({ result: true });
        }
        catch (e) {
            this.success({ result: false });
        }
    };
    return FileSave;
}(request_command_1.RequestCommand));
exports.FileSave = FileSave;
//# sourceMappingURL=file-save.js.map