import { ModuleScene } from "../../../utils/ui/module-scene";
import { PuzzleScene } from "../puzzle-scene";
import { GameStorage } from "../../../utils/storage/game-storage";
import { PuzzleGame } from "../component/puzzle-game";

@orange.autoload("FaceScene")
export class FaceScene extends ModuleScene {

    constructor() {
        super();

        // let label = ecs.Entity.create().addComponent(leaf.Label);
        // label.text = '开心游戏合集';
        // label.fontSize = 10;
        // label.transform.x = (leaf.getStageWidth() - label.textWidth) / 2;
        // label.transform.y = 25;
        // label.parent = this.scene;

        let top = 100;
        let ui = ecs.Entity.create();
        ui.parent = this.scene;

        let root = ecs.Entity.create();
        root.parent = ui;
        root.transform.y = top;

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

        let mask = ecs.Entity.create().addComponent(leaf.Bitmap);
        mask.texture = leaf.PointTexture.getTexture(0);
        mask.parent = ui;
        mask.transform.scaleX = leaf.getStageWidth();
        mask.transform.scaleY = top;

        mask = ecs.Entity.create().addComponent(leaf.Bitmap);
        mask.texture = leaf.PointTexture.getTexture(0);
        mask.parent = ui;
        mask.transform.scaleX = leaf.getStageWidth();
        mask.transform.scaleY = 60;
        mask.transform.y = leaf.getStageHeight() - mask.transform.scaleY;

        let listHeight = leaf.getStageHeight() - 60 - top;

        let gameList = [
            'game1-1_txt',
            'game1-2_txt',
        ]
        let nameList = [
            '推箱子',
            '走迷宫',
        ]

        for (let i = 0; i < gameList.length; i++) {
            let levelui = ecs.Entity.create();
            levelui.parent = levelList;
            levelui.transform.x = [30, 140][i % 2];
            levelui.transform.y = 130 * (~~(i / 2));

            let level = ecs.Entity.create().addComponent(PuzzleGame, gameList[i], 0, false, false, 100, 100);
            level.parent = levelui;
            let label = ecs.Entity.create().addComponent(leaf.Label);
            label.text = nameList[i];
            label.parent = levelui;
            label.fontSize = 20;
            level.transform.y = 20;

            levelui.addComponent(leaf.TouchComponent).onTouchEnd.on(() => {
                new PuzzleScene(gameList[i]);
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
                if (levelList.transform.y < listHeight - 130 * (~~(gameList.length / 2))) {
                    levelList.transform.y = listHeight - 130 * (~~(gameList.length / 2));
                }
                if (levelList.transform.y > 0) levelList.transform.y = 0;
            }
        })
        // new PuzzleScene('game1-1_txt')
    }

}