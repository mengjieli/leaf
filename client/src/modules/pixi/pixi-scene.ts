import { ModuleScene } from "../../utils/ui/module-scene";

@orange.autoload("PixiScene")
export class PixiScene extends ModuleScene {

    constructor() {
        super();

        let bg = ecs.Entity.create().addComponent(leaf.Bitmap);
        // bg.resource = "airbg_jpg";
        bg.texture = leaf.PointTexture.getTexture(0x000000);
        bg.transform.scaleX = leaf.getStageWidth();
        bg.transform.scaleY = leaf.getStageHeight();
        bg.parent = this.scene;

        leaf.StateWin.show();

        for (let i = 0; i < 0; i++) {
            let bm = ecs.Entity.create().addComponent(leaf.Bitmap);
            bm.resource = "snow_png";
            bm.parent = this.scene;
            bm.transform.scaleX = bm.transform.scaleY = 0.01;
            bm.transform.x = Math.random() * leaf.getStageWidth();
            bm.transform.y = Math.random() * leaf.getStageHeight() - 300;
            // bm.blendMode = leaf.BlendMode.ADD;
        }

        this.addSkyStar();


        // for (let i = 0; i < 1; i++) {
        //     this.addParticle(0, 0);
        //     // this.addParticle1(0, 0);
        // }
        ecs.Entity.create().addComponent(FallStar).parent = this.scene;

    }

    addSkyStar() {
        let sc = 0.1 + 0.1 * Math.random();
        let alpha = 0.1 + 0.5 * Math.random();
        let cfg = {
            "alpha": {
                "start": alpha,
                "end": 0
            },
            "scale": {
                "start": sc,
                "end": sc
            },
            "color": {
                "start": "ffffff",
                "end": "ffffff"
            },
            "speed": {
                "start": 0,
                "end": 0
            },
            "startRotation": {
                "min": 0,
                "max": 0
            },
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 100,
                "max": 100
            },
            "frequency": 1,
            "spawnType": "rect",
            "spawnRect": {
                "x": 0,
                "y": 0,
                "w": leaf.getStageWidth(),
                "h": leaf.getStageHeight()
            },
            max: 30000
        };                  
        let p = ecs.Entity.create().addComponent(leaf.GpuParticle);
        p.config = cfg;
        p.resource = "particle_png";
        p.entity.parent = this.scene;
    }



    addParticle1(x = 0, y = 0) {
        let cfg = {
            "alpha": {
                "start": 1,
                "end": 0.3
            },
            "scale": {
                "start": 0.5,
                "end": 0.1
            },
            "color": {
                "start": "8888aa",
                "end": "ff0000"
            },
            "speed": {
                "start": -200,
                "end": 0
            },
            "startRotation": {
                "min": 160,
                "max": 200
            },
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 0.3,
                "max": 0.75
            },
            "frequency": 0.1,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 10
            },
            max: 30000
        };
        let p = ecs.Entity.create().addComponent(Particle, cfg);
        // let p = ecs.Entity.create().addComponent(leaf.GpuParticle);
        // p.config = cfg;
        p.entity.parent = this.scene;
        p.resource = "rain_png";
        p.transform.x = 600;
        p.transform.y = 600;
        p.transform.angle = 45 * Math.PI / 180;
        p.addComponent(tween.Tween, p.transform, 3000, {
            alpha: 0.3,
            bezierPlugin:
                [
                    {
                        x: 100, y: 0
                    },
                    {
                        x: 0, y: 0
                    }
                ]
        }, tween.EaseFunction.SineEaseIn);
        // p.blendMode = leaf.BlendMode.ADD;
    }


    close() {
        super.close();
    }

}

export class FallStar extends ecs.Component {

    init() {
    }

    update() {
        if (Math.random() < 0.01) {
            this.addParticle(320 + 320 * Math.random(), 150 * Math.random());
        }
    }

    addParticle(x = 0, y = 0) {
        let time = 2000 + 4000 * Math.random();
        let color = (100 + ~~(156 * Math.random())) << 16 | (100 + ~~(156 * Math.random())) << 8 | (100 + ~~(156 * Math.random()));
        let cfg = {
            "alpha": {
                "start": 0.2 + 0.1 * Math.random(),
                "end": 0.1 + 0.1 * Math.random()
            },
            "scale": {
                "start": 0.5 + 0.5 * Math.random(),
                "end": 0
            },
            "color": {
                "start": color,
                "end": color
            },
            "speed": {
                "start": 0,
                "end": 0
            },
            "startRotation": {
                "min": 180,
                "max": 180
            },
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 2,
                "max": 3
            },
            "frequency": 0.01 - 0.005 * Math.random(),
            "spawnType": "circle",
            "emmitLife": time,
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 10
            },
            max: 30000
        };
        let p = ecs.Entity.create().addComponent(Particle, cfg);
        // let p = ecs.Entity.create().addComponent(leaf.GpuParticle);
        // p.config = cfg;
        p.entity.parent = this.entity;
        p.resource = "rain_png";
        p.transform.x = x;
        p.transform.y = y;
        let vx = -0.1 - 0.2 * Math.random();
        let vy = 0.05 + 0.015 * Math.random();
        let g = 0.00001 + 0.00001 * Math.random();
        p.transform.angle = Math.atan2(vy, vx);
        p.blendMode = leaf.BlendMode.ADD;
        let lastX = p.transform.x;
        let lastY = p.transform.y;
        let t = p.addComponent(tween.Tween, p.transform, time, {
            alpha: 0.3,
            scaleX: 0.5,
            scaleY: 0.5,
            vPlugin: {
                vx: vx,
                vy: vy,
                ay: g
            }

        });
        t.onUpdate = () => {
            let x = p.transform.x;
            let y = p.transform.y;
            p.transform.angle = Math.atan2(y - lastY, x - lastX);
            lastX = x;
            lastY = y;
        };
    }

}

