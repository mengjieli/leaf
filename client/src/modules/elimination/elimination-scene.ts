import { EXML } from "../../exml/exml";

@orange.autoload("EliminationScene")
export class EliminationScene {

    world: ecs.World;
    scene: ecs.Scene;

    constructor(world: ecs.World) {
        this.world = world;
        world.scene = this.scene = new ecs.Scene();

        // let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
        // bm.entity.parent = world.scene;
        // bm.resource = "chicken-1";

        console.error("wt");

        (async () => {
            await leaf.Res.getRes("pure-exml_json").load();
            let json = leaf.Res.getRes("pure-exml_json").data["pure-chicken-show.json"];
            console.error(json)
            let exml = ecs.Entity.create().addComponent(EXML, json);
            exml.entity.parent = world.scene;
            window["te"] = exml;
        })();
        //
    }

    close() {
        this.scene.destroy();
    }

}