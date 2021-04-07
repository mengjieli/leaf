import { PuzzleGameConfig, PuzzleGameLevelConfig } from "../config/puzzle-game-config";
import { PuzzleGameLevel } from "./puzzle-game-level";
import { PuzzleGameKeyBoard } from "./puzzle-game-keyboard";
import { PuzzleGameUI } from "./puzzle-game-ui";

orange.autoloadLink("PuzzleScene");

export class PuzzleGame extends ecs.Component {

    config: PuzzleGameConfig;
    level: number;
    gameName: string;

    withUI: boolean;
    scaleToStage: boolean;
    maxWidth: number;
    maxHeight: number;


    lvLabel: leaf.Label;
    ui: ecs.Entity;

    init(name: string = 'game1-1_txt', level = 1, withUI: boolean = true, scaleToStage: boolean = true, maxWidth: number = 0, maxHeight = 0) {
        this.gameName = name;
        this.level = level;
        this.withUI = withUI;
        this.scaleToStage = scaleToStage;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;

        // leaf.StateWin.show();
    }

    awake() {
        PuzzleGameConfig.loadGameConfig(this.gameName, (cfg) => {
            this.config = cfg;
            this.createLevel(this.level);

            if(this.withUI) {
                let label = this.lvLabel = ecs.Entity.create().addComponent(leaf.Label);
                label.text = `第${this.level}关`;
                label.fontSize = 14;
                label.transform.x = (leaf.getStageWidth() - label.textWidth) / 2;
                label.transform.y = 40;
                label.parent = this.entity.parent;
            }
        })
    }

    reload() {
        let p = this.entity.parent;
        this.ui.destroy();
        this.lvLabel.entity.destroy();
        this.entity.destroy();
        ecs.Entity.create().addComponent(PuzzleGame, this.gameName, this.level,
            this.withUI, this.scaleToStage, this.maxWidth, this.maxHeight).parent = p;
    }

    loadNextStage() {
        let p = this.entity.parent;
        this.ui.destroy();
        this.lvLabel.entity.destroy();
        this.entity.destroy();
        ecs.Entity.create().addComponent(PuzzleGame, this.gameName, Math.min(this.config.levels.length, this.level + 1),
            this.withUI, this.scaleToStage, this.maxWidth, this.maxHeight).parent = p;
    }

    private createLevel(level: number = 1) {
        this.level = level;
        if (!this.config) return;
        let cfg: PuzzleGameLevelConfig;
        if (level === 0) {
            cfg = this.config.face;
        }
        if (!cfg) {
            cfg = this.config.levels[this.level - 1];
        }
        if (!cfg) return;
        this.addComponent(PuzzleGameLevel, cfg);
        this.addComponent(PuzzleGameKeyBoard);
        this.ui = ecs.Entity.create();
        this.ui.parent = this.entity.parent;
        if (this.withUI) this.ui.addComponent(PuzzleGameUI, this);
    }

    onDestroy() {
        this.ui && this.ui.destroy();
        this.lvLabel && this.lvLabel.entity && this.lvLabel.entity.destroy();
    }

}