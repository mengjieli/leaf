namespace egretExtend {

  export class Component {

    awake?(): void;

    /**
     * @internal
     */
    $hasStart: boolean = false;

    start?(): void;

    update?(): void;

    destory(): void {

    }

    owner: egret.Sprite;
  }

  var componentSymbol = Symbol('egret component');

  export function addComponent<T extends Component>(obj: egret.Sprite, type: { new(): T }): void {
    if (!obj) {
      let cs = obj[componentSymbol] = new Array<Component>();
      obj.addEventListener(egret.Event.ENTER_FRAME, () => {
        cs.forEach(c => {
          c.$hasStart === false && (c.$hasStart = true) && c.start && c.start();
          c.update && c.update();
        });
      }, this);
    }
    let components = obj[componentSymbol];
    let c = new type();
    c.owner = obj;
    c.awake && c.awake();
  }
}