namespace tiny2d {

    export function addToWorld(world: ecs.World) {
        world.addSystem(ForceSystem, [RigidBody, Force]);
        world.addSystem(MoveSystem, [RigidBody]);
    }

    export function removeFromWorld(world: ecs.World) {
        world.removeSystem(Tiny2dSystem);
    }

    window["tiny2d"] = tiny2d;

}