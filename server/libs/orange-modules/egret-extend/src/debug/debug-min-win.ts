/**
 * @internal
 */
namespace egretExtend {

  export class DebugMinWin extends egret.Sprite {

    list: eui.List;
    data: eui.ArrayCollection;
    showIndex = 0;

    constructor() {
      super();
      new DragController(this);
      var gp = new eui.Group();
      this.addChild(gp);
      var rect = new eui.Rect();
      rect.fillAlpha = 0.7;
      rect.fillColor = 0;
      rect.left = rect.right = rect.top = rect.bottom = 0;
      gp.addChild(rect);
      var ct = new eui.Group();
      gp.addChild(ct);
      ct.addChild(this.list = new eui.List());
      var layout = ct.layout = new eui.HorizontalLayout();
      layout.paddingLeft = 10;
      layout.paddingRight = 10;
      layout.paddingTop = 10;
      layout.paddingBottom = 10;
      layout.gap = 10;
      this.list.itemRenderer = ShowItem;
      this.data = new eui.ArrayCollection();
      this.list.dataProvider = this.data;
      this.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        $startDebug();
      },this);
    }

    reset(): void {
      this.showIndex = 0;
    }

    show(name: string, content: string) {
      var ind = this.showIndex;
      this.showIndex++;
      if (ind >= this.data.length) {
        this.data.addItem(new ShowItemData());
      }
      (this.data.getItemAt(ind) as ShowItemData).name = name;
      (this.data.getItemAt(ind) as ShowItemData).content = content;
    }
  }

  class ShowItemData {
    @orange.watch name: string;
    @orange.watch content: string;
  }

  @orange.observer
  class ShowItem extends eui.ItemRenderer {

    lb_name: eui.Label;
    lb_content: eui.Label;
    gp_container: eui.Group;

    @orange.watch data: ShowItemData;

    constructor() {
      super();
      this.skinName = null;
      var gp = this.gp_container = new eui.Group();
      this.addChild(gp);
      gp.addChild(this.lb_name = new eui.Label());
      gp.addChild(this.lb_content = new eui.Label());
      this.lb_name.size = this.lb_content.size = 20;
      var layout = gp.layout = new eui.HorizontalLayout();
      layout.gap = 15;
      this.height = 25;
    }

    childrenCreated() {
      super.childrenCreated();
      for (var i = 0; i < this.numChildren; i++) {
        if (this.getChildAt(i) != this.gp_container) {
          this.removeChildAt(i);
          i--;
        }
      }
    }

    @orange.render
    render() {
      if (!this.data) return;
      this.lb_name.text = this.data.name;
      this.lb_content.text = this.data.content;
    }
  }
}
