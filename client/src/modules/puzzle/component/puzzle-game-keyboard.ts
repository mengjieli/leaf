import { PuzzleGameLoop } from "./puzzle-game-loop";
import { EMPuzzleMove } from "../config/puzzle-game-config";

export class PuzzleGameKeyBoard extends ecs.Component {

    awake() {
        window.onkeydown = (e) => {
            // console.error(e.keyCode);
            if (e.keyCode === 87 || e.keyCode === 38) {
                this.getComponent(PuzzleGameLoop).run(EMPuzzleMove.UP);
            } else if (e.keyCode === 83 || e.keyCode === 40) {
                this.getComponent(PuzzleGameLoop).run(EMPuzzleMove.DOWN);
            } else if (e.keyCode === 65 || e.keyCode === 37) {
                this.getComponent(PuzzleGameLoop).run(EMPuzzleMove.LEFT);
            } else if (e.keyCode === 68 || e.keyCode === 39) {
                this.getComponent(PuzzleGameLoop).run(EMPuzzleMove.RIGHT);
            }
        }
    }

}