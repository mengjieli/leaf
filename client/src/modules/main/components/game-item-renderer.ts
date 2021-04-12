import { gameConfigs } from "../../../config/game-config";

orange.autoloadLink("MainScene");

export class GameItemRenderer extends leaf.ListItemRenderer<{ id: number }> {

    init() {
        this.addComponent(leaf.TouchComponent).onTouchEnd.on(() => {
            console.error("click", this.data)
        })
    }

    onData(d: { id: number }) {
        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.texture = leaf.PointTexture.getTexture(0xffffff);
        bg.transform.scaleX = 300;
        bg.transform.scaleY = 300;
        bg.parent = this.entity;

        let cfg = gameConfigs[d.id];
        let shortCut = ecs.Entity.create().addComponent(leaf.Bitmap);
        shortCut.resource = `game${d.id}_png`;
        shortCut.transform.x = (300 - 282) / 2;
        shortCut.transform.y = (300 - 282) / 2;
        shortCut.parent = this.entity;

        let nameLabel = ecs.Entity.create().addComponent(leaf.Label);
        nameLabel.text = cfg.name;
        nameLabel.transform.x = shortCut.transform.x;
        nameLabel.transform.y = 250;
        nameLabel.fontColor = 0;
        nameLabel.fontSize = 20;
        nameLabel.parent = this.entity;
    }

}