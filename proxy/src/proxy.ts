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
        this.properties.push(p);
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

    private structs: { new(): ProxyStruct }[] = [];

    addStruct(st: { new(): ProxyStruct }) {
        if (!st || this.structs.indexOf(st) != -1) return;
        this.structs.push(st);
        let v = new st();
        v.properties.forEach(p => {
            if (p.type === EMProxyPropertyType.STRUCT) {
                this.addStruct(p.typeValue);
            }
        })
    }

    private methods: ProxyMethod[] = [];

    addRemoteMethod(method: ProxyMethod) {
        this.methods.push(method);
        this.addStruct(method.req);
        this.addStruct(method.resp);
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
            strcut += this.makeStruct(new st()) + '\n\n';
        }
        file = new lib.File(lib.File.join(url, "proxy/auto/struct.ts"));
        file.save(strcut);
    }

    private makeStruct(st: ProxyStruct): string {
        let str = `export class ${st.constructor.name} {\n`;
        st.properties.forEach(p => {
            if (p.type === EMProxyPropertyType.INT) str += `\t${p.name}: number = 0;`;
            if (p.type === EMProxyPropertyType.STRING) str += `\t${p.name}: string = '';`;
            if (p.type === EMProxyPropertyType.STRUCT) {
                let pt = new p.typeValue();
                str += `\t${p.name}: ${pt.constructor.name} = new ${pt.constructor.name}();`;
            }
            if (p.type === EMProxyPropertyType.ARRAY_INT) str += `\t${p.name}: number[] = [];`;
            if (p.type === EMProxyPropertyType.ARRAY_STRING) str += `\t${p.name}: string[] = [];`;
            str += '\n';
        })
        str += `}`;
        return str;
    }

}

