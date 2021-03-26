namespace orange {

    export interface INetClient {

        connect(url: string): Promise<INetConnection>;
    }
}