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
var group_1 = require("./group");
var Skin = /** @class */ (function (_super) {
    __extends(Skin, _super);
    function Skin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "Skin";
        return _this;
    }
    // class: string;
    Skin.prototype.setAttribute = function (name, value) {
        if (_super.prototype.setAttribute.call(this, name, value))
            return true;
        if (name == "class")
            this.properties.class = value;
        else
            return false;
        return true;
    };
    return Skin;
}(group_1.Group));
exports.Skin = Skin;
//# sourceMappingURL=skin.js.map