import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("PixiScene")
export class PixiScene extends ModuleScene {

    constructor() {
        super();

        leaf.StateWin.show();

        for (let i = 0; i < 1; i++) {
            this.addParticle();
        }
    }

    addParticle(x = 0, y = 0) {
        let p = ecs.Entity.create().addComponent(Particle);
        p.entity.parent = this.scene;
        p.resource = "snow_png";
        // p.texture = leaf.PointTexture.getTexture(0xffffff);
        p.config = {
            lifeTime: 5, //每个粒子的生命周期
            frequency: 5, //发射频率
            allTime: 100, //粒子发射器发射时间
            alpha: [0.73, 0.46], //
            scale: [1, 1],
            speed: {
                start: 200,
                end: 200
            },
            startRotation: {
                min: 80,
                max: 100
            },
            rotationSpeed: {
                min: 0,
                max: 200
            },
            spawnType: EMSpawnType.RECT,
            spawnRect: {
                x: 0,
                y: 0,
                w: 640,
                h: -20
            }
        }
        // p.transform.scaleX = p.transform.scaleY = 0.1;
        p.transform.x = x;
        p.transform.y = y;
    }

    close() {
        super.close();
    }

}

export class Particle extends leaf.Render {

    shader = ParticleShaderTask.shader;

    /**
     * @internal
     */
    private _texture: leaf.Texture;

    private _resource: string;
    private _res: leaf.Resource<leaf.Texture>;

    private _config: ParticleConfig;

    get config(): ParticleConfig {
        return this._config;
    }

    private buffer: WebGLBuffer;
    private bufferDirty: boolean;

    set config(val: ParticleConfig) {
        this._config = val;
        if (this.buffer) {
            leaf.GLCore.gl.deleteBuffer(this.buffer);
        }
        this.buffer = null;
        if (val) {
            this.bufferDirty = true;
        }
    }

    get texture(): leaf.Texture {
        return this._texture;
    }

    set texture(val: leaf.Texture) {
        this._texture = val;
    }

    get resource(): string {
        return this._resource;
    }

    private _tint: number = 0xffffff;

    get tint(): number {
        return this._tint;
    }

    set tint(val: number) {
        this._tint = val;
    }

    set resource(val: string) {
        if (this._resource === val) return;
        if (this._res) this._res.removeCount();
        this._resource = val;
        let res = this._res = leaf.Res.getRes(val);
        if (!res) {
            this.texture = null;
            return;
        }
        if (res.data) {
            this.texture = res.data;
            res.addCount();
        } else {
            res.addCount();
            res.load().then(() => {
                if (this._res !== res) return;
                this.texture = res.data;
            });
        }
    }

    time = 0;

    get width() {
        return this._texture ? this._texture.sourceWidth : 0;
    }

    get height() {
        return this._texture ? this._texture.sourceHeight : 0;
    }


    private refreshBuffer() {
        this.bufferDirty = false;

        this.buffer = leaf.GLCore.gl.createBuffer();
        let count = Math.ceil((1 / this.config.frequency) * this.config.lifeTime);
        let positionData = [];

        for (let i = 0; i < count; i++) {
            let index = i * 8;
            let r = Math.random();
            positionData[0 + index] = index + 0;
            positionData[1 + index] = r;
            positionData[2 + index] = index + 1;
            positionData[3 + index] = r;
            positionData[4 + index] = index + 2;
            positionData[5 + index] = r;
            positionData[6 + index] = index + 3;
            positionData[7 + index] = r;
        }
        let bufferData = new Float32Array(positionData)

        let gl = leaf.GLCore.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        //切换混合模式
        // BlendModeFunc.changeBlendMode(this.blendMode[i]);
        gl.vertexAttribPointer(this.shader.a_Index, 1, gl.FLOAT, false, $size * 2, 0);
        gl.vertexAttribPointer(this.shader.a_Seed, 1, gl.FLOAT, false, $size * 2, $size * 1);
        gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
    }

    preRender() {
        if (this._texture && this.bufferDirty) {
            this.refreshBuffer();
        }
        if (!this._texture || !this.config) return;
        let count = Math.ceil((1 / this.config.frequency) * this.config.lifeTime);
        (this.shader).addTask(this.time * 0.001, this.buffer, count, this.texture, this.config, this.entity.transform.worldMatrix, this.blendMode, this._tint);
    }

    preRender2(matrix: ecs.Matrix, alpha: number, shader?: leaf.Shader) {
        if (this._texture && this.bufferDirty) {
            this.refreshBuffer();
        }
        if (!this._texture || !this.config) return;
        matrix.reconcat(this.entity.transform.local);
        let count = Math.ceil((1 / this.config.frequency) * this.config.lifeTime);
        (shader || this.shader).addTask(this.time * 0.001, this.buffer, count, this.texture, this.config, this.entity.transform.worldMatrix, this.blendMode, this._tint);
    }

    update(dt) {
        this.time += dt;
    }

    onDestroy() {
        this.texture = null;
        if (this._res) this._res.removeCount();
        this._resource = this._res = null;
        this._tint = 0xffffff;
        this.config = null;
        this.time = 0;
        super.onDestroy();
    }
}

export enum EMSpawnType {
    RECT = 0
}


