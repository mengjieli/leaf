namespace lockStep {

    export class Room {

        id: number;

        /**
         * 当前运行时间
         */
        time: number;

        /**
         * 当前运行到第几帧
         */
        frame: number;


        frameGap: number = 16;

        players: Player[];

        /**
         * 随机种子
         */
        seed: number;
    }

}