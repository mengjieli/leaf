export class ModuleScene {

    scene: ecs.Scene;

    constructor() {
        this.scene = new ecs.Scene();
        leaf.world.scene = this.scene;
    }

    close() {
        if (this.scene) {
            if (this.scene.world) {
                this.scene.world.scene = null;
            }
            this.scene.destroy();
            this.scene = null;
        }
    }

}