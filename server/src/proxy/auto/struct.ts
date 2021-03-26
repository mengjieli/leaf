export class RespBase {

    result: number = 0;

    msg: string = "";

}

export class ReqLogin {

    user: string = "";

    pwd: string = "";

}

export class Resp {

    base: RespBase = new RespBase();

}

export class RespLogin {

    base: RespBase = new RespBase();

}