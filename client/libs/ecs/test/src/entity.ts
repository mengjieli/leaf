async function testEntity() {
    await test.Case.create("Entity").
        add(() => {
            let entity = ecs.Entity.create();
            entity.id.equal(1);
        }).
        add(() => {
            let entity = ecs.Entity.create();
            entity.isAlive.equal(true);
            entity.destroy();
            entity.isAlive.equal(false);
        }, "isAlive").
        run();
}