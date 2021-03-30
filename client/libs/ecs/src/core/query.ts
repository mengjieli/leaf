
namespace ecs {

    export abstract class Query<T extends IdObject> extends Link<T> {

        readonly id: number;

        constructor() {
            super();
        }

        abstract onAddEntity(entity: Entity): void;
        abstract onRemoveEntity(entity: Entity): void;
        abstract onAddComponent(entity: Entity, component: Component): void;
        abstract onRemoveComponent(entity: Entity, component: Component): void;
    }

    export class EntityQuery extends Query<Entity> {

        readonly componentClassList: IComponentClass<Component>[] = [];
        readonly componentClassMap: { [index: number]: IComponentClass<Component> } = {};

        init(componentClasses: IComponentClass<Component>[]) {
            (this.componentClassList as any) = componentClasses;
            for (let i = 0; i < this.componentClassList.length; i++) {
                this.componentClassList[i].register(this.componentClassList[i]);
                this.componentClassMap[this.componentClassList[i].classType.id] = this.componentClassList[i];
            }
        }

        onAddEntity(entity: Entity) {
            if (this.componentClassList.length == 1) {
                if (!entity.componentEnableCount[this.componentClassList[0].classType.id]) {
                    return;
                }
            } else {
                let list = this.componentClassList;
                for (let i = 0; i < list.length; i++) {
                    if (!entity.componentEnableCount[list[i].classType.id]) {
                        return;
                    }
                }
            }
            this.add(entity as any);
        }

        onRemoveEntity(entity: Entity) {
            if (!this.has(entity)) return;
            this.remove(entity);
        }

        onAddComponent(entity: Entity, component: Component): void {
            // if (this.has(entity) || this.componentClassMap[component.classType.id] === undefined) return;
            if (this.has(entity)) return;
            let list = this.componentClassList;
            for (let i = 0; i < list.length; i++) {
                if (!entity.componentEnableCount[list[i].classType.id]) {
                    return;
                }
            }
            this.add(entity as any);
        }

        onRemoveComponent(entity: Entity, component: Component): void {
            // if (!this.has(entity) || this.componentClassMap[component.classType.id] === undefined) return;
            if (!this.has(entity)) return;
            let list = this.componentClassList;
            for (let i = 0; i < list.length; i++) {
                let id = list[i].classType.id;
                if (component.classType.typeMap[id]) {
                    if (entity.componentEnableCount[id] <= 1) {
                        this.remove(entity);
                        return;
                    }
                } else {
                    if (!entity.componentEnableCount[id]) {
                        this.remove(entity);
                        return;
                    }
                }
            }
        }
    }

    export class ComponentQuery extends Query<Component> {

        readonly callName: string;

        init(callName: string) {
            (this.callName as any) = callName;
        }

        onAddEntity(entity: Entity) {
            for (let i = 0; i < entity.components.length; i++) {
                let component = entity.components[i];
                if (component[this.callName] !== undefined && typeof component[this.callName] === 'function') {
                    this.add(component as any);
                }
            }
        }

        onRemoveEntity(entity: Entity) {
            for (let i = 0; i < entity.components.length; i++) {
                this.remove(entity.components[i]);
            }
        }

        onAddComponent(entity: Entity, component: Component): void {
            if (this.has(component)) return;
            if (component[this.callName] !== undefined && typeof component[this.callName] === 'function') {
                this.add(component as any);
            }
        }

        onRemoveComponent(entity: Entity, component: Component): void {
            if (!this.has(component)) return;
            this.remove(component);
        }
    }
}