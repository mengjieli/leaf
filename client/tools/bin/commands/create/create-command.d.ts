import { Command } from './../../lib/command/command';
export declare class CreateCommand extends Command {
    name: string;
    detail: string;
    info: any;
    execute(argv: string[]): Promise<void>;
    initModules(type: any, info: any): void;
    /**
     * 修改 tsconfig.json
     */
    saveTSConfig(): void;
    /**
     * copy 源码
     */
    copySource(): void;
    checkType(type: string): boolean;
}
