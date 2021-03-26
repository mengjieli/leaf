namespace orangeNative {
  /**
   * @internal
   * 与本地 orange server 进行通信
   */
  export namespace native {

    export class NativeClient {

      /**
       * 连接本地服务器
       * @param url 
       */
      async connect(url: string) {
        return new Promise<void>(resolve => {
          var client: orange.WebSocketClient;
          (client = new orange.WebSocketClient()).connect(url).then(connection => {
            connection.protocol = new Protocol();
            this.proxy = connection.proxy = new Proxy();
            this.proxy.connection.hertTimeout = 10000;
            this.proxy.connection.hertTimeinterval = 5000;
            // (this.proxy as orange.sync.Proxy).debug = true;
            resolve();
          }).catch(e => {
            console.error('[orange native] 启动本地服务失败，无法链接 orange server');
            resolve();
          })
        });
      }

      get isReady(): boolean {
        return this.proxy ? true : false;
      }

      /**
       * @internal
       */
      proxy: orange.INetProxy;

      public send(data: any, back?: (data: any) => void): Promise<any> {
        if (!this.isReady) {
          console.error('[orange native] 未连接本地服务器，无法使用相关 api');
          return;
        }
        return new Promise<any>(async resolve => {
          resolve(await this.proxy.request(data, back));
        })
      }

      public addMessageBack(msgID: number | string, back: Function, thisObj?: any): void {
        if (!this.isReady) {
          console.error('[orange native] 未连接本地服务器，无法使用相关 api');
          return;
        }
        this.proxy.addMessageBack(msgID, back, thisObj);
      }

      public static instance: NativeClient;

      public static async start(url: string = 'ws://localhost:51443') {
        NativeClient.instance = new NativeClient();
        await NativeClient.instance.connect(url);
      }
    }
  }
}