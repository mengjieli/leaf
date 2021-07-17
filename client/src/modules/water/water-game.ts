export class WaterGame extends ecs.Component {

    

}

export enum EMGridType {
    NONE = 0,
    EARTH = 1,
    WATER = 2
}

export interface Grid {
    type: EMGridType;
    x: number;
    y: number;
}

export interface Water extends Grid {
    pressure: number; //压力
    surface: number; // 0 ~ 1
}

export class WaterGroup {

    list: WaterColumn[];

}

export class WaterColumn {

    list: Water[];

    get surface(): number {
        return this.list[0].surface;
    }

}