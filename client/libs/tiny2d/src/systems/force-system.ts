namespace tiny2d {

    export class ForceSystem extends Tiny2dSystem {

        update(dt: number) {
            dt *= 0.001;
            for (let node = this.query.head; node; node = node.next) {
                let object = node.value.getComponent(RigidBody);
                let forces = node.value.getComponents(Force);
                //计算运动合力
                let fx: number = 0;
                let fy: number = 0;
                for (let f of forces) {
                    fx += f.v.dx;
                    fy += f.v.dy;
                }
                if (fx !== 0) {
                    object.vx += fx * dt / object.m;
                }
                if (fy !== 0) {
                    object.vy += fy * dt / object.m;
                }
            }
        }

    }

}