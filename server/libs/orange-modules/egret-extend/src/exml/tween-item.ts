/**
 * @internal
 */
namespace egretExtend {

  export class TweenItem extends egret.EventDispatcher {

    target: egret.DisplayObject;

    targetName: string;

    tween: TweenGroup;

    init: any;

    /**
     * @internal
     */
    maxTime: number;

    /**
     * @internal
     */
    items: (TweenSet | TweenTo)[] = [];

    isPlay: boolean;

    time: number = 0;

    static eases = {
      'none': EaseFunction.None,
      'quadIn': EaseFunction.QuadEaseIn,
      'quadOut': EaseFunction.QuadEaseOut,
      'quadInOut': EaseFunction.QuadEaseInOut,
      'cubicIn': EaseFunction.CubicEaseIn,
      'cubicOut': EaseFunction.CubicEaseOut,
      'cubicInOut': EaseFunction.CubicEaseInOut,
      'quartIn': EaseFunction.QuartEaseIn,
      'quartOut': EaseFunction.QuartEaseOut,
      'quartInOut': EaseFunction.QuartEaseInOut,
      'quintIn': EaseFunction.QuintEaseIn,
      'quintOut': EaseFunction.QuintEaseOut,
      'quintInOut': EaseFunction.QuintEaseInOut,
      'sineIn': EaseFunction.SineEaseIn,
      'sineOut': EaseFunction.SineEaseOut,
      'sineInOut': EaseFunction.SineEaseInOut,
      'backIn': EaseFunction.BackEaseIn,
      'backOut': EaseFunction.BackEaseOut,
      'backInOut': EaseFunction.BackEaseInOut,
      'circIn': EaseFunction.CircEaseIn,
      'circOut': EaseFunction.CircEaseOut,
      'circInOut': EaseFunction.CircEaseInOut,
      'bounceIn': EaseFunction.BounceEaseIn,
      'bounceOut': EaseFunction.BounceEaseOut,
      'bounceInOut': EaseFunction.BounceEaseInOut,
      'elasticIn': EaseFunction.ElasticEaseIn,
      'elasticOut': EaseFunction.ElasticEaseOut,
      'elasticInOut': EaseFunction.ElasticEaseInOut
    }

    resetFlag: boolean;

    play(time: number, reset: boolean = true) {
      this.resetFlag = reset;
      this.isPlay = true;
      this.tween.startUpdate();
      this.update(0);
      if (time != null) {
        this.tweenTo = null;
        this.time = time;
        this.update(time);
      }
    }

    rotation = 0;

    reset() {
      if (this.tween.info.hasSetWidth && this.init.width == null) {
        if (this.target instanceof eui.Image && this.target.texture) {
          this.target.width = this.target.texture.textureWidth;
        }
      }
      if (this.tween.info.hasSetHeight && this.init.height == null) {
        if (this.target instanceof eui.Image && this.target.texture) {
          this.target.height = this.target.texture.textureHeight;
        }
      }
      if (this.init.x == null) {
        this.target.x = 0;
      }
      if (this.init.y == null) {
        this.target.y = 0;
      }
      if (this.init.rotation == null) {
        this.target.rotation = 0;
      }
      if (this.init.scaleX == null) {
        this.target.scaleX = 1;
      }
      if (this.init.scaleY == null) {
        this.target.scaleY = 1;
      }
      if (this.init.alpha == null) {
        this.target.alpha = 1;
      }
      this.rotation = 0;
      for (let k in this.init) {
        if (k == 'rotation') {
          this.rotation = this.init[k];
        }
        this.target[k] = this.init[k];
      }
    }

    pause() {
      this.isPlay = false;
      this.tween.stopUpdate();
    }

    stop() {
      this.pause();
    }

    tweenStart: TweenTo;
    tweenTo: TweenTo;
    /**
     * @internal
     * @param gap 
     */
    update(gap: number) {
      if (!this.isPlay) return;
      if (this.maxTime == 0 && gap != 0 && this.time >= this.maxTime) {
        this.tweenTo = null;
        this.isPlay = false;
        this.time = 0;
        this.dispatchEventWith(egret.Event.COMPLETE, false, this.resetFlag);
        return;
      }
      let last = this.time;
      this.time += gap;
      if (this.time >= this.maxTime) this.time = this.maxTime;
      this.items.forEach((item, index) => {
        // if (item.time >= last && item.time < this.time || item.time == last && item.time == this.time || item.time == this.maxTime && this.time == this.maxTime) {
        if (item.time > last && item.time <= this.time || this.time === 0 && item.time === 0) {
          if ((item as TweenTo).duration != null && (!this.tweenTo || this.items.indexOf(this.tweenTo) != index)) {
            if (this.tweenTo) {
              for (let k in this.tweenStart) {
                if (k == 'rotation') {
                  this.target[k] = this.rotation = this.tweenTo[k];
                } else {
                  this.target[k] = this.tweenTo[k];
                }
              }
            }
            this.tweenTo = item as TweenTo;
            this.tweenStart = {} as any;
            for (let k in item) {
              if (k == 'time' || k == 'duration') continue;
              if (k == 'rotation') this.tweenStart[k] = this.rotation;
              else this.tweenStart[k] = this.target[k];
              if (k == 'width') this.tween.info.hasSetWidth = true;
              if (k == 'height') this.tween.info.hasSetHeight = true;
            }
          } else {
            for (let k in item) {
              if (k == 'time') continue;
              if (k == 'rotation') {
                this.rotation = item[k];
              }
              this.target[k] = item[k];
              if (k == 'width') this.tween.info.hasSetWidth = true;
              if (k == 'height') this.tween.info.hasSetHeight = true;
            }
          }
        }
      });
      if (this.tweenTo) {
        let p = (this.time - this.tweenTo.time) / this.tweenTo.duration;
        let over = p >= 1;
        if (p > 1) p = 1;
        let ease = TweenItem.eases[this.tweenTo.ease];
        ease && (p = ease(p));
        for (let k in this.tweenStart) {
          if (k == 'rotation') {
            this.target[k] = this.rotation = this.tweenStart[k] + (this.tweenTo[k] - this.tweenStart[k]) * p;
          } else {
            this.target[k] = this.tweenStart[k] + (this.tweenTo[k] - this.tweenStart[k]) * p;
          }
        }
        if (over) this.tweenTo = null;
      }
      if (this.maxTime != 0 && this.time >= this.maxTime) {
        this.tweenTo = null;
        this.isPlay = false;
        this.time = 0;
        this.dispatchEventWith(egret.Event.COMPLETE, false, this.resetFlag);
      }
    }
  }

  /**
   * @interface
   */
  export interface TweenSet {
    time: number;
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    width: number;
    height: number;
    alpha: number;
    rotation: number;
  }

  /**
   * @interface
   */
  export interface TweenTo {
    time: number;
    duration: number;
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    width: number;
    height: number;
    alpha: number;
    rotation: number;
    ease: string;
  }
}