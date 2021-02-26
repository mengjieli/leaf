"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xml_element_1 = require("./../utils/xml-element");
var file_1 = require("./../file/file");
var console_1 = require("./../console/console");
var skin_1 = require("./display/skin");
var decode_tween_1 = require("./decode/decode-tween");
var decode_display_1 = require("./decode/decode-display");
var EXML = /** @class */ (function () {
    function EXML() {
        this.tweens = [];
        this.displays = {};
        this.allDisplays = [];
    }
    EXML.prototype.decode = function (url, ignore) {
        var _this = this;
        this.url = url;
        this.ignore = ignore;
        this.content = (new file_1.File(url)).readContent();
        var xml = xml_element_1.XMLElement.parse(this.content);
        if (xml.name != 'e:Skin') {
            console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684 exml:" + this.url + console_1.Console.styles.red[1]);
            return;
        }
        if (xml.getAttribute('class')) {
            this.class = xml.getAttribute('class').value;
        }
        this.root = new skin_1.Skin();
        this.decodeItem(this.root, xml);
        this.tweens.forEach(function (tweenGroup) {
            tweenGroup.items.forEach(function (tweenItem) {
                var display = _this.displays[tweenItem.target];
                if (!display) {
                    console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684\u52A8\u753B\u76EE\u6807 [" + tweenItem.target + "] exml:" + _this.url + console_1.Console.styles.red[1]);
                }
                for (var k in display.properties) {
                    if (k == 'id')
                        continue;
                    tweenItem.init[k] = display.properties[k];
                }
            });
        });
        return [{
                "class": this.class,
                "root": this.root,
                "tweens": this.tweens
            }, this.class, this.allDisplays];
    };
    EXML.prototype.decodeItem = function (item, xml) {
        var _this = this;
        xml.attributes.forEach(function (attribute) {
            if (attribute.value == 'false')
                attribute.value = false;
            var flag = item.setAttribute(attribute.name, attribute.value);
            if (!flag) {
                item.properties[attribute.name] = attribute.value;
                console.log(console_1.Console.styles.yellow[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684 " + xml.name + " \u5C5E\u6027 " + attribute.name + "=" + attribute.value + " \uFF0C\u53EF\u80FD\u4F1A\u6709\u95EE\u9898 url:" + _this.url + console_1.Console.styles.yellow[1]);
            }
        });
        xml.list.forEach(function (element) {
            if (element.name == 'w:Declarations') {
                _this.decodeDeclarations(element);
            }
            else {
                var display = decode_display_1.createDisplay(element.name, _this);
                if (!display)
                    return;
                item.children.push(display);
                _this.decodeItem(display, element);
                if (display.properties.id) {
                    _this.displays[display.properties.id] = display;
                }
                _this.allDisplays.push(display);
            }
        });
    };
    EXML.prototype.decodeDeclarations = function (xml) {
        var _this = this;
        xml.list.forEach(function (element) {
            if (element.name == 'tween:TweenGroup') {
                _this.tweens.push(decode_tween_1.decodeTweenGroup(element, _this));
            }
        });
    };
    EXML.decode = function (url, ignore) {
        var exml = new EXML();
        return exml.decode(url, ignore);
    };
    return EXML;
}());
exports.EXML = EXML;
//# sourceMappingURL=exml.js.map