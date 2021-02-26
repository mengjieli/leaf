import { Command } from './../../lib/command/command';
export declare class UpdateCommand extends Command {
    name: string;
    detail: string;
    info: any;
    execute(argv: string[]): Promise<void>;
    /**
     * copy 源码
     */
    copySource(): void;
}
