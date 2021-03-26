namespace egretExtend {

  export interface IMediatorManager extends orange.EventEmitter {

    /**
     * 用以区分 IMediatorManager 的标识
     */
    readonly type: string;

    /**
     * 添加一个 Mediator
     * @param mediator 
     */
    addMediator(mediator: IMediator);

    /**
     * 移除一个 Mediator
     * @param mediator 
     */
    removeMediator(mediator: IMediator);

    /**
     * 获取一个 Mediator
     * @param name Mediator 名称
     */
    getMediator(name: string): IMediator;

    /**
     * 遍历 Mediator
     * @param func 
     */
    forEach(func: (IMediator) => void);
  }
}