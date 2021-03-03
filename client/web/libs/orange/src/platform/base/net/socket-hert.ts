/**
 * @internal
 */
namespace orange {

  export namespace platform {

    export class SocketHert extends HashObject {

      socket: WebsocketState;

      private lastSendHert: number;
      private lastReceiveHert: number;
      private interval = -1;

      active: boolean = true;

      start(socket: WebsocketState): void {
        if (orange.debug) {
          console.warn('[socket heart] new', this.hash)
        }
        this.socket = socket;
        this.lastSendHert = Date.now();
        this.lastReceiveHert = Date.now();
        this.tick();
      }

      tick() {
        if (this.interval != -1) return;
        //发送一次心跳
        if (!this.active) this.socket.send(new Uint8Array([0]));
        this.interval = setInterval(() => {
          if (!this.active) return;
          if (Date.now() - this.lastSendHert >= this.socket.hertTimeinterval * 1000) {
            if (orange.debug) {
              console.warn('[socket heart] send', this.hash)
            }
            // console.log('发送心跳')
            this.lastSendHert = Date.now();
            this.socket.send(new Uint8Array([0]));
          }
          if (Date.now() - this.lastReceiveHert >= this.socket.hertTimeout * 1000) {
            if (orange.debug) {
              console.warn('[socket heart] close', this.hash)
            }
            // console.log('主动断开')
            this.lastReceiveHert = Date.now();
            clearInterval(this.interval);
            this.interval = -1;
            this.socket.close(orange.ConnectionCloseReason.HERT_TIMEOUT);
          }
        }, 16);
      }

      send(): void {
        this.lastSendHert = Date.now();
      }

      receive(): void {
        this.lastReceiveHert = Date.now();
      }

      stop(): void {
        if (orange.debug) {
          console.warn('[socket heart] stop', this.hash)
        }
        clearInterval(this.interval);
        this.interval = -1;
      }
    }
  }
}