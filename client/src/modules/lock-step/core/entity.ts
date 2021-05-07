namespace lockStep {

    export class Entity {

        id: number;

        private static pools: Entity[] = [];

        public static create(): Entity {
            return this.pools.length ? this.pools.pop() : new Entity();
        }

        public static release(val: Entity) {
            this.pools.push(val);
        }

    }

}