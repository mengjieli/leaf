namespace lockStep {

    export class Input {

        time: number;

        playerId: number;

        type: number;

        value: string;

        private static pools: Input[] = [];

        public static create(): Input {
            return this.pools.length ? this.pools.pop() : new Input();
        }

        public static release(val: Input) {
            this.pools.push(val);
        }
    }

}