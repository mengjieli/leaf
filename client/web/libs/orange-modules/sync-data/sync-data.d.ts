
declare namespace syncData {
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
    class Endian {
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
        static LITTLE_ENDIAN: string;
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
        static BIG_ENDIAN: string;
    }
    const enum EndianConst {
        LITTLE_ENDIAN = 0,
        BIG_ENDIAN = 1
    }
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
    class ByteArray {
        /**
         * @private
         */
        protected bufferExtSize: number;
        protected data: DataView;
        protected _bytes: Uint8Array;
        /**
         * @private
         */
        protected _position: number;
        /**
         *
         * 已经使用的字节偏移量
         * @protected
         * @type {number}
         * @memberOf ByteArray
         */
        protected write_position: number;
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
        endian: string;
        protected $endian: EndianConst;
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        constructor(buffer?: ArrayBuffer | Uint8Array, bufferExtSize?: number);
        /**
         * @deprecated
         * @version Egret 2.4
         * @platform Web,Native
         */
        setArrayBuffer(buffer: ArrayBuffer): void;
        /**
         * 可读的剩余字节数
         *
         * @returns
         *
         * @memberOf ByteArray
         */
        readonly readAvailable: number;
        /**
        * @private
        */
        buffer: ArrayBuffer;
        readonly rawBuffer: ArrayBuffer;
        readonly bytes: Uint8Array;
        /**
         * @private
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
        * @private
        */
        dataView: DataView;
        /**
         * @private
         */
        readonly bufferOffset: number;
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
        position: number;
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
        length: number;
        protected _validateBuffer(value: number): void;
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
        readonly bytesAvailable: number;
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
        clear(): void;
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
        readBoolean(): boolean;
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
        readByte(): number;
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
        readBytes(bytes: ByteArray, offset?: number, length?: number): void;
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
        readDouble(): number;
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
        readFloat(): number;
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
        readInt(): number;
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
        readShort(): number;
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
        readUnsignedByte(): number;
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
        readUnsignedInt(): number;
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
        readUnsignedShort(): number;
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
        readUTF(): string;
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
        readUTFBytes(length: number): string;
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
        writeBoolean(value: boolean): void;
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
        writeByte(value: number): void;
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
        writeBytes(bytes: ByteArray, offset?: number, length?: number): void;
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
        writeDouble(value: number): void;
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
        writeFloat(value: number): void;
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
        writeInt(value: number): void;
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
        writeShort(value: number): void;
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
        writeUnsignedInt(value: number): void;
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
        writeUnsignedShort(value: number): void;
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
        writeUTF(value: string): void;
        writeShortUTF(value: string): void;
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
        writeUTFBytes(value: string): void;
        /**
         *
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        toString(): string;
        /**
         * @private
         * 将 Uint8Array 写入字节流
         * @param bytes 要写入的Uint8Array
         * @param validateBuffer
         */
        _writeUint8Array(bytes: Uint8Array | ArrayLike<number>, validateBuffer?: boolean): void;
        /**
         * @param len
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        validate(len: number): boolean;
        /**********************/
        /**********************/
        /**
         * @private
         * @param len
         * @param needReplace
         */
        protected validateBuffer(len: number): void;
        /**
         * @private
         * UTF-8 Encoding/Decoding
         */
        private encodeUTF8;
        /**
         * @private
         *
         * @param data
         * @returns
         */
        private decodeUTF8;
        /**
         * @private
         *
         * @param code_point
         */
        private encoderError;
        /**
         * @private
         *
         * @param fatal
         * @param opt_code_point
         * @returns
         */
        private decoderError;
        /**
         * @private
         */
        private EOF_byte;
        /**
         * @private
         */
        private EOF_code_point;
        /**
         * @private
         *
         * @param a
         * @param min
         * @param max
         */
        private inRange;
        /**
         * @private
         *
         * @param n
         * @param d
         */
        private div;
        /**
         * @private
         *
         * @param string
         */
        private stringToCodePoints;
    }
}
declare namespace syncData {
    type Cmd = {
        srv: string;
        cmd: string;
        params: object;
    };
}
declare namespace syncData {
    /**
     * 获取差异变化数值
     * @param target 要获取差异变化的对象
     * @param keys 键值数组，例如：["props", "itemA"]
     */
    function getDifference(target: syncData.DataBase, keys: string[]): number;
    /**
     * 获取差异变化 Map
     * @param target 要获取差异变化的对象
     * @param keys 要获取差异变化的Map
     */
    function getDifferenceMap(target: syncData.DataBase, keys: string | string[]): Map<any, number>;
    function find(keys: string, value: any): void;
    abstract class DataBase extends orange.HashObject {
        constructor();
        _key_: string;
        dispose(): void;
        find(value: any | ((val: any, findKeys: string) => boolean)): void;
        $search(keys: string, findValue: any | ((val: any, findKeys: string) => boolean), find: (key: string, value: any) => void): void;
        properties: Map<string, DataType>;
        toJSON(): {};
        /**
         * @param name 属性名称
         * @param clazz 类型
         * @param type 0:简单类型  1:class  2:Array  3:Map 4:Date
         */
        protected createProperty(name: string): any;
        /**
         * 清空数据
         */
        reset(): void;
        /**
         * 复制一个对象
         */
        clone(): any;
        history: Map<string, any>;
        private setHistoryValue;
        /**
         * 设置 map 对象
         * @param map
         * @param value
         * @param classDefine
         */
        setMap(key: string, value: any, classDefine?: any): void;
        /**
         * 设置 map 对象
         * @param map
         * @param value
         * @param classDefine
         */
        static setMap(map: Map<any, any>, value: any, classDefine: any): void;
    }
}
declare namespace syncData {
    const type: (type: number, classType?: any) => PropertyDecorator;
    const record: (value: boolean) => PropertyDecorator;
    const defaultValue: (value: boolean) => PropertyDecorator;
}
declare namespace syncData {
    type DataType = {
        /**
         * 数据类型  'number' 'string' 'boolean'  0:基本类型  1:class  2:Array  3:Map 4:Date
         */
        type: number | string;
        /**
         * 关联的类类型
         */
        classType: any;
        /**
         * 属性名
         */
        key: string;
        /**
         * 记录差异值
         */
        recordFlag: boolean;
        /**
         * 遇到服务端传null的情况是否使用默认值填充数据
         */
        useDefaultValue: boolean;
    };
}
declare namespace syncData {
    interface INetBack extends orange.INetReceiveMessage {
        /**
         * 错误码
         * 0 为正确
         * 大于 0 为游戏错误码
         * 小于 0 为系统错误码
         */
        errorCode: number;
        /**
         * 错误消息，错误码为 0 时 errorMessage 为 null
         */
        errorMessage: string;
        /**
         * 返回消息，错误码为 0 时 body 为 null
         */
        body: null;
    }
}
declare namespace syncData {
    class NetReceiveMessage implements orange.INetReceiveMessage {
        /**
         * 消息序列
         */
        sequence: number;
        /**
         * 服务器消息序列
         */
        serverSequence: number;
        /**
         * 消息 id
         */
        command: string | number;
        /**
         * 错误码  0  表示正确，其它异常
         */
        errorCode: number;
        /**
         * 错误消息，错误码为 0 时  msg 为 null
         */
        errorMessage: string;
        /**
         * 系统时间
         */
        serverTime: number;
        /**
         * 消息体
         */
        body: any;
        constructor(resp: {
            errorCode: number;
            errorMessage: string;
            serverTime: number;
            body: any;
        } & orange.INetReceiveMessage);
        getResponse<T extends DataBase>(): T;
    }
}
declare namespace syncData {
    class Protocol implements orange.INetProtocol {
        compressed: 'gzip' | null;
        encode(data: any): orange.INetSendMessage;
        decode(bytes: Uint8Array): NetReceiveMessage;
    }
}
declare namespace syncData {
    class Proxy extends orange.NetProxy implements orange.INetProxy {
        private clear;
        private _debug;
        debug: boolean;
        version: string;
        /**
         * 根数据
         */
        root: any;
        /**
         * 用于数据同步的消息 id
         */
        private syncCommands;
        private syncAll;
        cmdMap: {
            [key: number]: string;
        };
        /**
         * 添加数据同步指令
         * @param cmd
         */
        addSyncCommand(cmd: string): void;
        /**
         * 同步所有指令
         */
        syncAllCommand: boolean;
        connection: orange.INetConnection;
        /**
         * 重连次数
         */
        reconnectCount: number;
        static self: boolean;
        /**
         * 接受消息，处理消息分发
         * @param data 消息
         */
        receive(data: NetReceiveMessage): void;
        private records;
        send(data: Cmd): orange.INetSendMessage;
        request(data: Cmd, back?: (data: any) => void): Promise<any>;
    }
}
declare namespace syncData {
    class UpdateEvent extends orange.Event {
        /**
         * 当前被更新的数据
         */
        data: DataBase;
        /**
         * 通过哪个网络类更新的
         */
        proxy: Proxy;
        /**
         * 数据在最后一个对象中的属性名
         */
        name: string;
        /**
         * 相对于 root 数据的路径，比如 root.player.items.attribute 这里的 path 就是 player.items.attribute
         */
        path: string;
        static RESET_DATA: string;
        private static ist;
        static readonly emitter: UpdateEventEmitter;
    }
    interface UpdateEventEmitter extends orange.EventEmitter {
        on(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
        once(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
        removeListener(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
    }
}
declare namespace syncData {
    /**
     * 链接服务器
     * @param url 地址
     * @param params 参数，参考 orange.sync.ConnectParams
     * @returns {Promise<Proxy>}
     */
    function connect(url: string, params?: ConnectParams): Promise<Proxy>;
    /**
     * 链接服务器的参数
     */
    interface ConnectParams {
        /**
         * 链接关闭的回调函数
         */
        closeHandler?: (r: orange.ConnectionCloseReason) => void;
        /**
         * 压缩格式，默认不压缩
         * @default null
         */
        compressed?: 'gzip';
        /**
         * 调试模式
         * @default false
         */
        debug?: boolean;
        /**
         * 数据同步的根节点
         */
        root?: any;
        /**
         * 是否同步所有的消息
         * @default false
         */
        syncAllCommand?: boolean;
        /**
         * 链接服务器超时时间(单位秒)
         * @default 10
         */
        connectTimeout?: number;
        /**
         * 客户端验证心跳爆超时时间(单位秒)
         * @default 10
         */
        hertTimeout?: number;
        /**
         * 心跳包时间(单位秒)
         * @default 5
         */
        hertTimeinterval?: number;
        /**
         * 指令超时时间(秒)
         * @default 7
         */
        commandTimeout?: number;
        /**
         * 重连间隙(秒)
         * @default 1
         */
        reconnectInterval?: number;
    }
}


declare namespace orange {
 namespace sync {
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
    class Endian {
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
        static LITTLE_ENDIAN: string;
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
        static BIG_ENDIAN: string;
    }
    const enum EndianConst {
        LITTLE_ENDIAN = 0,
        BIG_ENDIAN = 1
    }
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
    class ByteArray {
        /**
         * @private
         */
        protected bufferExtSize: number;
        protected data: DataView;
        protected _bytes: Uint8Array;
        /**
         * @private
         */
        protected _position: number;
        /**
         *
         * 已经使用的字节偏移量
         * @protected
         * @type {number}
         * @memberOf ByteArray
         */
        protected write_position: number;
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
        endian: string;
        protected $endian: EndianConst;
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        constructor(buffer?: ArrayBuffer | Uint8Array, bufferExtSize?: number);
        /**
         * @deprecated
         * @version Egret 2.4
         * @platform Web,Native
         */
        setArrayBuffer(buffer: ArrayBuffer): void;
        /**
         * 可读的剩余字节数
         *
         * @returns
         *
         * @memberOf ByteArray
         */
        readonly readAvailable: number;
        /**
        * @private
        */
        buffer: ArrayBuffer;
        readonly rawBuffer: ArrayBuffer;
        readonly bytes: Uint8Array;
        /**
         * @private
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
        * @private
        */
        dataView: DataView;
        /**
         * @private
         */
        readonly bufferOffset: number;
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
        position: number;
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
        length: number;
        protected _validateBuffer(value: number): void;
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
        readonly bytesAvailable: number;
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
        clear(): void;
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
        readBoolean(): boolean;
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
        readByte(): number;
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
        readBytes(bytes: ByteArray, offset?: number, length?: number): void;
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
        readDouble(): number;
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
        readFloat(): number;
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
        readInt(): number;
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
        readShort(): number;
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
        readUnsignedByte(): number;
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
        readUnsignedInt(): number;
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
        readUnsignedShort(): number;
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
        readUTF(): string;
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
        readUTFBytes(length: number): string;
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
        writeBoolean(value: boolean): void;
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
        writeByte(value: number): void;
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
        writeBytes(bytes: ByteArray, offset?: number, length?: number): void;
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
        writeDouble(value: number): void;
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
        writeFloat(value: number): void;
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
        writeInt(value: number): void;
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
        writeShort(value: number): void;
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
        writeUnsignedInt(value: number): void;
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
        writeUnsignedShort(value: number): void;
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
        writeUTF(value: string): void;
        writeShortUTF(value: string): void;
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
        writeUTFBytes(value: string): void;
        /**
         *
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        toString(): string;
        /**
         * @private
         * 将 Uint8Array 写入字节流
         * @param bytes 要写入的Uint8Array
         * @param validateBuffer
         */
        _writeUint8Array(bytes: Uint8Array | ArrayLike<number>, validateBuffer?: boolean): void;
        /**
         * @param len
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        validate(len: number): boolean;
        /**********************/
        /**********************/
        /**
         * @private
         * @param len
         * @param needReplace
         */
        protected validateBuffer(len: number): void;
        /**
         * @private
         * UTF-8 Encoding/Decoding
         */
        private encodeUTF8;
        /**
         * @private
         *
         * @param data
         * @returns
         */
        private decodeUTF8;
        /**
         * @private
         *
         * @param code_point
         */
        private encoderError;
        /**
         * @private
         *
         * @param fatal
         * @param opt_code_point
         * @returns
         */
        private decoderError;
        /**
         * @private
         */
        private EOF_byte;
        /**
         * @private
         */
        private EOF_code_point;
        /**
         * @private
         *
         * @param a
         * @param min
         * @param max
         */
        private inRange;
        /**
         * @private
         *
         * @param n
         * @param d
         */
        private div;
        /**
         * @private
         *
         * @param string
         */
        private stringToCodePoints;
    }
}
 namespace sync {
    type Cmd = {
        srv: string;
        cmd: string;
        params: object;
    };
}
 namespace sync {
    /**
     * 获取差异变化数值
     * @param target 要获取差异变化的对象
     * @param keys 键值数组，例如：["props", "itemA"]
     */
    function getDifference(target: sync.DataBase, keys: string[]): number;
    /**
     * 获取差异变化 Map
     * @param target 要获取差异变化的对象
     * @param keys 要获取差异变化的Map
     */
    function getDifferenceMap(target: sync.DataBase, keys: string | string[]): Map<any, number>;
    function find(keys: string, value: any): void;
    abstract class DataBase extends orange.HashObject {
        constructor();
        _key_: string;
        dispose(): void;
        find(value: any | ((val: any, findKeys: string) => boolean)): void;
        $search(keys: string, findValue: any | ((val: any, findKeys: string) => boolean), find: (key: string, value: any) => void): void;
        properties: Map<string, DataType>;
        toJSON(): {};
        /**
         * @param name 属性名称
         * @param clazz 类型
         * @param type 0:简单类型  1:class  2:Array  3:Map 4:Date
         */
        protected createProperty(name: string): any;
        /**
         * 清空数据
         */
        reset(): void;
        /**
         * 复制一个对象
         */
        clone(): any;
        history: Map<string, any>;
        private setHistoryValue;
        /**
         * 设置 map 对象
         * @param map
         * @param value
         * @param classDefine
         */
        setMap(key: string, value: any, classDefine?: any): void;
        /**
         * 设置 map 对象
         * @param map
         * @param value
         * @param classDefine
         */
        static setMap(map: Map<any, any>, value: any, classDefine: any): void;
    }
}
 namespace sync {
    const type: (type: number, classType?: any) => PropertyDecorator;
    const record: (value: boolean) => PropertyDecorator;
    const defaultValue: (value: boolean) => PropertyDecorator;
}
 namespace sync {
    type DataType = {
        /**
         * 数据类型  'number' 'string' 'boolean'  0:基本类型  1:class  2:Array  3:Map 4:Date
         */
        type: number | string;
        /**
         * 关联的类类型
         */
        classType: any;
        /**
         * 属性名
         */
        key: string;
        /**
         * 记录差异值
         */
        recordFlag: boolean;
        /**
         * 遇到服务端传null的情况是否使用默认值填充数据
         */
        useDefaultValue: boolean;
    };
}
 namespace sync {
    interface INetBack extends orange.INetReceiveMessage {
        /**
         * 错误码
         * 0 为正确
         * 大于 0 为游戏错误码
         * 小于 0 为系统错误码
         */
        errorCode: number;
        /**
         * 错误消息，错误码为 0 时 errorMessage 为 null
         */
        errorMessage: string;
        /**
         * 返回消息，错误码为 0 时 body 为 null
         */
        body: null;
    }
}
 namespace sync {
    class NetReceiveMessage implements orange.INetReceiveMessage {
        /**
         * 消息序列
         */
        sequence: number;
        /**
         * 服务器消息序列
         */
        serverSequence: number;
        /**
         * 消息 id
         */
        command: string | number;
        /**
         * 错误码  0  表示正确，其它异常
         */
        errorCode: number;
        /**
         * 错误消息，错误码为 0 时  msg 为 null
         */
        errorMessage: string;
        /**
         * 系统时间
         */
        serverTime: number;
        /**
         * 消息体
         */
        body: any;
        constructor(resp: {
            errorCode: number;
            errorMessage: string;
            serverTime: number;
            body: any;
        } & orange.INetReceiveMessage);
        getResponse<T extends DataBase>(): T;
    }
}
 namespace sync {
    class Protocol implements orange.INetProtocol {
        compressed: 'gzip' | null;
        encode(data: any): orange.INetSendMessage;
        decode(bytes: Uint8Array): NetReceiveMessage;
    }
}
 namespace sync {
    class Proxy extends orange.NetProxy implements orange.INetProxy {
        private clear;
        private _debug;
        debug: boolean;
        version: string;
        /**
         * 根数据
         */
        root: any;
        /**
         * 用于数据同步的消息 id
         */
        private syncCommands;
        private syncAll;
        cmdMap: {
            [key: number]: string;
        };
        /**
         * 添加数据同步指令
         * @param cmd
         */
        addSyncCommand(cmd: string): void;
        /**
         * 同步所有指令
         */
        syncAllCommand: boolean;
        connection: orange.INetConnection;
        /**
         * 重连次数
         */
        reconnectCount: number;
        static self: boolean;
        /**
         * 接受消息，处理消息分发
         * @param data 消息
         */
        receive(data: NetReceiveMessage): void;
        private records;
        send(data: Cmd): orange.INetSendMessage;
        request(data: Cmd, back?: (data: any) => void): Promise<any>;
    }
}
 namespace sync {
    class UpdateEvent extends orange.Event {
        /**
         * 当前被更新的数据
         */
        data: DataBase;
        /**
         * 通过哪个网络类更新的
         */
        proxy: Proxy;
        /**
         * 数据在最后一个对象中的属性名
         */
        name: string;
        /**
         * 相对于 root 数据的路径，比如 root.player.items.attribute 这里的 path 就是 player.items.attribute
         */
        path: string;
        static RESET_DATA: string;
        private static ist;
        static readonly emitter: UpdateEventEmitter;
    }
    interface UpdateEventEmitter extends orange.EventEmitter {
        on(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
        once(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
        removeListener(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
    }
}
 namespace sync {
    /**
     * 链接服务器
     * @param url 地址
     * @param params 参数，参考 orange.sync.ConnectParams
     * @returns {Promise<Proxy>}
     */
    function connect(url: string, params?: ConnectParams): Promise<Proxy>;
    /**
     * 链接服务器的参数
     */
    interface ConnectParams {
        /**
         * 链接关闭的回调函数
         */
        closeHandler?: (r: orange.ConnectionCloseReason) => void;
        /**
         * 压缩格式，默认不压缩
         * @default null
         */
        compressed?: 'gzip';
        /**
         * 调试模式
         * @default false
         */
        debug?: boolean;
        /**
         * 数据同步的根节点
         */
        root?: any;
        /**
         * 是否同步所有的消息
         * @default false
         */
        syncAllCommand?: boolean;
        /**
         * 链接服务器超时时间(单位秒)
         * @default 10
         */
        connectTimeout?: number;
        /**
         * 客户端验证心跳爆超时时间(单位秒)
         * @default 10
         */
        hertTimeout?: number;
        /**
         * 心跳包时间(单位秒)
         * @default 5
         */
        hertTimeinterval?: number;
        /**
         * 指令超时时间(秒)
         * @default 7
         */
        commandTimeout?: number;
        /**
         * 重连间隙(秒)
         * @default 1
         */
        reconnectInterval?: number;
    }
}

}