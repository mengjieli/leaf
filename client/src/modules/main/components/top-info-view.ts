import { System } from "../../../utils/system";

orange.autoloadLink("MainScene");

export class TopInfoView extends ecs.Component {

    heartCount: leaf.Label;

    init() {
        this.entity.transform.y = System.topHeight;

        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.resource = "top_info_bg_png";
        bg.transform.x = 17;
        bg.parent = this.entity;

        let heart = ecs.Entity.create().addComponent(leaf.Bitmap);
        heart.resource = "heart";
        heart.transform.x = bg.transform.x + 15;
        heart.transform.y = 4;
        heart.parent = this.entity;

        let heartCount = ecs.Entity.create().addComponent(leaf.Label);
        heartCount.transform.x = heart.transform.x + 65;
        heartCount.transform.y = 13;
        heartCount.text = "9999"
        heartCount.fontSize = 40;
        heartCount.fontColor = 0x777777;
        heartCount.bold = true;
        heartCount.parent = this.entity;


        bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.resource = "top_info_bg";
        bg.transform.x = 220;
        bg.parent = this.entity;

        let gold = ecs.Entity.create().addComponent(leaf.Bitmap);
        gold.resource = "gold";
        gold.transform.x = bg.transform.x + 15;
        gold.transform.y = 4;
        gold.parent = this.entity;

        let goldCount = ecs.Entity.create().addComponent(leaf.Label);
        goldCount.transform.x = gold.transform.x + 65;
        goldCount.transform.y = 13;
        goldCount.text = "9999"
        goldCount.fontSize = 40;
        goldCount.fontColor = 0x777777;
        goldCount.bold = true;
        goldCount.parent = this.entity;
    }
}