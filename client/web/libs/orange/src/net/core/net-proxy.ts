namespace orange {

  export class NetProxy implements orange.INetProxy {

    connection: orange.INetConnection;

    /**
     * 指令超时时间(秒)
     */
    commandTimeout: number = 7;

    /**
     * 重连间隙(秒)
     */
    reconnectInterval = 1;

    /**
     * 接受消息，处理消息分发
     * @param data 消息
     */
    receive(data: INetReceiveMessage): void {
      this.resolveAsyncMessage(data.sequence, data);
      this.receiveMessage(data.command, data);
    }

    get active(): boolean {
      return this.connection.active;
    }

    private _setActiveId = 0;

    set active(val: boolean) {
      this._setActiveId++;
      console.warn('set active:', val, this.connection.active, ' set id:', this._setActiveId);
      this.connection.active = val;
    }

    /**
     * 延迟激活网络，为了和唤醒的事务处理错开时间，如果在延迟过程中重新设置了网络激活状态会放弃这次激活处理
     * @param delay 延迟时间，毫秒
     */
    async setActiveTrueDelay(delay: number) {
      let id = this._setActiveId;
      console.warn('set active delay:', delay, this.connection.active, ' set id:', this._setActiveId, id);
      await orange.sleep(delay);
      console.warn('set active delay complete:', delay, this.connection.active, ' set id:', this._setActiveId, id);
      if (id != this._setActiveId) return;
      console.warn('set active delay really:', delay, this.connection.active, ' set id:', this._setActiveId, id);
      this.active = true;
    }

    // public onClose() {
    //   let resolves = this.resolves;
    //   for (let key in resolves) {
    //     resolves[key]({ errorCode: -1, errorMessage: 'close', body: null });
    //   }
    //   this.resolves = {};
    //   this.msgBacks = {};
    //   this.msgAllBacks = [];
    // }

    public send(data: any): INetSendMessage {
      if (this.connection) {
        return this.connection.send(data);
      }
      return;
    }

    /**
     * @internal
     */
    private resolves = {};

    public resolveAsyncMessage(msgSeq: number, data: INetReceiveMessage) {
      let resolves = this.resolves;
      if (resolves[msgSeq]) {
        resolves[msgSeq].resolve && resolves[msgSeq].resolve(data);
        resolves[msgSeq].back && resolves[msgSeq].back(data);
        delete resolves[msgSeq];
        // !resolves[msgSeq].back && delete resolves[msgSeq];
      }
    }

    private lastTime;
    private update = () => {
      if (!this.active || !this.connection) return;
      let now = Date.now();
      let gap = now - this.lastTime;
      this.lastTime = now;
      if (gap > 500) gap = 500;
      for (let k in this.resolves) {
        this.resolves[k].time -= gap;
        if (this.resolves[k].time < 0) {
          orange.debug && console.error('指令超时:', k);
          this.connection.close(ConnectionCloseReason.COMMAND_TIME_OUT, k);
          return;
        }
      }
    }

    private start() {
      let c = setInterval(this.update, 16);
      this.lastTime = Date.now();
      orange.on(this.connection, orange.Event.CLOSE, async (e) => {
        let data = e.data as orange.ConnectionCloseData;
        if (data.reason != orange.ConnectionCloseReason.DISCONNECT && data.reason != orange.ConnectionCloseReason.HERT_TIMEOUT) {
          clearInterval(c);
        }
      });
    }

    private _hasStart = false;

    public request(data: any, back?: (data: any) => void, getSendMessage?: (msg: INetSendMessage) => void): Promise<any> {
      return new Promise<any>(
        (resolve, reject) => {
          if (this.connection) {
            if (!this._hasStart) {
              this._hasStart = true;
              this.start();
            }
            let msg = this.connection.send(data);
            this.resolves[msg.sequence] = {
              resolve: resolve,
              back: back,
              time: this.commandTimeout * 1000
            }
            getSendMessage && getSendMessage(msg);
          }
        }
      );
    }

    protected receiveMessage(msgID: number | string, data: any) {
      let msgBacks = this.msgBacks;
      if (msgBacks[msgID]) {
        let list = msgBacks[msgID];
        for (let item of list) {
          if (item.flag) {
            item.back.call(item.thisObj, data);
          }
        }
      }
      let list = this.msgAllBacks;
      for (let i = 0; i < list.length; i++) {
        if (list[i].flag) {
          list[i].back.call(list[i].thisObj, data);
        }
      }
    }

    /**
     * @internal
     */
    private msgBacks = {};
    private msgAllBacks = [];

    public addMessageBack(msgID: number | string, back: Function, thisObj: any = null): void {
      if (!this.msgBacks[msgID]) {
        this.msgBacks[msgID] = [];
      }
      let list = this.msgBacks[msgID];
      for (let i = 0; i < list.length; i++) {
        if (list[i].back == back && list[i].thisObj == thisObj && list[i].flag) {
          list[i].flag = true;
          return;
        }
      }
      this.msgBacks[msgID].push({ back: back, thisObj: thisObj, flag: true });
    }

    public removeMessageBack(msgID: number | string, back: Function, thisObj: any = null): void {
      if (this.msgBacks[msgID]) {
        let list = this.msgBacks[msgID];
        for (let i = 0; i < list.length; i++) {
          if (list[i].back == back && list[i].thisObj == thisObj) {
            list[i].flag = false;
            break;
          }
        }
      }
    }

    public removeMessageBackByThis(thisObj: any): void {
      let msgBacks = this.msgBacks;
      for (let msgID in msgBacks) {
        let list = msgBacks[msgID];
        for (let i = 0; i < list.length; i++) {
          if (list[i].thisObj == thisObj) {
            list[i].flag = false;
            break;
          }
        }
      }
      let list = this.msgAllBacks;
      for (let i = 0; i < list.length; i++) {
        if (list[i].thisObj == thisObj) {
          list[i].flag = false;
        }
      }
    }

    public addAllMessageBack(back: Function, thisObj: any = null): void {
      let list = this.msgAllBacks;
      for (let i = 0; i < list.length; i++) {
        if (list[i].back == back && list[i].thisObj == thisObj) {
          list[i].flag = true;
          return;
        }
      }
      list.push({ back: back, thisObj: thisObj, flag: true });
    }

    public removeAllMessageBack(back: Function, thisObj: any = null): void {
      let list = this.msgAllBacks;
      for (let i = 0; i < list.length; i++) {
        if (list[i].back == back && list[i].thisObj == thisObj) {
          list[i].flag = false;
        }
      }
    }
  }
}