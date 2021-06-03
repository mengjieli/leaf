import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("BubbleScene")
export class BubbleScene extends ModuleScene {

    constructor() {
        super();
        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.parent = this.scene;
        bg.texture = leaf.PointTexture.getTexture(0xffffff);
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight();
    }

}