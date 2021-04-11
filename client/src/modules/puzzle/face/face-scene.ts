import { ModuleScene } from "../../../utils/ui/module-scene";
import { PuzzleScriptGame } from "../../puzzle-script/components/puzzle-script-game";
import { PuzzleScriptScene } from "../../puzzle-script/puzzle-script-scene";
import { PuzzleScriptGameShow } from "../../puzzle-script/components/puzzle-script-game-show";
import { PuzzleScriptGameSize } from "../../puzzle-script/components/puzzle-script-game-size";
import { PlayerData } from "../../../net/player-data";
import { Platform } from "../../../utils/platform";
import { GameStorage } from "../../../utils/storage/game-storage";
import { GameConfig } from "../../../utils/game-config";

@orange.autoload("FaceScene")
export class FaceScene extends ModuleScene {

    constructor(first: boolean = false) {
        super(0.5);

        let top = 60;
        let ui = ecs.Entity.create();
        ui.parent = this.scene;
        // label

        if (first) {
            if (Platform.isWeb) {
                PlayerData.instance.load(() => {
                });
            } else {
                let tc = this.scene.addComponent(leaf.TouchComponent);
                tc.touchChildrenEnabled = false;
                tc.touchEnabled = false;
                Platform.login((d) => {
                    PlayerData.instance.decode(d);
                    vlabel.text = GameConfig.version + "_" + PlayerData.instance.uid;
                    console.error("login");
                    tc.destroy();
                    let has = false;
                    let list = [];
                    for (let name of gameList) {
                        list.push(GameStorage.getStorage(`${name}_maxStage`).then((v) => {
                            if (PlayerData.instance.getGame(name).maxLevel < ~~v) {
                                PlayerData.instance.getGame(name).maxLevel = ~~v;
                                has = true;
                            }
                        }));
                        GameStorage.setStorage(`${name}_maxStage`, 0);
                    }
                    Promise.all(list).then(() => {
                        if (has) {
                            console.error("has save");
                            PlayerData.instance.save();
                        }
                    })
                })
            }
        }

        let root = ecs.Entity.create();
        root.parent = ui;
        root.transform.y = top;

        let vlabel = ecs.Entity.create().addComponent(leaf.Label);
        vlabel.parent = this.scene;
        vlabel.text = GameConfig.version + (first ? "" : "_" + PlayerData.instance.uid);
        vlabel.fontColor = 0xffffff;
        vlabel.fontSize = 10;
        vlabel.transform.y = leaf.getStageHeight() - vlabel.fontSize;
        vlabel.transform.alpha = 0.6;

        let listScroller = ecs.Entity.create();
        listScroller.parent = root;
        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.parent = listScroller;
        bg.texture = leaf.PointTexture.getTexture(0x00ff00);
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight() - top - 60;
        bg.transform.alpha = 0;

        let levelList = ecs.Entity.create();
        levelList.parent = listScroller;
        listScroller.addComponent(leaf.RectMask, 0, 0, leaf.getStageWidth(), bg.transform.scaleY)

        // let mask = ecs.Entity.create().addComponent(leaf.Bitmap);
        // mask.texture = leaf.PointTexture.getTexture(0xff0000);
        // mask.parent = ui;
        // mask.transform.scaleX = leaf.getStageWidth();
        // mask.transform.scaleY = top;
        // mask.transform.alpha = 0.3;

        // mask = ecs.Entity.create().addComponent(leaf.Bitmap);
        // mask.texture = leaf.PointTexture.getTexture(0xff0000);
        // mask.parent = ui;
        // mask.transform.scaleX = leaf.getStageWidth();
        // mask.transform.scaleY = 60;
        // mask.transform.y = leaf.getStageHeight() - mask.transform.scaleY;
        // mask.transform.alpha = 0.3;

        let listHeight = leaf.getStageHeight() - 60 - top;

        let gameList = [
            // 'game1-1_txt',
            // 'game1-2_txt',
            // 'game1-3_txt',
            // 'game1-4_txt',
            // 'game1-5_txt',
            'game1-6_txt',
        ]
        let nameList = [
            // '经典推箱子',
            // '走迷宫',
            // '初级推箱子',
            // '吃苹果',
            // '飞踢',
            '贪吃蛇',
        ]

        for (let i = 0; i < gameList.length; i++) {
            let levelui = ecs.Entity.create();
            levelui.parent = levelList;
            levelui.transform.x = [30, 140][i % 2];
            levelui.transform.y = 130 * (~~(i / 2));

            let level = ecs.Entity.create().addComponent(PuzzleScriptGame, gameList[i], 0, () => {
                // level.addComponent(leaf.BatchRender)
            });
            level.addComponent(PuzzleScriptGameShow);
            level.addComponent(PuzzleScriptGameSize, 100, 100);
            level.transform.y = 20;
            level.transform.x = 0;
            level.parent = levelui;
            let label = ecs.Entity.create().addComponent(leaf.Label);
            label.text = nameList[i];
            label.parent = levelui;
            label.fontSize = 20;

            levelui.addComponent(leaf.TouchComponent).onTouchEnd.on(() => {
                if (startScroll) return;
                setTimeout(() => {
                    new PuzzleScriptScene(gameList[i]);
                })
            })
        }

        let startX = 0;
        let startY = 0;
        let levelY = levelList.transform.y;
        let startScroll = false;
        listScroller.addComponent(leaf.TouchComponent).onTouchStart.on((e) => {
            startScroll = false;
            startX = e.stageX;
            startY = e.stageY;
            levelY = levelList.transform.y;
        })
        listScroller.getComponent(leaf.TouchComponent).onTouchMove.on((e) => {
            if (Math.abs(e.stageX - startX) > 10 || Math.abs(e.stageY - startY) > 10) {
                startScroll = true;
            }
            if (startScroll) {
                levelList.transform.y = levelY - startY + e.stageY;
                if (levelList.transform.y < listHeight - 130 * (Math.ceil(gameList.length / 2))) {
                    levelList.transform.y = listHeight - 130 * (Math.ceil(gameList.length / 2));
                }
                if (levelList.transform.y > 0) {
                    levelList.transform.y = 0;
                }
            }
        })
    }

