
@orange.autoload("EliminationScene")
export class EliminationScene {

    world: ecs.World;
    scene: ecs.Scene;

    constructor(world: ecs.World) {
        this.world = world;
        world.scene = this.scene = new ecs.Scene();

        // let bp =ecs.Entity.create();
        // bp.parent = world.scene;
        // bp.transform.anchorOffsetX = 30;
        // bp.transform.anchorOffsetY = 50;
        // bp.transform.angle = 30 * Math.PI / 180;
        // bp.transform.x = 100;
        // bp.transform.y = 100;
        // bp.transform.scaleX = 2;
        // bp.transform.scaleY = 2;

        // let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
        // bm.entity.parent = bp;
        // bm.resource = "pure-item-4-4";

        // let label = ecs.Entity.create().addComponent(leaf.Label);
        // label.parent = world.scene;
        // label.text = "E";
        // label.transform.x = 100;
        // label.transform.y = 100;
        // label.transform.alpha = 0.7;

        // let label2 = ecs.Entity.create().addComponent(leaf.Label);
        // label2.parent = world.scene;
        // label2.text = "E";
        // label2.transform.alpha = 0.7;
        // label2.transform.x = 70;
        // label2.transform.y = 50;

        // console.error("wt");

        (async () => {
            await leaf.Res.getRes("pure-exml_json").load();
            let json = leaf.Res.getRes("pure-exml_json").data["pure-chicken-show.json"];
            console.error(json)
            let exml = ecs.Entity.create().addComponent(eui.EXML, json);
            exml.entity.parent = world.scene;
            exml.playTweenGroup(exml.animation, 0);
            window["te"] = exml;
        })();

    }

    close() {
        this.scene.destroy();
    }

}