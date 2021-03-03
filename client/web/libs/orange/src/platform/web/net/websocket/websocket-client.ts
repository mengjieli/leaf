/**
 * @internal
 */
namespace orange {

	export namespace platform {

		export class WebsocketClient implements IWebsocketClient {

			private _client: WebSocket;

			private _url: string;
			active: boolean = true;

			public get url(): string {
				return this._url;
			}

			/**
			 * 链接服务器超时时间(单位秒)
			 * @default 10
			 */
			connectTimeout: number;

			/**
			 * 心跳包时间(单位秒)
			 * @default 5
			 */
			hertTimeinterval: number;

			/**
			 * 客户端验证心跳爆超时时间(单位秒)
			 * @default 10
			 */
			hertTimeout: number;

			ready: boolean = false;

			async connect(url) {
				if (orange.debug) {
					console.warn('[platform socket] connect ' + url)
				}
				this._url = url;
				this.closeSelf = false;
				this._client = new WebSocket(this._url);
				this._client.onopen = (evt) => {
					this._onSocketOpen();
				}
				this._client.onclose = (evt) => {
					this._onClose();
				}
				this._client.onmessage = (event) => {
					let blob = event.data;
					let reader = new FileReader();
					reader.onload = (result) => {
						// console.log(result);
						let buffer = new Uint8Array(reader.result as any)
						this._onReceiveData(buffer);
					}
					reader.readAsArrayBuffer(blob);
				}
				// this._client.type = egret.WebSocket.TYPE_BINARY;
				// this._client.addEventListener(egret.Event.CONNECT, this._onSocketOpen, this);
				// this._client.addEventListener(egret.Event.CLOSE, this._onClose, this);
				// this._client.addEventListener(egret.IOErrorEvent.IO_ERROR, this._onIOError, this);
				// this._client.addEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveData, this);
				// this._client.connectByUrl(url);
			}

			private _hasConnected: boolean = false;

			public get connected(): boolean {
				return this._hasConnected;
			}

			private _onSocketOpen(): void {
				if (orange.debug) {
					console.warn('[platform socket] connect')
				}
				this._hasConnected = true;
				orange.emitWith(this, Event.CONNECT);
				//因为外面使用 await connect 之后才赋值 proxy ，导致下一帧才赋值 proxy，导致丢包
				setTimeout(() => {
					this.ready = true;
					this.msgList.forEach(msg => {
						if (orange.debug) {
							try {
								orange.emitWith(this, Event.DATA, msg);
							} catch (e) {
								console.error('执行消息出错');
								console.error(e);
							}
						} else {
							orange.emitWith(this, Event.DATA, msg);
						}
					})
					this.msgList.length = 0;
				}, 50);
			}

			private _onConnectError(error = null) {
				this._client && this._client.close();
				orange.emitWith(this, Event.CONNECT_ERROR, error);
			}

			private _onIOError(error?) {
				if (orange.debug) {
					console.warn('[platform socket] error')
				}
				if (this._hasConnected) {
					orange.emitWith(this, Event.ERROR, error);
				} else {
					this._onConnectError(error);
				}
			}

			private closeSelf: boolean = false;

			private async _onClose() {
				if (orange.debug) {
					console.warn('[platform socket] on close')
				}
				if (this._hasConnected) {
					this._hasConnected = false;
					orange.emitWith(this, Event.CLOSE, { self: this.closeSelf });
				} else {
					this._onConnectError();
				}
			}

			private msgList = [];

			private _onReceiveData(u8) {
				if (orange.debug) {
					// console.log('[platform socket] onReceived')
				}
				if (!this._client) return;
				// let bytes = new egret.ByteArray();
				// this._client.readBytes(bytes);
				// let array = [];
				// for (let i = 0; i < bytes.length; i++) {
				// 	array.push(bytes.readByte());
				// }
				// let u8 = new Uint8Array(array);
				// if (orange.debug) {
				// 	// console.log('[platform socket] onReceived len = ' + u8.byteLength)
				// }
				if (!this.ready) this.msgList.push(u8);
				else orange.emitWith(this, Event.DATA, u8);
			}

			public close(msg?: any): void {
				if (orange.debug) {
					console.warn('[platform socket] close self', JSON.stringify(msg, null, 2))
				}
				this.closeSelf = true;
				if (this._client) {
					let _client = this._client;
					this._client = null;
					_client.close();
					console.warn('[platform socket] egret ws close ', JSON.stringify(msg, null, 2))
				}
			}

			public send(data: Uint8Array): void {
				if (orange.debug) {
					// console.log('[platform socket] send ');
				}
				if (!this._client) {
					return;
				}
				if (orange.debug) {
					// console.log('[platform socket] send len = ' + data.byteLength);
				}
				// let bytes = new egret.ByteArray(data);
				this._client.send(data);
				// this._client.flush();
			}
		}
	}
}