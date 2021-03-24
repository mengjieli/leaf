@orange.autoload("EliminationScene")
export class EliminationScene {

    world: ecs.World;
    scene: ecs.Scene;

    constructor(world: ecs.World) {
        this.world = world;
        world.scene = this.scene = new ecs.Scene();
    }

    close() {
        this.scene.destroy();
    }

}