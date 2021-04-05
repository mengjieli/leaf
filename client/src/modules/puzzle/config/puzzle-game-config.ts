import { PuzzleGameLevel } from "../component/puzzle-game-level";

orange.autoloadLink("PuzzleScene");

export class PuzzleGameConfig {

    blockWidth = 0;
    blockHeight = 0;
    objects: { [index: string]: PuzzleGameObjectConfig } = {};
    legends: { [index: string]: PuzzleGameObjectConfig[] } = {};
    groups: { [index: string]: PuzzleGameObjectConfig[] } = {};
    ruleObjects: PuzzleGameObjectConfig[] = [];
    maxLayer: number = 0;
    rules: PuzzleRule[] = [];
    winConditions: PuzzleCondition[] = [];
    levels: PuzzleGameLevelConfig[] = [];
    messages: string[][] = [];
    face: PuzzleGameLevelConfig;

    constructor(txt: string) {
        txt = txt.toLocaleLowerCase();
        txt = this.mergeSpace(txt);
        // while (txt.indexOf('(') != -1) {
        //     let toIndex = txt.indexOf(')', txt.indexOf('('));
        //     if (toIndex === -1) break;
        //     txt = txt.slice(0, txt.indexOf('(')) + txt.slice(txt.indexOf(')', txt.indexOf('(')) + 1, txt.length);
        // }
        let lines = txt.split("\n");
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let isDevice = this.isBlockDevice(line);
            if (isDevice) {
                i++;
                let name = lines[i];
                if (name === EMPuzzleGameModel.OBJECTS) i = this.parseObjects(lines, i + 2);
                if (name === EMPuzzleGameModel.LEGEND) i = this.parseLegend(lines, i + 2);
                if (name === EMPuzzleGameModel.COLLISIONLAYERS) i = this.parseCollisionLayers(lines, i + 2);
                if (name === EMPuzzleGameModel.RULES) i = this.parseRules(lines, i + 2);
                if (name === EMPuzzleGameModel.WINCONDITIONS) i = this.parseWinConditions(lines, i + 2);
                if (name === EMPuzzleGameModel.LEVELS) i = this.parseLevels(lines, i + 2);
                if (name === EMPuzzleGameModel.FACE) i = this.parseFace(lines, i + 2);
                for (let name in this.objects) this.objects[name].game = this;
            }
        }
        for (let name in this.objects) {
            if (this.blockWidth < this.objects[name].width) this.blockWidth = this.objects[name].width;
            if (this.blockHeight < this.objects[name].height) this.blockHeight = this.objects[name].height;
        }
        for (let name in this.objects) {
            let obj = this.objects[name];
            if (!obj.blocks.length || !obj.blocks[0].length) {
                for (let y = 0; y < this.blockHeight; y++) {
                    obj.blocks[y] = [];
                    for (let x = 0; x < this.blockWidth; x++) {
                        obj.blocks[y][x] = obj.colors[0];
                    }
                }
            }
        }
    }

    parseFace(lines: string[], index: number): number {
        let level: PuzzleGameLevelConfig;
        let y = 0;
        for (let i = index; i < lines.length; i++) {
            let line = lines[i];
            if (this.isBlockDevice(line)) {
                if (level) {
                    this.levels.push(level);
                }
                console.error(this.levels);
                return i - 1;
            }
            line = this.deleteSpace(line);
            if (line.length) {
                if (!level) {
                    level = new PuzzleGameLevelConfig();
                    level.game = this;
                    level.width = 0;
                    level.height = 0;
                }
                for (let i = 0; i < line.length; i++) {
                    let c = line.charAt(i);
                    if (i >= level.width) level.width = i + 1;
                    if (!this.legends[c]) {
                        console.error(`parse level error, no legend:`, c, 'layer:', line);
                    }
                    let x = i;
                    for (let obj of this.legends[c]) {
                        if (!level.layerObjects[obj.layer]) level.layerObjects[obj.layer] = [];
                        if (level.layerObjects[obj.layer].indexOf(obj) === -1) level.layerObjects[obj.layer].push(obj);
                        if (!level.layers[obj.layer]) level.layers[obj.layer] = [];
                        if (!level.layers[obj.layer][y]) level.layers[obj.layer][y] = [];
                        level.layers[obj.layer][y][x] = obj;
                    }
                }
                level.height++;
                y++;
            } else {
                if (level) {
                    this.levels.push(level);
                }
                level = null;
            }
        }
        if (level) {
            this.face = level;
        }
        return lines.length;
    }

    parseLevels(lines: string[], index: number): number {
        let level: PuzzleGameLevelConfig;
        let y = 0;
        for (let i = index; i < lines.length; i++) {
            let line = lines[i];
            if (line.slice(0, 'message '.length) === 'message ') {
                if (!this.messages[this.levels.length]) {
                    this.messages[this.levels.length] = [];
                }
                this.messages[this.levels.length].push(line.slice('message '.length, line.length));
                continue;
            }
            if (this.isBlockDevice(line)) {
                if (level) {
                    this.levels.push(level);
                }
                console.error(this.levels);
                return i - 1;
            }
            line = this.deleteSpace(line);
            if (line.length) {
                if (!level) {
                    level = new PuzzleGameLevelConfig();
                    level.game = this;
                    level.width = 0;
                    level.height = 0;
                    y = 0;
                }
                for (let i = 0; i < line.length; i++) {
                    let c = line.charAt(i);
                    if (i >= level.width) level.width = i + 1;
                    if (!this.legends[c]) {
                        console.error(`parse level error, no legend:`, c, 'layer:', line);
                    }
                    let x = i;
                    for (let obj of this.legends[c]) {
                        if (!level.layerObjects[obj.layer]) level.layerObjects[obj.layer] = [];
                        if (level.layerObjects[obj.layer].indexOf(obj) === -1) level.layerObjects[obj.layer].push(obj);
                        if (!level.layers[obj.layer]) level.layers[obj.layer] = [];
                        if (!level.layers[obj.layer][y]) level.layers[obj.layer][y] = [];
                        level.layers[obj.layer][y][x] = obj;
                    }
                }
                level.height++;
                y++;
            } else {
                if (level) {
                    this.levels.push(level);
                }
                level = null;
            }
        }
        if (level) {
            this.levels.push(level);
        }
        console.error(this.levels);
        return lines.length;
    }

    parseWinConditions(lines: string[], index: number): number {
        for (let i = index; i < lines.length; i++) {
            let line = lines[i];
            if (this.isBlockDevice(line)) {
                console.error(this.winConditions);
                return i - 1;
            }
            line = this.mergeSpace(line);
            line = this.deleteSpaceFrontEnd(line);
            if (line.length) {
                let cond = new PuzzleCondition();
                let strs = line.split(' ');
                if (strs.length === 4) {
                    cond.limit = strs[0] as any;
                    if (!this.groups[strs[1]]) {
                        console.error('parse win condition error, no object:', strs[1], " ,line:", line);
                    }
                    cond.master = this.groups[strs[1]];
                    cond.relation = strs[2] as any;
                    if (!this.groups[strs[3]]) {
                        console.error('parse win condition error, no object:', strs[3], " ,line:", line);
                    }
                    cond.other = this.groups[strs[3]];
                    for (let c of cond.master) {
                        if (this.ruleObjects.indexOf(c) === -1) this.ruleObjects.push(c);
                    }
                    for (let c of cond.other) {
                        if (this.ruleObjects.indexOf(c) === -1) this.ruleObjects.push(c);
                    }
                } else if (strs.length === 2) {
                    cond.limit = strs[0] as any;
                    if (!this.groups[strs[1]]) {
                        console.error('parse win condition error, no object:', strs[0], " ,line:", line);
                    }
                    cond.master = this.groups[strs[0]];
                    for (let c of cond.master) {
                        if (this.ruleObjects.indexOf(c) === -1) this.ruleObjects.push(c);
                    }
                }
                this.winConditions.push(cond);
            }
        }
    }

    parseRules(lines: string[], index: number): number {
        for (let i = index; i < lines.length; i++) {
            let line = lines[i];
            if (this.isBlockDevice(line)) {
                console.error(this.rules);
                return i - 1;
            }
            if (i === index && !this.rules.length) {
                i--;
                line = '[moving player] -> [moving player]';
            }
            //[ >  Player | Crate ] -> [  >  Player | > Crate  ]
            //1. -> 分割前后
            //2. [] 分为一组
            //3. 第一个分组的第一个力为初始力
            //4. 每个分组由 | 分割为部分
            //5. 每个部分由 "力 对象" 的格式组成
            // force: EMPuzzleKey;
            // ranks: PuzzleGameObjectConfig[][];
            // toRanks: PuzzleGameObjectConfig[][];
            // toForces: EMPuzzleForce[][];
            if (line.indexOf("->") != -1) {
                let rule = new PuzzleRule();
                rule.source = line;
                rule.ranks = [];
                rule.toRanks = [];
                rule.toForces = [];
                rule.limits = [];
                rule.toLimits = [];
                // line = this.deleteSpace(line);
                let befores = line.split("->")[0];
                let ends = line.split("->")[1];

                //解析前面的限定词
                let lets = line.split("[")[0];
                lets = this.deleteSpaceFrontEnd(lets);
                if (lets.length) {
                    let words = lets.split(" ");
                    for (let word of words) {
                        if (puzzleDirections.indexOf(word) != -1) {
                            rule.directions = puzzleDirection[word];
                        }
                    }
                }
                //解析前半部分
                let rules = befores.match(/\[[a-zA-Z0-9><\| \t]+\]/g)
                if (!rules) {
                    console.error("parse error rule:", line);
                }
                for (let str of rules) {
                    let rank = [];
                    let limit = [];
                    rule.ranks.push(rank);
                    rule.limits.push(limit);
                    str = str.slice(1, str.length - 1);
                    let legends = str.split("|");
                    for (let legend of legends) {
                        let limit2 = [];
                        let isFirst = legends.indexOf(legend) === 0;
                        legend = this.deleteSpaceFrontEnd(this.mergeSpace(legend));
                        if (legend === '...') {
                            rank.push(null);
                        } else {
                            let rank2 = [];
                            limit.push(limit2);
                            rank.push(rank2);
                            if (!legend) {
                                continue;
                            }
                            let strs = legend.split(' ');
                            if (puzzleForces.indexOf(strs[0]) != -1) {
                                rule.force = strs[0] as any;
                                strs.shift();
                            }
                            let index = 0;
                            for (let subStr of strs) {
                                if (puzzleConditionLimits.indexOf(subStr) != -1) {
                                    limit2[index] = subStr;
                                } else {
                                    if (!this.groups[subStr]) {
                                        console.error("parse error rule, no object:", subStr, '\n', line);
                                    }
                                    for (let objCfg of this.groups[subStr]) {
                                        if (this.ruleObjects.indexOf(objCfg) === -1) {
                                            this.ruleObjects.push(objCfg);
                                        }
                                    }
                                    limit2[index] = limit2[index] || null;
                                    rank2[index++] = this.groups[subStr];
                                }
                            }
                        }
                    }
                }
                if (!rule.force) rule.force = EMPuzzleForce.NONE;
                rules = ends.match(/\[[a-zA-Z0-9><\| \t]+\]/g)
                rule.index = this.rules.length;
                this.rules.push(rule);
                for (let str of rules) {
                    let toRank = [];
                    let toForce = [];
                    let toLimit = [];
                    rule.toRanks.push(toRank);
                    rule.toForces.push(toForce);
                    rule.toLimits.push(toLimit);

                    str = str.slice(1, str.length - 1);
                    let legends = str.split("|");
                    for (let legend of legends) {
                        let froceIndex = 0;
                        let toRank2 = [];
                        let toLimit2 = [];
                        let toForce2 = [];
                        toRank.push(toRank2);
                        toLimit.push(toLimit2);
                        toForce.push(toForce2);
                        if (!legend) {
                            continue;
                        }
                        legend = this.deleteSpaceFrontEnd(this.mergeSpace(legend));
                        let strs = legend.split(' ');
                        let index = 0;
                        for (let str of strs) {
                            if (legend === '...') {
                                toForce2[froceIndex] = null;
                                toLimit2[index] = null;
                                toRank2[index++] = null;
                            } else if (puzzleForces.indexOf(str) != -1) {
                                toForce2[froceIndex] = str;
                            } else if (puzzleConditionLimits.indexOf(str) != -1) {
                                toLimit2[index] = str;
                            } else {
                                if (!str) {
                                    toLimit2[index] = toLimit2[index] || null;
                                    toRank2[index++] = null;
                                } else {
                                    if (!this.groups[str]) {
                                        console.error("parse error rule, no object:", legend, '\n', line);
                                    }
                                    for (let objCfg of this.groups[str]) {
                                        if (this.ruleObjects.indexOf(objCfg) === -1) {
                                            this.ruleObjects.push(objCfg);
                                        }
                                    }
                                    toLimit2[index] = toLimit2[index] || null;
                                    toRank2[index++] = this.groups[str];
                                }
                            }
                        }
                    }
                }
                //解析后半部分
                // if (rank.length) {
                //     if (rank.length != toRank.length || rank.length != force.length) {
                //         console.error("parse error rule, length no equals:", line);
                //     }
                // }
            }
        }
        this.rules.sort((a, b) => a.ranks.length - b.ranks.length);
        return lines.length;
    }

    parseCollisionLayers(lines: string[], index: number): number {
        for (let i = index; i < lines.length; i++) {
            let line = lines[i];
            if (this.isBlockDevice(line)) {
                return i - 1;
            }
            line = this.deleteSpace(line);
            if (line.length) {
                let names = line.split(",");
                for (let name of names) {
                    name = this.deleteSpace(name);
                    for (let obj of this.groups[name]) {
                        obj.layer = this.maxLayer;
                    }
                }
                this.maxLayer++;
            }
        }
        return lines.length;
    }

    parseLegend(lines: string[], index: number): number {
        for (let i = index; i < lines.length; i++) {
            let line = lines[i];
            if (this.isBlockDevice(line)) {
                console.error(this.legends);
                return i - 1;
            }
            if (line.indexOf("=") != -1) {
                let legend = line.split("=")[0];
                let name = line.split("=")[1];
                name = this.deleteSpace(name);
                legend = this.deleteSpace(legend);
                if (legend.length === 1) {
                    this.legends[legend] = [];
                    let names = name.split("and");
                    for (let n of names) {
                        n = this.deleteSpace(n);
                        this.legends[legend].push(this.objects[n]);
                    }
                } else {
                    this.groups[legend] = [];
                    let names = name.split("or");
                    for (let n of names) {
                        this.groups[legend].push(this.objects[n]);
                    }
                }
            }
        }
        return lines.length;
    }

    parseObjects(lines: string[], index: number): number {
        for (let i = index; i < lines.length; i++) {
            let line = lines[i];
            if (this.isBlockDevice(line)) {
                console.error(this.objects);
                return i - 1;
            }
            let name = line.match(/[a-zA-Z0-9]+/) && line.match(/[a-zA-Z0-9]+/).length ? line.match(/[a-zA-Z0-9]+/)[0] : "";
            if (name && name.length) {
                let obj = new PuzzleGameObjectConfig();
                obj.name = name;
                obj.colors = {};
                obj.blocks = [];
                obj.width = 0;
                obj.height = 0;
                i++;
                let colorTexts = lines[i++].match(/[#0-9a-zA-Z]+/g);
                let colorSum = '';
                for (let c = 0; c < colorTexts.length; c++) {
                    let cstr = colorTexts[c];
                    let nums = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 }
                    if (cstr.charAt(0) == '#') {
                        obj.colors[c + ''] = 0;
                        for (let i = 0; i < cstr.length - 1; i++) {
                            let char = cstr.charAt(cstr.length - 1 - i);
                            obj.colors[c + ''] += (nums[char]) * Math.pow(16, i);
                        }
                    } else {
                        obj.colors[c + ''] = colorDefines[colorTexts[c].toUpperCase()];
                    }
                }
                for (; i < lines.length; i++) {
                    if (!lines[i].match(/[0-9\.]+/)) {
                        break;
                    }
                    let lineBlock = [];
                    for (let c = 0; c < lines[i].length; c++) {
                        lineBlock.push(obj.colors[lines[i][c]]);
                        colorSum += (obj.colors[lines[i][c]] || '0') + "_";
                    }
                    colorSum += "|"
                    obj.colorId = colorSum;
                    obj.blocks.push(lineBlock);
                    obj.width = lineBlock.length;
                }
                i--;
                obj.height = obj.blocks.length;
                this.objects[obj.name] = obj;
                this.groups[obj.name] = [obj];
            }
        }
        return lines.length;
    }

    isBlockDevice(line: string) {
        return line.length && line.match(/=/g) && line.match(/=/g).length === line.length;
    }

    deleteSpace(line: string): string {
        while (line.indexOf(" ") != -1) {
            line = line.replace(" ", "");
        }
        while (line.indexOf("\t") != -1) {
            line = line.replace("\t", "");
        }
        while (line.indexOf("\n") != -1) {
            line = line.replace("\n", "");
        }
        while (line.indexOf("\r") != -1) {
            line = line.replace("\r", "");
        }
        return line;
    }

    mergeSpace(line: string): string {
        return line.replace(/[ \t]+/g, ' ');
    }

    deleteSpaceFrontEnd(line: string): string {
        let start = 0;
        for (; start < line.length; start++) {
            if (line.charAt(start) != ' ' && line.charAt(start) != '\t'
                && line.charAt(start) != '\n' && line.charAt(start) != '\r') break;
        }
        let end = line.length - 1;
        for (; end >= 0; end--) {
            if (line.charAt(end) != ' ' && line.charAt(end) != '\t'
                && line.charAt(start) != '\n' && line.charAt(start) != '\r') break;
        }
        return line.slice(start, end + 1);
    }

    static map: { [index: string]: PuzzleGameConfig } = {};

    static getGameConfig(name: string, txt?: string) {
        if (this.map[name]) return this.map[name];
        return this.map[name] = new PuzzleGameConfig(txt);
    }

    static loadGameConfig(name: string, call?: (cfg: PuzzleGameConfig) => any) {
        leaf.Res.getRes(name) &&
            leaf.Res.getRes(name).load().then(r => {
                try {
                    let cfg = this.getGameConfig(name, r.data as string);
                    call && call(cfg);
                } catch (e) {
                    console.error('parse puzzle error:\n', r.data);
                    console.error(e);
                }
            });
    }
}

