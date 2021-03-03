namespace tween {

    export interface ITweenPlugin {

        name: string;

        /**
         * 初始化相关属性
         * @param target 对象
         * @param data  相关的属性
         */
        init?(target: any, data: TweenPluginData, timeTotal: number): any;

        /**
         * 
         * @param target 对象
         * @param data 相关的属性
         * @param dt 时间差
         * @param time 总的时间
         * @param timeTotal 总时间
         */
        update(target: any, data: TweenPluginData, dt: number, time?: number, timeTotal?: number);

    }
}