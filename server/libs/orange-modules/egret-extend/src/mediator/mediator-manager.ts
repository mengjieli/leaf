namespace egretExtend {

  export class MediatorManager extends orange.EventEmitter implements IMediatorManager {

    constructor() {
      super();
      if (!MediatorManager.ist) {
        MediatorManager.ist = this;
      }
    }

    public type: string;

    private mediators: Map<string, Mediator> = new Map<string, Mediator>();

    /**
     * 添加一个 Mediator
     * @param mediator 
     */
    addMediator(mediator: Mediator) {
      mediator.$target = this;
      this.mediators.set(mediator.name, mediator);
    }

    /**
     * 移除一个 Mediator
     * @param mediator 
     */
    removeMediator(mediator: Mediator) {
      if (mediator.$target == this) {
        mediator.$target = null;
        this.mediators.delete(mediator.name);
      }
    }

    /**
     * 获取一个 Mediator
     * @param name Mediator 名称
     */
    getMediator(name: string): Mediator {
      return this.mediators.get(name);
    }

    forEach(func: (Mediator) => void) {
      this.mediators.forEach(func);
    }

    /**
     * @internal
     */
    private static ist: MediatorManager;

    public static get instance(): MediatorManager {
      if (!MediatorManager.ist) {
        new MediatorManager();
      }
      return MediatorManager.ist;
    }
  }
}