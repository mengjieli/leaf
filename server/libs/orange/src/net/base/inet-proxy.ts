namespace orange {

    export interface INetProxy {

        connection: INetConnection;

        active: boolean;
        
        /**
         * 延迟激活网络，为了和唤醒的事务处理错开时间，如果在延迟过程中重新设置了网络激活状态会放弃这次激活处理
         * @param delay 延迟时间，毫秒
         */
        setActiveTrueDelay(delay: number): Promise<void>;

        /**
         * 指令超时时间(秒)
         * @default 7
         */
        commandTimeout: number;

        /**
         * 重连间隙(秒)
         * @default 1
         */
        reconnectInterval:number;

        /**
         * 
         * @param data 消息
         * @param url 服务器地址
         */
        receive(data: INetReceiveMessage): void;

        /**
         * 
         * @param data 发送消息
         */
        send(data: any): INetSendMessage;

        /**
         * 请求
         * @param data 
         */
        request(data: any, back?: (data: any) => void, getSendMessage?: (msg: INetSendMessage) => void): Promise<any>;

        resolveAsyncMessage(msgSeq: number, data: INetReceiveMessage): void;

        /**
         * 注册消息
         * @param msgID
         * @param back 
         * @param thisObj 
         */
        addMessageBack?(msgID: number | string, back: Function, thisObj?: any): void;

        /**
         * 移除消息
         * @param msgID 
         * @param back 
         * @param thisObj 
         */
        removeMessageBack?(msgID: number | string, back: Function, thisObj?: any): void;

        /**
         * 移除消息
         * @param thisObj 
         */
        removeMessageBackByThis?(thisObj: any): void;

        /**
         * 对所有消息进行监听
         * @param back 
         * @param thisObj 
         */
        addAllMessageBack(back: Function, thisObj?: any): void

        /**
         * 移除对所有消息的监听
         * @param back 
         * @param thisObj 
         */
        removeAllMessageBack(back: Function, thisObj?: any): void

        // /**
        //  * @internal
        //  * 网络断开时由 connection 调用
        //  */
        // onClose(): void;
    }
}