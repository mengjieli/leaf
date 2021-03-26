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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xml_attribute_1 = require("./xml-attribute");
var xml_name_space_1 = require("./xml-name-space");
var XMLElement = /** @class */ (function (_super) {
    __extends(XMLElement, _super);
    function XMLElement() {
        var _this = _super.call(this) || this;
        _this.namespaces = [];
        _this.attributes = [];
        _this.list = [];
        return _this;
    }
    XMLElement.prototype.addNameSpace = function (nameSpace) {
        this.namespaces.push(nameSpace);
    };
    XMLElement.prototype.getAttribute = function (name) {
        for (var i = 0; i < this.attributes.length; i++) {
            if (this.attributes[i].name == name) {
                return this.attributes[i];
            }
        }
        return null;
    };
    XMLElement.prototype.getNameSapce = function (name) {
        for (var i = 0; i < this.namespaces.length; i++) {
            if (this.namespaces[i].name == name) {
                return this.namespaces[i];
            }
        }
        return null;
    };
    XMLElement.prototype.getElementByAttribute = function (atrName, value) {
        for (var i = 0; i < this.list.length; i++) {
            for (var a = 0; a < this.list[i].attributes.length; a++) {
                if (this.list[i].attributes[a].name == atrName && this.list[i].attributes[a].value == value) {
                    return this.list[i];
                }
            }
        }
        return null;
    };
    XMLElement.prototype.filter = function (filterName, filterAttribute, layer) {
        if (layer === void 0) { layer = -1; }
        var list = [];
        this.filterInChildren(list, filterName, filterAttribute, layer);
        return list;
    };
    XMLElement.prototype.filterInChildren = function (list, filterName, filterAttribute, layer) {
        if (layer === void 0) { layer = -1; }
        var e_1, _a, e_2, _b;
        if (filterName && filterName(this.name)) {
            list.push(this);
        }
        else if (filterAttribute) {
            try {
                for (var _c = __values(this.attributes), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var attribute = _d.value;
                    if (filterAttribute(attribute)) {
                        list.push(this);
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        try {
            for (var _e = __values(this.list), _f = _e.next(); !_f.done; _f = _e.next()) {
                var element = _f.value;
                element.filterInChildren(list, filterName, filterAttribute);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    XMLElement.prototype.getElement = function (name) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].name == name) {
                return this.list[i];
            }
        }
        return null;
    };
    XMLElement.prototype.getElementsIn = function (name) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].name == name) {
                return this.list[i];
            }
        }
        return null;
    };
    XMLElement.prototype.getElements = function (atrName) {
        var res = [];
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].name == atrName) {
                res.push(this.list[i]);
            }
        }
        return res;
    };
    XMLElement.prototype.getAllElements = function () {
        var res = [this];
        for (var i = 0; i < this.list.length; i++) {
            res = res.concat(this.list[i].getAllElements());
        }
        return res;
    };
    XMLElement.prototype.parse = function (content) {
        var delStart = -1;
        for (var i = 0; i < content.length; i++) {
            //if (content.charAt(i) == "\r" || content.charAt(i) == "\n") {
            //    content = content.slice(0, i) + content.slice(i + 1, content.length);
            //    i--;
            //}
            if (delStart == -1 && (content.slice(i, i + 2) == "<!" || content.slice(i, i + 2) == "<?")) {
                delStart = i;
            }
            if (delStart != -1 && content.charAt(i) == ">") {
                content = content.slice(0, delStart) + content.slice(i + 1, content.length);
                i = i - (i - delStart + 1);
                delStart = -1;
            }
        }
        this.readInfo(content);
    };
    XMLElement.prototype.__isStringEmpty = function (str) {
        for (var i = 0, len = str.length; i < len; i++) {
            var char = str.charAt(i);
            if (char != " " && char != "\t" && char != "\r" && char != "\n" && char != "　") {
                return false;
            }
        }
        return true;
    };
    XMLElement.prototype.readInfo = function (content, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        var leftSign = -1;
        var len = content.length;
        var c;
        var j;
        for (var i = startIndex; i < len; i++) {
            c = content.charAt(i);
            if (c == "<") {
                for (j = i + 1; j < len; j++) {
                    c = content.charAt(j);
                    if (c != " " && c != "\t") {
                        i = j;
                        break;
                    }
                }
                for (j = i + 1; j < len; j++) {
                    c = content.charAt(j);
                    if (c == " " || c == "\t" || c == "\r" || c == "\n" || c == "/" || c == ">") {
                        this.name = content.slice(i, j);
                        i = j;
                        break;
                    }
                }
                break;
            }
        }
        var end = false;
        var attribute;
        var nameSpace;
        for (; i < len; i++) {
            c = content.charAt(i);
            if (c == "/") {
                end = true;
            }
            else if (c == ">") {
                i++;
                break;
            }
            else if (c == " " || c == "\t" || c == "\r" || c == "\n" || c == "　") {
            }
            else {
                for (j = i + 1; j < len; j++) {
                    c = content.charAt(j);
                    if (c == "=" || c == " " || c == "\t") {
                        var atrName = content.slice(i, j);
                        if (atrName.split(":").length == 2) {
                            nameSpace = new xml_name_space_1.XMLNameSpace();
                            this.namespaces.push(nameSpace);
                            nameSpace.name = atrName.split(":")[1];
                        }
                        else {
                            attribute = new xml_attribute_1.XMLAttribute();
                            this.attributes.push(attribute);
                            attribute.name = atrName;
                        }
                        break;
                    }
                }
                j++;
                var startSign;
                for (; j < len; j++) {
                    c = content.charAt(j);
                    if (c == "\"" || c == "'") {
                        i = j + 1;
                        startSign = c;
                        break;
                    }
                }
                j++;
                for (; j < len; j++) {
                    c = content.charAt(j);
                    if (c == startSign && content.charAt(j - 1) != "\\") {
                        if (attribute) {
                            attribute.value = content.slice(i, j);
                            attribute = null;
                        }
                        else {
                            nameSpace.value = content.slice(i, j);
                            nameSpace = null;
                        }
                        i = j;
                        break;
                    }
                }
            }
        }
        if (end == true)
            return i;
        var contentStart;
        for (; i < len; i++) {
            c = content.charAt(i);
            if (c != " " && c != "\t") {
                contentStart = i;
                i--;
                break;
            }
        }
        for (; i < len; i++) {
            c = content.charAt(i);
            if (c == "<") {
                for (j = i + 1; j < len; j++) {
                    c = content.charAt(j);
                    if (c != " " && c != "\t") {
                        break;
                    }
                }
                if (c == "/") {
                    for (j = i + 1; j < len; j++) {
                        c = content.charAt(j);
                        if (c == " " || c == "\t" || c == ">") {
                            var endName = content.slice(i + 2, j);
                            if (endName != this.name) {
                                console.log('错误的 xml 格式', this.name, endName);
                                // $error(1020, this.name, endName);
                            }
                            break;
                        }
                    }
                    if (this.list.length == 0) {
                        i--;
                        for (; i >= 0; i--) {
                            c = content.charAt(i);
                            if (c != " " && c != "\t") {
                                break;
                            }
                        }
                        this.value = content.slice(contentStart, i + 1);
                        if (this.value == "" || this.__isStringEmpty(this.value)) {
                            this.value = null;
                        }
                    }
                    for (; j < len; j++) {
                        c = content.charAt(j);
                        if (c == ">") {
                            i = j + 1;
                            break;
                        }
                    }
                    end = true;
                    break;
                }
                else { //视图找 <abcsklsklskl />a
                    var isNextElement = true;
                    for (var n = i + 1; n < len; n++) {
                        c = content.charAt(n);
                        if (c != " " && c != "\t") {
                            break;
                        }
                    }
                    for (; n < len; n++) {
                        c = content.charCodeAt(n);
                        if (c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58) {
                            continue;
                        }
                        else {
                            break;
                        }
                    }
                    for (; n < len; n++) {
                        c = content.charAt(n);
                        if (c != " " && c != "\t") {
                            break;
                        }
                    }
                    var c = content.charCodeAt(n);
                    if (c == 47 || c == 62 || c >= 97 && c <= 122 || c >= 65 && c <= 90) {
                    }
                    else {
                        isNextElement = false;
                    }
                    if (isNextElement) {
                        var element = new XMLElement();
                        this.list.push(element);
                        i = element.readInfo(content, i) - 1;
                    }
                }
            }
        }
        return i;
    };
    XMLElement.prototype.toString = function () {
        return "<" + this.name + "/>";
    };
    XMLElement.parse = function (content) {
        var xml = new XMLElement();
        xml.parse(content);
        return xml;
    };
    return XMLElement;
}(xml_attribute_1.XMLAttribute));
exports.XMLElement = XMLElement;
//# sourceMappingURL=xml-element.js.map