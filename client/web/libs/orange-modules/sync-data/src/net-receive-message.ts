namespace syncData {
  export class NetReceiveMessage implements orange.INetReceiveMessage {
    /**
     * 消息序列
     */
    sequence: number;
    /**
     * 服务器消息序列
     */
    serverSequence: number;
    /**
     * 消息 id
     */
    command: string | number;
    /**
     * 错误码  0  表示正确，其它异常
     */
    errorCode: number;
    /**
     * 错误消息，错误码为 0 时  msg 为 null
     */
    errorMessage: string;
    /**
     * 系统时间
     */
    serverTime: number;
    /**
     * 消息体
     */
    body: any;

    constructor(resp: { errorCode: number, errorMessage: string, serverTime: number, body: any } & orange.INetReceiveMessage) {
      Object.assign(this, resp);
    }

    getResponse<T extends DataBase>(): T {
      const def = cmdMap[this.command];
      const cls: DataBase = new window[def];
      cls.setValue(this.body);
      return (cls as any);
    }

    /**
     * @internal
     */
    clone(): NetReceiveMessage {
      return new NetReceiveMessage(this);
    }
  }
}