namespace leaf {



    export class VerticalLayout extends Layout {

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
            item.transform.y = this.getPosition(index, max, width, height).y;
        }

        getPosition(index: number, max: number, width: number, height: number): { x: number, y: number } {
            return { y: index * (this.itemSize + this._gap), x: 0 };
        }
    }

}