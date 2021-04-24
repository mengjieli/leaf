namespace leaf {

  export class Polygon extends Render {

    shader = Polygon3DTask.shader;

    readonly vertices: number[] = [];

    readonly colors: number[] = [];

    readonly indices: number[] = [];

    readonly alphas: number[] = [];

    preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader) {
      let m = matrix.concat(this.entity.transform.local);
      let alphas = this.alphas.concat();
      for (let i = 0; i < alphas.length; i++) {
        alphas[i] *= alpha;
      }
      this.shader.addTask(m, this.vertices, this.colors, this.indices, alphas);
    }

    onDestroy() {
      this.vertices.length = 0;
      this.colors.length = 0;
      this.indices.length = 0;
      this.alphas.length = 0;
    }

  }

}