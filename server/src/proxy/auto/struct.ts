export class ReqLogin {
	common: ReqCommon = new ReqCommon();
	user: string = '';
	pwd: string = '';
}

export class ReqCommon {
}

export class RespLogin {
	common: RespCommon = new RespCommon();
	result: number = 0;
	msg: string = '';
}

export class RespCommon {
}

