namespace orange {

  export interface INetSendMessage {

    /**
     * 打包好的消息
     */
    bytes: Uint8Array;

    /**
     * 消息序列
     */
    sequence: number;
  }
}