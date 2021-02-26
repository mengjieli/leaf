import { EventDispatcher } from './../../event/event-dispatcher';
export declare class WebsocketServer extends EventDispatcher {
    constructor(clientClass?: any, big?: boolean);
    private _big;
    /**
     * 表示服务器是 大端还是小端，目前主流服务器都是大端
     */
    readonly big: boolean;
    private _clientClass;
    private _server;
    private _clients;
    start(port: any): void;
    stop(): void;
    private _connectClient;
    private _closeClient;
}
