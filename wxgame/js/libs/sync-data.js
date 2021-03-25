var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var syncData;
(function (syncData) {
    /**
     * The Endian class contains values that denote the byte order used to represent multibyte numbers.
     * The byte order is either bigEndian (most significant byte first) or littleEndian (least significant byte first).
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * Endian 类中包含一些值，它们表示用于表示多字节数字的字节顺序。
     * 字节顺序为 bigEndian（最高有效字节位于最前）或 littleEndian（最低有效字节位于最前）。
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    var Endian = /** @class */ (function () {
        function Endian() {
        }
        /**
         * Indicates the least significant byte of the multibyte number appears first in the sequence of bytes.
         * The hexadecimal number 0x12345678 has 4 bytes (2 hexadecimal digits per byte). The most significant byte is 0x12. The least significant byte is 0x78. (For the equivalent decimal number, 305419896, the most significant digit is 3, and the least significant digit is 6).
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 表示多字节数字的最低有效字节位于字节序列的最前面。
         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Endian.LITTLE_ENDIAN = "littleEndian";
        /**
         * Indicates the most significant byte of the multibyte number appears first in the sequence of bytes.
         * The hexadecimal number 0x12345678 has 4 bytes (2 hexadecimal digits per byte).  The most significant byte is 0x12. The least significant byte is 0x78. (For the equivalent decimal number, 305419896, the most significant digit is 3, and the least significant digit is 6).
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 表示多字节数字的最高有效字节位于字节序列的最前面。
         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Endian.BIG_ENDIAN = "bigEndian";
        return Endian;
    }());
    syncData.Endian = Endian;
    /**
     * The ByteArray class provides methods and attributes for optimized reading and writing as well as dealing with binary data.
     * Note: The ByteArray class is applied to the advanced developers who need to access data at the byte layer.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/ByteArray.ts
     * @language en_US
     */
    /**
     * ByteArray 类提供用于优化读取、写入以及处理二进制数据的方法和属性。
     * 注意：ByteArray 类适用于需要在字节层访问数据的高级开发人员。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/ByteArray.ts
     * @language zh_CN
     */
    var ByteArray = /** @class */ (function () {
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function ByteArray(buffer, bufferExtSize) {
            if (bufferExtSize === void 0) { bufferExtSize = 0; }
            /**
             * @private
             */
            this.bufferExtSize = 0; //Buffer expansion size
            /**
             * @private
             */
            this.EOF_byte = -1;
            /**
             * @private
             */
            this.EOF_code_point = -1;
            if (bufferExtSize < 0) {
                bufferExtSize = 0;
            }
            this.bufferExtSize = bufferExtSize;
            var bytes, wpos = 0;
            if (buffer) {
                //有数据，则可写字节数从字节尾开始
                var uint8 = void 0;
                if (buffer instanceof Uint8Array) {
                    uint8 = buffer;
                    wpos = buffer.length;
                }
                else {
                    wpos = buffer.byteLength;
                    uint8 = new Uint8Array(buffer);
                }
                if (bufferExtSize == 0) {
                    bytes = new Uint8Array(wpos);
                }
                else {
                    var multi = ((wpos / bufferExtSize) | 0) + 1;
                    bytes = new Uint8Array(multi * bufferExtSize);
                }
                bytes.set(uint8);
            }
            else {
                bytes = new Uint8Array(bufferExtSize);
            }
            this.write_position = wpos;
            this._position = 0;
            this._bytes = bytes;
            this.data = new DataView(bytes.buffer);
            this.endian = Endian.BIG_ENDIAN;
        }
        Object.defineProperty(ByteArray.prototype, "endian", {
            /**
             * Changes or reads the byte order; egret.EndianConst.BIG_ENDIAN or egret.EndianConst.LITTLE_EndianConst.
             * @default egret.EndianConst.BIG_ENDIAN
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 更改或读取数据的字节顺序；egret.EndianConst.BIG_ENDIAN 或 egret.EndianConst.LITTLE_ENDIAN。
             * @default egret.EndianConst.BIG_ENDIAN
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$endian == 0 /* LITTLE_ENDIAN */
                    ? Endian.LITTLE_ENDIAN
                    : Endian.BIG_ENDIAN;
            },
            set: function (value) {
                this.$endian =
                    value == Endian.LITTLE_ENDIAN
                        ? 0 /* LITTLE_ENDIAN */
                        : 1 /* BIG_ENDIAN */;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         * @version Egret 2.4
         * @platform Web,Native
         */
        ByteArray.prototype.setArrayBuffer = function (buffer) { };
        Object.defineProperty(ByteArray.prototype, "readAvailable", {
            /**
             * 可读的剩余字节数
             *
             * @returns
             *
             * @memberOf ByteArray
             */
            get: function () {
                return this.write_position - this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "buffer", {
            get: function () {
                return this.data.buffer.slice(0, this.write_position);
            },
            /**
             * @private
             */
            set: function (value) {
                var wpos = value.byteLength;
                var uint8 = new Uint8Array(value);
                var bufferExtSize = this.bufferExtSize;
                var bytes;
                if (bufferExtSize == 0) {
                    bytes = new Uint8Array(wpos);
                }
                else {
                    var multi = ((wpos / bufferExtSize) | 0) + 1;
                    bytes = new Uint8Array(multi * bufferExtSize);
                }
                bytes.set(uint8);
                this.write_position = wpos;
                this._bytes = bytes;
                this.data = new DataView(bytes.buffer);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "rawBuffer", {
            get: function () {
                return this.data.buffer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "bytes", {
            get: function () {
                return this._bytes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "dataView", {
            /**
             * @private
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.data;
            },
            /**
             * @private
             */
            set: function (value) {
                this.buffer = value.buffer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "bufferOffset", {
            /**
             * @private
             */
            get: function () {
                return this.data.byteOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "position", {
            /**
             * The current position of the file pointer (in bytes) to move or return to the ByteArray object. The next time you start reading reading method call in this position, or will start writing in this position next time call a write method.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
                if (value > this.write_position) {
                    this.write_position = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ByteArray.prototype, "length", {
            /**
             * The length of the ByteArray object (in bytes).
             * If the length is set to be larger than the current length, the right-side zero padding byte array.
             * If the length is set smaller than the current length, the byte array is truncated.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * ByteArray 对象的长度（以字节为单位）。
             * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
             * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.write_position;
            },
            set: function (value) {
                this.write_position = value;
                if (this.data.byteLength > value) {
                    this._position = value;
                }
                this._validateBuffer(value);
            },
            enumerable: true,
            configurable: true
        });
        ByteArray.prototype._validateBuffer = function (value) {
            if (this.data.byteLength < value) {
                var be = this.bufferExtSize;
                var tmp = void 0;
                if (be == 0) {
                    tmp = new Uint8Array(value);
                }
                else {
                    var nLen = (((value / be) >> 0) + 1) * be;
                    tmp = new Uint8Array(nLen);
                }
                tmp.set(this._bytes);
                this._bytes = tmp;
                this.data = new DataView(tmp.buffer);
            }
        };
        Object.defineProperty(ByteArray.prototype, "bytesAvailable", {
            /**
             * The number of bytes that can be read from the current position of the byte array to the end of the array data.
             * When you access a ByteArray object, the bytesAvailable property in conjunction with the read methods each use to make sure you are reading valid data.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
             * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.data.byteLength - this._position;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Clears the contents of the byte array and resets the length and position properties to 0.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 清除字节数组的内容，并将 length 和 position 属性重置为 0。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.clear = function () {
            var buffer = new ArrayBuffer(this.bufferExtSize);
            this.data = new DataView(buffer);
            this._bytes = new Uint8Array(buffer);
            this._position = 0;
            this.write_position = 0;
        };
        /**
         * Read a Boolean value from the byte stream. Read a simple byte. If the byte is non-zero, it returns true; otherwise, it returns false.
         * @return If the byte is non-zero, it returns true; otherwise, it returns false.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取布尔值。读取单个字节，如果字节非零，则返回 true，否则返回 false
         * @return 如果字节不为零，则返回 true，否则返回 false
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readBoolean = function () {
            if (this.validate(1 /* SIZE_OF_BOOLEAN */))
                return !!this._bytes[this.position++];
        };
        /**
         * Read signed bytes from the byte stream.
         * @return An integer ranging from -128 to 127
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取带符号的字节
         * @return 介于 -128 和 127 之间的整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readByte = function () {
            if (this.validate(1 /* SIZE_OF_INT8 */))
                return this.data.getInt8(this.position++);
        };
        /**
         * Read data byte number specified by the length parameter from the byte stream. Starting from the position specified by offset, read bytes into the ByteArray object specified by the bytes parameter, and write bytes into the target ByteArray
         * @param bytes ByteArray object that data is read into
         * @param offset Offset (position) in bytes. Read data should be written from this position
         * @param length Byte number to be read Default value 0 indicates reading all available data
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中
         * @param bytes 要将数据读入的 ByteArray 对象
         * @param offset bytes 中的偏移（位置），应从该位置写入读取的数据
         * @param length 要读取的字节数。默认值 0 导致读取所有可用的数据
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            if (!bytes) {
                //由于bytes不返回，所以new新的无意义
                return;
            }
            var pos = this._position;
            var available = this.write_position - pos;
            if (available < 0) {
                console.error('遇到文件尾');
                return;
            }
            if (length == 0) {
                length = available;
            }
            else if (length > available) {
                console.error('遇到文件尾');
                return;
            }
            var position = bytes._position;
            bytes._position = 0;
            bytes.validateBuffer(offset + length);
            bytes._position = position;
            bytes._bytes.set(this._bytes.subarray(pos, pos + length), offset);
            this.position += length;
        };
        /**
         * Read an IEEE 754 double-precision (64 bit) floating point number from the byte stream
         * @return Double-precision (64 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数
         * @return 双精度（64 位）浮点数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readDouble = function () {
            if (this.validate(8 /* SIZE_OF_FLOAT64 */)) {
                var value = this.data.getFloat64(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 8 /* SIZE_OF_FLOAT64 */;
                return value;
            }
        };
        /**
         * Read an IEEE 754 single-precision (32 bit) floating point number from the byte stream
         * @return Single-precision (32 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数
         * @return 单精度（32 位）浮点数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readFloat = function () {
            if (this.validate(4 /* SIZE_OF_FLOAT32 */)) {
                var value = this.data.getFloat32(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 4 /* SIZE_OF_FLOAT32 */;
                return value;
            }
        };
        /**
         * Read a 32-bit signed integer from the byte stream.
         * @return A 32-bit signed integer ranging from -2147483648 to 2147483647
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个带符号的 32 位整数
         * @return 介于 -2147483648 和 2147483647 之间的 32 位带符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readInt = function () {
            if (this.validate(4 /* SIZE_OF_INT32 */)) {
                var value = this.data.getInt32(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 4 /* SIZE_OF_INT32 */;
                return value;
            }
        };
        /**
         * Read a 16-bit signed integer from the byte stream.
         * @return A 16-bit signed integer ranging from -32768 to 32767
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个带符号的 16 位整数
         * @return 介于 -32768 和 32767 之间的 16 位带符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readShort = function () {
            if (this.validate(2 /* SIZE_OF_INT16 */)) {
                var value = this.data.getInt16(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 2 /* SIZE_OF_INT16 */;
                return value;
            }
        };
        /**
         * Read unsigned bytes from the byte stream.
         * @return A unsigned integer ranging from 0 to 255
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取无符号的字节
         * @return 介于 0 和 255 之间的无符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readUnsignedByte = function () {
            if (this.validate(1 /* SIZE_OF_UINT8 */))
                return this._bytes[this.position++];
        };
        /**
         * Read a 32-bit unsigned integer from the byte stream.
         * @return A 32-bit unsigned integer ranging from 0 to 4294967295
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个无符号的 32 位整数
         * @return 介于 0 和 4294967295 之间的 32 位无符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readUnsignedInt = function () {
            if (this.validate(4 /* SIZE_OF_UINT32 */)) {
                var value = this.data.getUint32(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 4 /* SIZE_OF_UINT32 */;
                return value;
            }
        };
        /**
         * Read a 16-bit unsigned integer from the byte stream.
         * @return A 16-bit unsigned integer ranging from 0 to 65535
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个无符号的 16 位整数
         * @return 介于 0 和 65535 之间的 16 位无符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readUnsignedShort = function () {
            if (this.validate(2 /* SIZE_OF_UINT16 */)) {
                var value = this.data.getUint16(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
                this.position += 2 /* SIZE_OF_UINT16 */;
                return value;
            }
        };
        /**
         * Read a UTF-8 character string from the byte stream Assume that the prefix of the character string is a short unsigned integer (use byte to express length)
         * @return UTF-8 character string
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是无符号的短整型（以字节表示长度）
         * @return UTF-8 编码的字符串
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readUTF = function () {
            var length = this.readUnsignedShort();
            if (length > 0) {
                return this.readUTFBytes(length);
            }
            else {
                return "";
            }
        };
        /**
         * Read a UTF-8 byte sequence specified by the length parameter from the byte stream, and then return a character string
         * @param Specify a short unsigned integer of the UTF-8 byte length
         * @return A character string consists of UTF-8 bytes of the specified length
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串
         * @param length 指明 UTF-8 字节长度的无符号短整型数
         * @return 由指定长度的 UTF-8 字节组成的字符串
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.readUTFBytes = function (length) {
            if (!this.validate(length)) {
                return;
            }
            var data = this.data;
            var bytes = new Uint8Array(data.buffer, data.byteOffset + this._position, length);
            this.position += length;
            return this.decodeUTF8(bytes);
        };
        /**
         * Write a Boolean value. A single byte is written according to the value parameter. If the value is true, write 1; if the value is false, write 0.
         * @param value A Boolean value determining which byte is written. If the value is true, write 1; if the value is false, write 0.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 写入布尔值。根据 value 参数写入单个字节。如果为 true，则写入 1，如果为 false，则写入 0
         * @param value 确定写入哪个字节的布尔值。如果该参数为 true，则该方法写入 1；如果该参数为 false，则该方法写入 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeBoolean = function (value) {
            this.validateBuffer(1 /* SIZE_OF_BOOLEAN */);
            this._bytes[this.position++] = +value;
        };
        /**
         * Write a byte into the byte stream
         * The low 8 bits of the parameter are used. The high 24 bits are ignored.
         * @param value A 32-bit integer. The low 8 bits will be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个字节
         * 使用参数的低 8 位。忽略高 24 位
         * @param value 一个 32 位整数。低 8 位将被写入字节流
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeByte = function (value) {
            this.validateBuffer(1 /* SIZE_OF_INT8 */);
            this._bytes[this.position++] = value & 0xff;
        };
        /**
         * Write the byte sequence that includes length bytes in the specified byte array, bytes, (starting at the byte specified by offset, using a zero-based index), into the byte stream
         * If the length parameter is omitted, the default length value 0 is used and the entire buffer starting at offset is written. If the offset parameter is also omitted, the entire buffer is written
         * If the offset or length parameter is out of range, they are clamped to the beginning and end of the bytes array.
         * @param bytes ByteArray Object
         * @param offset A zero-based index specifying the position into the array to begin writing
         * @param length An unsigned integer specifying how far into the buffer to write
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将指定字节数组 bytes（起始偏移量为 offset，从零开始的索引）中包含 length 个字节的字节序列写入字节流
         * 如果省略 length 参数，则使用默认长度 0；该方法将从 offset 开始写入整个缓冲区。如果还省略了 offset 参数，则写入整个缓冲区
         * 如果 offset 或 length 超出范围，它们将被锁定到 bytes 数组的开头和结尾
         * @param bytes ByteArray 对象
         * @param offset 从 0 开始的索引，表示在数组中开始写入的位置
         * @param length 一个无符号整数，表示在缓冲区中的写入范围
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            var writeLength;
            if (offset < 0) {
                return;
            }
            if (length < 0) {
                return;
            }
            else if (length == 0) {
                writeLength = bytes.length - offset;
            }
            else {
                writeLength = Math.min(bytes.length - offset, length);
            }
            if (writeLength > 0) {
                this.validateBuffer(writeLength);
                this._bytes.set(bytes._bytes.subarray(offset, offset + writeLength), this._position);
                this.position = this._position + writeLength;
            }
        };
        /**
         * Write an IEEE 754 double-precision (64 bit) floating point number into the byte stream
         * @param value Double-precision (64 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个 IEEE 754 双精度（64 位）浮点数
         * @param value 双精度（64 位）浮点数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeDouble = function (value) {
            this.validateBuffer(8 /* SIZE_OF_FLOAT64 */);
            this.data.setFloat64(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 8 /* SIZE_OF_FLOAT64 */;
        };
        /**
         * Write an IEEE 754 single-precision (32 bit) floating point number into the byte stream
         * @param value Single-precision (32 bit) floating point number
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数
         * @param value 单精度（32 位）浮点数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeFloat = function (value) {
            this.validateBuffer(4 /* SIZE_OF_FLOAT32 */);
            this.data.setFloat32(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 4 /* SIZE_OF_FLOAT32 */;
        };
        /**
         * Write a 32-bit signed integer into the byte stream
         * @param value An integer to be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个带符号的 32 位整数
         * @param value 要写入字节流的整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeInt = function (value) {
            this.validateBuffer(4 /* SIZE_OF_INT32 */);
            this.data.setInt32(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 4 /* SIZE_OF_INT32 */;
        };
        /**
         * Write a 16-bit integer into the byte stream. The low 16 bits of the parameter are used. The high 16 bits are ignored.
         * @param value A 32-bit integer. Its low 16 bits will be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个 16 位整数。使用参数的低 16 位。忽略高 16 位
         * @param value 32 位整数，该整数的低 16 位将被写入字节流
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeShort = function (value) {
            this.validateBuffer(2 /* SIZE_OF_INT16 */);
            this.data.setInt16(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 2 /* SIZE_OF_INT16 */;
        };
        /**
         * Write a 32-bit unsigned integer into the byte stream
         * @param value An unsigned integer to be written into the byte stream
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个无符号的 32 位整数
         * @param value 要写入字节流的无符号整数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeUnsignedInt = function (value) {
            this.validateBuffer(4 /* SIZE_OF_UINT32 */);
            this.data.setUint32(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 4 /* SIZE_OF_UINT32 */;
        };
        /**
         * Write a 16-bit unsigned integer into the byte stream
         * @param value An unsigned integer to be written into the byte stream
         * @version Egret 2.5
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在字节流中写入一个无符号的 16 位整数
         * @param value 要写入字节流的无符号整数
         * @version Egret 2.5
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeUnsignedShort = function (value) {
            this.validateBuffer(2 /* SIZE_OF_UINT16 */);
            this.data.setUint16(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 2 /* SIZE_OF_UINT16 */;
        };
        /**
         * Write a UTF-8 string into the byte stream. The length of the UTF-8 string in bytes is written first, as a 16-bit integer, followed by the bytes representing the characters of the string
         * @param value Character string value to be written
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节
         * @param value 要写入的字符串值
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeUTF = function (value) {
            var utf8bytes = this.encodeUTF8(value);
            var length = utf8bytes.length;
            this.validateBuffer(2 /* SIZE_OF_UINT16 */ + length);
            this.data.setUint16(this._position, length, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 2 /* SIZE_OF_UINT16 */;
            this._writeUint8Array(utf8bytes, false);
        };
        ByteArray.prototype.writeShortUTF = function (value) {
            var utf8bytes = this.encodeUTF8(value);
            var length = utf8bytes.length;
            this.validateBuffer(1 /* SIZE_OF_UINT8 */ + length);
            this.data.setUint8(this._position, length);
            this.position += 1 /* SIZE_OF_UINT8 */;
            this._writeUint8Array(utf8bytes, false);
        };
        /**
         * Write a UTF-8 string into the byte stream. Similar to the writeUTF() method, but the writeUTFBytes() method does not prefix the string with a 16-bit length word
         * @param value Character string value to be written
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的词为字符串添加前缀
         * @param value 要写入的字符串值
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ByteArray.prototype.writeUTFBytes = function (value) {
            this._writeUint8Array(this.encodeUTF8(value));
        };
        /**
         *
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        ByteArray.prototype.toString = function () {
            return ("[ByteArray] length:" +
                this.length +
                ", bytesAvailable:" +
                this.bytesAvailable);
        };
        /**
         * @private
         * 将 Uint8Array 写入字节流
         * @param bytes 要写入的Uint8Array
         * @param validateBuffer
         */
        ByteArray.prototype._writeUint8Array = function (bytes, validateBuffer) {
            if (validateBuffer === void 0) { validateBuffer = true; }
            var pos = this._position;
            var npos = pos + bytes.length;
            if (validateBuffer) {
                this.validateBuffer(npos);
            }
            this.bytes.set(bytes, pos);
            this.position = npos;
        };
        /**
         * @param len
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        ByteArray.prototype.validate = function (len) {
            var bl = this._bytes.length;
            if (bl > 0 && this._position + len <= bl) {
                return true;
            }
            else {
                console.error('遇到文件尾');
            }
        };
        /**********************/
        /*  PRIVATE METHODS   */
        /**********************/
        /**
         * @private
         * @param len
         * @param needReplace
         */
        ByteArray.prototype.validateBuffer = function (len) {
            this.write_position =
                len > this.write_position ? len : this.write_position;
            len += this._position;
            this._validateBuffer(len);
        };
        /**
         * @private
         * UTF-8 Encoding/Decoding
         */
        ByteArray.prototype.encodeUTF8 = function (str) {
            var pos = 0;
            var codePoints = this.stringToCodePoints(str);
            var outputBytes = [];
            while (codePoints.length > pos) {
                var code_point = codePoints[pos++];
                if (this.inRange(code_point, 0xd800, 0xdfff)) {
                    this.encoderError(code_point);
                }
                else if (this.inRange(code_point, 0x0000, 0x007f)) {
                    outputBytes.push(code_point);
                }
                else {
                    var count = void 0, offset = void 0;
                    if (this.inRange(code_point, 0x0080, 0x07ff)) {
                        count = 1;
                        offset = 0xc0;
                    }
                    else if (this.inRange(code_point, 0x0800, 0xffff)) {
                        count = 2;
                        offset = 0xe0;
                    }
                    else if (this.inRange(code_point, 0x10000, 0x10ffff)) {
                        count = 3;
                        offset = 0xf0;
                    }
                    outputBytes.push(this.div(code_point, Math.pow(64, count)) + offset);
                    while (count > 0) {
                        var temp = this.div(code_point, Math.pow(64, count - 1));
                        outputBytes.push(0x80 + (temp % 64));
                        count -= 1;
                    }
                }
            }
            return new Uint8Array(outputBytes);
        };
        /**
         * @private
         *
         * @param data
         * @returns
         */
        ByteArray.prototype.decodeUTF8 = function (data) {
            var fatal = false;
            var pos = 0;
            var result = "";
            var code_point;
            var utf8_code_point = 0;
            var utf8_bytes_needed = 0;
            var utf8_bytes_seen = 0;
            var utf8_lower_boundary = 0;
            while (data.length > pos) {
                var _byte = data[pos++];
                if (_byte == this.EOF_byte) {
                    if (utf8_bytes_needed != 0) {
                        code_point = this.decoderError(fatal);
                    }
                    else {
                        code_point = this.EOF_code_point;
                    }
                }
                else {
                    if (utf8_bytes_needed == 0) {
                        if (this.inRange(_byte, 0x00, 0x7f)) {
                            code_point = _byte;
                        }
                        else {
                            if (this.inRange(_byte, 0xc2, 0xdf)) {
                                utf8_bytes_needed = 1;
                                utf8_lower_boundary = 0x80;
                                utf8_code_point = _byte - 0xc0;
                            }
                            else if (this.inRange(_byte, 0xe0, 0xef)) {
                                utf8_bytes_needed = 2;
                                utf8_lower_boundary = 0x800;
                                utf8_code_point = _byte - 0xe0;
                            }
                            else if (this.inRange(_byte, 0xf0, 0xf4)) {
                                utf8_bytes_needed = 3;
                                utf8_lower_boundary = 0x10000;
                                utf8_code_point = _byte - 0xf0;
                            }
                            else {
                                this.decoderError(fatal);
                            }
                            utf8_code_point =
                                utf8_code_point * Math.pow(64, utf8_bytes_needed);
                            code_point = null;
                        }
                    }
                    else if (!this.inRange(_byte, 0x80, 0xbf)) {
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        pos--;
                        code_point = this.decoderError(fatal, _byte);
                    }
                    else {
                        utf8_bytes_seen += 1;
                        utf8_code_point =
                            utf8_code_point +
                                (_byte - 0x80) *
                                    Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                        if (utf8_bytes_seen !== utf8_bytes_needed) {
                            code_point = null;
                        }
                        else {
                            var cp = utf8_code_point;
                            var lower_boundary = utf8_lower_boundary;
                            utf8_code_point = 0;
                            utf8_bytes_needed = 0;
                            utf8_bytes_seen = 0;
                            utf8_lower_boundary = 0;
                            if (this.inRange(cp, lower_boundary, 0x10ffff) &&
                                !this.inRange(cp, 0xd800, 0xdfff)) {
                                code_point = cp;
                            }
                            else {
                                code_point = this.decoderError(fatal, _byte);
                            }
                        }
                    }
                }
                //Decode string
                if (code_point !== null && code_point !== this.EOF_code_point) {
                    if (code_point <= 0xffff) {
                        if (code_point > 0)
                            result += String.fromCharCode(code_point);
                    }
                    else {
                        code_point -= 0x10000;
                        result += String.fromCharCode(0xd800 + ((code_point >> 10) & 0x3ff));
                        result += String.fromCharCode(0xdc00 + (code_point & 0x3ff));
                    }
                }
            }
            return result;
        };
        /**
         * @private
         *
         * @param code_point
         */
        ByteArray.prototype.encoderError = function (code_point) {
            console.error("EncodingError! The code point " + code_point + " could not be encoded.");
        };
        /**
         * @private
         *
         * @param fatal
         * @param opt_code_point
         * @returns
         */
        ByteArray.prototype.decoderError = function (fatal, opt_code_point) {
            if (fatal) {
                console.error('DecodingError');
            }
            return opt_code_point || 0xfffd;
        };
        /**
         * @private
         *
         * @param a
         * @param min
         * @param max
         */
        ByteArray.prototype.inRange = function (a, min, max) {
            return min <= a && a <= max;
        };
        /**
         * @private
         *
         * @param n
         * @param d
         */
        ByteArray.prototype.div = function (n, d) {
            return Math.floor(n / d);
        };
        /**
         * @private
         *
         * @param string
         */
        ByteArray.prototype.stringToCodePoints = function (string) {
            /** @type {Array.<number>} */
            var cps = [];
            // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
            var i = 0, n = string.length;
            while (i < string.length) {
                var c = string.charCodeAt(i);
                if (!this.inRange(c, 0xd800, 0xdfff)) {
                    cps.push(c);
                }
                else if (this.inRange(c, 0xdc00, 0xdfff)) {
                    cps.push(0xfffd);
                }
                else {
                    // (inRange(c, 0xD800, 0xDBFF))
                    if (i == n - 1) {
                        cps.push(0xfffd);
                    }
                    else {
                        var d = string.charCodeAt(i + 1);
                        if (this.inRange(d, 0xdc00, 0xdfff)) {
                            var a = c & 0x3ff;
                            var b = d & 0x3ff;
                            i += 1;
                            cps.push(0x10000 + (a << 10) + b);
                        }
                        else {
                            cps.push(0xfffd);
                        }
                    }
                }
                i += 1;
            }
            return cps;
        };
        return ByteArray;
    }());
    syncData.ByteArray = ByteArray;
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    /**
     * 获取差异变化数值
     * @param target 要获取差异变化的对象
     * @param keys 键值数组，例如：["props", "itemA"]
     */
    function getDifference(target, keys) {
        var historyValue = target.history;
        var currentValue = target;
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (typeof historyValue.get === "function") {
                historyValue = historyValue.get(key);
            }
            else if (typeof historyValue.getTime === "function") {
                historyValue = historyValue[key].getTime();
            }
            else {
                historyValue = historyValue[key];
            }
            //没有变化
            if (!historyValue) {
                if (i != keys.length - 1 && orange.debug) {
                    console.warn("syncData.getDifference 数据非法", keys);
                }
                return currentValue;
            }
            if (typeof currentValue.get === "function") {
                currentValue = currentValue.get(key);
            }
            else if (typeof currentValue.getTime === "function") {
                currentValue = currentValue[key].getTime();
            }
            else {
                currentValue = currentValue[key];
            }
        }
        return currentValue - historyValue;
    }
    syncData.getDifference = getDifference;
    /**
     * 获取差异变化 Map
     * @param target 要获取差异变化的对象
     * @param keys 要获取差异变化的Map
     */
    function getDifferenceMap(target, keys) {
        if (typeof keys === "string") {
            keys = [keys];
        }
        var result = new Map();
        var _loop_1 = function (i) {
            var key = keys[i];
            var history_1 = target.history.get(key);
            var current = target[key];
            current.forEach(function (value, key) {
                var historyValue = history_1.get(key) || 0;
                if (value - historyValue !== 0) {
                    result.set(key, value - historyValue);
                }
            });
            // current减少为0被清除的情况
            history_1.forEach(function (value, key) {
                if (!result.has(key)) {
                    result.set(key, -value);
                }
            });
        };
        for (var i = 0; i < keys.length; ++i) {
            _loop_1(i);
        }
        return result;
    }
    syncData.getDifferenceMap = getDifferenceMap;
    function find(keys, value) {
        var val = orange.GetUtil.getFromGlobal(keys);
        var flag = false;
        if (val && val instanceof DataBase) {
            val.$search("", value, function (findKeys, result) {
                flag = true;
                console.log("[find] 找到对象:", keys + "." + findKeys, result);
            });
            if (!flag)
                console.log("[find] 没有查找到对应结果");
        }
        else {
            console.log("[find] 类型错误，无法查找");
        }
    }
    syncData.find = find;
    var DataBase = /** @class */ (function (_super) {
        __extends(DataBase, _super);
        function DataBase() {
            var _this = _super.call(this) || this;
            _this.properties = Object.getPrototypeOf(_this).constructor.properties;
            _this.history = new Map();
            return _this;
        }
        DataBase.prototype.dispose = function () {
            var _this = this;
            orange.stop(this);
            orange.removeAllListeners(this);
            var properties = this.properties;
            properties.forEach(function (t, key) {
                var e_1, _a;
                if (t.type == 1) {
                    if (_this[key]) {
                        _this[key].dispose();
                    }
                }
                else if (t.type == 2) {
                    if (t.classType && _this[key]) {
                        try {
                            for (var _b = __values(_this[key]), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var item = _c.value;
                                if (item)
                                    item.dispose();
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                else if (t.type == 3) {
                    if (t.classType && _this[key]) {
                        _this[key].forEach(function (item) {
                            if (item)
                                item.dispose();
                        });
                    }
                }
            });
        };
        DataBase.prototype.find = function (value) {
            var find = false;
            this.$search("", value, function (key) {
                find = true;
                console.log("[find] 找到结果:", key);
            });
            if (!find) {
                console.log("[find] 没有找到对应的结果");
            }
        };
        DataBase.prototype.$search = function (keys, findValue, find) {
            var _this = this;
            keys += keys == "" ? "" : ".";
            this.properties.forEach(function (value, key) {
                var subKeys = keys + key;
                //0:基本类型  1:class  2:Array  3:Map 4:Date
                if (value.type == 0) {
                    if (typeof findValue === "function") {
                        if (findValue(_this[key], subKeys))
                            find(subKeys, _this[key]);
                    }
                    else {
                        if (_this[key] == findValue)
                            find(subKeys, _this[key]);
                    }
                }
                else if (value.type == 1) {
                    _this[key] &&
                        _this[key].$search &&
                        _this[key].$search(subKeys, findValue, find);
                }
                else if (value.type == 2) {
                    _this[key] &&
                        _this[key].forEach(function (item, ind) {
                            var ssubKeys = subKeys + ("[" + ind + "]");
                            if (value.classType) {
                                item && item.$search(ssubKeys, findValue, find);
                            }
                            else {
                                if (typeof findValue === "function") {
                                    if (findValue(item, ssubKeys))
                                        find(ssubKeys, item);
                                }
                                else {
                                    if (item == findValue)
                                        find(ssubKeys, item);
                                }
                            }
                        });
                }
                else if (value.type == 3) {
                    _this[key] &&
                        _this[key].forEach(function (item, k) {
                            var ssubKeys = subKeys + (".get(" + (typeof k === "string" ? '"' + k + '"' : k) + ")");
                            if (value.classType) {
                                if (item) {
                                    if (item.$search) {
                                        item.$search(ssubKeys, findValue, find);
                                    }
                                    else if (typeof item === "object") {
                                        for (var ok in item) {
                                            var sssubKeys = ssubKeys + "." + ok;
                                            if (typeof findValue === "function") {
                                                if (findValue(item[ok], sssubKeys))
                                                    find(sssubKeys, item);
                                            }
                                            else {
                                                if (item[ok] == findValue)
                                                    find(sssubKeys, item[ok]);
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (typeof findValue === "function") {
                                    if (findValue(item, ssubKeys))
                                        find(ssubKeys, item);
                                }
                                else {
                                    if (item == findValue)
                                        find(ssubKeys, item);
                                }
                            }
                        });
                }
            });
        };
        DataBase.prototype.toJSON = function () {
            var _this = this;
            var obj = {};
            this.properties.forEach(function (value, key) {
                var e_2, _a, e_3, _b;
                //0:基本类型  1:class  2:Array  3:Map 4:Date
                if (value.type == 0)
                    obj[key] = _this[key];
                if (value.type == 1)
                    obj[key] = _this[key].toJSON();
                if (value.type == 2) {
                    if (!value.classType) {
                        obj[key] = _this[key];
                    }
                    else {
                        obj[key] = [];
                        try {
                            for (var _c = __values(_this[key]), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var item = _d.value;
                                obj[key].push(item.toJSON());
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                else if (value.type == 3) {
                    if (!value.classType) {
                        obj[key] = _this[key];
                    }
                    else {
                        obj[key] = new Map();
                        try {
                            for (var _e = __values(_this[key]), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var item = _f.value;
                                obj[key].push(item.toJSON());
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
                else if (value.type === 4) {
                    obj[key] = _this[key].toString();
                }
            });
            return obj;
        };
        /**
         * @param name 属性名称
         * @param clazz 类型
         * @param type 0:简单类型  1:class  2:Array  3:Map 4:Date
         */
        DataBase.prototype.createProperty = function (name) {
            var t = this.properties.get(name);
            if (t.type == 1)
                return new t.classType();
            if (t.type == 2)
                return new Array();
            if (t.type == 3)
                return new Map();
            if (t.type == 4)
                return new Date();
            var type = typeof this[name];
            if (type === "string") {
                return '';
            }
            else if (type === "boolean") {
                return false;
            }
            else {
                return 0;
            }
        };
        /**
         * 清空数据
         */
        DataBase.prototype.reset = function () {
            var e_4, _a;
            var properties = this.properties;
            try {
                for (var properties_1 = __values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
                    var _b = __read(properties_1_1.value, 2), k = _b[0], v = _b[1];
                    if (v.type === 0 || v.type === 4) {
                        this[k] = this.createProperty(k);
                    }
                    else if (v.type === 1) {
                        if (this[k])
                            this[k].reset();
                    }
                    else if (v.type === 2) {
                        if (!this[k])
                            this[k] = this.createProperty(k);
                        if (this[k])
                            this[k].length = 0;
                    }
                    else if (v.type === 3) {
                        if (!this[k])
                            this[k] = this.createProperty(k);
                        if (this[k])
                            this[k].clear();
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        /**
         * 复制一个对象
         */
        DataBase.prototype.clone = function () {
            var e_5, _a;
            var type = Object.getPrototypeOf(this);
            var obj = new type.constructor();
            var properties = this.properties;
            var _loop_2 = function (k, v) {
                if (v.type === 0) {
                    obj[k] = this_1[k];
                }
                else if (v.type === 1) {
                    if (this_1[k])
                        obj[k] = this_1[k].clone();
                    else
                        obj[k] = this_1.createProperty(k);
                }
                else if (v.type === 2) {
                    obj[k] = this_1.createProperty(k);
                    if (this_1[k])
                        this_1[k].forEach(function (item) { return obj[k].push(item); });
                }
                else if (v.type === 3) {
                    obj[k] = this_1.createProperty(k);
                    if (this_1[k])
                        this_1[k].forEach(function (item, itemKey) { return obj[k].set(itemKey, item); });
                }
                else if (v.type === 4) {
                    var date = this_1.createProperty(k);
                    date.setTime(this_1[k].getTime());
                    obj[k] = date;
                }
            };
            var this_1 = this;
            try {
                for (var properties_2 = __values(properties), properties_2_1 = properties_2.next(); !properties_2_1.done; properties_2_1 = properties_2.next()) {
                    var _b = __read(properties_2_1.value, 2), k = _b[0], v = _b[1];
                    _loop_2(k, v);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (properties_2_1 && !properties_2_1.done && (_a = properties_2.return)) _a.call(properties_2);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return obj;
        };
        /**
         * @internal
         * @param obj
         */
        DataBase.prototype.setValue = function (obj, path) {
            var properties = this.properties;
            var _loop_3 = function (key) {
                var e_6, _a, e_7, _b;
                var value = obj[key];
                var propertyType = properties.get(key);
                if (!propertyType)
                    return "continue";
                //如果使用默认值填充，后端传null自动转成默认值
                if (value === null && propertyType.useDefaultValue) {
                    if (propertyType.type == 2) {
                        this_2[key].length = 0;
                    }
                    else if (propertyType.type == 3) {
                        this_2[key].clear();
                    }
                    else {
                        this_2[key] = this_2.createProperty(key);
                    }
                    return "continue";
                }
                if (propertyType.type == 0) {
                    var oldValue = this_2[key];
                    this_2[key] = value;
                    if (propertyType.recordFlag) {
                        this_2.setHistoryValue(key, oldValue, value);
                    }
                }
                else if (propertyType.type == 1) {
                    //如果是对象
                    if (this_2[key]) {
                        //如果对象不为空
                        var objKeyName = this_2[key]._key_;
                        //如果定义了 keyName 并且 value 携带 keyName 并且 value 和当前对象的 keyName 属性不等
                        if (objKeyName &&
                            value.hasOwnProperty(objKeyName) &&
                            this_2[key][objKeyName] != value[objKeyName]) {
                            var e = new syncData.UpdateEvent(syncData.UpdateEvent.RESET_DATA);
                            e.data = this_2[key];
                            e.name = key;
                            e.path = path + "." + key;
                            e.proxy = syncData.UpdateEvent.$proxy;
                            syncData.UpdateEvent.emitter.emit(e);
                            this_2[key].reset();
                        }
                    }
                    else {
                        this_2[key] = this_2.createProperty(key);
                    }
                    this_2[key].setValue(value, path + "." + key);
                }
                else if (propertyType.type == 2) {
                    //数组只有全量更新
                    var oldValue = this_2[key];
                    if (value == null) {
                        //如果传过来的内容为 null ，则清空数组
                        this_2[key] = [];
                    }
                    else {
                        if (propertyType.classType) {
                            if (this_2[key]) {
                                try {
                                    for (var _c = __values(this_2[key]), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        var item = _d.value;
                                        item && item.dispose();
                                    }
                                }
                                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                    }
                                    finally { if (e_6) throw e_6.error; }
                                }
                            }
                            this_2[key] = [];
                            try {
                                for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                                    var itemValue = value_1_1.value;
                                    var item = new propertyType.classType();
                                    if (item.setValue) {
                                        item.setValue(itemValue, path + "." + key + "[" + value.indexOf(itemValue) + "]");
                                    }
                                    else {
                                        for (var k in itemValue) {
                                            item[k] = value[k];
                                        }
                                    }
                                    this_2[key].push(item);
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (value_1_1 && !value_1_1.done && (_b = value_1.return)) _b.call(value_1);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                        }
                        else {
                            this_2[key] = value;
                        }
                    }
                    if (propertyType.recordFlag) {
                        this_2.setHistoryValue(key, oldValue, this_2[key]);
                    }
                }
                else if (propertyType.type == 3) {
                    // map 支持增量更新
                    var map = this_2[key];
                    var oldValue_1;
                    if (propertyType.recordFlag) {
                        oldValue_1 = new Map();
                        map.forEach(function (v, k) { return oldValue_1.set(k, v); });
                    }
                    if (value == null) {
                        map.clear();
                    }
                    else {
                        for (var k in value) {
                            if (+k + "" === k)
                                k = +k;
                            var val = value[k];
                            if (val == null) {
                                map.delete(k);
                            }
                            else if (!map.has(k)) {
                                if (!propertyType.classType) {
                                    map.set(k, value[k]);
                                }
                                else {
                                    var item = new propertyType.classType();
                                    item.setValue(value[k], path +
                                        "." +
                                        key +
                                        ".get(" +
                                        (typeof k == "string" ? '"' + k + '"' : k) +
                                        ")");
                                    map.set(k, item);
                                }
                            }
                            else {
                                if (propertyType.classType) {
                                    var item = map.get(k);
                                    item.setValue(value[k], path +
                                        "." +
                                        key +
                                        ".get(" +
                                        (typeof k == "string" ? '"' + k + '"' : k) +
                                        ")");
                                }
                                else {
                                    map.set(k, value[k]);
                                }
                            }
                        }
                    }
                    if (propertyType.recordFlag) {
                        this_2.setHistoryValue(key, oldValue_1, this_2[key]);
                    }
                }
                else if (propertyType.type === 4) {
                    var oldValue = this_2[key];
                    if (value instanceof Array) {
                        this_2[key] = new Date(value[0] * 1000 + value[1] / 10e5);
                    }
                    else {
                        this_2[key] = new Date(value);
                    }
                    if (propertyType.recordFlag) {
                        this_2.setHistoryValue(key, oldValue, this_2[key]);
                    }
                }
            };
            var this_2 = this;
            for (var key in obj) {
                _loop_3(key);
            }
        };
        DataBase.prototype.setHistoryValue = function (key, oldValue, newValue) {
            if (this.history.has(key)) {
                this.history.set(key, oldValue);
            }
            else {
                this.history.set(key, newValue);
            }
        };
        /**
         * 设置 map 对象
         * @param map
         * @param value
         * @param classDefine
         */
        DataBase.prototype.setMap = function (key, value, classDefine) {
            var map = this[key];
            if (!classDefine)
                classDefine = this.properties.get(key).classType;
            if (value == null) {
                map.clear();
                return;
            }
            for (var k in value) {
                if (+k + "" === k)
                    k = +k;
                var val = value[k];
                if (val == null) {
                    map.delete(k);
                }
                else if (!map.has(k)) {
                    if (!classDefine) {
                        map.set(k, value[k]);
                    }
                    else {
                        var item = new classDefine();
                        item.setValue(value[k]);
                        map.set(k, item);
                    }
                }
                else {
                    if (classDefine) {
                        var item = map.get(k);
                        item.setValue(value[k]);
                    }
                    else {
                        map.set(k, value[k]);
                    }
                }
            }
        };
        /**
         * 设置 map 对象
         * @param map
         * @param value
         * @param classDefine
         */
        DataBase.setMap = function (map, value, classDefine) {
            if (value == null) {
                map.clear();
                return;
            }
            for (var k in value) {
                if (+k + "" === k)
                    k = +k;
                var val = value[k];
                if (val == null) {
                    map.delete(k);
                }
                else if (!map.has(k)) {
                    if (!classDefine) {
                        map.set(k, value[k]);
                    }
                    else {
                        var item = new classDefine();
                        item.setValue(value[k]);
                        map.set(k, item);
                    }
                }
                else {
                    if (classDefine) {
                        var item = map.get(k);
                        item.setValue(value[k]);
                    }
                    else {
                        map.set(k, value[k]);
                    }
                }
            }
        };
        __decorate([
            orange.watch
        ], DataBase.prototype, "history", void 0);
        return DataBase;
    }(orange.HashObject));
    syncData.DataBase = DataBase;
})(syncData || (syncData = {}));
try {
    window["syncData"] = syncData;
    window["orange"]["sync"] = syncData;
}
catch (e) { }
var syncData;
(function (syncData) {
    var getDataType = function (target, propertyName) {
        if (!target.constructor.properties) {
            target.constructor.properties = new Map();
        }
        var properties = target.constructor.properties;
        var dataType = properties.get(propertyName);
        if (!dataType) {
            dataType = {
                type: 0,
                classType: null,
                key: propertyName,
                recordFlag: false,
                useDefaultValue: false
            };
            properties.set(propertyName, dataType);
        }
        return dataType;
    };
    syncData.type = function (type, classType) {
        return function (target, propertyName) {
            var dataType = getDataType(target, propertyName);
            dataType.type = type;
            dataType.classType = classType;
        };
    };
    syncData.record = function (value) {
        return function (target, propertyName) {
            var dataType = getDataType(target, propertyName);
            dataType.recordFlag = value;
        };
    };
    syncData.defaultValue = function (value) {
        return function (target, propertyName) {
            var dataType = getDataType(target, propertyName);
            dataType.useDefaultValue = value;
        };
    };
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    var NetReceiveMessage = /** @class */ (function () {
        function NetReceiveMessage(resp) {
            Object.assign(this, resp);
        }
        NetReceiveMessage.prototype.getResponse = function () {
            var def = syncData.cmdMap[this.command];
            var cls = new window[def];
            cls.setValue(this.body);
            return cls;
        };
        /**
         * @internal
         */
        NetReceiveMessage.prototype.clone = function () {
            return new NetReceiveMessage(this);
        };
        return NetReceiveMessage;
    }());
    syncData.NetReceiveMessage = NetReceiveMessage;
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    var Protocol = /** @class */ (function () {
        function Protocol() {
            /**
             * @internal
             */
            this._seq = 1;
            /**
             * @internal
             */
            this.setSeq = 0;
            this.compressed = null;
        }
        Protocol.prototype.encode = function (data) {
            var msgSeq = this.setSeq || this._seq++;
            var array = new syncData.ByteArray();
            array.writeShortUTF(data.srv);
            array.writeShortUTF(data.cmd);
            array.writeInt(msgSeq);
            if (this.compressed == 'gzip') {
                array._writeUint8Array(msgpack.encode(data.params));
            }
            if (orange.hasListener(this, orange.Event.SEND)) {
                orange.emitWith(this, orange.Event.SEND, data);
            }
            return {
                sequence: msgSeq,
                bytes: pako.gzip(array.bytes, { level: 9 })
            };
        };
        Protocol.prototype.decode = function (bytes) {
            if (this.compressed == 'gzip') {
                (bytes = pako.ungzip(bytes));
            }
            var data = msgpack.decode(bytes);
            if (orange.hasListener(this, orange.Event.DATA)) {
                orange.emitWith(this, orange.Event.DATA, data);
            }
            return new syncData.NetReceiveMessage({
                errorCode: data.code == null ? 0 : data.code,
                errorMessage: data.error,
                command: data.cmd,
                sequence: data.rSeq,
                serverSequence: data.seq,
                serverTime: data.time,
                body: data.body ? msgpack.decode(data.body) : null
            });
        };
        return Protocol;
    }());
    syncData.Protocol = Protocol;
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    var Proxy = /** @class */ (function (_super) {
        __extends(Proxy, _super);
        function Proxy() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._debug = false;
            _this.version = "0.1.0";
            /**
             * 根数据
             */
            _this.root = null;
            /**
             * 用于数据同步的消息 id
             */
            _this.syncCommands = ["Resp_Sync"];
            _this.syncAll = false;
            /**
             * @internal
             */
            _this.lastSeq = 0;
            /**
             * @internal
             */
            _this.lastConnectTime = 0;
            /**
             * 重连次数
             */
            _this.reconnectCount = 5;
            /**
             * @internal
             */
            _this.curReconnectCount = 0;
            /**
             * @internal
             */
            _this.quit = false;
            _this.records = {};
            return _this;
        }
        Object.defineProperty(Proxy.prototype, "debug", {
            get: function () {
                return this._debug;
            },
            set: function (val) {
                orange.APIUtil.deprecatedTip("Proxy.debug", 1543464755206, "不再需要单独设置网络打印，采用 orange.debug 进行判断");
                this._debug = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Proxy.prototype, "cmdMap", {
            set: function (value) {
                syncData.cmdMap = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加数据同步指令
         * @param cmd
         */
        Proxy.prototype.addSyncCommand = function (cmd) {
            this.syncCommands.push(cmd);
        };
        Object.defineProperty(Proxy.prototype, "syncAllCommand", {
            /**
             * 同步所有指令
             */
            set: function (val) {
                this.syncAll = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Proxy.prototype, "connection", {
            get: function () {
                return this._connection;
            },
            set: function (c) {
                var _this = this;
                this._connection = c;
                orange["$onAt"](this._connection, orange.Event.CLOSE, function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var last, now, data, url, key;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                last = this.lastConnectTime;
                                now = Date.now();
                                this.lastConnectTime = now;
                                if (!!this.quit) return [3 /*break*/, 5];
                                data = e.data;
                                if (!(data.reason == orange.ConnectionCloseReason.DISCONNECT ||
                                    data.reason == orange.ConnectionCloseReason.HERT_TIMEOUT ||
                                    (data.reason == orange.ConnectionCloseReason.RECONNECT_ERROR &&
                                        this.curReconnectCount < this.reconnectCount))) return [3 /*break*/, 4];
                                e.stop();
                                this.curReconnectCount++;
                                orange.debug && console.warn("\u7B2C" + this.curReconnectCount + "\u91CD\u8FDE");
                                if (!(data.reason == orange.ConnectionCloseReason.RECONNECT_ERROR)) return [3 /*break*/, 2];
                                return [4 /*yield*/, orange.sleep(1000)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                url = new orange.URLUtil(this._connection.url);
                                url.params["seq"] = this.lastSeq;
                                return [4 /*yield*/, this._connection.reconnect(url.url)];
                            case 3:
                                _a.sent();
                                this.curReconnectCount = 0;
                                for (key in this.records) {
                                    this.connection.protocol.setSeq = +key;
                                    this.connection.send(this.records[key]);
                                }
                                this.connection.protocol.setSeq = 0;
                                _a.label = 4;
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                clearInterval(this.clear);
                                _a.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                }); }, null, 0);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 接受消息，处理消息分发
         * @param data 消息
         */
        Proxy.prototype.receive = function (data) {
            if (data.serverSequence && data.serverSequence <= this.lastSeq) {
                console.warn("[过滤重复消息] id:" +
                    data.command +
                    ", sequence:" +
                    data.sequence +
                    ", serverSequence:" +
                    data.serverSequence +
                    ", errorCode:" +
                    data.errorCode +
                    (data.errorCode != 0
                        ? ", errorMessage:" + data.errorMessage + " "
                        : "") +
                    (data.sequence > 0 ? "(客户端调用返回)" : ""));
                return;
            }
            if (data.serverSequence && data.serverSequence != this.lastSeq + 1) {
                console.warn("[服务器消息丢失] id:" +
                    data.command +
                    ", sequence:" +
                    data.sequence +
                    ", serverSequence:" +
                    data.serverSequence +
                    ", errorCode:" +
                    data.errorCode +
                    (data.errorCode != 0
                        ? ", errorMessage:" + data.errorMessage + " "
                        : "") +
                    (data.sequence > 0 ? "(客户端调用返回)" : ""));
                this.connection.close(orange.ConnectionCloseReason.SERVER_MESSAGE_LOST);
                return;
            }
            if (data.errorCode < 0) {
                this.quit = true;
                console.warn("[错误码小于 0]", data);
                this.connection.close(orange.ConnectionCloseReason.ERROR_CODE, data);
            }
            orange.baseSync.serverTime = data.serverTime;
            data.serverSequence && (this.lastSeq = data.serverSequence);
            delete this.records[data.sequence];
            if (orange.debug) {
                console.log("[服务器消息] id:" +
                    data.command +
                    ", cmd:" +
                    syncData.cmdMap[data.command] +
                    ", sequence:" +
                    data.sequence +
                    ", errorCode:" +
                    data.errorCode +
                    (data.errorCode != 0
                        ? ", errorMessage:" + data.errorMessage + " "
                        : "") +
                    (data.sequence > 0 ? "(客户端调用返回)" : ""));
                data.body && console.log(data.body);
            }
            if (this.syncCommands) {
                syncData.UpdateEvent.$proxy = this;
                if (this.syncAll ||
                    this.syncCommands.indexOf(data.command) != -1) {
                    for (var k in data.body) {
                        if (this.root[k]) {
                            var objKeyName = this.root[k]._key_;
                            if (objKeyName &&
                                data.body[k].hasOwnProperty(objKeyName) &&
                                data.body[k][objKeyName] != this.root[k][objKeyName]) {
                                var e = new syncData.UpdateEvent(syncData.UpdateEvent.RESET_DATA);
                                e.data = this.root[k];
                                e.name = e.path = k;
                                e.proxy = syncData.UpdateEvent.$proxy;
                                syncData.UpdateEvent.emitter.emit(e);
                                this.root[k].reset();
                            }
                            this.root[k].setValue(data.body[k]);
                        }
                    }
                }
                syncData.UpdateEvent.$proxy = null;
            }
            this.resolveAsyncMessage(data.sequence, data.clone());
            this.receiveMessage(data.command, data);
        };
        Proxy.prototype.send = function (data) {
            var sendBack = _super.prototype.send.call(this, data);
            if (orange.debug) {
                console.log("[发送] ", data.srv + data.cmd, data, "sequence:" + sendBack.sequence);
            }
            this.records[sendBack.sequence] = data;
            return sendBack;
        };
        Proxy.prototype.request = function (data, back) {
            var _this = this;
            return _super.prototype.request.call(this, data, back, function (sendBack) {
                if (orange.debug) {
                    console.log("[发送] ", data.srv + data.cmd, data, "sequence:" + sendBack.sequence);
                }
                _this.records[sendBack.sequence] = data;
            });
        };
        Proxy.self = true;
        __decorate([
            orange.modify
        ], Proxy.prototype, "receive", null);
        return Proxy;
    }(orange.NetProxy));
    syncData.Proxy = Proxy;
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    var UpdateEvent = /** @class */ (function (_super) {
        __extends(UpdateEvent, _super);
        function UpdateEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(UpdateEvent, "emitter", {
            get: function () {
                if (!UpdateEvent.ist)
                    UpdateEvent.ist = new orange.EventEmitter();
                return UpdateEvent.ist;
            },
            enumerable: true,
            configurable: true
        });
        UpdateEvent.RESET_DATA = 'reset_data';
        return UpdateEvent;
    }(orange.Event));
    syncData.UpdateEvent = UpdateEvent;
})(syncData || (syncData = {}));
var syncData;
(function (syncData) {
    /**
     * 链接服务器
     * @param url 地址
     * @param params 参数，参考 orange.sync.ConnectParams
     * @returns {Promise<Proxy>}
     */
    function connect(url, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var socket = new orange.WebSocketClient();
                        socket.connect(url).then(function (connection) {
                            connection.protocol = new syncData.Protocol();
                            var proxy = connection.proxy = new syncData.Proxy();
                            if (params) {
                                params.connectTimeout != null && (connection.connectTimeout = params.connectTimeout);
                                params.hertTimeout != null && (connection.hertTimeout = params.hertTimeout);
                                params.hertTimeinterval != null && (connection.hertTimeinterval = params.hertTimeinterval);
                                params.closeHandler != null && orange.on(connection, orange.Event.CLOSE, function (e) {
                                    params.closeHandler(e.data);
                                });
                                params.compressed != null && (connection.protocol.compressed = params.compressed);
                                params.debug != null && (proxy.debug = params.debug);
                                params.commandTimeout != null && (proxy.commandTimeout = params.commandTimeout);
                                params.reconnectInterval != null && (proxy.reconnectInterval = params.reconnectInterval);
                                params.root != null && (proxy.root = params.root);
                                params.syncAllCommand != null && (proxy.syncAllCommand = params.syncAllCommand);
                            }
                            resolve();
                        }).catch(function (e) { return reject(e); });
                    })];
            });
        });
    }
    syncData.connect = connect;
})(syncData || (syncData = {}));
//# sourceMappingURL=sync-data.js.map