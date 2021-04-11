export class PuzzleScriptGameData {

    name: string;

    private _levels: any[];

    constructor(name: string) {
        this.name = name;
    }

    blockWidth: number = 5;

    blockHeight: number = 5;

    againInterval: number = 150;

    private _data: any;

    get data() {
        return this._data;
    }

    get levels(): any[] {
        return this._levels;
    }

    get objects(): any {
        return this.data.objects;
    }

    start(level: number) {
        window["setState"](this.data);
        window["loadLevelFromState"](this._data, this.levels[level].index);
    }

    private objectTexture: { [index: string]: leaf.Texture } = {};

    getObjectTexture(name: string): leaf.Texture {
        if (this.objectTexture[name]) return this.objectTexture[name];
        let colors = [];
        let colorTable = [];
        let obj = this.data.objects[name];
        for (let o = 0; o < obj.colors.length; o++) {
            colorTable[o] = 0;
            let cstr = this.data.objects[name].colors[o];
            cstr = cstr.slice(1, cstr.length);
            let nums = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 }
            for (let i = 0; i < cstr.length; i++) {
                let char = cstr.charAt(cstr.length - 1 - i);
                colorTable[o] += (nums[char]) * Math.pow(16, i);
            }
        }
        let colorSum = '';
        let source = this.data.objects[name].spritematrix;
        for (let y = 0; y < source.length; y++) {
            colors[y] = [];
            for (let x = 0; x < source[y].length; x++) {
                let index = +source[y][x];
                let color = null;
                if (index >= 0 || index < colorTable.length) color = colorTable[index];
                colors[y][x] = color;
                colorSum += (color || '.') + "_";
            }
            colorSum += "|"
        }
        return this.objectTexture[name] = leaf.RectTexture.getTexture(colors, colorSum);
    }

    run(op?: "up" | "down" | "left" | "right" | "undo" | "restart") {
        if (op === "up") {
            window["checkKey"]({ keyCode: 38 }, true);
            // window["processInput"](0);
        } else if (op === "down") {
            window["checkKey"]({ keyCode: 40 }, true);
            // window["processInput"](2);
        } else if (op === "left") {
            window["checkKey"]({ keyCode: 37 }, true);
            // window["processInput"](1);
        } else if (op === "right") {
            window["checkKey"]({ keyCode: 39 }, true);
            // window["processInput"](3);
        } else if (op === "undo") {
            window["checkKey"]({ keyCode: 90 }, true);
            // window["processInput"]("undo")
            // window["DoUndo"](false, true);
        } else if (op === 'restart') {
            window["checkKey"]({ keyCode: 82 }, true);
            // window["processInput"]("restart")
            // window["DoRestart"]();
        } else {
            window["processInput"](4);
        }
    }

    private isLoading: boolean = false;

    load(call?: any) {
        if (this._data) {
            call && call(this);
            return;
        }
        call && this.onComplete.on(call);
        if (this.isLoading) return;
        this.isLoading = true;
        leaf.Res.getRes(this.name).load().then((r) => {
            this.isLoading = false;
            this._data = compile(["restart"], r.data as string);
            if (this._data.metadata.again_interval !== undefined) {
                this.againInterval = this._data.metadata.again_interval * 1000;
            } else {
                this.againInterval = 150;
            }
            this._levels = [];
            for (let i = 0; i < this._data.levels.length; i++) {
                if (this._data.levels[i] && !this._data.levels[i].message) {
                    this._data.levels[i].index = i;
                    this._levels.push(this._data.levels[i]);
                }
            }
            this.onComplete.dispatch(this.data);
        })
    }

    onComplete = new ecs.Broadcast<any>();

    private static games: { [index: string]: PuzzleScriptGameData } = {};

    static getGameData(name: string) {
        if (!this.games[name]) {
            this.games[name] = new PuzzleScriptGameData(name);
        }
        return this.games[name];
    }

}