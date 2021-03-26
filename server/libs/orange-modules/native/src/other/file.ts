
namespace orangeNative {

  export namespace native {

    export class File {

      constructor(url: string = "") {
        this._url = url;
        let name = url.split("/")[url.split("/").length - 1];
        if (name.split(".").length > 1) {
          this._extname = name.slice(name.split(".")[0].length + 1, name.length);
          this._name = name.slice(0, name.length - this._extname.length - 1);
        } else {
          this._extname = "";
          this._name = name;
        }
      }

      private _name: string;

      /**
       * 文件名
       */
      public get name(): string {
        return this._name;
      }

      private _extname: string;

      /**
       * 文件扩展名
       */
      public get extname(): string {
        return this._extname;
      }

      private _url: string;

      public get url(): string {
        return this._url;
      }

      public async exists(): Promise<boolean> {
        return new Promise<boolean>(async resolve => {
          let res = await NativeClient.instance.send({
            "cmd": "FileExists",
            "params": {
              "url": this.url
            }
          });
          resolve(!!res.body.result);
        })
      }

      public delete(): Promise<boolean> {
        return new Promise<boolean>(async resolve => {
          let res = await NativeClient.instance.send({
            "cmd": "FileDelete",
            "params": {
              "url": this.url
            }
          });
          resolve(!!res.body.result);
        })
      }

      public async read(): Promise<string> {
        return new Promise<string>(async resolve => {
          let res = await NativeClient.instance.send({
            "cmd": "FileRead",
            "params": {
              "url": this.url
            }
          });
          resolve(res.body.content);
        })
      }

      public watch(change: (url: string, content: string) => void, timeGap: number = 0.3): () => void {
        NativeClient.instance.send({
          "cmd": "FileWatch",
          "params": {
            "url": this.url
          }
        }, () => {
        });
        NativeClient.instance.proxy.addMessageBack('OnWatch', (data) => {
          change && change(data.body.file, data.body.content);
        })
        return () => {
          change = null;
        }
      }

      public save(content: string): Promise<boolean> {
        return new Promise<boolean>(async resolve => {
          let gap = 10000;
          let length = Math.ceil(content.length / gap);
          for (let i = 0; i < length; i++) {
            await NativeClient.instance.send({
              "cmd": "FileSave",
              "params": {
                "url": this.url,
                "content": content.slice(i * gap, (i + 1) * gap),
                "index": i,
                "length": length
              }
            });
          }
          resolve(true);
        })
      }

      public readFilesWithExtname(end: string = "*"): Promise<File[]> {
        return new Promise<File[]>(async resolve => {
          let res = await NativeClient.instance.send({
            "cmd": "FileReadFilesWithEnd",
            "params": {
              "url": this.url,
              "end": end
            }
          });
          let files: File[] = [];
          res.body.list.forEach(url => {
            files.push(new File(this.url + url));
          });
          resolve(files);
        })
      }
    }
  }
}