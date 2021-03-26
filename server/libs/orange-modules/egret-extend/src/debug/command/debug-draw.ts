namespace egretExtend {

  var findDisplayTexture;
  var displaysTexture;
  export function findDisplaysWithTexture(texture) {
    findDisplayTexture = texture;
    displaysTexture = [];
    requestAnimationFrame(() => {
      findDisplayTexture = null;
      window["displaysTexture"] = displaysTexture;
      console.log(`window.displaysTexture:`, displaysTexture);
      displaysTexture = null;
    })
  }

  /**
   * @internal
   */
  export function startDebugDraw() {
    var ctx = egretPlatform.WebGLRenderContext.getInstance();
    var gl = ctx.context;
    var oldDrawElements = gl.drawElements.bind(gl);
    var drawTime = 0;
    var maxDraw = null;
    var maxDrawTime = 0;
    gl.drawElements = function (type, size) {
      drawTriSize += size;
      drawTriCount++;
      var startTime = now();
      oldDrawElements.apply(gl, arguments);
      var gap = now() - startTime;
      drawTime += gap;
      if (gap > maxDrawTime) {
        maxDrawTime = gap;
        maxDraw = { "type": type, "size": size };
      }
    }
    var drawTriCount = 0;
    var drawTriSize = 0;
    var sysRender: any = egret.sys.systemRenderer;
    var $oldRender = sysRender.render;
    var $first = false;
    var $buffer;
    var renderTime = 0;
    var drawWebGLFlag = false;
    var drawGLTime = 0;
    var renderGraphics = 0;
    sysRender.render = function (displayObject, buffer) {
      if (!drawWebGLFlag) {
        drawWebGLFlag = true;
        (() => {
          var $drawWebGL = buffer.context.$drawWebGL;
          buffer.context.$drawWebGL = function () {
            var start = now();
            // $drawWebGL.apply(buffer.context, arguments);
            {
              if (this.drawCmdManager.drawDataLen == 0 || this.contextLost) {
                return;
              }
              this.uploadVerticesArray(this.vao.getVertices());
              // 有mesh，则使用indicesForMesh
              if (this.vao.isMesh()) {
                this.uploadIndicesArray(this.vao.getMeshIndices());
              }
              var length = this.drawCmdManager.drawDataLen;
              var offset = 0;
              var records = showNextDrawInfo ? [] : null;
              var startTime = null;
              for (var i = 0; i < length; i++) {
                if (showNextDrawInfo) startTime = now2()
                var data = this.drawCmdManager.drawData[i];
                // if (data.texture) {
                //   var texInfo = DebugImage.textures.get(data.texture);
                //   if (texInfo.type == TextureType.GRAPHICS) {
                //     renderGraphics++;
                //   }
                // }
                offset = this.drawData(data, offset);
                // 计算draw call
                if (data.type == 7 /* ACT_BUFFER */) {
                  this.activatedBuffer = data.buffer;
                }
                if (data.type == 0 /* TEXTURE */ || data.type == 1 /* RECT */ || data.type == 2 /* PUSH_MASK */ || data.type == 3 /* POP_MASK */) {
                  if (this.activatedBuffer && this.activatedBuffer.$computeDrawCall) {
                    this.activatedBuffer.$drawCalls++;
                  }
                }
                if (showNextDrawInfo) {
                  var info: any = {
                    'time': now2() - startTime,
                    'type': {
                      "0": "drawTexture", "2": "pushMask", "3": "popMask",
                      "4": "setBlend", "5": "resize", "6": "clearColor",
                      "7": "activeBuffer", "8": "EnableScissor", "9": "disableScissor",
                      "10": "smoothing"
                    }[data.type],
                    'textureType': DebugImage.textures.get(data.texture) ? DebugImage.textures.get(data.texture).type : "undefined"
                  };
                  if (info.textureType == TextureType.TEXT) info.text = DebugImage.textures.get(data.texture) ? DebugImage.textures.get(data.texture).text : "unknow";
                  else info.textureURL = DebugImage.textures.get(data.texture) ? DebugImage.textures.get(data.texture).url : "undefined"
                  var more = {
                    'count': data.count,
                    'width': data.width,
                    'height': data.height,
                    'uv': data.uv,
                    'texture': data.texture
                  };
                  for (var k in more) info[k] = more[k];
                  records.push(info);
                }
              }
              if (showNextDrawInfo) {
                var cmds = "";
                var t = 0;
                records.forEach(item => { t += item.time; cmds += item.type + ' '; });
                // records.sort((a, b) => b.time - a.time)
                showNextDrawInfo = false;
                window["renderCmds"] = records;
                console.log("总耗时:" + t, cmds, "\n所有命令 window.renderCmds =", records);
              }
              // 切换回默认indices
              if (this.vao.isMesh()) {
                this.uploadIndicesArray(this.vao.getIndices());
              }
              // 清空数据
              this.drawCmdManager.clear();
              this.vao.clear();
            }
            drawGLTime += now() - start;
          }
        })();
      }
      var start = now();
      $first = true;
      $buffer = buffer;
      $oldRender.apply(sysRender, arguments);
      $first = false;
      renderTime += now() - start;
      if (DebugImage.debugTexImageFlag) {
        DebugImage.debugTexImageFlag = false;
        window['teximages'] = DebugImage.debugTexImage.concat();
        console.log('window.teximages = \n', JSON.stringify(DebugImage.debugTexImage, null, 2));
        DebugImage.debugTexImage.length = 0;
      }
    }
    var $oldDrawDisplayObject = sysRender.drawDisplayObject;
    var lastDrawCmd = null;
    var drawDisplayTime = 0;
    var curDrawDisplayObject;
    var initDrawCmdManager = false;
    var textures
    sysRender.drawDisplayObject = function (displayObject) {
      var sflag;
      var flag = $first;
      $first = false;
      curDrawDisplayObject = displayObject;
      if (!initDrawCmdManager) {
        initDrawCmdManager = true;
        (() => {
          var $pushDrawTexture = $buffer.context.drawCmdManager.pushDrawTexture;
          $buffer.context.drawCmdManager.pushDrawTexture = function (texture) {
            if (findDisplayTexture == texture) {
              displaysTexture.push(curDrawDisplayObject);
            }
            $pushDrawTexture.apply($buffer.context.drawCmdManager, arguments);
          }
        })()
      }
      if (flag) {
        sflag = showGraphics;
        if (sflag) {
          renderGraphicList = new Set();
        }
      }
      $oldDrawDisplayObject.apply(sysRender, arguments);
      if (flag) {
        var start = now();
        lastDrawCmd = $buffer.context.drawCmdManager.drawData;
        drawDisplayTime += now() - start;
        if (sflag) {
          window["graphicsList"] = renderGraphicList;
          console.log('window.graphicsList : ', renderGraphicList);
          renderGraphicList = null;
          showGraphics = false;
        }
      }
      curDrawDisplayObject = null;
    }
    var renderGraphicList;
    var $oldRenderGraphics = sysRender.renderGraphics;
    var renderGraphics2 = 0;
    sysRender.renderGraphics = function (node) {
      var width = node.width;
      var height = node.height;
      if (width <= 0 || height <= 0 || !width || !height || node.drawData.length == 0) {
      } else {
        renderGraphics2++;
        if (showGraphics) {
          renderGraphicList.add(curDrawDisplayObject);
        }
      }
      $oldRenderGraphics.apply(sysRender, arguments);
    }

    // var callLaterTime = 0;
    // var oldCallLaterAsyncs = egret.sys.SystemTicker.prototype["callLaterAsyncs"];
    // egret.sys.SystemTicker.prototype["callLaterAsyncs"] = function () {
    //   var start = now2();
    //   oldCallLaterAsyncs.apply(this, arguments);
    //   callLaterTime += now2() - start;
    // }

    // var enterFrameTime = 0;
    // var oldBroadcastEnterFrame = egret.sys.SystemTicker.prototype["broadcastEnterFrame"];
    // egret.sys.SystemTicker.prototype["broadcastEnterFrame"] = function () {
    //   var start = now2();
    //   oldBroadcastEnterFrame.apply(this, arguments);
    //   enterFrameTime += now2() - start;
    // }

    var lastTexSum = 0;
    var lastTexTimeSum = 0;
    var lastTexImage = 0;
    var lastTexImageTime = 0;
    // var lastCallLaterTime = 0;
    // var lastEnterFrameTime = 0;
    Debug.updateShow((show: (name: string, content: string) => any, frame: number) => {
      // show('callLater', ((~~(lastCallLaterTime * 10 / frame))/10) + 'ms');
      // show('enterFrame', ((~~(lastEnterFrameTime * 10 / frame))/10) + 'ms');
      // show('drawCall', ~~(drawTime / frame) + 'ms');
      show('render', ((~~(renderTime * 10 / frame)) / 10) + 'ms');
      // show('drawDisplay', ~~(drawDisplayTime / frame) + 'ms');
      // show('drawWebGL', ~~(drawGLTime / frame) + 'ms');
      show('drawCall', ~~(drawTriCount / frame) + '');
      show('drawTri', ~~(drawTriSize / (3 * frame)) + '  ' + ~~(drawTriSize / (frame * 6)));
      show('texs', DebugImage.textures.size + '  ' + (~~(DebugImage.getTextureMem() / (1024 * 1024))) + 'MB  ' + (~~(DebugImage.getTextureMoreMem() / (1024 * 1024))) + 'MB');
      show('newTex', ~~(DebugImage.textureSum - lastTexSum) + '  ' + ((~~(DebugImage.textureTimeSum - lastTexTimeSum)) / 10) + 'ms');
      show('texImage', ~~(DebugImage.texImageSum - lastTexImage) + '  ' + ((~~(DebugImage.texImageTimeSum - lastTexImageTime)) / 10) + 'ms');
      show('container', displaySum(egret.Sprite).length + '/' + displaySum().length);
      // show('renderGraphics', ~~(renderGraphics / frame) + '');
      // show('renderGraphics2', ~~(renderGraphics2 / frame) + '');
      // lastCallLaterTime = 0;
      // lastEnterFrameTime = 0;
      renderTime = 0;
      drawGLTime = 0;
      drawDisplayTime = 0;
      drawTime = 0;
      drawTriCount = 0;
      drawTriSize = 0;
      lastTexSum = DebugImage.textureSum;
      lastTexTimeSum = DebugImage.textureTimeSum;
      lastTexImage = DebugImage.texImageSum;
      lastTexImageTime = DebugImage.texImageTimeSum;
      renderGraphics = 0;
      renderGraphics2 = 0;
    });
    var showGraphics = false;
    orange.Command.register('drawinfo.graphics', () => {
      showGraphics = true;
    }, "查看下一帧渲染的所有矢量图节点")
    var showNextDrawInfo = false;
    orange.Command.register('drawinfo.list', () => {
      showNextDrawInfo = true;
    }, "查看下一帧的全部耗时")
    orange.Command.register('drawinfo.teximage', () => {
      DebugImage.debugTexImageFlag = true;
      DebugImage.debugTexImage.length = 0;
    }, "查看下一帧渲染所有的 teximage 相关信息")
  }
}


