import { PuzzleScriptGameData } from "../data/puzzle-script-game-data";
import { PuzzleScriptGameKeyBoard } from "./puzzle-script-game-key-board";

orange.autoloadLink("PuzzleScriptScene");

export class PuzzleScriptGame extends ecs.Component {

    data: PuzzleScriptGameData;

    level: number;

    gridsRoot: ecs.Entity;

    bitmaps: leaf.Bitmap[][][];

    init(game: string, level: number = 0) {
        this.level = level;
        this.gridsRoot = ecs.Entity.create();
        this.gridsRoot.parent = this.entity;
        this.data = PuzzleScriptGameData.getGameData(game);
        if (!this.data.data) {
            this.data.onComplete.on(this.onDataReady, this);
            this.data.load();
        } else {
            this.onDataReady();
        }
    }

    onDataReady() {
        this.createLevel();
        //创建纹理
        this.gridsRoot.transform.scaleX = this.gridsRoot.transform.scaleY = 2;
        this.bitmaps = [];
        for (let l = 0; l < this.data.data.collisionLayers.length; l++) {
            this.bitmaps[l] = [];
            for (let y = 0; y < this.height; y++) {
                this.bitmaps[l][y] = [];
            }
        }
        this.addComponent(PuzzleScriptGameKeyBoard);
    }

    update() {
        if (this.bitmaps) {
            for (let l = 0; l < this.data.data.collisionLayers.length; l++) {
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        if (this.bitmaps[l][y][x]) {
                            this.bitmaps[l][y][x].texture = null;
                        }
                        let index = y + x * this.height;
                        let mask = window["level"].objects[index];
                        for (let name of this.data.data.collisionLayers[l]) {
                            let objMask = this.data.data.objectMasks[name].data;
                            let flag = true;
                            for (let i = 0; i < objMask.length; i++) {
                                if (!(objMask[i] & mask)) flag = false;
                            }
                            if (flag) {
                                if (!this.bitmaps[l][y][x]) {
                                    this.bitmaps[l][y][x] = ecs.Entity.create().addComponent(leaf.Bitmap);
                                    this.bitmaps[l][y][x].parent = this.gridsRoot;
                                    this.bitmaps[l][y][x].transform.x = x * this.data.blockWidth;
                                    this.bitmaps[l][y][x].transform.y = y * this.data.blockHeight;
                                }
                                let bm = this.bitmaps[l][y][x];
                                bm.texture = this.data.getObjectTexture(name);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    createLevel() {
        this.data.start(this.level);
    }

    get width() {
        return window["level"].width;
    }

    get height() {
        return window["level"].height;
    }

    onDestroy() {
        this.data.onComplete.remove(this.onDataReady, this);
        this.data = null;
        this.gridsRoot = null;
        this.bitmaps = null;
    }

}