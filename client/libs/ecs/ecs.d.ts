declare namespace ecs {
    interface IdObject {
        id: number | string;
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
        add(item: T): T;
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
        constructor();
    }
}
declare namespace ecs {
    class Broadcast<T> {
        on(listener: (...params: T[]) => void, listenerContext?: any): ListenerBinding<T>;
        once(listener: (...params: T[]) => void, listenerContext?: any): ListenerBinding<T>;
        dispatch(...params: T[]): void;
        get(listener: (...params: T[]) => void, listenerContext?: any): ListenerBinding<T>;
        has(listener: (...params: T[]) => void, listenerContext?: any): boolean;
        remove(listener: (...params: T[]) => void, listenerContext?: any): void;
        removeAll(): void;
    }
    class ListenerBinding<T> {
        constructor(listener: (...params: T[]) => void, listenerContext: any, once: boolean, boradcast: Broadcast<T>);
        readonly listener: (...params: T[]) => void;
        readonly listenerContext: any;
        readonly once: boolean;
        readonly broadcast: Broadcast<T>;
        readonly hasDestroyed: boolean;
        execute(...params: T[]): any;
        destroySelf: () => void;
        destroy(): void;
    }
}
declare namespace ecs {
    abstract class Component {
        readonly isAlive: boolean;
        constructor();
        readonly id: number;
        readonly classType: ComponentType;
        readonly entity: Entity;
        syncProperties: Link<SyncProperty>;
        enabled: boolean;
        /**
         * 第几代，每重用一次加 1
         */
        readonly lifeCount: number;
        /**
         * 在整个世界中是否有效，依赖自身和 requireComponents 的 enable 属性
         */
        readonly enableInWorld: boolean;
        init?(...args: any[]): any;
        afterInit?(): any;
        awake?(): any;
        start?(): any;
        update?(dt?: number): any;
        lateUpdate?(dt?: number, ut?: number): any;
        onDestroy?(): any;
        addComponent<T extends Component>(componentClass: IComponentClass<T>, ...args: any[]): T;
        removeComponent<T extends Component>(componentClass: IComponentClass<T> | T): T;
        removeComponents<T extends Component>(componentClass: IComponentClass<T>): void;
        getComponent<T extends Component>(componentClass: IComponentClass<T>): T;
        getComponents<T extends Component>(componentClass: IComponentClass<T>): T[];
        getComponentsInParent<T extends Component>(componentClass: IComponentClass<T>): T[];
        getComponentsInChildren<T extends Component>(componentClass: IComponentClass<T>): T[];
        readonly transform: Transform;
        readonly world: World;
        parent: Entity;
        /**
         *
         * @param type 接受 entity 内的广播
         * @param args
         */
        receive?(type: string, ...args: any[]): any;
        dispatch(type: string, ...args: any[]): void;
        getChildByName(name: string): Entity;
        getChildByPath(name: string): Entity;
        static componentDestroyedPoints: Link<{
            id: number;
            call: Function;
        }>;
        /**
         * 不应该覆盖的方法
         */
        destroy(): void;
        static type: ComponentType;
        static aliveCount: number;
        static newCount: number;
        static realNewCount: number;
        static allowMultiply: boolean;
        static requireComponents: IComponentClass<any>[];
        static recycleEnable: boolean;
        static virtualComponent: boolean;
        static syncComponents: {
            [index: string]: IComponentClass<any>;
        };
    }
    enum EMSyncType {
        BASE = 0,
        COMPONENT = 1
    }
    function sync(writable?: boolean, type?: EMSyncType): (target: any, key: string, descriptor?: PropertyDescriptor) => void;
    class SyncProperty {
        id: string;
        target: Component;
        type: EMSyncType;
        value: any;
        reValue: boolean;
        hasChange: boolean;
        writable: boolean;
        static id: number;
        static pools: SyncProperty[];
    }
    class ComponentType {
        /**
         * 类型 id ，快速区分不同类型
         */
        readonly id: number;
        /**
         * 类名
         */
        readonly name: string;
        readonly define: any;
        newCount: number;
        realNewCount: number;
        readonly allowMultiply: boolean;
        readonly recycleEnable: boolean;
        requireComponents: ComponentType[];
        /**
         * 这个类所包含的 ComponentType （自己和继承的所有 Component）
         */
        readonly types: IComponentClass<any>[];
        readonly typeMap: {
            [index: number]: ComponentType;
        };
    }
    interface IComponentClass<T extends Component> {
        readonly allowMultiply: boolean;
        readonly recycleEnable: boolean;
        requireComponents: IComponentClass<any>[];
        new (): T;
    }
}
declare namespace ecs {
    class Entity extends Broadcast<any> {
        readonly id: number;
        /**
         * 以 ComponentTypeId 为 key
         */
        readonly components: Component[];
        readonly children: ReadonlyArray<Entity>;
        readonly world: World;
        readonly isAlive: boolean;
        readonly transform: Transform;
        tag: string;
        name: string;
        type: number;
        addComponent<T extends Component>(componentClass: IComponentClass<T> | T, ...args: any[]): T;
        removeComponent<T extends Component>(componentClass: IComponentClass<T> | T, atuoDestroy?: boolean): T;
        removeComponents<T extends Component>(componentClass: IComponentClass<T>, atuoDestroy?: boolean): void;
        getComponent<T extends Component>(componentClass: IComponentClass<T>): T;
        getComponents<T extends Component>(componentClass: IComponentClass<T>): T[];
        getComponentsInParent<T extends Component>(componentClass: IComponentClass<T>): T[];
        getComponentsInChildren<T extends Component>(componentClass: IComponentClass<T>): T[];
        dispatch(type: string, ...args: any[]): void;
        destroy(): void;
        private _parent;
        parentChangeCount: number;
        parent: Entity;
        addChild(entity: Entity): void;
        addChildAt(entity: Entity, index: number): void;
        sort(call: (a: ecs.Entity, b: ecs.Entity) => number): void;
        getChildByName(name: string): Entity;
        getChildByPath(name: string): this;
        static aliveCount: number;
        static newCount: number;
        static realNewCount: number;
        static create(type?: number, name?: string, tag?: string): Entity;
        static onCreateEntity: (entity: Entity) => any;
        static onDestroyEntity: (entity: Entity) => any;
        static onChangeEntityParent: (entity: Entity, index?: number) => any;
        static onSortEntityChildren: (entity: Entity) => any;
    }
}
declare namespace ecs {
    class Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        _storeList: any[];
        id: number;
        constructor();
        identity(): this;
        setTo(a: any, b: any, c: any, d: any, tx: any, ty: any): this;
        translate(x: any, y: any): this;
        rotate(angle: any): this;
        scale(scaleX: any, scaleY: any): this;
        $updateSR(scaleX: any, scaleY: any, rotation: any): this;
        $updateRST(rotation: any, scaleX: any, scaleY: any, tx: any, ty: any): this;
        $transformRectangle(rect: any): this;
        concat(other: any): this;
        reconcat(other: any): this;
        readonly deformation: boolean;
        save(): this;
        restore(): this;
        static $matrix: Matrix;
        static matrixPool: any[];
        static release(matrix: any): void;
        /**
         * 创建出来的矩阵可能不是规范矩阵
         * @returns {Matrix}
         */
        static create(): any;
    }
}
declare namespace ecs {
    interface IComponentRecyclePool {
        releaseComponent(component: Component): any;
        createComponent<T extends Component>(componentClass: IComponentClass<T>): T;
    }
    var $componentRecyclePool: IComponentRecyclePool;
    function setComponentRecyclePool(pool: IComponentRecyclePool): void;
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
    class ObjectPools implements IComponentRecyclePool {
        releaseComponent(component: Component): void;
        createComponent<T extends Component>(componentClass: IComponentClass<T>): T;
        static releaseRecyableObject(obj: IRecyclableObject): void;
        static createRecyableObject<T extends IRecyclableObject>(objectClass: IRecyclableObjectClass<T>, ...args: any[]): T;
        static registerRecyclableClass(clazz: IRecyclableObjectClass<any>): void;
        static objects: {
            [index: number]: any[];
        };
        static objectClasses: IRecyclableObjectClass<any>[];
        static components: {
            [index: number]: Component[];
        };
        static componentClasses: IComponentClass<any>[];
        static entities: Entity[];
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
        static setId(obj: any, isNew?: boolean): number;
        static releaseId(id: number): void;
        static linkPool: Node<any>[];
        static linkPrePool: Node<any>[];
        static clearLinkPrePool(): void;
    }
}
declare namespace ecs {
    abstract class Query<T extends IdObject> extends Link<T> {
        readonly id: number;
        constructor();
        abstract onAddEntity(entity: Entity): void;
        abstract onRemoveEntity(entity: Entity): void;
        abstract onAddComponent(entity: Entity, component: Component): void;
        abstract onRemoveComponent(entity: Entity, component: Component): void;
    }
    class EntityQuery extends Query<Entity> {
        readonly componentClassList: IComponentClass<Component>[];
        readonly componentClassMap: {
            [index: number]: IComponentClass<Component>;
        };
        init(componentClasses: IComponentClass<Component>[]): void;
        onAddEntity(entity: Entity): void;
        onRemoveEntity(entity: Entity): void;
        onAddComponent(entity: Entity, component: Component): void;
        onRemoveComponent(entity: Entity, component: Component): void;
    }
    class ComponentQuery extends Query<Component> {
        readonly callName: string;
        init(callName: string): void;
        onAddEntity(entity: Entity): void;
        onRemoveEntity(entity: Entity): void;
        onAddComponent(entity: Entity, component: Component): void;
        onRemoveComponent(entity: Entity, component: Component): void;
    }
}
declare namespace ecs {
    class System<T extends IdObject> {
        readonly id: number;
        readonly query?: Query<T>;
        updateFixTime: number;
        lateUpdateFixTime: number;
        init(query?: Query<T> | any): void;
        isRunning: boolean;
        update?(dt?: number): any;
        lateUpdate?(dt?: number, ut?: number): any;
        destroy(): void;
        static recycleEnable: boolean;
        static sync: boolean;
        static syncSystemClasses: {
            [index: string]: SyncSystemData;
        };
    }
    enum EMSyncSystemMode {
        SUB_WORLD_ONLY = 1,
        ALL_WORLD = 2
    }
    interface SyncSystemData {
        define: {
            new (): System<any>;
        };
        mode: EMSyncSystemMode;
    }
    function syncSystem(mode?: EMSyncSystemMode): <T extends new () => System<any>>(c: T) => T;
}
declare namespace ecs {
    class Transform {
        constructor(entity: Entity);
        private _reverse;
        readonly entity: Entity;
        x: number;
        y: number;
        anchorOffsetX: number;
        anchorOffsetY: number;
        scaleX: number;
        scaleY: number;
        angle: number;
        alpha: number;
        readonly parent: Transform;
        readonly local: Matrix;
        readonly reverse: Matrix;
        readonly worldMatrix: Matrix;
        readonly worldAlpha: number;
        reset(): void;
    }
}
declare namespace ecs {
    class UpdateInfo {
        /**
         * 距离上一帧的时间间隔
         */
        deltaTime: number;
        /**
         * 从启动开始的时间
         */
        totalTime: number;
        /**
         * update 消耗时间
         */
        updateTime: number;
        /**
         * 从启动开始的帧数
         */
        frame: number;
    }
}
declare namespace ecs {
    class World {
        static subWorld: boolean;
        entities: Link<Entity>;
        queries: Query<any>[];
        systems: System<any>[];
        subWorld: boolean;
        syncWorldEnable: boolean;
        readonly root: RootEntity;
        syncComponents: Link<Component>;
        syncDeleteComponents: number[];
        static syncIds: {
            [index: number]: number;
        };
        static resyncIds: {
            [index: number]: number;
        };
        static isSyncing: boolean;
        syncFrames: SyncWorld[];
        syncSystems: {
            system: string;
            components: string[] | string;
        }[];
        syncDeleteSystems: string[];
        waitToSyncFrames: SyncWorld[];
        constructor();
        runInfo: RunInfo;
        update(dt?: number): void;
        onUpdateEnd: Function;
        onAddEntity(entity: Entity): void;
        onRemoveEntity(entity: Entity): void;
        onAddComponent(entity: Entity, component: Component): void;
        onRemoveComponent(entity: Entity, component: Component): void;
        addSystem<T extends IdObject>(systemClass: {
            new (): System<T>;
        }, initArgs?: string | IComponentClass<any>[], reverseIndex?: number): void;
        removeSystem<T extends IdObject>(system: System<T> | {
            new (): System<T>;
        }): void;
        getSystem<T extends IdObject, S extends System<T>>(system: S | {
            new (): S;
        }): S;
        encodeSyncWorld(): SyncWorld;
        decodeSyncComponents(syncWorld: SyncWorld): void;
        scene: Scene;
    }
    class RootEntity extends Entity {
        constructor();
        $setParent(): void;
        $setWorld(): void;
    }
    interface SyncWorld {
        entities: {
            id: number;
            components: {
                define: string;
                [index: string]: any;
                id: number;
            }[];
        }[];
        deleteIds: number[];
        systems: {
            system: string;
            components: string[] | string;
        }[];
        deleteSystems: string[];
    }
}
declare namespace ecs {
    class DebugTool {
        static componentCreated(id: number, call?: Function): void;
        static componentDestroyed(id: number, call?: Function): void;
        static addedToLink(id: number, call?: Function): void;
        static remvedFromLink(id: number, call?: Function): void;
        static debugPointTip(name: string, tip?: boolean): void;
    }
}
declare namespace ecs {
    var debug: boolean;
    enum EMError {
        RELEASE_ID_ERROR = 10001,
        ENEIEY_HAS_DESTROYED = 10002,
        NOT_ALLOW_MUTIPLY_COMPONENT = 11000,
        COMPONENT_EXIST = 11001,
        COMPONENT_HAS_DESTROYED = 11002,
        COMPONENT_REQUIRE = 11003,
        COMPONENT_REQUIRE_COUNT = 11004,
        COMPONENT_REQUIRE_INDEX_ERROR = 11005,
        COMPONENT_REQUIRE_DELETE = 11006,
        SYNC_COMPONENT_SAME_NAME = 11007,
        COMPONENT_REMOVED_INDEX_ERROR = 11008
    }
    function setOnError(call: (type: EMError) => void): void;
    function error(type: EMError, ...args: any[]): void;
    function logError(...args: any[]): void;
    function logWarn(...args: any[]): void;
    function logInfo(...args: any[]): void;
}
declare namespace ecs {
    class RunInfo {
        frame: number;
        lastProcessTime: number;
    }
}
declare namespace ecs {
    class Scene extends Entity {
        constructor();
        $setParent(val: Entity, index?: number): void;
        destroy(): void;
    }
}
declare namespace ecs {
    abstract class ComponentSystem extends System<Component> {
        init(callName: string): void;
    }
}
declare namespace ecs {
    abstract class EntitySystem extends System<Entity> {
        init(componentClasses: IComponentClass<Component>[]): void;
    }
}
declare namespace ecs {
}
declare namespace ecs {
}
declare namespace ecs {
}
declare namespace ecs {
}
