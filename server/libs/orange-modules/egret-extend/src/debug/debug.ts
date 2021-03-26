namespace egretExtend {

  export class Debug extends egret.Sprite {

    constructor() {
      super();
      this.addChild(this.min = new DebugMinWin());
      this.addChild(this.egretDebug = new EgretDebug());
      this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
        let now = Date.now();
        this.egretDebug.start(now);
        this.lastTime = now;
        this.fpsList.length = 0;
        this.lastSecondFps = 0;
        this.lastSecondFpsCount = 0;
        this.lastSecondTime = now;
        // this.min.fps = '';
        // this.min.hashCount = '';
        this.min.reset();
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
      }, this);
      this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
      }, this);
    }

    private egretDebug: EgretDebug;

    private min: DebugMinWin;

    private fpsList = [];
    private lastSecondFps: number;
    private lastSecondFpsCount: number;
    private lastSecondTime: number;
    private lastTime: number;

    update(): void {
      let now = Date.now();
      this.egretDebug.update(now);
      let gap = now - this.lastTime;
      let fps = (~~((1000 / gap) * 10)) / 10 + '';
      if (fps.indexOf('.') == -1) fps += '.0';
      this.fpsList.push(fps);
      if (this.fpsList.length > this.stage.stageWidth) this.fpsList.shift();
      this.lastTime - now;
      this.lastSecondFpsCount++;
      if (now - this.lastSecondTime > 1000) {
        this.min.reset();
        this.updateSecondFps(now);
        this._updateShowCalls.forEach(call => call(this.show.bind(this), this.lastSecondFpsCount));
        this.lastSecondFpsCount = 0;
        this.lastSecondTime = now;
      }
      // this.min.hashCount = this.egretDebug.lastHashCount + '';
    }

    updateSecondFps(now: number): void {
      this.lastSecondFps = this.lastSecondFpsCount * 1000 / (now - this.lastSecondTime);
      let fps = (~~(this.lastSecondFps * 10)) / 10 + '';
      if (fps.indexOf('.') == -1) fps += '.0';
      // this.min.fps = fps;
      this.min.show('fps', fps);
    }

    show(name: string, content: string) {
      this.min.show(name, content);
    }

    /**
     * @internal
     */
    _updateShowCalls = new Set();

    private static ist: Debug;

    public static show() {
      if (!Debug.ist) {
        Debug.ist = new Debug();
      }
      if (!getStage()) throw '没有找到 stage，请调用 orange.start({"stage":?})，传入的 stage 参数为白鹭的舞台';
      getStage().addChild(Debug.ist);
    }

    public static showAll() {
      $startDebug();
    }


    public static hide() {
      if (Debug.ist && Debug.ist.parent) {
        Debug.ist.parent.removeChild(Debug.ist);
      }
    }

    /**
     * @internal
     * @param call 
     */
    public static updateShow(call: (show: (name: string, content: string) => void, frame: number) => any) {
      if (!Debug.ist) {
        Debug.ist = new Debug();
      }
      Debug.ist._updateShowCalls.add(call);
    }
  }
}