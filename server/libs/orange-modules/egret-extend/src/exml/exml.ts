namespace egretExtend {

  export class EXML {

    static decode(ui: eui.Component, cfg: any): TweenGroup[] {
      DecodeDisplay.decode(ui, cfg.root);
      return DecodeTween.decode(ui, cfg.tweens);
    }
  }
}