import { Command } from './../../lib/command/command';
export declare class StartCommand extends Command {
    name: string;
    detail: (string | string[])[];
    execute(argv: string[]): Promise<void>;
}
