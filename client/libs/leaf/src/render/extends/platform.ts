namespace leaf {

  export class Platform extends Render {

    shader = Normal3DTask.shader;

    size: number = 1;

    private _color: number = 0xffffff;

    set color(val: number) {
      if (this._color === val) return;
      this._color = val;
      let colors = this.colors;
      let r = (this.color >> 16) / 255.0;
      let g = ((this.color >> 8) & 0xFF) / 255.0;
      let b = (this.color & 0xFF) / 255.0;
      for (let i = 0; i < colors.length / 3; i++) {
        colors[i * 3 + 0] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }
    }

    get color(): number {
      return this._color;
    }

    preRender() {
    }

    static vertices = [
      0.5, 0.5, 0,
      -0.5, 0.5, 0,
      -0.5, -0.5, 0,
      0.5, -0.5, 0,  // v0-v1-v2-v3 front
    ];

    texCoords = [
      1, 1,
      0, 1,
      0, 0,
      1, 0
    ]

    // Colors
    colors = [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1     // v0-v1-v2-v3 front
    ];

    // Normal
    static normals = [
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    ];

    static indices = [
      0, 1, 2,
      0, 2, 3,    // front
    ];

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
      if (this._texture === val) return;
      this._texture = val;
      if (val) {
        this.texCoords = [
          val.endX, val.endY,
          val.startX, val.endY,
          val.startX, val.startY,
          val.endX, val.startY
        ];
      }
    }

    get resource(): string {
      return this._resource;
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

    private _width: number = 1;
    private _height: number = 1;

    set width(val: number) {
      this._width = val;
    }

    set height(val: number) {
      this._height = val;
    }

    get width() {
      return this._width;
    }

    get height() {
      return this._height;
    }

    preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader) {
      if (!this.texture) return;
      matrix.scale(this._width, this._height, 0);
      let m = matrix.concat(this.entity.transform.local);
      this.shader.addTask(m, Platform.vertices, Platform.normals, this.colors, this.texCoords, this.texture.texture, Platform.indices);
    }

    onDestroy() {
      this._color = 0xffffff;
      this._width = this._height = 1;
      this.size = 1;
      this.texture = null;
      if (this._res) this._res.removeCount();
      this._resource = this._res = null;
    }
  }

}

