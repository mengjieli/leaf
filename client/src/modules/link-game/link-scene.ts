import { ModuleScene } from "../../utils/ui/module-scene";
import { LinkGame } from "./components/link-game";

@orange.autoload("LinkScene")
export class LinkScene extends ModuleScene {

    constructor() {
        super();

        ecs.Entity.create().addComponent(LinkGame).parent = this.scene;
    }

}