namespace leaf {

    export class Label extends Render {

        shader = Bitmap.shader;

        /**
         * @internal
         */
        private texture: Texture;

        private _text: string = "";

        get text(): string {
            return this._text;
        }

        set text(val: string) {
            this._text = val;
        }

        private _fontColor: number = 0xffffff;

        get fontColor(): number {
            return this._fontColor;
        }

        set fontColor(val: number) {
            this._fontColor = val;
        }

        private _fontFamily: string = "sans-serif";

        get fontFamily(): string {
            return this._fontFamily;
        }

        set fontFamily(val: string) {
            this._fontFamily = val;
        }

        private _fontSize: number = 30;

        get fontSize(): number {
            return this._fontSize;
        }

        set fontSize(val: number) {
            this._fontSize = val;
        }


        private _bold: boolean = false;

        get bold(): boolean {
            return this._bold;
        }

        set bold(val: boolean) {
            this._bold = val;
        }

        private _italic: boolean = false;

        get italic() {
            return this._italic;
        }

        set italic(val: boolean) {
            this._italic = val;
        }

        private _lineSpacing = 5;

        get lineSpacing() {
            return this._lineSpacing;
        }

        set lineSpacing(val: number) {
            this._lineSpacing = val;
        }

        private _textWidth = 0;

        private _textHeight = 0;

        preRender() {
            let x = 0;
            let y = 0;
            let m = ecs.Matrix.$matrix;
            let w = this.entity.transform.worldMatrix;
            let scale = Label.useScaleFont ? GLCore.scale : 1;
            let rScale = 1 / scale;
            let toSize = Math.ceil(this._fontSize * scale);
            scale = toSize / this._fontSize;
            let r = this._fontColor >> 16;
            let g = this._fontColor >> 8 & 0xFF;
            let b = this._fontColor & 0xFF;
            this._textHeight = 0;
            for (let i = 0; i < this._text.length; i++) {
                let char = this._text.charAt(i);
                if (char == "\n" || char == "\r") {
                    x = 0;
                    y += (this.fontSize + this._lineSpacing) * rScale;
                    continue;
                }
                let txt = TextAtlas.getChar(`rgb(${r},${g},${b})`, this._fontFamily, toSize, this._bold, this._italic, char, false);
                m.identity();
                m.scale(rScale, rScale);
                m.translate(x, y);
                m.concat(w);
                (this.shader as BitmapShaderTask).addTask(txt.texture, m, this.entity.transform.worldAlpha, this.blendMode, 0xffffff);
                x += txt.width * rScale;
                if (x > this._textWidth) this._textWidth = x;
            }
            this._textHeight = y + this.fontSize;
        }

        get width() {
            return this._textWidth;
        }

        get height() {
            return this._textHeight;
        }

        onDestroy() {
            this._textWidth = this._textHeight = 0;
            this._text = "";
            this._fontColor = 0xffffff;
            this._fontFamily = "sans-serif";
            this._fontSize = 30;
            this._bold = false;
            this._italic = false;
            this._lineSpacing = 5;
        }

        static useScaleFont = false;
    }

}