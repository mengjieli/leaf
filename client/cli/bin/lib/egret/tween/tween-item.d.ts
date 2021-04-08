import { TweenSet } from "./tween-set";
import { TweenTo } from "./tween-to";
export declare class TweenItem {
    target: string;
    init: {
        [string: string]: string | number | boolean;
    };
    items: Array<TweenSet | TweenTo>;
}
