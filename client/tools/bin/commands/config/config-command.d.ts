import { Command } from './../../lib/command/command';
export declare class ConfigCommand extends Command {
    name: string;
    detail: (string | string[])[];
    necessaryArgs: any[];
    execute(argv: string[]): Promise<void>;
}
