namespace ecs {

    export class World {

        static subWorld: boolean = false;

        entities = new Link<Entity>();
        queries: Query<any>[] = [];
        systems: System<any>[] = [];
        subWorld: boolean = false;
        syncWorldEnable: boolean = false;

        readonly root: RootEntity;

        syncComponents = new Link<Component>();
        syncDeleteComponents: number[] = [];
        static syncIds: { [index: number]: number } = { 0: 0 };
        static resyncIds: { [index: number]: number } = { 0: 0 };
        static isSyncing: boolean = false;
        syncFrames: SyncWorld[] = [];
        syncSystems: {
            system: string,
            components: string[] | string
        }[] = [];
        syncDeleteSystems: string[] = [];
        waitToSyncFrames: SyncWorld[] = [];

        constructor() {
            this.root = new RootEntity();
            (this.root.world as any) = this;
            this.onAddEntity(this.root);
            this._lastTime = Date.now();
            this.addSystem(AwakeSystem);
            this.addSystem(StartSystem);
            this.addSystem(UpdateSystem);
            this.addSystem(LateUpdateSystem);
        }

        /**
         * @internal
         */
        private _lastTime: number;

        runInfo: RunInfo = new RunInfo;

        update(dt?: number) {
            World.subWorld = this.subWorld;
            while (this.waitToSyncFrames.length) {
                this.decodeSyncComponents(this.waitToSyncFrames.shift());
            }
            let start = Date.now();
            dt = dt != null ? dt : (start - this._lastTime);
            if (dt < 0) dt = 0;
            this._lastTime = start;
            for (let sys of this.systems) {
                if (!sys.isRunning) continue;
                if (sys.updateFixTime) {
                    let sysdt = dt;
                    while (sysdt >= sys.updateFixTime) {
                        sys.update && sys.update(sys.updateFixTime);
                        sysdt -= sys.updateFixTime;
                    }
                    sys.updateMoreTime = sysdt;
                } else {
                    sys.update && sys.update(dt);
                }

            }
            let ut = (Date.now() - start);
            for (let sys of this.systems) {
                if (!sys.isRunning) continue;
                if (sys.lateUpdateFixTime) {
                    let sysdt = dt;
                    let sysut = ut;
                    while (sysdt >= sys.lateUpdateFixTime) {
                        sysdt -= sys.lateUpdateFixTime;
                        ut -= sys.lateUpdateFixTime;
                    }
                    sysdt = dt;
                    while (sysdt >= sys.lateUpdateFixTime) {
                        sysut += sys.lateUpdateFixTime;
                        sys.lateUpdate && sys.lateUpdate(sys.lateUpdateFixTime, sysut);
                        sysdt -= sys.updateFixTime;
                    }
                } else {
                    sys.lateUpdate && sys.lateUpdate(dt, ut);
                }

            }
            let at = Date.now() - start;
            // if (at < 5 || ObjectPools.linkPrePool.length > 10000) {
            //     ObjectPools.clearLinkPrePool();
            // }
            ObjectPools.clearLinkPrePool();
            this.runInfo.frame++;
            this.runInfo.lastProcessTime = at;
            if (this.syncWorldEnable) {
                if (this.syncComponents.length || !this.subWorld && this.syncDeleteComponents.length ||
                    this.syncSystems.length || !this.subWorld && this.syncDeleteSystems.length) {
                    this.syncFrames.push(this.encodeSyncWorld());
                }
            }
        }

        onUpdateEnd: Function;

        onAddEntity(entity: Entity) {
            this.entities.add(entity);
            for (let component of entity.components) {
                if (component.syncProperties.length) {
                    if (!this.syncComponents.has(component)) {
                        this.syncComponents.add(component);
                    }
                }
            }
            if (entity.components.length) {
                for (let i = 0, len = this.queries.length; i < len; i++) {
                    this.queries[i].onAddEntity(entity);
                }
            }
        }

        onRemoveEntity(entity: Entity) {
            this.entities.remove(entity);
            if (entity.components.length) {
                for (let component of entity.components) {
                    if (component.syncProperties.length) {
                        this.syncComponents.remove(component);
                        this.syncDeleteComponents.push(component.id);
                        for (let node = component.syncProperties.head; node; node = node.next) {
                            node.value.target = null;
                            SyncProperty.pools.push(node.value);
                        }
                        component.syncProperties.clear();
                    }
                }
                for (let i = 0, len = this.queries.length; i < len; i++) {
                    this.queries[i].onRemoveEntity(entity);
                }
            }
        }

