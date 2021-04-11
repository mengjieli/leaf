import { GameConfig } from "../utils/game-config";
import { PlayerData } from "../net/player-data";

export class VersionComponent extends ecs.Component {

    awake() {
        let vlabel = ecs.Entity.create().addComponent(leaf.Label);
        vlabel.parent = this.entity;
        vlabel.text = GameConfig.version + "_" + PlayerData.instance.uid;
        vlabel.fontColor = 0xffffff;
        vlabel.fontSize = 10;
        vlabel.transform.y = leaf.getStageHeight() - vlabel.fontSize;
        vlabel.transform.alpha = 0.6;
    }

}