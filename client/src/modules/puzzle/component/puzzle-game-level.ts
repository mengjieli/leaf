import { PuzzleGameLevelConfig, PuzzleGameConfig, PuzzleGameObjectConfig } from "../config/puzzle-game-config";
import { PuzzleGameLayer } from "./puzzle-game-layer";
import { PuzzleGameObject } from "./puzzle-game-object";
import { PuzzleGameLoop } from "./puzzle-game-loop";
import { PuzzleGameDebug } from "./puzzle-game-debug";
import { PuzzleGame } from "./puzzle-game";

orange.autoloadLink("PuzzleScene");

export class PuzzleGameLevel extends ecs.Component {

    config: PuzzleGameLevelConfig;

    layers: PuzzleGameLayer[] = [];

    state: 'win' | 'lose' | 'game'

    init(cfg: PuzzleGameLevelConfig) {
        let game = this.getComponent(PuzzleGame);
        this.state = 'game';
        this.config = cfg;
        let layerIndex = 0;
        let width = (this.config.width * this.config.game.blockWidth);
        let height = (this.config.height * this.config.game.blockHeight);
        let maxWidth = leaf.getStageWidth();
        let maxHeight = leaf.getStageHeight() - this.transform.y - 200;
        if (!game.scaleToStage) {
            maxWidth = game.maxWidth;
            maxHeight = game.maxHeight;
        } else {
            this.transform.y = 60;
        }
        let scaleWidth = maxWidth / width;
        let maxScaleY = maxHeight / height;
        scaleWidth = Math.min(scaleWidth, maxScaleY);
        if (this.getComponent(PuzzleGame).scaleToStage) {
            this.transform.y = (maxHeight - height * scaleWidth) / 2 + 60;
            this.transform.x = (maxWidth - width * scaleWidth) / 2;
        }
        this.transform.scaleX = this.transform.scaleY = scaleWidth;

        for (let layerCfg of cfg.layers) {
            let layer = ecs.Entity.create().addComponent(PuzzleGameLayer, this.config, layerCfg, layerIndex++);
            layer.parent = this.entity;
            this.layers.push(layer);
        }
        this.addComponent(PuzzleGameLoop);
        this.addComponent(PuzzleGameDebug);
        window["level"] = this;
    }

    getObjectByType(type: PuzzleGameObjectConfig): PuzzleGameObject {
        for (let layer of this.layers) {
            for (let obj of layer.ruleObjects) {
                if (obj.config === type) return obj;
            }
        }
    }

    getObjectsByType(type: PuzzleGameObjectConfig): PuzzleGameObject[] {
        let list = [];
        for (let layer of this.layers) {
            for (let obj of layer.ruleObjects) {
                if (obj.config === type) list.push(obj);
            }
        }
        return list;
    }
}