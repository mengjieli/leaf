/**
 * @internal
 */
namespace egretExtend {

  export class DebugMiddleWin extends egret.Sprite {

    fpsLabel: egret.TextField;
    hashLabel: egret.TextField;

    constructor() {
      super();
      this.graphics.beginFill(0, 0.7);
      this.graphics.drawRect(0, 0, 100, 60);
      this.graphics.endFill();
      this.fpsLabel = new egret.TextField();
      this.fpsLabel.size = 18;
      this.fpsLabel.x = 3;
      this.fpsLabel.y = 3;
      this.addChild(this.fpsLabel);
      this.hashLabel = new egret.TextField();
      this.hashLabel.size = 18;
      this.hashLabel.x = 3;
      this.hashLabel.y = 33;
      this.addChild(this.hashLabel);
    }

    set fps(str: string) {
      this.fpsLabel.text = 'fps : ' + str;
    }

    set hashCount(str: string) {
      this.hashLabel.text = 'obj : ' + str;
    }
  }
}