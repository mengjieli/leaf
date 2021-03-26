/**
 * @internal
 */
namespace orange {

  export namespace platform {

    export class WebsocketState implements IWebsocketClient {

      private client: IWebsocketClient;
      private hert: SocketHert
      private debug = orange.debug;
      private closeDo = null;

      async connect(url: string) {
        let client = this.client = new WebsocketClient();
        let hert = this.hert = new SocketHert();
        this.state = SOCKET_STATE.CONNECTTING;
        //连上服务器
        orange.on(this.client, Event.CONNECT, (e) => {
          if (client != this.client) {
            client.close();
            return;
          }
          this.debug && console.log('[链上服务器]')
          this.state = SOCKET_STATE.CONNECTED;
          this._connected = true;
          hert.start(this);
          orange.emit(this, e);
        });
        orange.on(this.client, Event.CONNECT_ERROR, (e: orange.Event) => {
          if (client != this.client) return;
          if (this.active == false) {
            this.closeDo = (() => {
              e = e.clone();
              return () => {
                this.debug && console.log('[链服务器出错]')
                this.state = SOCKET_STATE.CLOSE;
                this.client = null;
                orange.emit(this, e);
              }
            })();
          } else {
            this.debug && console.log('[链服务器出错]')
            this.state = SOCKET_STATE.CLOSE;
            this.client = null;
            orange.emit(this, e);
          }
        });
        orange.on(this.client, Event.CLOSE, (e) => {
          if (client != this.client) return;
          if (this.active == false) {
            this.closeDo = (() => {
              e = e.clone();
              return () => {
                this.debug && console.log('[断开链接]')
                this.state = SOCKET_STATE.CLOSE;
                this.client = null;
                hert.stop();
                orange.emit(this, orange.Event.create(Event.CLOSE, new orange.ConnectionCloseData(orange.ConnectionCloseReason.DISCONNECT)));
              }
            })();
          } else {
            this.debug && console.log('[断开链接]')
            this.state = SOCKET_STATE.CLOSE;
            this.client = null;
            hert.stop();
            orange.emit(this, orange.Event.create(Event.CLOSE, new orange.ConnectionCloseData(orange.ConnectionCloseReason.DISCONNECT)));
          }
        });
        orange.on(this.client, Event.DATA, (e) => {
          if (client != this.client) return;
          hert.receive();
          e.data.length > 1 && orange.emit(this, e);
        });
        this._url = url;
        client.connect(url);
        await orange.sleep(this.connectTimeout * 1000);
        if (!this.active) {
          await this.activeTrue();
          await orange.sleep(this.connectTimeout * 1000);
        }
        if (client == this.client) {
          if (this.state != 3) {
            this.debug && console.log('[链接服务器超时]')
            this.close(orange.ConnectionCloseReason.DISCONNECT, null, false);
            orange.emitWith(this, Event.CONNECT_ERROR, new orange.ConnectionCloseData(orange.ConnectionCloseReason.CONNECT_TIMEOUT));
          }
        }
      }

      /**
       * 是否激活
       * 不激活的状态下网络不感应断线信息
       */
      private _active = true;

      public get active(): boolean {
        return this._active;
      }

      public set active(val: boolean) {
        if (this._active == val) return;
        this.hert.active = val;
        this._active = val;
        if (val) {
          this.closeDo && this.closeDo();
          this.closeDo = null;
        }
      }

      private async activeTrue() {
        if (!this._active) {
          return new Promise<void>(resolve => {
            let clear = setInterval(() => {
              if (this.active) {
                clearInterval(clear);
                resolve();
              }
            }, 50);
          });
        }
      }

      /**
       * 重新链接
       * @param url 
       */
      async reconnect(url?: string): Promise<void> {
        return new Promise<void>(async resolve => {
          if (this.client) {
            let client = this.client;
            this.client = null;
            this.state = SOCKET_STATE.CLOSE;
            client.close();
          }
          let client = this.client = new WebsocketClient();
          let hert = this.hert = new SocketHert();
          this.state = SOCKET_STATE.CONNECTTING;
          //连上服务器
          orange.on(this.client, Event.CONNECT, (e) => {
            if (client != this.client) {
              client.close();
              return;
            }
            this.state = SOCKET_STATE.CONNECTED;
            this.debug && console.log('[重链上服务器]')
            hert.start(this);
            resolve();
          });
          orange.on(this.client, Event.CONNECT_ERROR, (e) => {
            if (client != this.client) return;
            if (this.active == false) {
              this.closeDo = () => {
                this.debug && console.log('[重链服务器出错]')
                this.state = SOCKET_STATE.CLOSE;
                this.close(orange.ConnectionCloseReason.RECONNECT_ERROR);
              }
            } else {
              this.debug && console.log('[重链服务器出错]')
              this.state = SOCKET_STATE.CLOSE;
              this.close(orange.ConnectionCloseReason.RECONNECT_ERROR);
            }
          });
          orange.on(this.client, Event.CLOSE, (e) => {
            if (client != this.client) return;
            if (this.active == false) {
              this.closeDo = () => {
                this.debug && console.log('[重断开链接]')
                this.state = SOCKET_STATE.CLOSE;
                hert.stop();
                this.client = null;
                orange.emit(this, orange.Event.create(Event.CLOSE, new orange.ConnectionCloseData(orange.ConnectionCloseReason.DISCONNECT)));
              }
            } else {
              this.debug && console.log('[重断开链接]')
              this.state = SOCKET_STATE.CLOSE;
              hert.stop();
              this.client = null;
              orange.emit(this, orange.Event.create(Event.CLOSE, new orange.ConnectionCloseData(orange.ConnectionCloseReason.DISCONNECT)));
            }
          });
          orange.on(this.client, Event.DATA, (e) => {
            if (client != this.client) return;
            hert.receive();
            e.data.length > 1 && orange.emit(this, e);
          });
          this._url = url;
          client.connect(url);
          await orange.sleep(this.connectTimeout * 1000);
          if (!this.active) {
            await this.activeTrue();
            await orange.sleep(this.connectTimeout * 1000);
          }
          if (client == this.client) {
            if (this.state != 3) {
              this.debug && console.log('[重链接服务器超时]')
              this.close(orange.ConnectionCloseReason.CONNECT_TIMEOUT);
            }
          }
        })
      }

      private _url: string;
      get url(): string {
        return this._url;
      }

      private _connected: boolean = false;
      get connected(): boolean {
        return this._connected;
      }

      private state = SOCKET_STATE.CLOSE;

      /**
       * 链接服务器超时时间
       */
      connectTimeout: number = 10;

      /**
       * 心跳包时间(单位秒)
       */
      hertTimeinterval: number = 5;

      /**
       * 客户端验证心跳爆超时时间
       */
      hertTimeout = 10;

      send(data: Uint8Array): any {
        if (!this.client) return;
        this.hert.send();
        this.client.send(data);
      }

      close(reason: ConnectionCloseReason = 0, data?: any, dispatch: boolean = true): void {
        if (!this.active) {
          this.closeDo = () => {
            this.close(reason, data, dispatch);
          }
          return;
        }
        if (this.hert) this.hert.stop();
        if (!this.client) return;
        let client = this.client;
        this.client = null;
        this.state = SOCKET_STATE.CLOSE;
        client.close(reason);
        this._connected = false;
        dispatch && orange.emitWith(this, orange.Event.CLOSE, new ConnectionCloseData(reason, data));
      }
    }

    enum SOCKET_STATE {
      CLOSE = 1, //断开
      CONNECTTING = 2, //正在链接
      CONNECTED = 3 //已链接
    }
  }
}