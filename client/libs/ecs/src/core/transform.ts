namespace ecs {

    export class Transform {

        constructor(entity: Entity) {
            this._entity = entity;
        }

        /**
         * @internal
         */
        private _x: number = 0;

        /**
         * @internal
         */
        private _y: number = 0;

        /**
         * @internal
         */
        private _anchorOffsetX: number = 0;

        /**
         * @internal
         */
        private _anchorOffsetY: number = 0;

        /**
         * @internal
         */
        private _scaleX: number = 1;

        /**
         * @internal
         */
        private _scaleY: number = 1;

        /**
         * @internal
         */
        private _angle: number = 0;

        /**
         * @internal
         */
        private _alpha: number = 1;

        /**
         * @internal
         */
        private dirty: boolean = false;

        /**
         * @internal
         */
        private reverseDirty: boolean = false;

        /**
         * @internal
         */
        private _local: Matrix = new Matrix();

        private _reverse: Matrix = new Matrix();

        /**
         * @internal
         */
        private _entity: Entity;

        get entity(): Entity {
            return this._entity;
        }

        get x() { return this._x; }
        set x(val: number) {
            if (this._x === val) return;
            this.dirty = this.reverseDirty = true;
            this._x = val;
        }

        get y() { return this._y; }
        set y(val: number) {
            if (this._y === val) return;
            this.dirty = this.reverseDirty = true;
            this._y = val;
        }

        get anchorOffsetX() { return this._anchorOffsetX; }
        set anchorOffsetX(val: number) {
            if (this._anchorOffsetX === val) return;
            this.dirty = this.reverseDirty = true;
            this._anchorOffsetX = val;
        }

        get anchorOffsetY() { return this._anchorOffsetY; }
        set anchorOffsetY(val: number) {
            if (this._anchorOffsetY === val) return;
            this.dirty = this.reverseDirty = true;
            this._anchorOffsetY = val;
        }

        get scaleX() { return this._scaleX; }
        set scaleX(val: number) {
            if (this._scaleX === val) return;
            this.dirty = this.reverseDirty = true;
            this._scaleX = val;
        }

        get scaleY() { return this._scaleY; }
        set scaleY(val: number) {
            if (this._scaleY === val) return;
            this.dirty = this.reverseDirty = true;
            this._scaleY = val;
        }

        get angle() { return this._angle; }
        set angle(val: number) {
            if (this._angle === val) return;
            this.dirty = this.reverseDirty = true;
            this._angle = val;
        }

        get alpha() { return this._alpha; }
        set alpha(val: number) {
            this._alpha = val;
        }

        /**
         * @internal
         */
        private _worldMatrix: Matrix = new Matrix();

        /**
         * @internal
         */
        $parent: Transform;

        get parent(): Transform {
            return this.$parent;
        }

        get local(): Matrix {
            if (this.dirty) {
                this.dirty = false;
                let local = this._local
                this._local.identity();
                let sx = this._scaleX;
                let sy = this._scaleY;
                if (sx != 1 || sy != 1) {
                    local.a *= sx;
                    local.d *= sy;
                }
                if (this._angle) {
                    var sin = Math.sin(this._angle);
                    var cos = Math.cos(this._angle);
                    local.a = cos * sx;
                    local.b = sin * sx;
                    local.c = -sin * sy;
                    local.d = cos * sy;
                }
                let tx = -this._anchorOffsetX * local.a + this._x;
                let ty = -this._anchorOffsetY * local.d + this._y;
                tx += -this._anchorOffsetY * local.c;
                ty += -this._anchorOffsetX * local.b;
                local.tx = tx;
                local.ty = ty;
            }
            return this._local;
        }

        get reverse(): Matrix {
            if (this.reverseDirty) {
                this.reverseDirty = false;
                let local = this._reverse
                local.identity();
                let sx = 1 / this._scaleX;
                let sy = 1 / this._scaleY;
                if (sx != 1 || sy != 1) {
                    local.a *= sx;
                    local.d *= sy;
                }
                if (this._angle) {
                    var sin = Math.sin(-this._angle);
                    var cos = Math.cos(-this._angle);
                    local.a = cos * sx;
                    local.b = sin * sx;
                    local.c = -sin * sy;
                    local.d = cos * sy;
                }
                let tx = -this._anchorOffsetX * local.a - this._x;
                let ty = -this._anchorOffsetY * local.d - this._y;
                tx += -this._anchorOffsetY * local.c;
                ty += -this._anchorOffsetX * local.b;
                local.tx = tx;
                local.ty = ty;
            }
            return this._reverse;
        }

        get worldMatrix() {
            let dis = this.$parent;
            let local = this.local;
            this._worldMatrix.setTo(local.a, local.b, local.c, local.d, local.tx, local.ty);
            while (dis) {
                this._worldMatrix.concat(dis.local);
                dis = dis.$parent;
            }
            return this._worldMatrix;
        }

        get worldAlpha() {
            let dis = this.$parent;
            let alpha = this._alpha;
            while (dis) {
                alpha *= dis._alpha;
                dis = dis.$parent;
            }
            return alpha;
        }

        reset() {
            this._local.identity();
            this._reverse.identity();
            this.dirty = false;
            this._anchorOffsetX = this._anchorOffsetY = this._x = this._y = this._angle = 0;
            this._scaleX = this._scaleY = this._alpha = 1;
        }

    }

}