orange.autoloadLink("LinkScene");

export class LinkGame extends ecs.Component {

    awake() {
        let bm = this.addComponent(leaf.Bitmap);
        bm.resource = "block_png";
        this.entity.transform.scaleX = 470;
        this.entity.transform.scaleY = 100;
        bm.tint = 0x550000;
        bm.addComponent(leaf.TouchComponent).onTouchEnd.on(e => {
            console.error(e.localX, e.localY, e.stageX, e.stageY);
        })
    }

}