namespace ecs {

    export class Transform extends Matrix4 {

        constructor(entity: Entity) {
            super();
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
        private _z: number = 0;

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
        private _anchorOffsetZ: number = 0;

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
        private _scaleZ: number = 1;

        /**
         * @internal
         */
        private _angleZ: number = 0;

        /**
         * @internal
         */
        private _angleX: number = 0;

        /**
         * @internal
         */
        private _angleY: number = 0;

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
        private _local: Matrix4 = new Matrix4();

        private _reverse: Matrix4 = new Matrix4();

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

        get z() { return this._z; }
        set z(val: number) {
            if (this._z === val) return;
            this.dirty = this.reverseDirty = true;
            this._z = val;
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

        get anchorOffsetZ() { return this._anchorOffsetZ; }
        set anchorOffsetZ(val: number) {
            if (this._anchorOffsetZ === val) return;
            this.dirty = this.reverseDirty = true;
            this._anchorOffsetZ = val;
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

        get scaleZ() { return this._scaleZ; }
        set scaleZ(val: number) {
            if (this._scaleZ === val) return;
            this.dirty = this.reverseDirty = true;
            this._scaleZ = val;
        }

        get angleX() { return this._angleX; }
        set angleX(val: number) {
            if (this._angleX === val) return;
            this.dirty = this.reverseDirty = true;
            this._angleX = val;
        }

        get angleY() { return this._angleY; }
        set angleY(val: number) {
            if (this._angleY === val) return;
            this.dirty = this.reverseDirty = true;
            this._angleY = val;
        }

        get angleZ() { return this._angleZ; }
        set angleZ(val: number) {
            if (this._angleZ === val) return;
            this.dirty = this.reverseDirty = true;
            this._angleZ = val;
        }

        get alpha() { return this._alpha; }
        set alpha(val: number) {
            this._alpha = val;
        }

        /**
         * @internal
         */
        private _worldMatrix: Matrix4 = new Matrix4();

        /**
         * @internal
         */
        $parent: Transform;

        get parent(): Transform {
            return this.$parent;
        }

        get local(): Matrix4 {
            if (this.dirty) {
                this.dirty = false;
                let local = this;
                local.identity();
                local.translate(-this._anchorOffsetX, -this._anchorOffsetY, 0);
                if (this._x || this._y || this._z) local.translate(this._x, this._y, this._z);
                if (this._angleX) local.rotate(this._angleX, 1, 0, 0);
                if (this._angleY) local.rotate(this._angleY, 0, 1, 0);
                if (this._angleZ) local.rotate(this._angleZ, 0, 0, 1);
                if (this._scaleX != 1 || this._scaleY != 1 || this._scaleZ != 1) local.scale(this._scaleX, this._scaleY, this._scaleZ);
            }
            return this;
        }

        get reverse(): Matrix4 {
            if (this.reverseDirty) {
                this.reverseDirty = false;
                this._reverse.setInverseOf(this.local);
            }
            return this._reverse;
        }

        get worldMatrix() {
            let dis = this.$parent;
            let local = this.local;
            this._worldMatrix.set(local);
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
            this.identity();
            this._local.identity();
            this._reverse.identity();
            this.dirty = false;
            this._anchorOffsetX = this._anchorOffsetY = this._anchorOffsetZ
            this._x = this._y = this._z = this._angleX = this._angleY = this._angleZ = 0;
            this._scaleX = this._scaleY = this._scaleZ = this._alpha = 1;
        }

    }

}