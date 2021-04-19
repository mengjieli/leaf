namespace leaf {

  export class Polygon extends Render {

    shader = Polygon3DTask.shader;


    private _vertices: number[] = [];

    get vertices(): number[] {
      return this._vertices;
    }

    private _colors: number[] = [];

    get colors(): number[] {
      return this._colors;
    }

    private _indices: number[] = [];

    get indices(): number[] {
      return this._indices;
    }

    private _alphas: number[] = [];

    get alphas():number[] {
      return this._alphas;
    }

    preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader) {
      let m = matrix.concat(this.entity.transform.local);
      let alphas =  this._alphas.concat();
      for(let i = 0; i < alphas.length; i++) {
        alphas[i] *= alpha;
      }
      this.shader.addTask(m, this.vertices, this.colors, this.indices, alphas);
    }

    onDestroy() {
      this._vertices.length = 0;
      this.colors.length = 0;
      this.indices.length = 0;
    }

  }

}