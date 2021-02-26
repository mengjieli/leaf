namespace ecs {

    export var debug = false;

    export enum EMError {
        RELEASE_ID_ERROR = 10001,
        ENEIEY_HAS_DESTROYED = 10002,
        NOT_ALLOW_MUTIPLY_COMPONENT = 11000,
        COMPONENT_EXIST = 11001,
        COMPONENT_HAS_DESTROYED = 11002,
        COMPONENT_REQUIRE = 11003,
        COMPONENT_REQUIRE_COUNT = 11004,
        COMPONENT_REQUIRE_INDEX_ERROR = 11005,
        COMPONENT_REQUIRE_DELETE = 11006,
        SYNC_COMPONENT_SAME_NAME = 11007,
        COMPONENT_REMOVED_INDEX_ERROR = 11008,
    }

    var ErrorMessage = {
        10001: "对象已释放",
        10002: "Entity 已销毁",
        11000: "Component 不容许有重复，类 : $arg0",
        11001: "Component 对象已存在",
        11002: "Component 已销毁",
        11003: "Component $arg0 缺少依赖，类 : $arg1",
        11004: "Component 依赖计数器错误",
        11005: "Component 依赖索引错误",
        11006: "Component $arg0 无法删除，存在依赖",
        11007: "异步 Component 重名 : $arg0",
        11008: "Component 删除索引错误 : $arg0",
    }

    var onError: (type: EMError) => void;

    export function setOnError(call: (type: EMError) => void) {
        onError = call;
    }

    export function error(type: EMError, ...args) {
        if (onError) {
            onError(type);
        }
        if (debug) {
            let str: string = ErrorMessage[type];
            if (args && args.length) {
                for (let i = 0; i < args.length; i++) {
                    str = str.replace("$arg" + i, args[i]);
                }
            }
            logError(str);
        }
    }

    export function logError(...args) {
        if (debug) {
            console.error.apply(null, args);
        }
    }

    export function logWarn(...args) {
        if (debug) {
            console.error.apply(null, args);
        }
    }

    export function logInfo(...args) {
        if (debug) {
            console.error.apply(null, args);
        }
    }
}
