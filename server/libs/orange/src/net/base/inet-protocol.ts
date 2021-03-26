namespace orange {

    export interface INetProtocol {

        /**
         * 
         * @param data 消息
         * @param url 服务器地址
         */
        encode(data: any): INetSendMessage;

        /**
         * 
         * @param data 消息
         * @param url 服务器地址
         */
        decode(data: Uint8Array): INetReceiveMessage;
    }
}