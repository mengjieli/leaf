namespace leaf {

  export class Triangle extends Render {

    shader = Normal3DTask.shader;

    point1 = { x: 0, y: 0, z: 0 };
    point2 = { x: 0, y: 0, z: 0 };
    point3 = { x: 0, y: 0, z: 0 };

    color: number = 0xffffff;

    preRender() {
    }

    preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader) {
      // this.shader.addTask(matrix.concat(this.entity.transform.local), [
      //   this.point1.x, this.point1.y, this.point1.z,
      //   this.point2.x, this.point2.y, this.point2.z,
      //   this.point3.x, this.point3.y, this.point3.z,
      // ], [0, 1, 2]);
      // (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint);
    }

    onDestroy() {
      this.point1 = { x: 0, y: 0, z: 0 };
      this.point2 = { x: 0, y: 0, z: 0 };
      this.point3 = { x: 0, y: 0, z: 0 };
    }
  }

}