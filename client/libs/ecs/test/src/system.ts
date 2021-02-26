async function testSystem() {
    await test.Case.create("System").
        add(() => {
            let world = new ecs.World();
            let scene = new ecs.Scene();
            world.scene = scene;
            world.addSystem(new PhysicSystem());
            world.addSystem(new ecs.UpdateSystem());
            world.addSystem(new ecs.LateUpdateSystem());
            let entity = ecs.Entity.create();
            entity.parent = scene;
            entity.addComponent(Position);
            entity.addComponent(Velocity, 100, 200);
            entity.addComponent(UpdateComponent);
            entity.addComponent(LateUpdateComponent);
            world.update(0.016);
            entity.getComponent(UpdateComponent).time.equal(0.016);
            entity.getComponent(LateUpdateComponent).time.equal(0.016);
            entity.getComponent(Position).x.equal(1.6);
            entity.getComponent(Position).y.equal(3.2);
            entity.removeComponent(Velocity);
            world.update(0.016);
            entity.getComponent(UpdateComponent).time.equal(0.032);
            entity.getComponent(LateUpdateComponent).time.equal(0.032);
            entity.getComponent(Position).x.equal(1.6);
            entity.getComponent(Position).y.equal(3.2);
        }).
        add(() => {
            let world = new ecs.World();
            let scene = new ecs.Scene();
            world.scene = scene;
            world.addSystem(new PhysicSystem());
            world.addSystem(new ecs.UpdateSystem());
            world.addSystem(new ecs.LateUpdateSystem());
            let entity = ecs.Entity.create();
            entity.addComponent(Position);
            entity.addComponent(Velocity, 100, 200);
            entity.addComponent(UpdateComponent);
            entity.addComponent(LateUpdateComponent);
            entity.parent = scene;
            world.update(0.016);
            entity.getComponent(UpdateComponent).time.equal(0.016);
            entity.getComponent(LateUpdateComponent).time.equal(0.016);
            entity.getComponent(Position).x.equal(1.6);
            entity.getComponent(Position).y.equal(3.2);
            entity.removeComponent(Velocity);
            world.update(0.016);
            entity.getComponent(UpdateComponent).time.equal(0.032);
            entity.getComponent(LateUpdateComponent).time.equal(0.032);
            entity.getComponent(Position).x.equal(1.6);
            entity.getComponent(Position).y.equal(3.2);
        }).
        add(() => {
            let world = new ecs.World();
            let scene = new ecs.Scene();
            world.scene = scene;
            world.addSystem(new PhysicSystem());
            world.addSystem(new ecs.UpdateSystem());
            world.addSystem(new ecs.LateUpdateSystem());
            let entity = ecs.Entity.create();
            entity.addComponent(Position);
            entity.addComponent(Velocity, 100, 200);
            entity.addComponent(UpdateComponent);
            entity.addComponent(LateUpdateComponent);
            world.update(0.016);
            entity.getComponent(UpdateComponent).time.equal(0);
            entity.getComponent(LateUpdateComponent).time.equal(0);
            entity.getComponent(Position).x.equal(0);
            entity.getComponent(Position).y.equal(0);
            entity.parent = scene;
            world.update(0.016);
            entity.getComponent(UpdateComponent).time.equal(0.016);
            entity.getComponent(LateUpdateComponent).time.equal(0.016);
            entity.getComponent(Position).x.equal(1.6);
            entity.getComponent(Position).y.equal(3.2);
        }).
        run();
}

class PhysicSystem extends ecs.EntitySystem {

    constructor() {
        super([Position, Velocity]);
    }

    update(dt: number) {
        for (let node = this.query.head; node; node = node.next) {
            let p = node.value.getComponent(Position);
            let v = node.value.getComponent(Velocity);
            p.x += v.x * dt;
            p.y += v.y * dt;
        }
    }
}