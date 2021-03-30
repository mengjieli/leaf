import { ProxyMaker, ProxyStruct, EMProxyPropertyType, Version, ProxyMethod } from "./proxy";


//绝对还原，客户端禁止使用 async 方法，替代 Promise 为 XPromise
class RespCommon extends ProxyStruct {

    constructor() {
        super();
    }

}

class Resp extends ProxyStruct {

    constructor() {
        super();
        this.addProperty("common", EMProxyPropertyType.STRUCT, RespCommon);
    }

}

class ReqCommon extends ProxyStruct {

    constructor() {
        super();
    }

}

class Req extends ProxyStruct {

    constructor() {
        super();
        this.addProperty("common", EMProxyPropertyType.STRUCT, ReqCommon);
    }

}

class ReqLogin extends Req {

    constructor() {
        super();
        this.addProperty("user", EMProxyPropertyType.STRING);
        this.addProperty("pwd", EMProxyPropertyType.STRING);
    }

}

class RespLogin extends Resp {

    constructor() {
        super();

        this.addProperty("result", EMProxyPropertyType.INT);
        this.addProperty("msg", EMProxyPropertyType.STRING);
    }
}

let mk = new ProxyMaker(new Version("1.0.0"));

mk.addRemoteMethod(new ProxyMethod("Login", ReqLogin, RespLogin));
mk.makeServer("./../server/src");