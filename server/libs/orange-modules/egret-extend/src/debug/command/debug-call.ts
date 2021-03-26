namespace egretExtend {

  var $debug = false;
  /**
   * @internal
   */
  export var callInfo = {
    timeSum: 0,
    callLater: 0,
    enterFrame: 0,
    tick: 0,
    tween: 0
  }

  function getStack() {
    try {
      var a;
      a.b++;
    } catch (e) {
      return e.stack + '';
    }
  }

  /**
   * @internal
   */
  export function startDebugCall() {
    $debug = true;
    Debug.updateShow((show: (name: string, content: string) => any, frame: number) => {
      show('call', ((~~(callInfo.timeSum * 10 / frame)) / 10) + 'ms');
      show('enterFrame', ((~~(callInfo.enterFrame * 10 / frame)) / 10) + 'ms');
      show('callLater', ((~~(callInfo.callLater * 10 / frame)) / 10) + 'ms');
      show('tick', ((~~(callInfo.tick * 10 / frame)) / 10) + 'ms');
      show('tween', ~~(callInfo.tween / frame) + '');
      callInfo.timeSum = 0;
      callInfo.enterFrame = 0;
      callInfo.callLater = 0;
      callInfo.tick = 0;
      callInfo.tween = 0;
    });



    (() => {
      var $setInterval = window.setInterval;
      window.setInterval = function (call: any, timeGap) {
        var stack = getStack();
        var r = $setInterval(() => {
          if ($debug) {
            var s = now();
            var startTime;
            var sflag = showNextCallInfo;
            if (sflag) startTime = now2();
            call();
            if (sflag) calls.push({ time: now2() - startTime, stack: stack });
            callInfo.timeSum += now() - s;
          } else {
            var startTime;
            var sflag = showNextCallInfo;
            if (sflag) startTime = now2();
            call();
            if (sflag) calls.push({ time: now2() - startTime, stack: stack });
          }
        }, timeGap);
        return r;
      }
      var $setTimeout = window.setTimeout;
      window.setTimeout = function (call: any, timeGap) {
        var stack = getStack();
        var r = $setTimeout(() => {
          if ($debug) {
            var s = now();
            var startTime;
            var sflag = showNextCallInfo;
            if (sflag) startTime = now2();
            call();
            if (sflag) calls.push({ time: now2() - startTime, stack: stack });
            callInfo.timeSum += now() - s;
          } else {
            var startTime;
            var sflag = showNextCallInfo;
            if (sflag) startTime = now2();
            call();
            if (sflag) calls.push({ time: now2() - startTime, stack: stack });
          }
        }, timeGap);
        return r;
      }
      var $requestAnimationFrame = window.requestAnimationFrame;
      var calls = [];
      window.requestAnimationFrame = (call: any) => {
        var stack = getStack();
        var r = $requestAnimationFrame(() => {
          if ($debug) {
            var s = now();
            if (showNextCallInfo == 1) {
              showNextCallInfo--;
              var all = 0;
              calls.forEach(item => all += item.time);
              calls.sort((a, b) => b.time - a.time);
              // for (var i = 0; i < 3 && i < calls.length; i++) {
              //   console.log(calls[i].time + 'ms', 'allTime:', all + 'ms', '\n', calls[i].stack);
              // }
            }
            var startTime;
            if (showNextCallInfo == 2) {
              startTime = now2();
            }
            call();
            if (showNextCallInfo == 2) {
              calls.push({ time: now2() - startTime, stack: stack });
              showNextCallInfo--;
            }
            callInfo.timeSum += now() - s;
          } else {
            if (showNextCallInfo == 1) {
              showNextCallInfo--;
              var all = 0;
              calls.forEach(item => all += item.time);
              calls.sort((a, b) => b.time - a.time);
              for (var i = 0; i < 3 && i < calls.length; i++) {
                console.log(calls[i].time + 'ms', 'allTime:', all + 'ms', '\n', calls[i].stack);
              }
            }
            var startTime;
            if (showNextCallInfo == 2) {
              startTime = now2();
            }
            call();
            if (showNextCallInfo == 2) {
              calls.push({ time: now2() - startTime, stack: stack });
              showNextCallInfo--;
            }
          }
        });
        return r;
      };

      var showNextCallInfo = 0;
      orange.Command.register('callinfo.list', () => {
        calls = [];
        showNextCallInfo = 2;
      }, "查看下一帧排名前三的 call")

      var tweenTick = egret.Tween.prototype.$tick;
      egret.Tween.prototype.$tick = function () {
        callInfo.tween++;
        tweenTick.apply(this, arguments);
      }


      egret.sys.SystemTicker.prototype.update = function () {
        var lastTime;
        var t1 = egret.getTimer();
        var callBackList = this.callBackList;
        var thisObjectList = this.thisObjectList;
        var length = callBackList.length;
        var requestRenderingFlag = egret.sys.$requestRenderingFlag;
        var timeStamp = egret.getTimer();
        var contexts = egret.lifecycle.contexts;
        for (var _i = 0, contexts_1 = contexts; _i < contexts_1.length; _i++) {
          var c = contexts_1[_i];
          if (c.onUpdate) {
            c.onUpdate();
          }
        }
        if (this.isPaused) {
          this.lastTimeStamp = timeStamp;
          return;
        }
        if (orange.debug) {
          lastTime = now2();
          this.callLaterAsyncs();
          var time = now2();
          callInfo.callLater += time - lastTime;
          lastTime = time;
        } else {
          this.callLaterAsyncs();
        }
        if (orange.debug) {
          lastTime = now2();
          for (var i = 0; i < length; i++) {
            if (callBackList[i].call(thisObjectList[i], timeStamp)) {
              requestRenderingFlag = true;
            }
          }
          var time = now2();
          callInfo.tick += time - lastTime;
          lastTime = time;
        } else {
          for (var i = 0; i < length; i++) {
            if (callBackList[i].call(thisObjectList[i], timeStamp)) {
              requestRenderingFlag = true;
            }
          }
        }
        var t2 = egret.getTimer();
        var deltaTime = timeStamp - this.lastTimeStamp;
        this.lastTimeStamp = timeStamp;
        if (deltaTime >= this.frameDeltaTime) {
          this.lastCount = this.frameInterval;
        }
        else {
          this.lastCount -= 1000;
          if (this.lastCount > 0) {
            if (requestRenderingFlag) {
              this.render(false, this.costEnterFrame + t2 - t1);
            }
            return;
          }
          this.lastCount += this.frameInterval;
        }
        this.render(true, this.costEnterFrame + t2 - t1);
        var t3 = egret.getTimer();
        if (orange.debug) {
          lastTime = now2();
          this.broadcastEnterFrame();
          var time = now2();
          callInfo.enterFrame += time - lastTime;
          lastTime = time;
        } else {
          this.broadcastEnterFrame();
        }
        var t4 = egret.getTimer();
        this.costEnterFrame = t4 - t3;
      };
    })()
  }
}