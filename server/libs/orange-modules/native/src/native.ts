namespace orangeNative {

  export namespace native {

    //启动
    orange.addStartBack(async (params) => {
      let native = params.native;
      if (!native) return;
      let server = `ws://${native.ip || 'localhost'}:${native.port || 51443}`
      //启动客户端连接 orange server
      await NativeClient.start(server);
      if (native.autoCompile) Compiler.autoCompile();
    });

    export function isReady(): boolean {
      return NativeClient.instance && NativeClient.instance.isReady;
    }
  }
}

window["orange"]["native"] = orangeNative.native;