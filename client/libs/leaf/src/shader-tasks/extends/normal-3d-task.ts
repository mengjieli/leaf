namespace leaf {

  export class Normal3DTask extends Shader {

    private a_position: any;
    private a_color: any;
    private a_normal: any;
    private u_mvp: any;
    private u_model: any;
    private u_normalMatrix: any;
    private u_lightColor: any;
    private u_lightDirection: any;
    private u_ambientLight: any;
    private u_pointLightColor: any;
    private u_pointLightPosition: any;

    constructor() {
      super();
      //初始化作色器、program
      this.initProgram();
      //初始化作色器固定变量 和 获取作色器中得变量
      this.initAttriLocation();
    }

    initProgram() {
      let gl = GLCore.gl;
      // let vertexSource = `
      //   attribute vec4 a_position;
      //   uniform mat4 u_project;
      //   uniform mat4 u_model;
      //   void main() {
      //     gl_Position = u_project * u_model * a_position;
      //   }
      // `;
      // var vertexSource =
      //   'attribute vec4 a_position;\n' +
      //   'attribute vec4 a_color;\n' +
      //   'attribute vec4 a_normal;\n' +       // Normal
      //   'uniform mat4 u_mvp;\n' +
      //   'uniform mat4 u_model;\n' +
      //   'uniform mat4 u_normalMatrix;\n' +
      //   'uniform vec3 u_lightColor;\n' +   // Diffuse light color
      //   'uniform vec3 u_lightDirection;\n' + // Diffuse light direction (in the world coordinate, normalized)
      //   'uniform vec3 u_ambientLight;\n' +   // Color of an ambient light
      //   'uniform vec3 u_pointLightColor;\n' +
      //   'uniform vec3 u_pointLightPosition;\n' +
      //   'varying vec4 v_Color;\n' +
      //   'void main() {\n' +
      //   '  gl_Position =  u_mvp * a_position;\n' +
      //   '  vec3 normal = normalize(vec3(u_normalMatrix * a_normal));\n' +
      //   '  float nDotL = max(dot(u_lightDirection, normal), 0.0);\n' +
      //   '  vec3 diffuse = u_lightColor * a_color.xyz * nDotL;\n' +
      //   '  vec3 ambient = u_ambientLight * a_color.rgb;\n' +
      //   '  vec4 vertexPosition = u_model * a_position;\n' +
      //   '  vec3 pointDirection = normalize(u_pointLightPosition - vec3(vertexPosition));\n' +
      //   '  float pDotL = max(dot(pointDirection, normal), 0.0);\n' +
      //   '  vec3 pointColor = u_pointLightColor * a_color.xyz * pDotL;\n' +
      //   '  v_Color = vec4(pointColor + diffuse + ambient, 1.0);\n' +
      //   '}\n';


      // // Fragment shader program
      // var fragmentSource =
      //   '#ifdef GL_ES\n' +
      //   'precision mediump float;\n' +
      //   '#endif\n' +
      //   'varying vec4 v_Color;\n' +
      //   'void main() {\n' +
      //   '  gl_FragColor = v_Color;\n' +
      //   // '  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n' +
      //   '}\n';
      var VSHADER_SOURCE =
        'attribute vec4 a_Position;\n' +
        'attribute vec4 a_Color;\n' +
        'attribute vec4 a_Normal;\n' +
        'uniform mat4 u_MvpMatrix;\n' +
        'uniform mat4 u_ModelMatrix;\n' +   // Model matrix
        'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
        'uniform vec3 u_LightColor;\n' +    // Light color
        'uniform vec3 u_LightPosition;\n' + // Position of the light source (in the world coordinate system)
        'uniform vec3 u_AmbientLight;\n' +  // Ambient light color
        'varying vec4 v_Color;\n' +
        'void main() {\n' +
        '  gl_Position = u_MvpMatrix * a_Position;\n' +
           // Recalculate the normal based on the model matrix and make its length 1.
        '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
           // Calculate world coordinate of vertex
        '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
           // Calculate the light direction and make it 1.0 in length
        '  vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));\n' +
           // The dot product of the light direction and the normal
        '  float nDotL = max(dot(vec3(a_Position), normal), 0.0);\n' +
           // Calculate the color due to diffuse reflection
        '  vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;\n' +
           // Calculate the color due to ambient reflection
        '  vec3 ambient = u_AmbientLight * a_Color.rgb;\n' +
           //  Add the surface colors due to diffuse reflection and ambient reflection
        '  v_Color = vec4(ambient, a_Color.a);\n' + 
        '}\n';

      // Fragment shader program
      var FSHADER_SOURCE =
        '#ifdef GL_ES\n' +
        'precision mediump float;\n' +
        '#endif\n' +
        'varying vec4 v_Color;\n' +
        'void main() {\n' +
        '  gl_FragColor = v_Color;\n' +
        '}\n';
      var vertexShader = this.createShader(gl.VERTEX_SHADER, VSHADER_SOURCE);
      var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, FSHADER_SOURCE);
      this.program = this.createWebGLProgram(vertexShader, fragmentShader);
    }

    static camera = new ecs.Matrix4();

    initAttriLocation() {
      let gl = GLCore.gl;
      var program = this.program;
      this.buffer = gl.createBuffer();
      this.indexBuffer = gl.createBuffer();

      gl.useProgram(program);

      let projectionMatrix = new ecs.Matrix4();
      //projectionMatrix.orthographicCamera(0, leaf.getStageWidth(), 0, leaf.getStageHeight(), 0, -1000);
      // projectionMatrix.orthographicCamera(0, leaf.getStageWidth(), 0, leaf.getStageHeight(), 0, 1000);
      // projectionMatrix.orthographicCamera(-1, 1, -leaf.getStageHeight()/leaf.getStageWidth(), leaf.getStageHeight()/leaf.getStageWidth(), -1000, 1000);
      // projectionMatrix.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 1000);
      // projectionMatrix.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 1000);
      // projectionMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);

      Normal3DTask.camera.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 100);
      Normal3DTask.camera.lookAt(6, 6, 14, 0, 0, 0, 0, 1, 0);

      this.u_mvp = gl.getUniformLocation(program, "u_MvpMatrix");
      this.u_model = gl.getUniformLocation(program, "u_ModelMatrix");
      this.u_normalMatrix = gl.getUniformLocation(program, "u_NormalMatrix");
      this.a_position = gl.getAttribLocation(program, "a_Position");
      this.a_color = gl.getAttribLocation(program, "a_Color");
      this.a_normal = gl.getAttribLocation(program, "a_Normal");
      // this.u_lightColor = gl.getUniformLocation(program, "u_lightColor");
      // this.u_lightDirection = gl.getUniformLocation(program, "u_lightDirection");
      this.u_ambientLight = gl.getUniformLocation(program, "u_AmbientLight");
      this.u_pointLightColor = gl.getUniformLocation(program, "u_LightColor");
      this.u_pointLightPosition = gl.getUniformLocation(program, "u_LightPosition");
    }

    mvp: number[][] = [];
    model: number[][] = [];
    normalMatrix: number[][] = [];
    position: number[][] = [];
    // normal: number[][] = [];
    // color: number[][] = [];
    indexs: number[][] = [];
    counts: number[] = [];
    index = 0;

    addTask(matrix: ecs.Matrix4, positions: number[], indexs: number[]) {
      let camera = Normal3DTask.camera;
      let copy = camera.elements.concat();
      camera.concat(matrix);
      this.mvp.push(camera.elements);
      camera.elements = copy;
      this.model.push(matrix.elements.concat());
      this.normalMatrix.push((new ecs.Matrix4()).setInverseOf(matrix).transpose().elements);
      this.position.push(positions);
      // this.normal.push(normals);
      // this.color.push(colors);
      this.indexs.push(indexs);
      this.counts.push(indexs.length);
      // this.indexs.push([this.index, this.index + 1, this.index + 2]);
      // this.counts.push(positions.length / 3);
      // this.index += positions.length / 3;
    }

    static diffuseColor = [0.0, 0.0, 0.0];
    static diffuseDirection = [0, 0, -1];
    static ambientColor = [0.2, 0.2, 0.2];
    static pointColor = [0.5, 0.5, 0.5];
    static pointPosition = [0, 0, 0];

    render() {
      var _this = this;
      var gl = GLCore.gl;
      gl.useProgram(_this.program);
      //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
      //开始渲染任务
      gl.enableVertexAttribArray(this.a_position);
      gl.enableVertexAttribArray(this.a_normal);
      gl.enableVertexAttribArray(this.a_color);

      // gl.uniform3fv(this.u_lightColor, Normal3DTask.diffuseColor);
      // gl.uniform3fv(this.u_lightDirection, Normal3DTask.diffuseDirection);
      gl.uniform3fv(this.u_ambientLight, Normal3DTask.ambientColor);
      gl.uniform3fv(this.u_pointLightColor, Normal3DTask.pointColor);
      gl.uniform3fv(this.u_pointLightPosition, Normal3DTask.pointPosition);
      // gl.uniform3f(this.u_ambientLight, 0.2, 0.2, 0.2);
      // gl.uniform3f(this.u_pointLightColor, 1.0, 1.0, 1.0);
      // gl.uniform3f(this.u_pointLightPosition, 2.3, 4.0, 3.5);

      for (var i = 0, len = this.position.length; i < len; i++) {

        //切换混合模式
        // BlendModeFunc.changeBlendMode(this.blendMode[i]);
        //分配 buffer 内容
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(_this.a_position, 3, gl.FLOAT, false, $size * 9, 0);
        gl.vertexAttribPointer(_this.a_normal, 3, gl.FLOAT, false, $size * 9, $size * 3);
        gl.vertexAttribPointer(_this.a_color, 3, gl.FLOAT, false, $size * 9, $size * 6);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.position[i]), gl.STATIC_DRAW);

        gl.uniformMatrix4fv(this.u_mvp, false, new Float32Array(this.mvp[i]));
        gl.uniformMatrix4fv(this.u_model, false, new Float32Array(this.model[i]));
        gl.uniformMatrix4fv(this.u_normalMatrix, false, new Float32Array(this.normalMatrix[i]));

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexs[i]), gl.STATIC_DRAW);


        //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
        //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
        gl.drawElements(gl.TRIANGLES, this.counts[i], gl.UNSIGNED_SHORT, 0);//利用drawElements画三角形
        runInfo.drawCount += _this.position[i].length;
        runInfo.drawCall++;
      }

      this.mvp.length = 0;
      this.model.length = 0;
      this.normalMatrix.length = 0;
      this.position.length = 0;
      // this.normal.length = 0;
      // this.color.length = 0;
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