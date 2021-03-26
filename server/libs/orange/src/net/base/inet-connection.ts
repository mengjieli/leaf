namespace orange {

    /**
     * 除了实现接口还需要实现如下事件：
     * Event.CLOSE
     */
    export interface INetConnection {

        readonly connected: boolean;

        /**
         * 协议对象
         * 打包消息和解包消息
         */
        protocol: INetProtocol;


        /**
         * 是否激活，默认为激活状态
         */
        active: boolean;

        /**
         * 网络代理类，封装了发消息的便捷方法，以及监听消息回调
         */
        proxy: INetProxy;

        url: string;

        /**
         * 链接服务器超时时间(单位秒)
         * @default 10
         */
        connectTimeout: number;

        /**
         * 客户端验证心跳爆超时时间(单位秒)
         * @default 10
         */
        hertTimeout: number;

        /**
         * 心跳包时间(单位秒)
         * @default 5
         */
        hertTimeinterval: number;

        close(reason?: ConnectionCloseReason, data?: any);

        send(data: any): INetSendMessage;

        reconnect(url?: string): Promise<void>;

        // /**
        //  * @internal
        //  */
        // onClose(): Promise<void>;
    }
}