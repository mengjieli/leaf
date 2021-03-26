/// <reference types="node" />
import { ChildProcess } from "child_process";
export declare class Shell {
    /**
     *
     * @param cmd
     * @param params
     * @param option cwd 当前工作目录
     */
    constructor(cmd: string, params?: string[], option?: any);
    process: ChildProcess;
    onData: (content: string) => void;
    onError: (content: string) => void;
    onExit: (code: string, signal: any) => void;
    kill(): void;
}
