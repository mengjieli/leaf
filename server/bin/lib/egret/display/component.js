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
var sprite_1 = require("./sprite");
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "eui.Component";
        return _this;
    }
    // percentWidth: number;
    // percentHeight: number;
    // verticalCenter: number;
    // horizontalCenter: number;
    // letf: number;
    // top: number;
    // right: number;
    // bottom: number;
    Component.prototype.setAttribute = function (name, value) {
        if (name == "width" && value.charAt(value.length - 1) == "%") {
            this.properties.percentWidth = +value.slice(0, value.length - 1);
            return true;
        }
        if (name == "height" && value.charAt(value.length - 1) == "%") {
            this.properties.percentHeight = +value.slice(0, value.length - 1);
            return true;
        }
        if (_super.prototype.setAttribute.call(this, name, value))
            return true;
        if (name == "percentWidth")
            this.properties.percentWidth = +value;
        else if (name == "percentHeight")
            this.properties.percentHeight = +value;
        else if (name == "verticalCenter")
            this.properties.verticalCenter = +value;
        else if (name == "horizontalCenter")
            this.properties.horizontalCenter = +value;
        else if (name == "left")
            this.properties.letf = +value;
        else if (name == "top")
            this.properties.top = +value;
        else if (name == "right")
            this.properties.right = +value;
        else if (name == "bottom")
            this.properties.bottom = +value;
        else
            return false;
        return true;
    };
    return Component;
}(sprite_1.Sprite));
exports.Component = Component;
//# sourceMappingURL=component.js.map