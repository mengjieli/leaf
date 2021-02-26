namespace ecs {

    export abstract class ComponentSystem extends System<Component> {

        init(callName: string) {
            super.init(ecs.ObjectPools.createRecyableObject(ComponentQuery as any, callName));
        }

    }
}

