import { PuzzleScriptGame } from "../components/puzzle-script-game";
import { FaceScene } from "../../puzzle/face/face-scene";

orange.autoloadLink("PuzzleScene");

export class PuzzleScriptGameResult extends ecs.Component {

    init() {
        let game = this.getComponent(PuzzleScriptGame);
        let lv = game.level;
        setTimeout(() => {
            let entity = ecs.Entity.create();
            entity.parent = this.entity;
            entity.addComponent(leaf.Bitmap).texture = leaf.PointTexture.getTexture(0);
            entity.transform.scaleX = leaf.getStageWidth();
            entity.transform.scaleY = leaf.getStageHeight() + 100;
            entity.transform.y = -100;
            entity.transform.alpha = 0.8;

            let label = ecs.Entity.create().addComponent(leaf.Label);
            label.text = lv >= game.data.levels.length  - 1 ? '恭喜你已通关' : '你真棒!';
            label.fontSize = 20;
            label.parent = this.entity;
            label.transform.alpha = 0;
            setTimeout(() => {
                label.transform.alpha = 1;
                label.transform.x = (leaf.getStageWidth() - label.width) / 2;
                label.transform.y = (leaf.getStageHeight() - label.height) / 2 - 80;
            }, 100);
            setTimeout(() => {
                if (lv >= game.data.levels.length - 1) {
                    new FaceScene();
                } else {
                    PuzzleScriptGame.start(game.data.name, lv + 1);
                }
            }, 1000);
        }, 500);
    }

}