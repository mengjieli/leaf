import { PuzzleScriptGame } from "./puzzle-script-game";
import { PuzzleScriptGameShow } from "./puzzle-script-game-show";

export class PuzzleScriptGameRefresh extends ecs.Component {

    update() {
        this.getComponent(PuzzleScriptGameShow).refresh();
    }

}