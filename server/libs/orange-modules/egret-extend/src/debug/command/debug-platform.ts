namespace egretExtend {

  /**
   * @internal
   */
  export var debugImage = false;

  /**
   * @internal
   */
  export var egretPlatform = null;

  /**
   * @internal
   */
  export function startDebugImage() {
    // if (!window['wx']) return;
    if (window['wx'] && egret['wxgame']) {
      egretPlatform = egret['wxgame']
      if (!orange.debug) return;
      debugImage = true;
      window['wx'] = new Proxy(window['wx'], {
        get: function (target, key, receiver) {
          var res = Reflect.get(target, key, receiver);
          if (!orange.debug) return res;
          if (key == 'createImage') res = createImage(res);
          return res;
        }
      });
    } else if (egret['web']) {
      egretPlatform = egret['web']
      if (!orange.debug) return;
      debugImage = true;

      var loadImage = egret['web']['WebImageLoader'].prototype.loadImage;
      egret['web']['WebImageLoader'].prototype.loadImage = function (src) {
        var image = createImage(() => new Image())();
        this.data = null;
        this.currentImage = image;
        if (this._hasCrossOriginSet) {
          if (this._crossOrigin) {
            image.crossOrigin = this._crossOrigin;
          }
        }
        else {
          if (egret['web']['WebImageLoader'].crossOrigin) {
            image.crossOrigin = egret['web']['WebImageLoader'].crossOrigin;
          }
        }
        /*else {
            if (image.hasAttribute("crossOrigin")) {//兼容猎豹
                image.removeAttribute("crossOrigin");
            }
        }*/
        image.onload = this.onImageComplete.bind(this);
        image.onerror = this.onLoadError.bind(this);
        image.src = src;
      }

      egret.BitmapData.create = function (type, data, callback) {
        var base64 = "";
        if (type === "arraybuffer") {
          base64 = egret.Base64Util.encode(data);
        }
        else {
          base64 = data;
        }
        var imageType = "image/png"; //default value
        if (base64.charAt(0) === '/') {
          imageType = "image/jpeg";
        }
        else if (base64.charAt(0) === 'R') {
          imageType = "image/gif";
        }
        else if (base64.charAt(0) === 'i') {
          imageType = "image/png";
        }
        var img;
        if(loadComplete) {
          img = createImage(() => new Image())();
        } else {
          img = new Image();
        }
        img.src = "data:" + imageType + ";base64," + base64;
        if(loadComplete) {
          DebugImage.images.get(img).url = loadURL;
        }
        img.crossOrigin = '*';
        var bitmapData = new egret.BitmapData(img);
        img.onload = function () {
          img.onload = undefined;
          bitmapData.source = img;
          bitmapData.height = img.height;
          bitmapData.width = img.width;
          if (callback) {
            callback(bitmapData);
          }
        };
        return bitmapData;
      };
      var loadComplete = false;
      var loadURL = "";
      var RES:any = window["RES"];
      RES.Resource.prototype.getResByUrl = function (url, compFunc, thisObject, type) {
        var _this = this;
        if (type === void 0) { type = ""; }
        var r = RES.config.getResource(url);
        if (!r) {
            if (!type) {
                type = RES.config.__temp__get__type__via__url(url);
            }
            // manager.config.addResourceData({ name: url, url: url });
            r = { name: url, url: url, type: type, root: '', extra: 1 };
            RES.config.addResourceData(r);
            r = RES.config.getResource(url);
            if (!r) {
                throw 'never';
            }
        }
        return RES.queue.pushResItem(r).then(function (value) {
            RES.host.save(r, value);
            if (compFunc && r) {
              loadComplete = true;
              loadURL = r.url;
                compFunc.call(thisObject, value, r.url);
                loadComplete = false;
            }
            return value;
        }, function (error) {
            RES.host.remove(r);
            RES.ResourceEvent.dispatchResourceEvent(_this, RES.ResourceEvent.ITEM_LOAD_ERROR, "", r);
            if (compFunc) {
                compFunc.call(thisObject, null, url);
                return Promise.reject(null);
            }
            return Promise.reject(error);
        });
    };
    }
    startImageDebug();
  }

  /**
   * 
   * @param img 创建微信 image
   */
  function createImage(f): any {
    return function () {
      var img = f();
      return (new DebugImage()).initWithImage(img);
    }
  }
}

