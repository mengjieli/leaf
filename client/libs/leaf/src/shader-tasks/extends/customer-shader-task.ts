namespace leaf {

    export var $size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;

    export class CustomerShaderTask extends Shader {

        private a_Position: any;
        private a_TexCoord: any;
        private a_Alpha: any;
        private a_Sampler: any;
        private u_PMatrix: any;
        private u_Samplers: any[];
        private u_Color: any;

        gl: WebGLRenderingContext;

        constructor(vertexSource: string, fragmentSource: string) {
            super();
            //初始化作色器、program
            this.initProgram(vertexSource, fragmentSource);
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
        private initProgram(vertexSource: string, fragmentSource: string): void {
            var gl = this.gl = GLCore.gl;
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
            program["name"] = "customer program";
            gl.useProgram(this.program);

            if (!this.buffer) {
                this.buffer = gl.createBuffer();
                this.indexBuffer = gl.createBuffer();
                let indiceData = this.indiceData;
                let count = 30000;
                for (let i = 0; i < count; i++) {
                    let index2 = i * 6;
                    let index2_2 = i * 4;
                    indiceData[0 + index2] = 0 + index2_2;
                    indiceData[1 + index2] = 1 + index2_2;
                    indiceData[2 + index2] = 2 + index2_2;
                    indiceData[3 + index2] = 2 + index2_2;
                    indiceData[4 + index2] = 1 + index2_2;
                    indiceData[5 + index2] = 3 + index2_2;
                }
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indiceData), gl.STATIC_DRAW);
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

            this.a_Position = gl.getAttribLocation(program, "a_Position");
            gl.enableVertexAttribArray(this.a_Position);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, $size * 6, 0);

            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.enableVertexAttribArray(this.a_TexCoord);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, $size * 6, $size * 2);

            this.a_Alpha = gl.getAttribLocation(program, "a_Alpha");
            gl.enableVertexAttribArray(this.a_Alpha);
            gl.vertexAttribPointer(this.a_Alpha, 1, gl.FLOAT, false, $size * 6, $size * 4);

            this.a_Sampler = gl.getAttribLocation(program, "a_Sampler");
            gl.enableVertexAttribArray(this.a_Sampler);
            gl.vertexAttribPointer(this.a_Sampler, 1, gl.FLOAT, false, $size * 6, $size * 5);

            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(this.u_PMatrix, false, projectionMatrix);

            this.u_Color = gl.getUniformLocation(program, "u_Color");
            gl.uniform4f(this.u_Color, 1, 1, 1, 1);

            this.u_Samplers = [];
            for (let i = 0; i < 8; i++) {
                this.u_Samplers[i] = gl.getUniformLocation(program, "u_Sampler" + i);
            }
        }

        private textures: WebGLTexture[][] = [];
        private count = [];
        private positionData = [];
        private blendMode = [];
        private indiceData = [];
        private tints = [];
        private newAddNew: boolean = true;

        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode, tint: number) {
            if (texture.dirty) {
                texture.update();
            }
            var txtureIndex = this.textures.length ? this.textures[this.textures.length - 1].indexOf(texture.texture) : -1;
            if (this.newAddNew ||
                !this.textures.length ||
                txtureIndex === -1 &&
                this.textures[this.textures.length - 1].length >= 8 ||
                this.count.length && this.count[this.count.length - 1] > 512 ||
                this.blendMode[this.blendMode.length - 1] != blendMode ||
                this.tints[this.tints.length - 1] != tint) {
                this.newAddNew = false;
                this.textures.push([texture.texture]);
                txtureIndex = 0;
                this.positionData.push([]);
                this.count.push(0);
                this.blendMode.push(blendMode);
                this.tints.push(tint);
            } else {
                if (txtureIndex === -1) {
                    txtureIndex = this.textures[this.textures.length - 1].length;
                    this.textures[this.textures.length - 1].push(texture.texture);
                }
            }

            var index = this.count[this.count.length - 1] * 24;
            var positionData = this.positionData[this.positionData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;

            positionData[index] = matrix.c * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;
            positionData[4 + index] = alpha;
            positionData[5 + index] = txtureIndex;

            positionData[6 + index] = matrix.tx;
            positionData[7 + index] = matrix.ty;
            positionData[8 + index] = texture.startX;
            positionData[9 + index] = texture.startY;
            positionData[10 + index] = alpha;
            positionData[11 + index] = txtureIndex;

            positionData[12 + index] = matrix.a * width + matrix.c * height + matrix.tx;
            positionData[13 + index] = matrix.b * width + matrix.d * height + matrix.ty;
            positionData[14 + index] = texture.endX;
            positionData[15 + index] = texture.endY;
            positionData[16 + index] = alpha;
            positionData[17 + index] = txtureIndex;

            positionData[18 + index] = matrix.a * width + matrix.tx;
            positionData[19 + index] = matrix.b * width + matrix.ty;
            positionData[20 + index] = texture.endX;
            positionData[21 + index] = texture.startY;
            positionData[22 + index] = alpha;
            positionData[23 + index] = txtureIndex;

            this.count[this.count.length - 1]++;
        }

        renderCounts: number[] = [];
        lastRenderCount: number = 0;
        renderIndex = 0;

        startNewTask() {
            if (this.lastRenderCount != this.textures.length) {
                this.renderCounts.push(this.textures.length);
                this.lastRenderCount = this.textures.length;
            }
            this.newAddNew = true;
        }

        /**
         * 渲染
         */
        public render(): void {
            var _this = this;
            var gl = GLCore.gl;
            var max = this.renderCounts.pop();
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, $size * 6, 0);
            gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, $size * 6, $size * 2);
            gl.vertexAttribPointer(_this.a_Alpha, 1, gl.FLOAT, false, $size * 6, $size * 4);
            gl.vertexAttribPointer(_this.a_Sampler, 1, gl.FLOAT, false, $size * 6, $size * 5);
            var i = this.renderIndex;
            //开始渲染任务
            for (var len = _this.textures.length; i < len && i < max; i++) {
                //切换混合模式
                BlendModeFunc.changeBlendMode(this.blendMode[i]);
                gl.uniform4f(this.u_Color, (this.tints[i] >> 16) / 255.0, ((this.tints[i] >> 8) & 0xFF) / 255.0, (this.tints[i] & 0xFF) / 255.0, 1);
                //绑定当前需要渲染的纹理
                for (let t = 0; t < _this.textures[i].length; t++) {
                    gl.uniform1i(this.u_Samplers[t], t);
                    gl.activeTexture(gl[`TEXTURE${t}`]);
                    gl.bindTexture(gl.TEXTURE_2D, _this.textures[i][t]);
                }
                //分配 buffer 内容
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);

                //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
                //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
                gl.drawElements(gl.TRIANGLES, _this.count[i] * 6, gl.UNSIGNED_SHORT, 0);//利用drawElements画三角形
                runInfo.drawCount += _this.count[i];
                runInfo.drawCall++;
            }
            _this.renderIndex = i;
            if (_this.renderIndex === _this.textures.length) {
                _this.reset();
            }
        }

        public reset(): void {
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendMode = [];
            _this.tints = [];
            _this.renderCounts.length = 0;
            _this.lastRenderCount = 0;
            _this.renderIndex = 0;
        }

    }

}