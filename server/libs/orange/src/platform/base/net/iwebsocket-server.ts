/**
 * @internal
 */
namespace orange {

    export namespace platform {

        /**
         * 除了接口还要实现如下事件
         * Event.CONNECT 新的客户端链接上  event.data 为 IWebsocketClient
         */
        export interface IWebsocketServer {

            start(port:number):void;

            stop():void;
        }
    }
}