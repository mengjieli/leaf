namespace egretExtend {

  export class DragController {

    /**
     * @internal
     */
    private display: egret.DisplayObject;

    constructor(display: egret.DisplayObject) {
      this.display = display;
      this.addListeners();
    }

    /**
     * @internal
     */
    private addListeners(): void {
      let stageX, stageY, displayX, displayY;
      let stage;
      this.display.addEventListener("touchBegin", (e) => {
        if (!this.enabled) return;
        stageX = e.stageX;
        stageY = e.stageY;
        displayX = this.display.x;
        displayY = this.display.y;

        var touchMove = (e) => {
          if (!this.enabled) return;
          this.display.x = e.stageX - stageX + displayX;
          this.display.y = e.stageY - stageY + displayY;
        }

        var touchEnd = (e) => {
          if (!this.enabled) return;
          this.display.stage.removeEventListener("touchMove", touchMove, this);
          this.display.stage.removeEventListener("touchEnd", touchEnd, this);
          this.completes.forEach(complete => {
            complete(this);
          });
        };

        this.display.stage.addEventListener("touchMove", touchMove, this);
        this.display.stage.addEventListener("touchEnd", touchEnd, this);

      }, this);
    }

    /**
     * @internal
     */
    private completes = new Set<((drag: DragController) => void)>();

    public onComplete(back: (drag: DragController) => void): () => void {
      this.completes.add(back);
      return () => {
        this.completes.delete(back);
      };
    }

    /**
     * @internal
     */
    private _enbaled: boolean = true;

    set enabled(flag: boolean) {
      flag = !!flag;
      if (this._enbaled == flag) return;
      this._enbaled = flag;
    }

    get enabled(): boolean {
      return this._enbaled;
    }
  }
}