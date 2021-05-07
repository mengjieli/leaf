namespace lockStep {

    export class Random {

        mw: number;
        mz: number;

        setSeed(seed: number) {
            this.mw = seed;
            this.mz = 123456789;
        }

        random() {
            let r = this;
            r.mz = 36969 * (r.mz & 65535) + (r.mz >> 16)
            r.mw = 18000 * (r.mw & 65535) + (r.mw >> 16)
            // console.warn(this.rand_index++, this.curTime, ((r.mz << 16) + r.mw) & 0x7fffffff)
            return ((r.mz << 16) + r.mw) & 0x7fffffff
        }

        randomWeights(weights: number[]): number {
            let r = this.random();
            let s: number = 0; //weight sum
            for (let i = 0; i < weights.length; i++) {
                s += weights[i];
            }
            r = r % s; //int 0 ~ s - 1
            for (let i = 0; i < weights.length; i++) {
                if (r < weights[i]) return i;
                r -= weights[i];
            }
            return weights.length - 1;
        }

        randomValues(values: number[], weights: number[]): number {
            return values[this.randomWeights(weights)];
        }

    }

}