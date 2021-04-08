import { PuzzleScriptGame } from "./puzzle-script-game";

export class PuzzleScriptGameKeyBoard extends ecs.Component {

    awake() {
        window.onkeydown = (e) => {
            console.error(e.keyCode);
            if (e.keyCode === 87 || e.keyCode === 38) {
                this.getComponent(PuzzleScriptGame).data.run("up");
            } else if (e.keyCode === 83 || e.keyCode === 40) {
                this.getComponent(PuzzleScriptGame).data.run("down");
            } else if (e.keyCode === 65 || e.keyCode === 37) {
                this.getComponent(PuzzleScriptGame).data.run("left");
            } else if (e.keyCode === 68 || e.keyCode === 39) {
                this.getComponent(PuzzleScriptGame).data.run("right");
            } else if (e.keyCode === 90) {
                this.getComponent(PuzzleScriptGame).data.run("undo");
            } else if (e.keyCode === 82) {
                this.getComponent(PuzzleScriptGame).data.run("restart");
            }
        }
    }

}