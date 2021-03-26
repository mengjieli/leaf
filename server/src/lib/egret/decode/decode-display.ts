import { XMLElement } from "./../../utils/xml-element"
import { TweenGroup } from "./../tween/tween-group";
import { TweenItem } from "./../tween/tween-item";
import { TweenSet } from "./../tween/tween-set";
import { TweenTo } from "./../tween/tween-to";
import { Console } from './../../console/console'
import { EXML } from "../exml";
import { DisplayObject } from "../display/display-object";
import { Group } from "../display/group";
import { Image } from "../display/image";
import { Label } from "../display/label";
import { Rect } from "../display/rect";
import { Sprite } from "../display/sprite";
import { Component } from "../display/component";

var current: EXML;

export function createDisplay(name: string, exml: EXML): DisplayObject {
  current = exml;
  if (name == 'e:Group') return new Group();
  if (name == 'e:Image') return new Image();
  if (name == 'e:Label') return new Label();
  if (name == 'e:Rect') return new Rect();
  if (exml.ignore.indexOf(name) != -1) return;
  console.log(`${Console.styles.yellow[0]}无法识别的对象 ${name}，可能会有问题 url:${current.url}${Console.styles.yellow[1]}`);
  return new Component();
}