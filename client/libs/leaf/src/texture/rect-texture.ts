namespace leaf {

  export class RectTexture extends DrawTexture {

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
    private x = 0;

    /**
     * @internal
     */
    private y = 0;

    getColor(colors: number[][], id: string) {
      if (this.colors[id]) return this.colors[id];
      let w = colors[0].length;
      let h = colors.length;
      let addW = w + this.extend * 2;
      let addH = h + this.extend * 2;
      let gap = this.gap;
      let x = this.x;
      let y = this.y;
      this.x += addW + gap;
      if (this.x > this.width + addW + gap) {
        this.x = 0;
        this.y += addH + gap;
      }
      for (let y2 = -1; y2 < h + 1; y2++) {
        for (let x2 = -1; x2 < w + 1; x2++) {
          let cx = x2 < 0 ? 0 : x2 >= w ? w - 1 : x2;
          let cy = y2 < 0 ? 0 : y2 >= h ? h - 1 : y2;
          let color = colors[cy][cx];
          if (color == null) continue;
          this.context2d.fillStyle = `rgb(${color >> 16},${color >> 8 & 0xFF},${color & 0xFF})`;
          this.context2d.fillRect(x + x2 + 1, y + y2 + 1, 1, 1);
        }
      }
      let txt = this.colors[id] = new Texture(this.texture, this.width, this.height, x + this.extend, y + this.extend, w, h);
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
    private static curTextures: { [index: string]: RectTexture } = {};

    /**
     * @internal
     */
    private static colors: { [index: string]: Texture } = {};

    static getTexture(colors: number[][], id?: string) {
      if (id == null) {
        id = '';
        for (let y = 0; y < colors.length; y++) {
          for (let x = 0; x < colors[y].length; x++) {
            id += (colors[y][x] || '0') + '_';
          }
          id += '|';
        }
      }
      let size = colors.length + '_' + colors[0].length;
      let txt = this.curTextures[size];
      if (!txt || txt.isFull) {
        txt = this.curTextures[size] = new RectTexture(256, 256);
      }
      return txt.getColor(colors, id);
    }

    /**
     * 格式化颜色，例如
     * 16711680,65280
     * 000
     * 010
     * 000
     * 第一排定义颜色，以,(英文逗号)分割
     * 下面是颜色矩阵，01代表颜色序列
     * @param str 
     */
    static formatColors(str: string): number[][] {
      let lines = str.split('\n');
      let colorsStr = lines[0].split(",");
      let colors: number[] = [];
      for (let i = 0; i < colorsStr.length; i++) {
        colors[i] = +colorsStr[i];
      }
      let blocks: number[][] = [];
      for (let i = 1; i < lines.length; i++) {
        blocks[i - 1] = [];
        for (let c = 0; c < lines[i].length; c++) {
          blocks[i - 1][c] = colors[+lines[i][c]];
        }
      }
      return blocks;
    }

  }

}