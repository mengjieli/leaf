import { PuzzleScriptGame } from "./puzzle-script-game";

export class PuzzleScriptGameLoop extends ecs.Component {

    lastAgain: number;

    init() {
        this.lastAgain = Date.now();
    }

    update() {
        let now = Date.now();
        let game = this.getComponent(PuzzleScriptGame);
        if (!game.ready) return;
        if (now - this.lastAgain > game.data.againInterval) {
            this.lastAgain = now;
            if (window["againing"]) {
                window["processInput"](-1);
            }
        }
    }

}