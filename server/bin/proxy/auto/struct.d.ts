export declare class RespBase {
    result: number;
    msg: string;
}
export declare class ReqLogin {
    user: string;
    pwd: string;
}
export declare class Resp {
    base: RespBase;
}
export declare class RespLogin {
    base: RespBase;
}
