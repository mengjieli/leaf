import { RequestCommand } from "./../request-command";
import * as lib from "./../../../lib/lib";
export declare class DBConnect extends RequestCommand {
    db: lib.MongoDB;
    execute(): Promise<void>;
    connect(url: string): Promise<void>;
    resolves: Function[];
    whenConnect(): Promise<boolean>;
    static connections: Map<string, DBConnect>;
}
