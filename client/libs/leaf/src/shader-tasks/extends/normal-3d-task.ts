namespace leaf {

  export class Normal3DTask extends Shader {

    private a_position: any;
    private a_color: any;
    private a_normal: any;
    private u_project: any;
    private u_model: any;

    constructor() {
      super();
      //初始化作色器、program
      this.initProgram();
      //初始化作色器固定变量 和 获取作色器中得变量
      this.initAttriLocation();
    }

    initProgram() {
      let gl = GLCore.gl;
      let vertexSource = `
        attribute vec4 a_position;
        attribute vec4 a_normal;
        attribute vec4 a_color;
        uniform mat4 u_project;
        uniform mat4 u_model;
        uniform vec3 u_lightColor;
        uniform vec3 u_lightDirection;
        varying vec4 v_color;
        void main() {
          gl_Position = u_project * u_model * a_position;
          vec3 normal = normalize(vec3(a_normal));
          float nDotL = max(dot(u_lightDirection, normal), 0.0);
          vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
          v_color = vec4(diffuse, a_color.a);
        }
      `;
      let fragmentSource = `
        precision mediump float;
        varying vec4 v_color;
        void main() {
          gl_FragColor = vec4(1.0,1.0,1.0,1.0);
       }
      `;
      var vertexShader = this.createShader(gl.VERTEX_SHADER, vertexSource);
      var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentSource);
      this.program = this.createWebGLProgram(vertexShader, fragmentShader);
    }

    initAttriLocation() {
      let gl = GLCore.gl;
      var program = this.program;
      this.buffer = gl.createBuffer();
      this.indexBuffer = gl.createBuffer();

      gl.useProgram(program);

      let projectionMatrix = new ecs.Matrix4();
      //projectionMatrix.orthographicCamera(0, leaf.getStageWidth(), 0, leaf.getStageHeight(), 0, -1000);
      projectionMatrix.orthographicCamera(0, leaf.getStageWidth(), 0, leaf.getStageHeight(), 0, 1000);
      this.u_project = gl.getUniformLocation(program, "u_project");
      gl.uniformMatrix4fv(this.u_project, false, new Float32Array(projectionMatrix.elements));

      this.u_model = gl.getUniformLocation(program, "u_model");
      this.a_position = gl.getAttribLocation(program, "a_position");
      this.a_color = gl.getAttribLocation(program, "a_color");
      this.a_normal = gl.getAttribLocation(program, "a_normal");
    }

    model: number[][] = [];
    position: number[][] = [];
    normal: number[][] = [];
    color: number[][] = [];
    indexs: number[][] = [];
    counts: number[] = [];
    index = 0;

    addTask(matrix: ecs.Matrix4, positions: number[], normals: number[], colors: number[], indexs: number[]) {
      this.model.push(matrix.elements.concat());
      this.position.push(positions);
      this.normal.push(normals);
      this.color.push(colors);
      this.indexs.push(indexs);
      this.counts.push(indexs.length);
      // this.indexs.push([this.index, this.index + 1, this.index + 2]);
      // this.counts.push(positions.length / 3);
      // this.index += positions.length / 3;
    }

    render() {
      var _this = this;
      var gl = GLCore.gl;
      gl.useProgram(_this.program);
      //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
      //开始渲染任务
      for (var i = 0, len = this.position.length; i < len; i++) {
        //切换混合模式
        // BlendModeFunc.changeBlendMode(this.blendMode[i]);
        //分配 buffer 内容
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.position[i]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(_this.a_position, 3, gl.FLOAT, false, $size * 3, 0);
        gl.enableVertexAttribArray(this.a_position);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.normal[i]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(_this.a_normal, 3, gl.FLOAT, false, $size * 3, 0);
        gl.enableVertexAttribArray(this.a_normal);
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.color[i]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(_this.a_color, 3, gl.FLOAT, false, $size * 3, 0);
        gl.enableVertexAttribArray(this.a_color);

        gl.uniformMatrix4fv(this.u_model, false, new Float32Array(this.model[i]));

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexs[i]), gl.STATIC_DRAW);


        //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
        //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
        gl.drawElements(gl.TRIANGLES, this.counts[i], gl.UNSIGNED_SHORT, 0);//利用drawElements画三角形
        runInfo.drawCount += _this.position[i].length;
        runInfo.drawCall++;
      }

      this.model.length = 0;
      this.position.length = 0;
      this.normal.length = 0;
      this.color.length = 0;
      this.indexs.length = 0;
      this.index = 0;
      this.counts.length = 0;
    }

    private static _shader: Normal3DTask;

    static get shader(): Normal3DTask {
      if (!this._shader) {
        this._shader = new Normal3DTask() as any;
      }
      return this._shader;
    }
  }

}