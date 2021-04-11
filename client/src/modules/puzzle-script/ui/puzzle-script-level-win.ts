import { PuzzleScriptGame } from "../components/puzzle-script-game";
import { PuzzleScriptGameData } from "../data/puzzle-script-game-data";
import { PuzzleScriptTip } from "./puzzle-script-tip";
import { PuzzleScriptGameShow } from "../components/puzzle-script-game-show";
import { PuzzleScriptGameSize } from "../components/puzzle-script-game-size";
import { PlayerData } from "../../../net/player-data";
import { VideoAd } from "../../../utils/video-ad";
import { VideoConst } from "../../../utils/video-const";
import { PuzzleScriptScene } from "../puzzle-script-scene";

orange.autoloadLink("PuzzleScene");

export class PuzzleScriptLevelWin extends ecs.Component {


    gameName: string;

    init(name: string = 'game1-1_txt') {
        // this.gameName = name;
        // let name = this.gameName;
        let root = ecs.Entity.create();
        root.parent = this.entity;
        root.transform.y = 40;

        VideoAd.createVideo(VideoConst.unlock_level);

        let listScroller = ecs.Entity.create();
        listScroller.parent = root;
        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.parent = listScroller;
        bg.texture = leaf.PointTexture.getTexture(0x00ff00);
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight() - 40 - 60;
        bg.transform.alpha = 0;

        let levelList = ecs.Entity.create();
        levelList.parent = listScroller;
        listScroller.addComponent(leaf.RectMask, 0, 0, leaf.getStageWidth(), bg.transform.scaleY)

        // let mask = ecs.Entity.create().addComponent(leaf.Bitmap);
        // mask.texture = leaf.PointTexture.getTexture(0);
        // mask.parent = this.entity;
        // mask.transform.scaleX = leaf.getStageWidth();
        // mask.transform.scaleY = 40;

        // mask = ecs.Entity.create().addComponent(leaf.Bitmap);
        // mask.texture = leaf.PointTexture.getTexture(0);
        // mask.parent = this.entity;
        // mask.transform.scaleX = leaf.getStageWidth();
        // mask.transform.scaleY = 60;
        // mask.transform.y = leaf.getStageHeight() - mask.transform.scaleY;

        let listHeight = leaf.getStageHeight() - 60 - 40;

        let maxLevel = PlayerData.instance.getGame(name).maxLevel;
        // console.error('关卡', `${name}_maxStage`, v);
        PuzzleScriptGameData.getGameData(name).load((cfg) => {
            // for (let i = cfg.levels.length; i < 40; i++) {
            //     cfg.levels[i] = cfg.levels[~~(Math.random() * cfg.levels.length)];
            // }
            for (let i = 0; i < cfg.levels.length; i++) {
                let levelui = ecs.Entity.create();
                levelui.parent = levelList;
                levelui.transform.x = [30, 140][i % 2];
                levelui.transform.y = 130 * (~~(i / 2));

                let levelParent = ecs.Entity.create();
                levelParent.parent = levelui;
                levelParent.addComponent(LevelShortCut, levelList, listHeight, i + 1, i <= maxLevel, name, cfg.levels[i].level);

                if (i > maxLevel) {
                    let levelMask = ecs.Entity.create().addComponent(leaf.Bitmap);
                    levelMask.texture = leaf.PointTexture.getTexture(0);
                    levelMask.transform.alpha = Math.min(0.9, 0.7 + 0.02 * (i - maxLevel));
                    levelMask.transform.scaleX = 100;
                    levelMask.transform.scaleY = 100;
                    levelMask.transform.y = 20;
                    levelMask.parent = levelui;

                    if (i === maxLevel + 1) {
                        let video = ecs.Entity.create().addComponent(leaf.Bitmap);
                        video.resource = "icon-video_png";//(PlayerData.instance.shareIndex%3) === 0? "icon-share_png" : "";
                        video.parent = levelui;
                        video.transform.y = 55;
                        video.transform.x = 0;
                        video.transform.scaleX = video.transform.scaleY = 0.3;

                        let label = ecs.Entity.create().addComponent(leaf.Label);
                        label.fontSize = 12;
                        label.text = "点击解锁关卡";
                        label.parent = levelui;
                        label.transform.y = 60;
                        label.transform.x = 23;
                    }
                }

                let touchAd = false;
                levelui.addComponent(leaf.TouchComponent).onTouchEnd.on(() => {
                    if (startScroll) return;
                    if (i === maxLevel + 1) {
                        if (touchAd) return;
                        touchAd = true;
                        VideoAd.show(VideoConst.unlock_level, () => {
                            PlayerData.instance.getGame(name).maxLevel++;
                            PlayerData.instance.save();
                            leaf.world.scene = null;
                            new PuzzleScriptScene(name);
                        }, () => {
                            touchAd = false;
                        })
                        return;
                    }
                    if (i + 1 > maxLevel + 1) {
                        PuzzleScriptTip.show("完成上一关即可解锁，加油～");
                        return;
                    }
                    this.entity.destroy();
                    PuzzleScriptGame.start(name, i);
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
                    if (levelList.transform.y < listHeight - 130 * (Math.ceil(cfg.levels.length / 2))) {
                        levelList.transform.y = listHeight - 130 * (Math.ceil(cfg.levels.length / 2));
                    }
                    if (levelList.transform.y > 0) levelList.transform.y = 0;
                }
            })


            levelList.transform.y = -(Math.ceil(maxLevel / 2) - 1) * 130;
            if (levelList.transform.y < listHeight - 130 * (Math.ceil(cfg.levels.length / 2))) {
                levelList.transform.y = listHeight - 130 * (Math.ceil(cfg.levels.length / 2));
            }
            if (levelList.transform.y > 0) levelList.transform.y = 0;
        })
    }



}

class LevelShortCut extends ecs.Component {

    levelIndex: number;
    config: PuzzleScriptGameData;
    gameName: string;
    shortCut: ecs.Entity;
    list: ecs.Entity;
    listHeight: number;
    hasLock: boolean;

    init(list: ecs.Entity, listHeight: number, levelIndex: number, hasLock: boolean, gameName: string, config: PuzzleScriptGameData) {
        this.list = list;
        this.listHeight = listHeight;
        this.levelIndex = levelIndex;
        this.gameName = gameName;
        this.config = config;
        this.hasLock = hasLock;
    }

    update() {
        let y = this.entity.parent.transform.y;
        let toY = y + 130;
        if (toY + this.list.transform.y > 0 && y + this.list.transform.y < this.listHeight) {
            if (!this.shortCut) this.addShortCut(this.levelIndex, this.hasLock, this.gameName, this.config);
        } else {
            if (this.shortCut) {
                this.shortCut.destroy();
                this.shortCut = null;
            }
        }
    }

    addShortCut(levelIndex: number, hasLock: boolean, name: string, config: PuzzleScriptGameData) {
        this.shortCut = ecs.Entity.create();
        this.shortCut.parent = this.entity;
        let level = ecs.Entity.create().addComponent(PuzzleScriptGame, name, levelIndex - 1);
        level.addComponent(PuzzleScriptGameShow);
        level.addComponent(PuzzleScriptGameSize, 100, 100);
        level.parent = this.shortCut;
        level.transform.y = 20;
        let label = ecs.Entity.create().addComponent(leaf.Label);
        label.text = `第${levelIndex}关`;
        label.parent = this.shortCut;
        label.fontSize = 20;
        if (!hasLock)
            label.transform.alpha = 0.8;
    }

}