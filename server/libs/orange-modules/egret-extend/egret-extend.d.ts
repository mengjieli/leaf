
declare namespace egretExtend {
    function start(rootData: any, mediatorManager: IMediatorManager): void;
    function getStage(): any;
}
declare namespace egretExtend {
    var autoload: (name?: string, exmlClass?: string | string[], clearFunction?: string, params?: any) => <T extends new (...args: any[]) => any>(c: T) => T;
    /**
     * 链接自动装载，在此文件改变时可以重新装载新的文件，并重新运行标记为 name 的类（如果已经在运行的话）
     * @param name
     */
    var autoloadLink: (name: string, exmlClass: string | string[]) => void;
}
declare namespace egretExtend {
    interface IBind {
        (bindKey: string): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void;
        emit: (bindKey: string) => (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void;
    }
    /**
     * 绑定某个数据
     * @deprecated
     * @param target
     * @param key
     * @param baseDescriptor
     */
    var bind: IBind;
    /**
     * @egretExtend.render 是 @orange.autorun 的扩展功能，在对象添加到舞台上并且 skin 加载完成时才开始响应，对象从舞台移除时停止响应
     * @param target
     * @param key
     * @param baseDescriptor
     */
    function render(target: any, key: string, baseDescriptor: PropertyDescriptor): PropertyDescriptor;
}
declare namespace egretExtend {
    class Component {
        awake?(): void;
        start?(): void;
        update?(): void;
        destory(): void;
        owner: egret.Sprite;
    }
    function addComponent<T extends Component>(obj: egret.Sprite, type: {
        new (): T;
    }): void;
}
declare namespace egretExtend {
    /**
     * 返回毫秒 (保留小数点后面3位)
     */
    function now(): number;
    function $startDebug(): void;
}
declare namespace egretExtend {
    class Debug extends egret.Sprite {
        constructor();
        private egretDebug;
        private min;
        private fpsList;
        private lastSecondFps;
        private lastSecondFpsCount;
        private lastSecondTime;
        private lastTime;
        update(): void;
        updateSecondFps(now: number): void;
        show(name: string, content: string): void;
        private static ist;
        static show(): void;
        static showAll(): void;
        static hide(): void;
    }
}
declare namespace egretExtend {
    class EgretDebug extends egret.Sprite {
        start(now: number): void;
        update(now: number): void;
        readonly lastHashCount: number;
    }
    function filterDisplay(filer: (display: egret.DisplayObject, stack?: number) => [boolean, boolean], display?: egret.DisplayObject): egret.DisplayObject[];
    function displaySum(type?: any): any[];
    function displayTouchSum(): number;
}
declare namespace egretExtend {
}
declare namespace egretExtend {
    function findDisplaysWithTexture(texture: any): void;
}
declare namespace egretExtend {
    class DebugImage {
        constructor();
        /**
         * 微信 img
         */
        image: any;
        /**
         * 加载地址
         */
        url: string;
        width: number;
        height: number;
        hasDispose: boolean;
        /**
         * webgl 纹理
         */
        texture: any;
        bitmapData: any;
        toJSON(): {
            image: any;
            url: string;
            width: number;
            height: number;
            texture: any;
            bitmapData: any;
        };
        initWithImage(image: any): any;
        disposeImage(): void;
        static getTextureMem(): number;
        static getTextureMoreMem(): number;
        static texImageSum: number;
    }
}
declare namespace egretExtend {
}
declare namespace egretExtend {
    class EaseFunction {
        static None(t: any): any;
        static SineEaseIn(t: any): number;
        static SineEaseOut(t: any): number;
        static SineEaseInOut(t: any): number;
        static SineEaseOutIn(t: any): number;
        static QuadEaseIn(t: any): number;
        static QuadEaseOut(t: any): number;
        static QuadEaseInOut(t: any): number;
        static QuadEaseOutIn(t: any): number;
        static CubicEaseIn(t: any): number;
        static CubicEaseOut(t: any): number;
        static CubicEaseInOut(t: any): number;
        static CubicEaseOutIn(t: any): number;
        static QuartEaseIn(t: any): number;
        static QuartEaseOut(t: any): number;
        static QuartEaseInOut(t: any): number;
        static QuartEaseOutIn(t: any): number;
        static QuintEaseIn(t: any): number;
        static QuintEaseOut(t: any): number;
        static QuintEaseInOut(t: any): number;
        static QuintEaseOutIn(t: any): number;
        static ExpoEaseIn(t: any): number;
        static ExpoEaseOut(t: any): number;
        static ExpoEaseInOut(t: any): number;
        static ExpoEaseOutIn(t: any): number;
        static CircEaseIn(t: any): number;
        static CircEaseOut(t: any): number;
        static CircEaseInOut(t: any): number;
        static CircEaseOutIn(t: any): number;
        static BackEaseIn(t: any): number;
        static BackEaseOut(t: any): number;
        static BackEaseInOut(t: any): number;
        static BackEaseOutIn(t: any): number;
        static ElasticEaseIn(t: any): any;
        static ElasticEaseOut(t: any): any;
        static ElasticEaseInOut(t: any): any;
        static ElasticEaseOutIn(t: any): any;
        private static bounceEaseIn;
        private static bounceEaseOut;
        static BounceEaseInOut(t: any): number;
        static BounceEaseOutIn(t: any): number;
        static BounceEaseIn: typeof EaseFunction.bounceEaseIn;
        static BounceEaseOut: typeof EaseFunction.bounceEaseOut;
    }
}
declare namespace egretExtend {
    class EXML {
        static decode(ui: eui.Component, cfg: any): TweenGroup[];
    }
}
declare namespace egretExtend {
    class TweenGroup extends egret.EventDispatcher {
        /**
         * 播放速度，只在 updateSelf 为 true 时有用
         */
        speed: number;
        stopAll(): void;
        resetAll(): void;
        maxTime: number;
        play(time?: number): void;
        private loop;
        private _isPlay;
        readonly isPlay: boolean;
        /**
         * 从时间 0 开始循环播放多少次
         * @param loop 循环次数
         * @param complete
         */
        playLoop(loop?: number, reset?: boolean): Promise<void>;
        stop(): void;
        update: (dt: number) => void;
        /**
         * 是否内部更新，如果设置为 false 则需要外部调用 update(dt) 进行更新
         */
        updateCall: (update: (dt: number) => any) => (() => any);
        private cancelUpdate;
    }
}
declare namespace egretExtend {
    class TweenPlay {
        static play(tween: TweenGroup, loop?: number, complete?: Function): Promise<void>;
    }
}
declare namespace egretExtend {
    class ArcFilter extends egret.CustomFilter {
        /**
         *
         * @param startRadius 起点弧度，范围 (-2*PI,2*PI) 坐标系方向与白鹭相同，x 向右为正，y 向下为正
         * @param endRadius 终点弧度，范围 (-2*PI,2*PI) 坐标系方向与白鹭相同，x 向右为正，y 向下为正
         * @param offRadius 偏移弧度
         */
        constructor(startRadius?: number, endRadius?: number, offRadius?: number);
    }
}
declare namespace egretExtend {
    class CircleFilter extends egret.CustomFilter {
        constructor(size?: number);
    }
}
declare namespace egretExtend {
    class MediatorManager extends orange.EventEmitter implements IMediatorManager {
        constructor();
        type: string;
        private mediators;
        /**
         * 添加一个 Mediator
         * @param mediator
         */
        addMediator(mediator: Mediator): void;
        /**
         * 移除一个 Mediator
         * @param mediator
         */
        removeMediator(mediator: Mediator): void;
        /**
         * 获取一个 Mediator
         * @param name Mediator 名称
         */
        getMediator(name: string): Mediator;
        forEach(func: (Mediator: any) => void): void;
        static readonly instance: MediatorManager;
    }
}
declare namespace egretExtend {
    var registerMediator: (dataRute?: any, mediatorManagerType?: string) => (clazz: any) => any;
}
declare namespace egretExtend {
    abstract class Mediator implements orange.IEventEmitter, IMediator {
        abstract name: string;
        abstract onReady(): any;
        readonly target: MediatorManager;
        on(type: string, back: (e: orange.Event) => void): void;
        once(type: string, back: (e: orange.Event) => void): void;
        removeListener(type: string, back: (e: orange.Event) => void): void;
        hasListener(type: string): boolean;
        removeAllListeners(): any;
        emit(event: orange.Event): any;
        emitWith(type: string, data?: any): any;
    }
}
declare namespace egretExtend {
    abstract class ViewMediator<DataClass> extends Mediator implements IViewMediator {
        data: DataClass;
        /**
         * 父节点
         */
        parent: egret.DisplayObjectContainer;
        /**
         * 显示
         * @param data
         */
        openView(data?: any): void;
        /**
         * 关闭显示
         * @param data
         */
        closeView(data?: any): void;
        getViewChild(name: string): any;
        /**
         * 获取 view
         */
        readonly view: IView;
        protected getView(): IView;
        /**
         * 创建 view ，由子类实现
         */
        abstract createView(): IView;
        /**
         * 创建后做 view 的绑定和事件注册等
         */
        protected onViewCreated?(): void;
        /**
         * view 添加到舞台
         */
        protected onViewAddedToStage?(): void;
        /**
         * view 从舞台移除
         */
        protected onViewRemovedFromStage?(): void;
        /**
         * view 销毁
         */
        protected onViewDestroyed?(): void;
        /**
         * 销毁 view
         */
        protected destroyView(): void;
    }
}
declare namespace egretExtend {
    interface IMediatorManager extends orange.EventEmitter {
        /**
         * 用以区分 IMediatorManager 的标识
         */
        readonly type: string;
        /**
         * 添加一个 Mediator
         * @param mediator
         */
        addMediator(mediator: IMediator): any;
        /**
         * 移除一个 Mediator
         * @param mediator
         */
        removeMediator(mediator: IMediator): any;
        /**
         * 获取一个 Mediator
         * @param name Mediator 名称
         */
        getMediator(name: string): IMediator;
        /**
         * 遍历 Mediator
         * @param func
         */
        forEach(func: (IMediator: any) => void): any;
    }
}
declare namespace egretExtend {
    interface IMediator {
        /**
         * mediator 的名称，唯一标识，用以解耦
         */
        readonly name: string;
        onReady(): void;
    }
}
declare namespace egretExtend {
    interface IViewMediator extends IMediator {
        /**
         * mediator 管理的显示对象
         */
        readonly view: IView;
        /**
         * 显示父对象
         */
        parent: any;
        /**
         * 打开显示
         * @param data
         */
        openView(data?: any): void;
        /**
         * 关闭显示
         * @param data
         */
        closeView(data?: any): void;
    }
}
declare namespace egretExtend {
    interface IView extends egret.DisplayObject {
        data: any;
    }
}
declare namespace egretExtend {
}
declare namespace egretExtend {
    /**
     * 获取图集列表
     */
    function getMergeTextures(): egret.Texture[];
    /**
     * 自动合图功能，在内存中动态合并图片打包成图集
     * @param filter 过滤函数，如果返回 false 则不参与合图
     */
    function startMergeTexture(filter?: (resource: RES.ResourceInfo) => boolean): void;
}
declare namespace egretExtend {
    class GetUtil {
        static getInParent<T extends egret.DisplayObject>(display: egret.DisplayObject, type: {
            new (): T;
        }): T;
        static isInTargetParent<T extends egret.DisplayObject>(display: egret.DisplayObject, p: egret.DisplayObjectContainer): boolean;
    }
}
declare namespace egretExtend {
    class DragController {
        constructor(display: egret.DisplayObject);
        onComplete(back: (drag: DragController) => void): () => void;
        enabled: boolean;
    }
}
declare namespace egretExtend {
    class IDD extends egret.DisplayObject {
        aaaa?: number;
    }
    var observer: <T extends IDD, TB extends new () => T>(c: TB) => TB;
    function update(target: any, key: string, baseDescriptor: PropertyDescriptor): PropertyDescriptor;
}


declare class egret_Texture extends egret.Texture { }
declare class egret_CustomFilter extends egret.CustomFilter{}
declare class egret_DisplayObject extends egret.DisplayObject { }
declare class egret_DisplayObjectContainer extends egret.DisplayObjectContainer { }
declare class egret_EventDispatcher extends egret.EventDispatcher { }
declare class egret_Sprite extends egret.Sprite { }

declare namespace orange {
 namespace egret {
    function start(rootData: any, mediatorManager: IMediatorManager): void;
    function getStage(): any;
}
 namespace egret {
    var autoload: (name?: string, exmlClass?: string | string[], clearFunction?: string, params?: any) => <T extends new (...args: any[]) => any>(c: T) => T;
    /**
     * 链接自动装载，在此文件改变时可以重新装载新的文件，并重新运行标记为 name 的类（如果已经在运行的话）
     * @param name
     */
    var autoloadLink: (name: string, exmlClass: string | string[]) => void;
}
 namespace egret {
    interface IBind {
        (bindKey: string): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void;
        emit: (bindKey: string) => (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void;
    }
    /**
     * 绑定某个数据
     * @deprecated
     * @param target
     * @param key
     * @param baseDescriptor
     */
    var bind: IBind;
    /**
     * @egret.render 是 @orange.autorun 的扩展功能，在对象添加到舞台上并且 skin 加载完成时才开始响应，对象从舞台移除时停止响应
     * @param target
     * @param key
     * @param baseDescriptor
     */
    function render(target: any, key: string, baseDescriptor: PropertyDescriptor): PropertyDescriptor;
}
 namespace egret {
    class Component {
        awake?(): void;
        start?(): void;
        update?(): void;
        destory(): void;
        owner: egret_Sprite;
    }
    function addComponent<T extends Component>(obj: egret_Sprite, type: {
        new (): T;
    }): void;
}
 namespace egret {
    /**
     * 返回毫秒 (保留小数点后面3位)
     */
    function now(): number;
    function $startDebug(): void;
}
 namespace egret {
    class Debug extends egret_Sprite {
        constructor();
        private egretDebug;
        private min;
        private fpsList;
        private lastSecondFps;
        private lastSecondFpsCount;
        private lastSecondTime;
        private lastTime;
        update(): void;
        updateSecondFps(now: number): void;
        show(name: string, content: string): void;
        private static ist;
        static show(): void;
        static showAll(): void;
        static hide(): void;
    }
}
 namespace egret {
    class EgretDebug extends egret_Sprite {
        start(now: number): void;
        update(now: number): void;
        readonly lastHashCount: number;
    }
    function filterDisplay(filer: (display: egret_DisplayObject, stack?: number) => [boolean, boolean], display?: egret_DisplayObject): egret_DisplayObject[];
    function displaySum(type?: any): any[];
    function displayTouchSum(): number;
}
 namespace egret {
}
 namespace egret {
    function findDisplaysWithTexture(texture: any): void;
}
 namespace egret {
    class DebugImage {
        constructor();
        /**
         * 微信 img
         */
        image: any;
        /**
         * 加载地址
         */
        url: string;
        width: number;
        height: number;
        hasDispose: boolean;
        /**
         * webgl 纹理
         */
        texture: any;
        bitmapData: any;
        toJSON(): {
            image: any;
            url: string;
            width: number;
            height: number;
            texture: any;
            bitmapData: any;
        };
        initWithImage(image: any): any;
        disposeImage(): void;
        static getTextureMem(): number;
        static getTextureMoreMem(): number;
        static texImageSum: number;
    }
}
 namespace egret {
}
 namespace egret {
    class EaseFunction {
        static None(t: any): any;
        static SineEaseIn(t: any): number;
        static SineEaseOut(t: any): number;
        static SineEaseInOut(t: any): number;
        static SineEaseOutIn(t: any): number;
        static QuadEaseIn(t: any): number;
        static QuadEaseOut(t: any): number;
        static QuadEaseInOut(t: any): number;
        static QuadEaseOutIn(t: any): number;
        static CubicEaseIn(t: any): number;
        static CubicEaseOut(t: any): number;
        static CubicEaseInOut(t: any): number;
        static CubicEaseOutIn(t: any): number;
        static QuartEaseIn(t: any): number;
        static QuartEaseOut(t: any): number;
        static QuartEaseInOut(t: any): number;
        static QuartEaseOutIn(t: any): number;
        static QuintEaseIn(t: any): number;
        static QuintEaseOut(t: any): number;
        static QuintEaseInOut(t: any): number;
        static QuintEaseOutIn(t: any): number;
        static ExpoEaseIn(t: any): number;
        static ExpoEaseOut(t: any): number;
        static ExpoEaseInOut(t: any): number;
        static ExpoEaseOutIn(t: any): number;
        static CircEaseIn(t: any): number;
        static CircEaseOut(t: any): number;
        static CircEaseInOut(t: any): number;
        static CircEaseOutIn(t: any): number;
        static BackEaseIn(t: any): number;
        static BackEaseOut(t: any): number;
        static BackEaseInOut(t: any): number;
        static BackEaseOutIn(t: any): number;
        static ElasticEaseIn(t: any): any;
        static ElasticEaseOut(t: any): any;
        static ElasticEaseInOut(t: any): any;
        static ElasticEaseOutIn(t: any): any;
        private static bounceEaseIn;
        private static bounceEaseOut;
        static BounceEaseInOut(t: any): number;
        static BounceEaseOutIn(t: any): number;
        static BounceEaseIn: typeof EaseFunction.bounceEaseIn;
        static BounceEaseOut: typeof EaseFunction.bounceEaseOut;
    }
}
 namespace egret {
    class EXML {
        static decode(ui: eui.Component, cfg: any): TweenGroup[];
    }
}
 namespace egret {
    class TweenGroup extends egret_EventDispatcher {
        /**
         * 播放速度，只在 updateSelf 为 true 时有用
         */
        speed: number;
        stopAll(): void;
        resetAll(): void;
        maxTime: number;
        play(time?: number): void;
        private loop;
        private _isPlay;
        readonly isPlay: boolean;
        /**
         * 从时间 0 开始循环播放多少次
         * @param loop 循环次数
         * @param complete
         */
        playLoop(loop?: number, reset?: boolean): Promise<void>;
        stop(): void;
        update: (dt: number) => void;
        /**
         * 是否内部更新，如果设置为 false 则需要外部调用 update(dt) 进行更新
         */
        updateCall: (update: (dt: number) => any) => (() => any);
        private cancelUpdate;
    }
}
 namespace egret {
    class TweenPlay {
        static play(tween: TweenGroup, loop?: number, complete?: Function): Promise<void>;
    }
}
 namespace egret {
    class ArcFilter extends egret_CustomFilter {
        /**
         *
         * @param startRadius 起点弧度，范围 (-2*PI,2*PI) 坐标系方向与白鹭相同，x 向右为正，y 向下为正
         * @param endRadius 终点弧度，范围 (-2*PI,2*PI) 坐标系方向与白鹭相同，x 向右为正，y 向下为正
         * @param offRadius 偏移弧度
         */
        constructor(startRadius?: number, endRadius?: number, offRadius?: number);
    }
}
 namespace egret {
    class CircleFilter extends egret_CustomFilter {
        constructor(size?: number);
    }
}
 namespace egret {
    class MediatorManager extends orange.EventEmitter implements IMediatorManager {
        constructor();
        type: string;
        private mediators;
        /**
         * 添加一个 Mediator
         * @param mediator
         */
        addMediator(mediator: Mediator): void;
        /**
         * 移除一个 Mediator
         * @param mediator
         */
        removeMediator(mediator: Mediator): void;
        /**
         * 获取一个 Mediator
         * @param name Mediator 名称
         */
        getMediator(name: string): Mediator;
        forEach(func: (Mediator: any) => void): void;
        static readonly instance: MediatorManager;
    }
}
 namespace egret {
    var registerMediator: (dataRute?: any, mediatorManagerType?: string) => (clazz: any) => any;
}
 namespace egret {
    abstract class Mediator implements orange.IEventEmitter, IMediator {
        abstract name: string;
        abstract onReady(): any;
        readonly target: MediatorManager;
        on(type: string, back: (e: orange.Event) => void): void;
        once(type: string, back: (e: orange.Event) => void): void;
        removeListener(type: string, back: (e: orange.Event) => void): void;
        hasListener(type: string): boolean;
        removeAllListeners(): any;
        emit(event: orange.Event): any;
        emitWith(type: string, data?: any): any;
    }
}
 namespace egret {
    abstract class ViewMediator<DataClass> extends Mediator implements IViewMediator {
        data: DataClass;
        /**
         * 父节点
         */
        parent: egret_DisplayObjectContainer;
        /**
         * 显示
         * @param data
         */
        openView(data?: any): void;
        /**
         * 关闭显示
         * @param data
         */
        closeView(data?: any): void;
        getViewChild(name: string): any;
        /**
         * 获取 view
         */
        readonly view: IView;
        protected getView(): IView;
        /**
         * 创建 view ，由子类实现
         */
        abstract createView(): IView;
        /**
         * 创建后做 view 的绑定和事件注册等
         */
        protected onViewCreated?(): void;
        /**
         * view 添加到舞台
         */
        protected onViewAddedToStage?(): void;
        /**
         * view 从舞台移除
         */
        protected onViewRemovedFromStage?(): void;
        /**
         * view 销毁
         */
        protected onViewDestroyed?(): void;
        /**
         * 销毁 view
         */
        protected destroyView(): void;
    }
}
 namespace egret {
    interface IMediatorManager extends orange.EventEmitter {
        /**
         * 用以区分 IMediatorManager 的标识
         */
        readonly type: string;
        /**
         * 添加一个 Mediator
         * @param mediator
         */
        addMediator(mediator: IMediator): any;
        /**
         * 移除一个 Mediator
         * @param mediator
         */
        removeMediator(mediator: IMediator): any;
        /**
         * 获取一个 Mediator
         * @param name Mediator 名称
         */
        getMediator(name: string): IMediator;
        /**
         * 遍历 Mediator
         * @param func
         */
        forEach(func: (IMediator: any) => void): any;
    }
}
 namespace egret {
    interface IMediator {
        /**
         * mediator 的名称，唯一标识，用以解耦
         */
        readonly name: string;
        onReady(): void;
    }
}
 namespace egret {
    interface IViewMediator extends IMediator {
        /**
         * mediator 管理的显示对象
         */
        readonly view: IView;
        /**
         * 显示父对象
         */
        parent: any;
        /**
         * 打开显示
         * @param data
         */
        openView(data?: any): void;
        /**
         * 关闭显示
         * @param data
         */
        closeView(data?: any): void;
    }
}
 namespace egret {
    interface IView extends egret_DisplayObject {
        data: any;
    }
}
 namespace egret {
}
 namespace egret {
    /**
     * 获取图集列表
     */
    function getMergeTextures(): egret_Texture[];
    /**
     * 自动合图功能，在内存中动态合并图片打包成图集
     * @param filter 过滤函数，如果返回 false 则不参与合图
     */
    function startMergeTexture(filter?: (resource: RES.ResourceInfo) => boolean): void;
}
 namespace egret {
    class GetUtil {
        static getInParent<T extends egret_DisplayObject>(display: egret_DisplayObject, type: {
            new (): T;
        }): T;
        static isInTargetParent<T extends egret_DisplayObject>(display: egret_DisplayObject, p: egret_DisplayObjectContainer): boolean;
    }
}
 namespace egret {
    class DragController {
        constructor(display: egret_DisplayObject);
        onComplete(back: (drag: DragController) => void): () => void;
        enabled: boolean;
    }
}
 namespace egret {
    class IDD extends egret_DisplayObject {
        aaaa?: number;
    }
    var observer: <T extends IDD, TB extends new () => T>(c: TB) => TB;
    function update(target: any, key: string, baseDescriptor: PropertyDescriptor): PropertyDescriptor;
}

}