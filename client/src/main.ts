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
        leaf.Res.loadResources().then(() => {
            let world = leaf.init();
            new EliminationScene(world);
        })
    }

}

window["Main"] = Main;