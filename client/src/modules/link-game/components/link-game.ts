orange.autoloadLink("LinkScene");

export class LinkGame extends ecs.Component {

    awake() {
        for (let x = 0; x < 96; x++) {
            for (let y = 0; y < 96; y++) {
                let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
                bm.texture = leaf.PointTexture.getTexture(0xff0000);
                bm.transform.x = x;
                bm.transform.y = y;
                bm.entity.parent = this.entity;
            }
        }

        for (let x = 0; x < 96; x++) {
            for (let y = 0; y < 96; y++) {
                let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
                bm.texture = leaf.PointTexture.getTexture(0x0000ff);
                bm.transform.x = x + 96;
                bm.transform.y = y + 96;
                bm.entity.parent = this.entity;
            }
        }

        this.addComponent(leaf.BatchRender);

        this.entity.transform.x = 30;
        this.entity.transform.y = 30;
        this.entity.transform.angle = 0.1;

        leaf.StateWin.show();
    }

    // update() {
    //     this.transform.angle += 0.001;
    // }

}