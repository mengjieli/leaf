import { RequestCommand } from "./../request-command";
export declare class StartCompiler extends RequestCommand {
    execute(): Promise<void>;
}
export declare function onCompiler(back: (file: string) => void): void;
