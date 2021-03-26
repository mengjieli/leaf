//绝对还原，客户端禁止使用 async 方法，替代 Promise 为 XPromise
import * as lib from "./../../server/bin/lib/lib"

export class Version {

    /**
     * 版本号,格式 x.x.x
     */
    readonly value: string;

    constructor(v: string) {
        this.value = v;
    }

}

export class ProxyStruct {

    properties: ProxyProperty[] = [];

    addProperty(name: string, type: EMProxyPropertyType, typeValue?: { new(): ProxyStruct }): ProxyProperty {
        let p = new ProxyProperty();
        p.name = name;
        p.type = type;
        p.typeValue = typeValue;
        return p;
    }

}

export class ProxyMethod {

    readonly name: string;

    readonly version: Version;

    readonly req: { new(): ProxyStruct };

    readonly resp: { new(): ProxyStruct };

    constructor(name: string, req: { new(): ProxyStruct }, resp: { new(): ProxyStruct }, version?: Version) {
        this.name = name;
        this.req = req;
        this.resp = resp;
        this.version = version;
    }

}

export class ProxyProperty {

    name: string;

    type: EMProxyPropertyType;

    typeValue: { new(): ProxyStruct };
}

export enum EMProxyPropertyType {
    INT = 1,
    STRING = 2,
    STRUCT = 10,
    ARRAY_INT = 101,
    ARRAY_STRING = 102
}

export class ProxyMaker {

    readonly version: Version;

    constructor(v: Version) {
        this.version = v;
    }

    private structs: ProxyStruct[] = [];

    addStruct(st: ProxyStruct) {
        this.structs.push(st);
    }

    private methods: ProxyMethod[] = [];

    addRemoteMethod(method: ProxyMethod) {
        this.methods.push(method);
    }

    makeClient() {
    }

    /**
     * 
     * @param url src 目录
     */
    makeServer(url: string) {
        let file = new lib.File(lib.File.join(url, "proxy/auto/readme.md"));
        file.save(JSON.stringify({
            version: this.version.value,
            update: Date.now()
        }, null, 2));

        let strcut = ``;
        for (let st of this.structs) {

        }
    }

}

