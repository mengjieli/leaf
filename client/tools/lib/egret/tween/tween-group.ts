import { TweenItem } from "./tween-item"

export class TweenGroup {

  id: string;
  items: TweenItem[] = [];

  setAttribute(name: string, value: string): boolean {
    if (name == "id") this.id = value;
    else return false;
    return true;
  }
}