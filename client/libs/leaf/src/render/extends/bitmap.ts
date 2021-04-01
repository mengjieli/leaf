namespace leaf {

    export class Bitmap extends Render {

        shader = Bitmap.shader;

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

        get width() {
            return this._texture ? this._texture.width : 0;
        }

        get height() {
            return this._texture ? this._texture.height : 0;
        }

        preRender() {
            if (!this._texture) return;
            (this.shader as BitmapShaderTask).addTask(this.texture, this.entity.transform.worldMatrix, this.entity.transform.worldAlpha, this.blendMode, this._tint);
        }

        onDestroy() {
            this.texture = null;
            if (this._res) this._res.removeCount();
            this._resource = this._res = null;
            this._tint = 0xffffff;
            super.onDestroy();
        }

        private static _shader: BitmapShaderTask;

        static get shader(): BitmapShaderTask {
            if (!this._shader) {
                this._shader = new BitmapShaderTask5() as any;
            }
            return this._shader;
        }
    }

}