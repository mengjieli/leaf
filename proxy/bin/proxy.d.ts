export declare class Version {
    /**
     * 版本号,格式 x.x.x
     */
    readonly value: string;
    constructor(v: string);
}
export declare class ProxyStruct {
    properties: ProxyProperty[];
    addProperty(name: string, type: EMProxyPropertyType, typeValue?: {
        new (): ProxyStruct;
    }): ProxyProperty;
}
export declare class ProxyMethod {
    readonly name: string;
    readonly version: Version;
    readonly req: {
        new (): ProxyStruct;
    };
    readonly resp: {
        new (): ProxyStruct;
    };
    constructor(name: string, req: {
        new (): ProxyStruct;
    }, resp: {
        new (): ProxyStruct;
    }, version?: Version);
}
export declare class ProxyProperty {
    name: string;
    type: EMProxyPropertyType;
    typeValue: {
        new (): ProxyStruct;
    };
}
export declare enum EMProxyPropertyType {
    INT = 1,
    STRING = 2,
    STRUCT = 10,
    ARRAY_INT = 101,
    ARRAY_STRING = 102
}
export declare class ProxyMaker {
    readonly version: Version;
    constructor(v: Version);
    private structs;
    addStruct(st: {
        new (): ProxyStruct;
    }): void;
    private methods;
    addRemoteMethod(method: ProxyMethod): void;
    makeClient(): void;
    /**
     *
     * @param url src 目录
     */
    makeServer(url: string): void;
    private makeStruct;
}
