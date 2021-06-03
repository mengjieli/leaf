import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("WaterScene")
export class WaterScene extends ModuleScene {

    constructor() {
        super();
        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.parent = this.scene;
        bg.texture = leaf.PointTexture.getTexture(0xffffff);
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight();

        this.scene.world.addSystem(LiquidFlowSystem, [Water, Liquidity]);

        let map = ecs.Entity.create().addComponent(Map, 300, 500);
        map.parent = this.scene;
        let offx = 5;
        let offy = 20;
        let maxx = 30;
        let maxy = 30;
        // for (let y = 0; y < maxy; y++) {
        //     map.addGround(offx, offy + y);
        //     map.addGround(offx + maxx, offy + y);
        // }
        for (let x = 0; x <= maxx; x++) {
            map.addGround(offx + x, offy + maxy);
        }
        map.addWater(offx + 10, offy);

    }

    close() {
        this.scene.world.removeSystem(LiquidFlowSystem);
        super.close();
    }
}

export class Map extends ecs.Component {

    gridWidth = 16;

    gridHeight = 16;

    width: number;

    height: number;

    grids: Grid[][];

    init(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.grids = [];
        for (let y = 0; y < height; y++) {
            this.grids[y] = [];
            for (let x = 0; x < width; x++) {
                this.grids[y][x] = new Grid();
                this.grids[y][x].x = x;
                this.grids[y][x].y = y;
                this.grids[y][x].map = this;
            }
        }
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.grids[y][x].top = y > 0 ? this.grids[y - 1][x] : null;
                this.grids[y][x].bottom = y < height - 1 ? this.grids[y + 1][x] : null;
                this.grids[y][x].left = x > 0 ? this.grids[y][x - 1] : null;
                this.grids[y][x].right = x < width - 1 ? this.grids[y][x + 1] : null;
            }
        }
    }

    addWater(x: number, y: number, value: number = 1) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        let grid = this.grids[y][x];
        if (grid.type != EMItemType.NONE) return;
        let water = ecs.Entity.create().addComponent(Water, grid, value);
        water.entity.parent = this.entity;
    }

    addGround(x: number, y: number) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        let grid = this.grids[y][x];
        if (grid.type != EMItemType.NONE) return;
        let ground = ecs.Entity.create().addComponent(Ground, grid);
        ground.entity.parent = this.entity;
    }

}

export class Grid {

    map: Map;

    x: number;

    y: number;

    left: Grid;

    right: Grid;

    top: Grid;

    bottom: Grid;

    type: EMItemType = EMItemType.NONE;

    item: Item;
}

export class Item extends ecs.Component {

    type: EMItemType;

    grid: Grid;

    init(grid: Grid) {
        this.grid = grid;
    }

}

export class WaterUnit extends ecs.Component {

    surface: Water[] = [];

    water: Water[] = [];

    //压力底部位置，最低点（下面有地面）y 坐标
    bottom: number;

    merge(unit: WaterUnit) {
    }
}

export class Water extends Item {

    type: EMItemType = EMItemType.WATER;

    show: leaf.Bitmap;

    unit: WaterUnit;

    init(grid: Grid, value: number = 1) {
        this.grid = grid;
        grid.item = this;
        grid.type = this.type;
        let bm = this.show = ecs.Entity.create().addComponent(leaf.Bitmap);
        bm.texture = leaf.PointTexture.getTexture(0x67abea);
        bm.transform.scaleX = grid.map.gridWidth;
        bm.transform.scaleY = grid.map.gridHeight;
        bm.entity.parent = this.entity;

        this.transform.x = grid.x * grid.map.gridWidth;
        this.transform.y = grid.y * grid.map.gridWidth;

        this.value = value;

        if (grid.top && grid.top.type === EMItemType.WATER) {
            this.unit = (grid.top.item as Water).unit;
        }
        if (grid.left && grid.left.type === EMItemType.WATER) {
            let unit = (grid.top.item as Water).unit;
            if (this.unit) {
                if (this.unit != unit) {
                    unit.merge(this.unit);
                }
            } else {
                this.unit = unit;
            }
        }
    }

    private _value: number;

    get value() {
        return this._value;
    }

    set value(v: number) {
        if (this._value === v) return;
        this._value = v;
        this.show.transform.scaleY = this.grid.map.gridHeight * v;
        this.show.transform.y = (1 - v) * this.grid.map.gridHeight;
    }

}

export class Liquidity extends ecs.Component {

    liquidtySpeed: number;

    init(liquidtySpeed = 0.01) {
        this.liquidtySpeed = liquidtySpeed;
    }

}

export class LiquidFlowSystem extends ecs.EntitySystem {

    update(dt: number) {
        for (let node = this.query.head; node; node = node.next) {
            let water = node.value.getComponent(Water);
            let liquidity = node.value.getComponent(Liquidity);
            if (water.grid.bottom) {
                if (water.grid.bottom.type === EMItemType.NONE) {
                    water.grid.map.addWater(water.grid.x, water.grid.y + 1, 0);
                }
                if (water.grid.bottom.type === EMItemType.WATER) {
                    let item = water.grid.bottom.type
                }
            } else {

            }
        }
    }

}



export class Ground extends Item {

    type: EMItemType = EMItemType.WATER;

    init(grid: Grid) {
        this.grid = grid;
        let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
        bm.texture = leaf.PointTexture.getTexture(0xbc7b47);
        bm.transform.scaleX = grid.map.gridWidth;
        bm.transform.scaleY = grid.map.gridHeight;
        bm.entity.parent = this.entity;

        this.transform.x = grid.x * grid.map.gridWidth;
        this.transform.y = grid.y * grid.map.gridWidth;
    }
}

export enum EMItemType {
    NONE,
    WATER = 1,
    GROUND = 2
}

export var WaterGround = {};
WaterGround[EMItemType.GROUND] = true;