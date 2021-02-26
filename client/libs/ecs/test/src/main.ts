async function runTest() {
    await testEntity();
    await testSystem();
    await testComponent();
}

function testRunTime() {
    // ecs.debug = true;
    let world = new ecs.World();
    let scene = new ecs.Scene();
    world.scene = scene;
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new PhysicSystem());
    world.addSystem(new ecs.UpdateSystem());
    world.addSystem(new ecs.LateUpdateSystem());
    ecs.setComponentRecyclePool(new ecs.ObjectPools());

    var len = 1000;
    var dt = 0;
    var frame = 0;
    var lastTime = Date.now();


    for (let i = 0; i < len; i++) {
        let entity = ecs.Entity.create();
        entity.addComponent(Position);
        entity.addComponent(Velocity, 100, 200);
        entity.addComponent(UpdateComponent);
        entity.addComponent(LateUpdateComponent);
        entity.parent = scene;
    }

    len = 1000;
    var f = () => {
        var s = Date.now();

        for (let i = 0; i < len; i++) {
            let entity = ecs.Entity.create();
            entity.addComponent(Position);
            entity.addComponent(Velocity, 100, 200);
            entity.addComponent(UpdateComponent);
            entity.addComponent(LateUpdateComponent);
            entity.parent = scene;
        }

        world.update();

        for (let node = scene.children.head, i = 0; node && i < len; node = node.next,i++) {
            node.value.destroy();
        }

        ecs.ObjectPools.clearLinkPrePool();

        var t = Date.now();
        let gap = t - s;
        dt += gap;
        frame++;
        if (t - lastTime > 1000) {
            console.log(`fps:${(~~(10 * frame * 1000 / (t - lastTime))) / 10} dt:${(~~(dt * 10 / frame)) / 10}`);
            frame = 0;
            lastTime = t;
            dt = 0;
        }

        requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
}

setTimeout(() => {
    runTest();
    // testRunTime();
})