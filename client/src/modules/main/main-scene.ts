import { ModuleScene } from "../../utils/ui/module-scene";
import { MainUI } from "./components/main-ui";

@orange.autoload("MainScene")
export class MainScene extends ModuleScene {

    constructor() {
        super();

        ecs.Entity.create().addComponent(MainUI).parent = this.scene;
    }
}