import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("PixiScene")
export class PixiScene extends ModuleScene {

    constructor() {
        super();

        leaf.StateWin.show();

        for (let i = 0; i < 1; i++) {
            this.addParticle(i * 50, i * 50);
        }
    }

    addParticle(x = 0, y = 0) {
        let p = ecs.Entity.create().addComponent(Particle);
        p.entity.parent = this.scene;
        p.resource = "gold";
        p.config = {
            lifeTime: 1, //每个粒子的生命周期
            frequency: 0.001, //发射频率
            allTime: 1, //粒子发射器发射时间
            speedx: 0, //x 方向的速度
            speedy: 0 //y 方向的速度
        }
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
        // attribute float a_Index;
        //  attribute vec2 a_TexCoord;
        let positionData = [];

        let texture = this._texture;

        for (let i = 0; i < count; i++) {
            let index = i * 20;
            positionData[0 + index] = i;
            positionData[1 + index] = 0;
            positionData[2 + index] = 1;
            positionData[3 + index] = texture.startX;
            positionData[4 + index] = texture.endY;

            positionData[5 + index] = i;
            positionData[6 + index] = 0;
            positionData[7 + index] = 0;
            positionData[8 + index] = texture.startX;
            positionData[9 + index] = texture.startY;

            positionData[10 + index] = i;
            positionData[11 + index] = 1;
            positionData[12 + index] = 1;
            positionData[13 + index] = texture.endX;
            positionData[14 + index] = texture.endY;

            positionData[15 + index] = i;
            positionData[16 + index] = 1;
            positionData[17 + index] = 0;
            positionData[18 + index] = texture.endX;
            positionData[19 + index] = texture.startY;
        }

        let gl = leaf.GLCore.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        //切换混合模式
        // BlendModeFunc.changeBlendMode(this.blendMode[i]);
        gl.vertexAttribPointer(this.shader.a_Index, 1, gl.FLOAT, false, $size * 5, 0);
        gl.vertexAttribPointer(this.shader.a_Pisition, 2, gl.FLOAT, false, $size * 5, $size);
        gl.vertexAttribPointer(this.shader.a_TexCoord, 2, gl.FLOAT, false, $size * 5, $size * 3);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData), gl.STATIC_DRAW);
    }

    preRender() {
        if (this._texture && this.bufferDirty) {
            this.refreshBuffer();
        }
        if (!this._texture || !this.config) return;
        let count = Math.ceil((1 / this.config.frequency) * this.config.lifeTime);
        (this.shader).addTask(this.buffer, count, this.texture, this.config, this.entity.transform.worldMatrix, this.blendMode, this._tint);
    }

    preRender2(matrix: ecs.Matrix, alpha: number, shader?: leaf.Shader) {
        if (this._texture && this.bufferDirty) {
            this.refreshBuffer();
        }
        if (!this._texture || !this.config) return;
        matrix.reconcat(this.entity.transform.local);
        let count = Math.ceil((1 / this.config.frequency) * this.config.lifeTime);
        (shader || this.shader).addTask(this.buffer, count, this.texture, this.config, this.entity.transform.worldMatrix, this.blendMode, this._tint);
    }

    onDestroy() {
        this.texture = null;
        if (this._res) this._res.removeCount();
        this._resource = this._res = null;
        this._tint = 0xffffff;
        this.config = null;
        super.onDestroy();
    }
}

export interface ParticleConfig {
    lifeTime: number; //每个粒子的生命周期
    frequency: number; //发射频率
    allTime: number; //粒子发射器发射时间
    speedx: number; //x 方向的速度
    speedy: number; //y 方向的速度
}


export var $size = (new Float32Array([0.0])).BYTES_PER_ELEMENT;

export class ParticleShaderTask extends leaf.Shader {

    a_Index: any;
    a_Pisition: any;
    a_TexCoord: any;

    private u_TexSize: any;
    private u_Sampler: any;
    private u_PMatrix: any;
    private u_VMatrix: any;
    private u_LifeTime: any;
    private u_Frequency: any;
    private u_AllTime: any;
    private u_Speedx: any;
    private u_Speedy: any;
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
            attribute vec2 a_Pisition;
            attribute vec2 a_TexCoord;

