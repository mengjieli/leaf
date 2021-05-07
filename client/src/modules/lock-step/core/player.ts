namespace lockStep {

    export class Player {

        id: number;

        inputs: Input[];

        private static pools: Player[] = [];

        public static create(): Player {
            return this.pools.length ? this.pools.pop() : new Player();
        }

        public static release(val: Player) {
            this.pools.push(val);
        }

    }

}