"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("./../../console/console");
var group_1 = require("../display/group");
var image_1 = require("../display/image");
var label_1 = require("../display/label");
var rect_1 = require("../display/rect");
var component_1 = require("../display/component");
var current;
function createDisplay(name, exml) {
    current = exml;
    if (name == 'e:Group')
        return new group_1.Group();
    if (name == 'e:Image')
        return new image_1.Image();
    if (name == 'e:Label')
        return new label_1.Label();
    if (name == 'e:Rect')
        return new rect_1.Rect();
    if (exml.ignore.indexOf(name) != -1)
        return;
    console.log(console_1.Console.styles.yellow[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684\u5BF9\u8C61 " + name + "\uFF0C\u53EF\u80FD\u4F1A\u6709\u95EE\u9898 url:" + current.url + console_1.Console.styles.yellow[1]);
    return new component_1.Component();
}
exports.createDisplay = createDisplay;
//# sourceMappingURL=decode-display.js.map