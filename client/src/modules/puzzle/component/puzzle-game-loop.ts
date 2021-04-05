import { EMPuzzleMove, EMPuzzleForce, EMPuzzleConst, EMPuzzleConditionLimit, PuzzleGameObjectConfig } from "../config/puzzle-game-config";
import { PuzzleGame } from "./puzzle-game";
import { PuzzleGameLevel } from "./puzzle-game-level";
import { PuzzleGameObject } from "./puzzle-game-object";
import { PuzzleGameResult } from "./puzzle-game-result";

orange.autoloadLink("PuzzleScene");

export class PuzzleGameLoop extends ecs.Component {

    awake() {
        setTimeout(() => {
            // this.run(EMPuzzleMove.RIGHT);
        }, 1000);
    }

    /**
     * 运行一次
     * 后面的运动会把前面的运动覆盖，即先还原位置，再进行相应的移动，
     * 但如果某一次运动失败，会还原位置，前面的移动也相当于失效
        [ MOVING Player |  Crate ] -> [ MOVING Player | MOVING Crate ]
        [ Crate ] -> [ right Crate ]
     * ... 表示中间相隔任意远都可
     * [ > Player | ... | Crate ] -> [ | ... | Player ]
     * 
     * 方位限定强于任意远，即有方位时，任意远是受限制的，即不生效
     * right [ Player | ... |  Crate ] -> [ down Player | ... | down Crate ]
     * 
     */
    run(move: EMPuzzleMove) {
        let level = this.getComponent(PuzzleGameLevel);
        if (level.state === 'win' || level.state === 'lose') return;
        let gameConfig = this.getComponent(PuzzleGame).config;
        let moveOffset: { x: number, y: number } = this.moveOffset[move];
        //记录移动过的元素初始位置
        let changedObjects: { [index: number]: PuzzleGameObject } = {};
        let changeObjecteSource: { [index: number]: { x: number, y: number } } = {};
        for (let rule of gameConfig.rules) {
            if (!rule.ranks.length || !rule.ranks[0].length || !rule.ranks[0][0].length || !rule.ranks[0][0][0].length) continue;
            let ruleExecuteOK = true;
            while (ruleExecuteOK) {
                ruleExecuteOK = false;
                for (let overlapObjCfg of rule.ranks[0][0]) {
                    for (let objCfg of overlapObjCfg) {
                        let objs = level.getObjectsByType(objCfg);
                        for (let obj of objs) {
                            let startX = obj.x;
                            let startY = obj.y;
                            let offsets = this.forceMoveOffsets[rule.force][move];
                            let successfull = false;
                            for (let offset of offsets) {
                                if (rule.directions && rule.directions.length && rule.directions.indexOf(offset.dir) === -1) continue;
                                //开始匹配某个方向是否符合规则
                                let flag = true;
                                let anyPosistion = false;
                                for (let m = 0; m < rule.ranks.length; m++) {
                                    //计算 [> p k | c][ m ]
                                    for (let n = 0; n < rule.ranks[m].length; n++) {
                                        //计算 > p k | c
                                        let x = startX + offset.x * n;
                                        let y = startY + offset.y * n;
                                        if (!rule.ranks[m][n]) {
                                            anyPosistion = true;
                                        } else {
                                            for (let o = !m && !n && successfull ? 1 : 0; o < rule.ranks[m][n].length; o++) {
                                                if (rule.limits[m][n][o] === EMPuzzleConditionLimit.NO) {
                                                    let find = false;
                                                    //计算 p k 是否符合规则
                                                    for (let layer of level.layers) {
                                                        let check = layer.objects[y][x];
                                                        if (check && rule.ranks[m][n][o].indexOf(check.config) != -1) {
                                                            find = true;
                                                            break;
                                                        }
                                                    }
                                                    if (find) {
                                                        flag = false;
                                                    }
                                                } else {
                                                    let find = false;
                                                    //计算 p k 是否符合规则
                                                    for (let layer of level.layers) {
                                                        let check = layer.objects[y][x];
                                                        if (check && rule.ranks[m][n][o].indexOf(check.config) != -1) {
                                                            find = true;
                                                            break;
                                                        }
                                                    }
                                                    if (!find) {
                                                        flag = false;
                                                    }
                                                }
                                            }
                                        }
                                        if (!flag) break;
                                    }
                                    if (!flag) break;
                                }
                                if (flag) { //成功了，开始执行
                                    if (rule.force === EMPuzzleForce.NONE) ruleExecuteOK = true;
                                    let deleteConfigs: PuzzleGameObjectConfig[] = [];
                                    let deleteObjects: PuzzleGameObjectConfig[][][] = [];
                                    anyPosistion = false;
                                    for (let m = 0; m < rule.ranks.length; m++) {
                                        deleteObjects[m] = [];
                                        for (let n = 0; n < rule.ranks[m].length; n++) {
                                            //计算 > p k | c
                                            let x = startX + offset.x * n;
                                            let y = startY + offset.y * n;
                                            deleteObjects[m][n] = [];
                                            if (!rule.ranks[m][n]) {
                                                anyPosistion = true;
                                            } else {
                                                for (let o = !m && !n && successfull ? 1 : 0; o < rule.ranks[m][n].length; o++) {
                                                    //计算 p k 
                                                    for (let layer of level.layers) {
                                                        let check = layer.objects[y][x];
                                                        if (check && rule.ranks[m][n][o].indexOf(check.config) != -1) {
                                                            //找到了，删除对象
                                                            if (changedObjects[(x + y * level.config.width) * 1000 + check.config.layer]) {
                                                                changedObjects[(x + y * level.config.width) * 1000 + check.config.layer] = null;
                                                            }
                                                            deleteObjects[m][n][o] = check.config;
                                                            if (deleteConfigs.indexOf(check.config) === -1) {
                                                                deleteConfigs.push(check.config);
                                                            }
                                                            check.removeFromLayer();
                                                            check.entity.destroy();
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    anyPosistion = false;
                                    for (let m = 0; m < rule.toRanks.length; m++) {
                                        for (let n = 0; n < rule.toRanks[m].length; n++) {
                                            //计算 > p k | c
                                            let x = startX + offset.x * n;
                                            let y = startY + offset.y * n;
                                            if (!rule.toRanks[m][n]) {
                                                anyPosistion = true;
                                            } else {
                                                for (let o = !m && !n && successfull ? 1 : 0; o < rule.toRanks[m][n].length; o++) {
                                                    if (rule.toLimits[m][n][o] === EMPuzzleConditionLimit.NO) continue;
                                                    //计算 p k 
                                                    //生成对象
                                                    //1. 优先查找原先位置是否和现在位置的属性相符，如果相符就生成这个
                                                    //2. 查找其他位置的元素是否有相符的，有就生成
                                                    //3. 使用组里第一个

                                                    //如果是空表示删除对象
                                                    if (!rule.toRanks[m][n][o]) continue;

                                                    let toRankConfigs = rule.toRanks[m][n][o];
                                                    let newObjCfg: PuzzleGameObjectConfig;
                                                    if (toRankConfigs.indexOf(deleteObjects[m][n][o]) != -1) {
                                                        newObjCfg = deleteObjects[m][n][o];
                                                    }
                                                    if (!newObjCfg) {
                                                        for (let checkDeleteCfg of deleteConfigs) {
                                                            if (toRankConfigs.indexOf(checkDeleteCfg) != -1) {
                                                                newObjCfg = checkDeleteCfg;
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    if (!newObjCfg) {
                                                        newObjCfg = toRankConfigs[0];
                                                    }
                                                    let posIndex = (x + y * level.config.width) * 1000 + newObjCfg.layer;
                                                    //这个位置的元素生成过就删除掉
                                                    if (changedObjects[posIndex]) {
                                                        changedObjects[posIndex].removeFromLayer();
                                                        changedObjects[posIndex].entity.destroy();
                                                    }
                                                    let toX = x;
                                                    let toY = y;
                                                    let toFroce = rule.toForces[m][n][o];
                                                    if (toFroce === null) {
                                                    } else if (toFroce === EMPuzzleForce.PUSH || toFroce === EMPuzzleForce.MOVING) { //推
                                                        toX += moveOffset.x;
                                                        toY += moveOffset.y;
                                                    } else if (toFroce === EMPuzzleForce.PULL) { //拉
                                                        toX -= moveOffset.x;
                                                        toY -= moveOffset.y;
                                                    } else if (toFroce === EMPuzzleForce.RIGHT) {
                                                        toX++;
                                                    } else if (toFroce === EMPuzzleForce.LEFT) {
                                                        toX--;
                                                    } else if (toFroce === EMPuzzleForce.UP) {
                                                        toY--;
                                                    } else if (toFroce === EMPuzzleForce.DOWN) {
                                                        toY++;
                                                    }
                                                    //要移动的位置有东西了
                                                    if (level.layers[newObjCfg.layer].objects[toY][toX]) {
                                                        toX = x;
                                                        toY = y;
                                                    }
                                                    //原来的位置也有对象，即开始递归还原
                                                    if (level.layers[newObjCfg.layer].objects[toY][toX]) {
                                                        let list = [level.layers[newObjCfg.layer].objects[toY][toX]];
                                                        while (true) {
                                                            let hasNew = false;
                                                            for (let check of list) {
                                                                let checkSource = changeObjecteSource[check.id];
                                                                let sourceObject = level.layers[check.config.layer].objects[checkSource.y][checkSource.x];
                                                                if (sourceObject && sourceObject != check && list.indexOf(sourceObject) === -1) {
                                                                    list.push(sourceObject);
                                                                    hasNew = true;
                                                                }
                                                            }
                                                            if (!hasNew) break;
                                                        }
                                                        //把列表上的元素全部移除
                                                        for (let check of list) {
                                                            check.removeFromLayer();
                                                        }
                                                        //全部还原
                                                        for (let check of list) {
                                                            check.setCoord(changeObjecteSource[check.id].x, changeObjecteSource[check.id].y);
                                                            check.addToLayer();
                                                        }

                                                    }
                                                    //开始移动
                                                    changedObjects[posIndex] = ecs.Entity.create().addComponent(PuzzleGameObject, level.layers[newObjCfg.layer], newObjCfg, toX, toY);
                                                    changeObjecteSource[changedObjects[posIndex].id] = { x, y };
                                                }
                                            }
                                        }
                                    }
                                    successfull = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        // this.checkState();
    }

    checkState() {
        let level = this.getComponent(PuzzleGameLevel);
        let win = true;
        for (let item of level.config.game.winConditions) {
            if (item.limit === EMPuzzleConditionLimit.NO) {
                for (let type of item.master) {
                    if (level.layers[type.layer].getObjectByType(type)) {
                        win = false;
                        break;
                    }
                }
            } else if (item.limit === EMPuzzleConditionLimit.ALL) {
                for (let type of item.master) {
                    let masters = level.layers[type.layer].getObjectsByType(type);
                    for (let master of masters) {
                        let has = false;
                        for (let layer of level.layers) {
                            if (layer.objects[master.y][master.x] && item.other.indexOf(layer.objects[master.y][master.x].config) != -1) {
                                has = true;
                                break;
                            }
                        }
                        if (!has) {
                            win = false;
                            break;
                        }
                    }
                    if (!win) break;
                }
            } else if (item.limit === EMPuzzleConditionLimit.SOME) {
                let has = false;
                for (let type of item.master) {
                    let masters = level.layers[type.layer].getObjectsByType(type);
                    for (let master of masters) {
                        for (let layer of level.layers) {
                            if (layer.objects[master.y][master.x] && item.other.indexOf(layer.objects[master.y][master.x].config) != -1) {
                                has = true;
                                break;
                            }
                        }
                        if (has) break;
                    }
                }
                if (!has) win = false;
            }
            if (!win) break;
        }
        if (win) {
            level.state = 'win';
            console.error('恭喜过关');
            this.getComponent(PuzzleGame).ui.addComponent(PuzzleGameResult, this.getComponent(PuzzleGame));
        }
    }

    moveOffset = {
        'none': { x: 0, y: 0 },
        'right': { x: 1, y: 0 },
        'left': { x: -1, y: 0 },
        'up': { x: 0, y: -1 },
        'down': { x: 0, y: 1 }
    };

    forceMoveOffsets = {
        'none': {
            'none': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
            'right': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
            'left': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
            'up': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
            'down': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }]
        },
        '>': {
            'none': [],
            'right': [{ x: 1, y: 0, dir: 'right' }],
            'left': [{ x: -1, y: 0, dir: 'left' }],
            'up': [{ x: 0, y: -1, dir: 'up' }],
            'down': [{ x: 0, y: 1, dir: 'down' }]
        },
        '<': {
            'none': [],
            'right': [{ x: -1, y: 0, dir: 'left' }],
            'left': [{ x: 1, y: 0, dir: 'right' }],
            'up': [{ x: 0, y: 1, dir: 'down' }],
            'down': [{ x: 0, y: -1, dir: 'up' }]
        },
        'right': {
            'none': [],
            'right': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
            'left': [],
            'up': [],
            'down': []
        },
        'left': {
            'none': [],
            'right': [],
            'left': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
            'up': [],
            'down': []
        },
        'up': {
            'none': [],
            'right': [],
            'left': [],
            'up': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
            'down': []
        },
        'down': {
            'none': [],
            'right': [],
            'left': [],
            'up': [],
            'down': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }]
        },
        'moving': {
            'none': [],
            'right': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
            'left': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
            'up': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }],
            'down': [{ x: 1, y: 0, dir: 'right' }, { x: -1, y: 0, dir: 'left' }, { x: 0, y: -1, dir: 'up' }, { x: 0, y: 1, dir: 'down' }]
        }
    };

}