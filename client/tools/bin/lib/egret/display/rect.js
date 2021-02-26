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
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("./component");
var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "eui.Rect";
        return _this;
    }
    // fillColor: string;
    // strokeColor: string;
    // fillAlpha: number;
    // strokeAlpha: number;
    // strokeWeight: number;
    Rect.prototype.setAttribute = function (name, value) {
        if (_super.prototype.setAttribute.call(this, name, value))
            return true;
        if (name == "fillColor")
            this.properties.fillColor = value;
        else if (name == "strokeColor")
            this.properties.strokeColor = value;
        else if (name == "fillAlpha")
            this.properties.fillAlpha = +value;
        else if (name == "strokeAlpha")
            this.properties.strokeAlpha = +value;
        else if (name == "strokeWeight")
            this.properties.strokeWeight = +value;
        else
            return false;
        return true;
    };
    return Rect;
}(component_1.Component));
exports.Rect = Rect;
//# sourceMappingURL=rect.js.map