/**
 * @internal
 */
namespace egretExtend {

  export class DecodeDisplay {

    static decodeDisplay(root: any, cfg: any): egret.DisplayObject {
      let define = orange.GetUtil.getFromGlobal(cfg.type);
      let display = new define();
      DecodeDisplay.decodeProperties(display, cfg.properties);
      DecodeDisplay.decodeChildren(root, display, cfg.children);
      return display;
    }

    static decodeChildren(root: any, ui: eui.Component, children: any[]) {
      children.forEach(child => {
        let display = DecodeDisplay.decodeDisplay(root, child);
        ui.addChild(display);
        if (child.properties.id) {
          root[child.properties.id] = display;
        }
      });
    }

    static decodeProperties(ui: eui.Component, properties: any) {
      for (let k in properties) {
        ui[k] = properties[k];
      }
    }

    public static decode(ui: eui.Component, cfg: any) {
      DecodeDisplay.decodeProperties(ui, cfg.properties);
      DecodeDisplay.decodeChildren(ui, ui, cfg.children);
    }
  }
}