import { ModuleScene } from "../../utils/ui/module-scene";
import { BullCore } from "./components/bull-core";

@orange.autoload("BullScene")
export class BullScene extends ModuleScene {

    constructor() {
        super();

        ecs.Entity.create().addComponent(BullCore).parent = this.scene;
    }

}