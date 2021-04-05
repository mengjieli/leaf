import { PuzzleGameObjectConfig } from "../config/puzzle-game-config";
import { PuzzleGameLayer } from "./puzzle-game-layer";

orange.autoloadLink("PuzzleScene");

export class PuzzleGameObject extends ecs.Component {

    config: PuzzleGameObjectConfig;

    layer: PuzzleGameLayer;

    private _x: number;

    get x() { return this._x; }

    private _y: number;

    get y() { return this._y; }

    isInLayer: boolean;

    init(layer: PuzzleGameLayer, config: PuzzleGameObjectConfig, x: number = null, y: number = null) {
        this.config = config;
        this.layer = layer;
        this._x = x;
        this._y = y;
        this.createShow();
        this.setCoord(x, y);
        this.addToLayer();
        this.entity.parent = this.layer.entity;
        if (this.config.game.ruleObjects.indexOf(this.config) != -1) {
            layer.ruleObjects.push(this);
        }
    }

    removeFromLayer() {
        this.isInLayer = false;
        this.layer.objects[this.y][this.x] = null;
    }

    addToLayer(): boolean {
        if (this.x < 0 || this.x >= this.layer.levelConfig.width ||
            this.y < 0 || this.y >= this.layer.levelConfig.height ||
            this.layer.objects[this.y][this.x] && this.layer.objects[this.y][this.x] != this) {
            return false;
        }
        this.isInLayer = true;
        this.layer.objects[this.y][this.x] = this;
        return true;
    }

    setCoord(x: number, y: number): boolean {
        if (this.isInLayer && this.layer.objects[y][x] && this.layer.objects[y][x] != this) {
            return false;
        }
        if (this.isInLayer && this.layer.objects[this.y][this.x] !== this) {
            console.error('出错叻!?')
            return false;
        }
        this.layer.objects[this.y][this.x] = null;
        this._x = x;
        this._y = y;
        if (this.isInLayer) {
            if (!this.layer.objects[y]) this.layer.objects[y] = [];
            this.layer.objects[y][x] = this;
        }
        this.transform.x = x * this.config.game.blockWidth;
        this.transform.y = y * this.config.game.blockHeight;
        return true;
    }

    createShow() {
        this.addComponent(leaf.Bitmap).texture = leaf.RectTexture.getTexture(this.config.blocks, this.config.colorId);
    }

    onDestroy() {
        this.layer.objects[this.y][this.x] = null;
        if (this.layer.ruleObjects.indexOf(this) != -1) {
            this.layer.ruleObjects.splice(this.layer.ruleObjects.indexOf(this), 1);
        }
        this.layer = null;
        this.config = null;
    }

}