import { ImageLoader } from "./ImageLoader";
import { EliminationScene } from "./modules/elimination/elimination-scene";

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
        await leaf.Res.loadResources();
        let world = leaf.init();
        new EliminationScene(world);
        // let scene = new ecs.Scene();
        // world.scene = scene;
        // let bm = scene.addComponent(leaf.Bitmap);
        // bm.resource = "chicken-1";
    }

}

class Move extends ecs.Component {

    update() {
        for (var i = 0; i < this.entity.children.length - 1; i++) {
            var child = this.entity.children[i];
            child.transform.x = 300 * Math.random();
            child.transform.y = 300 * Math.random();
        }
    }

}

window["Main"] = Main;