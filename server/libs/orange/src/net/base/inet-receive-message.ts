namespace orange {

  export interface INetReceiveMessage {

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
  }
}