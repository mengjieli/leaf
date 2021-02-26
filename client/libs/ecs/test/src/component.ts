async function testComponent() {
    await test.Case.create("Component").
        add(() => {
            Position.type.newCount = 0;
            Position.type.realNewCount = 0;
            Velocity.type.newCount = 0;
            Velocity.type.realNewCount = 0;
            UpdateComponent.type.newCount = 0;
            UpdateComponent.type.realNewCount = 0;
            LateUpdateComponent.type.newCount = 0;
            LateUpdateComponent.type.realNewCount = 0;

            ecs.setComponentRecyclePool(new ecs.ObjectPools());

            let entity = ecs.Entity.create();
            entity.addComponent(Position);
            entity.addComponent(Velocity, 100, 200);
            entity.addComponent(UpdateComponent);
            entity.addComponent(LateUpdateComponent);

            entity.destroy();

            entity = ecs.Entity.create();
            entity.addComponent(Position);
            entity.addComponent(Velocity, 100, 200);
            entity.addComponent(UpdateComponent);
            entity.addComponent(LateUpdateComponent);

            Position.type.newCount.equal(2);
            Position.type.realNewCount.equal(1);
            Velocity.type.newCount.equal(2);
            Velocity.type.realNewCount.equal(1);
            UpdateComponent.type.newCount.equal(2);
            UpdateComponent.type.realNewCount.equal(1);
            LateUpdateComponent.type.newCount.equal(2);
            LateUpdateComponent.type.realNewCount.equal(1);

            ecs.setComponentRecyclePool(null);
        }, "ComponentCycle")
        .run();
}



class Position extends ecs.Component {

    x: number;
    y: number;

    init(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

class Velocity extends ecs.Component {

    x: number;
    y: number;

    init(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

class UpdateComponent extends ecs.Component {

    time = 0;

    update(dt: number) {
        this.time += dt;
    }
}

class LateUpdateComponent extends ecs.Component {

    time = 0;

    lateUpdate(dt: number) {
        this.time += dt;
    }
}