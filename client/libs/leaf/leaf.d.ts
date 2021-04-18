declare namespace leaf {
    var debug: boolean;
    var world: ecs.World;
    var runInfo: {
        frame: number;
        runTime: number;
        drawCall: number;
        drawCount: number;
        logicTime: number;
        renderTime: number;
        preRenderTime: number;
        glRenderTime: number;
        fps: number;
        frameTime: number;
        frameLogicTime: number;
        frameRenderTime: number;
        framePreRenderTime: number;
        frameGlRenderTime: number;
        frameDrawCall: number;
        frameDrawCount: number;
    };
    /**
     * 暂停
     */
    function pause(): void;
    /**
     * 继续播放
     */
    function play(): void;
    function getStageWidth(): number;
    function getStageHeight(): number;
    var fixWidth: number;
    /**
     * 初始化
     * @returns
     */
    function init(): ecs.World;
}
declare namespace leaf {
    enum BlendMode {
        NONE = -1,
        NORMAL = 0,
        ADD = 1,
        OVERRIDE = 10
    }
    class BlendModeFunc {
        private static blendMode;
        static changeBlendMode(mode: number): void;
    }
}
declare namespace leaf {
    class GLCore {
        static gl: WebGLRenderingContext;
        static width: number;
        static height: number;
        static textureId: number;
        static readonly scale: number;
        static init(): WebGLRenderingContext;
        /**
        * 这里并没有加 image 对应 texture 的对应表，也就是说调用两次 createTexture，传同一个 image，会创建两个 texture，还可以进一步优化。
        * @param image
        * @returns {WebGLTexture}
        */
        static createTexture(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageData): WebGLTexture;
        static updateTexture(texture: WebGLTexture, image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageData): void;
    }
}
declare namespace leaf {
    class RectMask extends ecs.Component {
        x: number;
        y: number;
        width: number;
        height: number;
        init(x?: number, y?: number, w?: number, h?: number): void;
    }
}
declare namespace leaf {
}
declare namespace leaf {
}
declare namespace leaf {
    class Render extends ecs.Component {
        readonly shader: Shader;
        static allowMultiply: boolean;
        blendMode: BlendMode;
        renderChildren: boolean;
        onDestroy(): void;
        preRender(): void;
        preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader): void;
        readonly width: number;
        readonly height: number;
    }
}
declare namespace leaf {
    class BatchRender extends Render {
        shader: BatchShaderTask;
        renderChildren: boolean;
        private matrix;
        preRender2(matrix: ecs.Matrix4, alpha: number): void;
        refresh(): void;
        preRenderEntity(entity: ecs.Entity, matrix: ecs.Matrix, alpha: number): void;
        projectionMatrix: Float32Array;
        textures: WebGLTexture[][];
        count: any[];
        positionData: any[];
        blendModes: any[];
        tints: any[];
        buffers: WebGLBuffer[];
        private reset;
        onDestroy(): void;
    }
}
declare namespace leaf {
    class Bitmap extends Render {
        shader: NormalShaderTask;
        private _resource;
        private _res;
        texture: Texture;
        resource: string;
        private _tint;
        tint: number;
        readonly width: number;
        readonly height: number;
        preRender(): void;
        preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader): void;
        onDestroy(): void;
    }
}
declare namespace leaf {
    class Cube extends Render {
        shader: Normal3DTask;
        size: number;
        color: number;
        preRender(): void;
        preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader): void;
        onDestroy(): void;
    }
}
declare namespace leaf {
    class Label extends Render {
        shader: NormalShaderTask;
        private _text;
        text: string;
        private _fontColor;
        fontColor: number;
        private _fontFamily;
        fontFamily: string;
        private _fontSize;
        fontSize: number;
        private _bold;
        bold: boolean;
        private _italic;
        italic: boolean;
        private _lineSpacing;
        lineSpacing: number;
        private _textWidth;
        private _textHeight;
        preRender(): void;
        preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader): void;
        private preRenderReal;
        readonly width: number;
        readonly height: number;
        readonly textWidth: number;
        readonly textHeight: number;
        onDestroy(): void;
        static useScaleFont: boolean;
    }
}
declare namespace leaf {
    class ScrollBitmap extends Render {
        shader: ScrollerShaderTask;
        private _resource;
        private _res;
        texture: Texture;
        resource: string;
        private _tint;
        tint: number;
        scrollX: number;
        scrollY: number;
        readonly width: number;
        readonly height: number;
        preRender(): void;
        preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader): void;
        onDestroy(): void;
    }
}
declare namespace leaf {
    class Triangle extends Render {
        shader: Normal3DTask;
        point1: {
            x: number;
            y: number;
            z: number;
        };
        point2: {
            x: number;
            y: number;
            z: number;
        };
        point3: {
            x: number;
            y: number;
            z: number;
        };
        color: number;
        preRender(): void;
        preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader): void;
        onDestroy(): void;
    }
}
declare namespace leaf {
    class RecordComponent extends ecs.Component {
        recordId: number;
        init(): void;
        checkRecord(): void;
        track(data?: any): void;
        recordReady(call: Function): void;
        isReady(): boolean;
    }
}
declare namespace leaf {
    class RecordSystem extends ecs.EntitySystem {
        frame: number;
        private _newId;
        readonly newId: number;
        private isRecording;
        private records;
        private replayRecords;
        private isReplaying;
        private calls;
        startRecord(): void;
        startReplay(replayRecords: any): void;
        update(): void;
        track(id: number, data?: any): void;
        recordReady(id: number): number;
        addCallAt(call: Function, frame: number): void;
        getRecord(id: number): Record;
    }
    interface Record {
        id: number;
        frame: number;
        data: any;
    }
}
declare namespace leaf {
    class Loader {
        resources: {
            [index: string]: LoaderResource;
        };
        private curResource;
        private firstName;
        private lastName;
        private onComplete;
        init(): void;
        add(name: string, url: string, itemType: LoaderItemType): this;
        load(onComplete?: (loader: Loader, resources: {
            [index: string]: LoaderResource;
        }) => any): void;
        private loadCurrent;
        private loadCurrentComplete;
    }
    class LoaderResource extends RecordComponent {
        name: string;
        url: string;
        itemType: LoaderItemType;
        private _data;
        next: string;
        private _xhr;
        onComplete: ecs.Broadcast<void>;
        isComplete: boolean;
        load(): void;
        readonly data: any;
        updateProgress(event: any): void;
        loadComplete: () => void;
        checkRecord(): void;
        onReadyStateChange: () => void;
        getXHR(): any;
    }
    enum LoaderType {
        TEXT = 1,
        IMAGE = 2
    }
    interface LoaderItemType {
        loadType: LoaderType;
        xhrType?: string;
        method?: string;
        sendData?: any;
    }
}
declare namespace leaf {
    class Res {
        private static resources;
        private static singleTexutres;
        private static texts;
        private static jsons;
        private static spriteSheets;
        private static loading;
        private static weakSet;
        static getRes<T>(name: string): Resource<T>;
        static clearUnsedTextures(): void;
        static getAliveResources(): any[];
        static addRes(type: EMResourceType, name: string, url: string): any;
        static loadTexture(name: string, url: string): XPromise<Resource<Texture>>;
        static loadJSON(name: string, url: string): XPromise<any>;
        static loadText(name: string, url: string): XPromise<any>;
        static loadResources(url?: string, resourceRoot?: string): XPromise<{}>;
        static loadSpriteSheet(name: string, url: string): XPromise<SpriteSheetResource>;
    }
    enum EMResourceType {
        TEXTURE = 1,
        SPRITE_SHEET = 2,
        SPRITE_SHEET_FRAME = 3,
        TEXT = 4,
        JSON = 5
    }
    class Resource<T> {
        type: EMResourceType;
        name: string;
        url: string;
        id: number;
        data: T;
        texture_id: string;
        texture_url: string;
        readonly count: number;
        usedCount: number;
        hasLoaded: boolean;
        isLoading: boolean;
        onLoadCompleteCalls: ((res: Resource<T>) => any)[];
        resource: any;
        addCount(): void;
        removeCount(): void;
        load(): XPromise<Resource<T>>;
    }
    class SpriteSheetFrameResource extends Resource<Texture> {
        id: number;
        spriteSheet: SpriteSheetResource;
        addCount(): void;
        removeCount(): void;
    }
    class SpriteSheetResource extends Resource<WebGLTexture> {
        list: SpriteSheetFrameResource[];
    }
}
declare namespace leaf {
    abstract class Shader {
        program: WebGLProgram;
        buffer: WebGLBuffer;
        indexBuffer: WebGLBuffer;
        /**
         * 创建应用程序。创建应用程序步骤如下：
         * 1. 创建应用程序，gl.createProgram()
         * 2. 绑定着色器，至少要绑定顶点着色器和片段着色器，gl.attachShader(program,shader)
         * 3. 链接程序，gl.linkProgram(program)
         *
         * 其它：
         * 在着色器真正起作用前还需要调用 gl.useProgram(program)
         * gl.getProgramParameter(program,status) 可以查询程序状态。
         * gl.getProgramInfoLog(program) 可以查询程序日志。
         * 如果着色器链接失败，可以调用 gl.deleteProgram(program) 删除程序。
         *
         * @param vertexShader 顶点着色器
         * @param fragmentShader 片段着色器
         * @returns {WebGLProgram}
         */
        createWebGLProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram;
        /**
         * 创建着色器。创建着色器步骤如下：
         * 1. 创建着色器，gl.createShader(shaderType)
         * 2. 指定着色器程序，gl.shaderSource(shader,source)
         * 3. 编译着色器，gl.compileShader(shader);
         *
         * 其它补充：
         * gl.getShaderParameter(shader,status) 可以查询着色器状态。
         * gl.getShaderInfoLog(shader) 可以查询着色器日志。
         * 如果编译着色器失败，可以调用 gl.deleteShader(shader) 删除着色器。
         *
         * @param type 着色器类型 gl.VERTEX_SHADER 或 gl.FRAGMENT_SHADER
         * @param source 着色器程序
         * @returns {WebGLShader}
         */
        createShader(type: number, source: string): WebGLShader;
        abstract addTask(...args: any[]): any;
        startNewTask(): void;
        abstract render(): any;
    }
}
declare namespace leaf {
    var $size: number;
    class BatchShaderTask extends Shader {
        private a_Position;
        private a_TexCoord;
        private a_Alpha;
        private a_Sampler;
        private u_PMatrix;
        private u_GMatrix;
        private u_Samplers;
        private u_Color;
        constructor();
        /**
         * 初始化作色器、program
         * 1. 初始化 shader
         * 2. 初始化 program
         * 目前没有加 filter (滤镜) 的功能，后续可以继续扩展这两个 shader
         * @param gl
         */
        private initProgram;
        private projectionMatrix;
        private indiceData;
        /**
         * 初始化作色器固定变量 和 获取作色器中得变量
         * 主要初始化投影矩阵，投影矩阵不用每次调用都初始化，只要设置一次即可，除非舞台 (Stage) 的大小改变 (glViewPort)
         * 获取一些变量。
         * @param gl
         * @param width
         * @param height
         */
        private initAttriLocation;
        curBatch: BatchRender;
        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode, tint: number): void;
        batchs: BatchRender[];
        startNewTask(): void;
        /**
         * 渲染
         */
        render(): void;
        renderBatch(batch: any): void;
        private static _shader;
        static readonly shader: BatchShaderTask;
    }
}
declare namespace leaf {
    var $size: number;
    class CustomerShaderTask extends Shader {
        private a_Position;
        private a_TexCoord;
        private a_Alpha;
        private a_Sampler;
        private u_PMatrix;
        private u_Samplers;
        private u_Color;
        gl: WebGLRenderingContext;
        constructor(vertexSource: string, fragmentSource: string);
        /**
         * 初始化作色器、program
         * 1. 初始化 shader
         * 2. 初始化 program
         * 目前没有加 filter (滤镜) 的功能，后续可以继续扩展这两个 shader
         * @param gl
         */
        private initProgram;
        private projectionMatrix;
        /**
         * 初始化作色器固定变量 和 获取作色器中得变量
         * 主要初始化投影矩阵，投影矩阵不用每次调用都初始化，只要设置一次即可，除非舞台 (Stage) 的大小改变 (glViewPort)
         * 获取一些变量。
         * @param gl
         * @param width
         * @param height
         */
        private initAttriLocation;
        private textures;
        private count;
        private positionData;
        private blendMode;
        private indiceData;
        private tints;
        private newAddNew;
        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode, tint: number): void;
        renderCounts: number[];
        lastRenderCount: number;
        renderIndex: number;
        startNewTask(): void;
        /**
         * 渲染
         */
        render(): void;
        reset(): void;
    }
}
declare namespace leaf {
    class Normal3DTask extends Shader {
        private a_position;
        private a_color;
        private a_normal;
        private u_mvp;
        private u_model;
        private u_normalMatrix;
        private u_lightColor;
        private u_lightDirection;
        private u_ambientLight;
        private u_pointLightColor;
        private u_pointLightPosition;
        constructor();
        initProgram(): void;
        static camera: ecs.Matrix4;
        initAttriLocation(): void;
        mvp: number[][];
        model: number[][];
        normalMatrix: number[][];
        position: number[][];
        indexs: number[][];
        counts: number[];
        index: number;
        addTask(matrix: ecs.Matrix4, positions: number[], indexs: number[]): void;
        static diffuseColor: number[];
        static diffuseDirection: number[];
        static ambientColor: number[];
        static pointColor: number[];
        static pointPosition: number[];
        render(): void;
        private static _shader;
        static readonly shader: Normal3DTask;
    }
}
declare namespace leaf {
    var $size: number;
    class NormalShaderTask extends Shader {
        private a_Position;
        private a_TexCoord;
        private a_Alpha;
        private a_Sampler;
        private u_PMatrix;
        private u_Samplers;
        private u_Color;
        constructor();
        /**
         * 初始化作色器、program
         * 1. 初始化 shader
         * 2. 初始化 program
         * 目前没有加 filter (滤镜) 的功能，后续可以继续扩展这两个 shader
         * @param gl
         */
        private initProgram;
        private projectionMatrix;
        /**
         * 初始化作色器固定变量 和 获取作色器中得变量
         * 主要初始化投影矩阵，投影矩阵不用每次调用都初始化，只要设置一次即可，除非舞台 (Stage) 的大小改变 (glViewPort)
         * 获取一些变量。
         * @param gl
         * @param width
         * @param height
         */
        private initAttriLocation;
        private textures;
        private count;
        private positionData;
        private blendMode;
        private indiceData;
        private tints;
        private newAddNew;
        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode, tint: number): void;
        renderCounts: number[];
        lastRenderCount: number;
        renderIndex: number;
        startNewTask(): void;
        /**
         * 渲染
         */
        render(): void;
        reset(): void;
        private static _shader;
        static readonly shader: NormalShaderTask;
    }
}
declare namespace leaf {
    var $size: number;
    class ScrollerShaderTask extends Shader {
        private a_Position;
        private a_TexCoord;
        private a_Alpha;
        private a_Sampler;
        private u_PMatrix;
        private u_Samplers;
        private u_Color;
        private u_offx;
        private u_offy;
        constructor();
        /**
         * 初始化作色器、program
         * 1. 初始化 shader
         * 2. 初始化 program
         * 目前没有加 filter (滤镜) 的功能，后续可以继续扩展这两个 shader
         * @param gl
         */
        private initProgram;
        private projectionMatrix;
        /**
         * 初始化作色器固定变量 和 获取作色器中得变量
         * 主要初始化投影矩阵，投影矩阵不用每次调用都初始化，只要设置一次即可，除非舞台 (Stage) 的大小改变 (glViewPort)
         * 获取一些变量。
         * @param gl
         * @param width
         * @param height
         */
        private initAttriLocation;
        private offxs;
        private offys;
        private textures;
        private count;
        private positionData;
        private blendMode;
        private indiceData;
        private tints;
        private newAddNew;
        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode, tint: number, offx: number, offy: number): void;
        renderCounts: number[];
        lastRenderCount: number;
        renderIndex: number;
        startNewTask(): void;
        /**
         * 渲染
         */
        render(): void;
        reset(): void;
        private static _shader;
        static readonly shader: ScrollerShaderTask;
    }
}
declare namespace leaf {
    class DrawTexture {
        private canvas;
        protected context2d: CanvasRenderingContext2D;
        readonly texture: WebGLTexture;
        readonly width: number;
        readonly height: number;
        constructor(width: number, height: number);
        update(): void;
    }
}
declare namespace leaf {
    class PointTexture extends DrawTexture {
        getColor(color: number): Texture;
        readonly isFull: boolean;
        static getTexture(color: number): Texture;
    }
}
declare namespace leaf {
    class RectTexture extends DrawTexture {
        getColor(colors: number[][], id: string): any;
        readonly isFull: boolean;
        static getTexture(colors: number[][], id?: string): any;
        /**
         * 格式化颜色，例如
         * 16711680,65280
         * 000
         * 010
         * 000
         * 第一排定义颜色，以,(英文逗号)分割
         * 下面是颜色矩阵，01代表颜色序列
         * @param str
         */
        static formatColors(str: string): number[][];
    }
}
declare namespace leaf {
    /**
     * 单个文字信息比如字母 a 就对应一个 TextAtlasInfo，字母 b 又是另外一个 TextAtlasInfo
     */
    class TextAtlasInfo {
        constructor(texture: Texture, x: number, y: number, width: number, height: number, char: string);
        private _char;
        readonly char: string;
        private _texture;
        readonly texture: Texture;
        private _x;
        readonly x: number;
        private _y;
        readonly y: number;
        private _width;
        readonly width: number;
        private _height;
        readonly height: number;
    }
}
declare namespace leaf {
    /**
     * 文本内容管理(主要是文本纹理管理)
     * 一个 TextAtlas 对应一种 fontColor、fontFamily、fontSize、bold、italic，这些值只要一个改变就会创建不同的 TextAtlas
     * 文字在 Texture 是按照从上到下、从左到右一个个拍的，每一行文字的纹理高度取最高的那个，然后紧接着排下一行文字纹理。
     * 一张文字纹理的大小目前是 512 x 512，排满后会申请一个新的纹理来存储新的文字纹理。
     * 如果想看当前有哪些文字纹理的话可以打开 addNewTexture() 里的 document.body.appendChild(this.canvas); 就可以了。
     */
    class TextAtlas {
        constructor(fontColor: String, fontFamily: string, fontSize: number, bold: boolean, italic: boolean);
        private _fontColor;
        readonly fontColor: String;
        private _fontFamily;
        readonly fontFamily: string;
        private _fontSize;
        readonly fontSize: number;
        private _bold;
        readonly bold: boolean;
        private _italic;
        readonly italic: boolean;
        private size;
        private charHeight;
        private canvas;
        private context2d;
        private texture;
        private startX;
        private startY;
        private dirtyTextures;
        private dirtyTextureIds;
        private dirtyCanvas;
        private lineHeight;
        private dirty;
        /**
         * 添加一张新的纹理用于存储文字纹理
         */
        private addNewTexture;
        private chars;
        /**
         * 获取文字信息
         * 有新的文字信息后不会立马更新对应的 Texture，会在第一个 Canvas 绘制(render)时更新
         * @param char
         * @param realTime
         * @returns {any}
         */
        getChar(char: string, realTime: boolean): TextAtlasInfo;
        /**
         * 更新对应的纹理
         */
        update(): void;
        private static updateList;
        private static atlases;
        static getChar(fontColor: String, fontFamily: string, fontSize: number, bold: boolean, italic: boolean, char: string, realTime: boolean): TextAtlasInfo;
    }
}
declare namespace leaf {
    class Texture {
        private static id;
        constructor(texture: WebGLTexture, width: number, height: number, sourceX?: number, sourceY?: number, sourceWidth?: number, sourceHeight?: number);
        private _id;
        readonly id: number;
        private _texture;
        texture: WebGLTexture;
        private _width;
        width: number;
        private _height;
        height: number;
        private _sourceX;
        sourceX: number;
        private _sourceY;
        sourceY: number;
        private _sourceWidth;
        sourceWidth: number;
        private _sourceHeight;
        sourceHeight: number;
        private _startX;
        readonly startX: number;
        private _startY;
        readonly startY: number;
        private _endX;
        readonly endX: number;
        private _endY;
        readonly endY: number;
        destroy(): void;
    }
}
declare namespace leaf {
    class TouchComponent extends ecs.Component {
        static allowMultiply: boolean;
        readonly onTouchStart: ecs.Broadcast<TouchEvent>;
        readonly onTouchMove: ecs.Broadcast<TouchEvent>;
        readonly onTouchEnd: ecs.Broadcast<TouchEvent>;
        touchEnabled: boolean;
        touchChildrenEnabled: boolean;
        stopChildrenEvent: boolean;
        onDestroy(): void;
    }
}
declare namespace leaf {
    class TouchEvent {
        touchId: number;
        localX: number;
        localY: number;
        stageX: number;
        stageY: number;
        target: ecs.Entity;
        currentTarget: ecs.Entity;
    }
}
declare namespace leaf {
    class TouchManager {
        static start(touchId: number, touchX: number, touchY: number): void;
        static move(touchId: number, touchX: number, touchY: number): void;
        static end(touchId: number, touchX: number, touchY: number): void;
        private static dispatchTouchEvent;
        private static findTarget;
    }
}
declare namespace leaf {
    abstract class ListItemRenderer<T> extends ecs.Component {
        data: T;
        onData?(data?: T): any;
        onDestroy(): void;
    }
}
declare namespace leaf {
    class List<T> extends ecs.Component implements ScollerTarget {
        private _data;
        private itemRenderClass;
        private virtual;
        private items;
        private listRoot;
        contentWidth: number;
        contentHeight: number;
        width: number;
        height: number;
        readonly viewPort: ecs.Transform;
        init(data: any[], itemRenderClass: any, width: number, height: number, virtual?: boolean): void;
        data: T[];
        awake(): void;
        updateContentRect(): void;
        refresh(): void;
        onDestroy(): void;
    }
}
declare namespace leaf {
    class Scroller extends leaf.TouchComponent {
        target: ScollerTarget;
        init(target: ScollerTarget, scrollHEnable: boolean, scrollVEnable: boolean): void;
        startGapH: number;
        startGapV: number;
        scrollVEnable: boolean;
        scrollHEnable: boolean;
        speedH: number;
        speedV: number;
        private startX;
        private startY;
        private startLocalX;
        private startLocalY;
        private scrollReady;
        private startScrollV;
        private startScrollH;
        touchStart(e: leaf.TouchEvent): void;
        touchMove(e: leaf.TouchEvent): void;
        touchEnd(e: leaf.TouchEvent): void;
        checkRange(): void;
    }
}
declare namespace leaf {
    interface ScollerTarget extends ecs.Component {
        viewPort: ecs.Transform;
        contentWidth: number;
        contentHeight: number;
        width: number;
        height: number;
        refresh?: Function;
    }
}
declare namespace leaf {
    class Layout extends ecs.Component {
        readonly itemWidth: number;
        readonly itemHeight: number;
        updatePosition?(item: ecs.Entity, index: number, max: number, width: number, height: number): any;
        getPosition?(index: number, max: number, width: number, height: number): {
            x: number;
            y: number;
        };
    }
}
declare namespace leaf {
    class HorizontalLayout extends Layout {
        private _gap;
        private itemSize;
        readonly itemWidth: number;
        readonly itemHeight: number;
        init(itemSize?: number, gap?: number): void;
        updatePosition(item: ecs.Entity, index: number, max: number, width: number, height: number): void;
        getPosition(index: number, max: number, width: number, height: number): {
            x: number;
            y: number;
        };
    }
}
declare namespace leaf {
    class TileLayout extends Layout {
        private _gapv;
        private _gaph;
        private _itemWidth;
        private _itemHeight;
        readonly itemWidth: number;
        readonly itemHeight: number;
        init(itemWidth: number, itemHeight: any, gapv?: number, gaph?: number): void;
        updatePosition(item: ecs.Entity, index: number, max: number, width: number, height: number): void;
        getPosition(index: number, max: number, width: number, height: number): {
            x: number;
            y: number;
        };
    }
}
declare namespace leaf {
    class VerticalLayout extends Layout {
        private _gap;
        private itemSize;
        readonly itemWidth: number;
        readonly itemHeight: number;
        init(itemSize?: number, gap?: number): void;
        updatePosition(item: ecs.Entity, index: number, max: number, width: number, height: number): void;
        getPosition(index: number, max: number, width: number, height: number): {
            x: number;
            y: number;
        };
    }
}
declare namespace leaf {
    class StateWin extends ecs.Component {
        awake(): void;
        lateUpdate(): void;
        private static ist;
        static show(): void;
        static hide(): void;
    }
}
declare namespace leaf {
    class XPromise<T> {
        private resolve;
        private reject;
        private state;
        private args;
        init(call: (resolve: any, reject?: any) => any): void;
        then(resolve: (t?: T) => any): this;
        catch(reject: (r?: any) => any): this;
    }
}
