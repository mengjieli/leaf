namespace ecs {

    export class Entity extends Broadcast<any> {

        readonly id: number;

        /**
         * 以 ComponentTypeId 为 key
         */
        readonly components: Component[] = [];

        /**
         * @internal
         */
        readonly componentTypes: Component[][] = [];

        /**
         * @internal
         */
        readonly componentEnableCount: number[] = [];

        /**
         * @internal
         */
        readonly componentsRequire: Component[][] = [];

        readonly children: ReadonlyArray<Entity> = [];
        readonly world: World;
        // _world: World;
        // get world(): World { return this._world; }
        // set world(val: World) {
        //     this._world = val;
        // }

        readonly isAlive: boolean = true;

        readonly transform: Transform = new Transform(this);

        tag: string;
        name: string;
        type: number = 0;

        /**
         * @internal
         */
        static componentCreatedPoints = new Link<{ id: number, call: Function }>();

        addComponent<T extends Component>(componentClass: IComponentClass<T> | T, ...args): T {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            let classType: ComponentType;
            let component: T;
            let createComponent = false;
            if (!componentClass.classType || componentClass.id === componentClass.classType.id) {
                Component.register((componentClass as IComponentClass<T>));
                classType = componentClass.classType;
                for (let i = 0; i < classType.requireComponents.length; i++) {
                    if (!this.componentTypes[classType.requireComponents[i].id] || !this.componentTypes[classType.requireComponents[i].id].length) {
                        debug && error(EMError.COMPONENT_REQUIRE, componentClass.classType.name, classType.requireComponents[i].name);
                        return;
                    }
                }
                if (!classType.allowMultiply && this.componentTypes[componentClass.classType.id] &&
                    this.componentTypes[componentClass.classType.id].length) {
                    debug && error(EMError.NOT_ALLOW_MUTIPLY_COMPONENT, componentClass.classType.name);
                    return;
                }
                $newComponent = false;
                component = $componentRecyclePool && $componentRecyclePool.createComponent((componentClass as IComponentClass<T>)) || new (componentClass as IComponentClass<T>)();
                if ($newComponent) {
                    (componentClass.classType.realNewCount as any)++;
                    Component.realNewCount++;
                }
                createComponent = true;
            } else {
                classType = componentClass.classType;
                if (!classType.allowMultiply && this.componentTypes[componentClass.classType.id] &&
                    this.componentTypes[componentClass.classType.id].length) {
                    debug && error(EMError.NOT_ALLOW_MUTIPLY_COMPONENT, componentClass.classType.name);
                    return;
                }
                component = componentClass as T;
            }
            (component.isAlive as any) = true;
            (classType.newCount as any)++;
            Component.newCount++;
            Component.aliveCount++;
            (component.classType as any) = classType;
            this.components.push(component);
            for (let i = 0; i < classType.types.length; i++) {
                let id = classType.types[i].id;
                if (!this.componentTypes[id]) {
                    this.componentTypes[id] = [];
                    this.componentEnableCount[id] = 0;
                }
                this.componentTypes[classType.types[i].id].push(component);
                this.componentEnableCount[classType.types[i].id]++;
            }
            (component.entity as any) = this;
            component.checkEnableInWorld();
            if (classType.requireComponents.length) {
                let list = classType.requireComponents;
                for (let i = 0; i < list.length; i++) {
                    if (!this.componentsRequire[list[i].id]) {
                        this.componentsRequire[list[i].id] = [];
                    }
                    this.componentsRequire[list[i].id].push(component);
                }
            }
            let id = (component.id as any);
            if (Entity.componentCreatedPoints.length) {
                for (let node = Entity.componentCreatedPoints.head; node; node = node.next) {
                    if (node.value.id === id) {
                        node.value.call && node.value.call();
                        Entity.componentCreatedPoints.remove(node.value);
                    }
                }
            }
            createComponent && component.init && component.init.apply(component, args);
            if (component.id != id || !component.isAlive) return;
            createComponent && component.afterInit && component.afterInit();
            if (component.id != id || !component.isAlive) return;
            this.world && this.world.onAddComponent(this, component);
            if (component.id != id || !component.isAlive) return;
            return component;
        }

        removeComponent<T extends Component>(componentClass: IComponentClass<T> | T, atuoDestroy: boolean = true): T {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            let component: T;
            let componentIndex: number = -1;
            if (!componentClass.classType || componentClass.id === componentClass.classType.id) {
                Component.register((componentClass as IComponentClass<T>));
                if (!this.componentTypes[componentClass.id] || !this.componentTypes[componentClass.id].length) return;
                component = this.componentTypes[componentClass.id][0] as T;
                componentIndex = this.components.indexOf(component);
                if (componentIndex == -1) {
                    debug && error(EMError.COMPONENT_REMOVED_INDEX_ERROR, componentClass.classType.name);
                    return;
                }
            } else {
                component = componentClass as T;
                componentClass = component.constructor as any;
                componentIndex = this.components.indexOf(component);
                if (componentIndex == -1) {
                    debug && error(EMError.COMPONENT_REMOVED_INDEX_ERROR, componentClass.classType.name);
                    return;
                }
            }
            let classType = componentClass.classType;
            let types = classType.types;
            for (let i = 0; i < types.length; i++) {
                if (this.componentsRequire[types[i].id] && this.componentsRequire[types[i].id].length) {
                    if (this.componentTypes[types[i].id].length === 1) {
                        debug && error(EMError.COMPONENT_REQUIRE_DELETE, types[i].name);
                        return;
                    }
                }
            }
            let enable = component.enableInWorld;
            if (classType.requireComponents.length) {
                let list = classType.requireComponents;
                for (let i = 0; i < list.length; i++) {
                    let index = this.componentsRequire[list[i].id].indexOf(component);
                    if (index === -1) {
                        debug && error(EMError.COMPONENT_HAS_DESTROYED, this);
                    } else {
                        this.componentsRequire[list[i].id].splice(index, 1);
                    }
                }
            }
            if (Component.componentDestroyedPoints.length) {
                for (let node = Component.componentDestroyedPoints.head; node; node = node.next) {
                    if (node.value.id === component.id) {
                        node.value.call && node.value.call();
                        Component.componentDestroyedPoints.remove(node.value);
                    }
                }
            }
            component.onDestroy && component.onDestroy();
            this.world && this.world.onRemoveComponent(this, component);
            (component.entity as any) = null;
            for (let i = 0; i < classType.types.length; i++) {
                let clazz = classType.types[i];
                let index = this.componentTypes[clazz.id].indexOf(component);
                if (index == this.componentTypes[clazz.id].length - 1) this.componentTypes[clazz.id].pop();
                else if (index >= 0) this.componentTypes[clazz.id].splice(index, 1);
                if (enable) {
                    this.componentEnableCount[clazz.id]--;
                    if (this.componentEnableCount[clazz.id] < 0) {
                        debug && error(EMError.COMPONENT_HAS_DESTROYED, this);
                    }
                    if (this.componentsRequire.length && this.componentEnableCount[clazz.id] <= 0) {
                        let list = this.componentsRequire[clazz.id];
                        if (list) {
                            for (let i = 0; i < list.length; i++) {
                                list[i].checkEnableInWorld();
                            }
                        }
                    }
                }
            }
            if (componentIndex === this.components.length - 1) this.components.pop();
            else this.components.splice(componentIndex, 1);
            if (atuoDestroy) {
                (component.entity as any) = null;
                (component.isAlive as any) = false;
                if (component.syncProperties.length) {
                    this.world.syncComponents.remove(component);
                    this.world.syncDeleteComponents.push(component.id);
                    for (let node = component.syncProperties.head; node; node = node.next) {
                        node.value.target = null;
                        SyncProperty.pools.push(node.value);
                    }
                    component.syncProperties.clear();
                }
                component._enabled = true;
                (component.enableInWorld as any) = true;
                (component.lifeCount as any)++;
                Component.aliveCount--;
                component.classType.recycleEnable && $componentRecyclePool && $componentRecyclePool.releaseComponent(component);
                ObjectPools.releaseId(component.id);
            } else {
                if (component.syncProperties.length) {
                    for (let node = component.syncProperties.head; node; node = node.next) {
                        node.value.hasChange = true;
                    }
                }
            }
            return atuoDestroy ? null : component;
        }

        removeComponents<T extends Component>(componentClass: IComponentClass<T>, atuoDestroy: boolean = true) {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            Component.register((componentClass as IComponentClass<T>));
            let components: T[] = this.componentTypes[componentClass.id] as T[];
            if (!components || !components.length) return;
            for (let i = 0; i < components.length; i++) {
                components[i].onDestroy && components[i].onDestroy();
            }
            while (components.length) {
                let component = components.pop();
                this.world && this.world.onRemoveComponent(this, component);
                let enable = component.enableInWorld;
                let classType = componentClass.classType;
                let types = classType.types;
                for (let i = 0; i < types.length; i++) {
                    if (this.componentsRequire[types[i].id] && this.componentsRequire[types[i].id].length) {
                        if (this.componentTypes[types[i].id].length === 1) {
                            debug && error(EMError.COMPONENT_REQUIRE_DELETE, types[i].name);
                            return;
                        }
                    }
                }
                if (classType.requireComponents.length) {
                    let list = classType.requireComponents;
                    for (let i = 0; i < list.length; i++) {
                        let index = this.componentsRequire[list[i].id].indexOf(component);
                        if (index === -1) {
                            debug && error(EMError.COMPONENT_HAS_DESTROYED, this);
                        } else {
                            this.componentsRequire[list[i].id].splice(index, 1);
                        }
                    }
                }
                if (Component.componentDestroyedPoints.length) {
                    for (let node = Component.componentDestroyedPoints.head; node; node = node.next) {
                        if (node.value.id === component.id) {
                            node.value.call && node.value.call();
                            Component.componentDestroyedPoints.remove(node.value);
                        }
                    }
                }
                (component.entity as any) = null;
                for (let i = 0; i < classType.types.length; i++) {
                    let clazz = classType.types[i];
                    let index = this.componentTypes[clazz.id].indexOf(component);
                    if (index == this.componentTypes[clazz.id].length - 1) this.componentTypes[clazz.id].pop();
                    else if (index >= 0) this.componentTypes[clazz.id].splice(index, 1);
                    if (enable) {
                        this.componentEnableCount[clazz.id]--;
                        if (this.componentEnableCount[clazz.id] < 0) {
                            debug && error(EMError.COMPONENT_HAS_DESTROYED, this);
                        }
                        if (this.componentsRequire.length && this.componentEnableCount[clazz.id] <= 0) {
                            let list = this.componentsRequire[clazz.id];
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    list[i].checkEnableInWorld();
                                }
                            }
                        }
                    }
                }
                let componentIndex = this.components.indexOf(component);
                if (componentIndex === this.components.length - 1) this.components.pop();
                else this.components.splice(componentIndex, 1);
                if (atuoDestroy) {
                    (component.entity as any) = null;
                    (component.isAlive as any) = false;
                    if (component.syncProperties.length) {
                        this.world.syncComponents.remove(component);
                        this.world.syncDeleteComponents.push(component.id);
                        for (let node = component.syncProperties.head; node; node = node.next) {
                            node.value.target = null;
                            SyncProperty.pools.push(node.value);
                        }
                        component.syncProperties.clear();
                    }
                    component._enabled = true;
                    (component.enableInWorld as any) = true;
                    (component.lifeCount as any)++;
                    Component.aliveCount--;
                    component.classType.recycleEnable && $componentRecyclePool && $componentRecyclePool.releaseComponent(component);
                    ObjectPools.releaseId(component.id);
                }
            }
        }

        getComponent<T extends Component>(componentClass: IComponentClass<T>): T {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (!componentClass.classType) return;
            return this.componentTypes[componentClass.classType.id] && this.componentTypes[componentClass.classType.id][0] as T;
        }

        getComponents<T extends Component>(componentClass: IComponentClass<T>): T[] {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (!componentClass.classType) return;
            return this.componentTypes[componentClass.classType.id] as T[];
        }

        getComponentsInParent<T extends Component>(componentClass: IComponentClass<T>): T[] {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (!componentClass.classType) return;
            let list = [];
            let parent = this.parent;
            while (parent) {
                let arr = (parent as Entity).componentTypes[componentClass.classType.id] as T[];
                if (arr) {
                    for (let c = 0; c < arr.length; c++) {
                        list.push(arr[c]);
                    }
                }
                parent = parent.parent;
            }
            return list;
        }

        getComponentsInChildren<T extends Component>(componentClass: IComponentClass<T>): T[] {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (!componentClass.classType) return;
            return this.$getComponentsInChildren(componentClass, []);
        }

        /**
         * @internal
         */
        $getComponentsInChildren<T extends Component>(componentClass: IComponentClass<T>, list: T[]): T[] {
            for (let i = 0; i < this.children.length; i++) {
                let arr = (this.children[i] as Entity).componentTypes[componentClass.classType.id] as T[];
                if (arr) {
                    for (let c = 0; c < arr.length; c++) {
                        list.push(arr[c]);
                    }
                }
                (this.children[i] as Entity).$getComponentsInChildren(componentClass, list);
            }
            return list;
        }

        dispatch(type: string, ...args) {
            for (let i = 0; i < this.components.length; i++) {
                this.components[i].receive && this.components[i].receive.apply(this.components[i], arguments);
            }
            super.dispatch.apply(this, arguments);
        }

        destroy() {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            //删除子对象
            while (this.children.length) {
                this.children[this.children.length - 1].destroy();
            }
            //调用 Component 的 onDestroy
            for (let i = this.components.length - 1; i >= 0;) {
                let component = this.components[i];
                component.onDestroy && component.onDestroy();
                this.world && this.world.onRemoveComponent(this, component);
                i--;
                if (i >= this.components.length - 1) i = this.components.length - 2;
            }
            this._parent && this.$setParent(null);
            Entity.onDestroyEntity && Entity.onDestroyEntity(this);
            //删除 Component
            for (let i = this.components.length - 1; i >= 0; i--) {
                let component = this.components[i];
                if (Component.componentDestroyedPoints.length) {
                    for (let node = Component.componentDestroyedPoints.head; node; node = node.next) {
                        if (node.value.id === component.id) {
                            node.value.call && node.value.call();
                            Component.componentDestroyedPoints.remove(node.value);
                        }
                    }
                }
                (component.entity as any) = null;
                (component.isAlive as any) = false;
                component._enabled = true;
                (component.enableInWorld as any) = true;
                (component.lifeCount as any)++;
                Component.aliveCount--;
                component.classType.recycleEnable && $componentRecyclePool && $componentRecyclePool.releaseComponent(component);
                ObjectPools.releaseId(component.id);
                this.components.pop();
            }
            this.parentChangeCount = 0;
            ObjectPools.releaseId(this.id);
            (this.componentTypes as any).length = 0;
            (this.componentEnableCount as any).length = 0;
            this.componentsRequire.length = 0;
            this.removeAll();
            ObjectPools.entities.push(this);
            (this.isAlive as any) = false;
            this.transform.reset();
            Entity.aliveCount--;
        }

        private _parent: Entity;

        parentChangeCount = 0;

        get parent(): Entity {
            return this._parent;
        }

        set parent(val: Entity) {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (this._parent == val) return;
            this.$setParent(val);
        }

        addChild(entity: Entity) {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (entity.parent == this) {
                //TODO
            } else {
                (entity as Entity).$setParent(this);
            }
        }

        addChildAt(entity: Entity, index: number) {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED, this);
                return;
            }
            if (entity.parent == this) {
                let ind = this.children.indexOf(entity);
                if (ind != index) {
                    (this.children as any).splice(ind, 1);
                    (this.children as any).splice(index, 0, entity);
                    Entity.onChangeEntityParent && Entity.onChangeEntityParent(this, index);
                }
            } else {
                (entity as Entity).$setParent(this, index);
            }
        }

        sort(call: (a: ecs.Entity, b: ecs.Entity) => number) {
            (this.children as any).sort(call);
            Entity.onSortEntityChildren && Entity.onSortEntityChildren(this);
        }

        /**
         * @internal
         * @param val 
         */
        $setParent(val: Entity, index: number = -1) {
            this.parentChangeCount++;
            if (this._parent) {
                (this._parent.children as any).splice(this._parent.children.indexOf(this), 1);
                this._parent = null;
                this.$setWorld(this._parent && this._parent.world);
                Entity.onChangeEntityParent && Entity.onChangeEntityParent(this);
            }
            this._parent = val;
            if (val) this.transform.$parent = val.transform;
            else this.transform.$parent = null;
            if (this._parent) {
                let children = this._parent.children;
                if (~index) {
                    (children as any).splice(index, 0, this);
                }
                else {
                    index = children.length;
                    (children as any).push(this);
                }
                this.$setWorld(this._parent && this._parent.world);
                Entity.onChangeEntityParent && Entity.onChangeEntityParent(this, index);
            }
        }

        getChildByName(name: string) {
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].name == name) return this.children[i];
            }
            return null;
        }

        getChildByPath(name: string) {
            let names = name.split(".");
            let entity = this;
            for (let n = 0; n < names.length; n++) {
                let find = null;
                for (let i = 0; i < entity.children.length; i++) {
                    if (entity.children[i].name == names[n]) {
                        find = entity.children[i];
                        break;
                    }
                }
                if (!find) return null;
                entity = find;
            }
            return entity;
        }

        /**
         * 
         * @internal
         * @param val 
         */
        $setWorld(val: World) {
            if (!this.isAlive) {
                debug && error(EMError.ENEIEY_HAS_DESTROYED);
                return;
            }
            if (val === this.world) return;
            !val && this.world && this.world.onRemoveEntity(this);
            (this.world as any) = val;
            this.world && this.world.onAddEntity(this);
            for (let i = 0, len = this.children.length; i < len; i++) {
                (this.children[i] as Entity).$setWorld(this.world);
            }
        }

        static aliveCount: number = 0;
        static newCount: number = 0;
        static realNewCount: number = 0;

        static create(type: number = 0, name: string = '', tag: string = ''): Entity {
            let entity: Entity;
            if (ObjectPools.entities.length) {
                entity = ObjectPools.entities.pop();
                ObjectPools.setId(entity, false);
                (entity.isAlive as any) = true;
            } else {
                entity = new Entity();
                ObjectPools.setId(entity);
                this.realNewCount++;
            }
            entity.name = name;
            entity.tag = tag;
            entity.type = type;
            this.aliveCount++;
            this.newCount++;
            this.onCreateEntity && this.onCreateEntity(entity);
            return entity;
        }

        static onCreateEntity: (entity: Entity) => any = null;
        static onDestroyEntity: (entity: Entity) => any = null;
        static onChangeEntityParent: (entity: Entity, index?: number) => any = null;
        static onSortEntityChildren: (entity: Entity) => any = null;
    }
}