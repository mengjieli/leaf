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
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "eui.Label";
        return _this;
    }
    // text: string;
    Label.prototype.setAttribute = function (name, value) {
        if (_super.prototype.setAttribute.call(this, name, value))
            return true;
        if (name == "text")
            this.properties.text = value;
        else if (name == "textColor")
            this.properties.textColor = value;
        else if (name == "size")
            this.properties.size = +value;
        else if (name == "bold")
            this.properties.bold = !!value;
        else if (name == "stroke")
            this.properties.stroke = +value;
        else if (name == "strokeColor")
            this.properties.strokeColor = value;
        else if (name == "textAlign")
            this.properties.textAlign = value;
        else
            return false;
        return true;
    };
    return Label;
}(component_1.Component));
exports.Label = Label;
//# sourceMappingURL=label.js.map