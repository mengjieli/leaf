import { TopInfoView } from "./top-info-view";

orange.autoloadLink("MainScene");

export class MainUI extends ecs.Component {

    init() {
        // let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        // bg.resource = "bg";
        // bg.parent = this.entity;
        // bg.transform.scaleX = leaf.getStageWidth();
        // bg.transform.scaleY = leaf.getStageHeight();
        


        ecs.Entity.create().addComponent(TopInfoView).parent = this.entity;
    }

}