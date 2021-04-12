export interface GameConfig {

    /**
     * 游戏 id
     */
    id: number;

    /**
     * 游戏名称
     */
    name: string;

    /**
     * 游戏类型
     */
    type: EMGameType;

    /**
     * 子类型
     */
    subType?: string;

    /**
     * 游戏介绍
     */
    desc: string;

    /**
     * 是否可以被收藏，默认 null 表示可以被收藏
     */
    collected?: boolean;

    /**
     * 是否为活动
     */
    isActive?: boolean;
}

export enum EMGameType {
    PUZZLE = "puzzle",
    VIEW = "view"
}

export var gameConfigs: {
    [index: number]: GameConfig
} = {
    "1": {
        id: 1,
        type: EMGameType.PUZZLE,
        name: "初级推箱子",
        desc: "难度相对比较简单，尽情的闯关吧！"
    },
    "2": {
        id: 2,
        type: EMGameType.PUZZLE,
        name: "经典推箱子",
        desc: "经典的推箱子玩法，难度适中"
    },
    "3": {
        id: 3,
        type: EMGameType.PUZZLE,
        name: "勇闯迷宫",
        desc: "敢问路在何方～～",
    },
    "4": {
        id: 4,
        type: EMGameType.PUZZLE,
        name: "青蛇与红苹果",
        desc: "小蛇看上了红红的大苹果？"
    },
    "5": {
        id: 5,
        type: EMGameType.PUZZLE,
        name: "收藏有礼",
        desc: "收藏游戏后可立即获得丰富奖励",
        isActive: true
    }
};