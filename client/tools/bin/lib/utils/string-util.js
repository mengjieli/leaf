"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pako = require("./../../../../libs/pako/pako");
/**
   * 采用 utf8 编码把字符串转成字节数组
   * @param str
   */
function encodeUTF8(str) {
    var res = [];
    var num;
    for (var i = 0; i < str.length; i++) {
        num = str.charCodeAt(i);
        if (num < 128) {
            res.push(num);
        }
        else if (num < 2048) {
            res.push(Math.floor(num / 64) + 128 + 64);
            res.push((num % 64) + 128);
        }
        else if (num < 65536) {
            res.push(Math.floor(num / 4096) + 128 + 64 + 32);
            res.push(Math.floor((num % 4096) / 64) + 128);
            res.push((num % 64) + 128);
        }
        else {
            res.push(Math.floor(num / 262144) + 128 + 64 + 32 + 16);
            res.push(Math.floor((num % 262144) / 4096) + 128);
            res.push(Math.floor((num % 4096) / 64) + 128);
            res.push((num % 64) + 128);
        }
    }
    return res;
}
exports.encodeUTF8 = encodeUTF8;
/**
 * 把 utf8 编码的字节数组还原成字符串
 * @param arr
 */
function decodeUTF8(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < 0)
            arr[i] += 256;
    }
    var res = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == 0)
            break;
        if ((arr[i] & 128) == 0)
            res.push(arr[i]); //1位
        else if ((arr[i] & 64) == 0)
            res.push(arr[i] & 127); //1位
        else if ((arr[i] & 32) == 0) //2位
        {
            res.push((arr[i] & 31) << 6 + (arr[i + 1] & 63));
            i++;
        }
        else if ((arr[i] & 16) == 0) //3位
        {
            res.push((arr[i] & 15) << 12 + (arr[i + 1] & 63) << 6 + (arr[i + 2] & 63));
            i += 2;
        }
        else if ((arr[i] & 8) == 0) //4位
        {
            res.push((arr[i] & 7) << 18 + (arr[i + 1] & 63) << 12 + (arr[i + 2] & 63) << 6 + (arr[i + 3] & 63));
            i += 3;
        }
    }
    var str = "";
    for (i = 0; i < res.length; i++) {
        str += String.fromCharCode(res[i]);
    }
    return str;
}
exports.decodeUTF8 = decodeUTF8;
//替换某些字符串为指定的字符串
function replace(str, findStr, tstr, jumpFind) {
    if (jumpFind === void 0) { jumpFind = false; }
    for (var i = 0; i < str.length; i++) {
        if (hasStringAt(str, [findStr], i)) {
            str = str.slice(0, i) + tstr + str.slice(i + findStr.length, str.length);
            if (!jumpFind)
                i -= tstr.length - findStr.length;
        }
    }
    return str;
}
exports.replace = replace;
//某个位置是否含有指定字符串之一
function hasStringAt(str, hstrs, pos) {
    for (var i = 0; i < hstrs.length; i++) {
        var hstr = hstrs[i];
        if (str.length - pos >= hstr.length && str.slice(pos, pos + hstr.length) == hstr) {
            return true;
        }
    }
    return false;
}
function getRepeat(str, repeatCount) {
    var res = "";
    for (var i = 0; i < repeatCount; i++) {
        res += str;
    }
    return res;
}
exports.getRepeat = getRepeat;
var Base64 = {
    e: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    decode: function (r) {
        var o = String(r).replace(/=+$/, "");
        if (o.length % 4 == 1)
            throw "'atob' failed: The string to be decoded is not correctly encoded.";
        for (var n, a, i = 0, c = 0, d = ""; a = o.charAt(c++); ~a && (n = i % 4 ? 64 * n + a : a, i++ % 4) ? d += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0)
            a = Base64.e.indexOf(a);
        return d;
    },
    encode: function (r) {
        for (var o, n, a = String(r), i = 0, c = Base64.e, d = ""; a.charAt(0 | i) || (c = "=", i % 1); d += c.charAt(63 & o >> 8 - i % 1 * 8)) {
            if (n = a.charCodeAt(i += .75), n > 255)
                throw "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.";
            o = o << 8 | n;
        }
        return d;
    }
};
function compressJSON(json, parse = true) {
    var str = JSON.stringify(json);
    if (parse == false) {
        str = str.replace(/\\\"/g, '"');
        str = str.slice(1, str.length - 1);
    }
    // console.error(str);
    var arr = encodeUTF8(str);
    var byte = new Uint8Array(arr);
    var cm = pako.gzip(byte, { level: 9 });
    var encode = function (bytes) {
        var bString = "";
        for (var i = 0, len = bytes.length; i < len; ++i) {
            bString += String.fromCharCode(bytes[i]);
        }
        return Base64.encode(bString);
    };
    return encode(cm);
    // return "[\"" + encode(cm) + "\"]";
}
exports.compressJSON = compressJSON;
function decodeJSON(content) {
    var decode = function (base64Str) {
        var bString = base64Str; //Base64.decode(base64Str);
        var len = bString.length;
        var arr = new Uint8Array(len);
        while (len--) {
            arr[len] = bString.charCodeAt(len);
        }
        return arr;
    };
    return JSON.parse(decodeUTF8(Array.from(pako.ungzip(decode(content)))));
}
exports.decodeJSON = decodeJSON;
//# sourceMappingURL=string-util.js.map