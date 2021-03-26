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
var component_1 = require("./component");
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "eui.Image";
        return _this;
    }
    // source: string;
    Image.prototype.setAttribute = function (name, value) {
        if (_super.prototype.setAttribute.call(this, name, value))
            return true;
        if (name == "source")
            this.properties.source = value;
        else
            return false;
        return true;
    };
    return Image;
}(component_1.Component));
exports.Image = Image;
//# sourceMappingURL=image.js.map