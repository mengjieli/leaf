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
        private _local: Matrix = new Matrix();

        /**
         * @internal
         */
        private dirty: boolean = false;

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
            this.dirty = true;
            this._x = val;
        }

        get y() { return this._y; }
        set y(val: number) {
            if (this._y === val) return;
            this.dirty = true;
            this._y = val;
        }

        get scaleX() { return this._scaleX; }
        set scaleX(val: number) {
            if (this._scaleX === val) return;
            this.dirty = true;
            this._scaleX = val;
        }

        get scaleY() { return this._scaleY; }
        set scaleY(val: number) {
            if (this._scaleY === val) return;
            this.dirty = true;
            this._scaleY = val;
        }

        get angle() { return this._angle; }
        set angle(val: number) {
            if (this._angle === val) return;
            this.dirty = true;
            this._angle = val;
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
                this._local.identity();
                if (this.angle) {
                    this._local.rotate(this.angle);
                }
                if (this.scaleX != 1 || this.scaleY != 1) {
                    this._local.scale(this.scaleX, this.scaleY);
                }
                this._local.translate(this.x, this.y);
            }
            return this._local;
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

        reset() {
            this.local.identity();
            this.dirty = false;
        }

    }

}