namespace egretExtend {

  export class DebugImage {

    constructor() {
      DebugImage.list.push(this);
    }

    /**
     * 微信 img
     */
    public image: any;

    /**
     * 加载地址
     */
    public url: string;

    public width: number;

    public height: number;

    public hasDispose = false;

    /**
     * webgl 纹理
     */
    public texture: any;

    public bitmapData: any;

    toJSON() {
      return {
        image: this.image,
        url: this.url,
        width: this.width,
        height: this.height,
        texture: this.texture,
        bitmapData: this.bitmapData
      }
    }

    initWithImage(image: any): any {
      DebugImage.imageSum++;
      DebugImage.images.set(image, this);
      this.image = image;
      var d = setInterval(() => {
        if (!this.url || !this.width || !this.hasDispose) {
          if (!this.url && image.src) {
            this.url = image.src;
            // console.log('image src:', this.url);
          }
          if (!this.width && image.width) {
            this.width = image.width;
            this.height = image.height;
            // console.log('image size:', this.url, this.width, this.height);
          }
          // 无用，因为微信中 image.src 只要赋值，获取出来就不会被再是 ""
          // if (this.url && (image.src == null || image.src == "")) {
          //   clearInterval(d);
          //   this.hasDispose = true;
          //   console.log('销毁 image:', this.url, this.width, this.height);
          // }
        }
      }, 10);
      var callDispose = false;
      var df = image.dispose = () => {
        if (!this.hasDispose) {
          clearInterval(d);
          this.disposeImage();
        }
        if (!callDispose) {
          callDispose = true;
          if (image.remove) image.remove();
          else if (image.destroy) image.destroy();
          else image.src = "";
        }
      }
      setTimeout(() => {
        if (image.dispose != df) image.dispose = df;
      }, 0);
      if (image.remove) {
        var f = image.remove;
        image.remove = () => {
          if (!this.hasDispose) {
            clearInterval(d);
            this.disposeImage();
          }
          f.call(image);
        }
      }
      if (image.destroy) {
        var f = image.destroy;
        image.destroy = () => {
          if (!this.hasDispose) {
            clearInterval(d);
            this.disposeImage();
          }
          f.call(image);
        }
      }
      return image;
      //拦截器在微信上有 bug : egret-extend.js? [sm]:649 Uncaught (in promise) TypeError: Illegal invocation
      // 只要加了 Proxy 就不行了
      // return new Proxy(image, {
      //   set: function (target, key, value, receiver) {
      //     if (key == 'src') {
      //       this.url = value;
      //       console.log('image src:', value);
      //     }
      //     if (key == 'onload') {
      //       console.log('onload:', value);
      //     }
      //     return Reflect.set(target, key, value, receiver);
      //   }
      // });
    }

    disposeImage() {
      DebugImage.images.delete(this.image);
      this.hasDispose = true;
      this.image = null;
      // console.log('销毁 image:', this.url, this.width, this.height);
    }

    /**
     * @internal
     */
    static list = [];
    /**
        * @internal
        */
    static images = new Map<any, DebugImage>();
    /**
     * @internal
     */
    static bitmapdatas = new Map<any, DebugImage>();
    /**
        * @internal
        */
    static textures = new Map<any, TextureInfo>();

    static getTextureMem() {
      var mem = 0;
      DebugImage.textures.forEach(item => mem += memSize(item.width, item.height) * 4)
      return mem;
    }

    static getTextureMoreMem() {
      var mem = 0;
      var mem2 = 0;
      DebugImage.textures.forEach(item => mem += memSize(item.width, item.height) * 4)
      DebugImage.textures.forEach(item => mem2 += item.width * item.height * 4)
      return mem - mem2;
    }
    /**
        * @internal
        */
    static imageSum = 0;
    /**
    * @internal
    * 创建的纹理累计
    */
    static textureSum = 0;
    /**
     * @internal
     * 创建纹理耗时
     */
    static textureTimeSum = 0;
    /**
    * @internal
    */
    static imageTextureSum = 0;

