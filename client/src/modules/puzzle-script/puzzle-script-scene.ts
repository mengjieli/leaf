import { ModuleScene } from "../../utils/ui/module-scene";
import { PuzzleScriptGame } from "./components/puzzle-script-game";
import { PuzzleScriptGameUI } from "./ui/puzzle-script-game-ui";
import { PuzzleScriptLevelWin } from "./ui/puzzle-script-level-win";
import { FaceScene } from "../puzzle/face/face-scene";


@orange.autoload("PuzzleScriptScene")
export class PuzzleScriptScene extends ModuleScene {


    constructor(game: string = 'game1-4_txt', level: number = 1) {
        super(0.05);

        ecs.Entity.create().addComponent(PuzzleScriptLevelWin, game).parent = this.scene;
        // ecs.Entity.create().addComponent(PuzzleScriptGame, game, level).addComponent(PuzzleScriptGameUI).parent = this.scene;

        let zBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        zBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(
            `${0xffffff},${0xaa0000}\n` +
            '0.....0\n' +
            '.0...0.\n' +
            '..0.0..\n' +
            '...0...\n' +
            '..0.0..\n' +
            '.0...0.\n' +
            '0.....0'
        ));
        zBtn.transform.y = 15;
        zBtn.transform.x = 10;
        zBtn.transform.scaleX = zBtn.transform.scaleY = 3;
        zBtn.parent = this.scene;
        zBtn.entity.name = 'z';

        let label = ecs.Entity.create().addComponent(leaf.Label);
        label.text = '开心合集';
        label.fontSize = 10;
        label.transform.x = (leaf.getStageWidth() - label.textWidth) / 2;
        label.transform.y = 25;
        label.parent = this.scene;

        this.addClick(zBtn, () => {
            new FaceScene();
        })
    
    }

    addClick(btn: leaf.Bitmap, call: Function) {
        btn.addComponent(leaf.TouchComponent).onTouchStart.on(() => {
            btn.transform.alpha = 0.8;
        })
        btn.getComponent(leaf.TouchComponent).onTouchEnd.on(() => {
            btn.transform.alpha = 1;
            call && call();
        })
    }

}