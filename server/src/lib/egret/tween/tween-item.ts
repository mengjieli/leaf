import { TweenSet } from "./tween-set"
import { TweenTo } from "./tween-to";

export class TweenItem {
  target: string;
  init: { [string: string]: string | number | boolean } = {};
  items: Array<TweenSet | TweenTo> = [];
}