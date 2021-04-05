
orange.autoloadLink("PuzzleScene");

export class PuzzleTip extends ecs.Component {

    label: leaf.Label;

    init(text: string = '', color = 0xff8888, time = 2000) {
        this.parent = leaf.world.scene;

        let label = ecs.Entity.create().addComponent(leaf.Label);
        label.text = text;
        label.fontSize = 10;
        label.fontColor = color;

        let rect = ecs.Entity.create().addComponent(leaf.Bitmap);
        rect.parent = this.entity;
        rect.transform.alpha = 0.8;
        rect.texture = leaf.PointTexture.getTexture(0);
        rect.transform.scaleX = label.textWidth + 20;
        rect.transform.scaleY = label.textHeight + 10;

        label.parent = this.entity;

        label.transform.x = (leaf.getStageWidth() - label.textWidth) / 2;
        label.transform.y = (leaf.getStageHeight() - label.textHeight) / 2;
        rect.transform.x = label.transform.x - 10;
        rect.transform.y = label.transform.y - 5;

        this.transform.alpha = 0;
        this.transform.y += 30;
        this.addComponent(tween.Tween, this.transform, 300, {
            alpha: 1,
            y: this.transform.y - 30
        }, tween.EaseFunction.QuadEaseOut)

        setTimeout(() => {
            this.addComponent(tween.Tween, this.transform, 300, {
                alpha: 0,
                y: this.transform.y - 30
            }, tween.EaseFunction.QuadEaseIn).onComplete = () => {
                this.entity.destroy();
            }
        }, time);
    }

    static show(txt: string, color = 0xff8888, time = 2000) {
        ecs.Entity.create().addComponent(PuzzleTip, txt);
    }

}