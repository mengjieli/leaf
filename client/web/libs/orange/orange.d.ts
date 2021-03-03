declare namespace orange {
    var autoloadInstance: {};
    /**
     * 自动装载，在文件改变时可以将此类以弹幕的方式发送到运行环境
     * @param name
     * @param clearFunction
     * @param params
     */
    function autoload(name?: string, clearFunction?: string, params?: any): <T extends new (...args: any[]) => any>(c: T) => T;
    function loadlink(name: any): void;
    /**
     * 链接自动装载，在此文件改变时可以重新装载新的文件，并重新运行标记为 name 的类（如果已经在运行的话）
     * @param name
     */
    var autoloadLink: (name: any) => void;
}
declare namespace egret {
    class DisplayObject {
        addEventListener(...args: any[]): void;
    }
    class Event {
        static ADDED_TO_STAGE: string;
        static REMOVED_FROM_STAGE: string;
    }
}
declare namespace orange {
    /**
     * 装饰成员变量的接口
     */
    interface IPropertyDescriptor {
        (target: Object, key: string, baseDescriptor?: PropertyDescriptor): any;
    }
    /**
     * 计算装饰器类型
     */
    interface ICalculate {
        (target: Object, key: string, baseDescriptor?: PropertyDescriptor): any;
        emit: IPropertyDescriptor;
    }
    /**
     * 优化计算值的装饰器
     */
    var calculate: ICalculate;
    interface IWatch {
        (target: Object, key: string, baseDescriptor?: PropertyDescriptor): any;
        emit: IPropertyDescriptor;
    }
    var watch: IWatch;
    /**
     * 在函数中对观测属性进行更改
     * @param t
     * @param o
     * @param p
     */
    var modify: (t: any, o: any, p: any) => any;
    /**
     *
     * @deprecated orange.autorunClass 已迁移至 orange.observer
     * @param c
     */
    var autorunClass: <T extends new (...args: any[]) => any>(c: T) => T;
    /**
     * 自动运行装饰器，使得一些主动的属性装饰器生效
     * @param c 需要装饰的类
     */
    var observer: <T extends new (...args: any[]) => any>(c: T) => T;
    /**
     * 停止对象的自动处理事物，否则对象无法释放
     * @param obj
     */
    function stop(obj: any): void;
    /**
    * 启动对象的自动处理事物
    * @param obj
    */
    function start(obj: any): void;
    interface AutorunBack extends PropertyDescriptor {
        /**
         * 调用后取消 autorun 的执行
         */
        (): void;
    }
    /**
     * 添加响应函数，可以自行决定函数何时启动响应和停止响应
     * @param classDefine 类定义
     * @param classMethodName  函数名
     * @param init 在类的构造函数中会自动调用此函数，init 的三个参数: thisObj 表示对象，startRun 启动函数响应，startRun 停止函数响应
     */
    function autorunExtend(classDefine: any, classMethodName: string, init: (thisObj: any, startRun: Function, stopRun: Function) => void): void;
    /**
     * 使用 @orange.observer 装饰的类对象在构造函数中会调用 call
     * @param classDefine 类定义
     * @param call 需要调用的方法
     */
    function constructorCall(classDefine: any, call: (thisObj: any) => void): void;
    /**
     *
     * @param target
     * @param key
     * @param baseDescriptor
     */
    function render(target: any, key: string, baseDescriptor: PropertyDescriptor): PropertyDescriptor;
    function autorun(target: any | (() => any), key?: string, baseDescriptor?: PropertyDescriptor): AutorunBack;
    /**
     * 响应函数，会返回一个清除函数，用以清除响应，如果是在 expression 中清除是不会触发 effect 的
     * @param expression 表达式，响应函数只会观察表达式中访问过的值，表达式函数需要返回一个参数，作为 effect 函数的第一个参数
     * @param effect 效果函数，此响应函数不会对 effect 中访问过的可观测值作出响应
     * @param compare 比较函数，用于比较改变时 expression 返回的值，只有返回 false 才执行 effect，默认的情况是只有 expression 的返回值变了才会触发 effect
     */
    function reaction<T>(expression: () => T, effect: (arg: T) => void, compare?: (a: T, b: T) => boolean): Function;
}
declare namespace orange {
    class Command {
        execute(args: any): void;
        private static cmds;
        static register(name: string, call: Function, desc?: string): void;
        static execute(name: string, ...args: any[]): void;
        static list(): void;
    }
}
declare namespace orange {
    class BaseSync {
        serverTime: number;
    }
    const baseSync: BaseSync;
}
declare namespace orange {
    /**
     * 对数据对象注入方法
     * getters 将使用 orange.calculate 装饰
     */
    const extendClass: <T extends new (...args: any[]) => any>(cls: T, getters?: MapLike<() => any>, methods?: MapLike<Function>) => void;
}
declare namespace orange {
    class HashObject {
        constructor();
        readonly hash: number;
        static hash: number;
    }
}
declare namespace orange {
    function createHideProperty(prototype: any): any;
    function getHideProperty(prototype: any): any;
}
declare namespace orange {
    function addAutorun(prototype: any, call: () => any): void;
}
declare namespace orange {
    interface MapLike<T> {
        [key: string]: T;
        [key: number]: T;
    }
}
declare namespace orange {
    class Debug {
        /**
         * 已运行过的 autorun 函数总和
         */
        static autorunSum: number;
        /**
         * 当前正在运行的 autorun 函数
         */
        static autorunCount: number;
    }
}
declare namespace orange {
    /**
     * 检测对象或类（这个类所有的对象）某个属性 何时变成 特定值
     * @param host 对象或者类定义
     * @param property 属性名称
     * @param val 属性值
     */
    function whenEquals(host: any, property: any, val: any): void;
}
declare namespace orange {
    interface IEventEmitter {
        readonly target: any;
        on(type: string, back: (e: orange.Event) => void, owner?: any): void;
        once(type: string, back: (e: orange.Event) => void, owner?: any): void;
        removeListener(type: string, back: (e: orange.Event) => void, owner?: any): void;
        hasListener(type: string): boolean;
        removeAllListeners(): any;
        emit(event: Event): any;
        emitWith(type: string, data?: any): any;
    }
    class EventEmitter extends HashObject implements IEventEmitter {
        constructor(target?: any);
        readonly target: any;
        on(event: string, back: (e: orange.Event) => void, owner?: any): void;
        once(event: string, back: (e: orange.Event) => void, owner?: any): void;
        emit(event: Event): void;
        emitWith(type: string, data?: any): void;
        hasListener(event: string): boolean;
        removeListener(event: string, back: (e: orange.Event) => void, owner?: any): void;
        removeAllListeners(): void;
    }
}
declare namespace orange {
    /**
     * 监听事件
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    function on(target: any, type: string, back: (e: orange.Event) => void, owner?: any): void;
    /**
     * 监听事件，回调函数调用一次后自动取消监听
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    function once(target: any, type: string, back: (e: orange.Event) => void, owner?: any): void;
    /**
     * 抛出事件
     * @param target 抛事件的对象
     * @param event 事件
     */
    function emit(target: any, event: Event): void;
    /**
     * 抛出事件，会自动创建一个 orange.Event
     * @param target 抛事件的对象
     * @param type 事件类型
     * @param data 事件携带的数据
     */
    function emitWith(target: any, type: string, data?: any): void;
    /**
     * 移除某个事件监听
     * @param target 抛出事件的对象
     * @param type 事件类型
     * @param back 事件回调函数
     * @param owner 回调函数的作用域 (this)
     */
    function removeListener(target: any, type: string, back: Function, owner?: any): void;
    /**
     * 是否有对象监听某个事件
     * @param target 抛出事件的对象
     * @param type 事件类型
     */
    function hasListener(target: any, type: string): boolean;
    /**
     * 移除所有的事件监听
     * @param target
     */
    function removeAllListeners(target: any): void;
    class Event {
        data: any;
        constructor(type: string);
        readonly type: any;
        readonly target: any;
        /**
         * 事件是否停止，停止后后面的对象无法监听到事件
         */
        readonly isStop: boolean;
        /**
         * 停止事件，停止后后面的对象无法监听到事件
         */
        stop(): void;
        clone(): orange.Event;
        static SEND: string;
        static DATA: string;
        static COMPLETE: string;
        static CONNECT: string;
        static CONNECT_ERROR: string;
        static RECONNECT: string;
        static CLOSE: string;
        static CHANGE: string;
        static ERROR: string;
        static create(type: any, data?: any, clazz?: any): any;
        static release(e: any): void;
    }
}
declare namespace orange {
    class CSV {
        data: any[][];
        toString(arraySplit?: string): string;
        static parse(content: string): CSV;
    }
}
declare namespace orange {
    class XMLAttribute {
        name: string;
        value: string;
    }
}
declare namespace orange {
    class XMLNamespace {
        name: string;
        value: string;
    }
}
declare namespace orange {
    class XML {
        name: string;
        value: string;
        attributes: XMLAttribute[];
        namespaces: XMLNamespace[];
        elements: XML[];
        /**
         * 过滤 xml ，返回符合条件的 xml 数组
         * 某个 xml 只要满足 filterName 或者 filterAttribute 中的任何一个即通过筛选
         * @param filterName 过滤 xml 名称
         * @param filterAttribute 过滤 xml 属性
         */
        filter(filterName?: (elementName: string) => boolean, filterAttribute?: (attribute: XMLAttribute) => boolean): XML[];
        /**
         * 过滤 xml ，返回符合条件的第一个 xml
         * 某个 xml 只要满足 filterName 或者 filterAttribute 中的任何一个即通过筛选
         * @param filterName 过滤 xml 名称
         * @param filterAttribute 过滤 xml 属性
         */
        filterOne(filterName?: (elementName: string) => boolean, filterAttribute?: (attribute: XMLAttribute) => boolean): XML[];
        toString(): string;
        static parse(content: any): XML;
    }
}
declare namespace orange {
    interface INetClient {
        connect(url: string): Promise<INetConnection>;
    }
}
declare namespace orange {
    /**
     * 除了实现接口还需要实现如下事件：
     * Event.CLOSE
     */
    interface INetConnection {
        readonly connected: boolean;
        /**
         * 协议对象
         * 打包消息和解包消息
         */
        protocol: INetProtocol;
        /**
         * 是否激活，默认为激活状态
         */
        active: boolean;
        /**
         * 网络代理类，封装了发消息的便捷方法，以及监听消息回调
         */
        proxy: INetProxy;
        url: string;
        /**
         * 链接服务器超时时间(单位秒)
         * @default 10
         */
        connectTimeout: number;
        /**
         * 客户端验证心跳爆超时时间(单位秒)
         * @default 10
         */
        hertTimeout: number;
        /**
         * 心跳包时间(单位秒)
         * @default 5
         */
        hertTimeinterval: number;
        close(reason?: ConnectionCloseReason, data?: any): any;
        send(data: any): INetSendMessage;
        reconnect(url?: string): Promise<void>;
    }
}
declare namespace orange {
    interface INetProtocol {
        /**
         *
         * @param data 消息
         * @param url 服务器地址
         */
        encode(data: any): INetSendMessage;
        /**
         *
         * @param data 消息
         * @param url 服务器地址
         */
        decode(data: Uint8Array): INetReceiveMessage;
    }
}
declare namespace orange {
    interface INetProxy {
        connection: INetConnection;
        active: boolean;
        /**
         * 延迟激活网络，为了和唤醒的事务处理错开时间，如果在延迟过程中重新设置了网络激活状态会放弃这次激活处理
         * @param delay 延迟时间，毫秒
         */
        setActiveTrueDelay(delay: number): Promise<void>;
        /**
         * 指令超时时间(秒)
         * @default 7
         */
        commandTimeout: number;
        /**
         * 重连间隙(秒)
         * @default 1
         */
        reconnectInterval: number;
        /**
         *
         * @param data 消息
         * @param url 服务器地址
         */
        receive(data: INetReceiveMessage): void;
        /**
         *
         * @param data 发送消息
         */
        send(data: any): INetSendMessage;
        /**
         * 请求
         * @param data
         */
        request(data: any, back?: (data: any) => void, getSendMessage?: (msg: INetSendMessage) => void): Promise<any>;
        resolveAsyncMessage(msgSeq: number, data: INetReceiveMessage): void;
        /**
         * 注册消息
         * @param msgID
         * @param back
         * @param thisObj
         */
        addMessageBack?(msgID: number | string, back: Function, thisObj?: any): void;
        /**
         * 移除消息
         * @param msgID
         * @param back
         * @param thisObj
         */
        removeMessageBack?(msgID: number | string, back: Function, thisObj?: any): void;
        /**
         * 移除消息
         * @param thisObj
         */
        removeMessageBackByThis?(thisObj: any): void;
        /**
         * 对所有消息进行监听
         * @param back
         * @param thisObj
         */
        addAllMessageBack(back: Function, thisObj?: any): void;
        /**
         * 移除对所有消息的监听
         * @param back
         * @param thisObj
         */
        removeAllMessageBack(back: Function, thisObj?: any): void;
    }
}
declare namespace orange {
    interface INetReceiveMessage {
        /**
         * 消息序列
         */
        sequence: number;
        /**
         * 服务器消息序列
         */
        serverSequence: number;
        /**
         * 消息 id
         */
        command: string | number;
    }
}
declare namespace orange {
    interface INetSendMessage {
        /**
         * 打包好的消息
         */
        bytes: ArrayBuffer;
        /**
         * 消息序列
         */
        sequence: number;
    }
}
declare namespace orange {
    /**
     * 网络链接断开
     */
    class ConnectionCloseData extends Error {
        constructor(reason: ConnectionCloseReason, data?: any);
        /**
         * 断开原因
         */
        reason: ConnectionCloseReason;
        readonly message: string;
        /**DISCONNECT
         * 携带的数据
         */
        data: any;
    }
    enum ConnectionCloseReason {
        /**
         * 主动断开
         */
        CLOSE_SELF = 0,
        /**
         * 从服务器断开
         */
        DISCONNECT = 1,
        /**
         * 链接服务器超时
         */
        CONNECT_TIMEOUT = 2,
        /**
         * 与服务器的重链出错
         */
        RECONNECT_ERROR = 3,
        /**
         * 错误码小于 0 断开
         */
        ERROR_CODE = 4,
        /**
         * 心跳包超时
         */
        HERT_TIMEOUT = 5,
        /**
         * 服务器消息丢失
         */
        SERVER_MESSAGE_LOST = 6,
        /**
         * 指令超时
         */
        COMMAND_TIME_OUT = 7
    }
}
declare namespace orange {
    class NetConnection implements INetConnection {
        constructor(connection: platform.INetConnection);
        /**
         * 是否激活，默认为激活状态
         */
        active: boolean;
        /**
         * 链接服务器超时时间(单位秒)
         */
        _connectTimeout: number;
        connectTimeout: number;
        /**
         * 心跳包时间(单位秒)
         */
        _hertTimeinterval: number;
        hertTimeinterval: number;
        /**
         * 客户端验证心跳爆超时时间(单位秒)
         */
        _hertTimeout: number;
        hertTimeout: number;
        protocol: INetProtocol;
        proxy: INetProxy;
        readonly connected: boolean;
        close(reason?: ConnectionCloseReason, data?: any): void;
        private isReady;
        private prepareMsgs;
        setReadyFalse(): void;
        getReady(): void;
        send(data: any): INetSendMessage;
        reconnect(url?: string): Promise<void>;
        readonly url: string;
    }
}
declare namespace orange {
    class NetProxy implements orange.INetProxy {
        connection: orange.INetConnection;
        /**
         * 指令超时时间(秒)
         */
        commandTimeout: number;
        /**
         * 重连间隙(秒)
         */
        reconnectInterval: number;
        /**
         * 接受消息，处理消息分发
         * @param data 消息
         */
        receive(data: INetReceiveMessage): void;
        active: boolean;
        private _setActiveId;
        /**
         * 延迟激活网络，为了和唤醒的事务处理错开时间，如果在延迟过程中重新设置了网络激活状态会放弃这次激活处理
         * @param delay 延迟时间，毫秒
         */
        setActiveTrueDelay(delay: number): Promise<void>;
        send(data: any): INetSendMessage;
        resolveAsyncMessage(msgSeq: number, data: INetReceiveMessage): void;
        private lastTime;
        private update;
        private start;
        private _hasStart;
        request(data: any, back?: (data: any) => void, getSendMessage?: (msg: INetSendMessage) => void): Promise<any>;
        protected receiveMessage(msgID: number | string, data: any): void;
        private msgAllBacks;
        addMessageBack(msgID: number | string, back: Function, thisObj?: any): void;
        removeMessageBack(msgID: number | string, back: Function, thisObj?: any): void;
        removeMessageBackByThis(thisObj: any): void;
        addAllMessageBack(back: Function, thisObj?: any): void;
        removeAllMessageBack(back: Function, thisObj?: any): void;
    }
}
declare namespace orange {
    class WebSocketClient implements INetClient {
        connect(url: string): Promise<INetConnection>;
    }
}
declare namespace orange {
    /**
         * 除了接口还要实现如下事件
         * Event.CLOSE 链接关闭
         * Event.DATA 收到数据
         */
    namespace platform {
        interface INetConnection {
            readonly connected: boolean;
            readonly url: string;
            /**
             * 是否激活，默认为激活状态
             */
            active: boolean;
            send(data: Uint8Array): any;
            close(reason?: ConnectionCloseReason, data?: any): void;
            reconnect?(url: string): Promise<void>;
            /**
             * 链接服务器超时时间(单位秒)
             * @default 10
             */
            connectTimeout: number;
            /**
             * 心跳包时间(单位秒)
             * @default 5
             */
            hertTimeinterval: number;
            /**
             * 客户端验证心跳爆超时时间(单位秒)
             * @default 10
             */
            hertTimeout: number;
        }
    }
}
declare namespace orange {
    class SimpleStateMachine<T extends number> {
        private states;
        private state;
        curState: T;
        preState: T;
        firstUpdate: boolean;
        constructor();
        register(state: T, enter: Function, exit: Function, update: Function): void;
        registerBehaviour(state: T, stateBehaviour: ISimpleStateMachineStateBehaviour): void;
        changeState(state: T): void;
        update(): void;
    }
    interface ISimpleStateMachineStateBehaviour {
        onEnter(): any;
        onExit(): any;
        onUpdate(): any;
    }
    class SimpleStateMachineState<T extends number> {
        state: T;
        enter: Function;
        exit: Function;
        update: Function;
        constructor(state: T, enter: Function, exit: Function, update: Function);
    }
}
declare namespace orange {
    /**
     * 如果 Promise 函数返回 reject
     * @param func
     * @param waitTime
     * @param tryMax
     */
    var tryPromise: <T>(func: (resolve: (r: T) => any, reject: Function) => any, waitTime?: number, tryMax?: number) => Promise<{}>;
}
declare namespace orange {
    class TaskList<T> {
        constructor(source: Array<T>);
        /**
         * 转换任务，拆分任务
         * @param f
         */
        transform<S>(f: (item: T, index?: number, source?: Array<T>, taskList?: TaskList<T>) => S[] | S): TaskList<S>;
        /**
         * 串行处理任务
         * @param f 处理函数
         */
        serial(f: (item: T, index?: number, source?: Array<T>, taskList?: TaskList<T>) => Promise<any>): TaskList<T>;
        /**
         * 并行处理任务，所有任务处理完后进行到下一步
         * @param f 处理函数
         */
        parallel(f: (item: T, index?: number, source?: Array<T>, taskList?: TaskList<T>) => Promise<any>): TaskList<T>;
        /**
         * 执行
         */
        execute(): Promise<void>;
        /**
         * 停止执行所有的任务
         */
        stop(): void;
    }
}
declare namespace orange {
    class APIUtil {
        /**
         * 提示接口已废弃
         * @param methodName
         */
        static deprecatedTip: (methodName: string, time: number, more?: string) => void;
        static deprecated(): void;
    }
}
declare namespace orange {
    class ArrayUtil {
        static getItem(source: any[], key: string, value: any): any;
        /**
         * 根据权重，返回随机的索引
         * @param list 权重数组
         */
        static getRandom(list: number[]): number;
    }
}
declare namespace orange {
    class BreakUtil {
        static break(name?: string): void;
    }
}
declare namespace orange {
    class GetUtil {
        /**
         * 根据一个字符串获取全局变量
         * @param attribute "Formula.countAttack"
         */
        static getFromGlobal(attribute: string, root?: any): any;
        static setFromGlobal(attribute: string, value: any, root?: any): any;
        static watchFromGlobal(attribute: string, back: (value: any) => void): () => void;
    }
}
declare namespace orange {
    /**
     * 调试参数
     */
    var debug: boolean;
    function addStartBack(call: (params: StartupParams) => Promise<void>): void;
    /**
     * 启动参数
     */
    interface StartupParams {
        debug?: boolean;
        egret?: {
            stage: any;
            debugWin?: boolean;
        };
        native?: {
            ip?: string;
            port?: number;
            autoCompile?: boolean;
        };
    }
    function startup(params?: StartupParams): Promise<void>;
}
declare namespace orange {
    class StringUtil {
        /**
         * 采用 utf8 编码把字符串转成字节数组
         * @param str
         */
        static encodeUTF8(str: string): number[];
        /**
         * 把 utf8 编码的字节数组还原成字符串
         * @param arr
         */
        static decodeUTF8(arr: number[]): string;
        static replace(str: string, findStr: string, tstr: string, jumpFind?: boolean): string;
        static hasStringAt(str: any, hstrs: any, pos: any): boolean;
        /**
         * 打印表格
         * @param table 表格
         * @param gap 每个字段间隔多少个空格，默认空 4 个
         */
        static tableToString(table: string[][], gap?: number): string;
        /**
         * 获取字符串的长度，小于 255 的长度为 1，其它为 2
         * @param str
         */
        static getLength(str: string): number;
    }
}
declare namespace orange {
    function sleep(time: number): Promise<void>;
}
declare namespace orange {
    class URLUtil {
        constructor(url: string);
        baseURL: string;
        params: {};
        readonly url: string;
        static join(...paths: string[]): string;
    }
}
