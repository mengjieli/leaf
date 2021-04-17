import { PuzzleGameLoop } from "./puzzle-game-loop";
import { EMPuzzleMove } from "../config/puzzle-game-config";
import { PuzzleGame } from "./puzzle-game";
import { PuzzleGameResult } from "./puzzle-game-result";

orange.autoloadLink("PuzzleScene");

export class PuzzleGameUI extends ecs.Component {

    uiRoot: ecs.Entity;

    game: PuzzleGame;

    init(game: PuzzleGame) {
        this.game = game;
    }

    awake() {
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
        rightBtn.transform.angleZ = Math.PI * 180 / 180;
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
        downBtn.transform.angleZ = Math.PI * 180 / 180;
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
            let dir = EMPuzzleMove.RIGHT;
            if (rot <= 45 && rot >= -45) {
                dir = EMPuzzleMove.RIGHT;
            } else if (rot >= -135 && rot < -45) {
                dir = EMPuzzleMove.UP;
            } else if (rot >= 45 && rot <= 135) {
                dir = EMPuzzleMove.DOWN;
            } else {
                dir = EMPuzzleMove.LEFT;
            }
            this.game.getComponent(PuzzleGameLoop).run(dir);
            console.error(dir);
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

        this.uiRoot.transform.y = leaf.getStageHeight() - 100;

        this.uiRoot.transform.scaleX = this.uiRoot.transform.scaleY = 3;

        // this.addClick(upBtn, () => {
        //     this.game.getComponent(PuzzleGameLoop).run(EMPuzzleMove.UP);
        // })
        // this.addClick(downBtn, () => {
        //     this.game.getComponent(PuzzleGameLoop).run(EMPuzzleMove.DOWN);
        // })
        // this.addClick(leftBtn, () => {
        //     this.game.getComponent(PuzzleGameLoop).run(EMPuzzleMove.LEFT);
        // })
        // this.addClick(rightBtn, () => {
        //     this.game.getComponent(PuzzleGameLoop).run(EMPuzzleMove.RIGHT);
        // })
        this.addClick(xBtn, () => {
            this.game.getComponent(PuzzleGameLoop).back();
        })
        this.addClick(zBtn, () => {
            this.game.getComponent(PuzzleGame).reload();
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