import { ImageLoader } from "./ImageLoader";

export class Main {


    constructor() {
        leaf.GLCore.init();
        let gl = leaf.GLCore.gl;
        gl.viewport(0, 0, leaf.GLCore.width, leaf.GLCore.height);
        gl.enable(gl.BLEND);
        gl.enable(gl.STENCIL_TEST);
        gl.blendColor(1.0, 1.0, 1.0, 1.0);
        //gl.enable(gl.CULL_FACE);
        gl.activeTexture(gl.TEXTURE0);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // let ts = ["resources/64x64_1.png", "resources/64x64_2.png"];//, "resources/128x128_1.png", "resources/128x128_2.png", "resources/256x256_1.png", "resources/256x256_2.png", "resources/flower.png"];
        // new ImageLoader(ts, this.loadImageComplete, this);
        this.init();
    }

    async init() {
        // let loader = new leaf.Loader();
        // loader.add("default", "resources/default.res.json", {
        //     loadType: leaf.LoaderType.TEXT
        // }).load((loader, resources) => {
        //     console.error(resources);
        // })
        await leaf.Res.loadResources();
        let res = leaf.Res.getRes<leaf.Texture>("button_back");
        console.error(res)
        res.addCount();
        res.load().then(() => {
            // console.error(res.data)
            let world = leaf.init();
            let scene = new ecs.Scene();
            world.scene = scene;
            scene.addComponent(leaf.Bitmap).texture = res.data;
        });
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