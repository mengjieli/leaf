namespace syncData {

  /**
   * @internal
   */
  export let cmdMap: { [key: number]: string };

  export class Proxy extends orange.NetProxy implements orange.INetProxy {
    private clear;

    private _debug = false;

    public get debug(): boolean {
      return this._debug;
    }

    public set debug(val: boolean) {
      orange.APIUtil.deprecatedTip(
        "Proxy.debug",
        1543464755206,
        "不再需要单独设置网络打印，采用 orange.debug 进行判断"
      );
      this._debug = val;
    }

    public version = "0.1.0";

    /**
     * 根数据
     */
    public root: any = null;

    /**
     * 用于数据同步的消息 id
     */
    private syncCommands: string[] = ["Resp_Sync"];
    private syncAll = false;

    public set cmdMap(value: { [key: number]: string }) {
      cmdMap = value;
    }

    /**
     * 添加数据同步指令
     * @param cmd
     */
    public addSyncCommand(cmd: string) {
      this.syncCommands.push(cmd);
    }

    /**
     * 同步所有指令
     */
    public set syncAllCommand(val: boolean) {
      this.syncAll = val;
    }

    /**
     * @internal
     */
    private lastSeq: number = 0;

    /**
     * @internal
     */
    private lastConnectTime = 0;

    /**
     * @internal
     */
    private _connection: orange.INetConnection;

    public get connection(): orange.INetConnection {
      return this._connection;
    }

    /**
     * 重连次数
     */
    reconnectCount = 5;

    /**
     * @internal
     */
    curReconnectCount = 0;

    static self = true;

    public set connection(c: orange.INetConnection) {
      this._connection = c;
      orange["$onAt"](
        this._connection,
        orange.Event.CLOSE,
        async e => {
          let last = this.lastConnectTime;
          let now = Date.now();
          this.lastConnectTime = now;
          //如果不是主动断开
          if (!this.quit) {
            let data = e.data as orange.ConnectionCloseData;
            // if (now - last < 1000 * this.reconnectInterval) {
            //   data.reason = orange.ConnectionCloseReason.RECONNECT_FREQUENT;
            // } else {
            if (
              data.reason == orange.ConnectionCloseReason.DISCONNECT ||
              data.reason == orange.ConnectionCloseReason.HERT_TIMEOUT ||
              (data.reason == orange.ConnectionCloseReason.RECONNECT_ERROR &&
                this.curReconnectCount < this.reconnectCount)
            ) {
              e.stop();
              this.curReconnectCount++;
              orange.debug && console.warn(`第${this.curReconnectCount}重连`);
              if (data.reason == orange.ConnectionCloseReason.RECONNECT_ERROR) {
                await orange.sleep(1000);
              }
              let url = new orange.URLUtil(this._connection.url);
              url.params["seq"] = this.lastSeq;
              await this._connection.reconnect(url.url);
              this.curReconnectCount = 0;
              for (let key in this.records) {
                (this.connection.protocol as Protocol).setSeq = +key;
                this.connection.send(this.records[key]);
              }
              (this.connection.protocol as Protocol).setSeq = 0;
            }
            // }
          } else {
            clearInterval(this.clear);
          }
        },
        null,
        0
      );
    }

    /**
     * @internal
     */
    private quit = false;

    /**
     * 接受消息，处理消息分发
     * @param data 消息
     */
    @orange.modify
    public receive(data: NetReceiveMessage): void {
      if (data.serverSequence && data.serverSequence <= this.lastSeq) {
        console.warn(
          "[过滤重复消息] id:" +
          data.command +
          ", sequence:" +
          data.sequence +
          ", serverSequence:" +
          data.serverSequence +
          ", errorCode:" +
          data.errorCode +
          (data.errorCode != 0
            ? `, errorMessage:${data.errorMessage} `
            : "") +
          (data.sequence > 0 ? "(客户端调用返回)" : "")
        );
        return;
      }
      if (data.serverSequence && data.serverSequence != this.lastSeq + 1) {
        console.warn(
          "[服务器消息丢失] id:" +
          data.command +
          ", sequence:" +
          data.sequence +
          ", serverSequence:" +
          data.serverSequence +
          ", errorCode:" +
          data.errorCode +
          (data.errorCode != 0
            ? `, errorMessage:${data.errorMessage} `
            : "") +
          (data.sequence > 0 ? "(客户端调用返回)" : "")
        );
        this.connection.close(orange.ConnectionCloseReason.SERVER_MESSAGE_LOST);
        return;
      }
      if (data.errorCode < 0) {
        this.quit = true;
        console.warn("[错误码小于 0]", data);
        this.connection.close(orange.ConnectionCloseReason.ERROR_CODE, data);
      }
      orange.baseSync.serverTime = data.serverTime;
      data.serverSequence && (this.lastSeq = data.serverSequence);
      delete this.records[data.sequence];
      if (orange.debug) {
        console.log(
          "[服务器消息] id:" +
          data.command +
          ", cmd:" +
          cmdMap[data.command] +
          ", sequence:" +
          data.sequence +
          ", errorCode:" +
          data.errorCode +
          (data.errorCode != 0
            ? `, errorMessage:${data.errorMessage} `
            : "") +
          (data.sequence > 0 ? "(客户端调用返回)" : "")
        );
        data.body && console.log(data.body);
      }
      if (this.syncCommands) {
        UpdateEvent.$proxy = this;
        if (
          this.syncAll ||
          this.syncCommands.indexOf(data.command as string) != -1
        ) {
          for (let k in data.body) {
            if (this.root[k]) {
              let objKeyName = this.root[k]._key_;
              if (
                objKeyName &&
                data.body[k].hasOwnProperty(objKeyName) &&
                data.body[k][objKeyName] != this.root[k][objKeyName]
              ) {
                let e = new UpdateEvent(UpdateEvent.RESET_DATA);
                e.data = this.root[k];
                e.name = e.path = k;
                e.proxy = UpdateEvent.$proxy;
                UpdateEvent.emitter.emit(e);
                this.root[k].reset();
              }
              this.root[k].setValue(data.body[k]);
            }
          }
        }
        UpdateEvent.$proxy = null;
      }
      this.resolveAsyncMessage(data.sequence, data.clone());
      this.receiveMessage(data.command, data);
    }

    private records: orange.MapLike<Cmd> = {};

    public send(data: Cmd): orange.INetSendMessage {
      let sendBack = super.send(data);
      if (orange.debug) {
        console.log(
          "[发送] ",
          data.srv + data.cmd,
          data,
          `sequence:${sendBack.sequence}`
        );
      }
      this.records[sendBack.sequence] = data;
      return sendBack;
    }

    public request(data: Cmd, back?: (data: any) => void): Promise<any> {
      return super.request(data, back, sendBack => {
        if (orange.debug) {
          console.log(
            "[发送] ",
            data.srv + data.cmd,
            data,
            `sequence:${sendBack.sequence}`
          );
        }
        this.records[sendBack.sequence] = data;
      });
    }
  }
}
