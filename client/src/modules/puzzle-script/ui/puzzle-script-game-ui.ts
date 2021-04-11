import { PuzzleScriptGame } from "../components/puzzle-script-game";
import { PuzzleScriptLevelWin } from "./puzzle-script-level-win";
import { PlayerData } from "../../../net/player-data";
import { PuzzleScriptGameResult } from "./puzzle-level-game-result";

orange.autoloadLink("PuzzleScene");

export class PuzzleScriptGameUI extends ecs.Component {

    uiRoot: ecs.Entity;

    game: PuzzleScriptGame;

    awake() {
        this.game = this.getComponent(PuzzleScriptGame);
        this.uiRoot = ecs.Entity.create();
        this.uiRoot.parent = this.entity;

        // let upBtn = [
        //     [0]
        // ]
        let dirGroup = ecs.Entity.create();
        dirGroup.parent = this.uiRoot;
        let arrGroup = ecs.Entity.create();
        arrGroup.parent = dirGroup;


        let upBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        upBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(
            `${0xffffff},${0xaa0000}\n` +
            '...0...\n' +
            '..000..\n' +
            '.00000.\n' +
            '0..0..0\n' +
            '...0...\n' +
            '...0...\n' +
            '...0...'
        ));
        upBtn.transform.x = 9;
        upBtn.parent = arrGroup;

        let rightBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        rightBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(
            `${0xffffff},${0xaa0000}\n` +
            '...0...\n' +
            '..0....\n' +
            '.00....\n' +
            '0000000\n' +
            '.00....\n' +
            '..0....\n' +
            '...0...\n'
        ));
        rightBtn.transform.angle = Math.PI * 180 / 180;
        rightBtn.transform.x = 25;
        rightBtn.transform.y = 17;
        rightBtn.parent = arrGroup;

        let leftBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        leftBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(
            `${0xffffff},${0xaa0000}\n` +
            '...0...\n' +
            '..0....\n' +
            '.00....\n' +
            '0000000\n' +
            '.00....\n' +
            '..0....\n' +
            '...0...\n'
        ));
        leftBtn.transform.x = 0;
        leftBtn.transform.y = 10;
        leftBtn.parent = arrGroup;


        let downBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        downBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(
            `${0xffffff},${0xaa0000}\n` +
            '...0...\n' +
            '..000..\n' +
            '.00000.\n' +
            '0..0..0\n' +
            '...0...\n' +
            '...0...\n' +
            '...0...'
        ));
        downBtn.transform.angle = Math.PI * 180 / 180;
        downBtn.transform.x = 16;
        downBtn.transform.y = 26;
        downBtn.parent = arrGroup;

        let rect = ecs.Entity.create().addComponent(leaf.Bitmap);
        rect.texture = leaf.PointTexture.getTexture(0xff0000);
        rect.transform.scaleX = rect.transform.scaleY = 33;
        rect.parent = arrGroup;
        rect.transform.x = -4;
        rect.transform.alpha = 0;
        rect.transform.y = -4;
        rect.addComponent(leaf.TouchComponent).onTouchStart.on(e => {
            let rot = Math.atan2(e.localY - 0.5, e.localX - 0.5) * 180 / Math.PI;
            leftBtn.transform.alpha = rightBtn.transform.alpha
                = upBtn.transform.alpha = downBtn.transform.alpha = 1;
            if (rot <= 45 && rot >= -45) {
                rightBtn.transform.alpha = 0.5;
            } else if (rot >= -135 && rot < -45) {
                upBtn.transform.alpha = 0.5;
            } else if (rot >= 45 && rot <= 135) {
                downBtn.transform.alpha = 0.5;
            } else {
                leftBtn.transform.alpha = 0.5;
            }
        })
        rect.getComponent(leaf.TouchComponent).onTouchEnd.on(e => {
            leftBtn.transform.alpha = rightBtn.transform.alpha
                = upBtn.transform.alpha = downBtn.transform.alpha = 1;
            let rot = Math.atan2(e.localY - 0.5, e.localX - 0.5) * 180 / Math.PI;
            let dir = "right";
            if (rot <= 45 && rot >= -45) {
                dir = "right";
            } else if (rot >= -135 && rot < -45) {
                dir = "up";
            } else if (rot >= 45 && rot <= 135) {
                dir = "down";
            } else {
                dir = "left";
            }
            this.game.data.run(dir as any);
            // console.error(dir);
            if (window["winning"] && !this.entity.getComponent(PuzzleScriptGameResult)) {
                if (PlayerData.instance.getGame(this.game.data.name).maxLevel < this.game.level + 1) {
                    PlayerData.instance.getGame(this.game.data.name).maxLevel = this.game.level + 1;
                    PlayerData.instance.save();
                }
                this.entity.addComponent(PuzzleScriptGameResult);
            }
            // console.error(e.localX, e.localY, Math.atan2(e.localY - 0.5, e.localX - 0.5) * 180 / Math.PI);
        })

        arrGroup.transform.x = 5;
        arrGroup.transform.y = 0;

        dirGroup.transform.x = 2;
        dirGroup.transform.y = -5;

        dirGroup.transform.scaleX = dirGroup.transform.scaleY = 1.3;

        let xBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        xBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(
            `${0xffffff},${0xaa0000}\n` +
            '...0...\n' +
            '..0.0..\n' +
            '.00000.\n' +
            '0.....0'
        ));
        xBtn.transform.scaleY = 2;
        xBtn.transform.x = 40;
        xBtn.transform.y = 10;
        xBtn.parent = dirGroup;

        let zBtn = ecs.Entity.create().addComponent(leaf.Bitmap);
        zBtn.texture = leaf.RectTexture.getTexture(leaf.RectTexture.formatColors(
            `${0xffffff},${0xaa0000}\n` +
            '000....\n' +
            '0..0...\n' +
            '0000...\n' +
            '0..0...\n' +
            '000....\n'
        ));
        zBtn.transform.scaleY = 1.6;
        zBtn.transform.x = 55;
        zBtn.transform.y = 10;
        zBtn.parent = dirGroup;
        leftBtn.entity.name = 'h';

        this.entity.name = 'w';

        this.uiRoot.transform.y = leaf.getStageHeight() - 160;

        this.uiRoot.transform.scaleX = this.uiRoot.transform.scaleY = 3;

        this.addClick(xBtn, () => {
            this.game.getComponent(PuzzleScriptGame).data.run("undo");
        })
        this.addClick(zBtn, () => {
            this.game.getComponent(PuzzleScriptGame).data.run("restart");
        })
    }

    addClick(btn: leaf.Bitmap, call: Function) {
        btn.addComponent(leaf.TouchComponent).onTouchStart.on(() => {
            btn.transform.alpha = 0.8;
        })
        btn.getComponent(leaf.TouchComponent).onTouchEnd.on(() => {
            btn.transform.alpha = 1;
            call && call();
        })
    }

}