export declare class DisplayObject {
    type: string;
    properties: {
        [string: string]: string | number | boolean;
    };
    setAttribute(name: string, value: string): boolean;
}
