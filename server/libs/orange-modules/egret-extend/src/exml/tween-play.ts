namespace egretExtend {

  export class TweenPlay {

    static play(tween: TweenGroup, loop: number = 1, complete?: Function): Promise<void> {
      if (loop <= 0) {
        complete && complete();
        return;
      }
      tween.addEventListener(egret.Event.COMPLETE, () => {
      }, null);
    }
  }
}