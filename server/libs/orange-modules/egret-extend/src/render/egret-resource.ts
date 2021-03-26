namespace egretExtend {

  /**
   * 获取图集列表
   */
  export function getMergeTextures(): egret.Texture[] {
    let list = [];
    MergeTexture.list.forEach(item => list.push(item.texture));
    return list;
  }

  /**
   * 自动合图功能，在内存中动态合并图片打包成图集
   * @param filter 过滤函数，如果返回 false 则不参与合图
   */
  export function startMergeTexture(filter?: (resource: RES.ResourceInfo) => boolean) {
    function promisify(loader: egret.ImageLoader | egret.HttpRequest | egret.Sound, resource: RES.ResourceInfo): Promise<any> {

      return new Promise((resolve, reject) => {
        let onSuccess = () => {
          let texture = loader['data'] ? loader['data'] : loader['response'];
          resolve(texture);
        }

        let onError = () => {
          let e = new RES.ResourceManagerError(1001, resource.url);
          reject(e);
        }
        loader.addEventListener(egret.Event.COMPLETE, onSuccess, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, this);
      })
    }

    let func = RES.processor.isSupport;
    RES.processor.isSupport = (resource: RES.ResourceInfo) => {
      if (resource.type == 'image') {
        return {
          onLoadStart(host: any, resource) {
            var loader = new egret.ImageLoader();
            loader.load(RES.getVirtualUrl(resource.root + resource.url));
            return promisify(loader, resource)
              .then((bitmapData) => {
                let texture = new egret.Texture();
                texture._setBitmapData(bitmapData);
                let r = host.resourceConfig.getResource(resource.name);
                if (r && r.scale9grid) {
                  var list: Array<string> = r.scale9grid.split(",");
                  texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                }
                if (filter && filter(resource) == false) return texture;
                texture = MergeTexture.merge(texture, resource);
                return texture;
              })
          },

          onRemoveStart(host, resource) {
            let texture = host.get(resource);
            texture.dispose();
          }
        }
      }
      return func.call(RES.processor, resource);
    }
  }

  /**
   * @internal
   */
  export class MergeTexture extends egret.Bitmap {

    private render: egret.RenderTexture;
    private container: egret.Sprite;
    private maxWidth = MergeTexture.MAX_WIDTH;
    private maxHeight = MergeTexture.MAX_HEIGHT;
    private currentWidth = MergeTexture.MAX_WIDTH;
    private currentHeight = MergeTexture.MAX_HEIGHT;
    private spaces: Space[] = [{ x: 0, y: 0, width: this.maxWidth, height: this.maxHeight }];
    private id = MergeTexture.id++;
    private textures = new Map<egret.Texture, Space>();
    private static id = 0;

    constructor() {
      super();
      // egret_stages[0].addChild(this);
      this.x = 1000 + this.id * MergeTexture.MAX_WIDTH;
      this.container = new egret.Sprite();
      this.render = new egret.RenderTexture();
      this.texture = this.render;
    }

    reset() {
      for (let [t, sp] of this.textures) {
        t.$sourceWidth = this.render.bitmapData.width;
        t.$sourceHeight = this.render.bitmapData.height;
        t.$bitmapY = this.render.bitmapData.height - sp.y - t.$bitmapHeight;
      }
    }

    reset2() {
      for (let [t, sp] of this.textures) {
        t.$sourceWidth = this.render.bitmapData.width * 2;
        t.$sourceHeight = this.render.bitmapData.height * 2;
        t.$bitmapY = this.render.bitmapData.height - sp.y - t.$bitmapHeight;
      }
    }

    merge(texture: egret.Texture, resource: RES.ResourceInfo): egret.Texture {
      let w = texture.textureWidth;
      let h = texture.textureHeight;
      let findSpace: Space;
      for (let i = 0, len = this.spaces.length; i < len; i++) {
        let space = this.spaces[i];
        if (w <= space.width && h <= space.height) {
          findSpace = space;
          this.spaces.splice(i, 1);
          this.spaces.splice(i, 0, { x: space.x, y: space.y + h, width: space.width, height: space.height - h },
            { x: space.x + w, y: space.y, width: space.width - w, height: h });
          this.spaces.sort((a, b) => b.x == 0 ? -1 : a.height - b.height);
          break;
        }
      }
      if (!findSpace) return null;
      // if (findSpace.x + w > this.currentWidth) this.currentWidth = w + findSpace.x;
      // if (findSpace.y + h > this.currentHeight) this.currentHeight = h + findSpace.y;
      let bm = new egret.Bitmap(texture);
      this.container.addChild(bm);
      bm.x = findSpace.x;
      bm.y = findSpace.y; //this.currentHeight - findSpace.y;
      // bm.scaleY = -1;
      this.render.drawToTexture(this.container, new egret.Rectangle(0, 0, this.currentWidth, this.currentHeight));
      let txt = new egret.Texture();
      txt._setBitmapData(this.render.bitmapData);
      txt.$sourceWidth = this.render.bitmapData.width;
      txt.$sourceHeight = this.render.bitmapData.height;
      txt.$bitmapX = findSpace.x;
      txt.$bitmapY = this.render.bitmapData.height - findSpace.y - h; //findSpace.y;
      txt.$bitmapWidth = texture.textureWidth;
      txt.$bitmapHeight = texture.textureHeight;
      txt['$textureWidth'] = texture.textureWidth;
      txt['$textureHeight'] = texture.textureHeight;
      txt.$textureId = ~~(Math.random() * 100000000);
      txt.$offsetX = 0;
      txt.$offsetY = 0;
      for (let [t, sp] of this.textures) {
        t.$sourceWidth = this.render.bitmapData.width;
        t.$sourceHeight = this.render.bitmapData.height;
        t.$bitmapY = this.render.bitmapData.height - sp.y - t.$bitmapHeight;
      }
      findSpace['resource'] = resource;
      this.textures.set(txt, findSpace);
      return txt;
    }

    static MAX_WIDTH = 1024;
    static MAX_HEIGHT = 1024;

    static list = new Set<MergeTexture>();

    /**
     * 是否能融合
     * @internal
     * @param texture 
     */
    private static canMergeTexture(texture: egret.Texture): boolean {
      return texture.$bitmapX != 0 || texture.$bitmapY != 0
        || texture.textureWidth != texture.$bitmapData.width || texture.textureHeight != texture.$bitmapData.height
        || texture.textureWidth > 1024 || texture.textureHeight > 1024 ? false : true;
    }

    static merge(texture: egret.Texture, resource: RES.ResourceInfo): egret.Texture {
      if (!MergeTexture.canMergeTexture(texture)) return texture;
      let res;
      let list = MergeTexture.list;
      for (let mt of list) {
        res = mt.merge(texture, resource);
        if (res) return res;
      }
      let mt = new MergeTexture();
      list.add(mt);
      res = mt.merge(texture, resource);
      if (res) return res;
      return texture;
    }
  }

  /**
   * @internal
   */
  interface Space {
    x: number;
    y: number;
    width: number;
    height: number;
  }
}

//if (image["texture"] || (image.source && image.source["texture"]))
//image 是 bitmapData