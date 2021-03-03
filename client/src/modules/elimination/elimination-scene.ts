@orange.autoload("EliminationScene")
export class EliminationScene {

    world: ecs.World;
    scene: ecs.Scene;

    constructor(world: ecs.World) {
        this.world = world;
        world.scene = this.scene = new ecs.Scene();

        tiny2d.addToWorld(world);

        let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
        bm.resource = "pure-element-1-0"
        // rect.property.x = 100;
        // rect.property.y = 100;
        bm.addComponent(tiny2d.Box);
        bm.entity.parent = this.scene;

        let f = bm.addComponent(tiny2d.Force, 0, 100);
    }

    close() {
        this.scene.destroy();
        tiny2d.removeFromWorld(this.world);
    }
}