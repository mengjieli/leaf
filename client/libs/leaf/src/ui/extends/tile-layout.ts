namespace leaf {


    export class TileLayout extends Layout {

        private _gapv: number;

        private _gaph: number;

        private _itemWidth: number;

        private _itemHeight: number;

        get itemWidth(): number {
            return this._itemWidth;
        }

        get itemHeight(): number {
            return this._itemHeight;
        }

        init(itemWidth: number = 0, itemHeight, gapv: number = 0, gaph: number = 0) {
            this._gapv = gapv;
            this._gaph = gaph;
            this._itemWidth = itemWidth;
            this._itemHeight = itemHeight;
        }

        updatePosition(item: ecs.Entity, index: number, max: number, width: number, height: number) {
            let p = this.getPosition(index, max, width, height);
            item.transform.x = p.x;
            item.transform.y = p.y;
        }

        getPosition(index: number, max: number, width: number, height: number) {
            let maxWidth = ~~((width + this._gaph) / (this.itemWidth + this._gaph)) || 1;
            return {
                x: (index % maxWidth) * (this.itemWidth + this._gaph),
                y: (~~(index / maxWidth)) * (this.itemHeight + this._gapv)
            }

        }
    }


}