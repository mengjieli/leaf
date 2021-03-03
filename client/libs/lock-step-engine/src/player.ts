namespace lse {

    export class Player {

        readonly id: number;

        readonly local: boolean;

        constructor(id: number, local: boolean, extendedData?: any) {
            this.id = id;
            this.local = local;
            this.extendedData = extendedData;
        }

        extendedData: any;

        readonly frame: number = 0;

        /**
         * @internal
         */
        frames: PlayerFrame[] = [];

        getFrameData(frame: number) {
            for (let data of this.frames) {
                if (data.frame === frame) return data;
            }
        }

    }

}