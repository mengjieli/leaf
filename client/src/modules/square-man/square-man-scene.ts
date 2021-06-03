import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("SquareManScene")
export class SquareManScene extends ModuleScene {

    constructor() {
        super();
        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.parent = this.scene;
        bg.texture = leaf.PointTexture.getTexture(0xffffff);
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight();

        ecs.Entity.create().addComponent(WaterArea).parent = this.scene;
        // ecs.Entity.create().addComponent(Stone).parent = this.scene;
    }

}

class Stone extends ecs.Component {

    init() {
        this.addComponent(leaf.Bitmap).texture = leaf.PointTexture.getTexture(0xae792e);
        this.transform.scaleX = this.transform.scaleY = 20;

        this.transform.y = 700;
    }

}

class WaterArea extends ecs.Component {

    list: WaterSquare[];

    water: Water[] = [];

    init() {
        this.transform.x = 50;
        let wts: WaterSquare[] = this.list = [];
        for (let i = 0; i < 550; i++) {
            let wt = ecs.Entity.create().addComponent(WaterSquare, 300);
            wt.parent = this.entity;
            wt.transform.x = i;
            wt.transform.y = 1000;
            wts.push(wt);
        }
        for (let i = 0; i < wts.length; i++) {
            wts[i].left = i > 0 ? wts[i - 1] : null;
            wts[i].right = i < wts.length - 1 ? wts[i + 1] : null;
        }
        // this.hit(300, 0, 200);
    }

    addWater(x: number, y: number, value: number, vx = 0, vy = 0, g = 0.001) {
        let water = ecs.Entity.create().addComponent(Water, value);
        water.entity.parent = this.entity;
        water.transform.x = x;
        water.transform.y = -y;
        water.addComponent(Move, vx, vy, g);
        this.water.push(water);
    }

    update(dt: number) {
        for (let i = 0; i < 5; i++) {
            this.addWater(50 + 400 * Math.random(), - 200 * Math.random(), 5 + 20 * Math.random());
        }
        for (let loop = 0; loop < 100; loop++) {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].checkMove();
            }
        }
        for (let i = 0; i < this.water.length; i++) {
            let water = this.water[i];
            let move = water.getComponent(Move);
            if (!move) continue;
            move.move(dt);
            let x = ~~water.transform.x;
            if (x < 0 || x >= this.list.length) {
                this.water.splice(i, 1);
                i--;
                water.entity.destroy();
            } else {
                let v = this.list[x].value;
                if (water.transform.y > 1000 - v) {
                    water.getComponent(Move).y = 0;
                    let len = Math.sqrt(water.value);
                    let fromx = x - Math.floor(len / 2);
                    let tox = x + Math.floor(len / 2) - 1;
                    // this.hit(x, 0, water.value * 0.5);
                    let av = water.value / (tox - fromx);
                    for (let ax = fromx; ax < tox; ax++) {
                        this.list[ax].value += av;
                    }
                    this.water.splice(i, 1);
                    i--;
                    water.entity.destroy();
                }
            }
        }
    }

    hit(x: number, rot: number, force: number) {
        let px = ~~x;
        for (let i = -10; i <= 10; i++) {
            let reducev = force * (10 - Math.abs(i)) / 10;
            let pos = this.list[px + i].value;
            this.list[px + i].value -= reducev;
            let rot = -Math.PI / 2 + Math.random() * Math.PI;
            this.addWater(px + i, pos - 1000, 0.2 * reducev, Math.sin(rot), - 0.2 * Math.cos(rot));
        }
    }
}

class WaterSource extends ecs.Component {

    update() {
        this.getComponent(WaterSquare).value += 10;
    }

}

class WaterSquare extends ecs.Component {

    left: WaterSquare;
    right: WaterSquare;

    init(val: number = 100) {
        this.addComponent(leaf.Bitmap).texture = leaf.PointTexture.getTexture(0x70c0f8);
        this.value = val;
        this.transform.alpha = 1;
    }

    private _value: number = 0;

    get value() {
        return this._value;
    }

    set value(val: number) {
        if (this._value === val) return;
        this._value = val;
        this.transform.scaleY = -val;
    }

    checkMove() {
        if (this.left) {
            if (this.value > this.left.value) {
                if (false && this.value > this.left.value + 50) {
                    let gap = this.value - this.left.value;
                    this.value -= gap / 5;
                    this.left.value += gap / 5;
                } else {
                    this.value -= 10;
                    this.left.value += 10;
                }
                if (this.value < this.left.value) {
                    this.value = this.left.value = (this.value + this.left.value) / 2;
                }
            }
        }
        if (this.right) {
            if (this.value > this.right.value) {
                if (false && this.value > this.right.value + 50) {
                    let gap = this.value - this.right.value;
                    this.value -= gap / 5;
                    this.right.value += gap / 5;
                } else {
                    this.value -= 10;
                    this.right.value += 10;
                }
                if (this.value < this.right.value) {
                    this.value = this.right.value = (this.value + this.right.value) / 2;
                }
            }
        }
    }


}

class Water extends ecs.Component {

    show: ecs.Entity;

    init(val: number = 100) {
        this.show = ecs.Entity.create();
        this.show.parent = this.entity;
        this.show.addComponent(leaf.Bitmap).texture = leaf.PointTexture.getTexture(0x70c0f8);
        this.value = val;
    }

    private _value: number = 0;

    get value() {
        return this._value;
    }

    set value(val: number) {
        if (this._value === val) return;
        this._value = val;
        let len = Math.sqrt(val);
        this.transform.scaleY = len;
        this.transform.scaleX = len;
        this.show.transform.x = -0.5;
        this.show.transform.y = -0.5;
    }

}

class Move extends ecs.Component {

    g: number = 100;

    x: number;

    y: number;

    init(x = 0, y = 0, g = 0) {
        this.x = x;
        this.y = y;
        this.g = g;
    }

    move(dt: number) {
        this.y += this.g * dt;
        this.transform.x += this.x * dt;
        this.transform.y += this.y * dt;
    }
}