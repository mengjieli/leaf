import { RequestCommand } from "./../request-command";
export declare class StartCompile extends RequestCommand {
    execute(): Promise<void>;
    useModule: boolean;
    replaceModuleFile(file: string, fileURL: string): string;
}
