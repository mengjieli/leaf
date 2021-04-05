namespace ecs {

    /**
     * @internal
     */
    export class UpdateSystem extends ComponentSystem {

        init() {
            super.init("update");
        }


        update(dt: number) {
            for (let node = this.query.head; node; node = node.next) {
                if (node.value.awake && !node.value.$hasAwake) continue;
                node.value.update(dt);
            }
        }
    }

}