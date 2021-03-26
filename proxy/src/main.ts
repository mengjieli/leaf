import { ProxyMaker, ProxyStruct, EMProxyPropertyType, Version, ProxyMethod } from "./proxy";


//绝对还原，客户端禁止使用 async 方法，替代 Promise 为 XPromise

class RespBase extends ProxyStruct {

    constructor() {
        super();
        this.addProperty("result", EMProxyPropertyType.INT);
        this.addProperty("msg", EMProxyPropertyType.STRING);
    }

}

class ReqLogin extends ProxyStruct {

    constructor() {
        super();
        this.addProperty("user", EMProxyPropertyType.STRING);
        this.addProperty("pwd", EMProxyPropertyType.STRING);
    }

}

class Resp extends ProxyStruct {

    constructor() {
        super();
        this.addProperty("base", EMProxyPropertyType.STRUCT, RespBase);
    }

}

class RespLogin extends RespBase {

}


let mk = new ProxyMaker(new Version("1.0.0"));

mk.addRemoteMethod(new ProxyMethod("Login", ReqLogin, RespLogin));
mk.makeServer("./../server/src");