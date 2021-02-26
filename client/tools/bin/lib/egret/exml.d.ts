import { TweenGroup } from "./tween/tween-group";
import { XMLElement } from "./../utils/xml-element";
import { DisplayObject } from "./display/display-object";
import { Skin } from "./display/skin";
export declare class EXML {
    content: string;
    url: string;
    class: string;
    root: Skin;
    tweens: TweenGroup[];
    ignore: string[];
    displays: {};
    allDisplays: DisplayObject[];
    decode(url: string, ignore: string[]): [any, string, DisplayObject[]];
    decodeItem(item: DisplayObject, xml: XMLElement): void;
    decodeDeclarations(xml: XMLElement): void;
    static decode(url: string, ignore: string[]): [any, string, DisplayObject[]];
}
