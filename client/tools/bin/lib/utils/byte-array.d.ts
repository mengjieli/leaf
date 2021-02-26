/// <reference types="node" />
export declare class ByteArray {
    big: boolean;
    position: number;
    bytes: number[];
    length: number;
    constructor(array?: number[] | Buffer);
    initArray(array: any): void;
    writeInt(val: any): void;
    writeByte(val: any): void;
    writeArray(array: any): void;
    writeBoolean(val: any): void;
    writeUnsignedInt(val: any): void;
    writeShort(val: any): void;
    writeUnsignedShort(val: any): void;
    writeUTF(val: any): void;
    writeUTFBytes(val: any): void;
    readInt(): number;
    readInt64(): number;
    readUnsignedInt(): number;
    readByte(): number;
    readShort(): any;
    readUnsignedShort(): any;
    readUTF(): string;
    readUTFBytes(len: any): string;
    getData(): number[];
    readonly bytesAvailable: number;
}
