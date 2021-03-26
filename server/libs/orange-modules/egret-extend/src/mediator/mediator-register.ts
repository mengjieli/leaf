namespace egretExtend {

  /**
   * @internal
   */
  export class MediatorRegister {

    public type: string;

    public mediatorManager: IMediatorManager;

    public mediatorClasses: Map<any, string> = new Map<any, string>();

    public rootData: any;

    public start(): void {
      this.mediatorClasses.forEach((dataRute: any, clazz: any) => {
        let mediator: Mediator = new clazz() as any;
        if (dataRute) {
          if (typeof dataRute === 'string') (mediator as ViewMediator<any>).data = orange.GetUtil.getFromGlobal(dataRute, this.rootData);
          else (mediator as ViewMediator<any>).data = new dataRute();
        }
        this.mediatorManager.addMediator(mediator);
        mediator.onReady();
      });
    }

    /**
     * @internal
     */
    private static map = new Map<string, MediatorRegister>();

    public static get(type: string): MediatorRegister {
      if (MediatorRegister.map.has(type)) return MediatorRegister.map.get(type);
      let mr = new MediatorRegister();
      mr.type = type;
      MediatorRegister.map.set(type, mr);
      return mr;
    }
  }

  export var registerMediator = (dataRute: string | any = null, mediatorManagerType?: string) => {
    let mr = MediatorRegister.get(mediatorManagerType);
    return (clazz) => {
      mr.mediatorClasses.set(clazz, dataRute);
      return clazz;
    };
  }
}