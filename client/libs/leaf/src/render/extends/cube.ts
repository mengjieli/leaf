namespace leaf {

  export class Cube extends Render {

    shader = Normal3DTask.shader;

    size: number = 1;

    color: number = 0xffffff;

    preRender() {
    }

    preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader) {
      let hs = this.size / 2;
      let m = matrix.concat(this.entity.transform.local);
      this.shader.addTask(m, [
        -hs, -hs, hs,
        hs, -hs, hs,
        hs, hs, hs,
        -hs, hs, hs,
        // -hs, -hs, -hs,
        // hs, -hs, -hs,
        // hs, hs, -hs,
        // -hs, hs, -hs,
      ], [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
      ], [
        this.color >> 16, (this.color >> 8) & 0xFF, this.color & 0xFF,
        this.color >> 16, (this.color >> 8) & 0xFF, this.color & 0xFF,
        this.color >> 16, (this.color >> 8) & 0xFF, this.color & 0xFF,
        this.color >> 16, (this.color >> 8) & 0xFF, this.color & 0xFF
      ], [
        0, 1, 3,//后
        1, 2, 3,

        // 0, 1, 4,//下
        // 1, 5, 4,

        // 0, 3, 4, //左
        // 4, 3, 7,

        // 2, 1, 5, //右
        // 6, 2, 5,

        // 3, 2, 7, //上
        // 2, 6, 7,

        // 4, 6, 5, //前
        // 4, 7, 6
      ]);
      // (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint);
    }

    onDestroy() {
      this.size = 1;
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