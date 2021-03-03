namespace tiny2d {

    /**
     * 矢量
     */
    export class Vector {

        id: number;

        /**
         * 方向(弧度)
         * @internal 
         */
        private _r: number;

        get r(): number {
            return this._r;
        }

        set r(val: number) {
            if (this._r === val) return;
            this._r = val;
            this._x = Utils.cos(val);
            this._y = Utils.sin(val);
        }

        /**
         * @internal
         */
        private _x: number;

        get x(): number {
            return this._x;
        }

        set x(val: number) {
            if (this._x === val) return;
            this._x = val;
            this._r = Utils.atan2(this._y, this._x);
        }

        /**
         * @internal
         */
        private _y: number;

        get y(): number {
            return this._y;
        }

        set y(val: number) {
            if (this._y === val) return;
            this._y = val;
            this._r = Utils.atan2(this._y, this._x);
        }

        init(x: number = 1, y: number = 0, d: number = 0) {
            this._x = x;
            this._y = y;
            this._r = Utils.atan2(this._y, this._x);
            this._d = d;
            (this.dx as any) = this.x * this._d;
            (this.dy as any) = this.y * this._d;
        }

        /**
         * @internal
         */
        private _d: number = 0;

        /**
         * 大小
         */
        get d(): number {
            return this._d;
        }

        set d(val: number) {
            if (this._d === val) return;
            this._d = val;
            (this.dx as any) = this.x * this._d;
            (this.dy as any) = this.y * this._d;
        }

        readonly dx: number;

        readonly dy: number;
    }

}