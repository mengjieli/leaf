import { EventDispatcher } from './../../event/event-dispatcher'
import { Event } from './../../event/event'

export class WebsocketServerClient extends EventDispatcher {

    constructor(connection, request: any, big: boolean = true) {
        super();
        this._big = big;
        this._connection = connection;
        this.request = request;
        var _this = this;
        this._connection.on('message', this._onReceiveData.bind(this));
        this._connection.on('close', this._onClose.bind(this));
        this.start && this.start();
    }

    protected start?(): void;

    private _big: boolean;

    public get big(): boolean {
        return this._big;
    }

    private _connection: any;

    protected get connection(): any {
        return this._connection;
    }

    protected request: any;

    private _onReceiveData(message) {
        let d = null;
        if (message.type == "binary") {
            this.dispatchWith(Event.DATA, message.binaryData);
            d = message.binaryData;
        }
        if (d.length <= 1) {
            this.send(new Uint8Array([0]));
            return;
        }
        this.receive && this.receive(d);
    }

    protected receive?(data: Buffer): void;

    private _hasConnected: boolean = true;

    public get connected(): boolean {
        return this._hasConnected;
    }

    private _url: string = "";

    public get url(): string {
        return this._url;
    }

    public close(): void {
        if (this._connection) {
            this._hasConnected = false;
            let connection = this._connection;
            this._connection = null;
            connection.close();
        }
    }

    private _onClose(e) {
        this._hasConnected = false;
        this._connection = null;
        this.dispatchWith(Event.CLOSE, e);
    }

    public send(data: Uint8Array): void {
        if(this._connection)
        this._connection.sendBytes(Buffer.from(data as any));
    }
}