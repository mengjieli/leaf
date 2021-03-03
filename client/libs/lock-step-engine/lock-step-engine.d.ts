declare namespace lse {
    class Item {
        readonly id: number;
        readonly type: EMWorldType;
        readonly world: World;
        init(type: EMWorldType, world: World, id: number, data: IItemData, player?: Player): void;
        readonly showData: IItemData;
        readonly syncData: IItemData;
        readonly realData: IItemData;
        readonly player: Player;
        readonly data: IItemData;
        onDestroy(): any;
    }
}
declare namespace lse {
    interface IdObject {
        id?: number | string;
    }
    interface IReaonlyLink<T extends IdObject> {
        readonly head: Node<T>;
        readonly tail: Node<T>;
        readonly length: number;
    }
    class Link<T extends IdObject> {
        head: Node<T>;
        tail: Node<T>;
        length: number;
        private nodes;
        static addCount: number;
        static removeCount: number;
        readonly key: string;
        constructor(key?: string);
        add(item: T): T;
        removeById(id: number): void;
        remove(item: T): T;
        readonly toArray: T[];
        hasId(key: number | string): boolean;
        has(item: T): boolean;
        get(item: T): T;
        getById(id: number | string): T;
        clear(releaseValue?: boolean): void;
    }
    interface IReadOnlyNode<T extends IdObject> {
        readonly prev: IReadOnlyNode<T>;
        readonly value: T;
        readonly next: IReadOnlyNode<T>;
    }
    class Node<T extends IdObject> {
        key: number | string;
        prev: Node<T>;
        value: T;
        readonly next: Node<T>;
    }
}
declare namespace lse {
    var debug: boolean;
    class RecyclableClassType {
        id: number;
        /**
         * 类名
         */
        readonly name: string;
        readonly define: any;
        newCount: number;
        realNewCount: number;
    }
    interface IRecyclableObject {
        id?: number | number;
        classType?: RecyclableClassType;
        init?(...args: any[]): any;
        onDestroy?(): any;
    }
    interface IRecyclableObjectClass<T extends IRecyclableObject> {
        classType?: RecyclableClassType;
        new (): T;
    }
    class ObjectPools {
        static objects: {
            [index: number]: any[];
        };
        private static id;
        static realNewObjectCount: number;
        /**
         * 所有存活的对象
         */
        static all: {
            [index: number]: any;
        };
        /**
         * 所有存活对象的数量
         */
        static allCount: number;
        static weakSet: WeakSet<object>;
        static releaseRecyableObject(obj: IRecyclableObject): void;
        static createRecyableObject<T extends IRecyclableObject>(objectClass: IRecyclableObjectClass<T>, ...args: any[]): T;
        static registerRecyclableClass(clazz: IRecyclableObjectClass<any>): void;
        static setId(obj: any, isNew?: boolean): number;
        static releaseId(id: number): void;
        static objectClasses: IRecyclableObjectClass<any>[];
        static clearLinkPrePool(): void;
    }
}
declare namespace lse {
    class PlayerAction {
        readonly type: number;
        readonly data: any;
        constructor(type: number, data?: any);
        encode(): {
            type: number;
            data: any;
        };
        decode(cfg: any): void;
    }
}
declare namespace lse {
    class PlayerFrame {
        readonly playerId: number;
        readonly frame: number;
        readonly actions: PlayerAction[];
        constructor(playerId: number, frame: number);
        encode(): {
            playerId: number;
            frame: number;
            actions: any[];
        };
        decode(cfg: any): void;
    }
}
declare namespace lse {
    class Player {
        readonly id: number;
        readonly local: boolean;
        constructor(id: number, local: boolean, extendedData?: any);
        extendedData: any;
        readonly frame: number;
        getFrameData(frame: number): PlayerFrame;
    }
}
declare namespace lse {
    class World {
        /**
         *
         * @param frameTime 一帧运行的时间(毫秒)
         */
        constructor(frameTime?: number, extendedData?: any);
        clear(): void;
        extendedData: any;
        /**
         *一帧运行的时间(毫秒)
         */
        readonly frameTime: number;
        frame: {
            [index: number]: number;
        };
        private itemIds;
        getNewItemId(type: lse.EMWorldType.SHOW | lse.EMWorldType.SYNC | lse.EMWorldType.REAL): number;
        /**
         * 当前显示的帧序号
         */
        readonly showFrame: number;
        /**
         * 同步预测的帧序号
         */
        readonly syncFrame: number;
        /**
         * 真实的帧序号
         */
        readonly realFrame: number;
        /**
         * 添加玩家
         * @param id
         * @param data
         * @param extendedData
         */
        addPlayer(id: number, local: boolean, extendedData?: any, worldType?: EMWorldType): void;
        /**
         * 删除玩家
         * @param id
         */
        removePlayer(id: number, worldType?: EMWorldType): void;
        readonly items: {
            [index: number]: Link<Item>;
        };
        readonly currentItems: Link<Item>;
        addPlayerFrame(id: number, frame: number, worldType?: EMWorldType): void;
        addPlayerAction(id: number, type: number, data?: any, frame?: number, worldType?: EMWorldType): void;
        addItem(id: number, data: IItemData, playerId: number, worldType: EMWorldType.SHOW | EMWorldType.SYNC | EMWorldType.REAL): void;
        removeItem(id: number, worldType: EMWorldType.SHOW | EMWorldType.SYNC | EMWorldType.REAL): void;
        update(): void;
        executePlayerAction: (items: Link<Item>, player: Player, action: PlayerAction, type: EMWorldType, world: World) => void;
        runFrame: (items: Link<Item>, type: EMWorldType, world: World) => void;
        syncShowWorld: (items: Link<Item>, syncItem: Link<Item>, type: EMWorldType, world: World) => void;
    }
    interface IItemData {
        lockStepItem: Item;
        copyTo(item: IItemData, worldType: EMWorldType): IItemData;
        clone(worldType: EMWorldType): IItemData;
        dispose(): any;
    }
    enum EMWorldType {
        SHOW = 1,
        SYNC = 2,
        REAL = 4,
        SHOW_SYNC = 3,
        SHOW_REAL = 5,
        SYNC_REAL = 6,
        ALL = 7
    }
}
