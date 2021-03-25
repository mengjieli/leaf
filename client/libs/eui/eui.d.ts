declare namespace eui {
    class EXMLParser {
        static childrenProperties: Map<any, any>;
        static getEXML(ui: EXML, cfg: any, fps?: number): EXML;
        static decodeProperties(ui: ecs.Entity, properties: any): void;
        static decodeChildren(root: any, ui: ecs.Entity, children: any[], properties?: any): void;
        static decodeDisplay(root: any, cfg: any, properties?: any): ecs.Entity;
        static decodeTween(ui: any, cfg: any, childrenProperties: any, fps?: number): void;
        static decodeTweenItem(cfg: any, childrenProperties: any, fps?: number): TweenItemConfig;
    }
}
declare namespace eui {
    class EXML extends ecs.Component {
        [index: string]: any;
        skinParts: string[];
        tweens: TweenGroup[];
        private ids;
        init(exml: any): void;
        update(dt: number): void;
        playTweenGroup(tween: TweenGroup, loop?: number, completeCall?: Function, completeCallTarget?: any): void;
        stopTweenGroup(tween: TweenGroup): void;
        onDestroy(): void;
    }
}
declare namespace eui {
    class TweenGroupConfig {
        items: TweenItemConfig[];
        time: number;
        id: string;
        frameLength: number;
        static count: number;
        static create(): TweenGroupConfig;
    }
    class TweenItemConfig {
        targetId: string;
        frames: TweenItemFrameConfig[];
        time: number;
        static count: number;
        static create(): TweenItemConfig;
    }
    class TweenItemFrameConfig {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        scaleX?: number;
        scaleY?: number;
        alpha?: number;
        rotation?: number;
    }
}
declare namespace eui {
    class TweenGroup {
        readonly id: number;
        display: any;
        groups: TweenGroup[];
        info: any;
        tween: TweenGroupConfig;
        time: number;
        readonly maxTime: number;
        frame: number;
        loop: number;
        completeCall: Function;
        completeCallTarget: any;
        fps: number;
        isPlaying: boolean;
        constructor();
        update(dt: number): void;
        static count: number;
        static create(): TweenGroup;
    }
}
