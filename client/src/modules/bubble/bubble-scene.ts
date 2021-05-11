import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("BubbleScene")
export class BubbleScene extends ModuleScene {

    constructor() {
        super();

        for (let i = 0; i < 10; i++) {
            let ball = ecs.Entity.create().addComponent(leaf.Bitmap);
            ball.entity.parent = this.scene;
            ball.resource = "bubble_ball1_png";
            ball.entity.transform.x = 50 * i;
        }
    }

}