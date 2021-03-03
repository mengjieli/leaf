namespace tween {


    export class VelocityPlugin implements ITweenPlugin {

        name = "vPlugin";

        /**
         * 初始化相关属性
         * @param target 对象
         * @param data  相关的属性
         */
        init(target: any, data: TweenPluginData, timeTotal: number): any {
            data.propsStorage.vx = data.propsInit.vx || 0;
            data.propsStorage.vy = data.propsInit.vy || 0;
            data.propsStorage.ax = data.propsInit.ax || 0;
            data.propsStorage.ay = data.propsInit.ay || 0;
        }

        /**
         * 
         * @param target 对象
         * @param data 相关的属性
         * @param dt 时间差
         * @param time 总的时间
         * @param timeTotal 总时间
         */
        update(target: any, data: TweenPluginData, dt: number, time?: number, timeTotal?: number) {
            if (time === 0) {
                if (data.propsInit.from && data.propsInit.from.x != null) {
                    target.x = data.propsInit.from.x;
                }
                if (data.propsInit.from && data.propsInit.from.y != null) {
                    target.y = data.propsInit.from.y;
                }
            }
            data.propsStorage.vx += data.propsStorage.ax * dt;
            target.x += data.propsStorage.vx * dt;
            data.propsStorage.vy += data.propsStorage.ay * dt;
            target.y += data.propsStorage.vy * dt;
        }

    }
}