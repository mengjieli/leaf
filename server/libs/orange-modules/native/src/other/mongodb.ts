
namespace orangeNative {

  export namespace native {
    export class MongoDB {

      /**
       * @internal
       */
      private _url: string;

      public get url(): string {
        return this._url;
      }

      /**
       * @internal
       */
      private _hasConnect = false;

      public get hasConnect(): boolean {
        return this._hasConnect;
      }

      connect(url: string): Promise<boolean> {
        this._url = url;
        return new Promise<boolean>(async resolve => {
          let res = await NativeClient.instance.send({
            "cmd": "DBConnect",
            "params": {
              "url": this.url
            }
          });
          resolve(!!res.body.result);
        })
      }

      insertOne(db: string, collection: string, data: any): Promise<any> {
        return new Promise<boolean>(async resolve => {
          let res = await NativeClient.instance.send({
            "cmd": "DBInsertOne",
            "params": {
              "url": this.url,
              "db": db,
              "collection": collection,
              "data": data
            }
          });
          res.body.result = JSON.parse(res.body.result);
          resolve(res.body.result);
        })
      }

      updateOne(db: string, collection: string, find: any, data: any): Promise<any> {
        return new Promise<boolean>(async resolve => {
          let res = await NativeClient.instance.send({
            "cmd": "DBUpdateOne",
            "params": {
              "url": this.url,
              "db": db,
              "collection": collection,
              "find": find,
              "data": data
            }
          });
          res.body.result = JSON.parse(res.body.result);
          resolve(res.body.result);
        })
      }

      findOne(db: string, collection: string, find: any): Promise<any> {
        return new Promise<boolean>(async resolve => {
          let res = await NativeClient.instance.send({
            "cmd": "DBFindOne",
            "params": {
              "url": this.url,
              "db": db,
              "collection": collection,
              "find": find
            }
          });
          res.body.result = JSON.parse(res.body.result);
          if (!res.body.result) res.body.result = [];
          if (!(res.body.result instanceof Array)) res.body.result = [res.body.result];
          resolve(res.body.result);
        })
      }
    }
  }
}