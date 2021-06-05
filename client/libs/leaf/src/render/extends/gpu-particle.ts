namespace leaf {

    export class GpuParticle extends leaf.Render {

        shader = GpuParticleShaderTask.shader;
    
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
            let count = Math.ceil((1 / this.config.frequency) * this.config.lifetime.max);
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
            let count = Math.ceil((1 / this.config.frequency) * this.config.lifetime.max);
            (this.shader).addTask(this.time * 0.001, this.buffer, count, this.texture, this.config, this.entity.transform.worldMatrix, this.blendMode, this._tint);
        }
    
        preRender2(matrix: ecs.Matrix, alpha: number, shader?: leaf.Shader) {
            if (this._texture && this.bufferDirty) {
                this.refreshBuffer();
            }
            if (!this._texture || !this.config) return;
            matrix.reconcat(this.entity.transform.local);
            let count = Math.ceil((1 / this.config.frequency) * this.config.lifetime.max);
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
    
    export var spawnTypes = {
        "rect": 0,
        "ring": 1,
        "circle": 2
    }
    
    
    export interface ParticleConfig {
        lifetime: {
            min: number,
            max: number
        }; //每个粒子的生命周期
        frequency: number; //发射频率
        alpha: {
            start: number,
            end: number
        }; //alpha 变化
        scale: {
            start: number,
            end: number
        };
        speed: {
            start: number,
            end: number
        };
        acceleration?: {
            x: number,
            y: number
        };
        startRotation: {
            min: number,
            max: number
        };
        rotationSpeed: {
            min: number,
            max: number
        };
        spawnType: string;
        spawnRect?: { x: number, y: number, w: number, h: number };
        spawnCircle?: { x: number, y: number, r: number, minR?: number };
        color?: { start: number | string, end: number | string };
    }

}