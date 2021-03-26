namespace orange {

  function getError(reason: ConnectionCloseReason): string {
    if (reason === ConnectionCloseReason.CLOSE_SELF) return '主动断开';
    if (reason === ConnectionCloseReason.DISCONNECT) return '从服务器断开';
    if (reason === ConnectionCloseReason.CONNECT_TIMEOUT) return '连接服务器超时';
    if (reason === ConnectionCloseReason.RECONNECT_ERROR) return '与服务器的重连出错';
    if (reason === ConnectionCloseReason.ERROR_CODE) return '错误码';
    if (reason === ConnectionCloseReason.HERT_TIMEOUT) return '心跳包超时';
    if (reason === ConnectionCloseReason.SERVER_MESSAGE_LOST) return '服务器消息丢失';
    if (reason === ConnectionCloseReason.COMMAND_TIME_OUT) return '指令超时';
    return '未定义错误';

  }

  /**
   * 网络链接断开
   */
  export class ConnectionCloseData extends Error {

    constructor(reason: ConnectionCloseReason, data?: any) {
      super(getError(reason))
      this.reason = reason;
      this.data = data;
    }

    /**
     * 断开原因
     */
    public reason: ConnectionCloseReason;

    public get message(): string {
      return getError(this.reason);
    }

    /**DISCONNECT
     * 携带的数据
     */
    public data: any;
  }

  export enum ConnectionCloseReason {
    /**
     * 主动断开
     */
    CLOSE_SELF = 0,
    /**
     * 从服务器断开
     */
    DISCONNECT = 1,
    /**
     * 链接服务器超时
     */
    CONNECT_TIMEOUT = 2,
    /**
     * 与服务器的重链出错
     */
    RECONNECT_ERROR = 3,
    /**
     * 错误码小于 0 断开
     */
    ERROR_CODE = 4,
    /**
     * 心跳包超时
     */
    HERT_TIMEOUT = 5,
    /**
     * 服务器消息丢失
     */
    SERVER_MESSAGE_LOST = 6,
    /**
     * 指令超时
     */
    COMMAND_TIME_OUT = 7
  }
}