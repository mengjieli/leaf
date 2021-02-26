"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_util_1 = require("./string-util");
var ByteArray = /** @class */ (function () {
    function ByteArray(array) {
        if (array instanceof Buffer) {
            var list = [];
            for (var i = 0; i < array.length; i++)
                list[i] = array[i];
            array = list;
        }
        this.big = false;
        this.position = 0;
        if (array) {
            this.bytes = array;
            this.length = array.length;
        }
        else {
            this.bytes = [];
            this.length = 0;
        }
    }
    ByteArray.prototype.initArray = function (array) {
        if (array) {
            this.bytes = array;
            this.length = array.length;
            this.position = 0;
        }
    };
    ByteArray.prototype.writeInt = function (val) {
        var flag = val >= 0 ? true : false;
        val = val >= 0 ? val : (2147483648 + val);
        val = val & 0xFFFFFFFF;
        var big = this.big;
        var bytes = this.bytes;
        if (big) {
            bytes.splice(this.position, 0, (!flag ? 128 : 0) + (val >> 24));
            bytes.splice(this.position, 0, val >> 16 & 0xFF);
            bytes.splice(this.position, 0, val >> 8 & 0xFF);
            bytes.splice(this.position, 0, val & 0xFF);
        }
        else {
            bytes.splice(this.position, 0, val & 0xFF);
            bytes.splice(this.position, 0, val >> 8 & 0xFF);
            bytes.splice(this.position, 0, val >> 16 & 0xFF);
            bytes.splice(this.position, 0, (!flag ? 128 : 0) + (val >> 24));
        }
        this.length += 4;
        this.position += 4;
    };
    ;
    ByteArray.prototype.writeByte = function (val) {
        this.bytes.splice(this.position, 0, val);
        this.length += 1;
        this.position += 1;
    };
    ;
    ByteArray.prototype.writeArray = function (array) {
        for (var i = 0, len = array.length; i < len; i++) {
            this.bytes.splice(this.position, 0, array[i]);
            this.length += 1;
            this.position += 1;
        }
    };
    ByteArray.prototype.writeBoolean = function (val) {
        this.bytes.splice(this.position, 0, val == true ? 1 : 0);
        this.length += 1;
        this.position += 1;
    };
    ;
    ByteArray.prototype.writeUnsignedInt = function (val) {
        var bytes = this.bytes;
        if (this.big) {
            bytes.splice(this.position, 0, val >> 24);
            bytes.splice(this.position, 0, val >> 16 & 0xFF);
            bytes.splice(this.position, 0, val >> 8 & 0xFF);
            bytes.splice(this.position, 0, val & 0xFF);
        }
        else {
            bytes.splice(this.position, 0, val & 0xFF);
            bytes.splice(this.position, 0, val >> 8 & 0xFF);
            bytes.splice(this.position, 0, val >> 16 & 0xFF);
            bytes.splice(this.position, 0, val >> 24);
        }
        this.length += 4;
        this.position += 4;
    };
    ;
    ByteArray.prototype.writeShort = function (val) {
        val = val & 0xFFFF;
        var bytes = this.bytes;
        if (this.big) {
            bytes.splice(this.position, 0, val >> 8 & 0xFF);
            bytes.splice(this.position, 0, val & 0xFF);
        }
        else {
            bytes.splice(this.position, 0, val & 0xFF);
            bytes.splice(this.position, 0, val >> 8 & 0xFF);
        }
        this.length += 2;
        this.position += 2;
    };
    ;
    ByteArray.prototype.writeUnsignedShort = function (val) {
        val = val & 0xFFFF;
        if (this.big) {
            this.bytes.splice(this.position, 0, val >> 8 & 0xFF);
            this.bytes.splice(this.position, 0, val & 0xFF);
        }
        else {
            this.bytes.splice(this.position, 0, val & 0xFF);
            this.bytes.splice(this.position, 0, val >> 8 & 0xFF);
        }
        this.length += 2;
        this.position += 2;
    };
    ;
    ByteArray.prototype.writeUTF = function (val) {
        var arr = string_util_1.encodeUTF8(val);
        this.writeShort(arr.length);
        for (var i = 0; i < arr.length; i++) {
            this.bytes.splice(this.position, 0, arr[i]);
            this.position++;
        }
        this.length += arr.length;
    };
    ;
    ByteArray.prototype.writeUTFBytes = function (val) {
        var arr = string_util_1.encodeUTF8(val);
        for (var i = 0; i < arr.length; i++) {
            this.bytes.splice(this.position, 0, arr[i]);
            this.position++;
        }
        this.length += arr.length;
    };
    ;
    ByteArray.prototype.readInt = function () {
        var val = 0;
        var bytes = this.bytes;
        if (this.big) {
            val = bytes[this.position] | bytes[this.position + 1] << 8 | bytes[this.position + 2] << 16 | bytes[this.position + 3] << 24;
        }
        else {
            val = bytes[this.position + 3] | bytes[this.position + 2] << 8 | bytes[this.position + 1] << 16 | bytes[this.position] << 24;
        }
        //if(val > (1<<31)) val = val - (1<<32);
        this.position += 4;
        return val;
    };
    ;
    ByteArray.prototype.readInt64 = function () {
        var val = 0;
        var bytes = this.bytes;
        if (this.big) {
            val = bytes[this.position] | bytes[this.position + 1] << 8 | bytes[this.position + 2] << 16 | bytes[this.position + 3] << 24 | bytes[this.position + 4] << 32 | bytes[this.position + 5] << 40 | bytes[this.position + 6] << 48 | bytes[this.position + 7] << 56;
        }
        else {
            val = bytes[this.position + 7] | bytes[this.position + 6] << 8 | bytes[this.position + 5] << 16 | bytes[this.position + 4] << 24 | bytes[this.position + 3] << 32 | bytes[this.position + 2] << 40 | bytes[this.position + 1] << 48 | bytes[this.position] << 56;
        }
        //if(val > (1<<31)) val = val - (1<<32);
        this.position += 8;
        return val;
    };
    ;
    ByteArray.prototype.readUnsignedInt = function () {
        var val = 0;
        var bytes = this.bytes;
        if (this.big) {
            val = bytes[this.position] | bytes[this.position + 1] << 8 | bytes[this.position + 2] << 16 | bytes[this.position + 3] << 24;
        }
        else {
            val = bytes[this.position + 3] | bytes[this.position + 2] << 8 | bytes[this.position + 1] << 16 | bytes[this.position] << 24;
        }
        this.position += 4;
        return val;
    };
    ;
    ByteArray.prototype.readByte = function () {
        var val = this.bytes[this.position];
        this.position += 1;
        return val;
    };
    ;
    ByteArray.prototype.readShort = function () {
        var val;
        var bytes = this.bytes;
        if (this.big) {
            val = bytes[this.position] | bytes[this.position + 1] << 8;
        }
        else {
            val = bytes[this.position] << 8 | bytes[this.position + 1];
        }
        if (val > (1 << 15))
            val = val - (1 << 16);
        this.position += 2;
        return val;
    };
    ;
    ByteArray.prototype.readUnsignedShort = function () {
        var val;
        if (this.big) {
            val = this.bytes[this.position] | this.bytes[this.position + 1] << 8;
        }
        else {
            val = this.bytes[this.position] << 8 | this.bytes[this.position + 1];
        }
        if (val > (1 << 15))
            val = val - (1 << 16);
        this.position += 2;
        return val;
    };
    ;
    ByteArray.prototype.readUTF = function () {
        var len = this.readShort();
        var val = string_util_1.decodeUTF8(this.bytes.slice(this.position, this.position + len));
        this.position += len;
        return val;
    };
    ;
    ByteArray.prototype.readUTFBytes = function (len) {
        var val = string_util_1.decodeUTF8(this.bytes.slice(this.position, this.position + len));
        this.position += len;
        return val;
    };
    ;
    ByteArray.prototype.getData = function () {
        return this.bytes;
    };
    Object.defineProperty(ByteArray.prototype, "bytesAvailable", {
        get: function () {
            return this.length - this.position;
        },
        enumerable: true,
        configurable: true
    });
    return ByteArray;
}());
exports.ByteArray = ByteArray;
//# sourceMappingURL=byte-array.js.map