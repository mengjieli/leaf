namespace egretExtend {

  export abstract class ViewMediator<DataClass> extends Mediator implements IViewMediator {

    public data: DataClass;

    /**
     * @internal
     */
    $view: IView;

    /**
     * 父节点
     */
    public parent: egret.DisplayObjectContainer;

    /**
     * 显示
     * @param data 
     */
    openView(data?: any) {
      if (this.parent) {
        this.parent.addChild(this.view);
      }
    }

    /**
     * 关闭显示
     * @param data 
     */
    closeView(data?: any) {
      if (this.$view && this.$view.parent) {
        this.$view.parent.removeChild(this.$view);
      }
    }

    getViewChild(name: string) {
      if (this.$view) return orange.GetUtil.getFromGlobal(name, this.$view);
    }

    /**
     * 获取 view
     */
    public get view(): IView {
      return this.getView();
    }

    protected getView(): IView {
      if (!this.$view) {
        this.$view = this.createView();
        this.onViewAddedToStage && this.$view.addEventListener(egret.Event.ADDED_TO_STAGE, this.onViewAddedToStage, this);
        this.onViewRemovedFromStage && this.$view.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onViewRemovedFromStage, this);
        this.onViewCreated && this.onViewCreated();
      }
      return this.$view;
    }

    /**
     * 创建 view ，由子类实现
     */
    abstract createView(): IView;

    /**
     * 创建后做 view 的绑定和事件注册等
     */
    protected onViewCreated?(): void;

    /**
     * view 添加到舞台
     */
    protected onViewAddedToStage?(): void;
    /**
     * view 从舞台移除
     */
    protected onViewRemovedFromStage?(): void;

    /**
     * view 销毁
     */
    protected onViewDestroyed?(): void;

    /**
     * 销毁 view
     */
    protected destroyView(): void {
      if (this.$view) {
        this.onViewDestroyed && this.onViewDestroyed();
        if (this.$view.parent) {
          this.$view.parent.removeChild(this.$view);
        }
        this.onViewAddedToStage && this.$view.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onViewAddedToStage, this);
        this.onViewRemovedFromStage && this.$view.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onViewRemovedFromStage, this);
        this.$view = null;
      }
    }
  }
}