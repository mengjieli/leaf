import * as lib from "../../lib/lib";
import "./../../../../libs/msgpack/msgpack";
export declare abstract class RequestCommand {
    cmd: string;
    seq: number;
    body: any;
    client: lib.WebsocketServerClient;
    abstract execute(): Promise<any>;
    fail(errorCode: number, message?: string): void;
    success(body?: any): void;
    send(msg: any): void;
    getRoot(path?: string): any;
    getOrangePath(path?: string): any;
}
