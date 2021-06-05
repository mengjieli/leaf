namespace leaf {

    export var $size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;

    export class NormalShaderTask extends Shader {

        private a_Position: any;
        private a_TexCoord: any;
        private a_Alpha: any;
        private a_Sampler: any;
        private a_Color:any;
        private u_PMatrix: any;
        private u_Samplers: any[];

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
            precision highp float;
             attribute vec2 a_TexCoord;
             attribute vec4 a_Position;
             attribute float a_Alpha;
             attribute float a_Sampler;
             attribute float a_Color; 

             uniform mat4 u_PMatrix;
             varying vec2 v_TexCoord;
             varying float v_Alpha;
             varying float v_Sampler;
             varying float v_Color;
             void main(void)
             {
                gl_Position = u_PMatrix*a_Position;
                v_TexCoord = a_TexCoord;
                v_Alpha = a_Alpha;
                v_Sampler = a_Sampler;
                v_Color = a_Color;
             }
             `;

            var fragmentSource = `
             precision highp float;
             varying vec2 v_TexCoord;
             varying float v_Alpha;
             varying float v_Sampler;
             varying float v_Color;

             uniform sampler2D u_Sampler0;
             uniform sampler2D u_Sampler1;
             uniform sampler2D u_Sampler2;
             uniform sampler2D u_Sampler3;
             uniform sampler2D u_Sampler4;
             uniform sampler2D u_Sampler5;
             uniform sampler2D u_Sampler6;
             uniform sampler2D u_Sampler7;
             vec4 getTextureColor(vec2 coord);
             void main(void)
             {
                vec4 color = vec4(float((v_Color/65536.0))/255.0,float(int(mod(v_Color,65536.0)/255.0))/255.0,mod(v_Color,256.0)/255.0,1.0);
                gl_FragColor = getTextureColor(v_TexCoord)*color*v_Alpha;
             }

             vec4 getTextureColor(vec2 coord) {
                if(v_Sampler == 0.0) {
                    return texture2D(u_Sampler0,v_TexCoord);
                } else if(v_Sampler == 1.0) {
                    return texture2D(u_Sampler1,v_TexCoord);
                } else if(v_Sampler == 2.0) {
                    return texture2D(u_Sampler2,v_TexCoord);
                } else if(v_Sampler == 3.0) {
                    return texture2D(u_Sampler3,v_TexCoord);
                } else if(v_Sampler == 4.0) {
                    return texture2D(u_Sampler4,v_TexCoord);
                } else if(v_Sampler == 5.0) {
                    return texture2D(u_Sampler5,v_TexCoord);
                } else if(v_Sampler == 6.0) {
                    return texture2D(u_Sampler6,v_TexCoord);
                } else if(v_Sampler == 7.0) {
                    return texture2D(u_Sampler7,v_TexCoord);
                }
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
            program["name"] = "normal program";
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
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, $size * 7, 0);

            this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.enableVertexAttribArray(this.a_TexCoord);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, $size * 7, $size * 2);

            this.a_Alpha = gl.getAttribLocation(program, "a_Alpha");
            gl.enableVertexAttribArray(this.a_Alpha);
            gl.vertexAttribPointer(this.a_Alpha, 1, gl.FLOAT, false, $size * 7, $size * 4);

            this.a_Sampler = gl.getAttribLocation(program, "a_Sampler");
            gl.enableVertexAttribArray(this.a_Sampler);
            gl.vertexAttribPointer(this.a_Sampler, 1, gl.FLOAT, false, $size * 7, $size * 5);

            this.a_Color = gl.getAttribLocation(program, "a_Color");
            gl.enableVertexAttribArray(this.a_Color);
            gl.vertexAttribPointer(this.a_Color, 1, gl.FLOAT, false, $size * 7, $size * 6);

            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(this.u_PMatrix, false, projectionMatrix);

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
                this.count.length && this.count[this.count.length - 1] > 4096 ||
                this.blendMode[this.blendMode.length - 1] != blendMode) {
                this.newAddNew = false;
                this.textures.push([texture.texture]);
                txtureIndex = 0;
                this.positionData.push([]);
                this.count.push(0);
                this.blendMode.push(blendMode);
            } else {
                if (txtureIndex === -1) {
                    txtureIndex = this.textures[this.textures.length - 1].length;
                    this.textures[this.textures.length - 1].push(texture.texture);
                }
            }

            var index = this.count[this.count.length - 1] * 28;
            var positionData = this.positionData[this.positionData.length - 1];
            var width = texture.sourceWidth;
            var height = texture.sourceHeight;

            positionData[index] = matrix.c * height + matrix.tx;
            positionData[1 + index] = matrix.d * height + matrix.ty;
            positionData[2 + index] = texture.startX;
            positionData[3 + index] = texture.endY;
            positionData[4 + index] = alpha;
            positionData[5 + index] = txtureIndex;
            positionData[6 + index] = tint;

            positionData[7 + index] = matrix.tx;
            positionData[8 + index] = matrix.ty;
            positionData[9 + index] = texture.startX;
            positionData[10 + index] = texture.startY;
            positionData[11 + index] = alpha;
            positionData[12 + index] = txtureIndex;
            positionData[13 + index] = tint;

            positionData[14 + index] = matrix.a * width + matrix.c * height + matrix.tx;
            positionData[15 + index] = matrix.b * width + matrix.d * height + matrix.ty;
            positionData[16 + index] = texture.endX;
            positionData[17 + index] = texture.endY;
            positionData[18 + index] = alpha;
            positionData[19 + index] = txtureIndex;
            positionData[20 + index] = tint;

            positionData[21 + index] = matrix.a * width + matrix.tx;
            positionData[22 + index] = matrix.b * width + matrix.ty;
            positionData[23 + index] = texture.endX;
            positionData[24 + index] = texture.startY;
            positionData[25 + index] = alpha;
            positionData[26 + index] = txtureIndex;
            positionData[27 + index] = tint;

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
            var max = this.renderCounts.shift();
            gl.useProgram(_this.program);
            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(_this.a_Position, 2, gl.FLOAT, false, $size * 7, 0);
            gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, $size * 7, $size * 2);
            gl.vertexAttribPointer(_this.a_Alpha, 1, gl.FLOAT, false, $size * 7, $size * 4);
            gl.vertexAttribPointer(_this.a_Sampler, 1, gl.FLOAT, false, $size * 7, $size * 5);
            gl.vertexAttribPointer(_this.a_Color, 1, gl.FLOAT, false, $size * 7, $size * 6);
            var i = this.renderIndex;
            //开始渲染任务
            for (var len = _this.textures.length; i < len && i < max; i++) {
                //切换混合模式
                BlendModeFunc.changeBlendMode(this.blendMode[i]);
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
            _this.renderCounts.length = 0;
            _this.lastRenderCount = 0;
            _this.renderIndex = 0;
        }


        private static _shader: NormalShaderTask;

        static get shader(): NormalShaderTask {
            if (!this._shader) {
                this._shader = new NormalShaderTask() as any;
            }
            return this._shader;
        }

    }

}