    static texImageSum = 0;
    /**
     * @internal
     */
    static texImageTimeSum = 0;
    /**
     * @internal
     */
    static debugTexImageFlag = false;
    /**
     * @internal
     */
    static debugTexImage = [];
  }

  class TextureInfo {
    type: TextureType; //img,txt,graphics
    url: string;
    width: number = 0;
    height: number = 0;
    update: number = 0;
    text: string = "";

    constructor(type: TextureType, url: string = '') {
      this.type = type;
      this.url = url;
    }

    toJSON() {
      return {
        type: this.type,
        url: this.url,
        width: this.width,
        height: this.height,
        update: this.update
      }
    }
  }

  /**
   * @internal
   */
  export enum TextureType {
    IMG = 'img',
    TEXT = 'text',
    GRAPHICS = 'graphics',
    GROUP = 'group',
    MESH = 'mesh_node',
    NORMAL_IMG = 'normal_img',
    RENDER_TARGET = 'render_target',
    UNKNOW = 'unknow'
  }

  orange.Command.register('meminfo', (filter?: (url) => boolean) => {
    var images = new Map();
    var textures = new Map();
    DebugImage.images.forEach((v, k) => (filter ? filter(v.url) : true) && images.set(k, v.toJSON()))
    DebugImage.textures.forEach((v, k) => (filter ? filter(v.url) : true) && textures.set(k, v.toJSON()))
    var info = getMemInfo(images, textures);
    info.list.splice(0, 0, ['index', 'wx.img', 'imgW', 'imgH', 'tex-type', 'tex', 'texW', 'texH', 'update', 'mem(MB)', 'moreMem(MB)', 'url']);
    console.log(orange.StringUtil.tableToString(info.list));
    console.log(`img个数:${info.imgsum} img像素:${info.imgsize} tex个数:${info.texsum} tex像素:${info.texsize} mem(MB):${info.mem} moreMem(MB):${info.moreMem}`);
  }, '打印内存信息 参考 http://wiki.hortorgames.com/orange/innter-command/内置命令');

  var $meminfoRecord = null;

  orange.Command.register('meminfo.record', () => {
    var info = {
      "images": new Map(),
      "textures": new Map()
    }
    DebugImage.images.forEach((v, k) => info.images.set(k, v.toJSON()))
    DebugImage.textures.forEach((v, k) => info.textures.set(k, v.toJSON()))
    $meminfoRecord = info;
  })

  orange.Command.register('meminfo.diff', (filter?: (url) => boolean) => {
    var oldInfo = $meminfoRecord;
    var lessImages = new Map();
    var moreImages = new Map();
    var lessTextures = new Map();
    var moreTextures = new Map();
    oldInfo.images.forEach((v, k) => (filter ? filter(v.url) : true) && !DebugImage.images.has(k) && lessImages.set(k, v))
    DebugImage.images.forEach((v, k) => (filter ? filter(v.url) : true) && !oldInfo.images.has(k) && moreImages.set(k, v))
    oldInfo.textures.forEach((v, k) => (filter ? filter(v.url) : true) && !DebugImage.textures.has(k) && lessTextures.set(k, v))
    DebugImage.textures.forEach((v, k) => (filter ? filter(v.url) : true) && !oldInfo.textures.has(k) && moreTextures.set(k, v))
    var lessInfo = getMemInfo(lessImages, lessTextures, oldInfo.textures);
    console.log('减少的内存为:')
    lessInfo.list.splice(0, 0, ['index', 'wx.img', 'imgW', 'imgH', 'tex-type', 'tex', 'texW', 'texH', 'update', 'mem(MB)', 'moreMem(MB)', 'url']);
    console.log(orange.StringUtil.tableToString(lessInfo.list));
    console.log(`img个数:${lessInfo.imgsum} img像素:${lessInfo.imgsize} tex个数:${lessInfo.texsum} tex像素:${lessInfo.texsize} mem(MB):${lessInfo.mem} moreMem(MB):${lessInfo.mem}`);
    var moresInfo = getMemInfo(moreImages, moreTextures, DebugImage.textures);
    console.log(' ')
    console.log('增加的内存为:')
    moresInfo.list.splice(0, 0, ['index', 'wx.img', 'imgW', 'imgH', 'tex-type', 'tex', 'texW', 'texH', 'update', 'mem(MB)', 'moreMem(MB)', 'url']);
    console.log(orange.StringUtil.tableToString(moresInfo.list));
    console.log(`img个数:${moresInfo.imgsum} img像素:${moresInfo.imgsize} tex个数:${moresInfo.texsum} tex像素:${moresInfo.texsize} mem(MB):${moresInfo.mem} moreMem(MB):${moresInfo.mem}`);
    console.log(' ')
    console.log(`合计 img个数:${moresInfo.imgsum - lessInfo.imgsum} img像素:${moresInfo.imgsize -
      lessInfo.imgsize} tex个数:${moresInfo.texsum - lessInfo.texsum} tex像素:${moresInfo.texsize -
      lessInfo.texsize}  mem(MB):${moresInfo.mem - lessInfo.mem} moreMem(MB):${moresInfo.moreMem - lessInfo.moreMem}`);
    //先找 oldList 有，而

    // console.log(orange.StringUtil.tableToString(info.list));
    // console.log(`[meminfo.record] img个数:${info.imgsum} img像素:${info.imgsize} tex个数:${info.texsum} tex像素:${info.texsize}`);
  });

