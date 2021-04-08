import { TweenItem } from "./tween-item";
export declare class TweenGroup {
    id: string;
    items: TweenItem[];
    setAttribute(name: string, value: string): boolean;
}
