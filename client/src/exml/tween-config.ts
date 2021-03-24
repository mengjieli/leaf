export class TweenGroupConfig {

    public items: TweenItemConfig[] = [];

    public time: number;

    public id: string;

    public frameLength: number;

    public static count: number = 0;

    public static create() {
        this.count++;
        return new TweenGroupConfig();
    }
}

export class TweenItemConfig {

    public targetId: string;

    public frames: TweenItemFrameConfig[] = [];

    public time: number;

    public static count: number = 0;

    public static create() {
        this.count++;
        return new TweenItemConfig();
    }
}


export class TweenItemFrameConfig {

    x?: number;
    y?: number;
    width?: number;
    height?: number;
    scaleX?: number;
    scaleY?: number;
    alpha?: number;
    rotation?: number;

}