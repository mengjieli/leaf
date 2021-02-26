namespace ecs {

    export class UpdateInfo {

        /**
         * 距离上一帧的时间间隔
         */
        deltaTime: number;

        /**
         * 从启动开始的时间
         */
        totalTime: number;

        /**
         * update 消耗时间
         */
        updateTime: number;

        /**
         * 从启动开始的帧数
         */
        frame: number;
        
    }

}