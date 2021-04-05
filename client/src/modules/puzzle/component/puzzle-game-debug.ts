import { PuzzleGameLevel } from "./puzzle-game-level";
import { EMPuzzleConst } from "../config/puzzle-game-config";
import { PuzzleGameLayer } from "./puzzle-game-layer";

orange.autoloadLink("PuzzleScene");

export class PuzzleGameDebug extends ecs.Component {

    awake() {
        return;
        let level = this.getComponent(PuzzleGameLevel);
        for (let y = 0; y < level.config.height; y++) {
            for (let x = 0; x < level.config.width; x++) {
                ecs.Entity.create().
                    addComponent(PuzzleGameCoordDebug, x, y,
                        level.layers[level.config.game.groups[EMPuzzleConst.PLAYER][0].layer]).entity.parent = this.entity;
            }
        }
    }

}

class PuzzleGameCoordDebug extends ecs.Component {

    x: number;
    y: number;
    layer: PuzzleGameLayer;

    init(x: number, y: number, layer: PuzzleGameLayer) {
        this.x = x;
        this.y = y;
        this.entity.transform.x = x * layer.levelConfig.game.blockWidth;
        this.entity.transform.y = y * layer.levelConfig.game.blockHeight;
        this.layer = layer;
        let lb = this.addComponent(leaf.Label);
        lb.fontSize = 12;
        lb.fontSize = 12;
        lb.fontColor = 0xff0000;
        lb.transform.scaleX = lb.transform.scaleY = 0.1;
    }

    update() {
        this.getComponent(leaf.Label).text = this.x + ' ' + this.y + '\n'
            + (this.layer.objects[this.y][this.x] ? this.layer.objects[this.y][this.x].id : '') + '\n';
    }


}