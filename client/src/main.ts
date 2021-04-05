import { FaceScene } from "./modules/puzzle/face/face-scene";
import { PuzzleScene } from "./modules/puzzle/puzzle-scene";

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
        leaf.world.root.transform.scaleX = leaf.world.root.transform.scaleY = leaf.GLCore.width / 256;
        console.error(leaf.GLCore.width, leaf.world.root.transform.scaleX);
        leaf.Res.loadResources().then(() => {
            leaf.Res.getRes("block_png").load().then(
                () => {
                    // new PuzzleScene();
                    new FaceScene();
                }
            )
        })
    }

}

window["Main"] = Main;