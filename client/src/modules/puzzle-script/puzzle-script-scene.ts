import { ModuleScene } from "../../utils/ui/module-scene";
import { PuzzleScriptGame } from "./components/puzzle-script-game";
import { PuzzleScriptGameUI } from "./ui/puzzle-script-game-ui";


@orange.autoload("PuzzleScriptScene")
export class PuzzleScriptScene extends ModuleScene {


    constructor(game: string = 'game1-4_txt', level: number = 1) {
        super();

        ecs.Entity.create().addComponent(PuzzleScriptGame, game, level).addComponent(PuzzleScriptGameUI).parent = this.scene;
    }

}