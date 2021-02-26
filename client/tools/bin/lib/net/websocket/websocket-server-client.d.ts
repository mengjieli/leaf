/// <reference types="node" />
import { EventDispatcher } from './../../event/event-dispatcher';
export declare class WebsocketServerClient extends EventDispatcher {
    constructor(connection: any, request: any, big?: boolean);
    protected start?(): void;
    private _big;
    readonly big: boolean;
    private _connection;
    protected readonly connection: any;
    protected request: any;
    private _onReceiveData;
    protected receive?(data: Buffer): void;
    private _hasConnected;
    readonly connected: boolean;
    private _url;
    readonly url: string;
    close(): void;
    private _onClose;
    send(data: Uint8Array): void;
}
