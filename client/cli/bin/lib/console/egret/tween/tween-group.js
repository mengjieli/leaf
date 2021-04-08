"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TweenGroup = /** @class */ (function () {
    function TweenGroup() {
        this.items = [];
    }
    TweenGroup.prototype.setAttribute = function (name, value) {
        if (name == "id")
            this.id = value;
        else
            return false;
        return true;
    };
    return TweenGroup;
}());
exports.TweenGroup = TweenGroup;
//# sourceMappingURL=tween-group.js.map