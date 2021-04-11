import { PuzzleScriptGame } from "./puzzle-script-game";

export class PuzzleScriptGameSize extends ecs.Component {

    width: number;

    height: number;

    autoMid:boolean = true;

    init(w: number, h: number) {
        this.autoMid = true;
        this.width = w;
        this.height = h;
        this.getComponent(PuzzleScriptGame).resize();
    }

}