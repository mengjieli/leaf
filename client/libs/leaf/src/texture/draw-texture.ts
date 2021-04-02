namespace leaf {

  export class DrawTexture {

    private canvas;
    protected context2d: CanvasRenderingContext2D;
    readonly texture: WebGLTexture;
    readonly width: number;
    readonly height: number;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.canvas = document.createElement("canvas");
      this.canvas.width = width;
      this.canvas.height = height;
      this.context2d = this.canvas.getContext("2d");
      this.context2d.clearRect(0, 0, width, height);
      this.context2d.scale(1, 1);
      this.context2d.lineCap = 'square';
      this.context2d.lineJoin = 'miter';
      this.texture = GLCore.createTexture(this.canvas);
    }

    update() {
      GLCore.updateTexture(this.texture, this.canvas);
    }

  }

}