  /**
   * @internal
   */
  export var startImageDebug = () => {
    var oldDrawImage = egretPlatform.WebGLRenderContext.prototype.drawImage;
    egretPlatform.WebGLRenderContext.prototype.drawImage = function (bitmapData) {
      if (bitmapData.source && !DebugImage.bitmapdatas.has[bitmapData]) {
        DebugImage.list.forEach(item => {
          if (item.image == bitmapData.source) {
            item.bitmapData = bitmapData;
            DebugImage.bitmapdatas.set(bitmapData, item);
            // console.log('找到 image bitmapData', bitmapData, item)
          }
        })
      }
      oldDrawImage.apply(this, arguments);
    }

    var lastCreateTexture;
    var oldCreateTexture = egretPlatform.WebGLRenderContext.getInstance().context.createTexture.bind(egretPlatform.WebGLRenderContext.getInstance().context);
    egretPlatform.WebGLRenderContext.getInstance().context.createTexture = () => {
      var time = now();
      var tex = oldCreateTexture.call(null)
      // console.log('[orange tip] 创建纹理', tex)
      var info = new TextureInfo($curRenderType);
      if ($curRenderType == TextureType.RENDER_TARGET) {
        info.width = $curRenderWidth;
        info.height = $curRenderHeight;
      }
      if (!DebugImage.textures.has(tex)) {
        DebugImage.textures.set(tex, info);
      }
      $curDebugImageTexture = tex;
      lastCreateTexture = tex;
      DebugImage.textureSum++;
      DebugImage.textureTimeSum += now() - time;
      return tex;
    }

    var oldCreateTexture2 = egretPlatform.WebGLRenderContext.prototype.createTexture;
    egretPlatform.WebGLRenderContext.prototype.createTexture = function (bitmapData) {
      lastCreateTexture = null;
      var tex = oldCreateTexture2.call(this, bitmapData)
      if (lastCreateTexture == tex) {
        if (bitmapData) DebugImage.textures.get(tex).width = bitmapData.width;
        if (bitmapData) DebugImage.textures.get(tex).height = bitmapData.height;
      }
      return tex;
    }

    var oldDeleteTexture = egretPlatform.WebGLRenderContext.getInstance().context.deleteTexture.bind(egretPlatform.WebGLRenderContext.getInstance().context);
    egretPlatform.WebGLRenderContext.getInstance().context.deleteTexture = (tex) => {
      // console.log('orange 删除纹理', tex)
      DebugImage.textures.delete(tex);
      oldDeleteTexture.call(null, tex)
    }

    var bindTexture = null;
    var oldBindTexture = egretPlatform.WebGLRenderContext.getInstance().context.bindTexture.bind(egretPlatform.WebGLRenderContext.getInstance().context);
    egretPlatform.WebGLRenderContext.getInstance().context.bindTexture = (type, tex) => {
      bindTexture = tex;
      oldBindTexture.call(null, type, tex);
    }

    var oldTexImage2D = egretPlatform.WebGLRenderContext.getInstance().context.texImage2D.bind(egretPlatform.WebGLRenderContext.getInstance().context);
    egretPlatform.WebGLRenderContext.getInstance().context.texImage2D = function () {
      // bindTexture = tex;
      var time = now();
      if (bindTexture) {
        if (arguments.length == 6 && arguments[5].width) {
          if (DebugImage.textures.get(bindTexture)) {
            DebugImage.textures.get(bindTexture).width = arguments[5].width;
            DebugImage.textures.get(bindTexture).height = arguments[5].height;
          }
        }
        if (DebugImage.textures.get(bindTexture)) {
          DebugImage.textures.get(bindTexture).update++;
        }
        if (inRenderText) {
          DebugImage.textures.get(bindTexture).text = renderTextContent;
        }
        if (DebugImage.debugTexImageFlag) {
          var info = DebugImage.textures.get(bindTexture);
          DebugImage.debugTexImage.push({
            type: info.type,
            url: info.url,
            text: info.text,
            update: info.update,
            width: info.width,
            height: info.height,
            texture:bindTexture
          });
        }
      }
      oldTexImage2D.apply(null, arguments);
      DebugImage.texImageSum++;
      DebugImage.texImageTimeSum += now() - time;
    }

    var inRenderText = false;
    var renderTextContent = '';
    var oldRenderText = egretPlatform.WebGLRenderer.prototype.renderText;
    egretPlatform.WebGLRenderer.prototype.renderText = function (node, buffer) {
      $curRenderType = TextureType.TEXT;
      inRenderText = true;
      renderTextContent = node.drawData[2];
      oldRenderText.call(this, node, buffer);
      inRenderText = false;
    }
    var oldRenderGraphics = egretPlatform.WebGLRenderer.prototype.renderGraphics;
    egretPlatform.WebGLRenderer.prototype.renderGraphics = function (node, buffer) {
      $curRenderType = TextureType.GRAPHICS;
      oldRenderGraphics.call(this, node, buffer)
    }
    var oldRenderMesh = egretPlatform.WebGLRenderer.prototype.renderMesh;
    egretPlatform.WebGLRenderer.prototype.renderMesh = function (node, buffer) {
      $curRenderType = TextureType.MESH;
      oldRenderMesh.call(this, node, buffer)
    }
    var oldRenderNormalBitmap = egretPlatform.WebGLRenderer.prototype.renderNormalBitmap;
    egretPlatform.WebGLRenderer.prototype.renderNormalBitmap = function () {
      $curRenderType = TextureType.IMG;
      var tex = oldRenderNormalBitmap.apply(this, arguments);
      return tex;
    };
    var oldCreateTextureRT = egretPlatform.WebGLRenderTarget.prototype.createTexture;
    egretPlatform.WebGLRenderTarget.prototype.createTexture = function () {
      $curRenderType = TextureType.RENDER_TARGET;
      $curRenderWidth = this.width;
      $curRenderHeight = this.height;
      var tex = oldCreateTextureRT.call(this);
      return tex;
    };
  }

