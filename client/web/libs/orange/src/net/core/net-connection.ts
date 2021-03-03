namespace orange {

    export class NetConnection implements INetConnection {

        constructor(connection: platform.INetConnection) {
            if (this._netProxy) this._netProxy.connection = this;
            this._connection = connection;
            this._connection.connectTimeout = this.connectTimeout;
            this._connection.hertTimeinterval = this.hertTimeinterval;
            this._connection.hertTimeout = this.hertTimeout;
            orange.on(this._connection, Event.DATA, this._onData, this);
            orange.on(this._connection, Event.CLOSE, this._onClose, this);
        }



        /**
         * 是否激活，默认为激活状态
         */
        get active(): boolean {
            return this._connection.active;
        }

        set active(val: boolean) {
            this._connection.active = val;
        }

		/**
		 * 链接服务器超时时间(单位秒)
		 */
        _connectTimeout: number = 10;

        get connectTimeout() {
            return this._connectTimeout;
        }

        set connectTimeout(val: number) {
            this._connectTimeout = val;
            this._connection.connectTimeout = val;
        }

		/**
		 * 心跳包时间(单位秒)
		 */
        _hertTimeinterval: number = 5;

        get hertTimeinterval() {
            return this._hertTimeinterval;
        }

        set hertTimeinterval(val: number) {
            this._hertTimeinterval = val;
            this._connection.hertTimeinterval = val;
        }

		/**
		 * 客户端验证心跳爆超时时间(单位秒)
		 */
        _hertTimeout = 10;

        get hertTimeout() {
            return this._hertTimeout;
        }

        set hertTimeout(val: number) {
            this._hertTimeout = val;
            this._connection.hertTimeout = val;
        }

        /**
         * @internal
         */
        private _connection: platform.INetConnection;

        /**
         * @internal
         */
        private _protocol: INetProtocol;

        public get protocol(): INetProtocol {
            return this._protocol;
        }

        public set protocol(val: INetProtocol) {
            this._protocol = val;
        }

        /**
         * @internal
         */
        private _netProxy: INetProxy;

        public get proxy(): INetProxy {
            return this._netProxy;
        }

        public set proxy(val: INetProxy) {
            if (this._netProxy) {
                this._netProxy.connection = null;
                this._netProxy = null;
            }
            if (val) {
                this._netProxy = val;
                this._netProxy.connection = this;
            }
        }

        public get connected(): boolean {
            return this._connection ? this._connection.connected : false;
        }

        /**
         * @internal
         */
        private _onCloseResolves = [];

        // /**
        //  * @internal
        //  */
        // public async onClose(): Promise<void> {
        //     if (this._netProxy) this._netProxy.onClose();
        //     return new Promise<void>((resolve, reject) => {
        //         this._onCloseResolves.push({ resolve: resolve, flag: true });
        //     });
        // }

        /**
         * @internal
         */
        private _onClose(e) {
            let resolves = this._onCloseResolves;
            for (let i = 0; i < resolves.length; i++) {
                resolves[i].resolve();
                resolves[i].flag = false;
            }
            for (let i = 0; i < resolves.length; i++) {
                if (!resolves[i].flag) {
                    resolves.splice(i, 1);
                }
            }
            orange.emitWith(this, Event.CLOSE, e.data);
        }

        public close(reason: ConnectionCloseReason = 0, data?: any) {
            let client = this._connection;
            if (client) client.close(reason, data);
        }

        private isReady = true;
        private prepareMsgs = [];

        public setReadyFalse() {
            this.isReady = false;
        }

        /**
         * @internal
         */
        private _onData(e: Event) {
            if (!this.isReady) {
                this.prepareMsgs.push(e.data);
                return;
            }
            if (this._netProxy) {
                let msg = e.data;
                if (this._protocol) {
                    msg = this._protocol.decode(e.data);
                }
                if (msg) {
                    if (this._netProxy.receive == null || typeof this._netProxy.receive != 'function') {
                        throw 'netProxy 不是函数:' + this._netProxy.constructor.name + ', 它是否为:' + (!!(this._netProxy instanceof orange.NetProxy))
                    }
                    this._netProxy.receive(msg);
                }
            }
        }

        public getReady() {
            if (this.isReady) return;
            this.isReady = true;
            while (this.prepareMsgs.length) {
                let msg = this.prepareMsgs.shift();
                if (this._protocol) {
                    msg = this._protocol.decode(msg);
                }
                if (msg) {
                    if (this._netProxy.receive == null || typeof this._netProxy.receive != 'function') {
                        throw 'netProxy 不是函数:' + this._netProxy.constructor.name + ', 它是否为:' + (!!(this._netProxy instanceof orange.NetProxy))
                    }
                    this._netProxy.receive(msg);
                }
            }
        }

        public send(data: any): INetSendMessage {
            let msg = data;
            // if (this.connected) {
            if (this._protocol) {
                msg = this._protocol.encode(data);
            }
            if (msg) {
                this._connection.send(msg.bytes);
            }
            // }
            return msg;
        }

        public reconnect(url?: string): Promise<void> {
            return this._connection.reconnect(url);
        }

        public get url(): string {
            return this._connection.url;
        }
    }
}