namespace tiny2d {

    /**
     * 定点力
     */
    export class PointForce extends Force {

        /**
         * 发力点
         */
        x: number;

        /**
         * 发力点
         */
        y: number;

        init(r: number, d: number, x: number = 0, y: number = 0) {
            super.init(r, d);
            this.x = x;
            this.y = y;
        }

    }

}