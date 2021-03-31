
@orange.autoload("EliminationScene")
export class EliminationScene {

    world: ecs.World;
    scene: ecs.Scene;

    constructor(world: ecs.World) {
        let r = world.getSystem(leaf.RecordSystem);
        // r.startReplay({ "36": [{ "id": 0, "frame": 36 }], "63": [{ "id": 1, "frame": 63 }], "64": [{ "id": 2, "frame": 64 }] });
        r.startReplay({ "29": [{ "id": 0, "frame": 29 }], "53": [{ "id": 1, "frame": 53 }], "54": [{ "id": 2, "frame": 54 }] });
        // r.startRecord();
        console.error("?")

        this.world = world;
        world.scene = this.scene = new ecs.Scene();

        leaf.Res.getRes("pure-exml_json").load().then(() => {
            let json = leaf.Res.getRes("pure-exml_json").data["pure-chicken-show.json"];
            let exml = ecs.Entity.create().addComponent(eui.EXML, json);
            exml.entity.parent = world.scene;
            exml.playTweenGroup(exml.animation, 0);
            window["te"] = exml;
            console.error(json, leaf.world.runInfo.frame);
        })
    }

    close() {
        this.scene.destroy();
    }

}