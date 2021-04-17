namespace leaf {

    export class ScrollBitmap extends Render {

        shader = ScrollerShaderTask.shader;

        /**
         * @internal
         */
        private _texture: Texture;

        private _resource: string;
        private _res: Resource<Texture>;

        get texture(): Texture {
            return this._texture;
        }

        set texture(val: Texture) {
            this._texture = val;
        }

        get resource(): string {
            return this._resource;
        }

        private _tint: number = 0xffffff;

        get tint(): number {
            return this._tint;
        }

        set tint(val: number) {
            this._tint = val;
        }

        set resource(val: string) {
            if (this._resource === val) return;
            if (this._res) this._res.removeCount();
            this._resource = val;
            let res = this._res = Res.getRes(val);
            if (!res) {
                this.texture = null;
                return;
            }
            if (res.data) {
                this.texture = res.data;
                res.addCount();
            } else {
                res.addCount();
                res.load().then(() => {
                    if (this._res !== res) return;
                    this.texture = res.data;
                });
            }
        }

        scrollX: number = 0;

        scrollY: number = 0;

        get width() {
            return this._texture ? this._texture.sourceWidth : 0;
        }

        get height() {
            return this._texture ? this._texture.sourceHeight : 0;
        }

        preRender() {
            if (!this._texture) return;
            // (this.shader).addTask(this.texture, this.entity.transform.worldMatrix, this.entity.transform.worldAlpha, this.blendMode, this._tint);
        }

        preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader) {
            if (!this._texture) return;
            matrix.concat(this.entity.transform.local);
            (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint,this.scrollX, this.scrollY);
        }

        onDestroy() {
            this.texture = null;
            if (this._res) this._res.removeCount();
            this._resource = this._res = null;
            this._tint = 0xffffff;
            this.scrollX = this.scrollY = 0;
            super.onDestroy();
        }
    }

}