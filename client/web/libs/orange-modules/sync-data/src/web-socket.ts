namespace syncData {

  /**
   * 链接服务器
   * @param url 地址
   * @param params 参数，参考 orange.sync.ConnectParams
   * @returns {Promise<Proxy>}
   */
  export async function connect(url: string, params?: ConnectParams): Promise<Proxy> {
    return new Promise<Proxy>((resolve, reject) => {
      let socket = new orange.WebSocketClient();
      socket.connect(url).then(connection => {
        connection.protocol = new Protocol();
        var proxy = connection.proxy = new Proxy();
        if (params) {
          params.connectTimeout != null && (connection.connectTimeout = params.connectTimeout);
          params.hertTimeout != null && (connection.hertTimeout = params.hertTimeout);
          params.hertTimeinterval != null && (connection.hertTimeinterval = params.hertTimeinterval);
          params.closeHandler != null && orange.on(connection, orange.Event.CLOSE, (e: orange.Event) => {
            params.closeHandler(e.data);
          });
          params.compressed != null && ((connection.protocol as Protocol).compressed = params.compressed);
          params.debug != null && (proxy.debug = params.debug);
          params.commandTimeout != null && (proxy.commandTimeout = params.commandTimeout);
          params.reconnectInterval != null && (proxy.reconnectInterval = params.reconnectInterval);
          params.root != null && (proxy.root = params.root);
          params.syncAllCommand != null && (proxy.syncAllCommand = params.syncAllCommand);
        }
        resolve();
      }).catch(e => reject(e));
    })
  }

  /**
   * 链接服务器的参数
   */
  export interface ConnectParams {

    /**
     * 链接关闭的回调函数
     */
    closeHandler?: (r: orange.ConnectionCloseReason) => void;
    /**
     * 压缩格式，默认不压缩
     * @default null
     */
    compressed?: 'gzip';
    /**
     * 调试模式
     * @default false
     */
    debug?: boolean;
    /**
     * 数据同步的根节点
     */
    root?: any;
    /**
     * 是否同步所有的消息
     * @default false
     */
    syncAllCommand?: boolean;
    /**
     * 链接服务器超时时间(单位秒)
     * @default 10
     */
    connectTimeout?: number;
    /**
     * 客户端验证心跳爆超时时间(单位秒)
     * @default 10
     */
    hertTimeout?: number;
    /**
     * 心跳包时间(单位秒)
     * @default 5
     */
    hertTimeinterval?: number;
    /**
     * 指令超时时间(秒)
     * @default 7
     */
    commandTimeout?: number;
    /**
     * 重连间隙(秒)
     * @default 1
     */
    reconnectInterval?: number;
  }
}