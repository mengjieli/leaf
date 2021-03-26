namespace egretExtend {

  export class TweenGroup extends egret.EventDispatcher {

    /**
     * @internal
     */
    display: eui.Component;

    /**
     * @internal
     */
    groups: TweenGroup[];

    items: TweenItem[] = [];

    /**
     * @internal
     * 多个 tweengroup 公用信息
     */
    info: { hasSetWidth: boolean, hasSetHeight: boolean };

    /**
     * 播放速度，只在 updateSelf 为 true 时有用
     */
    speed = 1;

    /**
     * @internal
     */
    pushItem(item: TweenItem) {
      this.items.push(item);
      item.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
    }

    stopAll(): void {
      this.groups.forEach(group => group.stop());
    }

    resetAll(): void {
      this.groups.forEach(group => group.reset());
    }


    /**
     * @internal
     */
    async onComplete(e: orange.Event) {
      for (let item of this.items) {
        if (item.isPlay) return;
      }
      this._isPlay = false;
      this.playLoopComplete(e.data);
      this.dispatchEventWith(egret.Event.COMPLETE);
    }

    maxTime: number;


    play(time?: number) {
      this.groups.forEach(group => group.stop());
      this.playComplete = null;
      this.doPlay(time);
    }

    /**
     * @internal
     * @param time 
     */
    doPlay(time?: number, reset = true) {
      reset && this.groups.forEach(group => group != this && group.reset());
      this.reset();
      if (this.items.length == 0) return;
      this._isPlay = true;
      this.items.forEach(item => item.isPlay = true);
      this.items.forEach(item => item.play(time, reset));
    }

    /**
     * @internal
     */
    private playComplete: Function;
    private loop: number;
    private _isPlay = false;

    get isPlay(): boolean {
      return this._isPlay;
    }

    /**
     * 从时间 0 开始循环播放多少次
     * @param loop 循环次数
     * @param complete 
     */
    playLoop(loop: number = 1, reset = true): Promise<void> {
      this.playComplete = null;
      reset && this.groups.forEach(group => group.stop());
      return new Promise<void>(resolve => {
        this.playComplete = resolve;
        this.loop = loop;
        this.doPlay(0, reset);
      })
    }

    /**
     * @internal
     */
    playLoopComplete(reset: boolean): void {
      if (this.playComplete) {
        this.loop--;
        if (this.loop == 0) {
          let f = this.playComplete;
          this.playComplete = null;
          f();
        } else {
          this.doPlay(0, reset);
        }
      }
    }

    /**
     * @internal
     */
    reset() {
      this.items.forEach(item => item.reset());
    }

    stop(): void {
      this.playComplete = null;
      this.items.forEach(item => item.stop());
    }

    /**
     * @internal
     */
    plays;

    /**
     * @internal
     */
    lastTime: number;

    update = (dt: number) => {
      if (!this._isPlay) return;
      if (!this.plays) {
        this.plays = [];
        this.items.forEach((item, index) => {
          this.plays[index] = true;
        });
      }
      /**
       * 因为每个 item 的时间长度不一样，如果最后一个不是最长的，那么它就提前完成了，最后一轮还没轮到它其它的就完成了
       * 导致这一轮更新到最后一个的时候它的 time 又为 0 了，然后又开始播放了，这样它会多播放一帧
       * 所以要把 isPlay 标识存起来，轮到它 update 的时候直接跳过
       */
      this.items.forEach((item, index) => {
        this.plays[index] = item.isPlay;
      });
      this.items.forEach((item, index) => {
        if (!this.plays[index]) return;
        item.update(dt);
      })
    }

    /**
     * @internal
     */
    innerUpdate(): void {
      if (this.updateCall) return;
      let now = Date.now();
      let gap = (now - this.lastTime) * this.speed;
      this.lastTime = now;
      this.update(gap);
    }

    /**
     * @internal
     */
    hasAdd = false;

    /**
     * 是否内部更新，如果设置为 false 则需要外部调用 update(dt) 进行更新
     */
    public updateCall: (update: (dt: number) => any) => (() => any);

    private cancelUpdate: () => any;

    /**
     * @internal
     */
    startUpdate(): void {
      if (this.hasAdd == false) {
        this.hasAdd = true;
        if (this.updateCall) {
          this.cancelUpdate = this.updateCall(this.update);
        } else {
          this.lastTime = Date.now();
          this.display.addEventListener(egret.Event.ENTER_FRAME, this.innerUpdate, this);
        }
      }
    }

    /**
     * @internal
     */
    stopUpdate(): void {
      for (let item of this.items) {
        if (item.isPlay) {
          return;
        }
      }
      if (this.hasAdd) {
        this.hasAdd = false;
        if (this.updateCall) {
          if (this.cancelUpdate) this.cancelUpdate();
          this.cancelUpdate = null;
        } else {
          this.display.removeEventListener(egret.Event.ENTER_FRAME, this.innerUpdate, this);
        }
      }
    }
  }
}