namespace leaf {

  export class Cube extends Render {

    shader = Normal3DTask.shader;

    size: number = 1;

    color: number = 0xffffff;

    preRender() {
    }

    static vertices = [
      0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, // v0-v1-v2-v3 front
      0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, // v0-v3-v4-v5 right
      0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, // v0-v5-v6-v1 up
      -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, // v1-v6-v7-v2 left
      -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, // v7-v4-v3-v2 down
      0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5  // v4-v7-v6-v5 back
    ];

    static texCoords = [
      1, 1, 0, 1, 0, 0, 1, 0,
      1, 1, 0, 1, 0, 0, 1, 0,
      1, 1, 0, 1, 0, 0, 1, 0,
      1, 1, 0, 1, 0, 0, 1, 0,
      1, 1, 0, 1, 0, 0, 1, 0,
      1, 1, 0, 1, 0, 0, 1, 0
    ]

    // Colors
    static colors = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // v0-v1-v2-v3 front
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // v0-v3-v4-v5 right
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // v0-v5-v6-v1 up
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // v1-v6-v7-v2 left
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // v7-v4-v3-v2 down
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1　    // v4-v7-v6-v5 back
    ];

    // Normal
    static normals = [
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
      1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
      -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
      0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
      0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
    ];

    static indices = [
      0, 1, 2, 0, 2, 3,    // front
      4, 5, 6, 4, 6, 7,    // right
      8, 9, 10, 8, 10, 11,    // up
      12, 13, 14, 12, 14, 15,    // left
      16, 17, 18, 16, 18, 19,    // down
      20, 21, 22, 20, 22, 23     // back
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
      this._texture = val;
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

    preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader) {
      if (!this.texture) return;
      matrix.scale(this.size, this.size, this.size);
      let m = matrix.concat(this.entity.transform.local);
      let r = (this.color >> 16) / 255.0;
      let g = ((this.color >> 8) & 0xFF) / 255.0;
      let b = (this.color & 0xFF) / 255.0;
      let colors = Cube.colors;
      for (let i = 0; i < colors.length / 3; i++) {
        colors[i * 3 + 0] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }
      this.shader.addTask(m, Cube.vertices, Cube.normals, Cube.colors, Cube.texCoords, this.texture, Cube.indices);
      // let hs = this.size / 2;
      // this.shader.addTask(m, 
      // //   [
      // //   -hs, -hs, hs,
      // //   hs, -hs, hs, 
      // //   hs, hs, hs,
      // //   -hs, hs, hs, 

      // //   hs, -hs, -hs, 
      // //   -hs, -hs, -hs, 
      // //   -hs, hs, -hs,
      // //   hs, hs, -hs, 

      // //   -hs, -hs, hs, 
      // //   hs, -hs, hs, 
      // //   hs, -hs, -hs, 
      // //   -hs, -hs, -hs,

      // //   -hs, hs, hs,  
      // //   hs, hs, hs, 
      // //   hs, hs, -hs, 
      // //   -hs, hs, -hs, 

      // //   -hs, -hs, hs,
      // //   -hs, hs, hs, 
      // //   -hs, hs, -hs,
      // //   -hs, -hs, -hs, 

      // //   hs, -hs, hs,  
      // //   hs, hs, hs,
      // //   hs, hs, -hs, 
      // //   hs, -hs, -hs, 
      // // ], 
      // [
      //   0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, // v0-v1-v2-v3 front
      //   0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, // v0-v3-v4-v5 right
      //   0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, // v0-v5-v6-v1 up
      //   -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, // v1-v6-v7-v2 left
      //   -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, // v7-v4-v3-v2 down
      //   0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5  // v4-v7-v6-v5 back
      // ],
      // [
      //   0, 0, -1,
      //   0, 0, -1,
      //   0, 0, -1,
      //   0, 0, -1,

      //   0, 0, 1,
      //   0, 0, 1,
      //   0, 0, 1,
      //   0, 0, 1,

      //   0, 1, 0,
      //   0, 1, 0,
      //   0, 1, 0,
      //   0, 1, 0,

      //   0, -1, 0,
      //   0, -1, 0,
      //   0, -1, 0,
      //   0, -1, 0,

      //   1, 0, 0,
      //   1, 0, 0,
      //   1, 0, 0,
      //   1, 0, 0,

      //   -1, 0, 0,
      //   -1, 0, 0,
      //   -1, 0, 0,
      //   -1, 0, 0
      // ], [
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b,
      //   r, g, b
      // ], [
      //   0, 1, 3,//后
      //   1, 2, 3,

      //   4, 5, 7, //前
      //   5, 6, 7,

      //   8, 9, 11, //上
      //   9, 10, 11,

      //   12, 13, 15,//下
      //   13, 14, 15,

      //   16, 17, 19, //左
      //   17, 18, 19,

      //   20, 21, 23, //右
      //   21, 22, 23
      // ]);
      // (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint);
    }

    onDestroy() {
      this.size = 1;
      this.texture = null;
      if (this._res) this._res.removeCount();
      this._resource = this._res = null;
    }
  }

}


// namespace leaf {

//   export class Cube extends Render {

//     shader = Normal3DTask.shader;

//     size: number = 1;

//     color: number = 0xffffff;

//     preRender() {
//     }

//     static vertices = [
//       1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, // v0-v1-v2-v3 front
//       1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // v0-v3-v4-v5 right
//       1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
//       -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, // v1-v6-v7-v2 left
//       -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, // v7-v4-v3-v2 down
//       1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0  // v4-v7-v6-v5 back
//     ];

//     // Colors
//     static colors = [
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v1-v2-v3 front
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v3-v4-v5 right
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v5-v6-v1 up
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v1-v6-v7-v2 left
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v7-v4-v3-v2 down
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0　    // v4-v7-v6-v5 back
//     ];

//     // Normal
//     static normals = [
//       0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
//       1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
//       0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
//       -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
//       0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
//       0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
//     ];

//     static indices = [
//       0, 1, 2, 0, 2, 3,    // front
//       4, 5, 6, 4, 6, 7,    // right
//       8, 9, 10, 8, 10, 11,    // up
//       12, 13, 14, 12, 14, 15,    // left
//       16, 17, 18, 16, 18, 19,    // down
//       20, 21, 22, 20, 22, 23     // back
//     ];

//     preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader) {
//       let hs = this.size / 2;
//       let m = matrix.concat(this.entity.transform.local);
//       this.shader.addTask(m, Cube.vertices , Cube.normals, Cube.colors, Cube.indices);
//       // (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint);
//     }

//     onDestroy() {
//       this.size = 1;
//     }
//   }

// }