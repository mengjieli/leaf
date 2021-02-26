import { ByteArray } from './byte-array';
export declare class PNGDecoder extends ByteArray {
    /**
     *
     * @param bytes 可以为 Array 或者 Buffer 只要存在 length 和 bytes[0] bytes[1] 这样的属性即可
     * @return data
     * { width: 2,
          height: 2,
          depth: 8,
          colorType: 6,
          compress: 0,
          filter: 0,
          interlace: 0,
          format: 'rgba',
          colorWidth: 4,
          pixelWidth: 4,
          colors: [ [ 4294967295, 4278190080 ], [ 4286611584, 0 ] ] }
     */
    decode(bytes: any): {};
    /**
     * 读取 png 的开头，开头总是 0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A
     */
    readHead(): void;
    /**
     * 读取数据块内容
     */
    readContent(data: any): void;
    findBlockHead(): void;
    decodeIHDR(len: any, data: any): void;
    decodePLTE(len: any, data: any): void;
    decodetRNS(len: any, data: any): void;
    decodeIDAT(len: any, data: any): void;
    error(tip: any): void;
}
