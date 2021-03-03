namespace tween {

    export class Tween extends ecs.Component {

        readonly target: any;

        ease: (time: number) => number;

        readonly totalTime: number;
        readonly curTime: number;

        private plugins = new ecs.Link<TweenPluginData>();
        private propsInit: any;

        isPlaying: boolean;

        init(target: any, totalTime: number, props: TweenProperties, ease: (time: number) => number) {
            if (!target || totalTime <= 0) {
                this.destroy();
                return;
            }
            this.propsInit = props;
            (this.target as any) = target;
            (this.totalTime as any) = totalTime;
            this.ease = ease || EaseFunction.None;
            (this.curTime as any) = 0;
            this.isPlaying = true;
        }

        awake() {
            this.update(0);
        }

        onUpdate: (progress: number, tween: Tween) => any;

        update(dt: number) {
            if (!this.isPlaying) return;
            if (this.plugins.length === 0) {
                for (let plugin of Tween.plugins) {
                    if (this.propsInit[plugin.name]) {
                        this.addPlugin(plugin);
                        delete this.propsInit[plugin.name];
                    }
                }
                this.addPlugin(Tween.basicPlugin);
            }
            let lastTime = this.ease(this.curTime / this.totalTime) * this.totalTime;
            (this.curTime as any) += dt;
            if (this.curTime >= this.totalTime) {
                (this.curTime as any) = this.totalTime;
            }
            let time = this.ease(this.curTime / this.totalTime) * this.totalTime;
            for (let node = this.plugins.head; node; node = node.next) {
                node.value.plugin.update(this.target, node.value, time - lastTime, time, this.totalTime);
            }
            this.onUpdate && this.onUpdate(this.curTime / this.totalTime, this);
            if (this.curTime >= this.totalTime) {
                let onComplete = this.onComplete;
                this.destroy();
                onComplete && onComplete();
            }
        }

        private addPlugin(plugin: ITweenPlugin) {
            let data = ecs.ObjectPools.createRecyableObject(TweenPluginData);
            data.propsInit = this.propsInit[plugin.name] || this.propsInit;
            data.propsStorage = {};
            data.properties.length = 0;
            (data.plugin as any) = plugin;
            plugin.init(this.target, data, this.totalTime);
            this.plugins.add(data);
        }

        onComplete: Function;

        onDestroy() {
            this.propsInit = null;
            (this.target as any) = null;
            this.plugins.clear(true);
            this.onComplete = null;
            this.onUpdate = null;
        }

        private static plugins: ITweenPlugin[] = [];
        private static basicPlugin: BasicPlugin = new BasicPlugin();

        public static registerPlugin(plugin: { new(): ITweenPlugin }) {
            this.plugins.push(new plugin());
        }
    }

    Tween.registerPlugin(VelocityPlugin);
    Tween.registerPlugin(BezierPlugin);

    export interface TweenProperties {

        [index: string]: any;

        plugins: {
            [index: string]: any;
            from: { [index: string]: any }
        }

        /**
         * 初始化属性，如果没有就取 target 初始的属性
         */
        from: { [index: string]: any };
    }

    export class TweenPluginData {

        readonly id: number;

        readonly plugin: ITweenPlugin;

        propsInit: {
            [index: string]: any;
            from: { [index: string]: any }
        };

        propsStorage: { [index: string]: any };

        properties: string[] = [];

    }
}