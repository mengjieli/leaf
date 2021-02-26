import { Command } from './../../lib/command/command';
export declare class HelpCommand extends Command {
    name: string;
    detail: string;
    execute(argv: string[]): Promise<void>;
}
