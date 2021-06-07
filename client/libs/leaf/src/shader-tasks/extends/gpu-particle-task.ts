namespace leaf {

    export class GpuParticleShaderTask extends leaf.Shader {

        a_Index: any;
        a_Seed: any;
        // a_Pisition: any;
        // a_TexCoord: any;

        private u_TexSize: any;
        private u_TexRange: any;
        private u_Sampler: any;
        private u_PMatrix: any;
        private u_VMatrix: any;
        private u_LifeTime: any;
        private u_Alpha: any;
        private u_Scale: any;
        private u_Frequency: any;
        private u_Speed: any;
        private u_Acceleration: any;
        private u_StartRotation: any;
        private u_RotationSpeed: any;
        private u_SpawnType: any;
        private u_SpawnRect: any;
        private u_Time: any;
        private u_StartColor: any;
        private u_EndColor: any;


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
            var gl = leaf.GLCore.gl;
            var vertexSource = `
            attribute float a_Index;
            attribute float a_Seed;

             uniform vec2 u_TexSize;
             uniform vec4 u_TexRange;
             uniform mat4 u_PMatrix;
             uniform mat3 u_VMatrix;
             uniform vec2 u_LifeTime;
             uniform float u_Frequency;
             uniform float u_Time;
             uniform vec2 u_Alpha;
             uniform vec2 u_Scale;
             uniform vec2 u_Speed;
             uniform vec2 u_Acceleration;
             uniform vec2 u_StartRotation;
             uniform vec2 u_RotationSpeed;
             uniform int u_SpawnType;
             uniform vec4 u_SpawnRect;
             uniform vec3 u_StartColor;
             uniform vec3 u_EndColor;

             varying vec2 v_TexCoord;
             varying float v_Alpha;
             varying vec4 v_Coord;

             void main(void)
             {
                float type = mod(a_Index, 4.0);
                float ind = (a_Index - type) / 4.0;
                float t = u_Time + ind * u_Frequency;
                float pi = 3.1415926535;
                float life = u_LifeTime.x + (u_LifeTime.y - u_LifeTime.x) * a_Seed;
                t = mod(t, life);
                float startTime = u_Time - t;
                float sx = 0.0;
                float sy = 0.0;
                float p = t / life; 
                float scale = u_Scale.x + (u_Scale.y - u_Scale.x) *  t / life;
                float r = (u_StartRotation.x + (u_StartRotation.y - u_StartRotation.x) * a_Seed ) * pi / 180.0;
                float x = sx + (u_Speed.x * t + 0.5 * (u_Speed.y - u_Speed.x) * t * t / life ) * cos(r) + 0.5 * u_Acceleration.x * t * t;
                float y = sy + (u_Speed.x * t + 0.5 * (u_Speed.y - u_Speed.x) * t * t / life ) * sin(r) + 0.5 * u_Acceleration.y * t * t;
                float offx = 0.0;
                float offy = 0.0;
                float rot = (u_RotationSpeed.x + (u_RotationSpeed.y - u_RotationSpeed.x) * a_Seed) * t * pi / 180.0;
                if(u_SpawnType == 0) {
                    offx += u_SpawnRect.x + u_SpawnRect.z * a_Seed;
                    offy += u_SpawnRect.y + u_SpawnRect.w * mod(a_Seed *ind, 1.0);
                } else if(u_SpawnType == 2) {
                    rot += r;
                }
                vec2 a_Pisition = vec2(0.0,0.0);
                vec2 a_TexCoord = vec2(0.0,0.0);
                if(type < 1.0) {
                    a_Pisition.x = 0.0;
                    a_Pisition.y = 1.0;
                    a_TexCoord.x = u_TexRange.x;
                    a_TexCoord.y = u_TexRange.w;
                } else if(type < 2.0) {
                    a_Pisition.x = 0.0;
                    a_Pisition.y = 0.0;
                    a_TexCoord.x = u_TexRange.x;
                    a_TexCoord.y = u_TexRange.y;
                } else if(type < 3.0) {
                    a_Pisition.x = 1.0;
                    a_Pisition.y = 1.0;
                    a_TexCoord.x = u_TexRange.z;
                    a_TexCoord.y = u_TexRange.w;
                } else {
                    a_Pisition.x = 1.0;
                    a_Pisition.y = 0.0;
                    a_TexCoord.x = u_TexRange.z;
                    a_TexCoord.y = u_TexRange.y;
                }
                mat3 rm = mat3(cos(rot),sin(rot),0.0,  -sin(rot),cos(rot),0.0, 0.0,0.0,1.0);
                float tw = a_Pisition.x * u_TexSize.x;
                float th = a_Pisition.y * u_TexSize.y;
                vec3 pos = u_VMatrix * mat3(scale,0.0,0.0, 0.0,scale,0.0, x + offx ,y + offy,1.0) * rm * mat3(u_TexSize.x,0.0,0.0, 0.0,u_TexSize.y,0.0, 0.0,0.0,1.0) * vec3(a_Pisition.x - 0.5, a_Pisition.y - 0.5, 1.0);
                gl_Position = u_PMatrix*vec4(pos,1.0);
                v_TexCoord = a_TexCoord;
                v_Alpha = u_Alpha.x + (u_Alpha.y - u_Alpha.x) * p;
                v_Coord = vec4(u_StartColor.x + (u_EndColor.x - u_StartColor.x)*p, u_StartColor.y + (u_EndColor.y - u_StartColor.y)*p,u_StartColor.z + (u_EndColor.z - u_StartColor.z)*p,1.0);
             }

             `;

            var fragmentSource = `
             precision mediump float;
             varying vec2 v_TexCoord;
             varying vec4 v_Coord;
             varying float v_Alpha;

             uniform sampler2D u_Sampler;

             vec4 getTextureColor(vec2 coord);

             void main(void)
             {
                gl_FragColor = getTextureColor(v_TexCoord) * v_Coord;
                gl_FragColor.w *= v_Alpha;
             }

             vec4 getTextureColor(vec2 coord) {
                return texture2D(u_Sampler,v_TexCoord);
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
            var gl = leaf.GLCore.gl;
            var projectionMatrix = this.projectionMatrix;
            projectionMatrix[0] = 2 / leaf.GLCore.width;
            projectionMatrix[5] = -2 / leaf.GLCore.height;

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

            this.a_Index = gl.getAttribLocation(program, "a_Index");
            gl.enableVertexAttribArray(this.a_Index);

            this.a_Seed = gl.getAttribLocation(program, "a_Seed");
            gl.enableVertexAttribArray(this.a_Seed);

            // this.a_Pisition = gl.getAttribLocation(program, "a_Pisition");
            // gl.enableVertexAttribArray(this.a_Pisition);

            // this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            // gl.enableVertexAttribArray(this.a_TexCoord);

            this.u_Sampler = gl.getUniformLocation(program, "u_Sampler");
            this.u_TexRange = gl.getUniformLocation(program, "u_TexRange");
            this.u_TexSize = gl.getUniformLocation(program, "u_TexSize");
            this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            this.u_VMatrix = gl.getUniformLocation(program, "u_VMatrix");

            this.u_LifeTime = gl.getUniformLocation(program, "u_LifeTime");
            this.u_Frequency = gl.getUniformLocation(program, "u_Frequency");
            this.u_Alpha = gl.getUniformLocation(program, "u_Alpha");
            this.u_Scale = gl.getUniformLocation(program, "u_Scale");
            this.u_Speed = gl.getUniformLocation(program, "u_Speed");
            this.u_Acceleration = gl.getUniformLocation(program, "u_Acceleration");
            this.u_StartRotation = gl.getUniformLocation(program, "u_StartRotation");
            this.u_RotationSpeed = gl.getUniformLocation(program, "u_RotationSpeed");
            this.u_SpawnType = gl.getUniformLocation(program, "u_SpawnType");
            this.u_SpawnRect = gl.getUniformLocation(program, "u_SpawnRect");
            this.u_StartColor = gl.getUniformLocation(program, "u_StartColor");
            this.u_EndColor = gl.getUniformLocation(program, "u_EndColor");
            this.u_Time = gl.getUniformLocation(program, "u_Time");
        }

        private attributes: WebGLBuffer[] = [];
        private textures: WebGLTexture[] = [];
        private sizes: { width: number, height: number }[] = [];
        private ranges: number[][] = [];
        private matrixs: ecs.Matrix[] = [];
        private time: number[] = [];
        private configs: ParticleConfig[] = [];
        private count: number[] = [];
        private blendMode: leaf.BlendMode[] = [];

        private indiceData = [];

        addTask(time: number, attributes: WebGLBuffer, count: number, texture: leaf.Texture, config: ParticleConfig, matrix: ecs.Matrix, blendMode: leaf.BlendMode, tint: number) {
            this.time.push(time);
            this.attributes.push(attributes);
            this.textures.push(texture.texture);
            this.configs.push(config);
            this.sizes.push({ width: texture.sourceWidth, height: texture.sourceHeight });
            this.ranges.push([texture.startX, texture.startY, texture.endX, texture.endY]);
            this.matrixs.push(matrix);
            this.count.push(0);
            this.blendMode.push(blendMode);

            this.count[this.count.length - 1] += count;
        }

        renderCounts: number[] = [];
        lastRenderCount: number = 0;
        renderIndex = 0;

        startNewTask() {
            if (this.lastRenderCount != this.textures.length) {
                this.renderCounts.push(this.textures.length);
                this.lastRenderCount = this.textures.length;
            }
        }

        /**
         * 渲染
         */
        public render(): void {
            var _this = this;
            var gl = leaf.GLCore.gl;
            var max = this.renderCounts.shift();
            gl.useProgram(_this.program);

            gl.uniformMatrix4fv(this.u_PMatrix, false, this.projectionMatrix);

            var i = this.renderIndex;
            //开始渲染任务
            for (var len = _this.textures.length; i < len && i < max; i++) {
                gl.uniform2f(this.u_TexSize, _this.sizes[i].width, _this.sizes[i].height);
                gl.uniform4f(this.u_TexRange, _this.ranges[i][0], _this.ranges[i][1], _this.ranges[i][2], _this.ranges[i][3]);

                //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
                gl.bindBuffer(gl.ARRAY_BUFFER, this.attributes[i]);
                gl.vertexAttribPointer(this.a_Index, 1, gl.FLOAT, false, $size * 2, $size * 0);
                gl.vertexAttribPointer(this.a_Seed, 1, gl.FLOAT, false, $size * 2, $size * 1);
                // gl.vertexAttribPointer(this.a_Pisition, 2, gl.FLOAT, false, $size * 5, $size);
                // gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, $size * 5, $size * 3);
                //切换混合模式
                leaf.BlendModeFunc.changeBlendMode(this.blendMode[i]);
                // gl.vertexAttribPointer(_this.a_Index, 1, gl.FLOAT, false, $size * 3, 0);
                // gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, $size * 3, $size);
                // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);

                let cfg = this.configs[i];
                gl.uniform2f(this.u_LifeTime, cfg.lifetime.min, cfg.lifetime.max);
                gl.uniform1f(this.u_Frequency, cfg.frequency);
                gl.uniform1f(this.u_Time, this.time[i]);
                gl.uniform2f(this.u_Alpha, cfg.alpha.start, cfg.alpha.end);
                gl.uniform2f(this.u_Scale, cfg.scale.start, cfg.scale.end);
                gl.uniform2f(this.u_Speed, cfg.speed.start, cfg.speed.end);
                cfg.acceleration && gl.uniform2f(this.u_Acceleration, cfg.acceleration.x, cfg.acceleration.y);
                gl.uniform2f(this.u_StartRotation, cfg.startRotation.min, cfg.startRotation.max);
                gl.uniform2f(this.u_RotationSpeed, cfg.rotationSpeed.min, cfg.rotationSpeed.max);
                gl.uniform1i(this.u_SpawnType, spawnTypes[cfg.spawnType]);
                cfg.spawnRect && gl.uniform4f(this.u_SpawnRect, cfg.spawnRect.x, cfg.spawnRect.y, cfg.spawnRect.w, cfg.spawnRect.h);
                let color: number;
                if (typeof cfg.color.start === "string") color = +("0x" + cfg.color.start);
                else color = cfg.color.start;
                gl.uniform3f(this.u_StartColor, (color >> 16) / 0xFF, (color >> 8 & 0xFF) / 0xFF, (color & 0xFF) / 0xFF);
                if (typeof cfg.color.end === "string") color = +("0x" + cfg.color.end);
                else color = cfg.color.end;
                gl.uniform3f(this.u_EndColor, (color >> 16) / 0xFF, (color >> 8 & 0xFF) / 0xFF, (color & 0xFF) / 0xFF);
                let m = this.matrixs[i];
                // let rot = 0.0 * Math.PI / 180.0;
                // let cos = Math.cos(rot);
                // let sin = Math.sin(rot);

                gl.uniformMatrix3fv(this.u_VMatrix, false, [
                    m.a, m.b, 0,
                    m.c, m.d, 0,
                    m.tx, m.ty, 1]);

                gl.uniform1i(this.u_Sampler, 0);
                gl.activeTexture(gl[`TEXTURE0`]);
                gl.bindTexture(gl.TEXTURE_2D, _this.textures[i]);

                //真正的绘制，之前测试 drawElements 并不比 drawArrays 快，其实也很正常，因为二维里面顶点数据共用并不多，
                //一个矩形也就对角线的两个顶点各被共用两次(两个三角形共用)，远小于 3D 里面的立方体一个顶点被 6 个三角形共用。
                gl.drawElements(gl.TRIANGLES, _this.count[i] * 6, gl.UNSIGNED_SHORT, 0);//利用drawElements画三角形
                leaf.runInfo.drawCount += _this.count[i];
                leaf.runInfo.drawCall++;
            }
            _this.renderIndex = i;
            if (_this.renderIndex === _this.textures.length) {
                _this.reset();
            }
        }

        public reset(): void {
            this.attributes = [];
            this.textures = [];
            this.sizes = [];
            this.ranges = [];
            this.matrixs = [];
            this.count = [];
            this.blendMode = [];
            this.configs = [];
            this.time = [];
            this.renderCounts.length = 0;
            this.lastRenderCount = 0;
            this.renderIndex = 0;
        }


        private static _shader: GpuParticleShaderTask;

        static get shader(): GpuParticleShaderTask {
            if (!this._shader) {
                this._shader = new GpuParticleShaderTask() as any;
            }
            return this._shader;
        }

    }

}