namespace ecs {

    export class Color {

        readonly id: number;

        private _r: number = 0;
        private _g: number = 0;
        private _b: number = 0;

        get r() { return this._r; }
        set r(val: number) { this._r = val; }
        get g() { return this._g; }
        set g(val: number) { this._g = val; }
        get b() { return this._b; }
        set b(val: number) { this._b = val; }

        init(r: number = 0, g: number = 0, b: number = 0) {
            this.r = r;
            this.g = g;
            this.b = b;
        }

        set(r: number, g: number, b: number) {
            this.r = r;
            this.g = g;
            this.b = b;
        }

        set value(val: number) {
            this.r = ((val >> 16) & 0xFF) / 0xFF;
            this.g = ((val >> 8) & 0xFF) / 0xFF;
            this.b = (val & 0xFF) / 0xFF;
        }

        get value(): number {
            return (~~(this.r * 256)) << 16 | (~~(this.g * 256)) << 8 | (~~(this.b * 256));
        }

        clone() {
            return ecs.ObjectPools.createRecyableObject(Color, this.r, this.g, this.b);
        }
    }

}