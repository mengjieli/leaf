namespace ecs {

    export class Transform extends Matrix {

        private _worldMatrix: Matrix = new Matrix();

        $parent: Transform;

        private _scaleX: number = 1;

        private _scaleY: number = 1;

        get parent(): Transform {
            return this.$parent;
        }

        get worldMatrix() {
            let dis = this.$parent;
            this._worldMatrix.setTo(this.a, this.b, this.c, this.d, this.tx, this.ty);
            while (dis) {
                this._worldMatrix.concat(dis);
                dis = dis.$parent;
            }
            return this._worldMatrix;
        }

    }

}