  function getMemInfo(sourceImages, sourceTextures, allTextures = null) {
    var list: any = [];
    var images = new Set();
    var textures = new Set();
    sourceImages.forEach(dimg => {
      var tex = (allTextures || sourceTextures).get(dimg.texture);
      list.push([
        dimg.image ? '1' : '0',
        dimg.width,
        dimg.height,
        dimg.texture ? tex.type : '',
        dimg.texture ? '1' : '0',
        dimg.texture ? tex.width : '',
        dimg.texture ? tex.height : '',
        dimg.texture ? tex.update : '',
        memSize(dimg.image && dimg.width ? dimg.width : 0, dimg.image && dimg.width ? dimg.height : 0) * 4 / (1024 * 1024),
        memSize(dimg.image && dimg.width ? dimg.width : 0, dimg.image && dimg.width ? dimg.height : 0) * 4 / (1024 * 1024) -
        sourceMemSize(dimg.image && dimg.width ? dimg.width : 0, dimg.image && dimg.width ? dimg.height : 0) * 4 / (1024 * 1024),
        dimg.url]);
      images.add(dimg.image);
      textures.add(dimg.texture);
    });
    sourceTextures.forEach((texInfo, texture) => {
      if (!textures.has(texture)) {
        list.push([
          '0',
          texInfo.width,
          texInfo.height,
          texInfo.type,
          '1',
          texInfo.width,
          texInfo.height,
          texInfo.update,
          memSize(texInfo.width ? texInfo.width : 0, texInfo.height ? texInfo.height : 0) * 4 / (1024 * 1024),
          memSize(texInfo.width ? texInfo.width : 0, texInfo.height ? texInfo.height : 0) * 4 / (1024 * 1024) -
          sourceMemSize(texInfo.width ? texInfo.width : 0, texInfo.height ? texInfo.height : 0) * 4 / (1024 * 1024),
          texInfo.url]);
      }
    })
    list.forEach((item, index) => item.splice(0, 0, index));
    list.sort((a, b) => a[4].length - b[4].length);
    list.forEach((item, index) => item[0] = index);
    var imgsum = 0;
    var imgsize = 0;
    var texsum = 0;
    var texsize = 0;
    var mem = 0;
    var moreMem = 0;
    //['index', 'wx.img', 'imgW', 'imgH', 'tex-type', 'tex', 'texW', 'texH', 'url']
    for (let i = 0; i < list.length; i++) {
      if (list[i][1] == '1') {
        imgsum++;
        list[i][2] && (imgsize += list[i][2] * list[i][3]);
      }
      if (list[i][5] == '1') {
        texsum++;
        list[i][6] && (texsize += list[i][6] * list[i][7]);
      }
      list[i][9] = ~~(list[i][9] * 1000) / 1000;
      list[i][10] = ~~(list[i][10] * 1000) / 1000;
      mem += list[i][9];
      moreMem += list[i][10];
      if (!list[i][11]) list[i][11] = '';
    }
    return {
      imgsum: imgsum,
      imgsize: imgsize,
      texsum: texsum,
      texsize: texsize,
      mem: ~~(mem * 100) / 100,
      moreMem: ~~(moreMem * 100) / 100,
      list: list
    }
  }

