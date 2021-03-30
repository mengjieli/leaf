namespace leaf {

  export class Res {

    private static resources: { [index: string]: Resource<any> } = {};
    private static singleTexutres: Resource<any>[] = [];
    private static texts: Resource<any>[] = [];
    private static jsons: Resource<any>[] = [];
    private static spriteSheets: SpriteSheetResource[] = [];
    private static loading = 0;
    private static weakSet = new WeakSet();

    public static getRes<T>(name: string): Resource<T> {
      return this.resources[name];
    }

    public static clearUnsedTextures() {
      let c = 0;
      let list = [];
      for (let txt of this.singleTexutres) {
        if (txt.count !== 0) {
          c++;
          debug && list.push(txt.name);
          continue;
        }
        if (txt.resource) txt.resource.src = '';
        if (txt.data) {
          // PIXI.BaseTexture.removeFromCache(txt.texture_id);
          // PIXI.BaseTexture.removeFromCache(txt.texture_url);
          // PIXI.Texture.removeFromCache(txt.texture_url);
          // PIXI.Texture.removeFromCache(txt.texture_id);
          txt.data.destroy();
        }
        txt.data = null;
        txt.hasLoaded = false;
        txt.isLoading = false;
        debug && console.log(`[Res] 清除无用资源: ${txt.name}`);
      }
      for (let txt of this.spriteSheets) {
        if (txt.count !== 0) {
          c++;
          debug && list.push(txt.name);
          continue;
        }
        if (txt.resource) txt.resource.src = '';
        txt.resource = null;
        for (let frame of txt.list) {
          if (frame.data) {
            frame.data.destroy();
            frame.data = null;
          }
        }
        if (txt.data) {
          // PIXI.BaseTexture.removeFromCache(txt.texture_url);
          // PIXI.BaseTexture.removeFromCache(txt.texture_id);
          // PIXI.Texture.removeFromCache(txt.texture_url);
          // PIXI.Texture.removeFromCache(txt.texture_id);
          GLCore.gl.deleteTexture(txt.data);
        }
        txt.data = null;
        txt.hasLoaded = false;
        txt.isLoading = false;
        debug && console.log(`[Res] 清除无用资源: ${txt.name}`);
      }
      for (let txt of this.texts) {
        if (txt.count !== 0) {
          c++;
          debug && list.push(txt.name);
          continue;
        }
        txt.data = null;
        txt.hasLoaded = false;
        txt.isLoading = false;
        debug && console.log(`[Res] 清除无用资源: ${txt.name}`);
      }
      for (let txt of this.jsons) {
        if (txt.count !== 0) {
          c++;
          debug && list.push(txt.name);
          continue;
        }
        txt.data = null;
        txt.hasLoaded = false;
        txt.isLoading = false;
        debug && console.log(`[Res] 清除无用资源: ${txt.name}`);
      }
      debug && console.log(`[Res] 清除无用资源，还剩 ${c} 个资源: ${list}`);
    }

    public static getAliveResources() {
      let list = [];
      for (let txt of this.singleTexutres) {
        if (txt.hasLoaded) {
          debug && list.push(txt.name);
        }
      }
      for (let txt of this.spriteSheets) {
        if (txt.hasLoaded) {
          debug && list.push(txt.name);
        }
      }
      for (let txt of this.texts) {
        if (txt.hasLoaded) {
          debug && list.push(txt.name);
        }
      }
      for (let txt of this.jsons) {
        if (txt.hasLoaded) {
          debug && list.push(txt.name);
        }
      }
      return list;
    }

    public static addRes(type: EMResourceType, name: string, url: string) {
      if (type === EMResourceType.TEXTURE) {
        let fileName = "texture_" + name;
        let res = this.resources[name] = ecs.ObjectPools.createRecyableObject(Resource) as any;
        this.singleTexutres.push(res);
        res.isLoading = false;
        res.hasLoaded = false;
        res.resource = null;
        (res.count as any) = 0;
        res.name = name;
        res.url = url;
        res.texture_url = url;
        res.texture_id = fileName;
        res.onLoadCompleteCalls = [];
        res.type = EMResourceType.TEXTURE;
        return res;
      }
      if (type === EMResourceType.SPRITE_SHEET) {
        let fileName = "spriteSheet_" + name;
        let res = this.resources[name] = ecs.ObjectPools.createRecyableObject(SpriteSheetResource) as any;
        res.onLoadCompleteCalls = [];
        res.isLoading = false;
        res.hasLoaded = false;
        res.resource = null;
        (res.count as any) = 0;
        res.list = [];
        res.name = name;
        res.url = url;
        this.spriteSheets.push(res);
        res.type = EMResourceType.SPRITE_SHEET;
        res.texture_id = fileName;
        return res;
      }
      if (type === EMResourceType.SPRITE_SHEET_FRAME) {
        let res = this.resources[url] as SpriteSheetResource;
        if (!res) {
          console.error('没有找到对应的 SpriteSheet');
          return;
        }
        let spriteSheetFrame: SpriteSheetFrameResource = ecs.ObjectPools.createRecyableObject(SpriteSheetFrameResource);
        spriteSheetFrame.type = EMResourceType.SPRITE_SHEET_FRAME;
        spriteSheetFrame.onLoadCompleteCalls = [];
        spriteSheetFrame.spriteSheet = res as any;
        spriteSheetFrame.name = name;
        spriteSheetFrame.isLoading = false;
        spriteSheetFrame.hasLoaded = false;
        this.resources[name] = spriteSheetFrame;
        res.list.push(spriteSheetFrame);
        return res;
      }
      if (type === EMResourceType.TEXT) {
        let res = this.resources[name] = ecs.ObjectPools.createRecyableObject(Resource) as any;
        res.isLoading = false;
        res.hasLoaded = false;
        res.resource = null;
        (res.count as any) = 0;
        res.name = name;
        res.url = url;
        res.type = EMResourceType.TEXT;
        this.texts.push(res);
        res.onLoadCompleteCalls = [];
        return res;
      }
      if (type === EMResourceType.JSON) {
        let res = this.resources[name] = ecs.ObjectPools.createRecyableObject(Resource) as any;
        res.isLoading = false;
        res.hasLoaded = false;
        res.resource = null;
        (res.count as any) = 0;
        res.name = name;
        res.url = url;
        res.onLoadCompleteCalls = [];
        res.type = EMResourceType.JSON;
        this.jsons.push(res);
        return res;
      }
    }

    public static loadTexture(name: string, url: string): XPromise<Resource<Texture>> {
      return ecs.ObjectPools.createRecyableObject(XPromise, (resolve => {
        if (!hasStart) startClearResource();
        let res: Resource<Texture> = this.resources[name];
        if (res && res.hasLoaded) {
          resolve(this.resources[name] as any);
          return;
        }
        let fileName = "texture_" + name;
        if (!res) {
          res = this.addRes(EMResourceType.TEXTURE, name, url);
        }

        res.onLoadCompleteCalls.push(resolve as any);
        if (!res.isLoading) {
          res.isLoading = true;
          this.loading++;
          ((ecs.ObjectPools.createRecyableObject(Loader as any)) as Loader).add(fileName, url, {
            loadType: LoaderType.IMAGE
          }).load((loader, resources) => {
            this.loading--;
            let txt = resources[fileName].data;
            debug && this.weakSet.add(txt);
            if (!this.loading) {
              debug && this.weakSet.add(loader.resources);
              loader.resources = {};
            }
            ecs.ObjectPools.releaseRecyableObject(loader as any);
            if (!res.isLoading || res.data) {
              txt.src = '';
              return;
            }
            res.data = new Texture(GLCore.createTexture(txt), txt.width, txt.height, 0, 0, txt.width, txt.height);
            res.resource = txt;
            res.hasLoaded = true;
            debug && this.weakSet.add(res.data);
            debug && console.log(`[Res] 加载资源: ${res.name}，当前资源个数: ${this.getAliveResources().length}，资源列表: ${this.getAliveResources()}`);
            while (res.onLoadCompleteCalls.length) {
              res.onLoadCompleteCalls.pop()(res as any);
            }
          });
        }
      })) as any;
    }

    public static loadJSON(name: string, url: string): XPromise<any> {
      return ecs.ObjectPools.createRecyableObject(XPromise, (resolve => {
        let res = this.resources[name];
        if (!res) {
          res = this.addRes(EMResourceType.JSON, name, url);
        }
        if (res.hasLoaded) {
          resolve(res.data);
          return;
        }
        res.onLoadCompleteCalls.push(resolve);
        if (res.isLoading) return;
        let fileName = name;
        ((ecs.ObjectPools.createRecyableObject(Loader as any)) as Loader)
          .add(fileName, url, {
            loadType: 1,
            xhrType: 'text'
          }).load((loader, resources) => {
            debug && this.weakSet.add(loader.resources);
            res.hasLoaded = true;
            res.isLoading = false;
            res.data = JSON.parse(resources[fileName].data);
            loader.resources = {};
            while (res.onLoadCompleteCalls.length) {
              res.onLoadCompleteCalls.shift()(res);
            }
            debug && this.weakSet.add(res.data);
            debug && console.log(`[Res] 加载资源: ${res.name}，当前资源个数: ${this.getAliveResources().length}，资源列表: ${this.getAliveResources()}`);
          });
      }));
    }

    public static loadText(name: string, url: string): XPromise<any> {
      return ecs.ObjectPools.createRecyableObject(XPromise, (resolve => {
        let res = this.resources[name];
        if (!res) {
          res = this.addRes(EMResourceType.TEXT, name, url);
        }
        if (res.hasLoaded) {
          resolve(res.data);
          return;
        }

        res.onLoadCompleteCalls.push(resolve);
        if (res.isLoading) return;
        let fileName = name;
        ((ecs.ObjectPools.createRecyableObject(Loader as any)) as Loader)
          .add(fileName, url, {
            loadType: 1,
            xhrType: 'text'
          }).load((loader, resources) => {
            res.data = resources[fileName].data;
            res.hasLoaded = true;
            res.isLoading = false;
            debug && this.weakSet.add(loader.resources);
            loader.resources = {};
            debug && this.weakSet.add(res.data);
            debug && console.log(`[Res] 加载资源: ${res.name}，当前资源个数: ${this.getAliveResources().length}，资源列表: ${this.getAliveResources()}`);
            while (res.onLoadCompleteCalls.length) {
              res.onLoadCompleteCalls.shift()(res);
            }
          });
      }));
    }

    public static loadResources(url: string = "default.res.json", resourceRoot: string = "resources/") {
      return ecs.ObjectPools.createRecyableObject(XPromise, (resolve => {
        url = resourceRoot + url;
        let fileName = url.split("/")[url.split("/").length - 1];
        ((ecs.ObjectPools.createRecyableObject(Loader as any)) as Loader)
          .add(fileName, url, {
            loadType: 1,
            xhrType: 'text'
          }).load((loader, resources) => {
            let cfg = JSON.parse(resources[fileName].data);
            loader.resources = {};
            ecs.ObjectPools.releaseRecyableObject(loader as any);
            for (let file of cfg.files) {
              if (file.type === EMResourceType.TEXTURE) {
                Res.addRes(EMResourceType.TEXTURE, file.name, resourceRoot + file.path);
              } else if (file.type === EMResourceType.SPRITE_SHEET) {
                Res.addRes(EMResourceType.SPRITE_SHEET, file.name, resourceRoot + file.path);
                for (let frame of file.frames) {
                  Res.addRes(EMResourceType.SPRITE_SHEET_FRAME, frame, file.name);
                }
              } else if (file.type === EMResourceType.TEXT) {
                Res.addRes(EMResourceType.TEXT, file.name, resourceRoot + file.path);
              } else if (file.type === EMResourceType.JSON) {
                Res.addRes(EMResourceType.JSON, file.name, resourceRoot + file.path);
              }
            }
            resolve();
          });
      }))
    }

    public static loadSpriteSheet(name: string, url: string): XPromise<SpriteSheetResource> {
      return ecs.ObjectPools.createRecyableObject(XPromise, (resolve => {
        if (!hasStart) startClearResource();
        let res: SpriteSheetResource = this.resources[name] as SpriteSheetResource;
        if (res && res.hasLoaded) {
          resolve(res as any);
          return;
        }
        let fileName = "spriteSheet_" + name;
        if (!res) {
          res = this.addRes(EMResourceType.SPRITE_SHEET, name, url);
        }
        let end = url.split("/")[url.split("/").length - 1];

        res.onLoadCompleteCalls.push(resolve as any);
        if (res.isLoading) {
          return;
        }
        res.isLoading = true;
        let jsonName = name + "_json";
        this.loading++;
        ((ecs.ObjectPools.createRecyableObject(Loader as any)) as Loader).add(jsonName, url, {
          loadType: 1,
          xhrType: 'text'
        }).load((loader, resources) => {
          let cfg = JSON.parse(resources[jsonName].data);
          if (!res.texture_url) {
            res.texture_url = url.slice(0, url.length - end.length) + cfg.file;
          }
          debug && this.weakSet.add(loader.resources);
          loader.resources = {};
          ecs.ObjectPools.releaseRecyableObject(loader as any);
          ((ecs.ObjectPools.createRecyableObject(Loader as any)) as Loader).add(fileName, res.texture_url, {
            loadType: 2
          }).load((loader, resources) => {
            debug && this.weakSet.add(loader.resources);
            this.loading--;
            let txt = resources[fileName].data;
            debug && this.weakSet.add(txt);
            if (!this.loading) {
              loader.resources = {};
            }
            ecs.ObjectPools.releaseRecyableObject(loader as any);
            if (!res.isLoading || res.data) {
              txt.src = '';
              return;
            }
            res.resource = txt;
            res.data = GLCore.createTexture(txt);
            for (let k in cfg.frames) {
              let frame = cfg.frames[k];
              let spriteSheetFrame: SpriteSheetFrameResource;
              if (!this.resources[k]) {
                spriteSheetFrame = ecs.ObjectPools.createRecyableObject(SpriteSheetFrameResource);
                spriteSheetFrame.type = EMResourceType.SPRITE_SHEET_FRAME;
                spriteSheetFrame.spriteSheet = res;
                spriteSheetFrame.name = k;
                spriteSheetFrame.isLoading = false;
                spriteSheetFrame.hasLoaded = true;
                this.resources[k] = spriteSheetFrame;
                res.list.push(spriteSheetFrame);
              } else {
                spriteSheetFrame = this.resources[k] as any;
              }
              spriteSheetFrame.data = new Texture(res.data, txt.width, txt.height,
                frame.x + frame.offX,
                frame.y + frame.offY,
                frame.w,
                frame.h);
              debug && this.weakSet.add(spriteSheetFrame.data);
            }
            res.isLoading = false;
            res.hasLoaded = true;
            debug && this.weakSet.add(res.data);
            debug && console.log(`[Res] 加载资源: ${res.name}，当前资源个数: ${this.getAliveResources().length}，资源列表: ${this.getAliveResources()}`);
            while (res.onLoadCompleteCalls.length) {
              res.onLoadCompleteCalls.pop()(res as any);
            }
          })
        })
      })) as any;
    }
  }

  let hasStart = false;
  let clearList = [];
  function startClearResource() {
    if (hasStart) return;
    hasStart = false;
    let f = () => {
      requestAnimationFrame(f);
      while (clearList.length) {
        clearList.pop().src = '';
      }
    }
    requestAnimationFrame(f);
  }

  export enum EMResourceType {
    TEXTURE = 1,
    SPRITE_SHEET = 2,
    SPRITE_SHEET_FRAME = 3,
    TEXT = 4,
    JSON = 5
  }

  export class Resource<T> {

    public type: EMResourceType;
    public name: string;
    public url: string;
    public id: number;
    public data: T;
    public texture_id: string;
    public texture_url: string;
    public readonly count: number = 0;
    public usedCount: number = 0; //使用过的次数
    public hasLoaded: boolean = false;
    public isLoading: boolean = false;
    public onLoadCompleteCalls: ((res: Resource<T>) => any)[];
    public resource: any;

    addCount() {
      (this.count as any)++;
      this.usedCount++;
      if (this.resource) {
        clearList.push(this.resource);
        this.resource = null;
      }
    }

    removeCount() {
      (this.count as any)--;
    }

    load() {
      return ecs.ObjectPools.createRecyableObject<XPromise<Resource<T>>>(XPromise, (resolve, reject) => {
        if (this.type === EMResourceType.TEXTURE) {
          Res.loadTexture(this.name, this.url).then(r => {
            resolve(this);
          }).catch(r => {
            reject(r);
          });
        } else if (this.type === EMResourceType.SPRITE_SHEET_FRAME) {
          Res.loadSpriteSheet((this as any as SpriteSheetFrameResource).spriteSheet.name,
            (this as any as SpriteSheetFrameResource).spriteSheet.url).then(r => {
              resolve(this);
            }).catch(r => {
              reject(r);
            });
        } else if (this.type === EMResourceType.TEXT) {
          Res.loadText(this.name, this.url).then(r => {
            resolve(this);
          }).catch(r => {
            reject(r);
          });
        } else if (this.type === EMResourceType.JSON) {
          Res.loadJSON(this.name, this.url).then(r => {
            resolve(this);
          }).catch(r => {
            reject(r);
          });
        }
      })
    }

  }

  export class SpriteSheetFrameResource extends Resource<Texture> {

    id: number;

    public spriteSheet: SpriteSheetResource;

    addCount() {
      (this.count as any)++;
      this.usedCount++;
      (this.spriteSheet.count as any)++;
      (this.spriteSheet.usedCount)++;
      if (this.spriteSheet.resource) {
        clearList.push(this.spriteSheet.resource);
        this.spriteSheet.resource = null;
      }
    }

    removeCount() {
      (this.count as any)--;
      (this.spriteSheet.count as any)--;
    }

  }

  export class SpriteSheetResource extends Resource<WebGLTexture> {

    public list: SpriteSheetFrameResource[];

  }
}