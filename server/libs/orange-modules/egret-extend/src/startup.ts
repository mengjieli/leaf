
namespace egretExtend {

  export function start(rootData: any, mediatorManager: IMediatorManager): void {
    mediatorManager = mediatorManager || new MediatorManager();
    let mr = MediatorRegister.get(mediatorManager.type);
    mr.mediatorManager = mediatorManager;
    mr.rootData = rootData;
    mr.start();

  }
  /**
   * @internal
   */
  var stage: egret.Sprite;

  //启动
  orange.addStartBack(async (params: orange.StartupParams) => {
    if (params.egret && params.egret.stage && orange.debug) {
      stage = new egret.Sprite();
      params.egret.stage.addChild(stage);
      stage.addEventListener(egret.Event.ENTER_FRAME, () => {
        if (stage.parent.getChildIndex(stage) != stage.parent.numChildren - 1) {
          stage.parent.setChildIndex(stage, stage.parent.numChildren - 1);
        }
      }, null);
      if (params.egret.debugWin) {
        Debug.show();
      }
    }
  });

  export function getStage(): any {
    return stage || egretStage;
  }
}

try {
  window["egretExtend"] = egretExtend;
  window["orange"]["egret"] = egretExtend;
} catch (e) {
}