import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("BubbleScene")
export class BubbleScene extends ModuleScene {

    constructor() {
        super();
        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.parent = this.scene;
        bg.texture = leaf.PointTexture.getTexture(0xffffff);
        bg.transform.scaleX = bg.transform.scaleY = 628;

        for (let i = 0; i < 10; i++) {
            let ball = ecs.Entity.create().addComponent(leaf.Bitmap);
            ball.entity.parent = this.scene;
            ball.resource = "bubble_ball1_png";
            ball.entity.transform.x = 52 * i;
            ball.transform.scaleX = ball.transform.scaleY = 1.2;
        }

    }

}