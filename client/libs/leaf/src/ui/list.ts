namespace leaf {

    export class List<T> extends ecs.Component implements ScollerTarget {

        private _data: any[];

        private itemRenderClass: ListItemRenderer<T>;

        private virtual: boolean;

        private items: ListItemRenderer<T>[];

        private listRoot: ecs.Entity;

        contentWidth: number;

        contentHeight: number;

        width: number;

        height: number;

        get viewPort() {
            return this.listRoot.transform;
        }

        init(data: any[], itemRenderClass: any, width: number, height: number, virtual: boolean = true) {
            this._data = data;
            this.itemRenderClass = itemRenderClass;
            this.width = width;
            this.height = height;
            this.virtual = virtual;
            this.items = [];
            this.listRoot = ecs.Entity.create();
            this.listRoot.parent = this.entity;
            this.addComponent(leaf.RectMask, 0, 0, width, height);
        }

        set data(val: T[]) {
            this.viewPort.y = 0;
            this._data = val;
            this.updateContentRect();
            this.refresh();
        }

        get data(): T[] {
            return this._data;
        }

        awake() {
            this.updateContentRect();
            this.refresh();
        }

        updateContentRect() {
            this.contentWidth = this.contentHeight = 0;
            let layout: Layout = this.getComponent(Layout as any);
            if (!layout) return;
            let endX = 0;
            let endY = 0;
            for (let i = 0; i < this._data.length; i++) {
                if (layout) {
                    let p = layout.getPosition(i, this._data.length, this.width, this.height);
                    if (i === 0) {
                        this.contentWidth = layout.itemWidth;
                        this.contentHeight = layout.itemHeight;
                        endX = p.x + layout.itemWidth;
                        endY = p.y = layout.itemHeight;
                    } else {
                        if (p.x + layout.itemWidth > endX) endX = p.x + layout.itemWidth;
                        if (p.y + layout.itemHeight > endY) endY = p.y + layout.itemHeight;
                    }
                }
            }
            this.contentWidth = endX;
            this.contentHeight = endY;
        }


        refresh() {
            if (this.virtual) {
                let layout: Layout = this.getComponent(Layout as any);
                let index = 0;
                for (let i = 0; i < this._data.length; i++) {
                    if (layout) {
                        let p = layout.getPosition(i, this._data.length, this.width, this.height);
                        p.x += this.viewPort.x;
                        p.y += this.viewPort.y;
                        if (p.x + layout.itemWidth < 0 || p.x > this.width || p.y + layout.itemHeight < 0 || p.y > this.height) {
                            for (let f = 0; f < this.items.length; f++) {
                                if (this.items[f].data === this._data[i]) {
                                    let item = this.items.splice(f, 1)[0];
                                    item.entity.destroy();
                                    break;
                                }
                            }
                            continue;
                        }
                    }
                    let item: ListItemRenderer<T>;
                    for (let f = 0; f < this.items.length; f++) {
                        if (this.items[f].data === this._data[i]) {
                            if (f != index) {
                                item = this.items.splice(f, 1)[0];
                                this.items.splice(index, 0, item);
                            } else {
                                item = this.items[f];
                            }
                            break;
                        }
                    }
                    if (!item) {
                        if (this.items[index]) {
                            this.items[this.items.length] = this.items[index];
                        }
                        item = ecs.Entity.create().addComponent(this.itemRenderClass);
                        item.data = null;
                        item.parent = this.listRoot;
                        this.items[index] = item;
                    }
                    if (layout) layout.updatePosition(item.entity, i, this._data.length, this.width, this.height);
                    item.data = this._data[i];
                    item.onData(this._data[i]);
                    index++;
                }
            } else {
                let layout: Layout = this.getComponent(Layout as any);
                for (let i = 0; i < this._data.length; i++) {
                    let item: ListItemRenderer<T>;
                    if (i < this.items.length) {
                        item = this.items[i];
                    } else {
                        item = ecs.Entity.create().addComponent(this.itemRenderClass);
                        item.data = null;
                        item.parent = this.listRoot;
                        this.items[i] = item;
                    }
                    if (layout) layout.updatePosition(item.entity, i, this._data.length, this.width, this.height);
                    item.data = this._data[i];
                    item.onData(this._data[i]);
                }
            }
            while (this.items.length > this._data.length) {
                this.items.pop().entity.destroy();
            }
        }

        onDestroy() {
            this._data = null;
            this.itemRenderClass = null;
            this.items = null;
        }

    }

}