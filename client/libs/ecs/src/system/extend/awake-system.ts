namespace ecs {

    /**
     * @internal
     */
    export class AwakeSystem extends ComponentSystem {

        init() {
            super.init("awake");
        }

        update(dt: number) {
            for (let node = this.query.head; node; node = node.next) {
                node.value.awake();
                node.value.$hasAwake = true;
                node.value && this.query.remove(node.value);
            }
        }
    }

}