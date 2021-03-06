declare namespace leaf {
    var debug: boolean;
    var runInfo: {
        frame: number;
        runTime: number;
        drawCall: number;
        drawCount: number;
        fps: number;
        fpsTime: number;
        fpsDrawCall: number;
        fpsDrawCount: number;
    };
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
        static scale: number;
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
}
declare namespace leaf {
    abstract class Render extends ecs.Component {
        readonly shader: Shader;
        static allowMultiply: boolean;
        blendMode: BlendMode;
        onDestroy(): void;
        abstract preRender(): any;
    }
}
declare namespace leaf {
    class Bitmap extends Render {
        shader: BitmapShaderTask;
        private _resource;
        private _res;
        texture: Texture;
        resource: string;
        private _tint;
        tint: number;
        preRender(): void;
        onDestroy(): void;
        private static _shader;
        static readonly shader: BitmapShaderTask;
    }
}
declare namespace leaf {
    class Label extends Render {
        shader: BitmapShaderTask;
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
        preRender(): void;
        onDestroy(): void;
        static useScaleFont: boolean;
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
    class LoaderResource {
        name: string;
        url: string;
        itemType: LoaderItemType;
        private _data;
        next: string;
        private _xhr;
        onComplete: ecs.Broadcast<void>;
        load(): void;
        readonly data: any;
        updateProgress(event: any): void;
        loadImageComplete: () => void;
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
        static loadTexture(name: string, url: string): Promise<Resource<Texture>>;
        static loadJSON(name: string, url: string): Promise<any>;
        static loadText(name: string, url: string): Promise<any>;
        static loadResources(url?: string, resourceRoot?: string): Promise<any>;
        static loadSpriteSheet(name: string, url: string): Promise<SpriteSheetResource>;
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
        load(): Promise<this>;
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
        abstract render(): any;
    }
}
declare namespace leaf {
    var $size: number;
    class BitmapShaderTask extends Shader {
        private a_Position;
        private a_TexCoord;
        private a_Alpha;
        private a_Sampler;
        private u_PMatrix;
        private u_Samplers;
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
        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode, tint?: number): void;
        /**
         * 渲染
         */
        render(): void;
        reset(): void;
    }
}
declare namespace leaf {
    var $size: number;
    class BitmapShaderTask5 extends Shader {
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
        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode, tint: number): void;
        /**
         * 渲染
         */
        render(): void;
        reset(): void;
    }
}
declare namespace leaf {
    var $size: number;
    class BitmapShaderTask2 extends Shader {
        a_Position: any;
        a_TexCoord: any;
        a_Alpha: any;
        a_Sampler: any;
        u_PMatrix: any;
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
        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode): void;
        /**
         * 渲染
         */
        render(): void;
        reset(): void;
    }
}
declare namespace leaf {
    var $size: number;
    class BitmapShaderTask3 extends Shader {
        a_Position: any;
        a_TexCoord: any;
        u_Alpha: any;
        a_Sampler: any;
        u_PMatrix: any;
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
        private alpha;
        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode): void;
        /**
         * 渲染
         */
        render(): void;
        reset(): void;
    }
}
declare namespace leaf {
    var $size: number;
    class BitmapShaderTask4 extends Shader {
        a_Position: any;
        a_TexCoord: any;
        a_Alpha: any;
        a_Sampler: any;
        u_PMatrix: any;
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
        private indiceData;
        private blendMode;
        addTask(texture: Texture, matrix: ecs.Matrix, alpha: number, blendMode: BlendMode): void;
        /**
         * 渲染
         */
        render(): void;
        reset(): void;
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
