"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TweenSet = /** @class */ (function () {
    function TweenSet() {
    }
    TweenSet.prototype.setAttribute = function (name, value) {
        value = value.slice(1, value.length - 1);
        if (name == "x")
            this.x = +value;
        else if (name == "y")
            this.y = +value;
        else if (name == "scaleX")
            this.scaleX = +value;
        else if (name == "scaleY")
            this.scaleY = +value;
        else if (name == "width")
            this.width = +value;
        else if (name == "height")
            this.height = +value;
        else if (name == "alpha")
            this.alpha = +value;
        else if (name == "rotation")
            this.rotation = +value;
        else
            return false;
        return true;
    };
    return TweenSet;
}());
exports.TweenSet = TweenSet;
//# sourceMappingURL=tween-set.js.map