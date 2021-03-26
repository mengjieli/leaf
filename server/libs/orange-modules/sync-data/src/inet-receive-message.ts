namespace syncData {
  export interface INetReceiveMessage extends orange.INetReceiveMessage {

    /**
     * 错误码  0  表示正确，其它异常
     */
    errorCode: number;

    /**
     * 错误消息，错误码为 0 时  msg 为 null
     */
    errorMessage: string;

    /**
     * 消息体
     */
    body: any;
  }
}