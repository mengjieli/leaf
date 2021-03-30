namespace ecs {

    /**
     * @internal
     */
    export var $newComponent = false;

    export abstract class Component {

        readonly isAlive: boolean;

        constructor() {
            $newComponent = true;
        }

        readonly id: number = ObjectPools.setId(this, true);

        readonly classType: ComponentType;

        readonly entity: Entity;

        syncProperties = new Link<SyncProperty>();

        /**
         * @internal
         */
        _enabled: boolean = true;

        get enabled(): boolean {
            return this._enabled;
        }

        set enabled(val: boolean) {
            if (this._enabled === val) return;
            this._enabled = val;
            this.checkEnableInWorld();
        }

        /**
         * 第几代，每重用一次加 1
         */
        readonly lifeCount: number = 0;

        /**
         * @internal
         */
        checkEnableInWorld() {
            let enableInWorld = this.enableInWorld;
            if (!this._enabled) {
                (this.enableInWorld as any) = false;
                if (enableInWorld === true) {
                    this.changeEnableInWorld();
                }
            } else {
                let classType = this.classType;
                (this.enableInWorld as any) = true;
                for (let i = 0; i < classType.requireComponents.length; i++) {
                    if (!this.entity.componentEnableCount[classType.requireComponents[i].id]) {
                        (this.enableInWorld as any) = false;
                        break;
                    }
                }
                if (enableInWorld !== this.enableInWorld) {
                    this.changeEnableInWorld();
                }
            }
        }

        /**
         * @internal
         */
        private changeEnableInWorld() {
            let classType = this.classType;
            if (this.enableInWorld) {
                for (let i = 0; i < classType.types.length; i++) {
                    let clazz = classType.types[i];
                    this.entity.componentEnableCount[clazz.id]++;
                    if (this.entity.componentEnableCount[clazz.id] === 1) {
                        if (this.entity.componentsRequire[clazz.id]) {
                            let list = this.entity.componentsRequire[clazz.id];
                            for (let i = 0; i < list.length; i++) {
                                list[i].checkEnableInWorld();
                            }
                        }
                    }
                }
                this.world && this.world.onAddComponent(this.entity, this);
            } else {
                for (let i = 0; i < classType.types.length; i++) {
                    let clazz = classType.types[i];
                    this.entity.componentEnableCount[clazz.id]--;
                    if (this.entity.componentEnableCount[clazz.id] < 0) {
                        debug && error(EMError.COMPONENT_REQUIRE_COUNT);
                    }
                    if (this.entity.componentEnableCount[clazz.id] === 0) {
                        if (this.entity.componentsRequire[clazz.id]) {
                            let list = this.entity.componentsRequire[clazz.id];
                            for (let i = 0; i < list.length; i++) {
                                list[i].checkEnableInWorld();
                            }
                        }
                    }
                }
                this.world && this.world.onRemoveComponent(this.entity, this);
            }
        }

        /**
         * 在整个世界中是否有效，依赖自身和 requireComponents 的 enable 属性
         */
        readonly enableInWorld: boolean = true;

        init?(...args);
        afterInit?();
        awake?();
        start?();
        update?(dt?: number);
        lateUpdate?(dt?: number, ut?: number);
        onDestroy?();

        addComponent<T extends Component>(componentClass: IComponentClass<T>, ...args): T {
            return this.entity ? this.entity.addComponent.apply(this.entity, arguments) : null;
        }

        removeComponent<T extends Component>(componentClass: IComponentClass<T> | T): T {
            return this.entity ? this.entity.removeComponent(componentClass) : null;
        }

        removeComponents<T extends Component>(componentClass: IComponentClass<T>) {
            this.entity && this.entity.removeComponents(componentClass);
        }

        getComponent<T extends Component>(componentClass: IComponentClass<T>): T {
            return this.entity ? this.entity.getComponent(componentClass) : null;
        }

        getComponents<T extends Component>(componentClass: IComponentClass<T>): T[] {
            return this.entity ? this.entity.getComponents(componentClass) : null;
        }

        getComponentsInParent<T extends Component>(componentClass: IComponentClass<T>): T[] {
            return this.entity ? this.entity.getComponentsInParent(componentClass) : null;
        }

        getComponentsInChildren<T extends Component>(componentClass: IComponentClass<T>): T[] {
            return this.entity ? this.entity.getComponentsInChildren(componentClass) : null;
        }

        get transform(): Transform {
            return this.entity && this.entity.transform;
        }

        get world(): World {
            return this.entity && this.entity.world;
        }

        get parent(): Entity {
            return this.entity && this.entity.parent;
        }

        set parent(val: Entity) {
            if (this.entity) {
                this.entity.parent = val;
            }
        }

        /**
         * 
         * @param type 接受 entity 内的广播
         * @param args 
         */
        receive?(type: string, ...args);


        dispatch(type: string, ...args) {
            this.entity.dispatch.apply(this.entity, arguments);
        }

        getChildByName(name: string) {
            if (!this.entity) return null;
            return this.entity.getChildByName(name);
        }

        getChildByPath(name: string) {
            if (!this.entity) return null;
            return this.entity.getChildByPath(name);
        }

        static componentDestroyedPoints = new Link<{ id: number, call: Function }>();

        /**
         * 不应该覆盖的方法
         */
        destroy() {
            if (!this.isAlive) {
                debug && error(EMError.COMPONENT_HAS_DESTROYED, this);
                return;
            }
            this.entity && this.entity.removeComponent(this, true);
        }

        static type: ComponentType;

        /**
         * @internal
         * @param world 
         * @param componentClass 
         */
        static register(componentClass: IComponentClass<Component>) {
            if (componentClass.classType && componentClass.classType.define === componentClass || componentClass == Component as any) return;
            let type = new ComponentType();
            (componentClass.classType as any) = type;
            ObjectPools.setId(type);
            (type.define as any) = componentClass;
            (componentClass.id as any) = type.id;
            (type.name as any) = componentClass.name;
            (type.newCount as any) = 0;
            (type.realNewCount as any) = 0;
            (type.allowMultiply as any) = componentClass.allowMultiply;
            (type.typeMap as any) = {};
            ObjectPools.componentClasses.push(type.define);
            type.requireComponents = [];
            for (let requireComponentClass of componentClass.requireComponents) {
                this.register(requireComponentClass);
                !~type.requireComponents.indexOf(requireComponentClass.classType) && type.requireComponents.push(requireComponentClass.classType);
            }
            this.componentClasses[type.id] = componentClass;
            (type.types as any) = [type];
            type.typeMap[type.id] = type;
            let parent;
            if (!componentClass["__proto__"].virtualComponent) {
                this.register(componentClass["__proto__"]);
                parent = componentClass["__proto__"];
            }
            while (parent && parent != Component) {
                if (parent.virtualComponent) break;
                for (let requireComponentClass of parent.classType.requireComponents) {
                    !~type.requireComponents.indexOf(requireComponentClass) && type.requireComponents.push(requireComponentClass);
                }
                (type.types as any).push(parent.classType);
                type.typeMap[parent.classType.id] = parent.classType;
                parent = parent["__proto__"];
            }
            (type.recycleEnable as any) = componentClass.recycleEnable;
            if (componentClass["__proto__"] && !componentClass["__proto__"].virtualComponent) {
                (type.recycleEnable as any) = componentClass.recycleEnable && componentClass["__proto__"].recycleEnable;
            }
            this.onRegister.dispatch(type);
        }

        /**
         * @internal
         */
        private static onRegister = new ecs.Broadcast<ComponentType>();

        /**
         * @internal
         */
        private static componentClasses: IComponentClass<Component>[] = [];

        static aliveCount: number = 0;
        static newCount: number = 0;
        static realNewCount: number = 0;
        static allowMultiply: boolean = true;
        static requireComponents: IComponentClass<any>[] = [];
        static recycleEnable: boolean = false;
        static virtualComponent: boolean = false;

        static syncComponents: { [index: string]: IComponentClass<any> } = {};
    }

    export enum EMSyncType {
        BASE,
        COMPONENT,
        // ARRAY_COMPONENT
    }

    export function sync(writable: boolean = true, type: EMSyncType = EMSyncType.BASE) {
        return function (target: any, key: string, descriptor?: PropertyDescriptor) {
            let name = target.constructor.name;
            if (!Component.syncComponents[name]) {
                Component.syncComponents[name] = target.constructor;
            } else if (Component.syncComponents[name] != target.constructor) {
                Component.syncComponents[name] = target.constructor;
                debug && error(EMError.SYNC_COMPONENT_SAME_NAME, name);
            }
            if (descriptor) {
                let set = descriptor.set;
                descriptor.set = function (this: Component, val: any) {
                    let p: SyncProperty;
                    if (!this.syncProperties.hasId(key)) {
                        if (SyncProperty.pools.length) {
                            p = SyncProperty.pools.pop();
                        } else {
                            p = new SyncProperty();
                        }
                        p.id = key;
                        p.writable = World.subWorld ? !writable : writable;
                        p.type = type;
                        p.target = this;
                        p.hasChange = false;
                        p.value = null;
                        p.reValue = false;
                        this.syncProperties.add(p);
                    } else {
                        p = this.syncProperties.getById(key);
                    }
                    if (p.type === EMSyncType.COMPONENT) {
                        if (val && typeof val !== 'number') {
                            val = val.id;
                        }
                        if (World.isSyncing && World.subWorld) {
                            p.reValue = true;
                        }
                    }
                    //  else if (p.type === EMSyncType.ARRAY_COMPONENT && val.length) {
                    //     if (val && typeof val[0] !== 'number') {
                    //         for (let i = 0; i < val.length; i++) {
                    //             val[i] = val[i].id;
                    //         }
                    //     }
                    //     if (World.isSyncing && World.subWorld) {
                    //         p.reValue = true;
                    //     }
                    // }
                    if (p.value === val) return;
                    p.value = val;
                    set.call(this, val);
                    p.hasChange = p.writable ? true : false;
                    if (this.world && !this.world.syncComponents.has(this)) {
                        this.world.syncComponents.add(this);
                    }
                }
            } else {
                Object.defineProperty(target, key, {
                    set: function (this: Component, val: any) {
                        let p: SyncProperty;
                        if (!this.syncProperties.hasId(key)) {
                            if (SyncProperty.pools.length) {
                                p = SyncProperty.pools.pop();
                            } else {
                                p = new SyncProperty();
                            }
                            p.id = key;
                            p.writable = World.subWorld ? !writable : writable;
                            p.type = type;
                            p.target = this;
                            p.hasChange = false;
                            p.value = null;
                            // if (p.type === EMSyncType.ARRAY_COMPONENT) {
                            //     p.value = new SyncArray();
                            //     p.value.prop = p;
                            // }
                            p.reValue = false;
                            this.syncProperties.add(p);
                        } else {
                            p = this.syncProperties.getById(key);
                        }
                        if (p.type === EMSyncType.COMPONENT) {
                            if (val && typeof val !== 'number') {
                                val = val.id;
                            }
                            if (World.isSyncing && World.subWorld) {
                                p.reValue = true;
                            }
                        }
                        // else if (p.type === EMSyncType.ARRAY_COMPONENT && val.length) {
                        //     if (val && typeof val[0] !== 'number') {
                        //         p.value.length = val.length;
                        //         for (let i = 0; i < val.length; i++) {
                        //             p.value[i] = val[i].id;
                        //         }
                        //     }
                        //     if (World.isSyncing && World.subWorld) {
                        //         p.reValue = true;
                        //     }
                        // }
                        if (p.value === val) return;
                        p.value = val;
                        p.hasChange = p.writable ? true : false;
                        if (this.world && !this.world.syncComponents.has(this)) {
                            this.world.syncComponents.add(this);
                        }
                    },
                    get: function (this: Component) {
                        let p: SyncProperty;
                        if (!this.syncProperties.hasId(key)) {
                            return;
                        } else {
                            p = this.syncProperties.getById(key);
                        }
                        if (p.type === EMSyncType.COMPONENT) {
                            if (p.reValue) return ObjectPools.all[World.syncIds[p.value]];
                            return ObjectPools.all[p.value];
                        }
                        // else if (p.type === EMSyncType.ARRAY_COMPONENT) {

                        // }
                        return p.value;
                    },
                    enumerable: true,
                    configurable: true
                });
            }

        };
    }

    export class SyncProperty {

        id: string;

        target: Component;

        type: EMSyncType;

        value: any;

        reValue: boolean;

        hasChange: boolean;

        writable: boolean;

        static id = 0;

        static pools: SyncProperty[] = [];
    }

    class SyncArray<T> extends Array<T> {

        prop: SyncProperty;

        private _length: number = 0;

        get length(): number {
            return this._length;
        }

        set length(val: number) {
            if (val === this._length) return;
            if (val < 0) val = 0;
            if (val < this._length) {
                this.splice(val, this._length - val);
                this._length = val;
            } else {
                this._length = val;
            }
        }

        /**
          * Removes the last element from an array and returns it.
          */
        pop(): T | undefined {
            this.prop.hasChange = true;
            if (this._length > 0) this._length--;
            return super.pop.apply(this);
        }

        /**
          * Appends new elements to an array, and returns the new length of the array.
          * @param items New elements of the Array.
          */
        push(...items: T[]): number {
            this.prop.hasChange = true;
            this._length += items.length;
            return super.push.apply(this, arguments);
        }

        /**
          * Removes the first element from an array and returns it.
          */
        shift(): T | undefined {
            this.prop.hasChange = true;
            if (this._length > 0) this._length--;
            return super.shift.apply(this);
        }

        /**
          * Sorts an array.
          * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
          */
        sort(compareFn?: (a: T, b: T) => number): this {
            this.prop.hasChange = true;
            return super.sort.apply(this, arguments);
        }
        /**
          * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
          * @param start The zero-based location in the array from which to start removing elements.
          * @param deleteCount The number of elements to remove.
          */
        splice(start: number, deleteCount: number, ...items: T[]): T[] {
            this.prop.hasChange = true;
            if (deleteCount > 0) {
                this._length -= Math.min(deleteCount, this._length - start);
            } else {
                this._length += items.length;
            }
            return super.splice.apply(this, arguments);
        }

        /**
          * Inserts new elements at the start of an array.
          * @param items  Elements to insert at the start of the Array.
          */
        unshift(...items: T[]): number {
            this.prop.hasChange = true;
            this._length += items.length;
            return super.unshift.apply(this, arguments);
        }

    }

    export class ComponentType {

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

        readonly typeMap: { [index: number]: ComponentType };
    }

    export interface IComponentClass<T extends Component> {
        /**
         * 类型 id ，快速区分不同类型
         * @internal
         */
        readonly id: number;

        /**
         * @internal
         */
        readonly classType: ComponentType;

        readonly allowMultiply: boolean;

        readonly recycleEnable: boolean;

        requireComponents: IComponentClass<any>[];

        new(): T;

        /**
         * @internal
         */
        register(componentClass: IComponentClass<T>);
    }
}

