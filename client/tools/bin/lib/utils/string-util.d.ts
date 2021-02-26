/**
   * 采用 utf8 编码把字符串转成字节数组
   * @param str
   */
export declare function encodeUTF8(str: string): number[];
/**
 * 把 utf8 编码的字节数组还原成字符串
 * @param arr
 */
export declare function decodeUTF8(arr: number[]): string;
export declare function replace(str: string, findStr: string, tstr: string, jumpFind?: boolean): string;
export declare function getRepeat(str: string, repeatCount: number): string;
export declare function compressJSON(json: any): string;
export declare function decodeJSON(content: string): any;
