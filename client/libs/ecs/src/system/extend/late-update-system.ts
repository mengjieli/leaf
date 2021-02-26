namespace ecs {

    /**
     * @internal
     */
    export class LateUpdateSystem extends ComponentSystem {

        init() {
            super.init("lateUpdate");
        }

        lateUpdate(dt: number, ut: number) {
            for (let node = this.query.head; node; node = node.next) {
                node.value.lateUpdate(dt, ut);
            }
        }
    }

}