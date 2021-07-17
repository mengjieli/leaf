import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("TestScene")
export class TestScene extends ModuleScene {

    constructor() {
        super();

        leaf.StateWin.show();

        let list = [];

        for (let i = 0; i < 10000; i++) {
            let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
            bm.parent = this.scene;
            bm.resource = "bunny_png";
            bm.transform.x = leaf.getStageWidth() * Math.random();
            bm.transform.y = (leaf.getStageHeight () - 200) * Math.random();
        }

        this.scene.addComponent(TC, this.scene.children);

    }
}


export class TC extends ecs.Component {

    list: any[];

    init(list: any[]) {
        this.list = list;
    }

    update() {
        this.list.sort((a, b) => a.transform.y - b.transform.y);
        // for (let i = 0; i < this.list.length; i++) {
        //     this.list[i].x += (-0.5 + Math.random()) * 0.1;
        //     this.list[i].y += (-0.5 + Math.random()) * 0.1;
        //     this.list[i].angle += 0.2;
        // }
    }

}