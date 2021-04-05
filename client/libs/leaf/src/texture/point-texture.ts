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
    private extend = 1;

    /**
     * @internal
     */
    private gap = 0;

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
      let size = 1 + this.extend * 2;
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
      let txt = this.colors[color] = new Texture(this.texture, this.width, this.height, x + this.extend, y + this.extend, 1, 1);
      txt.dirty = true;
      txt.update = this.updateTexture.bind(this);
      this.dirtyTextures.push(txt);
      return txt;
    }

    get isFull(): boolean {
      if (this.x >= this.width || this.y >= this.height) return true;
      return false;
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
    private static curTexture: PointTexture;

    /**
     * @internal
     */
    private static colors: { [index: number]: Texture } = {};

    static getTexture(color: number) {
      let txt = this.curTexture;
      if (!txt || txt.isFull) {
        txt = this.curTexture = new PointTexture(256, 256);
      }
      return txt.getColor(color);
    }

  }

}