  function memSize(width: number, height: number): number {
    var size = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 9182];
    for (var i = 0; i < size.length; i++) {
      if (width <= size[i]) {
        width = size[i];
        break;
      }
    }
    for (var i = 0; i < size.length; i++) {
      if (height <= size[i]) {
        height = size[i];
        break;
      }
    }
    return width * height;
  }

  function sourceMemSize(width: number, height: number): number {
    return width * height;
  }

  var $curRenderType: TextureType = TextureType.UNKNOW;
  var $curRenderWidth;
  var $curRenderHeight;
  var $curDebugImageTexture = null;

  /**
   * @internal
   * @param bitmapData 
   */
  export var startCreateTexture = (bitmapData) => {
    // console.log('创建 texture', bitmapData)
    if (!debugImage) return;
    $curDebugImageTexture = null;
  }

  /**
   * @internal
   * @param bitmapData 
   */
  export var finishCreateTexture = (bitmapData) => {
    // console.log('创建完成 texture', bitmapData)
    if (!debugImage) return;
    var dimage = DebugImage.bitmapdatas.get(bitmapData);
    if (dimage && !dimage.texture) {
      dimage.texture = bitmapData.webGLTexture;
      var info = DebugImage.textures.get(dimage.texture);
      info.url = dimage.url;
      info.type = TextureType.IMG;
      DebugImage.imageTextureSum++;
    }
    if (dimage && $curDebugImageTexture && $curDebugImageTexture != dimage.texture) {
      console.warn('[orange debug] 没有找到纹理对应的创建者')
    }
    $curDebugImageTexture = null;
  }
}