export class Particle extends leaf.Render {

    shader = leaf.NormalShaderTask.shader;

    private _config: ParticleConfig;
    private configExt: ParticleConfigExtend;

    private head: ParticleItem;
    private end: ParticleItem;
    private lastTime: number;
    private nowTime: number;

    count: number;
    countLabel: leaf.Label;

    get config(): ParticleConfig {
        return this._config;
    }

    init(config: ParticleConfig) {
        this._config = config;
        this.lastTime = 0;
        this.nowTime = 0;
        this.count = 0;

        this.configExt = {
            colors: []
        };
        if (config.color) {
            if (config.color.start != null) {
                let start = typeof config.color.start == "string" ? ~~("0x" + config.color.start) : config.color.start;
                let end = typeof config.color.end == "string" ? ~~("0x" + config.color.end) : config.color.end;
                this.configExt.colors = [{
                    startR: (start >> 16), endR: (end >> 16),
                    startG: (start >> 8 & 0xFF), endG: (end >> 8 & 0xFF),
                    startB: (start & 0xFF), endB: (end & 0xFF),
                    startTime: 0, endTime: config.lifetime.max
                }];
            } else {

            }
        } else {
            this.configExt.colors = [{ startR: 1, endR: 1, startG: 1, endG: 1, startB: 1, endB: 1, startTime: 0, endTime: config.lifetime.max }];
        }

        this.countLabel = ecs.Entity.create().addComponent(leaf.Label);
        this.countLabel.fontColor = 0x00ff00;
        // this.countLabel.parent = this.entity;
    }

    /**
     * @internal
     */
    private _texture: leaf.Texture;

    private _resource: string;
    private _res: leaf.Resource<leaf.Texture>;

    get texture(): leaf.Texture {
        return this._texture;
    }

    set texture(val: leaf.Texture) {
        this._texture = val;
    }

