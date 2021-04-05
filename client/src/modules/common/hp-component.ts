orange.autoload("FaceScene")

export class HPComponent extends ecs.Component {

    init() {
        let label = ecs.Entity.create().addComponent(leaf.Label);
        label.entity.parent = this.entity;
        label.fontColor = 0xffffff;
        label.text = "体力：5";
        label.fontSize = 12;
        label.transform.x = 20;
        label.transform.y = 10;
    }

}