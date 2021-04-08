"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=string-util.js.map