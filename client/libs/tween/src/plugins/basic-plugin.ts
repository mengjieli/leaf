namespace tween {


    export class BasicPlugin implements ITweenPlugin {

        name = "basicPlugin";

        /**
         * 初始化相关属性
         * @param target 对象
         * @param data  相关的属性
         */
        init(target: any, data: TweenPluginData, timeTotal: number): any {
            for (let k in data.propsInit) {
                data.properties.push(k);
                let from = data.propsInit && data.propsInit.from &&
                    data.propsInit.from[k] != null ? data.propsInit.from[k] : target[k];
                let to = data.propsInit[k];
                //计算变化率
                data.propsStorage[k] = (to - from) / timeTotal;
            }
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
            for (let k of data.properties) {
                target[k] += data.propsStorage[k] * dt;
            }
        }

    }
}