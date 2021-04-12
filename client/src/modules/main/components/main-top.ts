orange.autoloadLink("MainScene");

export class MainTop extends ecs.Component {

    onChangeMenu = new ecs.Broadcast<number>();

    private menuRoot: ecs.Entity;

    private menuIndex: number;

    private _selected: number;

    get selected() {
        return this._selected;
    }

    set selected(val: number) {
        if (this._selected === val) return;
        if (val < 0) return;
        if (val >= this.menuRoot.children.length) return;
        this._selected = val;
        this.onChangeMenu.dispatch(val);
        for (let i = 0; i < this.menuRoot.children.length; i++) {
            if (i === val) {
                this.menuRoot.children[i].children[1].getComponent(leaf.Label).transform.alpha = 0;
                this.menuRoot.children[i].children[2].getComponent(leaf.Label).transform.alpha = 1;
            } else {
                this.menuRoot.children[i].children[1].getComponent(leaf.Label).transform.alpha = 1;
                this.menuRoot.children[i].children[2].getComponent(leaf.Label).transform.alpha = 0;
            }
        }
    }

    init() {
        this.menuIndex = 0;
        this.menuRoot = ecs.Entity.create();
        this.menuRoot.parent = this.entity;
        this.menuRoot.transform.y = 200;
        this.addMenu("收藏");
        this.addMenu("活动");
        this.addMenu("热门");
        this.addMenu("推荐");
        this.addMenu("其它");
    }

    addMenu(name: string) {
        let index = this.menuIndex++;

        let p = ecs.Entity.create();
        p.transform.x = 17 + index * 121;
        p.parent = this.menuRoot;

        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        bg.texture = leaf.PointTexture.getTexture(0);
        bg.parent = p;
        bg.transform.scaleX = 120;
        bg.transform.scaleY = 50;
        bg.transform.alpha = 0;

        let label1 = ecs.Entity.create().addComponent(leaf.Label);
        label1.fontSize = 28;
        label1.fontColor = 0x777777;
        label1.text = name;
        label1.parent = p;
        label1.transform.x = 33;
        label1.transform.y = 10;

        let label2 = ecs.Entity.create().addComponent(leaf.Label);
        label2.fontSize = 31;
        label2.fontColor = 0xfb76a3;
        label2.text = name;
        label2.parent = p;
        label2.transform.x = label1.transform.x - 3;
        label2.transform.y = label1.transform.y - 3;
        label2.transform.alpha = 0;

        p.addComponent(leaf.TouchComponent).onTouchStart.on(() => {
            this.selected = index;
        });
    }

    onDestroy() {
        this.onChangeMenu.removeAll();
        this.menuRoot = null;
    }
}