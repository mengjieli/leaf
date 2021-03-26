namespace egretExtend {

  export interface IViewMediator extends IMediator {

    /**
     * mediator 管理的显示对象
     */
    readonly view: IView;

    /**
     * 显示父对象
     */
    parent: any;

    /**
     * 打开显示
     * @param data
     */
    openView(data?: any): void;

    /**
     * 关闭显示
     * @param data 
     */
    closeView(data?: any): void;
  }
}