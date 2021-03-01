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

        let ts = ["resources/64x64_1.png", "resources/64x64_2.png", "resources/128x128_1.png", "resources/128x128_2.png", "resources/256x256_1.png", "resources/256x256_2.png", "resources/flower.png"];
        new ImageLoader(ts, this.loadImageComplete, this);
    }

    private loadImageComplete(images: HTMLImageElement[]): void {
        // var t1 = new leaf.Texture(leaf.GLCore.createTexture(images[0]), images[0].width, images[0].height);
        // var t2 = new leaf.Texture(leaf.GLCore.createTexture(images[1]), images[1].width, images[1].height);
        // var t3 = new leaf.Texture(leaf.GLCore.createTexture(images[2]), images[2].width, images[2].height);
        // var t4 = new leaf.Texture(leaf.GLCore.createTexture(images[3]), images[3].width, images[3].height);
        // var t5 = new leaf.Texture(leaf.GLCore.createTexture(images[4]), images[4].width, images[4].height);
        // var t6 = new leaf.Texture(leaf.GLCore.createTexture(images[5]), images[5].width, images[5].height);
        // var t7 = new leaf.Texture(leaf.GLCore.createTexture(images[6]), images[6].width, images[6].height);

        var ts = [];
        // var ts = [t1, t2, t3, t4, t5, t6, t7];
        for (let i = 0; i < images.length; i++) {
            ts[i] = new leaf.Texture(leaf.GLCore.createTexture(images[i]), images[i].width, images[i].height);
        }

        let world = leaf.init();
        let scene = new ecs.Scene();
        world.scene = scene;
        // for (let i = 0; i < 1; i++) {
        //     let t = ts[~~(Math.random() * ts.length)];;
        //     let entity = ecs.Entity.create();
        //     entity.parent = scene;
        //     entity.addComponent(leaf.Bitmap).texture = t;
        //     entity = ecs.Entity.create();
        //     entity.parent = scene;
        //     entity.addComponent(leaf.Bitmap).texture = t;
        //     entity = ecs.Entity.create();
        //     entity.parent = scene;
        //     entity.addComponent(leaf.Bitmap).texture = t;
        // }
        // scene.addComponent(Move);


        let t = ts[~~(Math.random() * ts.length)];;
        let p = ecs.Entity.create();
        p.parent = scene;
        // p.transform.scaleX = 2;
        p.transform.angle = Math.PI / 2;
        // p.transform.x = 100;
        // p.transform.y = 100;
        let entity = ecs.Entity.create();
        // entity.parent = scene;
        // entity.addComponent(leaf.Bitmap).texture = ts[2];
        // entity = ecs.Entity.create();
        // entity.parent = p;
        let lb = entity.addComponent(leaf.Label);
        // lb.text = "你在想啥？!~";
        window["lb"] = lb;
        lb.fontColor = 0xff0000;
        entity.transform.x = 100;
        entity.transform.y = 0;

        leaf.GLCore.scale = leaf.GLCore.width / 640;

        scene.transform.scaleX = leaf.GLCore.width / 640;
        scene.transform.scaleY = leaf.GLCore.width / 640;

        let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
        bm.entity.parent = p;
        bm.texture = ts[0];
        bm.entity.transform.x = 100;



        let bm2 = ecs.Entity.create().addComponent(leaf.Bitmap);
        // bm2.entity.parent = scene;
        bm2.texture = ts[1];
        // bm2.entity.transform.x = 200;
        // bm2.entity.transform.y = 30;

        // lb.entity.transform.angle = -Math.PI / 4;

        setInterval(() => {
            lb.text = `fps:${leaf.runInfo.fps}\nt:${leaf.runInfo.fpsTime}\ndc:${leaf.runInfo.fpsDrawCall}\nnum:${leaf.runInfo.fpsDrawCount}`;
        }, 1000)

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