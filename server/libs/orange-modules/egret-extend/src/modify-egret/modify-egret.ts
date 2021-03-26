namespace egretExtend {

  /**
   * 1. 修复 egret 创建 texture 时未销毁微信 img 的问题
   * 2. 修复 egret 销毁 BimapData 时未销毁微信 img 的问题(如果未创建对应的贴图就会出现)
   */
  var $m_egret_01 = setInterval(() => {
    try {
      var egretPlatform = window["wx"] && window["wx"]["getPerformance"] ? egret['wxgame'] : egret['web'];
      var f = egretPlatform.WebGLRenderContext.getInstance().getWebGLTexture.bind(egretPlatform.WebGLRenderContext.getInstance());
      egretPlatform.WebGLRenderContext.getInstance().getWebGLTexture = function (bitmapData) {
        startCreateTexture(bitmapData)
        var source = bitmapData.source;
        var texture = f.apply(null, arguments);
        finishCreateTexture(bitmapData);
        if (source) {
          if (!source.dispose) {
            source.dispose = () => {
              if (source.remove) source.remove();
              else if (source.destroy) source.destroy();
              else source.src = "";
            }
          }
          source.dispose && source.dispose();
        }
        return texture;
      };
      clearInterval($m_egret_01);
    } catch (e) {
    }
  }, 0)

}