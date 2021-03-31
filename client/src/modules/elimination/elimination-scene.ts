
@orange.autoload("EliminationScene")
export class EliminationScene {

    world: ecs.World;
    scene: ecs.Scene;

    constructor(world: ecs.World) {
        this.world = world;
        world.scene = this.scene = new ecs.Scene();

        // leaf.Res.getRes("pure-exml_json").load().then(() => {
        //     let json = leaf.Res.getRes("pure-exml_json").data["pure-chicken-show.json"];
        //     let exml = ecs.Entity.create().addComponent(eui.EXML, json);
        //     exml.entity.parent = world.scene;
        //     exml.playTweenGroup(exml.animation, 0);
        //     window["te"] = exml;
        //     console.error(json, leaf.world.runInfo.frame);
        // })
    }

    close() { 
        this.scene.destroy();
    }

}