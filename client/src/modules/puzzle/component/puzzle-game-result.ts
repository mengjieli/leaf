import { PuzzleGame } from "./puzzle-game";
import { GameStorage } from "../../../utils/storage/game-storage";
import { PuzzleGameLevel } from "./puzzle-game-level";
import { FaceScene } from "../face/face-scene";

orange.autoloadLink("PuzzleScene");

export class PuzzleGameResult extends ecs.Component {

    init(game: PuzzleGame) {
        let lv = game.level;
        if (game.getComponent(PuzzleGameLevel).state === 'win') {
            GameStorage.getStorage(`${game.gameName}_maxStage`).then(v => {
                console.error("lv:", v, lv);
                if (+v < lv) {
                    console.error("保存关卡进度", lv);
                    GameStorage.setStorage(`${game.gameName}_maxStage`, lv);
                }
            })
        }
        setTimeout(() => {
            let entity = ecs.Entity.create();
            entity.parent = this.entity;
            entity.addComponent(leaf.Bitmap).texture = leaf.PointTexture.getTexture(0);
            entity.transform.scaleX = leaf.getStageWidth();
            entity.transform.scaleY = leaf.getStageHeight();
            entity.transform.alpha = 0.8;

            let label = ecs.Entity.create().addComponent(leaf.Label);
            label.text = lv >= game.config.levels.length ? '恭喜你已通关' : '你真棒!';
            label.fontSize = 20;
            label.parent = this.entity;
            label.transform.alpha = 0;
            setTimeout(() => {
                label.transform.alpha = 1;
                label.transform.x = (leaf.getStageWidth() - label.width) / 2;
                label.transform.y = (leaf.getStageHeight() - label.height) / 2;
            }, 100);
            setTimeout(() => {
                if (lv >= game.config.levels.length) {
                    new FaceScene();
                } else {
                    game.loadNextStage();
                }
            }, 1000);
        }, 500);
    }

}