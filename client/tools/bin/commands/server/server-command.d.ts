import { Command } from './../../lib/command/command';
export declare class ServerCommand extends Command {
    name: string;
    detail: (string | string[])[];
    info: any;
    execute(argv: string[]): Promise<void>;
    getIPV4(): string;
}
