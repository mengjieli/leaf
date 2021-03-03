namespace orange {

	export class WebSocketClient implements INetClient {

		/**
		 * @internal
		 */
		private _client: platform.IWebsocketClient;

		/**
		 * @internal
		 */
		private _connection: INetConnection;

		/**
		 * @internal
		 */
		public get connection(): INetConnection {
			return this._connection;
		}

		/**
		 * @internal
		 */
		private _connectResolve: Function;

		/**
		 * @internal
		 */
		private _connectReject: Function;

		public connect(url: string): Promise<INetConnection> {
			this._client = new platform.WebsocketState();
			orange.on(this._client, Event.CONNECT, this._onConnect, this);
			orange.on(this._client, Event.CONNECT_ERROR, this._onConnectError, this);
			this._client.connect(url);
			return new Promise<INetConnection>((resolve, reject) => {
				if (this.connection) {
					resolve(this.connection);
				} else {
					this._connectResolve = resolve;
					this._connectReject = reject;
				}
			});
		}

		/**
		 * @internal
		 */
		private _onConnect(e) {
			if (this._connectResolve) {
				this._connection = new NetConnection(this._client);
				this._client = null;
				let func = this._connectResolve;
				this._connectResolve = null;
				let c = this.connection;
				this._connection = null;
				func(c);
			}
		}

		/**
		 * @internal
		 */
		private _onConnectError(e) {
			if (this._connectReject) {
				this._client && orange.removeAllListeners(this._client);
				this._client = null;
				let func = this._connectReject;
				this._connectReject = null;
				let e = new Event(Event.CONNECT_ERROR);
				e.$target = this;
				func(e);
			}
		}
	}
}