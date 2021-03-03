declare namespace tween {
    class EaseFunction {
        static None(t: number): number;
        static SineEaseIn(t: number): number;
        static SineEaseOut(t: number): number;
        static SineEaseInOut(t: number): number;
        static SineEaseOutIn(t: number): number;
        static QuadEaseIn(t: number): number;
        static QuadEaseOut(t: number): number;
        static QuadEaseInOut(t: number): number;
        static QuadEaseOutIn(t: number): number;
        static CubicEaseIn(t: number): number;
        static CubicEaseOut(t: number): number;
        static CubicEaseInOut(t: number): number;
        static CubicEaseOutIn(t: number): number;
        static QuartEaseIn(t: number): number;
        static QuartEaseOut(t: number): number;
        static QuartEaseInOut(t: number): number;
        static QuartEaseOutIn(t: number): number;
        static QuintEaseIn(t: number): number;
        static QuintEaseOut(t: number): number;
        static QuintEaseInOut(t: number): number;
        static QuintEaseOutIn(t: number): number;
        static ExpoEaseIn(t: number): number;
        static ExpoEaseOut(t: number): number;
        static ExpoEaseInOut(t: number): number;
        static ExpoEaseOutIn(t: number): number;
        static CircEaseIn(t: number): number;
        static CircEaseOut(t: number): number;
        static CircEaseInOut(t: number): number;
        static CircEaseOutIn(t: number): number;
        static BackEaseIn(t: number): number;
        static BackEaseOut(t: number): number;
        static BackEaseInOut(t: number): number;
        static BackEaseOutIn(t: number): number;
        static ElasticEaseIn(t: number): number;
        static ElasticEaseOut(t: number): number;
        static ElasticEaseInOut(t: number): number;
        static ElasticEaseOutIn(t: number): number;
        private static bounceEaseIn;
        private static bounceEaseOut;
        static BounceEaseInOut(t: number): number;
        static BounceEaseOutIn(t: number): number;
        static BounceEaseIn: typeof EaseFunction.bounceEaseIn;
        static BounceEaseOut: typeof EaseFunction.bounceEaseOut;
    }
}
declare namespace tween {
    interface ITweenPlugin {
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
        update(target: any, data: TweenPluginData, dt: number, time?: number, timeTotal?: number): any;
    }
}
declare namespace tween {
    class BasicPlugin implements ITweenPlugin {
        name: string;
        /**
         * 初始化相关属性
         * @param target 对象
         * @param data  相关的属性
         */
        init(target: any, data: TweenPluginData, timeTotal: number): any;
        /**
         *
         * @param target 对象
         * @param data 相关的属性
         * @param dt 时间差
         * @param time 总的时间
         * @param timeTotal 总时间
         */
        update(target: any, data: TweenPluginData, dt: number, time?: number, timeTotal?: number): void;
    }
}
declare namespace tween {
    class BezierPlugin implements ITweenPlugin {
        name: string;
        /**
         * 初始化相关属性
         * @param target 对象
         * @param data  相关的属性
         */
        init(target: any, data: TweenPluginData, timeTotal: number): any;
        /**
         *
         * @param target 对象
         * @param data 相关的属性
         * @param dt 时间差
         * @param time 总的时间
         * @param timeTotal 总时间
         */
        update(target: any, data: TweenPluginData, dt: number, time?: number, timeTotal?: number): void;
        /**
             * 根据已知点获取贝塞尔曲线的模拟线段
             * @param points 经过的点
             * @param devices 贝塞尔曲线的拆分个数，个数越多拆分的越精确
             * @param k 平滑系数，范围 0 ~ 1.0，越大就越平滑，越小就越尖锐
             */
        getCubicBezierLines(data: TweenPluginData, points: Array<any>, k?: number, p?: number): Array<any>;
        /**
         * 根据已知点获取贝塞尔曲线的控制点
         * @param points 路径点
         * @param k 平滑系数，范围 0 ~ 1.0，越大就越平滑，越小就越尖锐
         */
        getCubicBezierControlPoints(points: Array<any>, k: number): Array<any>;
    }
}
declare namespace tween {
    class VelocityPlugin implements ITweenPlugin {
        name: string;
        /**
         * 初始化相关属性
         * @param target 对象
         * @param data  相关的属性
         */
        init(target: any, data: TweenPluginData, timeTotal: number): any;
        /**
         *
         * @param target 对象
         * @param data 相关的属性
         * @param dt 时间差
         * @param time 总的时间
         * @param timeTotal 总时间
         */
        update(target: any, data: TweenPluginData, dt: number, time?: number, timeTotal?: number): void;
    }
}
declare namespace tween {
    class Tween extends ecs.Component {
        readonly target: any;
        ease: (time: number) => number;
        readonly totalTime: number;
        readonly curTime: number;
        private plugins;
        private propsInit;
        isPlaying: boolean;
        init(target: any, totalTime: number, props: TweenProperties, ease: (time: number) => number): void;
        awake(): void;
        onUpdate: (progress: number, tween: Tween) => any;
        update(dt: number): void;
        private addPlugin;
        onComplete: Function;
        onDestroy(): void;
        private static plugins;
        private static basicPlugin;
        static registerPlugin(plugin: {
            new (): ITweenPlugin;
        }): void;
    }
    interface TweenProperties {
        [index: string]: any;
        plugins: {
            [index: string]: any;
            from: {
                [index: string]: any;
            };
        };
        /**
         * 初始化属性，如果没有就取 target 初始的属性
         */
        from: {
            [index: string]: any;
        };
    }
    class TweenPluginData {
        readonly id: number;
        readonly plugin: ITweenPlugin;
        propsInit: {
            [index: string]: any;
            from: {
                [index: string]: any;
            };
        };
        propsStorage: {
            [index: string]: any;
        };
        properties: string[];
    }
}
