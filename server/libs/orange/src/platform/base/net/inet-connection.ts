
namespace orange {

    /**
         * 除了接口还要实现如下事件
         * Event.CLOSE 链接关闭
         * Event.DATA 收到数据
         */
    export namespace platform {

        export interface INetConnection {

            readonly connected: boolean;

            readonly url: string;

            /**
             * 是否激活，默认为激活状态
             */
            active: boolean;

            send(data: Uint8Array): any;

            close(reason?: ConnectionCloseReason, data?: any): void;

            reconnect?(url: string): Promise<void>;

            /**
             * 链接服务器超时时间(单位秒)
             * @default 10
             */
            connectTimeout: number;

            /**
             * 心跳包时间(单位秒)
             * @default 5
             */
            hertTimeinterval: number;

            /**
             * 客户端验证心跳爆超时时间(单位秒)
             * @default 10
             */
            hertTimeout: number;
        }
    }
}