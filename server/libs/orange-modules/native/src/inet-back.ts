namespace orangeNative {

  export interface INetBack extends orange.INetReceiveMessage {

    /**
     * 错误码
     * 0 为正确
     * 大于 0 为游戏错误码
     * 小于 0 为系统错误码
     */
    errorCode: number;

    /**
     * 错误消息，错误码为 0 时 errorMessage 为 null
     */
    errorMessage: string;

    /**
     * 返回消息，错误码为 0 时 body 为 null
     */
    body: null;
  }

}