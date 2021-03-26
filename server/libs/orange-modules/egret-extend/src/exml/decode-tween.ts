/**
 * @internal
 */
namespace egretExtend {

  export class DecodeTween {

    public static decode(ui: any, cfg: any[]): TweenGroup[] {
      let tweens = [];
      let info: any = { hasSetWidth: false, hasSetHeight: false };
      cfg.forEach(itemCfg => {
        let tween = new TweenGroup();
        tweens.push(tween);
        tween.display = ui;
        tween.groups = tweens;
        tween.info = info;
        let time = 0;
        if (itemCfg.id) {
          ui[itemCfg.id] = tween;
        }
        itemCfg.items.forEach(cfg2 => {
          let tweenItem = DecodeTween.decodeTweenItem(ui, cfg2);
          tweenItem.tween = tween;
          tween.pushItem(tweenItem);
          time = tweenItem.maxTime > time ? tweenItem.maxTime : time;
        });
        tween.maxTime = time;
      });
      return tweens;
    }

    static decodeTweenItem(ui: any, cfg: any): TweenItem {
      let item = new TweenItem();
      let time = 0;
      item.init = cfg.init;
      cfg.items.forEach(itemCfg => {
        if (itemCfg.duration != null) {
          item.items.push(DecodeTween.decodeTweenTo(itemCfg));
        } else {
          item.items.push(DecodeTween.decodeTweenSet(itemCfg));
        }
      });
      item.items.forEach(t => {
        if ((t as any).duration != null) {
          time = t.time + (t as any).duration > time ? t.time + (t as any).duration : time;
        } else {
          time = t.time > time ? t.time : time;
        }
      })
      item.maxTime = time;
      item.target = ui[cfg.target];
      item.targetName = cfg.target;
      return item;
    }

    static decodeTweenSet(cfg: any): TweenSet {
      let item = {} as TweenSet;
      for (let k in cfg) {
        item[k] = cfg[k];
      }
      return item;
    }

    static decodeTweenTo(cfg: any): TweenTo {
      let item = {} as TweenTo;
      for (let k in cfg) {
        item[k] = cfg[k];
      }
      return item;
    }
  }
}