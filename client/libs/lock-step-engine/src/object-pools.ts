namespace lse {

    export var debug = false;

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

    export class ObjectPools {

        static objects: { [index: number]: any[] } = {};

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
                    console.error("[lock step engine] realse id error:" + id);
                    // error(EMError.RELEASE_ID_ERROR);
                    return;
                }
            }
            this.allCount--;
            delete this.all[id];
            this.waitToDeleteIds.push(id);
        }

        /**
         * @internal
         */
        static linkPool: Node<any>[] = [];

        static objectClasses: IRecyclableObjectClass<any>[] = [];

        /**
         * @internal
         */
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