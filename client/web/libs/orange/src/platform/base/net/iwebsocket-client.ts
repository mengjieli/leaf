/**
 * @internal
 */
namespace orange {

    export namespace platform {

        export interface IWebsocketClient extends INetConnection {

            connect(url: string): void;
        }
    }
}