    makeLevel() {
        let copySearch = function (source: number[][]): number[][] {
            let copy = [];
            for (let y = 0; y < h; y++) {
                copy[y] = [];
                for (let x = 0; x < w; x++) {
                    copy[y][x] = source[y][x];
                }
            }
            return copy;
        }

        console.clear();
        let w = 25;
        let h = 25;
        let grids: number[][] = [];
        let search: number[][] = [];
        for (let y = 0; y < h; y++) {
            search[y] = [];
            grids[y] = [];
            for (let x = 0; x < w; x++) {
                search[y][x] = 0;
                grids[y][x] = y === 0 || x === 0 || x === w - 1 || y === h - 1 ? 1 : 0;
            }
        }

        grids[0][1] = 2;
        grids[h - 1][w - 2] = 3;
        let offsets = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        let source = copySearch(grids);

        while (true) {
            let count = 0;
            grids = copySearch(source);
            for (let y = 0; y < h; y++) {
                let x = ~~(w * Math.random());
                if (grids[y][x]) {
                    continue;
                }
                let flag = true;
                if (grids[y + 1][x] || grids[y - 1][x] || grids[y - 1][x - 1] || grids[y - 1][x + 1]
                    || grids[y + 1][x - 1] || grids[y + 1][x + 1]) {
                    flag = false;
                    continue;
                }
                if (!flag) continue;
                grids[y][x] = 1;
                let addX = Math.random() < 0.5 ? -1 : 1;
                let cx = x + addX;
                while (cx >= 1 && cx < w - 1) {
                    let flag = true;
                    if (grids[y + 1][cx] || grids[y - 1][cx] || grids[y - 1][cx - 1] || grids[y - 1][cx + 1] ||
                        grids[y + 1][cx - 1] || grids[y + 1][cx + 1]) {
                        flag = false;
                        break;
                    }
                    grids[y][cx] = 1;
                    count++;
                    cx += addX;
                    if (!flag) continue;
                    if (Math.random() < 0.2) continue;
                }
            }
            if (count > w + h) break;
        }


        let count = 0;
        while (count < h / 2) {
            for (let y = 0; y < h; y++) {
                let x = ~~(w * Math.random());
                if (!grids[y][x] && !grids[y][x - 1] && !grids[y][x + 1] &&
                    (!grids[y - 1][x] && !grids[y - 1][x - 1] && !grids[y - 1][x + 1]
                        || !grids[y + 1][x] && !grids[y + 1][x - 1] && !grids[y + 1][x + 1])) {
                    grids[y][x] = 1;
                    count++;
                }
            }
        }


        let print = (blocks) => {
            let str = '\n';
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    str += blocks[y][x];
                }
                str += '\n';
            }
            console.error(str);
        }

        let endX = w - 2;
        let endY = h - 1;
        let results: { x: number, y: number }[][] = [];
        let paths: { x: number, y: number, path: { x: number, y: number }[], search: number[][] }[] =
            [{ x: 1, y: 0, path: [{ x: 1, y: 0 }], search: search }];
        while (paths.length && true) {
            if (results.length >= 1) break;
            let path = paths.splice(~~(paths.length * Math.random()), 1)[0];
            // if (path.path.length < (w + h) * 1) continue;
            path.search[path.y][path.x] = 1;
            let cks = offsets.concat();
            while (cks.length) {
                let offset = cks.splice(~~(Math.random() * cks.length), 1)[0];
                let x = path.x + offset[0];
                let y = path.y + offset[1];
                if (x === endX && y === endY) {
                    results.push(path.path.concat({ x: x, y: y }));
                    print(path.search);
                    console.error(path.path.length);
                    continue;
                }
                if (x < 0 || x >= w || y < 0 || y >= h) continue;
                if (path.search[y][x]) continue;
                if (grids[y][x]) continue;
                let flag = true;
                for (let co of offsets) {
                    if (path.search[y + co[1]][x + co[0]] && (x + co[0] != path.x || y + co[1] != path.y)) {
                        flag = false;
                        break;
                    }
                }
                if (!flag) continue;
                let search = copySearch(path.search);
                search[path.y][path.x] = 1;
                paths.push({
                    x: x, y: y, path: path.path.concat([{ x: x, y: y }]),
                    search
                })
            }
        }
        for (let i = 0; i < results.length; i++) {
            for (let j = 0; j < results.length; j++) {
                if (i === j) continue;
                if (results[i].length != results[j].length) continue;
                let flag = true;
                for (let k = 0; k < results[i].length; k++) {
                    if (results[i][k].x != results[j][k].x || results[i][k].y != results[j][k].y) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    console.error("same ???", i, j, results[i], results[j]);
                    return;
                }
            }
        }
        // console.error(results);
        grids = copySearch(source);
        let path = results.pop();
        path.shift();
        let indexs = [];
        for (let p of path) {
            let ind = p.x + p.y * w;
            indexs.push(ind);
        }
        for (let p of path) {
            for (let off of offsets) {
                let x = p.x + off[1];
                let y = p.y + off[0];
                if (x < 0 || x >= w || y < 0 || y >= h) continue;
                let ind = x + y * w;
                if (indexs.indexOf(ind) != -1) continue;
                if (!grids[y][x]) grids[y][x] = 1;
                // console.error(x, y, ind, indexs);
            }
        }
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                grids[y][x] = [".", "#", "P", "O"][grids[y][x]] as any;
            }
        }
        print(grids);
        // console.error(JSON.stringify(grids, null, 2));
    }

}