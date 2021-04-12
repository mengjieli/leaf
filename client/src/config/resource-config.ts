export interface ResourceConfig {
    id: number;

    name: string;

    desc: string;

    max?: number;
}

export var resources = {
    "1": {
        id: 1,
        name: "体力",
        desc: "基本消耗资源"
    },
    "2": {
        id: 2,
        name: "金币",
        desc: "用于交换"
    }
}