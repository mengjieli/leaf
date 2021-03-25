namespace eui {


    export class TweenGroup {

        public readonly id: number;

        public display: any;

        public groups: TweenGroup[];

        public info: any;

        public tween: TweenGroupConfig;

        public time = 0;

        public get maxTime(): number {
            return this.tween.time;
        }

        public frame = 0;

        public loop: number;
        public completeCall: Function;
        public completeCallTarget: any;

        public fps = 60;

        public isPlaying: boolean = false;

        constructor() {
            ecs.ObjectPools.setId(this);
        }

        public update(dt: number) {
            this.time += dt;
            this.frame = Math.round(this.time * this.fps / 1000);
            let isComplete = this.frame >= this.tween.frameLength;
            if (this.frame > this.tween.frameLength) this.frame = this.tween.frameLength;
            for (let item of this.tween.items) {
                let target = this.display[item.targetId];
                if (target) {
                    for (let k in item.frames[this.frame]) {
                        target.transform[k] = item.frames[this.frame][k];
                    }
                }
            }
            if (isComplete) {
                this.loop--;
                if (this.loop > 0) {
                    this.frame = 0;
                    this.time = 0;
                } else {
                    this.isPlaying = false;
                    let call = this.completeCall;
                    let target = this.completeCallTarget;
                    this.completeCall = null;
                    this.completeCallTarget = null;
                    call && call.apply(target);
                }
            }
        }

        public static count = 0;

        public static create() {
            this.count++;
            return new TweenGroup();
        }
    }

}