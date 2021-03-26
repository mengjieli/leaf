import { Group } from "./group"

export class Skin extends Group {

  type = "Skin"
  // class: string;

  setAttribute(name: string, value: string): boolean {
    if (super.setAttribute(name, value)) return true;
    if (name == "class") this.properties.class = value;
    else return false;
    return true;
  }
}