import { Command } from './../../lib/command/command';
import { DisplayObject } from '../../lib/egret/display/display-object';
export declare class EXMLCommand extends Command {
    name: string;
    detail: (string | string[])[];
    /**
     * 输出目录
     */
    out: string;
    ignore: string[];
    compressed: boolean;
    execute(argv: string[]): Promise<void>;
    decode(url: string, bigJson?: any): [string, string, DisplayObject[]];
}
