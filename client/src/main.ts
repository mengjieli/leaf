import { FaceScene } from "./modules/puzzle/face/face-scene";
import { PuzzleScene } from "./modules/puzzle/puzzle-scene";
import { PuzzleScriptScene } from "./modules/puzzle-script/puzzle-script-scene";
import { PlayerData } from "./net/player-data";
import { Platform } from "./utils/platform";
import { MainScene } from "./modules/main/main-scene";
import { BullScene } from "./modules/bull/bull-scene";
import { BubbleScene } from "./modules/bubble/bubble-scene";
import { SquareManScene } from "./modules/square-man/square-man-scene";
import { WaterScene } from "./modules/water/water-scene";
import { PixiScene } from "./modules/pixi/pixi-scene";

export class Main {

    constructor() {
        this.init();
    }

    async init() {
        if (window["IS_WEB"]) {
            try {
                window["require"] = eval("__webpack_require__");
                for (let k in window["require"].c) {
                    window["require"].c["../client" + k.slice(2, k.length)] = window["require"].c[k];
                }
            } catch (e) {

            }
            await orange.startup({
                native: {
                    ip: "localhost",//"192.168.0.100",//(new orange.URLUtil(window.location.href)).params["serverIp"] || "localhost",
                    autoCompile: true
                }
            });
        }
        leaf.init();
        leaf.world.root.transform.scaleX = leaf.world.root.transform.scaleY = leaf.GLCore.width / 640;
        leaf.Res.loadResources().then(() => {
            leaf.Res.getRes("block_png").load().then(
                () => {
                    // new BullScene();
                    // new FaceScene(true);
                    // new PuzzleScene();
                    // new MainScene();
                    // new BubbleScene();
                    // new SquareManScene();
                    new PixiScene();
                }
            )
        })
    }

}

window["Main"] = Main;