export class PuzzleGameLevelConfig {

    get level(): number {
        return this.game && this.game.levels.indexOf(this) + 1 || 0;
    }

    game: PuzzleGameConfig;

    width: number;

    height: number;

    layers: PuzzleGameObjectConfig[][][] = [];

    layerObjects: PuzzleGameObjectConfig[][] = [];
}

export enum EMPuzzleKey {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
    A = 'z',
    B = 'x'
}

export enum EMPuzzleDirection {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

export var puzzleDirection = {
    up: ['up'],
    left: ['left'],
    right: ['right'],
    down: ['down'],
    horizontal: ['left', 'right'],
    vertical: ['up', 'down'],
}

export var puzzleDirections = ['up', 'left', 'right', 'down', 'horizontal', 'vertical'];

export enum EMPuzzleConst {
    PLAYER = 'player',
    BACKGROUND = 'background'
}

export enum EMPuzzleMove {
    NONE = 'none',
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
}

export enum EMPuzzleForce {
    PUSH = '>',
    PULL = '<',
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
    MOVING = 'moving',
    NONE = 'none'
}

export var puzzleForces: string[] = ['>', '<', 'up', 'down', 'left', 'right', 'moving'];

export enum EMPuzzleGameModel {
    OBJECTS = 'objects',
    LEGEND = 'legend',
    SOUNDS = 'sounds',
    COLLISIONLAYERS = 'collisionlayers',
    RULES = 'rules',
    WINCONDITIONS = 'winconditions',
    LEVELS = 'levels',
    FACE = 'face'
}

export class PuzzleGameObjectConfig {
    name: string;
    width: number;
    height: number;
    colors: { [index: string]: number };
    colorId: string;
    blocks: number[][];
    layer: number = 0;
    game: PuzzleGameConfig;
}

export class PuzzleRule {
    index: number;
    force: EMPuzzleForce;
    ranks: PuzzleGameObjectConfig[][][][];
    limits: EMPuzzleConditionLimit[][][];
    toRanks: PuzzleGameObjectConfig[][][][];
    toLimits: EMPuzzleConditionLimit[][][];
    toForces: EMPuzzleForce[][][];
    source: string;
    directions: EMPuzzleDirection[];
}

export enum EMPuzzleConditionLimit {
    NO = 'no',
    ALL = 'all',
    SOME = 'some'
}

export var puzzleConditionLimits = ['no', 'all', 'some'];

export enum EMPuzzleConditionRelation {
    NONE = '',
    ON = 'on'
}

export class PuzzleCondition {
    limit: EMPuzzleConditionLimit;
    master: PuzzleGameObjectConfig[];
    relation: EMPuzzleConditionRelation;
    other: PuzzleGameObjectConfig[];
}

var colorDefines = {
    "TRANSPARENT": 0x777777,
    "BLACK": 0x555555,
    "WHITE": 0xffffff,
    "GREY": 0x9d9d9d,
    "DARKGREY": 0x6d6d6d,
    "LIGHTGREY": 0xc1c1c1,
    "GRAY": 0x9d9d9d,
    "DARKGRAY": 0x6d6d6d,
    "LIGHTGRAY": 0xc1c1c1,
    "RED": 0xbe2633,
    "DARKRED": 0x732930,
    "LIGHTRED": 0xe06f8b,
    "BROWN": 0xa46422,
    "DARKBROWN": 0x493c2b,
    "LIGHTBROWN": 0xeeb62f,
    "ORANGE": 0xeb8931,
    "YELLOW": 0xf7e26b,
    "GREEN": 0x44891a,
    "DARKGREEN": 0x2f484e,
    "LIGHTGREEN": 0xa3ce27,
    "BLUE": 0x31a2f2,
    "DARKBLUE": 0x005784,
    "LIGHTBLUE": 0xb2dcef,
    "PURPLE": 0x580780,
    "PINK": 0xe06f8b
}

function parseColorDefines(txt: string) {

    txt = `
    .cm-s-midnight span.cm-COLOR-TRANSPARENT {
        color: #777;
        font-weight: normal
    }
    
    .cm-s-midnight span.cm-COLOR-BLACK {
        color: #555
    }
    
    .cm-s-midnight span.cm-COLOR-WHITE {
        color: #fff
    }
    `
    let lines = txt.split("\n");
    let name: string;
    let colors = {};
    for (let line of lines) {
        if (line.indexOf("span.cm-COLOR-") != -1) {
            name = line.slice(line.indexOf("span.cm-COLOR-") + "span.cm-COLOR-".length, line.indexOf(" {"));
            line = lines[lines.indexOf(line) + 1];
            let color = "0x" + line.split("#")[1];
            if (color.length === 5) {
                color = "0x" + color[2] + color[2] + color[3] + color[3] + color[4] + color[4];
            }
            colors[name] = color;
        }
    }
    console.error(JSON.stringify(colors, null, 2));
}