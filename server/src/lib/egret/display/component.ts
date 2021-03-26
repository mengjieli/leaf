import { Sprite } from "./sprite"

export class Component extends Sprite {

  type = "eui.Component";
  // percentWidth: number;
  // percentHeight: number;
  // verticalCenter: number;
  // horizontalCenter: number;
  // letf: number;
  // top: number;
  // right: number;
  // bottom: number;

  setAttribute(name: string, value: string): boolean {
    if (name == "width" && value.charAt(value.length - 1) == "%") {
      this.properties.percentWidth = +value.slice(0, value.length - 1);
      return true;
    }
    if (name == "height" && value.charAt(value.length - 1) == "%") {
      this.properties.percentHeight = +value.slice(0, value.length - 1);
      return true;
    }
    if (super.setAttribute(name, value)) return true;
    if (name == "percentWidth") this.properties.percentWidth = +value;
    else if (name == "percentHeight") this.properties.percentHeight = +value;
    else if (name == "verticalCenter") this.properties.verticalCenter = +value;
    else if (name == "horizontalCenter") this.properties.horizontalCenter = +value;
    else if (name == "left") this.properties.letf = +value;
    else if (name == "top") this.properties.top = +value;
    else if (name == "right") this.properties.right = +value;
    else if (name == "bottom") this.properties.bottom = +value;
    else return false;
    return true;
  }
}