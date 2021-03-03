declare namespace tiny2d {
    function addToWorld(world: ecs.World): void;
    function removeFromWorld(world: ecs.World): void;
}
declare namespace tiny2d {
    class Utils {
        static sin(r: number): number;
        static cos(r: number): number;
        static atan2(y: number, x: number): number;
    }
}
declare namespace tiny2d {
    /**
     * 矢量
     */
    class Vector {
        id: number;
        r: number;
        x: number;
        y: number;
        init(x?: number, y?: number, d?: number): void;
        /**
         * 大小
         */
        d: number;
        readonly dx: number;
        readonly dy: number;
    }
}
declare namespace tiny2d {
    class ForceField extends ecs.Component {
    }
}
declare namespace tiny2d {
    /**
     * 力
     */
    class Force extends ecs.Component {
        v: Vector;
        init(r: number, d: number): void;
    }
}
declare namespace tiny2d {
    /**
     * 定点力
     */
    class PointForce extends Force {
        /**
         * 发力点
         */
        x: number;
        /**
         * 发力点
         */
        y: number;
        init(r: number, d: number, x?: number, y?: number): void;
    }
}
declare namespace tiny2d {
    class Tiny2dSystem extends ecs.EntitySystem {
        static recycleEnable: boolean;
    }
}
declare namespace tiny2d {
    class ForceSystem extends Tiny2dSystem {
        update(dt: number): void;
    }
}
declare namespace tiny2d {
    class MoveSystem extends Tiny2dSystem {
        update(dt: number): void;
    }
}
declare namespace tiny2d {
    class RigidBody extends ecs.Component {
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
        init(m?: number): void;
    }
}
declare namespace tiny2d {
    class Box extends RigidBody {
    }
}
