namespace leaf {

  export class Polygon3DTask extends Shader {

    private a_position: any;
    private a_color: any;
    private a_alpha: any;
    private u_projection: any;
    private u_mvc: any;
    private colorBuffer: WebGLBuffer;
    private alphaBuffer: WebGLBuffer;

    constructor() {
      super();
      //初始化作色器、program
      this.initProgram();
      //初始化作色器固定变量 和 获取作色器中得变量
      this.initAttriLocation();
    }

    initProgram() {
      let gl = GLCore.gl;
      //'uniform mat4 u_Projection;\n' +
      // 'uniform mat4 u_MvcMatrix;\n' +
      // '  gl_Position =  u_Projection * u_MvcMatrix * a_Position;\n' +

      //提高灯光效果 浮尘，噪声图
      var VSHADER_SOURCE =
        'attribute vec4 a_Position;\n' +
        'attribute vec3 a_Color;\n' + // Defined constant in main()
        'attribute float a_Alpha;\n' +
        'uniform mat4 u_Projection;\n' +
        'uniform mat4 u_MvcMatrix;\n' +
        'varying vec3 v_Color;\n' +
        'varying float v_Alpha;\n' +
        'void main() {\n' +
        '  gl_Position = u_Projection * u_MvcMatrix * a_Position;\n' +
        '  v_Color = a_Color;\n' +
        '  v_Alpha = a_Alpha;\n' +
        '}\n';

      // Fragment shader program
      var FSHADER_SOURCE =
        '#ifdef GL_ES\n' +
        'precision mediump float;\n' +
        '#endif\n' +
        'varying vec3 v_Color;\n' +
        'varying float v_Alpha;\n' +
        'void main() {\n' +
        '  gl_FragColor = vec4(v_Color.xyz,1.0) * v_Alpha ;\n' +
        '}\n';
      var vertexShader = this.createShader(gl.VERTEX_SHADER, VSHADER_SOURCE);
      var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, FSHADER_SOURCE);
      this.program = this.createWebGLProgram(vertexShader, fragmentShader);
    }

    projectionMatrix: ecs.Matrix4;

    initAttriLocation() {
      let gl = GLCore.gl;
      var program = this.program;
      this.buffer = gl.createBuffer();
      this.colorBuffer = gl.createBuffer();
      this.alphaBuffer = gl.createBuffer();
      this.indexBuffer = gl.createBuffer();

      gl.useProgram(program);

      this.u_mvc = gl.getUniformLocation(program, "u_MvcMatrix");
      this.u_projection = gl.getUniformLocation(program, "u_Projection");
      this.a_position = gl.getAttribLocation(program, "a_Position");
      this.a_color = gl.getAttribLocation(program, "a_Color");
      this.a_alpha = gl.getAttribLocation(program, "a_Alpha");

      this.projectionMatrix = new ecs.Matrix4();
      this.projectionMatrix.orthographicCamera(-1, 1, -leaf.getStageHeight() / leaf.getStageWidth(), leaf.getStageHeight() / leaf.getStageWidth(), -1000, 1000);

      gl.uniformMatrix4fv(this.u_projection, false, new Float32Array(this.projectionMatrix.elements));

    }

    mvcs: number[] = [];
    positions: number[] = [];
    colors: number[] = [];
    alphas: number[] = [];
    indexs: number[] = [];
    count: number = 0;
    index = 0;

    addTask(matrix: ecs.Matrix4, positions: number[], colors: number[], indexs: number[], alphas: number[]) {
      // let camera = this.projectionMatrix;
      let camera = Normal3DTask.camera;
      let copy = camera.elements.concat();
      camera.concat(matrix);
      for (let i = 0, len = this.mvcs.length; i < camera.elements.length; i++) {
        this.mvcs[len + i] = camera.elements[i];
      }
      camera.elements = copy;

      for (let i = 0, len = this.positions.length; i < positions.length; i++) {
        this.positions[len + i] = positions[i];
      }
      for (let i = 0, len = this.colors.length; i < colors.length; i++) {
        this.colors[len + i] = colors[i];
      }
      for (let i = 0, len = this.indexs.length; i < indexs.length; i++) {
        this.indexs[len + i] = indexs[i];
      }
      for (let i = 0, len = this.alphas.length; i < alphas.length; i++) {
        this.alphas[len + i] = alphas[i];
      }
      this.count += indexs.length;
    }

    render() {
      var _this = this;
      var gl = GLCore.gl;
      gl.useProgram(_this.program);
      //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
      //开始渲染任务
      gl.enableVertexAttribArray(this.a_position);
      gl.enableVertexAttribArray(this.a_color);
      gl.enableVertexAttribArray(this.a_alpha);


      //切换混合模式
      // BlendModeFunc.changeBlendMode(this.blendMode[i]);
      //分配 buffer 内容
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.vertexAttribPointer(_this.a_position, 3, gl.FLOAT, false, $size * 3, 0);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positions), gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
      gl.vertexAttribPointer(_this.a_color, 3, gl.FLOAT, false, $size * 3, 0);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.colors), gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.alphaBuffer);
      gl.vertexAttribPointer(_this.a_alpha, 1, gl.FLOAT, false, $size * 1, 0);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.alphas), gl.STATIC_DRAW);

      gl.uniformMatrix4fv(this.u_mvc, false, new Float32Array(this.mvcs));

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexs), gl.STATIC_DRAW);

      //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
      //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
      gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0);//利用drawElements画三角形
      runInfo.drawCount += _this.indexs.length;
      runInfo.drawCall++;

      this.mvcs.length = 0;
      this.positions.length = 0;
      this.colors.length = 0;
      this.alphas.length = 0;
      this.indexs.length = 0;
      this.index = 0;
      this.count = 0;
    }

    private static _shader: Polygon3DTask;

    static get shader(): Polygon3DTask {
      if (!this._shader) {
        this._shader = new Polygon3DTask() as any;
      }
      return this._shader;
    }
  }

}