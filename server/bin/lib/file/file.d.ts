/// <reference types="node" />
export declare class File {
    constructor(url: string);
    delete(): void;
    watch(callBack: (urls: string[]) => void, time?: number): () => void;
    save(data: any, format?: "utf-8" | "binary", url?: any): Promise<boolean>;
    readonly isDirection: boolean;
    readContent(format?: "utf-8" | "binary"): any;
    readFilesWithEnd(ends: string | string[]): File[];
    private _url;
    readonly url: string;
    private _end;
    readonly end: string;
    readonly stats: import("fs").Stats;
    readonly list: string[];
    readonly exists: boolean;
    readonly changeTime: number;
    readonly modifyTime: number;
    readonly createTime: number;
    static mkdirsSync(dirpath: string, mode?: any): boolean;
    static join(path1: string, path2: string): string;
}
