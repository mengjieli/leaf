namespace leaf {

  export class Normal3DTask extends Shader {

    private a_position: any;
    private a_color: any;
    private a_normal: any;
    private a_TexCoord: any;
    private u_Sampler: any;
    private u_projection: any;
    private u_mvc: any;
    private u_model: any;
    private u_normalMatrix: any;
    private u_lightColor: any;
    private u_lightDirection: any;
    private u_ambientLight: any;
    private u_pointLightColor: any;
    private u_pointLightPosition: any;
    private u_SpotDirection: any;
    private u_SpotRot: any;
    private colorBuffer: WebGLBuffer;
    private normalBuffer: WebGLBuffer;
    private texCoordBuffer: WebGLBuffer;

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
        'attribute vec4 a_Color;\n' + // Defined constant in main()
        'attribute vec4 a_Normal;\n' +
        'attribute vec2 a_TexCoord;\n' +
        'uniform mat4 u_Projection;\n' +
        'uniform mat4 u_MvcMatrix;\n' +
        'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
        'uniform mat4 u_NormalMatrix;\n' +   // Transformation matrix of the normal
        'varying vec4 v_Color;\n' +
        'varying vec3 v_Normal;\n' +
        'varying vec3 v_Position;\n' +
        'varying vec2 v_TexCoord;\n' +
        'void main() {\n' +
        '  gl_Position = u_Projection * u_MvcMatrix * a_Position;\n' +
        // Calculate the vertex position in the world coordinate
        '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
        '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
        '  v_Color = a_Color;\n' +
        '  v_TexCoord = a_TexCoord;\n' +
        '}\n';

      // Fragment shader program
      var FSHADER_SOURCE =
        '#ifdef GL_ES\n' +
        'precision mediump float;\n' +
        '#endif\n' +
        'uniform vec3 u_LightColor;\n' +     // Light color
        'uniform vec3 u_LightPosition;\n' +  // Position of the light source
        'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
        'uniform vec3 u_SpotDirection;\n' +  // Spot direction
        'uniform float u_SpotRot;\n' +  // Spot direction
        'varying vec3 v_Normal;\n' +
        'varying vec3 v_Position;\n' +
        'varying vec4 v_Color;\n' +
        'varying vec2 v_TexCoord;\n' +
        'uniform sampler2D u_Sampler;\n' +
        'void main() {\n' +
        '  vec3 normal = normalize(v_Normal);\n' +
        '  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
        '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
        '  float spotDotL = max(dot(-lightDirection, normalize(u_SpotDirection)), 0.0);\n' +
        '  spotDotL = max((spotDotL - u_SpotRot),0.0)/(1.0 - u_SpotRot);\n' +
        '  vec3 diffuse = u_LightColor * v_Color.rgb * nDotL * spotDotL;\n' +
        '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
        '  gl_FragColor = texture2D(u_Sampler,v_TexCoord) * vec4(diffuse + ambient, v_Color.a);\n' +
        '}\n';
      var vertexShader = this.createShader(gl.VERTEX_SHADER, VSHADER_SOURCE);
      var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, FSHADER_SOURCE);
      this.program = this.createWebGLProgram(vertexShader, fragmentShader);
    }

    static camera = new ecs.Matrix4();

    projectionMatrix: ecs.Matrix4;

    initAttriLocation() {
      let gl = GLCore.gl;
      var program = this.program;
      this.buffer = gl.createBuffer();
      this.colorBuffer = gl.createBuffer();
      this.normalBuffer = gl.createBuffer();
      this.indexBuffer = gl.createBuffer();
      this.texCoordBuffer = gl.createBuffer();

      gl.useProgram(program);

      this.u_mvc = gl.getUniformLocation(program, "u_MvcMatrix");
      this.u_projection = gl.getUniformLocation(program, "u_Projection");
      this.u_model = gl.getUniformLocation(program, "u_ModelMatrix");
      this.u_normalMatrix = gl.getUniformLocation(program, "u_NormalMatrix");
      this.a_position = gl.getAttribLocation(program, "a_Position");
      this.a_color = gl.getAttribLocation(program, "a_Color");
      this.a_normal = gl.getAttribLocation(program, "a_Normal");
      this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
      // this.u_lightColor = gl.getUniformLocation(program, "u_lightColor");
      // this.u_lightDirection = gl.getUniformLocation(program, "u_lightDirection");
      this.u_ambientLight = gl.getUniformLocation(program, "u_AmbientLight");
      this.u_pointLightColor = gl.getUniformLocation(program, "u_LightColor");
      this.u_pointLightPosition = gl.getUniformLocation(program, "u_LightPosition");
      this.u_SpotDirection = gl.getUniformLocation(program, "u_SpotDirection");
      this.u_SpotRot = gl.getUniformLocation(program, "u_SpotRot");
      this.u_Sampler = gl.getUniformLocation(program, "u_Sampler");

      this.projectionMatrix = new ecs.Matrix4();
      //projectionMatrix.orthographicCamera(0, leaf.getStageWidth(), 0, leaf.getStageHeight(), 0, -100);
      // this.projectionMatrix.orthographicCamera(0, leaf.getStageWidth(), 0, leaf.getStageHeight(), -1000, 1000);
      this.projectionMatrix.orthographicCamera(-1, 1, -leaf.getStageHeight() / leaf.getStageWidth(), leaf.getStageHeight() / leaf.getStageWidth(), -1000, 1000);
      // this.projectionMatrix.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 100);
      // this.projectionMatrix.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 100);
      // this.projectionMatrix.lookAt(6, 6, 14, 0, 0, 0, 0, 1, 0);

      // Normal3DTask.camera.perspectiveCamera(30, leaf.getStageWidth() / leaf.getStageHeight(), 1, 100);

      // Normal3DTask.camera.lookAt(6, 6, 14, 0, 0, 0, 0, 1, 0);

      gl.uniformMatrix4fv(this.u_projection, false, new Float32Array(this.projectionMatrix.elements));

    }

    mvc: number[][] = [];
    model: number[][] = [];
    normalMatrix: number[][] = [];
    position: number[][] = [];
    normal: number[][] = [];
    color: number[][] = [];
    texCoord: number[][] = [];
    texture: WebGLTexture[] = [];
    indexs: number[][] = [];
    counts: number[] = [];
    index = 0;

    addTask(matrix: ecs.Matrix4, positions: number[], normals: number[],
      colors: number[], texCoords: number[], texture: Texture, indexs: number[]) {
      if (texture.dirty) {
        texture.update();
      }
      // let camera = this.projectionMatrix;
      let camera = Normal3DTask.camera;
      let copy = camera.elements.concat();
      camera.concat(matrix);
      this.mvc.push(camera.elements);
      camera.elements = copy;

      this.model.push(matrix.elements.concat());
      this.normalMatrix.push((new ecs.Matrix4()).setInverseOf(matrix).transpose().elements);
      this.position.push(positions);
      this.normal.push(normals);
      this.color.push(colors);
      this.texCoord.push(texCoords);
      this.texture.push(texture.texture);
      this.indexs.push(indexs);
      this.counts.push(indexs.length);
    }

    static diffuseColor = [0.0, 0.0, 0.0];
    static diffuseDirection = [0, 0, -1];
    static ambientColor = [0.2, 0.2, 0.2];
    static pointColor = [0.5, 0.5, 0.5];
    static pointPosition = [0, 0, 0];
    static spotDirection = [0, 0, -1];
    static spotRot = 30 * Math.PI / 180;

    render() {
      var _this = this;
      var gl = GLCore.gl;
      gl.useProgram(_this.program);
      //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
      //开始渲染任务
      gl.enableVertexAttribArray(this.a_position);
      gl.enableVertexAttribArray(this.a_normal);
      gl.enableVertexAttribArray(this.a_color);
      gl.enableVertexAttribArray(this.a_TexCoord);

      // gl.uniform3fv(this.u_lightColor, Normal3DTask.diffuseColor);
      // gl.uniform3fv(this.u_lightDirection, Normal3DTask.diffuseDirection);
      // gl.uniform3f(this.u_ambientLight, 0.2, 0.2, 0.2);
      // gl.uniform3f(this.u_pointLightColor, 1.0, 1.0, 1.0);
      // gl.uniform3f(this.u_pointLightPosition, 2.3, 4.0, 3.5);
      gl.uniform3fv(this.u_ambientLight, Normal3DTask.ambientColor);
      gl.uniform3fv(this.u_pointLightColor, Normal3DTask.pointColor);
      gl.uniform3fv(this.u_pointLightPosition, Normal3DTask.pointPosition);
      gl.uniform3fv(this.u_SpotDirection, Normal3DTask.spotDirection);
      gl.uniform1f(this.u_SpotRot, Math.cos(Normal3DTask.spotRot));

      gl.activeTexture(gl[`TEXTURE0`]);

      for (var i = 0, len = this.position.length; i < len; i++) {
        //切换混合模式
        // BlendModeFunc.changeBlendMode(this.blendMode[i]);
        //分配 buffer 内容
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(_this.a_position, 3, gl.FLOAT, false, $size * 3, 0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.position[i]), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.vertexAttribPointer(_this.a_normal, 3, gl.FLOAT, false, $size * 3, 0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.normal[i]), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(_this.a_color, 3, gl.FLOAT, false, $size * 3, 0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.color[i]), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, $size * 2, 0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.texCoord[i]), gl.STATIC_DRAW);

        gl.uniformMatrix4fv(this.u_mvc, false, new Float32Array(this.mvc[i]));
        gl.uniformMatrix4fv(this.u_model, false, new Float32Array(this.model[i]));
        gl.uniformMatrix4fv(this.u_normalMatrix, false, new Float32Array(this.normalMatrix[i]));

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexs[i]), gl.STATIC_DRAW);

        if (_this.texture[i]) {
          gl.uniform1i(this.u_Sampler, 0);
          gl.bindTexture(gl.TEXTURE_2D, _this.texture[i]);
        }

        //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
        //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
        gl.drawElements(gl.TRIANGLES, this.counts[i], gl.UNSIGNED_SHORT, 0);//利用drawElements画三角形
        runInfo.drawCount += _this.position[i].length;
        runInfo.drawCall++;
      }

      this.mvc.length = 0;
      this.model.length = 0;
      this.normalMatrix.length = 0;
      this.position.length = 0;
      this.normal.length = 0;
      this.color.length = 0;
      this.texCoord.length = 0;
      this.texture.length = 0;
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