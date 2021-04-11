"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DisplayObject = /** @class */ (function () {
    function DisplayObject() {
        this.type = "egret.DisplayObject";
        this.properties = {};
    }
    // id: string;
    // x: number;
    // y: number;
    // width: number;
    // height: number;
    // rotation: number;
    // scaleX: number;
    // scaleY: number;
    // anchorOffsetX: number;
    // anchorOffsetY: number;
    // blendMode:string;
    // visible:boolean;
    // alpha:number;
    DisplayObject.prototype.setAttribute = function (name, value) {
        if (name == "id")
            this.properties.id = value;
        else if (name == "x")
            this.properties.x = +value;
        else if (name == "y")
            this.properties.y = +value;
        else if (name == "width")
            this.properties.width = +value;
        else if (name == "height")
            this.properties.height = +value;
        else if (name == "rotation")
            this.properties.rotation = +value;
        else if (name == "scaleX")
            this.properties.scaleX = +value;
        else if (name == "scaleY")
            this.properties.scaleY = +value;
        else if (name == "anchorOffsetX")
            this.properties.anchorOffsetX = +value;
        else if (name == "anchorOffsetY")
            this.properties.anchorOffsetY = +value;
        else if (name == "blendMode")
            this.properties.blendMode = value;
        else if (name == "visible")
            this.properties.visible = !!value;
        else if (name == "alpha")
            this.properties.alpha = +value;
        else
            return false;
        return true;
    };
    return DisplayObject;
}());
exports.DisplayObject = DisplayObject;
//# sourceMappingURL=display-object.js.map