        onAddComponent(entity: Entity, component: Component) {
            if (component.syncProperties.length) {
                if (!this.syncComponents.has(component)) {
                    this.syncComponents.add(component);
                }
            }
            for (let i = 0; i < this.queries.length; i++) {
                this.queries[i].onAddComponent(entity, component);
            }
        }

        onRemoveComponent(entity: Entity, component: Component) {
            for (let i = 0; i < this.queries.length; i++) {
                this.queries[i].onRemoveComponent(entity, component);
            }
        }

        addSystem<T extends IdObject>(systemClass: { new(): System<T> }, initArgs?: string | IComponentClass<any>[]) {
            if (initArgs && !(typeof initArgs === 'string')) {
                for (let comp of initArgs) {
                    Component.register(comp);
                }
            }
            let data = System.syncSystemClasses[systemClass.name];
            if (this.syncWorldEnable && data && !this.subWorld) {
                let comps;
                if (typeof initArgs === 'string') comps = initArgs;
                else {
                    comps = [];
                    for (let comp of initArgs) {
                        comps.push(comp.classType.name);
                    }
                }
                this.syncSystems.push({
                    system: systemClass.name,
                    components: comps
                });
                if (data.mode === EMSyncSystemMode.SUB_WORLD_ONLY) return;
            }
            let system = ecs.ObjectPools.createRecyableObject(systemClass, initArgs);
            if (this.systems.indexOf(system) !== -1) return;
            this.systems.push(system);
            if (system.query) {
                this.queries.push(system.query);
                for (let entityNode = this.entities.head; entityNode; entityNode = entityNode.next) {
                    system.query.onAddEntity(entityNode.value);
                }
            }
        }

        removeSystem<T extends IdObject>(system: System<T> | { new(): System<T> }) {
            let systemClass: { new(): System<T> };
            let singleSystem: System<T>;
            if (system instanceof System) {
                systemClass = system.constructor as any;
                singleSystem = system;
            } else {
                systemClass = system;
            }
            let data = System.syncSystemClasses[systemClass.name];
            if (data && !this.subWorld) {
                this.syncDeleteSystems.push(systemClass.name);
                if (data.mode === EMSyncSystemMode.SUB_WORLD_ONLY) return;
            }
            for (let i = 0; i < this.systems.length; i++) {
                let sys = this.systems[i];
                if (sys instanceof systemClass) {
                    if (!singleSystem || singleSystem && singleSystem === sys) {
                        this.systems.splice(this.systems.indexOf(sys), 1);
                        sys.query && this.queries.splice(this.queries.indexOf(sys.query), 1);
                        sys.destroy();
                        if (sys.constructor["recycleEnable"]) {
                            ecs.ObjectPools.releaseRecyableObject(sys);
                        } else {
                            ecs.ObjectPools.releaseId(sys.id);
                        }
                        i--;
                    }
                }
            }
        }

        encodeSyncWorld(): SyncWorld {
            let components = this.syncComponents;
            let entities = {};
            let entityList = [];
            for (let node = components.head; node; node = node.next) {
                if (node.value.syncProperties.length) {
                    let entity: any;
                    let id = node.value.entity.id;
                    if (this.subWorld) id = World.resyncIds[id];
                    if (entities[id] == null) {
                        entities[id] = {
                            id: id,
                            components: []
                        };
                        entityList.push(entities[id]);
                    }
                    entity = entities[id];
                    id = node.value.id;
                    if (this.subWorld) id = World.resyncIds[id];
                    let obj = {
                        define: node.value.classType.name,
                        id: id,
                    }
                    for (let p = node.value.syncProperties.head; p; p = p.next) {
                        if (p.value.hasChange) {
                            if (p.value.type === EMSyncType.BASE) obj[p.value.id] = p.value.value;
                            else if (p.value.type === EMSyncType.COMPONENT) {
                                if (!this.subWorld) obj[p.value.id] = p.value.value;
                                else {
                                    if (p.value.reValue) obj[p.value.id] = p.value.value;
                                    else obj[p.value.id] = World.resyncIds[p.value.value];
                                }
                                if (obj[p.value.id] == null) obj[p.value.id] = 0;
                            }
                            p.value.hasChange = false;
                        }
                    }
                    entity.components.push(obj);
                }
            }
            this.syncComponents.clear(false);
            let ids = this.subWorld ? [] : this.syncDeleteComponents.concat();
            this.syncDeleteComponents.length = 0;
            let syncSystems = this.syncSystems.concat();
            this.syncSystems.length = 0;
            let syncDeleteSystems = this.subWorld ? [] : this.syncDeleteSystems.concat();
            this.syncDeleteSystems.length = 0;
            return {
                entities: entityList,
                deleteIds: ids,
                systems: syncSystems,
                deleteSystems: syncDeleteSystems
            };
        }

