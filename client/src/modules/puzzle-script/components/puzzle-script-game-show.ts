import { PuzzleScriptGame } from "./puzzle-script-game";

export class PuzzleScriptGameShow extends ecs.Component {

    bitmaps: leaf.Bitmap[][][];

    init() {
        if (!this.bitmaps && this.getComponent(PuzzleScriptGame).ready) {
            this.refresh();
        }
    }

    createShow() {
        let game = this.getComponent(PuzzleScriptGame);
        this.bitmaps = [];
        for (let l = 0; l < game.data.data.collisionLayers.length; l++) {
            this.bitmaps[l] = [];
            for (let y = 0; y < game.height; y++) {
                this.bitmaps[l][y] = [];
            }
        }
    }

    refresh() {
        if (!this.bitmaps) {
            this.createShow();
        }
        let game = this.getComponent(PuzzleScriptGame);
        let data = game.data;
        let screen = game.getScreen();

        if (this.bitmaps) {
            for (let l = 0; l < data.data.collisionLayers.length; l++) {
                for (let y = screen.minj; y < screen.maxj; y++) {
                    for (let x = screen.mini; x < screen.maxi; x++) {
                        if (this.bitmaps[l][y][x]) {
                            this.bitmaps[l][y][x].texture = null;
                        }
                        var posIndex = y + x * game.height;
                        var posMask = window["level"].getCellInto(posIndex, window["_o12"]);
                        for (var k = 0; k < data.data["objectCount"]; k++) {
                            if (posMask.get(k) != 0) {
                                if (data.data.sprites[k]) {
                                    let name = data.data.sprites[k].name;
                                    if (data.objects[name].layer === l) {
                                        if (!this.bitmaps[l][y][x]) {
                                            this.bitmaps[l][y][x] = ecs.Entity.create().addComponent(leaf.Bitmap);
                                            this.bitmaps[l][y][x].parent = game.gridsRoot;
                                            this.bitmaps[l][y][x].transform.x = (x - screen.mini) * data.blockWidth;
                                            this.bitmaps[l][y][x].transform.y = (y - screen.minj) * data.blockHeight;
                                        }
                                        let bm = this.bitmaps[l][y][x];
                                        bm.texture = data.getObjectTexture(name);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    onDestroy() {
        this.bitmaps = null;
    }
}