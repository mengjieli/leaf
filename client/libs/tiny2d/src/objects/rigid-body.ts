namespace tiny2d {

    export class RigidBody extends ecs.Component {

        /**
         * 质量
         */
        m: number;

        /**
         * 速度 x
         */
        vx: number;

        /**
         * 速度 y
         */
        vy: number;

        /**
         * 角速度
         */
        w: number;

        init(m: number = 1) {
            this.m = m;
            this.vx = 0;
            this.vy = 0;
            this.w = 0;
        }
    }

}