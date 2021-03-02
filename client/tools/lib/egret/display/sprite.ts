import { DisplayObject } from "./display-object"

export class Sprite extends DisplayObject {

  type = "egret.Sprite";
  children: DisplayObject[] = [];

}