import { Group } from "./display/group"
import { TweenGroup } from "./tween/tween-group"
import { XMLElement } from "./../utils/xml-element"
import { File } from "./../file/file"
import { Console } from './../console/console'
import { DisplayObject } from "./display/display-object";
import { Skin } from "./display/skin";
import { Image } from './display/image'
import { TweenItem } from "./tween/tween-item";
import { decodeTweenGroup } from './decode/decode-tween'
import { createDisplay } from './decode/decode-display'
import { Sprite } from "./display/sprite";

export class EXML {

  content: string;
  url: string;
  class: string;
  root: Skin;
  tweens: TweenGroup[] = [];
  ignore: string[];
  displays = {};
  allDisplays: DisplayObject[] = [];

  decode(url: string, ignore: string[]): [any, string, DisplayObject[]] {
    this.url = url;
    this.ignore = ignore;
    this.content = (new File(url)).readContent();
    let xml = XMLElement.parse(this.content);
    if (xml.name != 'e:Skin') {
      console.log(`${Console.styles.red[0]}无法识别的 exml:${this.url}${Console.styles.red[1]}`);
      return;
    }
    if (xml.getAttribute('class')) {
      this.class = xml.getAttribute('class').value;
    }
    this.root = new Skin();
    this.decodeItem(this.root, xml);
    this.tweens.forEach(tweenGroup => {
      tweenGroup.items.forEach(tweenItem => {
        let display = this.displays[tweenItem.target];
        for (let k in display.properties) {
          if (k == 'id') continue;
          tweenItem.init[k] = display.properties[k];
        }
      })
    })
    return [{
      "class": this.class,
      "root": this.root,
      "tweens": this.tweens
    }, this.class, this.allDisplays]
  }

  decodeItem(item: DisplayObject, xml: XMLElement) {
    xml.attributes.forEach(attribute => {
      if (attribute.value == 'false') attribute.value = false as any;
      let flag = item.setAttribute(attribute.name, attribute.value);
      if (!flag) {
        item.properties[attribute.name] = attribute.value;
        console.log(`${Console.styles.yellow[0]}无法识别的 ${xml.name} 属性 ${attribute.name}=${attribute.value} ，可能会有问题 url:${this.url}${Console.styles.yellow[1]}`);
      }
    });
    xml.list.forEach(element => {
      if (element.name == 'w:Declarations') {
        this.decodeDeclarations(element);
      } else {
        let display: DisplayObject = createDisplay(element.name, this);
        if (!display) return;
        (item as Sprite).children.push(display);
        this.decodeItem(display, element);
        if (display.properties.id) {
          this.displays[display.properties.id as string] = display;
        }
        this.allDisplays.push(display);
      }
    });
  }

  decodeDeclarations(xml: XMLElement) {
    xml.list.forEach(element => {
      if (element.name == 'tween:TweenGroup') {
        this.tweens.push(decodeTweenGroup(element, this));
      }
    });
  }

  static decode(url: string, ignore: string[]): [any, string, DisplayObject[]] {
    let exml = new EXML();
    return exml.decode(url, ignore);
  }
}