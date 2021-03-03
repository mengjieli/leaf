namespace orange {

  export interface INetSendMessage {

    /**
     * 打包好的消息
     */
    bytes: ArrayBuffer;

    /**
     * 消息序列
     */
    sequence: number;
  }
}