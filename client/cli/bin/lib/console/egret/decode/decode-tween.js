"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tween_group_1 = require("./../tween/tween-group");
var tween_item_1 = require("./../tween/tween-item");
var tween_set_1 = require("./../tween/tween-set");
var tween_to_1 = require("./../tween/tween-to");
var console_1 = require("./../../console/console");
var current;
function decodeTweenGroup(xml, exml) {
    current = exml;
    var group = new tween_group_1.TweenGroup();
    xml.attributes.forEach(function (attribute) {
        var flag = group.setAttribute(attribute.name, attribute.value);
        if (!flag) {
            group[attribute.name] = attribute.value;
            console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684 " + xml.name + " \u5C5E\u6027 " + attribute.name + "=" + attribute.value + " url:" + exml.url + console_1.Console.styles.red[1]);
        }
    });
    xml.list.forEach(function (element) {
        if (element.name == 'tween:TweenItem') {
            group.items.push(decodeTweenItem(element));
        }
        else {
            console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684\u5BF9\u8C61 " + element.name + " url:" + exml.url + console_1.Console.styles.red[1]);
        }
    });
    return group;
}
exports.decodeTweenGroup = decodeTweenGroup;
function decodeTweenItem(xml) {
    var item = new tween_item_1.TweenItem();
    var time = 0;
    if (!xml.getAttribute('target')) {
        console.log(console_1.Console.styles.red[0] + "\u6CA1\u6709\u627E\u5230 tween:TweenItem target url:" + current.url + console_1.Console.styles.red[1]);
        return item;
    }
    var val = xml.getAttribute('target').value;
    item.target = val.slice(1, val.length - 1);
    xml.list.forEach(function (element) {
        if (element.name == 'tween:Set') {
            item.items.push(decodeTweeSet(element, time));
        }
        else if (element.name == 'tween:To') {
            var ease = "none";
            if (element.getAttribute('ease'))
                ease = element.getAttribute('ease').value;
            item.items.push(decodeTweeTo(element, time, ease));
            if (element.getAttribute('duration')) {
                time += +element.getAttribute('duration').value;
            }
        }
        else if (element.name == 'tween:Wait') {
            if (element.getAttribute('duration')) {
                time += +element.getAttribute('duration').value;
            }
        }
        else {
            console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684\u5BF9\u8C61 " + element.name + " url:" + current.url + console_1.Console.styles.red[1]);
        }
    });
    return item;
}
function decodeTweeSet(xml, time) {
    var item = new tween_set_1.TweenSet();
    item.time = time;
    xml.list.forEach(function (element) {
        if (element.name == 'tween:props') {
            element.list.forEach(function (e) {
                if (e.name == 'e:Object') {
                    e.attributes.filter(function (attribute) {
                        var flag = item.setAttribute(attribute.name, attribute.value);
                        if (!flag) {
                            console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684 " + xml.name + " \u5C5E\u6027 " + attribute.name + "=" + attribute.value + " url:" + current.url + console_1.Console.styles.red[1]);
                        }
                    });
                }
                else {
                    console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684\u5BF9\u8C61 " + element.name + " url:" + current.url + console_1.Console.styles.red[1]);
                }
            });
        }
        else {
            console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684\u5BF9\u8C61 " + element.name + " url:" + current.url + console_1.Console.styles.red[1]);
        }
    });
    return item;
}
function decodeTweeTo(xml, time, ease) {
    var item = new tween_to_1.TweenTo();
    item.time = time;
    item.ease = ease;
    if (!xml.getAttribute('duration')) {
        console.log(console_1.Console.styles.red[0] + "\u6CA1\u6709\u627E\u5230 tween:To duration url:" + current.url + console_1.Console.styles.red[1]);
    }
    item.duration = +xml.getAttribute('duration').value;
    xml.list.forEach(function (element) {
        if (element.name == 'tween:props') {
            element.list.forEach(function (e) {
                if (e.name == 'e:Object') {
                    e.attributes.filter(function (attribute) {
                        var flag = item.setAttribute(attribute.name, attribute.value);
                        if (!flag) {
                            console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684 " + xml.name + " \u5C5E\u6027 " + attribute.name + "=" + attribute.value + " url:" + current.url + console_1.Console.styles.red[1]);
                        }
                    });
                }
                else {
                    console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684\u5BF9\u8C61 " + element.name + " url:" + current.url + console_1.Console.styles.red[1]);
                }
            });
        }
        else {
            console.log(console_1.Console.styles.red[0] + "\u65E0\u6CD5\u8BC6\u522B\u7684\u5BF9\u8C61 " + element.name + " url:" + current.url + console_1.Console.styles.red[1]);
        }
    });
    return item;
}
//# sourceMappingURL=decode-tween.js.map