namespace tiny2d {

    export class MoveSystem extends Tiny2dSystem {

        update(dt: number) {
            dt *= 0.001;
            for (let node = this.query.head; node; node = node.next) {
                let object = node.value.getComponent(RigidBody);
                if (object.vx !== 0) {
                    object.transform.x += object.vx * dt;
                }
                if (object.vy !== 0) {
                    object.transform.y += object.vy * dt;
                }
            }
        }

    }

}