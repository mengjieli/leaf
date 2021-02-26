namespace leaf {

    export var $size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;

    export class BitmapShaderTask3 extends Shader {

        public a_Position: any;
        public a_TexCoord: any;
        public u_Alpha: any;
        public a_Sampler: any;
        public u_PMatrix: any;

        constructor() {
            super();
            //初始化作色器、program
            this.initProgram();
            //初始化作色器固定变量 和 获取作色器中得变量
            this.initAttriLocation();
        }

        /**
         * 初始化作色器、program
         * 1. 初始化 shader
         * 2. 初始化 program
         * 目前没有加 filter (滤镜) 的功能，后续可以继续扩展这两个 shader
         * @param gl
         */
        private initProgram(): void {
            var gl = GLCore.gl;
            var vertexSource = `
             attribute vec2 a_TexCoord;
             attribute vec4 a_Position;
             attribute float a_Sampler;
             uniform mat4 u_PMatrix;
             varying vec2 v_TexCoord;
             varying float v_Sampler;
             void main(void)
             {
                gl_Position = u_PMatrix*a_Position;
                v_TexCoord = a_TexCoord;
             }
             `;


            var fragmentSource = `
             precision mediump float;
             varying vec2 v_TexCoord;
             uniform float u_Alpha;
             varying float v_Sampler;
             uniform sampler2D u_Sampler;
             void main(void)
             {
                gl_FragColor = texture2D(u_Sampler,v_TexCoord)*u_Alpha;
             }
             `;

            var vertexShader = this.createShader(gl.VERTEX_SHADER, vertexSource);
            var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentSource);
            this.program = this.createWebGLProgram(vertexShader, fragmentShader);
        }

        private projectionMatrix: Float32Array = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -1, 1, 0, 1]);

        /**
         * 初始化作色器固定变量 和 获取作色器中得变量
         * 主要初始化投影矩阵，投影矩阵不用每次调用都初始化，只要设置一次即可，除非舞台 (Stage) 的大小改变 (glViewPort)
         * 获取一些变量。
         * @param gl
         * @param width
         * @param height
         */
        private initAttriLocation(): void {
            var gl = GLCore.gl;
            var projectionMatrix = this.projectionMatrix;
            projectionMatrix[0] = 2 / GLCore.width;
            projectionMatrix[5] = -2 / GLCore.height;

            var program = this.program;
            program["name"] = "bitmap program";
            gl.useProgram(this.program);

            if (!this.buffer) {
                this.buffer = gl.createBuffer();
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

            this.a_Position = gl.getAttribLocation(program, "a_Position");
            gl.enableVertexAttribArray(this.a_Position);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, $size * 4, 0);

            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.enableVertexAttribArray(this.a_TexCoord);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, $size * 4, $size * 2);

            this.u_Alpha = gl.getUniformLocation(program, "u_Alpha");

            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(this.u_PMatrix, false, projectionMatrix);
        }

        private textures: WebGLTexture[] = [];
        private count = [];
        private positionData = [];
        private blendMode = [];
        private alpha = [];

        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode) {
            if (!this.textures.length ||
                this.textures[this.textures.length - 1] != texture.texture ||
                this.alpha[this.alpha.length - 1] != alpha ||
                this.blendMode[this.blendMode.length - 1] != blendMode) {
                this.textures.push(texture.texture);
                this.positionData.push([]);
                this.count.push(0);
                this.alpha.push(alpha);
                this.blendMode.push(blendMode);
            }

            var index = this.count[this.count.length - 1] * 30;
            var positionData = this.positionData[this.positionData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;

            positionData[index] = matrix.b * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;

            positionData[16 + index] = positionData[4 + index] = matrix.tx;
            positionData[17 + index] = positionData[5 + index] = matrix.ty;
            positionData[18 + index] = positionData[6 + index] = texture.startX;
            positionData[19 + index] = positionData[7 + index] = texture.startY;

            positionData[12 + index] = positionData[8 + index] = matrix.a * width + matrix.b * height + matrix.tx;
            positionData[13 + index] = positionData[9 + index] = matrix.c * width + matrix.d * height + matrix.ty;
            positionData[14 + index] = positionData[10 + index] = texture.endX;
            positionData[15 + index] = positionData[11 + index] = texture.endY;

            positionData[20 + index] = matrix.a * width + matrix.tx;
            positionData[21 + index] = matrix.c * width + matrix.ty;
            positionData[22 + index] = texture.endX;
            positionData[23 + index] = texture.startY;

            this.count[this.count.length - 1]++;
        }

        /**
         * 渲染
         */
        public render(): void {
            var _this = this;
            var gl = GLCore.gl;
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, $size * 4, 0);
            gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, $size * 4, $size * 2);
            //开始渲染任务
            for (var i = 0, len = _this.textures.length; i < len; i++) {
                //切换混合模式
                BlendModeFunc.changeBlendMode(this.blendMode[i]);
                //绑定当前需要渲染的纹理
                gl.bindTexture(gl.TEXTURE_2D, _this.textures[i]);
                gl.uniform1f(this.u_Alpha, _this.alpha[i]);
                //分配 buffer 内容
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);
                //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
                //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
                gl.drawArrays(gl.TRIANGLES, 0, 6 * _this.count[i]);
                runInfo.drawCount += _this.count[i];
                runInfo.drawCall++;
            }
            this.reset();
        }

        public reset(): void {
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendMode = [];
        }

    }

}