/**
 * @internal
 */
namespace orange {

    /**
     * 除了实现接口还要实现如下事件:
     * Event.CONNECT 新客户端链接时触发
     */
    export interface INetServer {

        start(port:number):void;
        
        stop():void;
    }
}