             uniform vec2 u_TexSize;
             uniform mat4 u_PMatrix;
             uniform mat3 u_VMatrix;
             uniform float u_LifeTime;
             uniform float u_Frequency;
             uniform float u_AllTime;
             uniform float u_Speedx;
             uniform float u_Speedy;
             uniform float u_Time;

             varying vec2 v_TexCoord;
             varying float v_Index;

             void main(void)
             {
                vec3 pos = u_VMatrix * vec3(a_Pisition.x * u_TexSize.x,a_Pisition.y * u_TexSize.y, 1.0);
                gl_Position = u_PMatrix*vec4(pos,1.0);
                v_TexCoord = a_TexCoord;
                v_Index = a_Index;
             }
             `;

        var fragmentSource = `
             precision mediump float;
             varying vec2 v_TexCoord;
             varying float v_Index;

             uniform sampler2D u_Sampler;

             vec4 getTextureColor(vec2 coord);

             void main(void)
             {
                gl_FragColor = getTextureColor(v_TexCoord);
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

        this.a_Pisition = gl.getAttribLocation(program, "a_Pisition");
        gl.enableVertexAttribArray(this.a_Pisition);

        this.a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
        gl.enableVertexAttribArray(this.a_TexCoord);

        this.u_Sampler = gl.getUniformLocation(program, "u_Sampler");

        this.u_TexSize = gl.getUniformLocation(program, "u_TexSize");
        this.u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
        this.u_VMatrix = gl.getUniformLocation(program, "u_VMatrix");

        this.u_LifeTime = gl.getUniformLocation(program, "u_LifeTime");
        this.u_Frequency = gl.getUniformLocation(program, "u_Frequency");
        this.u_AllTime = gl.getUniformLocation(program, "u_AllTime");
        this.u_Speedx = gl.getUniformLocation(program, "u_Speedx");
        this.u_Speedy = gl.getUniformLocation(program, "u_Speedy");
        this.u_Time = gl.getUniformLocation(program, "u_Time");
    }

    private attributes: WebGLBuffer[] = [];
    private textures: WebGLTexture[] = [];
    private sizes: { width: number, height: number }[] = [];
    private matrixs: ecs.Matrix[] = [];
    private time: number[] = [];
    private configs: ParticleConfig[] = [];
    private count: number[] = [];
    private blendMode: leaf.BlendMode[] = [];

    private indiceData = [];

    addTask(attributes: WebGLBuffer, count: number, texture: leaf.Texture, config: ParticleConfig, matrix: ecs.Matrix, blendMode: leaf.BlendMode, tint: number) {
        this.attributes.push(attributes);
        this.textures.push(texture.texture);
        this.configs.push(config);
        this.sizes.push({ width: texture.sourceWidth, height: texture.sourceHeight });
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

            //必须绑定 buffer 并且制定 buffer 的内容分配，之前测试的时候如果没有重新绑定 buffer 是不能正确设置 buffer 里面的值的。
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attributes[i]);
            gl.vertexAttribPointer(this.a_Index, 1, gl.FLOAT, false, $size * 5, 0);
            gl.vertexAttribPointer(this.a_Pisition, 2, gl.FLOAT, false, $size * 5, $size);
            gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, $size * 5, $size * 3);
            //切换混合模式
            // BlendModeFunc.changeBlendMode(this.blendMode[i]);
            // gl.vertexAttribPointer(_this.a_Index, 1, gl.FLOAT, false, $size * 3, 0);
            // gl.vertexAttribPointer(_this.a_TexCoord, 2, gl.FLOAT, false, $size * 3, $size);
            // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);

            let cfg = this.configs[i];
            gl.uniform1f(this.u_LifeTime, cfg.lifeTime);
            gl.uniform1f(this.u_Frequency, cfg.frequency);
            gl.uniform1f(this.u_AllTime, cfg.allTime);
            gl.uniform1f(this.u_Speedx, cfg.speedx);
            gl.uniform1f(this.u_Speedy, cfg.speedy);
            gl.uniform1f(this.u_Time, this.time[i]);
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