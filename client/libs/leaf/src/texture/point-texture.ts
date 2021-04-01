namespace leaf {

  export class PointTexture extends DrawTexture {

    /**
     * @internal
     */
    private colors: { [index: number]: Texture } = {};

    /**
     * @internal
     */
    private dirtyTextures: Texture[] = [];

    /**
     * @internal
     */
    private size = 1;

    /**
     * @internal
     */
    private gap = 1;

    /**
     * @internal
     */
    private x = 1;

    /**
     * @internal
     */
    private y = 1;


    getColor(color: number) {
      if (this.colors[color]) return this.colors[color];
      let size = this.size;
      let gap = this.gap;
      let x = this.x;
      let y = this.y;
      this.x += size + gap;
      if (this.x > this.width + size + gap) {
        this.x = 0;
        this.y += size + gap;
      }
      this.context2d.fillStyle = `rgb(${color >> 16},${color >> 8 & 0xFF},${color & 0xFF})`;
      this.context2d.fillRect(x, y, size, size);
      let txt = this.colors[color] = new Texture(this.texture, this.width, this.height, x, y, size, size);
      txt.dirty = true;
      txt.update = this.updateTexture.bind(this);
      this.dirtyTextures.push(txt);
      return txt;
    }

    /**
     * @internal
     */
    private updateTexture() {
      this.update();
      while (this.dirtyTextures.length) {
        this.dirtyTextures.pop().dirty = false;
      }
    }

    /**
     * @internal
     */
    static _ist: PointTexture;

    static get ist(): PointTexture {
      if (!this._ist) {
        this._ist = new PointTexture(256, 256);
      }
      return this._ist;
    }

  }

}