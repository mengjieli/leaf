namespace leaf {

    export var $size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;

    export class BatchShaderTask extends Shader {

        private a_Position: any;
        private a_TexCoord: any;
        private a_Alpha: any;
        private a_Sampler: any;
        private u_PMatrix: any;
        private u_GMatrix: any;
        private u_Samplers: any[];
        private u_Color: any;

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
             attribute float a_Alpha;
             attribute float a_Sampler;
             uniform mat4 u_PMatrix;
             uniform mat4 u_GMatrix;
             varying vec2 v_TexCoord;
             varying float v_Alpha;
             varying float v_Sampler;
             void main(void)
             {
                gl_Position = u_PMatrix*u_GMatrix*a_Position;
                v_TexCoord = a_TexCoord;
                v_Alpha = a_Alpha;
                v_Sampler = a_Sampler;
             }
             `;


            var fragmentSource = `
             precision mediump float;
             varying vec2 v_TexCoord;
             varying float v_Alpha;
             varying float v_Sampler;
             uniform vec4 u_Color;
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
                gl_FragColor = getTextureColor(v_TexCoord)*u_Color*v_Alpha;
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

        private indiceData = [];

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

            this.u_GMatrix = gl.getUniformLocation(program, "u_GMatrix");

            this.u_Color = gl.getUniformLocation(program, "u_Color");
            gl.uniform4f(this.u_Color, 1, 1, 1, 1);

            this.u_Samplers = [];
            for (let i = 0; i < 8; i++) {
                this.u_Samplers[i] = gl.getUniformLocation(program, "u_Sampler" + i);
            }
        }

        curBatch: BatchRender;

        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode, tint: number) {
            let batch: BatchRender = this.curBatch;
            if (texture.dirty) {
                texture.update();
            }
            var txtureIndex = batch.textures.length ? batch.textures[batch.textures.length - 1].indexOf(texture.texture) : -1;
            if (!batch.textures.length ||
                txtureIndex === -1 &&
                batch.textures[batch.textures.length - 1].length >= 8 ||
                batch.count.length && batch.count[batch.count.length - 1] > 512 ||
                batch.blendModes[batch.blendModes.length - 1] != blendMode ||
                batch.tints[batch.tints.length - 1] != tint) {
                batch.textures.push([texture.texture]);
                txtureIndex = 0;
                batch.positionData.push([]);
                batch.count.push(0);
                batch.blendModes.push(blendMode);
                batch.tints.push(tint);
            } else {
                if (txtureIndex === -1) {
                    txtureIndex = batch.textures[batch.textures.length - 1].length;
                    batch.textures[batch.textures.length - 1].push(texture.texture);
                }
            }

            var index = batch.count[batch.count.length - 1] * 24;
            var positionData = batch.positionData[batch.positionData.length - 1];
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

            batch.count[batch.count.length - 1]++;
        }

        batchs: BatchRender[] = [];

        startNewTask() {
        }

        /**
         * 渲染
         */
        public render(): void {
            while (this.batchs.length) {
                this.renderBatch(this.batchs.shift());
            }
        }

        public renderBatch(batch) {
            var _this = this;
            var gl = GLCore.gl;
            gl.useProgram(_this.program);
            gl.uniformMatrix4fv(this.u_GMatrix, false, batch.projectionMatrix);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, $size * 6, 0);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, $size * 6, $size * 2);
            gl.vertexAttribPointer(this.a_Alpha, 1, gl.FLOAT, false, $size * 6, $size * 4);
            gl.vertexAttribPointer(this.a_Sampler, 1, gl.FLOAT, false, $size * 6, $size * 5);

            let tins = batch.tints;
            let textures = batch.textures;
            let positionData = batch.positionData;
            let count = batch.count;
            let blendMode = batch.blendMode;
            //开始渲染任务
            for (var i = 0, len = textures.length; i < len; i++) {
                //切换混合模式
                BlendModeFunc.changeBlendMode(blendMode[i]);
                gl.uniform4f(this.u_Color, (tins[i] >> 16) / 255.0, ((tins[i] >> 8) & 0xFF) / 255.0, (tins[i] & 0xFF) / 255.0, 1);
                //绑定当前需要渲染的纹理
                for (let t = 0; t < textures[i].length; t++) {
                    gl.uniform1i(this.u_Samplers[t], t);
                    gl.activeTexture(gl[`TEXTURE${t}`]);
                    gl.bindTexture(gl.TEXTURE_2D, textures[i][t]);
                }
                //分配 buffer 内容
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData[i]), gl.STATIC_DRAW);

                //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
                //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
                gl.drawElements(gl.TRIANGLES, count[i] * 6, gl.UNSIGNED_SHORT, 0);//利用drawElements画三角形
                runInfo.drawCount += count[i];
                runInfo.drawCall++;
            }
        }

        private static _shader: BatchShaderTask;

        static get shader(): BatchShaderTask {
            if (!this._shader) {
                this._shader = new BatchShaderTask() as any;
            }
            return this._shader;
        }

    }

}