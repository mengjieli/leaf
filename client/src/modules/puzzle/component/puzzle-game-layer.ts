import { PuzzleGameObject } from "./puzzle-game-object";
import { PuzzleGameConfig, PuzzleGameLevelConfig, PuzzleGameObjectConfig } from "../config/puzzle-game-config";

orange.autoloadLink("PuzzleScene");

export class PuzzleGameLayer extends ecs.Component {

    levelConfig: PuzzleGameLevelConfig;

    objects: PuzzleGameObject[][] = [];

    isStatic: boolean;

    layerIndex: number;

    ruleObjects: PuzzleGameObject[] = [];

    init(levelConfig: PuzzleGameLevelConfig, cfg: PuzzleGameObjectConfig[][], layerIndex: number) {
        this.levelConfig = levelConfig;
        this.isStatic = true;
        this.layerIndex = layerIndex;
        for (let y = 0; y < levelConfig.height; y++) {
            this.objects[y] = [];
            for (let x = 0; x < levelConfig.width; x++) {
                this.objects[y][x] = null;
                if (!cfg) continue;
                let objCfg = cfg[y] && cfg[y][x];
                if (!objCfg) {
                    if (layerIndex === 0) {
                        if (levelConfig.game.objects["background"]) {
                            ecs.Entity.create().addComponent(PuzzleGameObject, this, levelConfig.game.objects["background"], x, y);
                        }
                    }
                } else {
                    if (levelConfig.game.ruleObjects.indexOf(objCfg) != -1) this.isStatic = false;
                    ecs.Entity.create().addComponent(PuzzleGameObject, this, objCfg, x, y);
                }
            }
        }
        if (this.isStatic) {
            // this.addComponent(leaf.BatchRender);
        }
    }

    getObjectByType(type: PuzzleGameObjectConfig): PuzzleGameObject {
        for (let obj of this.ruleObjects) {
            if (obj.config === type) return obj;
        }
    }

    getObjectsByType(type: PuzzleGameObjectConfig): PuzzleGameObject[] {
        let list = [];
        for (let obj of this.ruleObjects) {
            if (obj.config === type) list.push(obj);
        }
        return list;
    }
}