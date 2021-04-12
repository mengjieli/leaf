namespace leaf {


    export class HorizontalLayout extends Layout {

        private _gap: number;

        private itemSize: number;

        get itemWidth(): number {
            return this.itemSize;
        }

        get itemHeight(): number {
            return this.itemHeight;
        }

        init(itemSize: number = 0, gap: number = 0) {
            this._gap = gap;
            this.itemSize = itemSize;
        }

        updatePosition(item: ecs.Entity, index: number, max: number, width: number, height: number) {
            item.transform.x = this.getPosition(index, max, width, height).x;
        }

        getPosition(index: number, max: number, width: number, height: number) {
            return { x: index * (this.itemSize + this._gap), y: 0 };
        }
    }

}