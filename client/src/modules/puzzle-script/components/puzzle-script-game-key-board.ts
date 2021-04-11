import { PuzzleScriptGame } from "./puzzle-script-game";
import { PlayerData } from "../../../net/player-data";
import { PuzzleScriptLevelWin } from "../ui/puzzle-script-level-win";
import { PuzzleScriptGameResult } from "../ui/puzzle-level-game-result";

export class PuzzleScriptGameKeyBoard extends ecs.Component {

    awake() {
        window.onkeydown = (e) => {
            console.error(e.keyCode);
            if (this.entity.getComponent(PuzzleScriptGameResult)) return;
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
            if (window["winning"]) {
                let game = this.getComponent(PuzzleScriptGame);
                if (PlayerData.instance.getGame(game.data.name).maxLevel < game.level + 1) {
                    PlayerData.instance.getGame(game.data.name).maxLevel = game.level + 1;
                    PlayerData.instance.save();
                }
                this.entity.addComponent(PuzzleScriptGameResult);
            }
        }
    }

}