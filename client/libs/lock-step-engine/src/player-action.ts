namespace lse {

    export class PlayerAction {

        readonly type: number;

        readonly data: any;

        constructor(type: number, data?: any) {
            (this.type as any) = type;
            (this.data as any) = data;
        }

        encode() {
            return {
                type: this.type,
                data: this.data
            }
        }

        decode(cfg:any) {
            (this.type as any) = cfg.type;
            (this.data as any) = cfg.data;
        }
    }

}