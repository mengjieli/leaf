
declare namespace orange {
    function find(keys: string, value: any): void;
    abstract class DataBase extends orange.HashObject {
        constructor(properties?: Map<string, DataType>);
        _key_: string;
        dispose(): void;
        find(value: any | ((val: any, findKeys: string) => boolean)): void;
        $search(keys: string, findValue: any | ((val: any, findKeys: string) => boolean), find: (key: string, value: any) => void): void;
        properties: Map<string, DataType>;
        toJSON(): {};
        /**
         * @param name 属性名称
         * @param clazz 类型
         * @param type 0:简单类型  1:class  2:Array  3:Map
         */
        protected createProperty(name: string): any;
        /**
         * 清空数据
         */
        reset(): void;
        /**
         * 复制一个对象
         */
        clone(): any;
        history: Map<string, any>;
        /**
         * @param obj
         */
        setValue(obj: any, path?: string): void;
        /**
         * 设置 map 对象
         * @param map
         * @param value
         * @param classDefine
         */
        setMap(key: string, value: any, classDefine?: any): void;
        /**
         * 设置 map 对象
         * @param map
         * @param value
         * @param classDefine
         */
        static setMap(map: Map<any, any>, value: any, classDefine: any): void;
    }
}
declare namespace orange {
    class DataType {
        /**
         * 数据类型  'number' 'string' 'boolean'  0:基本类型  1:class  2:Array  3:Map
         */
        type: number | string;
        /**
         * 关联的类类型
         */
        classType: any;
        key: string;
        /**
         * 记录差异值
         */
        recordFlag: boolean;
        /**
         * 初始化值
         */
        init: any;
        constructor(type: number, classType?: any, init?: any, recordFlag?: boolean);
    }
}
declare namespace orange {
    interface INetBack extends orange.INetReceiveMessage {
        /**
         * 错误码
         * 0 为正确
         * 大于 0 为游戏错误码
         * 小于 0 为系统错误码
         */
        errorCode: number;
        /**
         * 错误消息，错误码为 0 时 errorMessage 为 null
         */
        errorMessage: string;
        /**
         * 返回消息，错误码为 0 时 body 为 null
         */
        body: null;
    }
}
declare namespace orange {
    var loginError: '未收到 token' | '无法链接服务器';
    function login(params: WeiXinLoginInfo): Promise<{}>;
    function checkToken(token: string, params: WeiXinLoginInfo, close?: any): Promise<{}>;
    function gameLogin(proxy: any, info: any): Promise<{}>;
    interface WeiXinLoginInfo extends ConnectParams {
        /**
         * 平台，固定值
         */
        platform: 'weixin';
        /**
         * 服务器地址
         */
        url: string;
        /**
         * 登陆按钮配置
         */
        btnConfig: any;
        /**
         * 获取登陆参数，会把返回结果加入到 Auth_Login 消息参数中
         */
        getLoginParams: () => any;
    }
}
declare namespace orange {
    namespace native {
        function isReady(): boolean;
    }
}
declare namespace orange {
    class Protocol implements orange.INetProtocol {
        compressed: 'gzip' | null;
        encode(data: any): orange.INetSendMessage;
        decode(bytes: Uint8Array): INetReceiveMessage;
    }
}
declare namespace orange {
    class Proxy extends orange.NetProxy implements orange.INetProxy {
        private clear;
        private _debug;
        debug: boolean;
        version: string;
        /**
         * 根数据
         */
        root: any;
        /**
         * 用于数据同步的消息 id
         */
        private syncCommands;
        private syncAll;
        /**
         * 添加数据同步指令
         * @param cmd
         */
        addSyncCommand(cmd: string): void;
        /**
         * 同步所有指令
         */
        syncAllCommand: boolean;
        connection: orange.INetConnection;
        /**
         * 重连次数
         */
        reconnectCount: number;
        static self: boolean;
        /**
         * 接受消息，处理消息分发
         * @param data 消息
         */
        receive(data: INetReceiveMessage): void;
        private records;
        send(data: any): orange.INetSendMessage;
        request(data: any, back?: (data: any) => void): Promise<any>;
    }
}
declare namespace orange {
    class UpdateEvent extends orange.Event {
        /**
         * 当前被更新的数据
         */
        data: DataBase;
        /**
         * 通过哪个网络类更新的
         */
        proxy: Proxy;
        /**
         * 数据在最后一个对象中的属性名
         */
        name: string;
        /**
         * 相对于 root 数据的路径，比如 root.player.items.attribute 这里的 path 就是 player.items.attribute
         */
        path: string;
        static RESET_DATA: string;
        private static ist;
        static readonly emitter: UpdateEventEmitter;
    }
    interface UpdateEventEmitter extends orange.EventEmitter {
        on(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
        once(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
        removeListener(event: string, back: (e: UpdateEvent) => void, owner?: any): void;
    }
}
declare namespace orange {
    /**
     * 链接服务器
     * @param url 地址
     * @param params 参数，参考 orange.sync.ConnectParams
     * @returns {Promise<Proxy>}
     */
    function connect(url: string, params?: ConnectParams): Promise<Proxy>;
    /**
     * 链接服务器的参数
     */
    interface ConnectParams {
        /**
         * 链接关闭的回调函数
         */
        closeHandler?: (r: orange.ConnectionCloseReason) => void;
        /**
         * 压缩格式，默认不压缩
         * @default null
         */
        compressed?: 'gzip';
        /**
         * 调试模式
         * @default false
         */
        debug?: boolean;
        /**
         * 数据同步的根节点
         */
        root?: any;
        /**
         * 是否同步所有的消息
         * @default false
         */
        syncAllCommand?: boolean;
        /**
         * 链接服务器超时时间(单位秒)
         * @default 10
         */
        connectTimeout?: number;
        /**
         * 客户端验证心跳爆超时时间(单位秒)
         * @default 10
         */
        hertTimeout?: number;
        /**
         * 心跳包时间(单位秒)
         * @default 5
         */
        hertTimeinterval?: number;
        /**
         * 指令超时时间(秒)
         * @default 7
         */
        commandTimeout?: number;
        /**
         * 重连间隙(秒)
         * @default 1
         */
        reconnectInterval?: number;
    }
}
declare namespace orange {
    namespace native {
        var eval: any;
        class Compiler {
            constructor(srcDir?: string);
            /**
             * 源文件的目录
             */
            static src: string;
            /**
             * 当项目中有文件编译时
             * @param back (file: string, source?: string, url?: string) => void 回调被编译后的 js 文件和源文件以及文件路径
             */
            static onCompile(back: (file?: string, source?: string, url?: string) => void): void;
            /**
             * 自动编译，比 onCompile 更进一层会运行编译后的 js 文件，触发对应的 autoload 内容
             * @param back (file: string, source?: string) => void 回调被编译后的 js 文件和源文件
             */
            static autoCompile(back?: (file?: string, source?: string, url?: string) => void): void;
        }
    }
}
declare namespace orange {
    namespace native {
        class File {
            constructor(url?: string);
            private _name;
            /**
             * 文件名
             */
            readonly name: string;
            private _extname;
            /**
             * 文件扩展名
             */
            readonly extname: string;
            private _url;
            readonly url: string;
            exists(): Promise<boolean>;
            delete(): Promise<boolean>;
            read(): Promise<string>;
            watch(change: (url: string, content: string) => void, timeGap?: number): () => void;
            save(content: string): Promise<boolean>;
            readFilesWithExtname(end?: string): Promise<File[]>;
        }
    }
}
declare namespace orange {
    namespace native {
        class MongoDB {
            readonly url: string;
            readonly hasConnect: boolean;
            connect(url: string): Promise<boolean>;
            insertOne(db: string, collection: string, data: any): Promise<any>;
            updateOne(db: string, collection: string, find: any, data: any): Promise<any>;
            findOne(db: string, collection: string, find: any): Promise<any>;
        }
    }
}
declare namespace orange {
}
