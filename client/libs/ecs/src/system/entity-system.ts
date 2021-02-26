namespace ecs {

    export abstract class EntitySystem extends System<Entity> {

        init(componentClasses: IComponentClass<Component>[]) {
            super.init(ecs.ObjectPools.createRecyableObject(EntityQuery as any, componentClasses));
        }

    }
}

