namespace leaf {

    export class Bitmap extends Render {

        shader = Bitmap.shader;

        /**
         * @internal
         */
        private _texture: Texture;

        get texture(): Texture {
            return this._texture;
        }

        set texture(val: Texture) {
            this._texture = val;
        }

        preRender() {
            (this.shader as BitmapShaderTask).addTask(this.texture, this.entity.transform.worldMatrix, this.alpha, this.blendMode);
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