import { Sprite } from "./sprite";
export declare class Component extends Sprite {
    type: string;
    setAttribute(name: string, value: string): boolean;
}