        decodeSyncComponents(syncWorld: SyncWorld) {
            if (!syncWorld) return;
            World.isSyncing = true;
            let world = this;
            if (syncWorld.systems.length) {
                for (let syncSystem of syncWorld.systems) {
                    let systemClass = System.syncSystemClasses[syncSystem.system].define;
                    let comps;
                    if (syncSystem.components) {
                        if (typeof syncSystem.components === 'string') comps = syncSystem.components;
                        else {
                            comps = [];
                            for (let syncComponent of syncSystem.components) {
                                comps.push(Component.syncComponents[syncComponent]);
                            }
                        }
                    }
                    this.addSystem(systemClass, comps);
                }
            }
            if (syncWorld.deleteSystems.length) {
                for (let syncSystem of syncWorld.deleteSystems) {
                    let systemClass = System.syncSystemClasses[syncSystem].define;
                    this.removeSystem(systemClass);
                }
            }
            if (syncWorld.entities.length) {
                for (let syncEntity of syncWorld.entities) {
                    let entity: ecs.Entity;
                    if (this.subWorld) {
                        if (!World.syncIds[syncEntity.id]) {
                            entity = ecs.Entity.create();
                            World.syncIds[syncEntity.id] = entity.id;
                            World.resyncIds[entity.id] = syncEntity.id;
                            entity.parent = world.root;
                        } else {
                            entity = ecs.ObjectPools.all[World.syncIds[syncEntity.id]];
                        }
                    } else {
                        entity = ecs.ObjectPools.all[syncEntity.id];
                        if (!entity) continue;
                    }
                    for (let syncComponent of syncEntity.components) {
                        let component: ecs.Component;
                        if (this.subWorld) {
                            if (!World.syncIds[syncComponent.id]) {
                                component = entity.addComponent(ecs.Component.syncComponents[syncComponent.define]);
                                World.syncIds[syncComponent.id] = component.id;
                                World.resyncIds[component.id] = syncComponent.id;
                            } else {
                                component = ecs.ObjectPools.all[World.syncIds[syncComponent.id]];
                            }
                        } else {
                            component = ecs.ObjectPools.all[syncComponent.id];
                            if (!component) continue;
                        }
                        for (let key in syncComponent) {
                            if (key === "id") continue;
                            component[key] = syncComponent[key];
                        }
                    }
                }
            }
            if (syncWorld.deleteIds.length) {
                for (let id of syncWorld.deleteIds) {
                    if (!World.syncIds[id]) continue;
                    let reid = World.syncIds[id];
                    delete World.syncIds[id];
                    delete World.resyncIds[reid];
                    let comp = ecs.ObjectPools.all[reid];
                    if (!comp) continue;
                    let entity = comp.entity;
                    comp.destroy();
                    if (entity && entity.components.length === 0) {
                        reid = entity.id;
                        id = World.resyncIds[reid];
                        delete World.syncIds[id];
                        delete World.resyncIds[reid];
                        entity.destroy();
                    }
                }
            }
            World.isSyncing = false;
        }

        /**
         * @internal
         */
        $scene: Scene;

        public get scene(): Scene {
            return this.$scene;
        }

        public set scene(val: Scene) {
            this.$scene && (this.$scene.parent = null);
            this.$scene = val;
            this.$scene && (this.$scene.parent = this.root);
        }
    }

    class RootEntity extends Entity {

        constructor() {
            super();
            Entity.realNewCount++;
            Entity.newCount++;
            Entity.aliveCount++;
            Entity.onCreateEntity && Entity.onCreateEntity(this);
        }

        $setParent() {
            return;
        }

        $setWorld() {
            return;
        }
    }

    export interface SyncWorld {
        entities: {
            id: number,
            components: {
                define: string;
                [index: string]: any;
                id: number;
            }[]
        }[],
        deleteIds: number[],
        systems: {
            system: string,
            components: string[] | string
        }[],
        deleteSystems: string[]
    }
}

window["ecs"] = ecs;