export interface ParticleConfig {
    lifeTime: number; //每个粒子的生命周期
    frequency: number; //发射频率
    allTime: number; //粒子发射器发射时间
    alpha: number[]; //alpha 变化
    scale: number[];
    speed: {
        start: number,
        end: number
    };
    startRotation: {
        min: number,
        max: number
    };
    rotationSpeed: {
        min: number,
        max: number
    };
    spawnType: EMSpawnType;
    spawnRect?: { x: number, y: number, w: number, h: number };
}


export var $size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;

export class ParticleShaderTask extends leaf.Shader {

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
    private u_AllTime: any;
    private u_Speed: any;
    private u_StartRotation: any;
    private u_RotationSpeed:any;
    private u_SpawnType: any;
    private u_SpawnRect: any;
    private u_Time: any;


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
             uniform float u_LifeTime;
             uniform float u_Frequency;
             uniform float u_AllTime;
             uniform float u_Time;
             uniform vec2 u_Alpha;
             uniform vec2 u_Scale;
             uniform vec2 u_Speed;
             uniform vec2 u_StartRotation;
             uniform vec2 u_RotationSpeed;
             uniform int u_SpawnType;
             uniform vec4 u_SpawnRect;

             varying vec2 v_TexCoord;
             varying float v_Alpha;

             void main(void)
             {
                float type = mod(a_Index, 4.0);
                float ind = (a_Index - type) / 4.0;
                float t = u_Time + ind * u_Frequency;
                float pi = 3.1415926535;
                t = mod(t, u_LifeTime);
                float scale = u_Scale.x + (u_Scale.y - u_Scale.x) *  t / u_LifeTime;
                float speed = u_Speed.x;
                float seed0 =  mod(a_Seed * (ind + t / u_LifeTime), 1.0);
                float r = (u_StartRotation.x + (u_StartRotation.y - u_StartRotation.x) * mod(a_Seed * ind, 1.0) ) * pi / 180.0;
                float x = t * speed * cos(r);
                float y = t * speed * sin(r);
                float offx = 0.0;
                float offy = 0.0;
                if(u_SpawnType == 0) {
                    offx = u_SpawnRect.x + u_SpawnRect.z * a_Seed;
                    offy = u_SpawnRect.y + u_SpawnRect.w * a_Seed;
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
                float rot = 30.0 * pi / 180.0;
                float sx = a_Pisition.x * u_TexSize.x;
                float sy = a_Pisition.y * u_TexSize.y;
                float len = sqrt(a_Pisition.x * a_Pisition.x + a_Pisition.y * a_Pisition.y);
                vec3 pos = u_VMatrix * vec3(a_Pisition.x * u_TexSize.x * scale + x + offx,a_Pisition.y * u_TexSize.y * scale + y + offy, 1.0);
                gl_Position = u_PMatrix*vec4(pos,1.0);
                v_TexCoord = a_TexCoord;
                v_Alpha = u_Alpha.x + (u_Alpha.y - u_Alpha.x) *  t / u_LifeTime;
             }

             `;

        var fragmentSource = `
             precision mediump float;
             varying vec2 v_TexCoord;
             varying float v_Alpha;

             uniform sampler2D u_Sampler;

             vec4 getTextureColor(vec2 coord);

             void main(void)
             {
                gl_FragColor = getTextureColor(v_TexCoord) * v_Alpha;
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
        this.u_AllTime = gl.getUniformLocation(program, "u_AllTime");
        this.u_Alpha = gl.getUniformLocation(program, "u_Alpha");
        this.u_Scale = gl.getUniformLocation(program, "u_Scale");
        this.u_Speed = gl.getUniformLocation(program, "u_Speed");
        this.u_StartRotation = gl.getUniformLocation(program, "u_StartRotation");
        this.u_RotationSpeed = gl.getUniformLocation(program, "u_RotationSpeed");
        this.u_SpawnType = gl.getUniformLocation(program, "u_SpawnType");
        this.u_SpawnRect = gl.getUniformLocation(program, "u_SpawnRect");
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
            // BlendModeFunc.changeBlendMode(this.blendMode[i]);
            // gl.vertexAttribPointer(_this.a_Index, 1, gl.FLOAT, false, $size * 3, 0);
            // gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, $size * 3, $size);
            // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);

            let cfg = this.configs[i];
            gl.uniform1f(this.u_LifeTime, cfg.lifeTime);
            gl.uniform1f(this.u_Frequency, cfg.frequency);
            gl.uniform1f(this.u_AllTime, cfg.allTime);
            gl.uniform1f(this.u_Time, this.time[i]);
            gl.uniform2f(this.u_Alpha, cfg.alpha[0], cfg.alpha[1]);
            gl.uniform2f(this.u_Scale, cfg.scale[0], cfg.scale[1]);
            gl.uniform2f(this.u_Speed, cfg.speed.start, cfg.speed.end);
            gl.uniform2f(this.u_StartRotation, cfg.startRotation.min, cfg.startRotation.max);
            gl.uniform2f(this.u_RotationSpeed, cfg.rotationSpeed.min, cfg.rotationSpeed.max);
            gl.uniform1i(this.u_SpawnType, cfg.spawnType);
            gl.uniform4f(this.u_SpawnRect, cfg.spawnRect.x, cfg.spawnRect.y, cfg.spawnRect.w, cfg.spawnRect.h);
            let m = this.matrixs[i];
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


    private static _shader: ParticleShaderTask;

    static get shader(): ParticleShaderTask {
        if (!this._shader) {
            this._shader = new ParticleShaderTask() as any;
        }
        return this._shader;
    }

}