namespace leaf {

  export class Normal3DTask extends Shader {

    private a_Position: any;

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
        attribute vec3 a_Position;
        uniform mat4 u_model;
        uniform mat4 u_project;
        void main() {
          gl_Position = u_project * u_model * vec4(a_Position, 1.0);
        }
      `;
      let fragmentSource = `
        precision mediump float;
        void main() {
          gl_FragColor = vec4(0.0,1.0,0.0,1.0); //纯绿色
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

      this.a_Position = gl.getAttribLocation(program, "a_Position");
      gl.enableVertexAttribArray(this.a_Position);
      gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, $size * 6, 0);
    }

    positionData: number[] = [];
    indexs: number[] = [];

    addTask(positions: number[], indexs: number[]) {
      let index = this.positionData.length;
      let positionData = this.positionData;
      // positionData[index + 0] = x 

    }

    render() {

    }

  }

}