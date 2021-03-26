"use strict";
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
var string_util_1 = require("./string-util");
function decodeCSV(content) {
    var e_1, _a;
    var list = [];
    content = string_util_1.replace(content, '\r', '\n');
    content = string_util_1.replace(content, '\n\n', '\n');
    var arr = content.split('\n');
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var str = arr_1_1.value;
            var row = [];
            var findBegin = false;
            var begin = 0;
            var specialBegin = false;
            for (var i = 0; i < str.length; i++) {
                if (!findBegin) {
                    begin = i;
                    if (str.charAt(i) == '"') {
                        specialBegin = true;
                        begin++;
                    }
                    findBegin = true;
                }
                if (!specialBegin) {
                    if (str.charAt(i) == ',' || i == str.length - 1) {
                        var item = str.slice(begin, i + (str.charAt(i) == ',' ? 0 : 1));
                        item = string_util_1.replace(item, '""', '"', true);
                        row.push(item);
                        specialBegin = false;
                        findBegin = false;
                    }
                }
                else {
                    if (str.charAt(i) == '"') {
                        if (str.charAt(i + 1) == '"') {
                            i++;
                        }
                        else if (str.charAt(i + 1) == ',' || i == str.length - 1) {
                            var item = str.slice(begin, i);
                            item = string_util_1.replace(item, '""', '"', true);
                            row.push(item);
                            specialBegin = false;
                            findBegin = false;
                            i++;
                        }
                    }
                }
            }
            list.push(row);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return list;
}
exports.decodeCSV = decodeCSV;
function encodeCSV(list, arraySplit) {
    if (arraySplit === void 0) { arraySplit = ','; }
    var str = '';
    for (var l = 0; l < list.length; l++) {
        var row = list[l];
        for (var r = 0; r < row.length; r++) {
            var item = row[r];
            if (item != null) {
                switch (typeof item) {
                    case 'string':
                        item.indexOf('"') != -1 && (item = '"' + item + '"');
                        str += item;
                        break;
                    case 'number':
                        str += item;
                        break;
                    default:
                        if (item instanceof Array) {
                            str += '"[';
                            for (var i = 0; i < item.length; i++) {
                                str += item[i] + (i == item.length - 1 ? '' : arraySplit);
                            }
                            str += ']"';
                        }
                        else {
                            str += item.toString();
                        }
                }
            }
            str += (r == row.length - 1 ? '' : ',');
        }
        str += (l == list.length - 1 ? '' : '\n');
    }
    return str;
}
exports.encodeCSV = encodeCSV;
//# sourceMappingURL=csv.js.map