export declare function registerCommand(clazz: any): any;
export declare function registerDefaultCommand(clazz: any): any;
export declare function startCommand(): void;
export declare function receiveCommand(argv: any): void;
export declare function getCommands(): Command[];
export declare abstract class Command {
    abstract name: string;
    abstract detail: any[] | string;
    private argv;
    readonly rootPath: any;
    readonly executePath: string;
    receiveCommand(argv: Array<string>): boolean;
    checkArguments(argv: string[], necessaryArgs: string[]): void;
    getArgument(argv: string[], name: string | string[]): string;
    getHelp(): string;
    abstract execute(argv: string[]): Promise<any>;
}