    get resource(): string {
        return this._resource;
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

    preRender() {
        if (!this._texture) return;
        (this.shader).addTask(this.texture, this.entity.transform.worldMatrix, this.entity.transform.worldAlpha, this.blendMode, 0xffffff);
    }

    preRender2(matrix: ecs.Matrix, alpha: number, shader?: leaf.Shader) {
        if (!this._texture) return;
        matrix.reconcat(this.entity.transform.local);
        let allAlpha = alpha * this.entity.transform.alpha;
        let cfg = this.config;
        if (this.head) {
            for (let node = this.head; node; node = node.next) {
                if (!node.startMatrix) {
                    node.startAlpha = allAlpha;
                    node.startMatrix = ecs.Matrix.create();
                    node.startMatrix.setTo(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                }
                let startMatrix = node.startMatrix;
                startMatrix.save();
                let local = node.matrix;
                local.identity();
                let tw = this.texture.sourceWidth;
                let th = this.texture.sourceHeight;
                local.translate(-tw * 0.5, -th * 0.5);
                local.scale(node.scale, node.scale);
                let r = node.rotation;
                if (cfg.spawnType === EMSpawnType.CIRCLE) {
                    r += node.speedRotation;
                }
                local.rotate(r);
                local.translate(node.x, node.y);
                startMatrix.reconcat(local);
                (shader || this.shader).addTask(this.texture, startMatrix, node.startAlpha * node.alpha, this.blendMode, node.color);
                startMatrix.restore();
            }
        }
        // (shader || this.shader).addTask(this.texture, matrix, alpha * this.entity.transform.alpha, this.blendMode, this._tint);
    }

    update(dt: number) {
        let lastTime = this.lastTime;
        this.nowTime += dt;
        let sendTimeGap = this.config.frequency * 1000;
        let lastN = ~~(lastTime / sendTimeGap);
        let nowN = ~~(this.nowTime / sendTimeGap);
        let cfg = this._config;
        let ext = this.configExt;
        let pool = Particle.pool;
        for (let i = lastN; (!cfg.emmitLife || cfg.emmitLife >= this.nowTime) && lastN <= nowN && i <= nowN && this.count < cfg.max; i++) {
            let startColor = typeof cfg.color.start == "string" ? ~~("0x" + cfg.color.start) : cfg.color.start;
            let endColor = typeof cfg.color.end == "string" ? ~~("0x" + cfg.color.end) : cfg.color.end;
            let lifeTime = cfg.lifetime.min + (cfg.lifetime.max - cfg.lifetime.min) * Math.random();
            let p = pool.length ? pool.pop() : {} as any;
            p.lifeTime = lifeTime;
            p.time = 0;
            p.next = null;
            p.startMatrix = null;
            p.matrix = ecs.Matrix.create();
            p.x = 0;
            p.y = 0;
            p.rotation = 0;
            p.startAlpha = 1;
            p.startRotation = (cfg.startRotation.min + (cfg.startRotation.max - cfg.startRotation.min) * Math.random()) * Math.PI / 180.0;
            p.rotationSpeed = cfg.rotationSpeed.min;
            p.speedRotation = 0;
            p.scale = 1;
            p.color = 0xffffff;
            p.colors = [{ r: startColor >> 16, g: startColor >> 8 & 0xFF, b: startColor & 0xFF, time: 0 },
            { r: endColor >> 16, g: endColor >> 8 & 0xFF, b: endColor & 0xFF, time: lifeTime }];
            p.alpha = 0;
            // p.startRotation = 90 * Math.PI / 180;
            if (!this.head) this.head = p;
            if (this.end) this.end.next = p;
            this.end = p;
            this.count++;
            this.lastTime = (i + 1) * sendTimeGap;
        }
        for (let node = this.head, last = null; node; node = node.next) {
            let t = node.time = Math.min(node.time + dt * 0.001, node.lifeTime);
            if (node.time >= node.lifeTime) {
                if (node == this.head) {
                    this.head = null;
                }
                if (node == this.end) {
                    this.end = last;
                }
                if (last && last.next == node) last.next = null;
                this.count--;
                // pool.push(node);
                continue;
            }
            if (last && !last.next) last.next = node;
            last = node;
            if (!this.head) this.head = node;
            let life = node.lifeTime;
            let p = t / life;
            let r = node.startRotation;
            let len = cfg.speed.start * t + 0.5 * (cfg.speed.end - cfg.speed.start) * t * t / life;
            let x = len * Math.cos(r) + 0.5 * (cfg.acceleration ? cfg.acceleration.x : 0) * t * t;
            let y = len * Math.sin(r) + 0.5 * (cfg.acceleration ? cfg.acceleration.y : 0) * t * t;
            node.rotation = (cfg.rotationSpeed.min * t + 0.5 * (cfg.rotationSpeed.max - cfg.rotationSpeed.min) * t * t / life) * Math.PI / 180.0;
            node.x = x;
            node.y = y;
            node.scale = cfg.scale.start + (cfg.scale.end - cfg.scale.start) * p;
            let speed = cfg.speed.start + (cfg.speed.end - cfg.speed.start) * p;
            let speedX = speed * Math.cos(r) + (cfg.acceleration ? cfg.acceleration.x : 0) * t;
            let speedY = speed * Math.sin(r) + (cfg.acceleration ? cfg.acceleration.y : 0) * t;
            node.speedRotation = Math.atan2(speedY, speedX);
            node.alpha = cfg.alpha.start + (cfg.alpha.end - cfg.alpha.start) * p;
            for (let i = 0; i < ext.colors.length; i++) {
                let c = ext.colors[i];
                if (t >= c.startTime && t <= c.endTime) {
                    node.color = (c.startR + (c.endR - c.startR) * (t - c.startTime) / (c.endTime - c.startTime)) << 16
                        | (c.startG + (c.endG - c.startG) * (t - c.startTime) / (c.endTime - c.startTime)) << 8
                        | (c.startB + (c.endB - c.startB) * (t - c.startTime) / (c.endTime - c.startTime));
                }
            }
        }
        this.countLabel.text = this.count + "";
    }

    onDestroy() {
        this._config = null;
        if (this.head) {
            for (let node = this.head; node; node = node.next) {
                node.matrix && ecs.Matrix.release(node.matrix);
                node.matrix = null;
            }
        }
        this.head = null;
        this.end = null;
    }

    static pool: ParticleItem[] = [];
}

export interface ParticleItem {
    lifeTime: number; //总生命
    time: number;
    next: ParticleItem;
    startMatrix: ecs.Matrix;
    matrix: ecs.Matrix;
    x: number;
    y: number;
    speedRotation: number;
    scale: number;
    rotation: number;
    color: number;
    alpha: number;
    rotationSpeed: number;
    startAlpha: number;
    startRotation: number;
}

var spawnTypes = {
    "rect": 0,
    "ring": 1,
    "circle": 2
}

export enum EMSpawnType {
    RECT = "rect",
    RING = "ring",
    CIRCLE = "circle"
}

export interface ParticleConfig {
    emmitLife: number; //发射器生命
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
    max: number;
    blendMode?: leaf.BlendMode;
}

export interface ParticleConfigExtend {
    colors: { startR: number, endR: number, startG: number, endG: number, startB: number, endB: number, startTime: number, endTime: number }[];
}

var cc = window.requestAnimationFrame;

window.requestAnimationFrame = function () {
    return cc.apply(null, arguments);
}