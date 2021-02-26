namespace ecs {

    export interface IComponentRecyclePool {

        releaseComponent(component: Component);

        createComponent<T extends Component>(componentClass: IComponentClass<T>): T;
    }

    export var $componentRecyclePool: IComponentRecyclePool = null;

    export function setComponentRecyclePool(pool: IComponentRecyclePool) {
        $componentRecyclePool = pool;
    }

    export class RecyclableClassType {

        id: number;

        /**
         * 类名
         */
        readonly name: string;

        readonly define: any;

        newCount: number;

        realNewCount: number;
    }

    export interface IRecyclableObject {

        id?: number | number;

        classType?: RecyclableClassType;

        init?(...args): any;

        onDestroy?(): any;
    }

    export interface IRecyclableObjectClass<T extends IRecyclableObject> {

        classType?: RecyclableClassType;

        new(): T;
    }

    export class ObjectPools implements IComponentRecyclePool {

        releaseComponent(component: Component) {
            ObjectPools.components[component.classType.id].push(component);
        }

        createComponent<T extends Component>(componentClass: IComponentClass<T>): T {
            let pools = ObjectPools.components;
            let id = componentClass.classType.id;
            if (pools[id] === undefined) pools[id] = [];
            if (pools[id].length) {
                let c = pools[id].pop() as any;
                ObjectPools.setId(c, false);
                return c;
            }
            else return new componentClass();
        }

        static releaseRecyableObject(obj: IRecyclableObject) {
            this.releaseId(obj.id);
            obj.onDestroy && obj.onDestroy();
            this.objects[obj.classType.id].push(obj);
        }

        static createRecyableObject<T extends IRecyclableObject>(objectClass: IRecyclableObjectClass<T>, ...args): T {
            this.registerRecyclableClass(objectClass);
            let obj: T;
            if (this.objects[objectClass.classType.id].length) {
                obj = this.objects[objectClass.classType.id].pop();
                this.setId(obj, false);
                objectClass.classType.realNewCount++;
            } else {
                obj = new objectClass();
                this.setId(obj);
            }
            objectClass.classType.newCount++;
            obj.classType = objectClass.classType;
            obj.init && obj.init.apply(obj, args);
            return obj;
        }

        static registerRecyclableClass(clazz: IRecyclableObjectClass<any>) {
            if (clazz.classType && clazz.classType.define === clazz) return;
            ObjectPools.objectClasses.push(clazz as any);
            let type = new RecyclableClassType();
            (clazz.classType as any) = type;
            ObjectPools.setId(type);
            (type.define as any) = clazz;
            (type.name as any) = clazz.name;
            (type.newCount as any) = 0;
            (type.realNewCount as any) = 0;
            this.objects[type.id] = [];
        }

        static objects: { [index: number]: any[] } = {};

        static objectClasses: IRecyclableObjectClass<any>[] = [];

        static components: { [index: number]: Component[] } = {};

        static componentClasses: IComponentClass<any>[] = [];

        static entities: Entity[] = [];

        private static id = 1;

        static realNewObjectCount = 0;

        /**
         * 所有存活的对象
         */
        static all: { [index: number]: any } = { 0: null };

        /**
         * 所有存活对象的数量
         */
        static allCount = 0;

        static weakSet = new WeakSet();

        static setId(obj: any, isNew: boolean = true) {
            this.id++;
            let id = this.id;
            this.all[id] = obj;
            obj.id = id;
            if (isNew) {
                this.realNewObjectCount++;
            }
            debug && this.weakSet.add(obj);
            this.allCount++;
            return id;
        }

        /**
         * @internal
         */
        static waitToDeleteIds = [];

        /**
         * @internal
         */
        static releaseIds() {
            while (this.waitToDeleteIds.length) {
                delete this.all[this.waitToDeleteIds.pop()];
            }
        }

        static releaseId(id: number) {
            if (debug) {
                if (!this.all[id]) {
                    error(EMError.RELEASE_ID_ERROR);
                    return;
                }
            }
            this.allCount--;
            delete this.all[id];
            this.waitToDeleteIds.push(id);
        }

        static linkPool: Node<any>[] = [];
        static linkPrePool: Node<any>[] = [];
        static clearLinkPrePool() {
            let prepool = this.linkPrePool;
            let pool = this.linkPool;
            for (let i = 0, len = prepool.length; i < len; i++) {
                let node = prepool.pop();
                if (!node) return;
                node._next = node.prev = null;
                pool.push(node);
            }
        }
    }

}